# Local SEO — Kidora (Erdemli, Mersin)

Target: **Erdemli, Mersin, Türkiye** + towns within ~40 km. Audience searches in
Turkish (e.g. "Erdemli çocuk gelişim", "0-3 yaş gelişim Erdemli", "bebek gelişim
merkezi Mersin", "Erdemli aile danışma merkezi").

## Target keywords → where they live on-site

Google ranks what's visibly on the page, so every keyword is woven into real
content (not just the `keywords` meta tag, which Google ignores):

| Keyword theme | Where |
| --- | --- |
| aile danışmanlık merkezi | root title/description, `legalName`, services page (Aile ve ebeveyn danışmanlığı) |
| çocuk atölyesi / atölye | root title, services page "Atölyeler ve etkinlikler" section, home atölye strip |
| duyusal oyun, eğitici oyun | service cards, home atölye strip, FAQ |
| dikkat testi, gelişimsel değerlendirme | Gelişim takibi card, FAQ, JSON-LD offer catalog |
| psikoloji, psikodrama | Aile ve ebeveyn danışmanlığı card, JSON-LD |
| yoga, drama | Yoga ve drama atölyesi card, home strip |
| robotik kodlama | Robotik kodlama card, home strip |
| İngilizce oyun grubu | İngilizce oyun grubu card, home strip |
| resim atölyesi | Resim atölyesi card, home strip |
| hafta sonu etkinlik, grup etkinlik | Hafta sonu etkinlikleri card, FAQ |
| zekâ, bellek, gelişim takip | Robotik kodlama + hafta sonu copy, Gelişim takibi card |
| Mersin / Erdemli | everywhere above + `SERVICE_AREAS`, JSON-LD `areaServed` |

All services are also emitted as a schema.org `OfferCatalog` (`OFFERINGS` in
`src/lib/seo.ts`) on the `ChildCare` business node.

---

## 1. Fill in the real data (one file)

All on-site SEO reads from **`src/lib/seo.ts`**. Open it and replace every field
marked `TODO`. Empty fields are safely omitted — nothing fake is published — but
the storefront listing only ranks well once these are real:

- [x] `business.phone` — public phone (0541 516 33 01, E.164 in `business.phoneE164`)
- [x] `business.email` — `iletisim@kidoracocuk.com` (set in `seo.ts`; mailbox itself still needs to be created at your email provider)
- [ ] `business.address.street` — street + building no
- [ ] `business.address.postalCode` — Erdemli is `33730`
- [ ] `business.geo` — exact `{ lat, lng }` map pin (from Google Maps → right-click → "What's here?")
- [ ] `business.mapUrl` — Google Maps share link
- [ ] `business.social.{instagram,facebook,whatsapp}` — drop any you don't have
- [ ] `SERVICE_AREAS` — verify the nearby towns match your real catchment

Then redeploy. The footer, JSON-LD (`ChildCare` + `WebSite` + `FAQPage`),
sitemap, and robots all update automatically.

## 2. Turn the site live to crawlers

The site is gated by `MAINTENANCE_MODE`. While it's `on`:
- `robots.ts` returns `Disallow: /` and `sitemap.ts` returns empty — **correct**,
  keeps a half-built site out of Google.
- Flip `MAINTENANCE_MODE` off to launch. Then robots allows crawling, the sitemap
  lists pages, and structured data starts rendering.

## 3. Verify the on-site work (after launch)

- [ ] `https://www.kidoracocuk.com/robots.txt` → allows `/`, points to sitemap
- [ ] `https://www.kidoracocuk.com/sitemap.xml` → lists `/`, `/services`, `/about`, `/schedule`, `/sss`
- [ ] Google [Rich Results Test](https://search.google.com/test/rich-results) on the
      home page → `ChildCare` + `FAQPage` detected with no errors
- [ ] View source → one `application/ld+json` block with real address/phone/geo
- [ ] Each page has a unique `<title>`, description, and `<link rel="canonical">`

---

## Off-site checklist (manual — not code)

These live outside the repo and matter most for the local map pack. Use the
**exact same** Name / Address / Phone (NAP) everywhere — character-for-character.

### Google Business Profile (highest priority)
- [ ] Create / claim the profile at [business.google.com](https://business.google.com)
- [ ] Category: **Child care agency** (+ secondary: *Family counselor / Counselor*)
- [ ] Exact address + drop the map pin → copy that lat/lng into `business.geo`
- [ ] Service area: add Erdemli + nearby towns (Tömük, Kumkuyu, Limonlu, Kızkalesi,
      Mezitli, Mersin, …)
- [ ] Hours: Mon–Sat 09:00–18:00 (match the site)
- [ ] Phone + website (`https://www.kidoracocuk.com`)
- [ ] Photos: logo, storefront, interior, team
- [ ] Complete verification (postcard / phone / video)
- [ ] Post the launch as a GBP "Update"; collect first reviews from early families

### Bing Places
- [ ] Mirror the GBP listing at [bingplaces.com](https://www.bingplaces.com)

### Turkish local directories / citations (consistent NAP + link)
- [ ] Foursquare / Swarm
- [ ] Yandex Business (Yandex Haritalar) — widely used in TR
- [ ] Apple Maps (Apple Business Connect)
- [ ] Sahibinden / local Mersin–Erdemli business listing sites, if relevant
- [ ] Any Erdemli/Mersin parenting or chamber-of-commerce directory

### Social presence (feeds `sameAs` in `seo.ts`)
- [ ] Instagram business account (primary for this audience) — bio links the site,
      location set to Erdemli
- [ ] Facebook Page with the same NAP
- [ ] WhatsApp Business number → add the `wa.me` link to `business.social.whatsapp`

### Search Console + Analytics
- [ ] Verify the domain in [Google Search Console](https://search.google.com/search-console)
- [ ] Submit `sitemap.xml`
- [ ] Add web analytics (e.g. GA4 or a privacy-friendly alternative) to track local queries

---

## Content ideas to deepen local relevance (optional, later)

Each as its own page or blog post, naturally mentioning Erdemli/Mersin — avoid
thin "doorway" pages for every town:

- "Erdemli'de 0–3 yaş çocuk gelişimi: ailelere rehber"
- "Bebeğinizin ilk 1.000 günü" (evergreen, links to /services)
- A single page describing the service area, linking the towns — **already on the
  home page** as the "Hizmet bölgemiz" section.
