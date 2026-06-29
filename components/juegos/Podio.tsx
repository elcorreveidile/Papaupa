"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Fila = { iniciales: string; puntos: number };

const MEDALLA = ["🥇", "🥈", "🥉"];

/**
 * Podio (top 3) de un juego + formulario de iniciales si la puntuación entra
 * en el ranking. Se monta dentro de la pantalla de fin de partida.
 */
export default function Podio({
  juego,
  puntos,
  unidad = "",
}: {
  juego: "esquiva" | "tartazo" | "besito";
  puntos: number;
  unidad?: string;
}) {
  const { t } = useLang();
  const [top, setTop] = useState<Fila[] | null>(null);
  const [iniciales, setIniciales] = useState("");
  const [guardado, setGuardado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function cargar() {
    try {
      const r = await fetch(`/api/puntuaciones?juego=${juego}`, { cache: "no-store" });
      const d = await r.json();
      setTop(d.top || []);
    } catch {
      setTop([]);
    }
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const califica =
    !guardado &&
    top !== null &&
    puntos > 0 &&
    (top.length < 3 || puntos > top[top.length - 1].puntos);

  useEffect(() => {
    if (califica) inputRef.current?.focus();
  }, [califica]);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    const ini = iniciales.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
    if (!ini) return;
    setEnviando(true);
    try {
      const r = await fetch("/api/puntuaciones", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ juego, iniciales: ini, puntos }),
      });
      const d = await r.json();
      if (d.top) setTop(d.top);
      else await cargar();
      setGuardado(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mt-4 w-full max-w-xs">
      {califica && (
        <form onSubmit={guardar} className="mb-3 rounded-2xl bg-crema/15 p-3">
          <p className="font-sans text-sm font-semibold">
            🏆 {t("¡Estás en el podio! Pon tus iniciales:", "You made the podium! Enter your initials:")}
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <input
              ref={inputRef}
              value={iniciales}
              onChange={(e) =>
                setIniciales(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3))
              }
              maxLength={3}
              placeholder="JBL"
              aria-label={t("Tus iniciales", "Your initials")}
              className="w-24 rounded-xl border-2 border-crema/40 bg-crema/90 px-3 py-2 text-center font-mono text-xl font-bold uppercase tracking-[0.3em] text-marron placeholder:text-marron/30 focus:border-mostaza focus:outline-none"
            />
            <button
              type="submit"
              disabled={enviando || !iniciales}
              className="rounded-full bg-mostaza px-5 py-2 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc disabled:opacity-50"
            >
              {enviando ? t("Guardando…", "Saving…") : t("Guardar", "Save")}
            </button>
          </div>
        </form>
      )}

      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-crema/80">
        {t("Mejores puntuaciones", "Top scores")}
      </p>
      <ol className="mt-2 space-y-1">
        {top === null ? (
          <li className="font-sans text-sm text-crema/70">…</li>
        ) : top.length === 0 ? (
          <li className="font-sans text-sm text-crema/70">
            {t("¡Sé el primero del ranking!", "Be the first on the board!")}
          </li>
        ) : (
          top.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg bg-crema/10 px-3 py-1.5 font-sans"
            >
              <span className="flex items-center gap-2">
                <span>{MEDALLA[i]}</span>
                <span className="font-mono font-bold tracking-widest">{f.iniciales}</span>
              </span>
              <span className="font-bold">
                {f.puntos}
                {unidad}
              </span>
            </li>
          ))
        )}
      </ol>
    </div>
  );
}
