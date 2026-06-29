"use client";

import { useState } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";
import { LangToggle, useLang } from "@/lib/i18n";

const NAV = [
  { href: "/menu", es: "Menú", en: "Menu" },
  { href: "/nosotros", es: "Nosotros", en: "About" },
  { href: "/reservas", es: "Reservas", en: "Bookings" },
  { href: "/galeria", es: "Galería", en: "Gallery" },
  { href: "/visitas", es: "Visitas", en: "Guestbook" },
  { href: "/eventos", es: "Eventos", en: "Events" },
  { href: "/inicio#contacto", es: "Contacto", en: "Contact" },
  { href: "/juegos", es: "El patio 🎮", en: "Playground 🎮" },
];

export default function Header() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-marron/15 bg-crema/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/inicio" onClick={() => setOpen(false)} className="group flex items-center gap-2.5">
          <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold text-marron">Papaupa</span>
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-terracota">
              retro&nbsp;fusión&nbsp;food
            </span>
          </span>
        </Link>

        {/* Escritorio */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-x-6 font-sans text-sm font-medium text-marron/80">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-terracota">
                  {lang === "en" ? item.en : item.es}
                </Link>
              </li>
            ))}
          </ul>
          <LangToggle />
        </div>

        {/* Móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="rounded-lg p-2 text-marron hover:bg-marron/5"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Desplegable móvil */}
      {open && (
        <div className="border-t border-marron/10 bg-crema md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-marron/5 py-3 font-sans font-medium text-marron transition-colors hover:text-terracota"
                >
                  {lang === "en" ? item.en : item.es}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rainbow-rule h-[2px] w-full opacity-70" />
    </header>
  );
}
