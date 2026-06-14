"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";
type FieldErrors = Partial<Record<"name" | "phone" | "email", string>>;

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "ok") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const errs: FieldErrors = {};
    if (!data.name?.trim()) errs.name = "Adınızı girin.";
    if (!data.phone?.trim()) errs.phone = "Telefon numaranızı girin.";
    if (!data.email?.trim()) errs.email = "E-posta adresinizi girin.";
    else if (!/.+@.+\..+/.test(data.email))
      errs.email = "Geçerli bir e-posta adresi girin.";

    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setError("");

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
        <div className="text-4xl" aria-hidden>
          🎉
        </div>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-3 font-display text-xl font-semibold text-ink outline-none"
        >
          Teşekkürler — talebinizi aldık!
        </h3>
        <p className="mt-2 text-muted">
          Kidora ekibinden bir üye, ziyaret saatinizi onaylamak için
          kısa süre içinde sizinle iletişime geçecek.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full font-bold text-coral hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-teal-soft"
        >
          Yeni bir talep gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="@container grid gap-4">
      <div className="grid gap-4 @md:grid-cols-2 @md:grid-rows-[auto_auto] @md:gap-y-2">
        <Field
          label="Adınız"
          name="name"
          required
          autoComplete="name"
          placeholder="Ayşe Yılmaz"
          error={fieldErrors.name}
          className="@md:row-span-2 @md:grid-rows-subgrid"
        />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="(5xx) xxx xx xx"
          error={fieldErrors.phone}
          className="@md:row-span-2 @md:grid-rows-subgrid"
        />
      </div>
      <Field
        label="E-posta"
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="ornek@eposta.com"
        error={fieldErrors.email}
      />
      <div className="grid gap-4 @md:grid-cols-2 @md:grid-rows-[auto_auto] @md:gap-y-2">
        <Field
          label="Çocuğun yaşı"
          name="childAge"
          optional
          placeholder="örn. 8 aylık"
          className="@md:row-span-2 @md:grid-rows-subgrid"
        />
        <Field
          label="Tercih edilen gün / saat"
          name="preferred"
          optional
          placeholder="örn. Cmt sabahı"
          className="@md:row-span-2 @md:grid-rows-subgrid"
        />
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-bold text-ink">
          Bilmemiz gereken bir şey var mı?{" "}
          <span className="font-normal text-muted">(isteğe bağlı)</span>
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="Miniğinizden biraz bahsedin…"
          className="w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm font-semibold text-coral">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-bold text-cream shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-sand disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" && (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream"
          />
        )}
        {status === "sending" ? "Gönderiliyor…" : "Randevu talebi gönder"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
  inputMode,
  placeholder,
  error,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className={`grid min-w-0 gap-2${className ? ` ${className}` : ""}`}>
      <span className="text-sm font-bold text-ink">
        {label}
        {required && (
          <span className="ml-0.5 text-coral" aria-hidden>
            *
          </span>
        )}
        {optional && (
          <span className="font-normal text-muted"> (isteğe bağlı)</span>
        )}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-sand aria-[invalid]:border-coral"
      />
      {error && (
        <span id={errorId} role="alert" className="text-sm font-semibold text-coral">
          {error}
        </span>
      )}
    </label>
  );
}
