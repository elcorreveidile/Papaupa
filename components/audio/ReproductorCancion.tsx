"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

/**
 * Reproductor flotante de la cumbia de Papaupa. Vive en el layout, así que la
 * canción sigue sonando al navegar entre páginas. No arranca solo (los
 * navegadores lo bloquean): el visitante pulsa el vinilo para reproducir.
 *
 * Para activarlo: sube el mp3 a /public/audio/ y pon CANCION.activa = true.
 */
const CANCION = {
  activa: true,
  src: "/audio/cumbia-papaupa.mp3",
};

export default function ReproductorCancion() {
  const { t } = useLang();
  const pathname = usePathname();
  const ref = useRef<HTMLAudioElement | null>(null);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const on = () => setSonando(true);
    const off = () => setSonando(false);
    v.addEventListener("play", on);
    v.addEventListener("pause", off);
    return () => {
      v.removeEventListener("play", on);
      v.removeEventListener("pause", off);
    };
  }, []);

  // No mostrar en la puerta de entrada (/) ni si la canción no está activa.
  if (!CANCION.activa || pathname === "/") return null;

  function alternar() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <div className="fixed bottom-4 left-4 z-30 flex items-center gap-2">
      <audio ref={ref} src={CANCION.src} loop preload="none" />
      <button
        type="button"
        onClick={alternar}
        aria-label={sonando ? t("Pausar la cumbia", "Pause the cumbia") : t("Poner la cumbia de Papaupa", "Play Papaupa's cumbia")}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-marron/20 bg-crema/90 shadow-lg backdrop-blur transition-transform hover:scale-105"
      >
        {/* Vinilo */}
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-marron ${sonando ? "gira-disco" : ""}`}
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 50%, #3b2415 0 2px, #2a1a10 2px 4px)",
          }}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mostaza text-[8px] font-bold text-marron">
            ♪
          </span>
        </span>
        {/* Icono play/pausa */}
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-terracota text-crema shadow">
          {sonando ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>
      {/* Etiqueta solo cuando suena */}
      {sonando && (
        <span className="rounded-full bg-crema/90 px-3 py-1 font-sans text-xs font-semibold text-marron shadow backdrop-blur">
          🎵 {t("La cumbia de Papaupa", "Papaupa's cumbia")}
        </span>
      )}
    </div>
  );
}
