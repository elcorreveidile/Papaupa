"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">Realejo · Granada</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-marron sm:text-6xl">
            {t("Te sentirás", "You'll feel")}
            <br />
            {t("como en casa", "right at home")}
          </h1>
          <div className="rainbow-rule mt-5 h-1 w-40 rounded-full" />

          <p className="mt-6 font-display text-xl font-medium italic text-marron sm:text-2xl">
            {t(
              "Cocina colombiano-mediterránea, casera y sin prisa.",
              "Colombian-Mediterranean home cooking, slow and from scratch.",
            )}
          </p>

          <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-marron/80">
            {t(
              "Papaupa es más que un restaurante. Es donde Paco, Margarita y su equipo cocinan con cariño cada plato, respetando los tiempos naturales y el sabor auténtico de Colombia y el Mediterráneo.",
              "Papaupa is more than a restaurant. It's where Paco, Margarita and their team cook every dish with love, respecting natural rhythms and the authentic flavours of Colombia and the Mediterranean.",
            )}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-mostaza px-7 py-3 font-sans font-semibold text-marron shadow-sm transition-all hover:bg-mostaza-osc hover:shadow-md"
            >
              {t("Ver el menú", "See the menu")}
            </Link>
            <Link
              href="/reservas"
              className="rounded-full border-2 border-marron/30 px-7 py-3 font-sans font-semibold text-marron transition-colors hover:border-terracota hover:text-terracota"
            >
              {t("Reservar mesa", "Book a table")}
            </Link>
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-3xl border border-marron/15 shadow-lg">
          <Image
            src="/images/logo-papaupa.jpg"
            alt={t("Identidad retro de Papaupa", "Papaupa's retro identity")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
