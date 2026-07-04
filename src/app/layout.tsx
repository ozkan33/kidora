import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";

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
    default: "Kidora — Erdemli'de Erken Çocukluk Gelişimi, 0–3 Yaş",
    template: "%s · Kidora",
  },
  description:
    "Erdemli, Mersin'de 0–3 yaş için oyun temelli erken çocukluk gelişimi ve aile danışmanlığı. Erdemli ve çevresindeki ailelere uzman rehberliği. Hemen randevu alın.",
  keywords: [
    "çocuk gelişimi Erdemli",
    "Erdemli aile danışma merkezi",
    "0-3 yaş gelişim Erdemli",
    "bebek gelişimi Mersin",
    "erken çocukluk Erdemli",
    "çocuk gelişim merkezi Mersin",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kidora — Erdemli'de Erken Çocukluk Gelişimi, 0–3 Yaş",
    description:
      "Erdemli, Mersin'de 0–3 yaş için oyun temelli, uzman rehberliğinde erken çocukluk gelişimi.",
    type: "website",
    siteName: "Kidora",
    locale: "tr_TR",
    url: SITE_URL,
  },
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
