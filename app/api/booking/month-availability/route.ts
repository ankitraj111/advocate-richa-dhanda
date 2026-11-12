import { NextResponse } from "next/server";
import {
  BUSINESS_HOURS,
  evaluateSlotsForDate,
  getDayOfWeekFromDateStr,
  getMonthBusyIntervals,
} from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const BOOKED_UNTIL_DATE = "2026-11-10";

export async function GET(request: Request) {
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
  const monthParam = searchParams.get("month");

  if (!monthParam || !/^\d{4}-\d{2}$/.test(monthParam)) {
    return NextResponse.json(
      { error: "Valid YYYY-MM month parameter required" },
      { status: 400 }
    );
  }

  const [year, month] = monthParam.split("-").map(Number);
  if (month < 1 || month > 12) {
    return NextResponse.json({ error: "Invalid month" }, { status: 400 });
  }

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstDayStr = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDayStr = `${year}-${String(month).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;

  try {
    const [calendarMonth, bookedByDate] = await Promise.all([
      getMonthBusyIntervals(year, month),
      (async (): Promise<Record<string, Set<string>>> => {
        const map: Record<string, Set<string>> = {};
        if (!db) return map;
        try {
          const timeoutPromise = new Promise<Record<string, Set<string>>>((resolve) =>
            setTimeout(() => resolve({}), 3500)
          );
          const fetchPromise = (async () => {
            const bookingsRef = collection(db, "bookings");
            // Single-field range query requires no composite index in Firestore
            const q = query(
              bookingsRef,
              where("date", ">=", firstDayStr),
              where("date", "<=", lastDayStr)
            );
            const snapshot = await getDocs(q);
            snapshot.docs.forEach((d) => {
              const data = d.data();
              if (data.status === "confirmed" && data.date && data.time) {
                if (!map[data.date]) map[data.date] = new Set<string>();
                map[data.date].add(data.time as string);
              }
            });
            return map;
          })();
          return await Promise.race([fetchPromise, timeoutPromise]);
        } catch (err) {
          console.warn("[MonthAvailability] Firestore lookup failed:", err);
          return {};
        }
      })(),
    ]);

    const minValidTimeMs = Date.now() + 15 * 60 * 1000;
    const days: Record<
      string,
      { availableSlots: number; totalSlots: number; status: "available" | "booked" | "closed" }
    > = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dow = getDayOfWeekFromDateStr(year, month, day);
      if (!BUSINESS_HOURS[dow]) {
        days[dateStr] = { availableSlots: 0, totalSlots: 0, status: "closed" };
        continue;
      }

      if (dateStr <= BOOKED_UNTIL_DATE) {
        const total = evaluateSlotsForDate(year, month, day, [], 0).length;
        days[dateStr] = { availableSlots: 0, totalSlots: total, status: "booked" };
        continue;
      }

      const daySlots = evaluateSlotsForDate(year, month, day, calendarMonth.busy, minValidTimeMs);
      const dbBooked = bookedByDate[dateStr];
      const availableCount = daySlots.filter(
        (s) => s.available && !(dbBooked && dbBooked.has(s.time))
      ).length;

      days[dateStr] = {
        availableSlots: availableCount,
        totalSlots: daySlots.length,
        status: availableCount > 0 ? "available" : "booked",
      };
    }

    return NextResponse.json(
      {
        month: monthParam,
        calendarSynced: calendarMonth.calendarSynced,
        days,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Error fetching month availability:", error);
    return NextResponse.json({ error: "Failed to fetch month availability" }, { status: 500 });
  }
}
