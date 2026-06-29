"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Contacto from "@/components/sections/Contacto";
import SiteFooter from "@/components/layout/SiteFooter";
import { useLang } from "@/lib/i18n";

export default function Inicio() {
  const { t } = useLang();
  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-inicio.jpg)" } as React.CSSProperties}
    >
      <Header />
      <Hero />

      <section id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 text-center">
        <p className="font-display text-2xl italic text-marron/50">
          {t("Visitas, eventos y reservas — próximamente.", "Guestbook, events and bookings — coming soon.")}
        </p>
      </section>

      <Contacto />

      <SiteFooter />
    </div>
  );
}
