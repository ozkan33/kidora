import type { Metadata } from "next";
import Link from "next/link";
import GrowthJourney from "@/components/growth-journey/GrowthJourney";
import AddressLink from "@/components/ui/AddressLink";
import WhatsAppFab, { WhatsAppInlineButton } from "@/components/ui/WhatsAppButton";
import { LOCAL_FAQ, business } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
  const { address, geo } = business;
  const cityLine = [address.locality, address.region].filter(Boolean).join(", ");
  const mapSrc = geo
    ? `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=15&hl=tr&output=embed`
    : null;

  return (
    <>
      {/* Poster is only referenced from CSS, so preload it — it's the hero's
          first-paint backdrop (likely LCP). React hoists this into <head>. */}
      <link rel="preload" as="image" href="/hero-poster.webp" />

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
              <Link
                key={s.title}
                href="/services"
                className="group rounded-blob bg-sand p-6 transition-transform hover:-translate-y-1"
              >
                <div
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                  style={{ backgroundColor: "color-mix(in srgb, " + s.accent + " 18%, white)" }}
                >
                  {s.emoji}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-blob bg-sand p-6 reveal">
            <h3 className="font-display text-lg font-semibold text-ink">
              Atölyeler ve etkinlikler
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Duyusal ve eğitici oyunun yanında; zekâ, bellek ve dikkat
              gelişimini destekleyen hafta içi ve hafta sonu atölyeleri
              düzenliyoruz.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "Duyusal oyun",
                "Yoga",
                "Drama",
                "Resim atölyesi",
                "Robotik kodlama",
                "İngilizce oyun grubu",
                "Hafta sonu etkinlikleri",
              ].map((w) => (
                <li
                  key={w}
                  className="rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-ink ring-1 ring-ink/5"
                >
                  {w}
                </li>
              ))}
            </ul>
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
          <div className="grid gap-4 sm:grid-cols-3 reveal">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-blob bg-cream/5 p-5 text-center ring-1 ring-cream/10"
              >
                <div className="font-display text-3xl font-bold text-sky sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-cream/75">{s.label}</div>
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
              Kapımız açık — ve işe sözümüzle başladık
            </h2>
            <p className="mt-3 text-muted">
              Kidora&apos;da ailelerimizi ağırlamaya başladık. Yeni bir merkez
              olarak size en başta üç söz veriyoruz.
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
                <div aria-hidden className="text-3xl">{p.emoji}</div>
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

      {/* ───────────── Service area + local FAQ (Erdemli, Mersin) ───────────── */}
      <section id="bolge" className="bg-sand py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-teal">
                Hizmet bölgemiz
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Erdemli ve çevresindeki ailelerin yanındayız
              </h2>
              <p className="mt-3 text-muted">
                Erdemli, Mersin merkezliyiz; Tömük, Kumkuyu, Limonlu,
                Kızkalesi, Ayaş, Mezitli ve Mersin merkez dâhil çevremizdeki
                yaklaşık 40 km&apos;lik bölgedeki ailelere 0–3 yaş erken çocukluk
                gelişimi, aile danışmanlığı, gelişimsel değerlendirme ve çocuk
                atölyeleri sunuyoruz.
              </p>

              <div className="mt-8 overflow-hidden rounded-blob bg-cream">
                {mapSrc && (
                  <div className="aspect-[2/1]">
                    <iframe
                      src={mapSrc}
                      title="Kidora konum haritası"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                    />
                  </div>
                )}
                <div className="p-5">
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
                    <span className="text-sm leading-relaxed">
                      {address.street && <>{address.street}<br /></>}
                      {cityLine}
                      <span className="mt-1 block font-bold text-coral">
                        Yol tarifi al →
                      </span>
                    </span>
                  </AddressLink>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                Sıkça sorulan sorular
              </h3>
              <dl className="mt-5 divide-y divide-ink/10">
                {LOCAL_FAQ.map(({ q, a }) => (
                  <div key={q} className="py-4">
                    <dt className="font-semibold text-ink">{q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/sss"
                className="mt-4 inline-block font-bold text-coral hover:underline"
              >
                Tüm sıkça sorulan sorular →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Closing CTA ───────────── */}
      <section className="bg-cream pt-20 pb-24 sm:pt-24">
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
            <div className="relative mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/schedule"
                className="rounded-full bg-cream px-8 py-4 font-bold text-coral shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Randevu al
              </Link>
              <WhatsAppInlineButton className="text-cream ring-2 ring-inset ring-cream/70 hover:bg-cream/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp chat button (landing page only) */}
      <WhatsAppFab />
    </>
  );
}
