import Link from "next/link";
import Image from "next/image";
import { business } from "@/lib/seo";
import AddressLink from "./AddressLink";

export default function Footer() {
  const { address, phone, email } = business;
  const cityLine = [address.locality, address.region]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image
            src="/kidora-lockup-dark.png"
            alt="Kidora — Özel Aile Danışma Merkezi"
            width={1600}
            height={526}
            className="h-20 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            Erdemli, Mersin&apos;de aile danışma merkezi: 0–3 yaş erken gelişim
            programları ve çocuk atölyeleriyle minikleri büyütüyoruz — çünkü ilk
            üç yıl bir ömrü şekillendirir.
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
            <li>
              <AddressLink className="group inline-flex items-start gap-2 hover:text-sky">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 text-cream/50 group-hover:text-sky"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {address.street && <>{address.street}<br /></>}
                  {cityLine}
                  <span className="mt-0.5 block text-xs text-cream/50 group-hover:text-sky">
                    Yol tarifi al →
                  </span>
                </span>
              </AddressLink>
            </li>
            <li>Pzt–Cmt, 09:00–18:00</li>
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-sky">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="hover:text-sky">
                  {email}
                </a>
              </li>
            )}
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
