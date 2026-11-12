import { NextResponse } from "next/server";
import { getCalendarStatus, getRequestOrigin } from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const origin = getRequestOrigin(request);
    const status = await getCalendarStatus(origin);
    return NextResponse.json(status, {
      status: status.connected ? 200 : 503,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Error checking Google Calendar status:", error);
    return NextResponse.json(
      { connected: false, error: "Failed to check Google Calendar status" },
      { status: 500 }
    );
  }
}
