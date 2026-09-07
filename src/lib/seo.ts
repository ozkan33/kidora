/**
 * Single source of truth for SEO + local business data.
 *
 * ───────────────────────────────────────────────────────────────────────────
 *  ⚠️  FILL IN THE `business` BLOCK BELOW WITH REAL VALUES.
 *      Anything left as an empty string ("") is omitted everywhere — from the
 *      visible site, the JSON-LD, and search engines — so nothing fake ships.
 *      Search this file for "TODO" to find every field that needs your input.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Local SEO target: Erdemli, Mersin, Türkiye + towns within ~40 km.
 */

/** Production origin — no trailing slash. */
export const SITE_URL = "https://www.kidoracocuk.com";

/** Build an absolute URL from a path ("/about" → "https://.../about"). */
export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * Real business facts. The ones marked TODO are the only things that can't be
 * derived from the codebase — they must come from you. Leave a field as "" and
 * it is safely omitted (no placeholder text is ever rendered or indexed).
 */
export const business = {
  /** Public brand name shown to users. */
  name: "Kidora",
  /** Legal / full name for structured data. */
  legalName: "Kidora Aile Danışma Merkezi",
  /** One-line description (Turkish), reused in JSON-LD. */
  description:
    "Erdemli, Mersin'de aile danışma merkezi ve çocuk atölyesi: 0–3 yaş için oyun temelli erken çocukluk gelişimi, gelişimsel değerlendirme, dikkat testi ve duyusal oyun, yoga, drama, robotik kodlama, İngilizce oyun grubu, resim atölyeleri.",

  // ── Contact ──────────────────────────────────────────────────────────────
  /** Display format (local — visitors are in Turkey, so no +90 prefix). */
  phone: "0541 516 33 01",
  /** E.164 format for tel: links and JSON-LD, so click-to-call works anywhere. */
  phoneE164: "+905415163301",
  /** Public contact email (shown in footer, about page, and JSON-LD). */
  email: "iletisim@kidoracocuk.com",

  // ── Physical address — storefront listing ────────────────────────────────
  address: {
    street: "Akdeniz Mah., Yunus Emre Cad. No:6",
    /** Town / district. */
    locality: "Erdemli",
    /** Province. */
    region: "Mersin",
    /** TODO: confirm the 5-digit postal code (Erdemli central is 33730). */
    postalCode: "33730",
    country: "TR",
  },

  /**
   * Map pin — derived from the shared Google Maps link (street-level position
   * at No:6). TODO: if your Google Business Profile pin differs slightly, paste
   * its exact lat/lng here so the map listing matches GBP precisely.
   */
  geo: { lat: 36.6025734, lng: 34.3029022 } as { lat: number; lng: number } | null,

  /** Google Maps share link for the listing. */
  mapUrl: "https://maps.app.goo.gl/QJDUNZhAQYnM3zWf8",

  /** Opening hours — matches the footer ("Pzt–Cmt, 10:00–18:00"). */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],

  /** Social / profile URLs. Drop any you don't have. These become `sameAs`. */
  social: {
    instagram: "https://www.instagram.com/kidoracocuk/",
    facebook: "",
    whatsapp: "", // e.g. "https://wa.me/90XXXXXXXXXX"
  },
};

/**
 * Towns/areas served within ~40 km of Erdemli.
 * TODO: verify these against your actual catchment and trim/extend as needed.
 * Used for `areaServed` in JSON-LD and the visible "Hizmet bölgemiz" section.
 */
export const SERVICE_AREAS = [
  "Erdemli",
  "Tömük",
  "Kumkuyu",
  "Limonlu",
  "Kızkalesi",
  "Ayaş",
  "Çeşmeli",
  "Arpaçbağları",
  "Kocahasanlı",
  "Mezitli",
  "Mersin",
] as const;

/**
 * Services + workshops actually offered on site. Feeds the JSON-LD
 * `hasOfferCatalog` so local queries like "Mersin çocuk atölyesi",
 * "dikkat testi Erdemli" can match structured data.
 */
export const OFFERINGS = [
  "Bebek bakımı (0–12 ay)",
  "Çocuk programları (1–3 yaş)",
  "Gelişim takibi ve gelişimsel değerlendirme",
  "Dikkat testi",
  "Ebeveyn ve aile danışmanlığı",
  "Duyusal oyun ve eğitici oyun grupları",
  "Çocuk yogası",
  "Drama ve psikodrama atölyesi",
  "Robotik kodlama atölyesi",
  "İngilizce oyun grubu",
  "Resim atölyesi",
  "Hafta sonu grup etkinlikleri",
] as const;

/**
 * Shared Open Graph fields. Next.js does NOT deep-merge `openGraph` between
 * layout and page metadata — a page that sets `openGraph` replaces the whole
 * object — so pages spread this base to keep the image/locale/siteName.
 */
export const ogBase = {
  type: "website" as const,
  siteName: business.name,
  locale: "tr_TR",
  images: [
    {
      // Dedicated 1200×630 card (lockup on brand cream) — transparent PNGs
      // render on black in WhatsApp/X dark mode and 3:1 gets cropped.
      url: "/og.jpg",
      width: 1200,
      height: 630,
      alt: "Kidora — Aile Danışma Merkezi",
    },
  ],
};

/** Non-empty social URLs, for JSON-LD `sameAs`. */
const sameAs = Object.values(business.social).filter(Boolean);

/** Does the config have enough address detail to publish a postal address? */
const hasAddress = Boolean(business.address.street);

/**
 * Site-wide JSON-LD: ChildCare (the local business) + WebSite.
 * Fields backed by empty config values are dropped so nothing fake is emitted.
 */
export function organizationJsonLd() {
  const childCare: Record<string, unknown> = {
    "@type": "ChildCare",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    image: absoluteUrl("/kidora-lockup-light.png"),
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: business.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hizmetler ve atölyeler",
      itemListElement: OFFERINGS.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  if (business.phone) childCare.telephone = business.phoneE164;
  if (business.email) childCare.email = business.email;
  if (sameAs.length) childCare.sameAs = sameAs;
  if (business.mapUrl) childCare.hasMap = business.mapUrl;

  if (hasAddress) {
    childCare.address = {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode || undefined,
      addressCountry: business.address.country,
    };
  }

  if (business.geo) {
    childCare.geo = {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      childCare,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        inLanguage: "tr-TR",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}

/** Short local FAQ — shown on the home page (visible only; the FAQPage
 * JSON-LD lives on /sss with the full list to avoid duplicate markup). */
export const LOCAL_FAQ = [
  {
    q: "Kidora nerede?",
    a: "Erdemli, Mersin'deyiz. Erdemli ve çevresindeki yaklaşık 40 km'lik bölgedeki ailelere hizmet veriyoruz.",
  },
  {
    q: "Hangi yaş aralığıyla ilgileniyorsunuz?",
    a: "0–3 yaş arası bebek ve çocukların erken gelişimine ve ailelerine odaklanıyoruz.",
  },
  {
    q: "Erdemli dışından gelebilir miyiz?",
    a: "Elbette. Tömük, Kumkuyu, Limonlu, Kızkalesi, Mezitli ve Mersin merkez dâhil çevre ilçe ve mahallelerden gelen aileleri ağırlıyoruz.",
  },
  {
    q: "Hangi atölyeler ve etkinlikler var?",
    a: "Duyusal oyun ve eğitici oyun gruplarının yanında yoga, drama, resim atölyesi, robotik kodlama ve İngilizce oyun grubu düzenliyoruz. Hafta sonları da zekâ, bellek ve dikkat gelişimini destekleyen grup etkinlikleri yapıyoruz.",
  },
  {
    q: "Dikkat testi veya gelişimsel değerlendirme yaptırabilir miyim?",
    a: "Evet. Uzmanlarımız gelişimsel değerlendirme ve dikkat testi uyguluyor, düzenli gelişim takibiyle sonuçları anlaşılır raporlar hâlinde sizinle paylaşıyor.",
  },
  {
    q: "Randevu almam gerekiyor mu?",
    a: "Dilerseniz randevu sayfamızdan size uygun bir saat seçebilir ya da çalışma saatlerimizde randevusuz uğrayabilirsiniz. Çalışma saatlerimiz Pazartesi–Cumartesi 10:00–18:00'dir.",
  },
] as const;

export function faqJsonLd(faq: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * Full site FAQ (Turkish), grouped by category. Rendered on /sss, where it is
 * also emitted as FAQPage JSON-LD. Answers state only facts that appear
 * elsewhere on the site — keep it that way (no prices, no staff names).
 */
export const SITE_FAQ: ReadonlyArray<{
  category: string;
  items: ReadonlyArray<{ q: string; a: string }>;
}> = [
  {
    category: "Genel & Konum",
    items: [
      {
        q: "Kidora nedir, ne yapıyorsunuz?",
        a: "Kidora, Erdemli, Mersin'de bir aile danışma merkezi ve çocuk atölyesidir. 0–3 yaş için oyun temelli erken çocukluk programları, gelişimsel değerlendirme, dikkat testi ve aile danışmanlığının yanında yoga, drama, resim, robotik kodlama ve İngilizce oyun grubu gibi atölyeler sunuyoruz. Yeni açılıyoruz; ilk ailelerimizi sıcaklıkla ve bilime dayalı bir yaklaşımla karşılamaya hazırlanıyoruz.",
      },
      {
        q: "Adresiniz nerede, hangi saatlerde açıksınız?",
        a: "Adresimiz Akdeniz Mah., Yunus Emre Cad. No:6, Erdemli, Mersin — Erdemli'nin tam kalbindeyiz. Pazartesi'den Cumartesi'ye 10:00–18:00 arası açığız; Pazar günleri kapalıyız. Hakkımızda sayfamızdaki haritadan kolayca yol tarifi alabilirsiniz.",
      },
      {
        q: "Erdemli dışında oturuyoruz, yine de gelebilir miyiz?",
        a: "Tabii ki, kapımız çevre bölgelerdeki tüm ailelere açık. Erdemli merkez dışında Tömük, Kumkuyu, Limonlu, Kızkalesi, Ayaş, Çeşmeli, Arpaçbağları, Kocahasanlı, Mezitli ve Mersin merkez dâhil yaklaşık 40 km'lik bir bölgeye hizmet veriyoruz.",
      },
      {
        q: "Hangi yaş grubuyla çalışıyorsunuz?",
        a: "Uzmanlık alanımız 0–3 yaş, yani bir çocuğun beyninin en hızlı geliştiği ilk 1.000 gün. Bebekler için 0–12 ay bebek bakımı programımız, yürümeye başlayan minikler için 1–3 yaş çocuk programlarımız var. Ayrıca ebeveynler için aile danışmanlığı sunuyoruz; yani sadece çocuğunuzla değil, sizinle de çalışıyoruz.",
      },
    ],
  },
  {
    category: "Programlar ve Atölyeler",
    items: [
      {
        q: "Hangi programlarınız var?",
        a: "Dört temel programımız var: 0–12 ay bebek bakımı (güvenli bağlanma, duyusal ve motor oyun, beslenme-uyku desteği), 1–3 yaş çocuk programları (dil, motor koordinasyon ve sosyal oyun), gelişim takibi ve gelişimsel değerlendirme, bir de ebeveyn ve aile danışmanlığı. Hepsi oyun temelli ve güncel erken çocukluk araştırmalarına dayanıyor.",
      },
      {
        q: "Atölyelerinizde neler yapılıyor?",
        a: "Duyusal oyun ve eğitici oyun gruplarının yanında çocuk yogası, drama, resim atölyesi, robotik kodlama ve İngilizce oyun grubu düzenliyoruz. Örneğin resim atölyesinde ince motor becerileri ve yaratıcılık, robotik kodlamada yaşa uygun setlerle problem çözme ve neden-sonuç ilişkisi, İngilizce oyun grubunda ise şarkılar ve tekerlemelerle dille doğal bir tanışma var — ezber yok, keyifli tekrar var.",
      },
      {
        q: "Hafta sonu etkinlikleriniz neler?",
        a: "Hafta sonlarına özel grup etkinlikleri düzenliyoruz: zekâ, bellek ve dikkat gelişimini destekleyen oyunlar ve aile katılımlı atölyeler. Böylece hafta içi vakti kısıtlı olan aileler de çocuklarıyla birlikte katılabiliyor. Cumartesi günleri 10:00–18:00 arası açık olduğumuzu hatırlatalım.",
      },
      {
        q: "İkimiz de çalışıyoruz; programlar bize uyar mı?",
        a: "Birçok aile gibi sizin de programınızın yoğun olabileceğini biliyoruz. Cumartesi dâhil haftanın altı günü 10:00–18:00 arası açığız ve hafta sonu grup etkinliklerimiz özellikle çalışan ebeveynler için güzel bir seçenek. Randevu talebinizde size uygun zamanı belirtin, ailenizin temposuna uyan bir saati birlikte bulalım.",
      },
      {
        q: "Gruplarınız kalabalık mı?",
        a: "Hayır — bilerek küçük gruplarla ilerliyoruz. İlkemiz az çocuk, çok ilgi: her çocuğu yakından tanımak ve her aileyi gerçekten dinlemek istiyoruz. Böylece atölyelerde ve programlarda çocuğunuz kalabalıkta kaybolmuyor, ihtiyacı olan ilgiyi görüyor.",
      },
    ],
  },
  {
    category: "Randevu ve Ziyaret",
    items: [
      {
        q: "Randevu nasıl alınır?",
        a: "Çok basit: sitemizin randevu sayfasındaki forma bilgilerinizi ve tercih ettiğiniz zamanı bırakıyorsunuz, ekibimiz ziyaret saatinizi onaylamak için en kısa sürede sizinle iletişime geçiyor. Sorularınız için iletisim@kidoracocuk.com adresinden de bize yazabilirsiniz.",
      },
      {
        q: "Randevusuz uğrayabilir miyiz?",
        a: "Elbette — kapımız ailelere açık. Pazartesi–Cumartesi 10:00–18:00 arasında Kidora'ya uğrayıp bizi yerinde tanıyabilirsiniz. Yine de çocuğunuza yeterince zaman ayırabilmemiz için ilk görüşmede randevu sayfamızdan zaman ayırtmanızı öneririz.",
      },
      {
        q: "İlk ziyarette bizi ne bekliyor?",
        a: "İlk ziyaret bir tanışma görüşmesidir: sizi dinler, çocuğunuzun bulunduğu gelişim aşamasını ve ihtiyaçlarını birlikte konuşuruz. Hangi programın ya da atölyenin uygun olduğuna hiçbir baskı olmadan birlikte karar veririz. Amacımız ilk günden itibaren ailenizle bir ortaklık kurmak.",
      },
      {
        q: "Çocuğumla birlikte içeride kalabilir miyim?",
        a: "Kidora'da ebeveynler sürecin dışında değil, tam ortasındadır — ilkemiz ebeveynlerin yerine değil, onlarla birlikte çalışmak. Hafta sonu etkinliklerimizin bir kısmı zaten aile katılımlıdır. Hangi seanslarda çocuğunuza eşlik edeceğinizi ilk görüşmede, çocuğunuzun yaşına ve programına göre birlikte planlarız.",
      },
      {
        q: "Ücretleriniz nedir?",
        a: "Ücretler seçtiğiniz programa ve atölyeye göre değişiyor. Güncel bilgi için randevu sayfamızdan talep bırakabilir ya da iletisim@kidoracocuk.com adresinden bize ulaşabilirsiniz; ekibimiz size dönüş yaparak tüm detayları paylaşır. İlk tanışma görüşmesinde de programları ve koşulları birlikte konuşuruz.",
      },
    ],
  },
  {
    category: "Değerlendirme ve Danışmanlık",
    items: [
      {
        q: "Gelişimsel değerlendirme nedir, nasıl yapılır?",
        a: "Gelişimsel değerlendirme, çocuğunuzun dil, motor ve sosyal gelişiminin hangi aşamada olduğunu gelişim tarama araçlarıyla anlamamızı sağlayan sakin bir çalışmadır. Çocuğunuz için bir sınav gibi değil, oyun gibi geçer. Sonunda çocuğunuzun nerede olduğunu ve sırada hangi adımın beklendiğini açık ve anlaşılır şekilde sizinle paylaşırız.",
      },
      {
        q: "Dikkat testi yaptırabilir miyiz? Ne işe yarar?",
        a: "Evet, Kidora'da dikkat testi uyguluyoruz. Test, çocuğunuzun dikkat becerileri hakkında somut bir resim sunar ve zekâ, bellek ve dikkat gelişimini destekleyen etkinliklerimizi ona göre yönlendirmemize yardımcı olur. Sonuçları anlaşılır bir rapor hâlinde sizinle konuşarak paylaşırız.",
      },
      {
        q: "Çocuğumun gelişimini nasıl takip ediyor, bize nasıl bildiriyorsunuz?",
        a: "Şeffaf gelişim takibi verdiğimiz sözlerden biri: değerlendirmeleri tek seferlik değil, düzenli aralıklarla yapıyoruz. Her değerlendirmenin ardından anlaşılır ebeveyn raporlarıyla çocuğunuzun nasıl geliştiğini ve bundan sonra neler beklendiğini net biçimde öğreniyorsunuz. Böylece hiçbir zaman \"acaba yolunda mı gidiyor?\" belirsizliğinde kalmıyorsunuz.",
      },
      {
        q: "Aile danışmanlığı hangi konuları kapsıyor?",
        a: "Uyku rutinleri, beslenme, öfke nöbetleri ve evde oyun gibi günlük hayatın gerçek konularında, yargılamayan ve evde hemen uygulayabileceğiniz pratik rehberlik sunuyoruz. Gerektiğinde psikoloji temelli aile danışmanlığı ve psikodrama çalışmalarıyla süreci destekliyoruz. Her şey ailenizin kendi temposuna göre ilerler.",
      },
    ],
  },
];
