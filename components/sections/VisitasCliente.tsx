"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

export type ResenaPublica = {
  id: number;
  nombre: string;
  rating: number;
  comentario: string;
  creadoISO: string;
};

function Estrellas({ n }: { n: number }) {
  return (
    <span aria-label={`${n} de 5`} className="text-mostaza-osc">
      {"★".repeat(n)}
      <span className="text-marron/20">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function VisitasCliente({ resenas }: { resenas: ResenaPublica[] }) {
  const { lang, t } = useLang();
  const [abierto, setAbierto] = useState(false);
  const [rating, setRating] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState(false);
  const [error, setError] = useState("");

  const fmt = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (rating < 1) {
      setError(t("Pon una puntuación con las estrellas.", "Please pick a star rating."));
      return;
    }
    const fd = new FormData(e.currentTarget);
    setEnviando(true);
    try {
      const r = await fetch("/api/resenas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: fd.get("nombre"),
          email: fd.get("email"),
          comentario: fd.get("comentario"),
          rating,
        }),
      });
      if (!r.ok) throw new Error();
      setHecho(true);
      setAbierto(false);
      setRating(0);
    } catch {
      setError(t("No se pudo enviar. Revisa los datos e inténtalo de nuevo.", "Couldn't send it. Check the fields and try again."));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
        {t("Lo que dicen", "What people say")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
        {t("Libro de visitas", "Guestbook")}
      </h1>

      {/* CTA / formulario */}
      <div className="mt-6">
        {hecho ? (
          <div className="rounded-2xl border border-verde/30 bg-verde/10 p-5 font-sans text-marron">
            🎉 {t("¡Gracias! Tu reseña se publicará en cuanto Paco le dé el visto bueno.", "Thanks! Your review will appear once Paco approves it.")}
          </div>
        ) : !abierto ? (
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="rounded-full bg-mostaza px-7 py-3 font-sans font-bold text-marron transition-transform hover:scale-105"
          >
            ✍️ {t("Dejar mi reseña", "Leave a review")}
          </button>
        ) : (
          <form onSubmit={enviar} className="rounded-3xl border border-marron/15 bg-crema/85 p-6 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Nombre", "Name")} *</span>
                <input name="nombre" required className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none" />
              </label>
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Email (no se publica)", "Email (not shown)")} *</span>
                <input name="email" type="email" required className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none" />
              </label>
            </div>

            <div className="mt-4">
              <span className="font-sans text-sm font-semibold text-marron">{t("Tu puntuación", "Your rating")} *</span>
              <div className="mt-1 flex gap-1 text-3xl">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={`${n} ${t("estrellas", "stars")}`}
                    className={n <= rating ? "text-mostaza-osc" : "text-marron/25 hover:text-mostaza"}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 block">
              <span className="font-sans text-sm font-semibold text-marron">{t("Tu reseña", "Your review")} * <span className="font-normal text-marron/50">({t("máx. 150", "max. 150")})</span></span>
              <textarea name="comentario" required maxLength={150} rows={3} className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none" />
            </label>

            {error && <p className="mt-3 font-sans text-sm text-terracota">{error}</p>}

            <div className="mt-5 flex items-center gap-3">
              <button type="submit" disabled={enviando} className="rounded-full bg-mostaza px-7 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc disabled:opacity-60">
                {enviando ? t("Enviando…", "Sending…") : t("Enviar reseña", "Send review")}
              </button>
              <button type="button" onClick={() => setAbierto(false)} className="font-sans text-sm text-marron/60 hover:text-marron">
                {t("Cancelar", "Cancel")}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Listado */}
      {resenas.length === 0 ? (
        <p className="mt-12 font-sans text-marron/60">
          {t("Aún no hay reseñas publicadas. ¡Sé el primero!", "No reviews published yet. Be the first!")}
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resenas.map((r) => (
            <article key={r.id} className="rounded-3xl border border-marron/15 bg-crema/90 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mostaza font-display text-xl font-semibold text-marron">
                  {r.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-sans font-semibold text-marron">{r.nombre}</p>
                  <p className="font-sans text-xs text-marron/50">{fmt.format(new Date(r.creadoISO))}</p>
                </div>
              </div>
              <div className="mt-3 text-lg">
                <Estrellas n={r.rating} />
              </div>
              <p className="mt-2 font-sans text-marron/80">“{r.comentario}”</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
