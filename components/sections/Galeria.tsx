"use client";

import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/lib/i18n";

export type Foto = {
  id: number;
  url: string;
  titulo: string | null;
  tituloEn: string | null;
};

export default function Galeria({ fotos }: { fotos: Foto[] }) {
  const { lang, t } = useLang();
  const [abierta, setAbierta] = useState<number | null>(null);

  const cap = useCallback(
    (f: Foto) => (lang === "en" && f.tituloEn ? f.tituloEn : f.titulo) || "",
    [lang],
  );

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (d: number) =>
      setAbierta((i) => (i === null ? null : (i + d + fotos.length) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [abierta, cerrar, mover]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
        {t("La casa", "The place")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
        {t("Galería", "Gallery")}
      </h1>
      <p className="mt-4 max-w-xl font-sans text-marron/75">
        {t(
          "Un paseo por Papaupa: la cocina, las mesas, los platos y la gente que hace de este rincón del Realejo un hogar.",
          "A stroll through Papaupa: the kitchen, the tables, the dishes and the people who make this corner of the Realejo a home.",
        )}
      </p>

      {fotos.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-marron/15 bg-crema/85 p-10 text-center backdrop-blur">
          <p className="text-4xl">📷</p>
          <p className="mt-3 font-sans text-marron/70">
            {t("Pronto subiremos fotos. ¡Vuelve a verlas!", "Photos coming soon. Check back!")}
          </p>
        </div>
      ) : (
        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {fotos.map((f, i) => {
            const c = cap(f);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setAbierta(i)}
                className="group block w-full overflow-hidden rounded-2xl border border-marron/15 bg-crema/60 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.url}
                  alt={c || "Papaupa"}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {c && (
                  <span className="block px-3 py-2 text-left font-sans text-sm text-marron/70">{c}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {abierta !== null && fotos[abierta] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-marron/90 p-4 backdrop-blur-sm"
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={cerrar}
            aria-label={t("Cerrar", "Close")}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-crema/90 text-2xl font-bold text-marron hover:bg-crema"
          >
            ✕
          </button>
          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(-1);
                }}
                aria-label={t("Anterior", "Previous")}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-crema/90 text-2xl font-bold text-marron hover:bg-crema sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(1);
                }}
                aria-label={t("Siguiente", "Next")}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-crema/90 text-2xl font-bold text-marron hover:bg-crema sm:right-6"
              >
                ›
              </button>
            </>
          )}
          <figure className="max-h-[88svh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[abierta].url}
              alt={cap(fotos[abierta]) || "Papaupa"}
              className="max-h-[80svh] w-auto rounded-2xl object-contain"
            />
            {cap(fotos[abierta]) && (
              <figcaption className="mt-3 text-center font-display text-lg italic text-crema">
                {cap(fotos[abierta])}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </main>
  );
}
