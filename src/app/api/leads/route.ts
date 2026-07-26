import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { business } from "@/lib/seo";

/**
 * Walk-in / lead capture endpoint.
 *
 * Delivery: each valid lead is emailed via SMTP (Zoho). Configure on the host:
 *   SMTP_USER — Zoho mailbox login (the user account, not the iletisim@ group)
 *   SMTP_PASS — Zoho app password (myaccount.zoho.com → Security → App Passwords)
 *   LEADS_TO  — optional recipient override; defaults to business.email
 *   SMTP_HOST / SMTP_PORT — optional; default smtp.zoho.com:465 (.com DC)
 * Until SMTP is configured, leads fall back to server logs so nothing is lost
 * silently in development.
 *
 * Spam protection: hidden "website" honeypot field (bots fill it, humans can't
 * see it) + a small per-IP submission throttle. The throttle is in-memory, so
 * on serverless it only holds per warm instance — enough to blunt bursts
 * without external infrastructure.
 */

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const field = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Honeypot: real users never see this field. Pretend success for bots.
  if (field(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body.name, 200);
  const email = field(body.email, 200);
  const phone = field(body.phone, 50);

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
    childAge: field(body.childAge, 200),
    preferred: field(body.preferred, 200),
    message: field(body.message, 2000),
    receivedAt: new Date().toISOString(),
  };

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.zoho.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Kidora Web" <${SMTP_USER}>`,
        to: process.env.LEADS_TO || business.email,
        replyTo: email || undefined,
        subject: `Yeni randevu talebi — ${name}`,
        text: [
          `Ad: ${lead.name}`,
          `Telefon: ${lead.phone || "-"}`,
          `E-posta: ${lead.email || "-"}`,
          `Çocuğun yaşı: ${lead.childAge || "-"}`,
          `Tercih edilen zaman: ${lead.preferred || "-"}`,
          `Mesaj: ${lead.message || "-"}`,
          ``,
          `Alındı: ${lead.receivedAt}`,
        ].join("\n"),
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      // Delivery failed — keep the lead in server logs so it isn't lost.
      console.error("[kidora] lead email failed:", err);
      console.log("[kidora] new walk-in lead:", lead);
      return NextResponse.json({ ok: true });
    }
  }

  // SMTP not configured yet — record the lead in server logs.
  console.log("[kidora] new walk-in lead:", lead);
  return NextResponse.json({ ok: true });
}
