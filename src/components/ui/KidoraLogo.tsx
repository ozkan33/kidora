"use client";

import { useEffect, useRef } from "react";

/**
 * Kidora nav logo: animated badge + Fredoka wordmark.
 * Choreography ported from the brand logo-embed snippet:
 * badge springs in → child figure strokes draw → head pops →
 * leaves fade → wordmark rises. Plays once on mount.
 */
export default function KidoraLogo() {
  const ref = useRef<SVGSVGElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const word = wordRef.current;
    if (!svg || !word) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = (s: string) => svg.querySelector<SVGElement>(s);
    const badge = q(".k-badge")!;
    const leaves = q(".k-leaves")!;
    const head = q(".k-head")!;
    const strokes = [".k-body", ".k-armL", ".k-armR", ".k-legL", ".k-legR"]
      .map(q)
      .filter(Boolean) as SVGGeometryElement[];

    let raf = 0;
    const timers: number[] = [];

    const play = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;

      // Reset to the starting (hidden) state.
      badge.style.transition = "none";
      badge.style.transformOrigin = "80px 80px";
      badge.style.transform = "scale(0.6)";
      badge.style.opacity = "0";
      leaves.style.transition = "none";
      leaves.style.opacity = "0";
      head.style.transition = "none";
      head.style.transformOrigin = "80px 60px";
      head.style.transform = "scale(0)";
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        p.style.transition = "none";
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      word.style.transition = "none";
      word.style.opacity = "0";
      word.style.transform = "translateY(6px)";

      // Force a reflow so the starting state is committed before we animate.
      void svg.getBoundingClientRect();

      raf = requestAnimationFrame(() => {
        badge.style.transition =
          "transform 0.6s cubic-bezier(.34,1.56,.64,1), opacity 0.4s ease";
        badge.style.transform = "scale(1)";
        badge.style.opacity = "1";

        timers.push(
          window.setTimeout(() => {
            strokes.forEach((p, i) => {
              p.style.transition = "stroke-dashoffset 0.5s ease";
              p.style.transitionDelay = `${i * 0.1}s`;
              p.style.strokeDashoffset = "0";
            });
          }, 400),
          window.setTimeout(() => {
            head.style.transition = "transform 0.45s cubic-bezier(.34,1.56,.64,1)";
            head.style.transform = "scale(1)";
          }, 950),
          window.setTimeout(() => {
            leaves.style.transition = "opacity 0.6s ease";
            leaves.style.opacity = "1";
          }, 1150),
          window.setTimeout(() => {
            word.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            word.style.opacity = "1";
            word.style.transform = "translateY(0)";
          }, 1300),
        );
      });
    };

    play();
    const interval = window.setInterval(play, 30000);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="flex items-center gap-2">
      <svg
        ref={ref}
        viewBox="0 0 160 160"
        className="h-9 w-9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Kidora"
      >
        <defs>
          <linearGradient
            id="kidoraNavBadge"
            x1="20"
            y1="20"
            x2="140"
            y2="140"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3AA6A0" />
            <stop offset="1" stopColor="#2F7FB5" />
          </linearGradient>
        </defs>

        <circle className="k-badge" cx="80" cy="80" r="60" fill="url(#kidoraNavBadge)" />

        <g className="k-leaves">
          <path d="M80 128 C80 101 65 86 49 83 C59 107 70 119 80 123 Z" fill="#FFFFFF" opacity="0.22" />
          <path d="M80 123 C80 93 98 75 116 72 C102 100 91 113 80 119 Z" fill="#FFFFFF" opacity="0.22" />
        </g>

        <g fill="none" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round">
          <circle className="k-head" cx="80" cy="60" r="11" fill="#FFFFFF" stroke="none" />
          <line className="k-body" x1="80" y1="72" x2="80" y2="100" />
          <path className="k-armL" d="M80 80 C69 73 62 65 59 55" />
          <path className="k-armR" d="M80 80 C91 73 98 65 101 55" />
          <path className="k-legL" d="M80 99 L71 119" />
          <path className="k-legR" d="M80 99 L89 119" />
        </g>
      </svg>

      <span
        ref={wordRef}
        className="font-display text-2xl font-semibold text-ink"
      >
        Kidora
      </span>
    </span>
  );
}
