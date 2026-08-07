"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import KidoraLogo from "./KidoraLogo";
import NavRunner from "./NavRunner";

const LINKS = [
  { href: "/#journey", label: "Gelişim Yolculuğu" },
  { href: "/services", label: "Hizmetler" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/sss", label: "SSS" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const journeyRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open menu closes on Escape or a tap anywhere outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 shadow-[0_2px_20px_rgba(52,50,74,0.08)]"
          : "bg-cream/75"
      }`}
    >
      <nav
        ref={navRef}
        className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
      >
        <Link
          ref={logoRef}
          href="/"
          className="flex items-center"
          aria-label="Kidora ana sayfa"
        >
          <KidoraLogo />
        </Link>

        <NavRunner navRef={navRef} fromRef={logoRef} toRef={journeyRef} />

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                ref={i === 0 ? journeyRef : undefined}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`py-2 text-sm font-semibold transition-colors hover:text-ink ${
                  active
                    ? "text-ink underline decoration-coral decoration-2 underline-offset-8"
                    : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/schedule"
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-cream shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Randevu al
          </Link>
        </div>

        <button
          className="-m-2.5 p-2.5 md:hidden"
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
              stroke="#34405e"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="animate-[kidora-rise_0.18s_ease-out] border-t border-coral-soft bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`py-2.5 font-semibold ${active ? "text-coral" : "text-ink"}`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/schedule"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-coral px-5 py-2.5 text-center font-bold text-cream"
            >
              Randevu al
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
