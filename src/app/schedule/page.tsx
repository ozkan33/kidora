import type { Metadata } from "next";
import ScheduleEmbed from "@/components/ScheduleEmbed";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Randevu al",
  description:
    "Kidora'ya randevu alın veya randevusuz ziyaret için zaman talep edin. Ailenize uygun bir saat bulmanıza yardımcı oluyoruz.",
};

export default function SchedulePage() {
  return (
    <div className="bg-cream pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-coral">
            Tanışalım
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Randevunuzu oluşturun
          </h1>
          <p className="mt-3 text-lg text-muted">
            Aşağıdan size uygun bir saat seçin — ya da randevusuz gelmeyi
            tercih ederseniz bilgilerinizi bırakın, sizi biz programlayalım.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          {/* Cal.com booking */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Online randevu
            </h2>
            <p className="mt-1 text-sm text-muted">
              Bir tarih ve saat seçin — anında onay alırsınız.
            </p>
            <div className="mt-5 overflow-hidden rounded-blob bg-sand p-2 sm:p-4">
              <ScheduleEmbed />
            </div>
          </div>

          {/* Walk-in request */}
          <div className="lg:col-span-2">
            <div className="rounded-blob bg-sand p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Randevusuz mu geleceksiniz?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Bilgilerinizi ve tercih ettiğiniz zamanı bırakın. Randevusuz
                ziyaret saatinizi onaylayıp sizinle iletişime geçelim.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
