"use client";

import { useCallback, useState } from "react";
import { useLang } from "@/lib/i18n";

const VERSION = "V.1.0";

// Bichitos que asoman a bailar al pasar el ratón. Mayormente pollitos ("pitas"),
// con algún guiño a la cocina de la casa.
const BICHOS = ["🐥", "🐤", "🐣", "🍳", "🪙", "🥑", "🌽", "🎉", "🪩", "🕺"];

// ~20 frases aleatorias, bilingües. Sale una al azar cada vez que rondas el crédito.
const FRASES: Array<[es: string, en: string]> = [
  ["Hecho con cariño y 2 duros de propina.", "Made with love and pocket change."],
  ["Sí, esta web costó literalmente 2 duros.", "Yep, this site cost literally two bucks."],
  ["Más barato que el café del Realejo.", "Cheaper than a coffee in the Realejo."],
  ["Programado entre patacón y patacón.", "Coded between one patacón and the next."],
  ["No le des clic… ¡que es broma, dale!", "Don't click… just kidding, click!"],
  ["Píxeles fritos a fuego lento.", "Pixels fried on low heat."],
  ["Tu cursor tiene buen gusto.", "Your cursor has great taste."],
  ["Aquí no hay cookies, hay arepas.", "No cookies here, only arepas."],
  ["2 duros bien gastados, ¿eh?", "Two well-spent duros, huh?"],
  ["Hecho a mano, como la masa.", "Handmade, just like the dough."],
  ["Esta frase es aleatoria. Esta también.", "This phrase is random. So is this one."],
  ["Recién salido del horno digital.", "Fresh out of the digital oven."],
  ["Pásate, que invitamos a un clic.", "Come on in, the click's on us."],
  ["Con mucho amor y poco presupuesto.", "Lots of love, tiny budget."],
  ["El mejor pie de página del Realejo.", "Best footer in the Realejo."],
  ["Sí, el pollito baila. No preguntes.", "Yes, the chick dances. Don't ask."],
  ["Garantía de 2 duros o le devolvemos la sonrisa.", "Two-duro guarantee or your smile back."],
  ["Curado a mano, sin gluten ni bugs (casi).", "Handcrafted, gluten- and bug-free (almost)."],
  ["Cada clic alimenta a un patacón.", "Every click feeds a patacón."],
  ["Avisa antes de irte, que nos encariñamos.", "Say bye before you go, we get attached."],
];

export default function SiteFooter() {
  const { t } = useLang();
  const [hover, setHover] = useState(false);
  const [frase, setFrase] = useState(0);
  const [bicho, setBicho] = useState(0);

  // Cada vez que el ratón entra, barajamos frase y bichito.
  const revolver = useCallback(() => {
    setFrase(Math.floor(Math.random() * FRASES.length));
    setBicho(Math.floor(Math.random() * BICHOS.length));
    setHover(true);
  }, []);

  const [es, en] = FRASES[frase];

  return (
    <footer className="bg-marron py-8 text-center text-crema/80">
      <p className="font-display text-xl italic">Papaupa · Retro Fusión Food</p>
      <p className="mt-1 font-sans text-sm">
        Calle de los Molinos 16, Granada ·{" "}
        <a
          href="https://www.instagram.com/papauparetrofusionfood/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:text-mostaza hover:underline"
        >
          @papauparetrofusionfood
        </a>
      </p>

      {/* Crédito juguetón: pasa el ratón cerca y aparece un bichito bailando + frase aleatoria. */}
      <div
        className="relative mt-5 flex flex-col items-center"
        onMouseEnter={revolver}
        onMouseLeave={() => setHover(false)}
      >
        {/* Globo de diálogo con la frase aleatoria.
            Ancho limitado al viewport para que en móvil no se salga por los lados. */}
        <div
          aria-hidden={!hover}
          className={`pointer-events-none absolute bottom-full left-1/2 mb-3 w-max max-w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2 ${
            hover ? "animate-bocadillo" : "hidden"
          }`}
        >
          <span className="relative block rounded-2xl bg-crema px-4 py-2 font-sans text-sm font-medium text-marron shadow-lg">
            {t(es, en)}
            {/* piquito del globo */}
            <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-crema" />
          </span>
        </div>

        <p className="font-sans text-xs text-crema/70">
          <span className="inline-flex items-center gap-1.5">
            {/* El bichito animado */}
            <span
              className={`inline-block text-base ${hover ? "animate-jig" : ""}`}
              role="img"
              aria-label={t("bichito juguetón", "playful critter")}
            >
              {hover ? BICHOS[bicho] : "🍌"}
            </span>
            {t("desarrollado por", "developed by")}{" "}
            <a
              href="https://www.por2duros.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-mostaza underline-offset-4 transition-colors hover:text-crema hover:underline"
            >
              Por 2 duros
            </a>
          </span>
        </p>

        <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-crema/40">
          {VERSION}
        </p>
      </div>
    </footer>
  );
}
