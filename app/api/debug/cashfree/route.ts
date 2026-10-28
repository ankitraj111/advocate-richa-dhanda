import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { error: "Forbidden: Debug endpoint is disabled in production." },
    { status: 403 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "Forbidden: Debug endpoint is disabled in production." },
    { status: 403 }
  );
}
