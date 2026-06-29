"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { guardarConsent, useConsent } from "./consent";

export default function CookieBanner() {
  const { t } = useLang();
  const consent = useConsent();

  // Mientras se lee (undefined) o si ya hay decisión, no se muestra.
  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3">
      <div className="mx-auto max-w-3xl rounded-2xl border border-marron/20 bg-crema/95 p-4 shadow-2xl backdrop-blur sm:flex sm:items-center sm:gap-4">
        <p className="font-sans text-sm text-marron/80">
          🍪{" "}
          {t(
            "Usamos cookies necesarias para que la web funcione y, si lo aceptas, cookies de terceros para mostrar el mapa de Google.",
            "We use necessary cookies to make the site work and, if you accept, third-party cookies to show the Google map.",
          )}{" "}
          <Link href="/cookies" className="font-semibold text-terracota underline-offset-2 hover:underline">
            {t("Más información", "Learn more")}
          </Link>
          .
        </p>
        <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => guardarConsent("necesarias")}
            className="rounded-full border border-marron/25 px-4 py-2 font-sans text-sm font-semibold text-marron transition-colors hover:border-terracota hover:text-terracota"
          >
            {t("Solo necesarias", "Necessary only")}
          </button>
          <button
            type="button"
            onClick={() => guardarConsent("all")}
            className="rounded-full bg-mostaza px-5 py-2 font-sans text-sm font-bold text-marron transition-colors hover:bg-mostaza-osc"
          >
            {t("Aceptar todas", "Accept all")}
          </button>
        </div>
      </div>
    </div>
  );
}
