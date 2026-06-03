import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-coral text-cream">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="8" r="3.2" fill="currentColor" />
                <path
                  d="M5 20c0-4 3.1-7 7-7s7 3 7 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-display text-2xl font-semibold">Kidora</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            0–3 yaş arası minikler için erken gelişimi besliyoruz — çünkü ilk üç
            yıl bir ömrü şekillendirir.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cream/60">
            Keşfet
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link href="/#journey" className="hover:text-coral">Gelişim Yolculuğu</Link></li>
            <li><Link href="/services" className="hover:text-coral">Hizmetler</Link></li>
            <li><Link href="/about" className="hover:text-coral">Hakkımızda</Link></li>
            <li><Link href="/schedule" className="hover:text-coral">Randevu al</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cream/60">
            Bize ulaşın
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>Pzt–Cmt, 09:00–18:00</li>
            <li>Randevusuz ziyaretlere açığız</li>
            <li><a href="mailto:hello@kidora.com" className="hover:text-coral">hello@kidora.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-cream/50">
          © {new Date().getFullYear()} Kidora. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
