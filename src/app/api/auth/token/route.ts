import { NextRequest, NextResponse } from "next/server";
import { buildTokenUrl, config } from "@lib/config";

export const runtime = "nodejs";

const FLOW_ORDER = ["login", "register", "passwordReset"] as const;

/**
 * Exchanges an Azure AD B2C authorization code for tokens.
 *
 * The `client_secret` is read from the server environment here and never
 * shipped to the browser. For parity with the original client flow, the
 * exchange retries across the login → register → passwordReset policies while
 * B2C responds with `invalid_grant`.
 */
export async function POST(request: NextRequest) {
  const clientSecret = process.env.AZURE_B2C_CLIENT_SECRET;

  if (!clientSecret) {
    return NextResponse.json(
      { error: "missing_server_config" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const code = body?.code as string | undefined;

  if (!code) {
    return NextResponse.json({ error: "missing_code" }, { status: 400 });
  }

  const params = new URLSearchParams({
    client_id: config.b2c.clientId,
    client_secret: clientSecret,
    redirect_uri: config.b2c.redirectUri,
    code,
    scope: config.b2c.scope,
    grant_type: "authorization_code",
  });

  const attempts: Array<{ flow: (typeof FLOW_ORDER)[number]; status: number }> =
    [];

  for (const flow of FLOW_ORDER) {
    const res = await fetch(buildTokenUrl(flow), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const json = await res.json();

    attempts.push({ flow, status: res.status });

    if (json?.id_token) {
      return NextResponse.json({ success: json });
    }
    if (json?.error !== "invalid_grant") {
      break;
    }
  }

  return NextResponse.json({ success: null, attempts });
}