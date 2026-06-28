"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Cuenta atrás 3·2·1·¡Ya! antes de empezar la partida, para dar tiempo a
 * reaccionar. `lanzar()` la inicia; cuando termina llama a `onDone`.
 */
export function useCuentaAtras(onDone: () => void) {
  const cb = useRef(onDone);
  cb.current = onDone;
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (count === null) return;
    if (count < 0) {
      setCount(null);
      cb.current();
      return;
    }
    const id = setTimeout(() => setCount((c) => (c === null ? null : c - 1)), 650);
    return () => clearTimeout(id);
  }, [count]);

  return { count, lanzar: () => setCount(3) };
}

/** Velo con el número de la cuenta atrás (o "¡Ya!"). */
export function CuentaAtras({ n }: { n: number }) {
  const { t } = useLang();
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-marron/55 backdrop-blur-sm">
      <span className="font-display text-7xl font-bold italic text-crema drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] sm:text-8xl">
        {n > 0 ? n : t("¡Ya!", "Go!")}
      </span>
    </div>
  );
}

/** Pantalla de inicio con el botón "Empezar". */
export function BotonEmpezar({ onStart, pista }: { onStart: () => void; pista?: string }) {
  const { t } = useLang();
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-marron/70 px-4 text-center text-crema backdrop-blur-sm">
      <p className="font-display text-2xl font-bold italic sm:text-3xl">{t("¿Preparado?", "Ready?")}</p>
      {pista && <p className="mt-1 max-w-xs font-sans text-sm text-crema/80">{pista}</p>}
      <button
        type="button"
        onClick={onStart}
        className="mt-5 rounded-full bg-mostaza px-8 py-3 font-sans text-lg font-bold text-marron shadow-md transition-transform hover:scale-105 active:scale-95"
      >
        ▶ {t("Empezar", "Start")}
      </button>
    </div>
  );
}
