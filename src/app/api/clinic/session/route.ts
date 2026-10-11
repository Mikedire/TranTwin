import { NextRequest, NextResponse } from "next/server";
import { config } from "@lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side proxy for the Clinic AI backend.
 *
 * The service bearer token is injected here from the server environment so it
 * is never shared with the client. The client only talks to this route.
 */
async function clinicFetch(path: string, init?: RequestInit) {
  const token = process.env.CLINIC_API_BEARER_TOKEN || "";
  const res = await fetch(`${config.clinic.apiUrl}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const json = await res.json().catch(() => null);
  return NextResponse.json(json, { status: res.status });
}

/** Creates a new Clinic chat session. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  return clinicFetch("/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
}

/**
 * GET /api/clinic/session?id=<sessionId>            → session history
 * GET /api/clinic/session?id=<sessionId>&query=<q>  → send a message
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const query = searchParams.get("query");

  if (id && query) {
    return clinicFetch(
      `/session?session-id=${encodeURIComponent(id)}&query=${encodeURIComponent(
        query
      )}`,
      { method: "GET" }
    );
  }
  if (id) {
    return clinicFetch(`/session/${encodeURIComponent(id)}`, {
      method: "GET",
    });
  }
  return NextResponse.json({ error: "missing_session_id" }, { status: 400 });
}