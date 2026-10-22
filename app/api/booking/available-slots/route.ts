import { NextResponse } from "next/server";
import { getAvailableSlots, BUSINESS_HOURS } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Fast in-memory cache for available slots (TTL: 30 seconds)
const slotsCache = new Map<string, { slots: any[]; expiresAt: number }>();

export async function GET(request: Request) {
  // Rate Limiting — max 60 requests per IP per minute
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = rateLimit(ip, 60, 60 * 1000);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rateLimitResult.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
  }

  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  // Check if it's a business day
  if (!BUSINESS_HOURS[dayOfWeek]) {
    return NextResponse.json(
      { slots: [], message: "Office is closed on this day" },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  }

  // All slots up to 10 November 2026 are shown as booked; active slots start from 11 November 2026
  if (dateStr <= "2026-11-10") {
    const endHour = dayOfWeek === 6 ? 14 : 18;
    const bookedSlots = [];
    for (let h = 10; h < endHour; h++) {
      for (let m = 0; m < 60; m += 30) {
        const dh = h > 12 ? h - 12 : h;
        bookedSlots.push({
          time: `${dh}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`,
          available: false,
        });
      }
    }
    return NextResponse.json(
      { slots: bookedSlots, message: "All slots up to 10 November 2026 are fully booked" },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  }

  // Check in-memory cache for instant response (1-5ms)
  const cached = slotsCache.get(dateStr);
  if (cached && Date.now() < cached.expiresAt) {
    return NextResponse.json(
      { slots: cached.slots },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
    );
  }

  try {
    // Run Google Calendar slots and Firestore bookings check in PARALLEL with timeouts
    const [calendarSlots, bookedTimes] = await Promise.all([
      getAvailableSlots(dateStr),
      (async (): Promise<string[]> => {
        if (!db) return [];
        try {
          const timeoutPromise = new Promise<string[]>((resolve) => setTimeout(() => resolve([]), 1500));
          const fetchPromise = (async () => {
            const bookingsRef = collection(db, "bookings");
            const q = query(bookingsRef, where("date", "==", dateStr), where("status", "==", "confirmed"));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => doc.data().time as string);
          })();
          return await Promise.race([fetchPromise, timeoutPromise]);
        } catch {
          return [];
        }
      })(),
    ]);

    // Mark booked slots as unavailable
    const slots = calendarSlots.map((slot) => ({
      ...slot,
      available: slot.available && !bookedTimes.includes(slot.time),
    }));

    // Cache the result for 30 seconds
    slotsCache.set(dateStr, { slots, expiresAt: Date.now() + 30 * 1000 });

    return NextResponse.json(
      { slots },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
    );
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: "Failed to fetch available slots" }, { status: 500 });
  }
}
