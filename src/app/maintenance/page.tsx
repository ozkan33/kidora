import type { Metadata } from "next";
import Image from "next/image";
import SwingLottie from "@/components/SwingLottie";

export const metadata: Metadata = {
  title: "Çok Yakında",
  description:
    "Kidora çok yakında açılıyor. Minik kâşifler için sıcacık, yepyeni bir dünya hazırlıyoruz.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="bg-blob relative min-h-[100svh] overflow-hidden bg-cream">
      {/* Warm header glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sunny/45 via-coral-soft/25 to-transparent"
      />

      <section className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center gap-7 px-6 py-16 text-center">
        <Image
          src="/kidora-lockup-light.png"
          alt="Kidora — Aile Danışma Merkezi"
          width={1380}
          height={603}
          priority
          className="h-20 w-auto sm:h-24"
        />

        <span className="inline-flex items-center gap-2 rounded-full bg-coral-soft px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-coral">
          <span className="inline-block h-2 w-2 rounded-full bg-coral" />
          Çok Yakında
        </span>

        <h1 className="text-4xl font-bold text-teal sm:text-5xl md:text-6xl">
          Kapılarımızı açıyoruz!
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Minik kâşifler için sıcacık, yepyeni bir dünya kuruyoruz. Kidora ailesi
          olarak son dokunuşları yapıyoruz — yakında görüşmek üzere!
        </p>

        <SwingLottie />

        <p className="text-sm text-muted">
          © 2026 Kidora · Aile Danışma Merkezi
        </p>
      </section>
    </div>
  );
}

