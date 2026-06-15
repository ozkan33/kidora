import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

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
  metadataBase: new URL("https://kidora.com"),
  title: {
    default: "Kidora — Erken Çocukluk Gelişimi, 0–3 Yaş",
    template: "%s · Kidora",
  },
  description:
    "Kidora, çocuğunuzun ilk günlerinden ilk koşusuna kadar gelişimini destekler. 0–3 yaş için interaktif, uzman rehberliğinde erken çocukluk bakımı. Hemen randevu alın.",
  keywords: [
    "çocuk gelişimi",
    "erken çocukluk",
    "0-3 yaş",
    "bebek gelişimi",
    "çocuk gelişim basamakları",
  ],
  openGraph: {
    title: "Kidora — Erken Çocukluk Gelişimi, 0–3 Yaş",
    description:
      "İlk günlerden ilk koşulara — 0–3 yaş için interaktif, uzman rehberliğinde gelişim.",
    type: "website",
    siteName: "Kidora",
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
          </SmoothScroll>
        )}
      </body>
    </html>
  );
}
