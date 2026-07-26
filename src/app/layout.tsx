import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { SITE_URL, ogBase, organizationJsonLd } from "@/lib/seo";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kidora — Erdemli, Mersin | Çocuk Atölyesi ve Aile Danışma Merkezi",
    template: "%s · Kidora",
  },
  description:
    "Erdemli, Mersin'de aile danışma merkezi ve çocuk atölyesi. 0–3 yaş oyun temelli gelişim, duyusal oyun, gelişimsel değerlendirme, dikkat testi ve hafta sonu etkinlikleri.",
  keywords: [
    "çocuk gelişimi Erdemli",
    "Erdemli aile danışma merkezi",
    "Mersin aile danışmanlık merkezi",
    "0-3 yaş gelişim Erdemli",
    "bebek gelişimi Mersin",
    "erken çocukluk Erdemli",
    "çocuk gelişim merkezi Mersin",
    "çocuk atölyesi Mersin",
    "duyusal oyun",
    "eğitici oyun",
    "dikkat testi Mersin",
    "gelişimsel değerlendirme",
    "çocuk yogası Mersin",
    "drama atölyesi Mersin",
    "psikodrama",
    "robotik kodlama Mersin",
    "İngilizce oyun grubu Mersin",
    "resim atölyesi Mersin",
    "Mersin hafta sonu çocuk etkinlikleri",
  ],
  openGraph: {
    ...ogBase,
    title: "Kidora — Erdemli, Mersin | Çocuk Atölyesi ve Aile Danışma Merkezi",
    description:
      "Erdemli, Mersin'de aile danışma merkezi ve çocuk atölyesi: 0–3 yaş oyun temelli gelişim, duyusal oyun, atölyeler ve hafta sonu etkinlikleri.",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // While the maintenance gate is on, every route renders the "coming soon"
  // page (see middleware.ts), so the nav/footer would only point at hidden
  // pages — drop the site chrome and render the page on its own.
  const maintenance = process.env.MAINTENANCE_MODE === "on";

  return (
    <html lang="tr">
      <body
        className={`${fredoka.variable} ${nunito.variable} bg-cream text-ink antialiased`}
      >
        {maintenance ? (
          <main>{children}</main>
        ) : (
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
            <Footer />
            {/* Local-business + WebSite structured data (Erdemli, Mersin) */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationJsonLd()),
              }}
            />
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
