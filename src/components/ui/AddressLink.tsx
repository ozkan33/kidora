"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/seo";

/**
 * Wraps the storefront address in a tap-to-navigate link.
 * - Default (SSR + Android/desktop): Google Maps directions.
 * - iPhone / iPad / Mac after hydration: Apple Maps directions.
 * Falls back to the shared Google Maps pin if no coords are set.
 */
export default function AddressLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { geo, mapUrl } = business;

  const googleHref = geo
    ? `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`
    : mapUrl;

  const [href, setHref] = useState(googleHref);

  useEffect(() => {
    const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    if (isApple && geo) {
      setHref(`https://maps.apple.com/?daddr=${geo.lat},${geo.lng}&dirflg=d`);
    }
  }, [geo]);

  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  );
}
