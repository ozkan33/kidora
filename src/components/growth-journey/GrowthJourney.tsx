"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const FRAME_W = 1280;
const FRAME_H = 720;
// Full-res frames for desktop; a downscaled set (~1/3 the bytes) for phones.
const frameName = (i: number) => `frame_${String(i + 1).padStart(3, "0")}.jpg`;
const frameSrc = (i: number, small: boolean) =>
  `/${small ? "frames-sm" : "frames"}/${frameName(i)}`;

const RM_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(RM_QUERY);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

function HeroCopy() {
  return (
    <div className="max-w-2xl hero-rise">
      <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-sm font-bold text-cream ring-1 ring-cream/25 backdrop-blur-sm">
        Erken çocukluk gelişimi · 0–3 yaş
      </span>
      <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-cream sm:text-6xl">
        Büyümelerini,
        <br />
        <span className="text-sky">her adımda</span> izleyin.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-cream/85">
        İlk günlerden ilk koşulara — çocuğunuzun gelişimini oyun temelli ve
        uzman bir bakımla destekliyoruz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/schedule"
          className="rounded-full bg-coral px-7 py-3.5 font-bold text-cream shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Randevu al
        </Link>
        <Link
          href="/services"
          className="rounded-full border-2 border-cream/30 bg-cream/10 px-7 py-3.5 font-bold text-cream backdrop-blur-sm transition-colors hover:border-cream"
        >
          Hizmetlerimiz
        </Link>
      </div>
      <p className="mt-10 animate-pulse text-sm font-semibold uppercase tracking-widest text-cream/70">
        Aşağı kaydır ↓
      </p>
    </div>
  );
}

/**
 * Landing hero: scroll-scrubbed cinematic sequence. The clip (frame rising +
 * child growing newborn→toddler) is pre-extracted to a frame sequence and drawn
 * to a <canvas> by scroll progress (Apple-style) — no video seeking, so it's
 * smooth. Pinned (sticky) while scrubbing. Reduced-motion → static poster.
 */
export default function LandingHero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(-1);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    // Phones get the lighter frame set so the hero isn't a ~7MB download on data.
    const small = window.matchMedia("(max-width: 768px)").matches;

    function paint(index: number, force = false) {
      if (!force && index === currentRef.current) return;
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      currentRef.current = index;
      const cw = canvas!.width;
      const ch = canvas!.height;
      ctx!.clearRect(0, 0, cw, ch);
      // Always "contain" so the whole 16:9 frame stays visible. On portrait this
      // means a centred band with the blurred poster filling the letterbox — we
      // must not "cover"/crop, because the subject drifts across the frame as the
      // sequence plays and a side-crop would slide it off-screen.
      const scale = Math.min(cw / FRAME_W, ch / FRAME_H);
      const dw = FRAME_W * scale;
      const dh = FRAME_H * scale;
      ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      // Skip no-op resizes (e.g. iOS URL-bar show/hide) so we don't clear and
      // re-rasterize the canvas mid-scrub.
      if (w === canvas!.width && h === canvas!.height) return;
      canvas!.width = w;
      canvas!.height = h;
      paint(currentRef.current < 0 ? 0 : currentRef.current, true);
    }

    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i, small);
      img.onload = () => {
        loaded++;
        if (i === 0) paint(0, true);
        if (loaded === FRAME_COUNT) ScrollTrigger.refresh();
      };
      images.push(img);
    }

    resize();
    window.addEventListener("resize", resize);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      onUpdate: (self) => {
        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.round(self.progress * (FRAME_COUNT - 1)),
        );
        paint(idx);
        const content = contentRef.current;
        if (content) {
          // Copy is fully readable at the start, gone by ~35% so the growth plays clean.
          const o = Math.max(0, 1 - self.progress / 0.35);
          content.style.opacity = String(o);
          content.style.pointerEvents = o < 0.1 ? "none" : "auto";
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, [reduced]);

  // ── Reduced-motion: static poster hero, no pin/scrub ──
  if (reduced) {
    return (
      <section id="journey" className="relative h-[100svh] min-h-[34rem] overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/hero-poster.jpg)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center [text-shadow:0_2px_22px_rgba(0,0,0,0.6)]">
          <HeroCopy />
        </div>
      </section>
    );
  }

  return (
    // Section height = scroll distance the growth sequence plays over. Shorter on
    // mobile so the hero clears in fewer thumb-scrolls; full length on desktop.
    <section ref={sectionRef} id="journey" className="relative h-[220vh] md:h-[300vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        {/* Blurred poster fills the letterbox so the contained frame has no hard bars */}
        <div
          aria-hidden
          className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl brightness-105 saturate-[1.1]"
          style={{ backgroundImage: "url(/hero-poster.jpg)" }}
        />
        {/* The scrubbed growth sequence — brightened + crisper for a well-lit, airy look */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
          style={{ filter: "brightness(1.07) contrast(1.05) saturate(1.08)" }}
        />

        {/* Legibility grade — darker behind the centred copy, airy at the edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(85% 65% at 50% 46%, rgba(8,14,20,0.6) 0%, rgba(8,14,20,0.16) 55%, transparent 80%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Hero copy — fades out as the growth sequence plays */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center [text-shadow:0_2px_22px_rgba(0,0,0,0.65)]"
        >
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}
