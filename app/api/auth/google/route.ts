import { NextResponse } from "next/server";
import { getAuthUrl, getRequestOrigin } from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not configured." },
        { status: 500 }
      );
    }
    const origin = getRequestOrigin(request);
    const authUrl = getAuthUrl(origin);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}
