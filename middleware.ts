import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to validate whether an origin is allowed
function isAllowedOrigin(origin: string, host: string | null): boolean {
  if (!origin) return true; // Direct/server-to-server or no-origin requests are allowed

  // Clean trailing slash
  const cleanOrigin = origin.trim().replace(/\/+$/, "");

  // Always allow if origin matches the current request host (same origin)
  if (host) {
    const cleanHost = host.trim().toLowerCase();
    if (
      cleanOrigin === `https://${cleanHost}` ||
      cleanOrigin === `http://${cleanHost}`
    ) {
      return true;
    }
  }

  // Allow advocaterichadhanda.com and any subdomain (*.advocaterichadhanda.com)
  if (/^https?:\/\/([a-zA-Z0-9-]+\.)*advocaterichadhanda\.com$/i.test(cleanOrigin)) {
    return true;
  }

  // Allow any Vercel domain (*.vercel.app)
  if (/^https?:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/i.test(cleanOrigin)) {
    return true;
  }

  // Allow localhost and local loopback with any port
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(cleanOrigin)) {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin") || "";
  const host = request.headers.get("host") || "";

  // CORS Protection for API routes
  if (pathname.startsWith("/api/")) {
    const isWebhook = pathname.startsWith("/api/webhook/");
    const allowed = isWebhook || isAllowedOrigin(origin, host);

    // Block requests from unauthorized external origins
    if (!allowed) {
      return NextResponse.json(
        { error: "Forbidden: Origin not allowed" },
        { status: 403 }
      );
    }

    // Handle preflight OPTIONS requests
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });
      if (origin) {
        response.headers.set("Access-Control-Allow-Origin", origin);
      }
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-requested-with");
      response.headers.set("Access-Control-Max-Age", "86400");
      return response;
    }

    // Add CORS headers to API responses
    const response = NextResponse.next();
    if (origin && allowed) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-requested-with");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
