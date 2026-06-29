"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

type Resena = {
  es: string;
  en: string;
  nombre: string;
  fuente: "Google" | "TripAdvisor";
  acento: string; // color del filete superior
};

const RESENAS: Resena[] = [
  {
    es: "De lo mejor en el Realejo… pedir de comer es como dar la vuelta al mundo. Necesitamos más sitios así en Granada.",
    en: "One of the best in the Realejo… ordering food is like travelling around the world. Granada needs more places like this.",
    nombre: "ferminGR",
    fuente: "TripAdvisor",
    acento: "var(--terracota)",
  },
  {
    es: "Negocio familiar que te hace sentir como en casa… no me canso de sus patacones, yuca frita y arepas.",
    en: "A family-run spot that makes you feel right at home… I never get tired of their patacones, fried yuca and arepas.",
    nombre: "Nazareth B.",
    fuente: "Google",
    acento: "var(--mostaza-osc)",
  },
  {
    es: "Comida colombiana muy auténtica y deliciosa, porciones generosas y personal amable.",
    en: "Very authentic and delicious Colombian food, generous portions and friendly staff.",
    nombre: "Justė A.",
    fuente: "Google",
    acento: "var(--verde)",
  },
  {
    es: "Un lugar maravilloso y lleno de vida, frecuentado por gente local. ¡Una gran selección de vinos!",
    en: "A wonderful place full of life, popular with locals. A great wine selection!",
    nombre: "maryam G.",
    fuente: "Google",
    acento: "var(--azul)",
  },
];

export default function Testimonios() {
  const { lang, t } = useLang();
  // Giro determinista por índice (personalidad, sin saltos de hidratación).
  const giro = (i: number) => [-1.5, 1.2, -1, 1.5][i % 4];

  return (
    <section id="testimonios" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
            {t("Lo que cuentan", "The word on the street")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
            {t("Nos quieren (y se nota)", "People love it here")}
          </h2>

          {/* Prueba social */}
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-marron/15 bg-crema/80 px-5 py-2 shadow-sm backdrop-blur">
            <span className="text-mostaza-osc">★★★★★</span>
            <span className="font-sans text-sm font-semibold text-marron">
              {t("4,4 en Google · casi 1.000 reseñas", "4.4 on Google · nearly 1,000 reviews")}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {RESENAS.map((r, i) => (
            <figure
              key={r.nombre}
              className="relative overflow-hidden rounded-3xl border border-marron/15 bg-crema/90 p-7 shadow-md backdrop-blur transition-transform hover:-translate-y-1"
              style={{ transform: `rotate(${giro(i)}deg)` }}
            >
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: r.acento }} />
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-mostaza"
                style={{ lineHeight: 0.6 }}
              >
                “
              </span>
              <blockquote className="mt-2 font-display text-xl italic leading-snug text-marron">
                {lang === "en" ? r.en : r.es}
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-2">
                <span className="font-sans font-semibold text-marron">— {r.nombre}</span>
                <span className="rounded-full bg-marron/5 px-3 py-1 font-sans text-xs font-semibold text-marron/70">
                  {r.fuente}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/visitas"
            className="inline-block rounded-full bg-mostaza px-7 py-3 font-sans font-bold text-marron shadow-sm transition-transform hover:scale-105"
          >
            ✍️ {t("Deja la tuya en el corcho", "Leave yours on the board")}
          </Link>
        </div>
      </div>
    </section>
  );
}
