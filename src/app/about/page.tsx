import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Kidora, 0–3 yaş için sıcaklığı bilimsel erken çocukluk uzmanlığıyla birleştiren bir çocuk gelişimi merkezidir.",
};

const VALUES = [
  {
    title: "Önce sıcaklık",
    body: "Her çocuk sabır, sevgi ve saygıyla karşılanır. Güven, tüm öğrenmenin temelidir.",
  },
  {
    title: "Bilime dayalı",
    body: "Programlarımız güncel erken çocukluk araştırmalarından ve kanıtlanmış gelişim yaklaşımlarından beslenir.",
  },
  {
    title: "Aile ortağı",
    body: "Ebeveynlerin yerine değil, onlarla birlikte çalışırız — gördüklerimizi paylaşır, bildiklerinizi öğreniriz.",
  },
];

export default function AboutPage() {
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
            <div className="absolute inset-0 grid place-items-center text-7xl">
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
