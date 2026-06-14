import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image
            src="/kidora-lockup-dark.png"
            alt="Kidora — Aile Danışmanlık Merkezi"
            width={988}
            height={434}
            className="h-20 w-auto"
          />
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
            <li><Link href="/#journey" className="hover:text-sky">Gelişim Yolculuğu</Link></li>
            <li><Link href="/services" className="hover:text-sky">Hizmetler</Link></li>
            <li><Link href="/about" className="hover:text-sky">Hakkımızda</Link></li>
            <li><Link href="/schedule" className="hover:text-sky">Randevu al</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cream/60">
            Bize ulaşın
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>Pzt–Cmt, 09:00–18:00</li>
            <li>Randevusuz gelebilirsiniz</li>
            <li><a href="mailto:hello@kidora.com" className="hover:text-sky">hello@kidora.com</a></li>
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
