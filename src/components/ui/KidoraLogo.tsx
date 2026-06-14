import Image from "next/image";

/**
 * Kidora brand logo for the nav — the updated brush lockup
 * (Kidora_logo_updated.pdf) used as-is, with only the white page background
 * keyed out so it sits cleanly on the cream nav. Sized larger than a typical nav
 * logo so the "Aile Danışma Merkezi" tagline stays legible.
 */
export default function KidoraLogo() {
  return (
    <Image
      src="/kidora-lockup-light.png"
      alt="Kidora — Aile Danışma Merkezi"
      width={1380}
      height={603}
      priority
      className="h-16 w-auto sm:h-20"
    />
  );
}
