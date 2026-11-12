import { NextResponse } from "next/server";
import {
  getOAuth2Client,
  getRefreshToken,
  getRequestOrigin,
  storeRefreshToken,
} from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const origin = getRequestOrigin(request);

  if (error) {
    return NextResponse.redirect(
      new URL("/?auth=error&message=" + encodeURIComponent(error), origin)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?auth=error&message=No+authorization+code+received", origin)
    );
  }

  try {
    const oauth2Client = getOAuth2Client(origin);
    const { tokens } = await oauth2Client.getToken(code);

    if (tokens.refresh_token) {
      await storeRefreshToken(tokens.refresh_token);
    } else {
      const existingToken = await getRefreshToken();
      if (!existingToken) {
        return NextResponse.redirect(
          new URL(
            "/?auth=error&message=" +
              encodeURIComponent(
                "Google did not return a refresh token. Please remove app access in your Google Account permissions and reconnect."
              ),
            origin
          )
        );
      }
    }

    return NextResponse.redirect(
      new URL("/?auth=success&message=Google+Calendar+connected+successfully", origin)
    );
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(
      new URL("/?auth=error&message=Failed+to+complete+authorization", origin)
    );
  }
}
