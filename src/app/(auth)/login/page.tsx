import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Üye girişi",
  robots: { index: false },
};

/**
 * SCAFFOLD ONLY — placeholder for the future client login.
 * The auth/registry phase will wire this to Supabase Auth (see
 * src/lib/supabase/*). Intentionally not functional yet.
 */
export default function LoginPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-cream px-5 pt-28">
      <div className="w-full max-w-sm rounded-blob bg-sand p-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Üye portalı
        </h1>
        <p className="mt-2 text-muted">
          Güvenli üye girişi ve aile kaydınız çok yakında.
        </p>
        <Link
          href="/schedule"
          className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-bold text-cream"
        >
          Bunun yerine randevu al
        </Link>
      </div>
    </div>
  );
}
