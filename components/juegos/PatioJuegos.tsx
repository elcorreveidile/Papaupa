"use client";

import { useState } from "react";
import JuegoEsquiva from "./JuegoEsquiva";
import JuegoTartazo from "./JuegoTartazo";
import JuegoBesito from "./JuegoBesito";

type Juego = "esquiva" | "tartazo" | "besito";

const JUEGOS: { id: Juego; label: string; emoji: string }[] = [
  { id: "esquiva", label: "¡Que no te pillen!", emoji: "🏃" },
  { id: "tartazo", label: "¡Tartazo!", emoji: "🎂" },
  { id: "besito", label: "¡Un besito!", emoji: "💋" },
];

export default function PatioJuegos() {
  const [juego, setJuego] = useState<Juego>("esquiva");

  return (
    <div className="mx-auto max-w-4xl">
      {/* Selector de juego */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {JUEGOS.map((j) => (
          <button
            key={j.id}
            type="button"
            onClick={() => setJuego(j.id)}
            className={`flex items-center gap-2 rounded-full px-6 py-3 font-sans text-lg font-bold transition-all hover:scale-105 active:scale-95 ${
              juego === j.id
                ? "bg-terracota text-crema shadow-md"
                : "bg-crema-oscura/60 text-marron hover:bg-crema-oscura"
            }`}
          >
            {j.emoji} {j.label}
          </button>
        ))}
      </div>

      {/* Juego activo (key fuerza remontar al cambiar) */}
      {juego === "esquiva" && <JuegoEsquiva key="esquiva" />}
      {juego === "tartazo" && <JuegoTartazo key="tartazo" />}
      {juego === "besito" && <JuegoBesito key="besito" />}
    </div>
  );
}
