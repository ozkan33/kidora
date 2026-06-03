"use client";

import Cal from "@calcom/embed-react";

/**
 * Cal.com inline booking widget. Reads the booking link from
 * NEXT_PUBLIC_CALCOM_LINK (e.g. "kidora/visit"). If it's not configured yet,
 * we render a friendly placeholder instead of a broken embed — so the page is
 * always shippable and the lead form below still works.
 */
export default function ScheduleEmbed() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK;

  if (!calLink) {
    return (
      <div className="rounded-blob border-2 border-dashed border-coral/40 bg-coral-soft/40 p-8 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          Online randevu yakında hazır
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Canlı randevu seçimini etkinleştirmek için ortam değişkenine{" "}
          <code className="rounded bg-cream px-1.5 py-0.5">NEXT_PUBLIC_CALCOM_LINK</code>{" "}
          değerini (örn. <code className="rounded bg-cream px-1.5 py-0.5">kidora/visit</code>)
          ekleyin. Bu sırada aşağıdaki randevusuz ziyaret formunu kullanabilirsiniz —
          onaylamak için sizinle iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", minHeight: 600, overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
