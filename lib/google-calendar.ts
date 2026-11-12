import { google } from "googleapis";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const DEFAULT_BASE_URL = "https://www.advocaterichadhanda.com";
const SLOT_DURATION_MINUTES = 30;
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;

export interface SlotStatus {
  time: string;
  available: boolean;
}

export interface BusyInterval {
  start: number;
  end: number;
}

// Extract external request origin safely behind reverse proxies (e.g., Vercel)
export function getRequestOrigin(request: Request): string {
  const url = new URL(request.url);
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || url.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host") || url.host;
  return `${proto}://${host}`;
}

// Resolve OAuth callback redirect URI consistently across environments
export function getRedirectUri(origin?: string): string {
  const explicitRedirect = process.env.GOOGLE_REDIRECT_URI?.trim();
  if (explicitRedirect) {
    return explicitRedirect;
  }
  const base = (
    origin ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    DEFAULT_BASE_URL
  )
    .trim()
    .replace(/\/+$/, "");
  return `${base}/api/auth/callback/google`;
}

// Create OAuth2 client
export function getOAuth2Client(origin?: string) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    getRedirectUri(origin)
  );
}

// Generate auth URL for initial setup
export function getAuthUrl(origin?: string) {
  const oauth2Client = getOAuth2Client(origin);
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
    include_granted_scopes: true,
  });
}

let cachedRefreshToken: string | null = null;
let tokenCacheTime = 0;

// Store refresh token in Firebase and update in-memory cache immediately
export async function storeRefreshToken(token: string) {
  if (!db) {
    throw new Error("Firestore is not initialized; cannot store Google Calendar refresh token.");
  }
  await setDoc(doc(db, "settings", "google_calendar"), {
    refreshToken: token,
    updatedAt: new Date().toISOString(),
  });
  cachedRefreshToken = token;
  tokenCacheTime = Date.now();
}

// Get refresh token from env override or Firebase with in-memory caching & timeout
export async function getRefreshToken(): Promise<string | null> {
  const envToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();
  if (envToken) {
    return envToken;
  }

  const now = Date.now();
  // 5-minute memory cache (only cache valid non-empty tokens)
  if (cachedRefreshToken && now - tokenCacheTime < 5 * 60 * 1000) {
    return cachedRefreshToken;
  }

  if (db) {
    try {
      const fetchPromise = getDoc(doc(db, "settings", "google_calendar")).then((docSnap) => {
        if (docSnap.exists()) {
          const val = docSnap.data().refreshToken;
          return typeof val === "string" && val.trim().length > 0 ? val.trim() : null;
        }
        return null;
      });
      // 4s timeout to allow Firestore cold starts in serverless environments
      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 4000)
      );
      const token = await Promise.race([fetchPromise, timeoutPromise]);
      if (token) {
        cachedRefreshToken = token;
        tokenCacheTime = now;
      }
      return token;
    } catch (err) {
      console.error("[GoogleCalendar] Failed to read refresh token from Firestore:", err);
      return null;
    }
  }
  return null;
}

// Get authenticated calendar client
export async function getCalendarClient() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("[GoogleCalendar] Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.");
    return null;
  }
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

// Business hours configuration (0 = Sunday .. 6 = Saturday)
export const BUSINESS_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null, // Sunday - closed
  1: { start: 10, end: 18 }, // Monday 10AM-6PM
  2: { start: 10, end: 18 }, // Tuesday
  3: { start: 10, end: 18 }, // Wednesday
  4: { start: 10, end: 18 }, // Thursday
  5: { start: 10, end: 18 }, // Friday
  6: { start: 10, end: 14 }, // Saturday 10AM-2PM
};

// Parse "YYYY-MM-DD" safely without server-timezone shift
export function getDayOfWeekFromDateStr(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

// Generate all possible slots for a given date (using UTC day-of-week for timezone independence)
export function generateSlotsForYMD(
  year: number,
  month: number,
  day: number
): { time: string; hour: number; minute: number }[] {
  const dayOfWeek = getDayOfWeekFromDateStr(year, month, day);
  const hours = BUSINESS_HOURS[dayOfWeek];
  if (!hours) return [];

  const slots: { time: string; hour: number; minute: number }[] = [];
  for (let h = hours.start; h < hours.end; h++) {
    for (let m = 0; m < 60; m += SLOT_DURATION_MINUTES) {
      const displayHour = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const displayTime = `${displayHour}:${m.toString().padStart(2, "0")} ${ampm}`;
      slots.push({ time: displayTime, hour: h, minute: m });
    }
  }
  return slots;
}

// Parse "10:30 AM" / "2:00 PM" into 24h { hour, minute }
export function parseTimeLabel(timeLabel: string): { hour: number; minute: number } | null {
  const timeParts = timeLabel.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!timeParts) return null;

  let hour = parseInt(timeParts[1], 10);
  const minute = parseInt(timeParts[2], 10);
  const ampm = timeParts[3].toUpperCase();

  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;

  return { hour, minute };
}

// Convert IST wall-clock components to a UTC Date
function istToDate(year: number, month: number, day: number, hour: number, minute: number): Date {
  const utcMillis = Date.UTC(year, month - 1, day, hour, minute, 0) - IST_OFFSET_MS;
  return new Date(utcMillis);
}

// Format IST wall-clock components as RFC3339 string with explicit +05:30 offset
function formatISTDateTime(year: number, month: number, day: number, hour: number, minute: number): string {
  const y = String(year).padStart(4, "0");
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${y}-${m}-${d}T${hh}:${mm}:00+05:30`;
}

// Query Google Calendar FreeBusy API for a given time range
async function queryFreeBusy(
  timeMin: Date,
  timeMax: Date
): Promise<{ synced: boolean; busy: BusyInterval[]; error?: string }> {
  const calendar = await getCalendarClient();
  if (!calendar) {
    return { synced: false, busy: [], error: "Google Calendar is not connected." };
  }

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: "Asia/Kolkata",
        items: [{ id: "primary" }],
      },
    });

    const primaryCal = response.data.calendars?.primary;
    if (primaryCal?.errors && primaryCal.errors.length > 0) {
      const errMsg = primaryCal.errors.map((e) => `${e.domain}:${e.reason}`).join(", ");
      console.error("[GoogleCalendar] FreeBusy calendar error:", errMsg);
      return { synced: false, busy: [], error: errMsg };
    }

    const busy = (primaryCal?.busy || [])
      .filter((b) => b.start && b.end)
      .map((b) => ({
        start: new Date(b.start!).getTime(),
        end: new Date(b.end!).getTime(),
      }));

    return { synced: true, busy };
  } catch (err: any) {
    const detail = err?.response?.data?.error_description || err?.response?.data?.error?.message || err?.message || "Unknown Google Calendar error";
    console.error("[GoogleCalendar] FreeBusy query failed:", detail);
    // Invalidate token cache on auth failures so next attempt re-reads Firestore
    if (err?.response?.status === 401 || String(detail).includes("invalid_grant")) {
      cachedRefreshToken = null;
      tokenCacheTime = 0;
    }
    return { synced: false, busy: [], error: String(detail) };
  }
}

// Evaluate slot availability against minValidTime and busy intervals
export function evaluateSlotsForDate(
  year: number,
  month: number,
  day: number,
  busyIntervals: BusyInterval[],
  minValidTimeMs: number
): SlotStatus[] {
  const allSlots = generateSlotsForYMD(year, month, day);
  return allSlots.map((slot) => {
    const slotStartMs = istToDate(year, month, day, slot.hour, slot.minute).getTime();
    const slotEndMs = slotStartMs + SLOT_DURATION_MINUTES * 60 * 1000;
    const isPast = slotStartMs <= minValidTimeMs;
    const isBusy =
      isPast ||
      busyIntervals.some((busy) => slotStartMs < busy.end && slotEndMs > busy.start);
    return { time: slot.time, available: !isBusy };
  });
}

// Get available slots with sync metadata
export async function getAvailableSlotsDetailed(dateStr: string): Promise<{
  slots: SlotStatus[];
  calendarSynced: boolean;
  calendarError?: string;
}> {
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) {
    return { slots: [], calendarSynced: false, calendarError: "Invalid date format" };
  }

  const allSlots = generateSlotsForYMD(year, month, day);
  if (allSlots.length === 0) {
    return { slots: [], calendarSynced: true };
  }

  // 15-minute buffer so clients cannot book a slot that has already started or starts immediately
  const minValidTimeMs = Date.now() + 15 * 60 * 1000;
  const startOfDay = istToDate(year, month, day, 0, 0);
  const endOfDay = new Date(istToDate(year, month, day, 23, 59).getTime() + 59999);

  const { synced, busy, error } = await queryFreeBusy(startOfDay, endOfDay);
  const slots = evaluateSlotsForDate(year, month, day, busy, minValidTimeMs);

  return {
    slots,
    calendarSynced: synced,
    ...(error ? { calendarError: error } : {}),
  };
}

// Backward-compatible wrapper returning SlotStatus[]
export async function getAvailableSlots(dateStr: string): Promise<SlotStatus[]> {
  const { slots } = await getAvailableSlotsDetailed(dateStr);
  return slots;
}

// Query Google Calendar busy intervals for an entire month in one API call
export async function getMonthBusyIntervals(year: number, month: number): Promise<{
  calendarSynced: boolean;
  busy: BusyInterval[];
  calendarError?: string;
}> {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const startOfMonth = istToDate(year, month, 1, 0, 0);
  const endOfMonth = new Date(istToDate(year, month, daysInMonth, 23, 59).getTime() + 59999);

  const { synced, busy, error } = await queryFreeBusy(startOfMonth, endOfMonth);
  return {
    calendarSynced: synced,
    busy,
    ...(error ? { calendarError: error } : {}),
  };
}

// Check Google Calendar connection status (safe for diagnostic endpoint, returns no secrets)
export async function getCalendarStatus(origin?: string) {
  const hasClientId = Boolean(process.env.GOOGLE_CLIENT_ID?.trim());
  const hasClientSecret = Boolean(process.env.GOOGLE_CLIENT_SECRET?.trim());
  const envToken = Boolean(process.env.GOOGLE_REFRESH_TOKEN?.trim());
  const refreshToken = await getRefreshToken();

  const status: {
    configured: boolean;
    hasRefreshToken: boolean;
    tokenSource: "env" | "firestore" | "none";
    connected: boolean;
    calendarSummary?: string;
    redirectUri: string;
    error?: string;
  } = {
    configured: hasClientId && hasClientSecret,
    hasRefreshToken: Boolean(refreshToken),
    tokenSource: envToken ? "env" : refreshToken ? "firestore" : "none",
    connected: false,
    redirectUri: getRedirectUri(origin),
  };

  if (!status.configured) {
    status.error = "GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing in environment variables.";
    return status;
  }
  if (!refreshToken) {
    status.error = "Google Calendar is not authorized yet. Visit /api/auth/google to connect.";
    return status;
  }

  try {
    const oauth2Client = getOAuth2Client(origin);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const calRes = await calendar.calendarList.get({ calendarId: "primary" });
    status.connected = true;
    status.calendarSummary = calRes.data.summary || "primary";
    return status;
  } catch (err: any) {
    const detail = err?.response?.data?.error_description || err?.response?.data?.error?.message || err?.message || "Failed to connect to Google Calendar";
    status.error = String(detail);
    return status;
  }
}

// Create a calendar event for a booking
export async function createCalendarEvent(booking: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const calendar = await getCalendarClient();
  if (!calendar) {
    console.warn("[GoogleCalendar] Skipping event creation — calendar client unavailable.");
    return null;
  }

  const parsedTime = parseTimeLabel(booking.time);
  if (!parsedTime) {
    console.error("[GoogleCalendar] Invalid booking time format:", booking.time);
    return null;
  }

  const [year, month, day] = booking.date.split("-").map(Number);
  if (!year || !month || !day) {
    console.error("[GoogleCalendar] Invalid booking date format:", booking.date);
    return null;
  }

  const startDateObj = istToDate(year, month, day, parsedTime.hour, parsedTime.minute);
  const endDateObj = new Date(startDateObj.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
  const endIST = new Date(endDateObj.getTime() + IST_OFFSET_MS);
  const startDateTime = formatISTDateTime(year, month, day, parsedTime.hour, parsedTime.minute);
  const endDateTime = formatISTDateTime(
    endIST.getUTCFullYear(),
    endIST.getUTCMonth() + 1,
    endIST.getUTCDate(),
    endIST.getUTCHours(),
    endIST.getUTCMinutes()
  );

  try {
    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `Consultation - ${booking.name}`,
        description: `Client: ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nService: ${booking.service}\nNotes: ${booking.notes || "N/A"}`,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Kolkata",
        },
        attendees: booking.email ? [{ email: booking.email }] : [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });
    return event.data;
  } catch (err: any) {
    const detail = err?.response?.data || err?.message || err;
    console.error("[GoogleCalendar] Failed to create calendar event:", detail);
    return null;
  }
}
