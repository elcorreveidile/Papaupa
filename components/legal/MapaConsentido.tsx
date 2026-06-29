"use client";

import { useLang } from "@/lib/i18n";
import { guardarConsent, useConsent } from "./consent";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Papaupa,+Calle+de+los+Molinos+16,+18009+Granada&output=embed";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Papaupa+Calle+de+los+Molinos+16+Granada";

/**
 * Muestra el mapa de Google solo si el visitante aceptó todas las cookies
 * (el embed de Google instala cookies de terceros). Si no, un aviso con la
 * opción de aceptar o de abrir el mapa en una pestaña nueva.
 */
export default function MapaConsentido() {
  const { t } = useLang();
  const consent = useConsent();

  if (consent === "all") {
    return (
      <iframe
        title={t("Mapa de Papaupa", "Map of Papaupa")}
        src={MAPS_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full md:h-full"
        style={{ border: 0, minHeight: "20rem" }}
      />
    );
  }

  return (
    <div className="flex h-80 w-full flex-col items-center justify-center gap-3 bg-crema-oscura/40 p-6 text-center md:h-full">
      <span className="text-3xl">🗺️</span>
      <p className="font-sans text-sm text-marron/70">
        {t(
          "El mapa de Google usa cookies de terceros. Acéptalas para verlo aquí.",
          "Google Maps uses third-party cookies. Accept them to view it here.",
        )}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => guardarConsent("all")}
          className="rounded-full bg-mostaza px-5 py-2 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc"
        >
          {t("Aceptar y ver el mapa", "Accept and show map")}
        </button>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-marron/25 px-5 py-2 font-sans text-sm font-semibold text-marron hover:border-terracota hover:text-terracota"
        >
          {t("Abrir en Google Maps", "Open in Google Maps")}
        </a>
      </div>
    </div>
  );
}
