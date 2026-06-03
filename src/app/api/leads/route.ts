import { NextResponse } from "next/server";

/**
 * Walk-in / lead capture endpoint.
 *
 * MVP behavior: validate the submission and log it server-side so nothing is
 * lost. When Supabase is configured (see lib/supabase/server.ts), this is the
 * single place to also persist the lead into a `leads` table — the auth/registry
 * phase can wire that up without touching the form UI.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || (!email && !phone)) {
    return NextResponse.json(
      { error: "Lütfen adınızı ve size ulaşabileceğimiz bir bilgi ekleyin." },
      { status: 422 }
    );
  }

  const lead = {
    name,
    email,
    phone,
    childAge: String(body.childAge ?? "").trim(),
    preferred: String(body.preferred ?? "").trim(),
    message: String(body.message ?? "").trim(),
    receivedAt: new Date().toISOString(),
  };

  // For now we record the lead in server logs. Swap this for a Supabase insert
  // and/or an email/SMS notification when the backend phase begins.
  console.log("[kidora] new walk-in lead:", lead);

  return NextResponse.json({ ok: true });
}
