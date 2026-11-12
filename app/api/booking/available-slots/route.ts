import { NextResponse } from "next/server";
import {
  BUSINESS_HOURS,
  generateSlotsForYMD,
  getAvailableSlotsDetailed,
  getDayOfWeekFromDateStr,
} from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

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

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json({ error: "Valid YYYY-MM-DD date parameter required" }, { status: 400 });
  }

  const [year, month, day] = dateStr.split("-").map(Number);
  const dayOfWeek = getDayOfWeekFromDateStr(year, month, day);

  // Check if it's a business day
  if (!BUSINESS_HOURS[dayOfWeek]) {
    return NextResponse.json(
      { slots: [], calendarSynced: true, message: "Office is closed on this day" },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  // All slots up to 10 November 2026 are shown as booked; active slots start from 11 November 2026
  if (dateStr <= "2026-11-10") {
    const bookedSlots = generateSlotsForYMD(year, month, day).map((s) => ({
      time: s.time,
      available: false,
    }));
    return NextResponse.json(
      {
        slots: bookedSlots,
        calendarSynced: true,
        message: "All slots up to 10 November 2026 are fully booked",
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }

  try {
    // Run Google Calendar slots and Firestore bookings check in parallel
    const [calendarResult, bookedTimes] = await Promise.all([
      getAvailableSlotsDetailed(dateStr),
      (async (): Promise<string[]> => {
        if (!db) return [];
        try {
          const timeoutPromise = new Promise<string[]>((resolve) => setTimeout(() => resolve([]), 3500));
          const fetchPromise = (async () => {
            const bookingsRef = collection(db, "bookings");
            const q = query(bookingsRef, where("date", "==", dateStr));
            const snapshot = await getDocs(q);
            return snapshot.docs
              .filter((d) => d.data().status === "confirmed")
              .map((d) => d.data().time as string);
          })();
          return await Promise.race([fetchPromise, timeoutPromise]);
        } catch (err) {
          console.warn("[AvailableSlots] Firestore lookup failed:", err);
          return [];
        }
      })(),
    ]);

    const slots = calendarResult.slots.map((slot) => ({
      ...slot,
      available: slot.available && !bookedTimes.includes(slot.time),
    }));

    return NextResponse.json(
      {
        slots,
        calendarSynced: calendarResult.calendarSynced,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: "Failed to fetch available slots" }, { status: 500 });
  }
}
