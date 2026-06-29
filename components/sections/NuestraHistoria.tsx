"use client";

import { useLang } from "@/lib/i18n";

/**
 * Sección "Nuestra historia": relato cálido del local (Paco andaluz + Margarita
 * colombiana, fusión colombiano-mediterránea, retro/vintage en el Realejo).
 * Con un PLACEHOLDER claro para una foto real de Paco y Margarita / del local.
 */
export default function NuestraHistoria() {
  const { t } = useLang();

  return (
    <section
      id="historia"
      className="scroll-mt-24 border-t border-marron/10 bg-crema-oscura/30 py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-14">
        {/* Texto */}
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
            {t("Nuestra historia", "Our story")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
            {t("De dos orillas, una misma mesa", "Two shores, one table")}
          </h2>
          <div className="rainbow-rule mt-5 h-1 w-40 rounded-full" />

          <p className="mt-6 font-display text-xl font-medium italic text-marron sm:text-2xl">
            {t(
              "Papaupa nació del encuentro entre el Caribe y el Mediterráneo.",
              "Papaupa was born where the Caribbean meets the Mediterranean.",
            )}
          </p>
          <p className="mt-4 font-sans text-lg leading-relaxed text-marron/80">
            {t(
              "Lo regentan Paco, andaluz de pura cepa, y Margarita, colombiana de corazón. Juntos abrieron esta casa en pleno barrio del Realejo para cocinar lo que son: una fusión sin complejos donde los patacones se sientan a la mesa con el aceite de oliva, y las arepas conviven con el pescado fresco.",
              "It's run by Paco, Andalusian to the core, and Margarita, Colombian at heart. Together they opened this place in the heart of the Realejo to cook exactly who they are: an unapologetic fusion where patacones share the table with olive oil, and arepas sit happily beside fresh fish.",
            )}
          </p>
          <p className="mt-4 font-sans text-lg leading-relaxed text-marron/80">
            {t(
              "Todo se sirve con tiempo, con cariño y con ese punto retro setentero que te abraza nada más entrar. Porque Papaupa no es solo un restaurante: es su casa. Y cuando cruzas la cortina verde, ya eres de la familia.",
              "Everything is served slowly, with love, and with that warm seventies-retro touch that hugs you the moment you walk in. Because Papaupa isn't just a restaurant: it's their home. And once you step through the green curtain, you're family.",
            )}
          </p>
        </div>

        {/* Collage del local: mural (principal) + vista de calle (solapada) + sello redondo */}
        <div className="relative mx-auto w-full max-w-sm pb-6 pt-4 md:mx-0">
          {/* Foto principal: el mural de la persiana */}
          <div className="rotate-1 rounded-3xl bg-white p-3 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/local-mural.jpg"
              alt={t("Mural de la fachada de Papaupa en el Realejo", "Papaupa's painted storefront in the Realejo")}
              className="aspect-square w-full rounded-2xl object-cover"
            />
            <p className="mt-2 px-1 font-display text-lg italic text-marron/70">
              {t("Nuestra fachada, en el Realejo.", "Our storefront, in the Realejo.")}
            </p>
          </div>

          {/* Foto secundaria solapada: vista de calle con el balcón */}
          <div className="absolute -bottom-5 -right-3 w-24 -rotate-6 rounded-xl bg-white p-1.5 shadow-lg sm:w-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/local-fachada.jpg"
              alt={t("Vista de la calle de los Molinos", "View of Calle de los Molinos")}
              className="aspect-[3/4] w-full rounded-lg object-cover"
            />
          </div>

          {/* Sello / logo redondo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sello-papaupa.png"
            alt="Papaupa"
            className="absolute -left-2 -top-2 w-16 -rotate-12 drop-shadow-md sm:w-20"
          />
        </div>
      </div>
    </section>
  );
}
