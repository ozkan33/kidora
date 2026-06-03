import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false },
};

/**
 * SCAFFOLD ONLY — placeholder for the future authenticated client area
 * (registry: children, appointments, milestone history). Will be protected by
 * Supabase Auth + row-level security in the backend phase.
 */
export default function DashboardPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-cream px-5 pt-28">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Aile paneliniz
        </h1>
        <p className="mt-2 max-w-md text-muted">
          Çocuğunuzun profili, randevuları ve gelişim geçmişi burada yer alacak.
          Yapım aşamasında.
        </p>
      </div>
    </div>
  );
}
