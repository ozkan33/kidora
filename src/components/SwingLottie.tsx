"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

/**
 * The "coming soon" hero animation: a child swinging, played from a dotLottie
 * asset (public/swing.lottie — "Happy Swinging boy" by Boltbite, LottieFiles
 * free license). Client-only because the player needs canvas/wasm. Honors
 * prefers-reduced-motion by holding on the first frame instead of looping.
 */
export default function SwingLottie() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <DotLottieReact
      src="/swing.lottie"
      autoplay={!reduced}
      loop={!reduced}
      speed={0.6}
      aria-hidden
      className="aspect-square w-full max-w-sm"
    />
  );
}
