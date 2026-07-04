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
    "Erdemli, Mersin'de 0–3 yaş için oyun temelli erken çocukluk gelişimi ve aile danışmanlığı merkezi.",

  // ── Contact (TODO: replace placeholders with real values) ────────────────
  /** TODO: real public phone in international format, e.g. "+90 324 000 00 00". */
  phone: "",
  /** TODO: real public email. (Footer currently shows a placeholder.) */
  email: "",

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

  /** Opening hours — matches the footer ("Pzt–Cmt, 09:00–18:00"). */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],

  /** TODO: social / profile URLs. Drop any you don't have. These become `sameAs`. */
  social: {
    instagram: "",
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
  };

  if (business.phone) childCare.telephone = business.phone;
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

/** Local FAQ — shown on the page and emitted as FAQPage JSON-LD. */
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
    q: "Randevu almam gerekiyor mu?",
    a: "Dilerseniz randevu sayfamızdan size uygun bir saat seçebilir ya da çalışma saatlerimizde randevusuz uğrayabilirsiniz. Çalışma saatlerimiz Pazartesi–Cumartesi 09:00–18:00'dir.",
  },
] as const;

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LOCAL_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
