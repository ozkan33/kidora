"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STAGES } from "./stages";

gsap.registerPlugin(ScrollTrigger);

export default function GrowthJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    // On mobile, the browser's address bar collapsing/expanding fires a resize
    // that would make ScrollTrigger recalculate mid-scroll and jump. Ignore it
    // so the pinned growth journey scrubs smoothly on touch devices.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const n = STAGES.length;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        // f goes 0 → (n-1) across the whole pinned scroll.
        const f = self.progress * (n - 1);

        // A-under / B-over cross-fade: the current photo stays fully opaque
        // underneath while the next one fades in on top. This avoids the
        // mid-transition "dip" where both are semi-transparent and the
        // background bleeds through (the cause of the choppiness).
        const base = Math.min(STAGES.length - 1, Math.floor(f));
        const frac = f - base;
        photoRefs.current.forEach((el, i) => {
          if (!el) return;
          let opacity = 0;
          let z = 1;
          if (i < base) {
            opacity = 1; // already-passed frames stay solid below
          } else if (i === base) {
            opacity = 1;
            z = 2;
          } else if (i === base + 1) {
            opacity = frac; // incoming frame fades in on top
            z = 3;
          }
          el.style.opacity = String(opacity);
          el.style.zIndex = String(z);
          // Gentle, continuous grow tied to overall progress (no per-frame jump).
          el.style.transform = `scale(${1.06 - 0.06 * self.progress})`;
        });

        // Hero (brand intro) fades out over the first frame transition;
        // the growth UI (milestones, timeline, progress) fades in to replace it.
        const heroOpacity = Math.max(0, Math.min(1, 1 - f / 0.85));
        if (heroRef.current) {
          heroRef.current.style.opacity = String(heroOpacity);
          heroRef.current.style.pointerEvents = heroOpacity < 0.1 ? "none" : "auto";
        }
        if (uiRef.current) uiRef.current.style.opacity = String(1 - heroOpacity);

        if (barRef.current) barRef.current.style.width = `${self.progress * 100}%`;

        const idx = Math.round(f);
        setActive((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => st.kill();
  }, []);

  // ── Reduced-motion fallback: hero + a clean static gallery, no pinning ──
  if (reduced) {
    return (
      <section id="journey" className="bg-sand pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5">
          <Hero />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((s) => (
              <figure key={s.id} className="rounded-blob bg-cream p-2.5 shadow-sm ring-1 ring-ink/10">
                <div className="relative aspect-square overflow-hidden rounded-[1.4rem]">
                  <Image src={s.src} alt={`${s.age} çocuk`} fill className="object-cover" sizes="(max-width:1024px) 50vw, 33vw" />
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                    style={{
                      background:
                        "linear-gradient(160deg, color-mix(in srgb, var(--color-teal) 55%, transparent), color-mix(in srgb, var(--color-coral) 45%, transparent))",
                      opacity: 0.4,
                    }}
                  />
                </div>
                <figcaption className="px-3 pb-3 pt-4">
                  <span className="text-sm font-bold" style={{ color: s.accent }}>{s.age}</span>
                  <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted">{s.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-sand"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      {/* Pinned stage */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-blob bg-sand px-5">
        {/* Centered photo frame — a "matte print" card. Capped well below the
            1024px source so the browser always DOWNSCALES (crisp), and the
            cream mat + brand grade make the cool studio gray cohere with the
            brand palette so the photo never looks pasted on. */}
        <div className="relative aspect-square w-[min(82vw,56vh,28rem)] rounded-[2rem] bg-cream p-2.5 shadow-[0_30px_80px_-20px_rgba(35,74,92,0.35)] ring-1 ring-ink/10 sm:p-3">
          {/* Brand gradient hairline on the card edge */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{
              padding: 1,
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-teal) 38%, transparent), color-mix(in srgb, var(--color-coral) 38%, transparent))",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Inner clipped print: photos + grade + vignette */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => {
                  photoRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-[opacity]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={s.src}
                  alt={`${s.age} çocuk`}
                  fill
                  priority={i <= 1}
                  sizes="(max-width: 640px) 82vw, 28rem"
                  className="object-cover"
                />
              </div>
            ))}
            {/* Brand grade: nudges the dull studio gray into the brand family.
                soft-light keeps skin believable; tune opacity if skin tints. */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in srgb, var(--color-teal) 55%, transparent), color-mix(in srgb, var(--color-coral) 45%, transparent))",
                opacity: 0.4,
              }}
            />
            {/* Subtle inner vignette so the print edges feel soft */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(35,74,92,0.12)]" />
          </div>
        </div>

        {/* ── Growth UI (milestones + timeline + progress); fades in ── */}
        <div ref={uiRef} className="mt-6 w-full max-w-2xl text-center opacity-0">
          <div className="relative mx-auto h-36 sm:h-32">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-x-0 transition-all duration-500"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: `translateY(${active === i ? 0 : 10}px)`,
                }}
                aria-hidden={active !== i}
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm font-bold"
                  style={{ backgroundColor: s.accent, color: "var(--color-ink)" }}
                >
                  {s.age}
                </span>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mx-auto mt-1.5 max-w-md text-sm text-muted sm:text-base">
                  {s.note}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline dots */}
          <div className="mt-3 flex items-center justify-center gap-3">
            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: active === i ? 28 : 10,
                  backgroundColor: active === i ? s.accent : "rgba(52,50,74,0.18)",
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mx-auto mt-4 h-1.5 w-[min(90%,28rem)] overflow-hidden rounded-full bg-ink/10">
            <div ref={barRef} className="h-full w-0 rounded-full bg-coral" />
          </div>
        </div>

        {/* ── Hero (brand intro); covers the stage, then fades to reveal it ── */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-blob bg-sand px-5 text-center"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-coral-soft px-4 py-1.5 text-sm font-bold text-coral">
              Erken çocukluk gelişimi · 0–3 yaş
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              Büyümelerini,
              <br />
              <span className="text-coral">her adımda</span> izleyin.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted">
              İlk günlerden ilk koşulara — çocuğunuzun gelişimini uzman ve oyun
              temelli bakımla destekliyoruz.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/schedule"
                className="rounded-full bg-coral px-7 py-3.5 font-bold text-cream shadow-md transition-transform hover:-translate-y-0.5"
              >
                Randevu al
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-ink/10 bg-cream px-7 py-3.5 font-bold text-ink transition-colors hover:border-coral"
              >
                Hizmetlerimiz
              </Link>
            </div>
            <p className="mt-10 animate-pulse text-sm font-semibold uppercase tracking-widest text-ink/60">
              Büyümek için kaydır ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-coral-soft px-4 py-1.5 text-sm font-bold text-coral">
        Erken çocukluk gelişimi · 0–3 yaş
      </span>
      <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
        Büyümelerini, <span className="text-coral">her adımda</span> izleyin.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-muted">
        İlk günlerden ilk koşulara — çocuğunuzun gelişimini uzman ve oyun temelli
        bakımla destekliyoruz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/schedule"
          className="rounded-full bg-coral px-7 py-3.5 font-bold text-cream shadow-md transition-transform hover:-translate-y-0.5"
        >
          Randevu al
        </Link>
        <Link
          href="/services"
          className="rounded-full border-2 border-ink/10 bg-cream px-7 py-3.5 font-bold text-ink transition-colors hover:border-coral"
        >
          Hizmetlerimiz
        </Link>
      </div>
    </div>
  );
}
