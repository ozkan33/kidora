import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, ogBase, SITE_FAQ, faqJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "Erdemli, Mersin'deki Kidora hakkında sıkça sorulan sorular: 0–3 yaş programları, atölyeler, gelişimsel değerlendirme, dikkat testi, randevu ve ücretler.";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description: DESCRIPTION,
  alternates: { canonical: "/sss" },
  openGraph: {
    ...ogBase,
    title: "Sıkça Sorulan Sorular · Kidora",
    description: DESCRIPTION,
    url: absoluteUrl("/sss"),
  },
};

const ALL_FAQ = SITE_FAQ.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <div className="bg-cream pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-3xl px-5">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-teal">
          Merak edilenler
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Sıkça sorulan sorular
        </h1>
        <p className="mt-3 text-lg text-muted">
          Kidora&apos;yı, programlarımızı ve atölyelerimizi merak eden Erdemli
          ve çevresindeki ailelerin en çok sorduğu soruları burada topladık.
          Sorunuz burada yoksa bize yazmaktan çekinmeyin.
        </p>

        {SITE_FAQ.map((group) => (
          <section key={group.category} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-ink">
              {group.category}
            </h2>
            <dl className="mt-4 divide-y divide-ink/10 rounded-blob bg-sand px-6 sm:px-7">
              {group.items.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="font-semibold text-ink">{q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <div className="mt-14 rounded-blob bg-ink px-8 py-12 text-center text-cream">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Aradığınız cevabı burada bulamadınız mı?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-cream/70">
            Randevu alın ya da bize yazın — ailenize en uygun cevabı birlikte
            bulalım.
          </p>
          <Link
            href="/schedule"
            className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-cream transition-transform hover:-translate-y-0.5"
          >
            Randevu al
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ALL_FAQ)) }}
      />
    </div>
  );
}
