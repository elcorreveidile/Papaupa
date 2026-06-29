"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Botón flotante para volver arriba. Aparece al bajar un poco la página y
 * desplaza suavemente hasta el principio. Se coloca abajo a la derecha, fuera
 * del reproductor (arriba a la derecha) y del banner de cookies (borde inferior).
 */
export default function ScrollToTop() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const subir = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={subir}
      aria-label={t("Volver arriba", "Back to top")}
      title={t("Volver arriba", "Back to top")}
      className={`group fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-crema/20 bg-terracota text-crema shadow-lg shadow-marron/30 transition-all duration-300 hover:bg-granate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mostaza focus-visible:ring-offset-2 focus-visible:ring-offset-crema sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
