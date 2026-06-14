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
    body: "Çocuğunuzun nasıl geliştiğini ve sırada ne olduğunu her zaman bilmeniz için telaşsız, anlaşılır gelişim değerlendirmeleri.",
    accent: "var(--color-sunny)",
  },
  {
    emoji: "👪",
    title: "Ebeveyn danışmanlığı",
    body: "Uyku, beslenme ve oyun için bugün evde uygulayabileceğiniz, sizi yargılamadan sunulan pratik öneriler.",
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
          <div className="max-w-2xl reveal">
            <span className="font-display text-sm font-bold uppercase tracking-widest text-teal">
              Hizmetlerimiz
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Her gelişim basamağına uygun bakım
            </h2>
            <p className="mt-3 text-muted">
              Yenidoğan sakinliğinden çocukluk hareketliliğine; programlarımız
              çocuğunuzun tam da bulunduğu noktaya uyum sağlar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal">
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
              Asıl önemli olan ilk üç yıl.
            </h2>
            <p className="mt-4 max-w-lg text-cream/70">
              Bir çocuğun beyninin %90&apos;ı beş yaşından önce gelişir — ve temel,
              daha ilk 1.000 günde atılır. Kidora&apos;da her kucaklamayı, her oyunu
              ve her gelişim basamağını sıcaklık ve uzmanlıkla destekliyoruz.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 reveal">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-blob bg-cream/5 p-5 text-center ring-1 ring-cream/10"
              >
                <div className="font-display text-3xl font-bold text-sky sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-cream/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Our promise ───────────── */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="font-display text-sm font-bold uppercase tracking-widest text-teal">
              Sözümüz
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Yeni açılıyoruz — ve işe sözümüzle başlıyoruz
            </h2>
            <p className="mt-3 text-muted">
              Henüz ilk ailelerimizi karşılamaya hazırlanıyoruz. Şimdilik
              elimizdeki tek şey, size verdiğimiz sözler.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3 reveal">
            {[
              {
                emoji: "🤝",
                title: "Az çocuk, çok ilgi",
                body: "Küçük gruplarla ilerliyoruz; her çocuğu yakından tanıyor, her aileyi dinliyoruz. Kalabalığa değil, ilgiye yer var.",
              },
              {
                emoji: "🔬",
                title: "Oyun temelli, bilime dayalı",
                body: "Programlarımızı erken çocukluk gelişimi araştırmalarına göre hazırlıyoruz. Çocuk için keyifli bir oyun, arkasında sağlam bir yöntem.",
              },
              {
                emoji: "📖",
                title: "Şeffaf gelişim takibi",
                body: "Çocuğunuzun gelişiminin hangi aşamada olduğunu ve bundan sonra neler beklendiğini açık, anlaşılır değerlendirmelerle her zaman bilirsiniz.",
              },
            ].map((p) => (
              <div key={p.title} className="rounded-blob bg-sand p-6">
                <div className="text-3xl">{p.emoji}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Closing CTA ───────────── */}
      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-coral px-8 py-16 text-center text-cream sm:py-20 reveal">
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
