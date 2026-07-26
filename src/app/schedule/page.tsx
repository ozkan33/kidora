import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { absoluteUrl, ogBase } from "@/lib/seo";

const DESCRIPTION =
  "Erdemli, Mersin'deki Kidora'ya randevu alın veya size uygun bir zaman talep edin. Ailenize uygun bir saat bulmanıza yardımcı oluyoruz.";

export const metadata: Metadata = {
  title: "Randevu al",
  description: DESCRIPTION,
  alternates: { canonical: "/schedule" },
  openGraph: {
    ...ogBase,
    title: "Randevu al · Kidora",
    description: DESCRIPTION,
    url: absoluteUrl("/schedule"),
  },
};

export default function SchedulePage() {
  return (
    <div className="bg-cream pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-2xl px-5">
        <div>
          <span className="font-display text-sm font-bold uppercase tracking-widest text-coral">
            Tanışalım
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Randevunuzu oluşturun
          </h1>
          <p className="mt-3 text-lg text-muted">
            Bilgilerinizi ve tercih ettiğiniz zamanı bırakın — ziyaret
            saatinizi onaylamak için sizinle iletişime geçelim.
          </p>
        </div>

        <div className="mt-12">
          <div className="rounded-blob bg-sand p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Randevu talebi
            </h2>
            <p className="mt-1 text-sm text-muted">
              Formu doldurun, en kısa sürede size dönüş yapalım.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
