"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import NuestraHistoria from "@/components/sections/NuestraHistoria";
import Testimonios from "@/components/sections/Testimonios";
import Contacto from "@/components/sections/Contacto";
import SiteFooter from "@/components/layout/SiteFooter";
import { useLang } from "@/lib/i18n";

const SECCIONES = [
  {
    href: "/reservas",
    emoji: "🍽️",
    es: "Reserva tu mesa",
    en: "Book a table",
    descEs: "Asegura tu sitio en el Realejo.",
    descEn: "Save your spot in the Realejo.",
  },
  {
    href: "/eventos",
    emoji: "🎸",
    es: "Eventos y música",
    en: "Events & live music",
    descEs: "Conciertos, jams y noches especiales.",
    descEn: "Gigs, jam sessions and special nights.",
  },
  {
    href: "/visitas",
    emoji: "📌",
    es: "Libro de visitas",
    en: "Guestbook",
    descEs: "Lee y deja tu nota en el corcho.",
    descEn: "Read and pin your note on the board.",
  },
];

export default function Inicio() {
  const { lang, t } = useLang();
  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-inicio.jpg)" } as React.CSSProperties}
    >
      <Header />
      <Hero />

      <NuestraHistoria />

      <section id="descubre" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:py-20">
        <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-terracota">
          {t("Descubre Papaupa", "Discover Papaupa")}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {SECCIONES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-3xl border border-marron/15 bg-crema/85 p-7 text-center shadow-sm backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-4xl">{s.emoji}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-marron">
                {lang === "en" ? s.en : s.es}
              </h3>
              <p className="mt-2 font-sans text-marron/70">{lang === "en" ? s.descEn : s.descEs}</p>
              <span className="mt-4 font-sans text-sm font-semibold text-terracota">
                {t("Entrar", "Enter")}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Testimonios />

      <Contacto />

      <SiteFooter />
    </div>
  );
}
