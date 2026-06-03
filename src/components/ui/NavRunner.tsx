"use client";

import { RefObject, useEffect, useRef } from "react";

const RUN_W = 28;

/**
 * A tiny child that scampers across the nav — from the Kidora logo to the
 * "Gelişim Yolculuğu" link — then fades out. Repeats on a gentle loop.
 * Desktop only; respects prefers-reduced-motion.
 */
export default function NavRunner({
  navRef,
  fromRef,
  toRef,
}: {
  navRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
}) {
  const runnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runner = runnerRef.current;
    const nav = navRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!runner || !nav || !from || !to) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let anim: Animation | null = null;

    const run = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const navRect = nav.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      if (toRect.width === 0) return; // target hidden (mobile)
      const startX = from.getBoundingClientRect().right - navRect.left + 4;
      const endX = toRect.left - navRect.left - RUN_W - 4;
      if (endX <= startX) return;

      anim?.cancel();
      anim = runner.animate(
        [
          { transform: `translateX(${startX}px)`, opacity: 0 },
          { transform: `translateX(${startX}px)`, opacity: 1, offset: 0.07 },
          { transform: `translateX(${endX}px)`, opacity: 1, offset: 0.9 },
          { transform: `translateX(${endX}px)`, opacity: 0 },
        ],
        { duration: 2600, easing: "linear", fill: "forwards" },
      );
    };

    const start = window.setTimeout(run, 1400);
    const interval = window.setInterval(run, 18000);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
      anim?.cancel();
    };
  }, [navRef, fromRef, toRef]);

  return (
    <div
      ref={runnerRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 z-10 -mt-3.5 hidden text-teal opacity-0 md:block"
      style={{ transform: "translateX(0px)" }}
    >
      <svg
        className="kidora-runner"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <g
          className="bob"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        >
          {/* back limbs */}
          <line className="leg-b" x1="13" y1="16" x2="9" y2="22" />
          <line className="arm-b" x1="15" y1="10" x2="11" y2="13" />
          {/* torso + head */}
          <line x1="15" y1="9.5" x2="13" y2="16" />
          <circle cx="16" cy="6" r="3.2" fill="currentColor" stroke="none" />
          {/* front limbs */}
          <line className="leg-a" x1="13" y1="16" x2="17" y2="22" />
          <line className="arm-a" x1="15" y1="10" x2="19" y2="13" />
        </g>
      </svg>
    </div>
  );
}
