"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Contacto from "@/components/sections/Contacto";
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

      <footer className="bg-marron py-8 text-center text-crema/80">
        <p className="font-display text-xl italic">Papaupa · Retro Fusión Food</p>
        <p className="mt-1 font-sans text-sm">
          {t("Calle de los Molinos 16, Granada", "Calle de los Molinos 16, Granada")} ·{" "}
          <a href="https://www.instagram.com/papauparetrofusionfood/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-mostaza hover:underline">
            @papauparetrofusionfood
          </a>
        </p>
      </footer>
    </div>
  );
}
