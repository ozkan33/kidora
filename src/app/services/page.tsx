import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Kidora'nın 0–3 yaş için oyun temelli programları: bebek bakımı, çocuk programları, gelişim takibi ve ebeveyn danışmanlığı.",
};

const SERVICES = [
  {
    emoji: "🍼",
    title: "Bebek bakımı (0–12 ay)",
    body: "Sıcak ve duyarlı birebir bakım. Güvenli bağlanmayı ve erken iletişimi geliştiren duyusal oyunlar, yüzüstü pozisyon ve sakin rutinler.",
    points: ["Güvenli bağlanma", "Duyusal & motor oyun", "Beslenme & uyku desteği"],
  },
  {
    emoji: "🧩",
    title: "Çocuk programları (1–3 yaş)",
    body: "Kaba ve ince motor becerileri, dili ve sosyal özgüveni neşeli bir ortamda geliştiren, uzman rehberliğinde oyun temelli seanslar.",
    points: ["Dil & konuşma", "Motor koordinasyon", "Sosyal oyun"],
  },
  {
    emoji: "📋",
    title: "Gelişim takibi",
    body: "Çocuğunuzun nasıl geliştiğini ve sırada ne olduğunu her zaman anlamanız için gelişim tarama araçlarıyla yapılan sakin, düzenli gelişim değerlendirmeleri.",
    points: ["Gelişim takibi", "Erken destek", "Ebeveyn raporları"],
  },
  {
    emoji: "👪",
    title: "Ebeveyn danışmanlığı",
    body: "Evde uygulayabileceğiniz, yargılamayan ve pratik rehberlik — uyku, beslenme, öfke nöbetleri ve oyun — ailenizin temposuna göre.",
    points: ["Uyku rutinleri", "Beslenme rehberliği", "Evde oyun"],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-cream pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-teal">
            Hizmetlerimiz
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
            0–3 yaşın her aşamasına bakım
          </h1>
          <p className="mt-3 text-lg text-muted">
            Her program çocuğunuzun bugün bulunduğu noktaya uyum sağlar — ve onu
            sıradaki adıma şefkatle hazırlar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-blob bg-sand p-7">
              <div className="text-3xl">{s.emoji}</div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                {s.title}
              </h2>
              <p className="mt-2 text-muted">{s.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-coral-soft px-3 py-1 text-sm font-semibold text-coral"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-blob bg-ink px-8 py-12 text-center text-cream">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Hangisi uygun emin değil misiniz?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-cream/70">
            Randevu alın, çocuğunuzun ihtiyaçlarını birlikte konuşalım — hiçbir
            baskı olmadan.
          </p>
          <Link
            href="/schedule"
            className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 font-bold text-cream transition-transform hover:-translate-y-0.5"
          >
            Randevu al
          </Link>
        </div>
      </div>
    </div>
  );
}
