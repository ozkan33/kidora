import Link from "next/link";
import GrowthJourney from "@/components/growth-journey/GrowthJourney";

const SERVICES = [
  {
    emoji: "🍼",
    title: "Bebek bakımı (0–12 ay)",
    body: "Güvenli bağlanmayı ve erken iletişimi destekleyen, duyusal oyunlarla zenginleştirilmiş şefkatli bakım.",
    accent: "var(--color-coral)",
  },
  {
    emoji: "🧩",
    title: "Çocuk programları (1–3 yaş)",
    body: "Motor beceriler, dil ve sosyal özgüven için uzman rehberliğinde oyun temelli öğrenme.",
    accent: "var(--color-teal)",
  },
  {
    emoji: "📋",
    title: "Gelişim takibi",
    body: "Çocuğunuzun nasıl geliştiğini ve sırada ne olduğunu her zaman bilmeniz için nazik gelişim değerlendirmeleri.",
    accent: "var(--color-sunny)",
  },
  {
    emoji: "👪",
    title: "Ebeveyn danışmanlığı",
    body: "Uyku, beslenme ve oyun için bugün evde uygulayabileceğiniz pratik, yargılamayan rehberlik.",
    accent: "var(--color-sky)",
  },
];

const STATS = [
  { value: "0–3", label: "uzmanlaştığımız yaş aralığı" },
  { value: "1.000", label: "bir ömrü şekillendiren gün" },
  { value: "%100", label: "oyun temelli ve bilimsel" },
];

export default function Home() {
  return (
    <>
      {/* ───────────── Interactive growth journey (landing hero) ───────────── */}
      <GrowthJourney />

      {/* ───────────── Services ───────────── */}
      <section id="services" className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="font-display text-sm font-bold uppercase tracking-widest text-teal">
              Ne yapıyoruz
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Her gelişim basamağına uygun bakım
            </h2>
            <p className="mt-3 text-muted">
              Yenidoğan sakinliğinden çocukluk hareketliliğine; programlarımız
              çocuğunuzun tam da bulunduğu noktaya uyum sağlar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group rounded-blob bg-sand p-6 transition-transform hover:-translate-y-1"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                  style={{ backgroundColor: "color-mix(in srgb, " + s.accent + " 18%, white)" }}
                >
                  {s.emoji}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/services"
              className="font-bold text-coral hover:underline"
            >
              Tüm hizmetleri keşfet →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Trust / stats ───────────── */}
      <section className="bg-ink py-20 text-cream sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              En çok ilk üç yıl önemlidir.
            </h2>
            <p className="mt-4 max-w-lg text-cream/70">
              Bir çocuğun beyninin %90&apos;ı beş yaşından önce gelişir — ve temel,
              daha ilk 1.000 günde atılır. Kidora&apos;da her kucaklama, her oyun ve
              her gelişim basamağı sıcaklık ve uzmanlıkla desteklenir.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-blob bg-cream/5 p-5 text-center ring-1 ring-cream/10"
              >
                <div className="font-display text-3xl font-bold text-coral sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-cream/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Testimonials (placeholder) ───────────── */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Büyüyen ailelerin gözdesi
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Kidora ilk günden itibaren aileden biri gibiydi. Kızımızın her gelişim basamağını geçişini izlemek tam bir mutluluktu.", "— Ayşe & Mehmet"],
              ["Tek başına ebeveyn danışmanlığı bile her şeye değdi. Evimizde nihayet uyku düzeni kuruldu!", "— Elif R."],
              ["Sıcak, profesyonel ve oğlumuz için gerçekten eğlenceli. Hiç ayrılmak istemiyoruz.", "— Demir ailesi"],
            ].map(([quote, name]) => (
              <figure
                key={name}
                className="rounded-blob bg-sand p-6"
              >
                <div className="text-2xl text-sunny">★★★★★</div>
                <blockquote className="mt-3 text-ink">“{quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-muted">
                  {name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Closing CTA ───────────── */}
      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-coral px-8 py-16 text-center text-cream sm:py-20">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cream/10" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-56 w-56 rounded-full bg-cream/10" />
            <h2 className="relative font-display text-3xl font-semibold sm:text-4xl">
              Yolculuğa başlamaya hazır mısınız?
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-cream/90">
              Randevu alın ya da uğrayın — ailenize uygun bir zaman birlikte
              bulalım.
            </p>
            <Link
              href="/schedule"
              className="relative mt-7 inline-block rounded-full bg-cream px-8 py-4 font-bold text-coral shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Randevu oluştur
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
