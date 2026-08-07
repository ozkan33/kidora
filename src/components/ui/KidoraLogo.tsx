import Image from "next/image";

/**
 * Kidora brand logo for the nav — the redesigned geometric lockup
 * on a transparent background, sized so the tagline stays legible.
 */
export default function KidoraLogo() {
  return (
    <Image
      src="/kidora-lockup-light.png"
      alt="Kidora — Özel Aile Danışma Merkezi"
      width={1600}
      height={536}
      priority
      sizes="(min-width: 640px) 240px, 192px"
      className="h-16 w-auto sm:h-20"
    />
  );
}
