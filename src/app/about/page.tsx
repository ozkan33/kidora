import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, business, ogBase } from "@/lib/seo";
import AddressLink from "@/components/ui/AddressLink";

const DESCRIPTION =
  "Kidora, Erdemli, Mersin'de 0–3 yaş için sıcaklığı bilimsel erken çocukluk uzmanlığıyla birleştiren bir çocuk gelişimi ve aile danışma merkezidir.";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    ...ogBase,
    title: "Hakkımızda · Kidora",
    description: DESCRIPTION,
    url: absoluteUrl("/about"),
  },
};

const VALUES = [
  {
    title: "Önce sıcaklık",
    body: "Her çocuk sabır, sevgi ve saygıyla karşılanır. Güven, tüm öğrenmenin temelidir.",
  },
  {
    title: "Bilime dayalı",
    body: "Programlarımız güncel erken çocukluk araştırmalarından ve kanıta dayalı gelişim yaklaşımlarından beslenir.",
  },
  {
    title: "Aile ortağı",
    body: "Ebeveynlerin yerine değil, onlarla birlikte çalışırız — gördüklerimizi paylaşır, bildiklerinizi öğreniriz.",
  },
];

export default function AboutPage() {
  const { address, geo, phone, email } = business;
  const cityLine = [address.locality, address.region].filter(Boolean).join(", ");
  const mapSrc = geo
    ? `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=16&hl=tr&output=embed`
    : null;

  return (
    <div className="bg-cream pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-coral">
              Kidora hakkında
            </span>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              İlk 1.000 gün üzerine kurulu
            </h1>
            <p className="mt-4 text-lg text-muted">
              Kidora basit bir inançla başladı: en erken yıllar en özenli bakımı
              hak eder. Miniklerin — ve ailelerinin — daha ilk günden gelişmesine
              yardımcı olmak için içten sıcaklığı gelişim uzmanlığıyla birleştiriyoruz.
            </p>
            <p className="mt-4 text-muted">
              Yenidoğan bağından bir çocuğun ilk özgüvenli koşusuna kadar, her
              gelişim basamağını kutlar ve aradaki her adımı destekleriz.
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[48%_52%_55%_45%/52%_48%_52%_48%] bg-teal-soft" />
            <div className="absolute inset-10 rounded-[40%_60%_55%_45%/55%_45%_55%_45%] bg-sunny/30" />
            <div aria-hidden className="absolute inset-0 grid place-items-center text-7xl">
              🌱
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-blob bg-sand p-7">
              <h2 className="font-display text-xl font-semibold text-ink">
                {v.title}
              </h2>
              <p className="mt-2 text-muted">{v.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Bize uğrayın
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Erdemli&apos;nin kalbindeyiz. Çalışma saatlerimizde randevusuz da
            uğrayabilirsiniz — kapımız ailelere açık.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {mapSrc && (
              <div className="aspect-[4/3] overflow-hidden rounded-blob lg:aspect-auto lg:h-full lg:min-h-[20rem]">
                <iframe
                  src={mapSrc}
                  title="Kidora konum haritası"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            )}

            <div className="rounded-blob bg-sand p-7">
              <AddressLink className="group inline-flex items-start gap-2.5 text-ink hover:text-coral">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-muted group-hover:text-coral"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-base">
                  {address.street && <>{address.street}<br /></>}
                  {cityLine}
                  <span className="mt-1 block text-sm text-muted group-hover:text-coral">
                    Yol tarifi al →
                  </span>
                </span>
              </AddressLink>

              <p className="mt-5 text-muted">Pzt–Cmt, 10:00–18:00</p>

              {phone && (
                <p className="mt-2">
                  <a
                    href={`tel:${business.phoneE164}`}
                    className="text-ink hover:text-coral"
                  >
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p className="mt-2">
                  <a href={`mailto:${email}`} className="text-ink hover:text-coral">
                    {email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-12">
          <Link
            href="/schedule"
            className="inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-cream transition-transform hover:-translate-y-0.5"
          >
            Gelin tanışalım →
          </Link>
        </div>
      </div>
    </div>
  );
}
