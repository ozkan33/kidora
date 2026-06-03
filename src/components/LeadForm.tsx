"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Bir şeyler ters gitti. Lütfen tekrar deneyin.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Lütfen tekrar deneyin.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-blob bg-teal-soft p-8 text-center">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-3 font-display text-xl font-semibold text-ink">
          Teşekkürler — talebinizi aldık!
        </h3>
        <p className="mt-2 text-muted">
          Kidora ekibinden bir üye, randevusuz ziyaret saatinizi onaylamak için
          kısa süre içinde sizinle iletişime geçecek.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-bold text-coral hover:underline"
        >
          Yeni bir talep gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Adınız" name="name" required placeholder="Ayşe Yılmaz" />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          required
          placeholder="(5xx) xxx xx xx"
        />
      </div>
      <Field
        label="E-posta"
        name="email"
        type="email"
        required
        placeholder="ornek@eposta.com"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Çocuğun yaşı"
          name="childAge"
          placeholder="örn. 8 aylık"
        />
        <Field
          label="Tercih edilen gün / saat"
          name="preferred"
          placeholder="örn. Cmt sabahı"
        />
      </div>
      <label className="grid gap-1.5">
        <span className="text-sm font-bold text-ink">Bilmemiz gereken bir şey var mı?</span>
        <textarea
          name="message"
          rows={3}
          placeholder="Miniğinizden biraz bahsedin…"
          className="rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3 outline-none transition-colors focus:border-coral"
        />
      </label>

      {status === "error" && (
        <p className="text-sm font-semibold text-coral">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 rounded-full bg-coral px-7 py-3.5 font-bold text-cream shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Gönderiliyor…" : "Randevusuz ziyaret saati iste"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-bold text-ink">
        {label}
        {required && <span className="text-coral"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3 outline-none transition-colors focus:border-coral"
      />
    </label>
  );
}
