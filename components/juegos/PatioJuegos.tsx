"use client";

import { useState } from "react";
import Link from "next/link";
import { LangToggle, useLang } from "@/lib/i18n";
import JuegoEsquiva from "./JuegoEsquiva";
import JuegoTartazo from "./JuegoTartazo";
import JuegoBesito from "./JuegoBesito";

type Juego = "esquiva" | "tartazo" | "besito";

const JUEGOS: { id: Juego; es: string; en: string; emoji: string }[] = [
  { id: "esquiva", es: "¡Que no te pillen!", en: "Don't get caught!", emoji: "🏃" },
  { id: "tartazo", es: "¡Tartazo!", en: "Cake fight!", emoji: "🎂" },
  { id: "besito", es: "¡Un besito!", en: "A little kiss!", emoji: "💋" },
];

export default function PatioJuegos() {
  const { lang, t } = useLang();
  const [juego, setJuego] = useState<Juego>("esquiva");

  return (
    <div className="juegos-pantalla min-h-svh">
      <header className="border-b border-marron/15 bg-crema/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href="/inicio" className="font-sans text-sm font-medium text-marron/80 transition-colors hover:text-terracota">
            ← {t("Volver", "Back")}
          </Link>
          <span className="font-display text-xl font-semibold text-marron">
            {t("El patio de Papaupa", "Papaupa's playground")}
          </span>
          <LangToggle />
        </div>
        <div className="rainbow-rule h-[2px] w-full opacity-70" />
      </header>

      <main className="px-5 py-10">
        <h1 className="text-center font-display text-4xl font-semibold italic text-marron sm:text-5xl">
          {t("¡A jugar!", "Let's play!")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center font-sans text-marron/70">
          {t(
            "Ponte a los mandos de la Patacona. Esquiva a Don Patacón cuando te persigue… o cógela tú y lánzale tartas. ¡Elige juego!",
            "Take control of the Patacona. Dodge Don Patacón when he chases you… or grab her and throw cakes at him. Pick a game!",
          )}
        </p>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {JUEGOS.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setJuego(j.id)}
                className={`flex items-center gap-2 rounded-full px-6 py-3 font-sans text-lg font-bold transition-all hover:scale-105 active:scale-95 ${
                  juego === j.id ? "bg-terracota text-crema shadow-md" : "bg-crema-oscura/60 text-marron hover:bg-crema-oscura"
                }`}
              >
                {j.emoji} {lang === "en" ? j.en : j.es}
              </button>
            ))}
          </div>

          {juego === "esquiva" && <JuegoEsquiva key="esquiva" />}
          {juego === "tartazo" && <JuegoTartazo key="tartazo" />}
          {juego === "besito" && <JuegoBesito key="besito" />}
        </div>
      </main>
    </div>
  );
}
