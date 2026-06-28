"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { useLang } from "@/lib/i18n";

export type ResenaPublica = {
  id: number;
  nombre: string;
  rating: number;
  comentario: string;
  fotoUrl: string | null;
  creadoISO: string;
};

// Colores de chincheta y giro, deterministas por id (evita saltos de hidratación).
const PINS = ["#d23b2c", "#f2b705", "#4f7a4d", "#2e6f8e", "#8e44ad"];
const NOTAS = ["#fff8e1", "#fdeccb", "#eaf3df", "#e6f0f4", "#f6e7ef"];
const giro = (id: number) => ((id * 37) % 9) - 4; // -4..+4 grados

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
  const [progreso, setProgreso] = useState(0);
  const fotoRef = useRef<HTMLInputElement>(null);

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
    setProgreso(0);
    try {
      // Si hay foto, primero la subimos a Blob (navegador → Blob).
      let fotoUrl = "";
      const file = fotoRef.current?.files?.[0];
      if (file) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/resenas/upload",
          onUploadProgress: (p) => setProgreso(Math.round(p.percentage)),
        });
        fotoUrl = blob.url;
      }

      const r = await fetch("/api/resenas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: fd.get("nombre"),
          email: fd.get("email"),
          comentario: fd.get("comentario"),
          rating,
          fotoUrl,
        }),
      });
      if (!r.ok) throw new Error();
      setHecho(true);
      setAbierto(false);
      setRating(0);
    } catch {
      setError(
        t(
          "No se pudo enviar. Revisa los datos e inténtalo de nuevo.",
          "Couldn't send it. Check the fields and try again.",
        ),
      );
    } finally {
      setEnviando(false);
      setProgreso(0);
    }
  }

  const inputCls =
    "mt-1 w-full rounded-xl border-2 border-marron/20 bg-white/90 px-4 py-2 focus:border-mostaza focus:outline-none";

  return (
    <main className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-crema drop-shadow">
        {t("Lo que dicen", "What people say")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold italic text-crema drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] sm:text-5xl">
        {t("Libro de visitas", "Guestbook")}
      </h1>
      <p className="mt-3 max-w-xl font-sans text-crema/90 drop-shadow">
        {t(
          "Clava tu nota en el corcho: cuéntanos tu visita y, si quieres, deja una foto.",
          "Pin your note to the board: tell us about your visit and, if you like, leave a photo.",
        )}
      </p>

      {/* CTA / formulario */}
      <div className="mt-6">
        {hecho ? (
          <div className="max-w-xl rounded-2xl border border-verde/30 bg-crema/95 p-5 font-sans text-marron shadow-lg">
            🎉{" "}
            {t(
              "¡Gracias! Tu nota se clavará en el corcho en cuanto Paco le dé el visto bueno.",
              "Thanks! Your note will be pinned up once Paco approves it.",
            )}
          </div>
        ) : !abierto ? (
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="rounded-full bg-mostaza px-7 py-3 font-sans font-bold text-marron shadow-lg transition-transform hover:scale-105"
          >
            ✍️ {t("Clavar mi nota", "Pin my note")}
          </button>
        ) : (
          <form onSubmit={enviar} className="max-w-2xl rounded-3xl border border-marron/15 bg-crema/95 p-6 shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Nombre", "Name")} *</span>
                <input name="nombre" required className={inputCls} />
              </label>
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">
                  {t("Email (no se publica)", "Email (not shown)")} *
                </span>
                <input name="email" type="email" required className={inputCls} />
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
              <span className="font-sans text-sm font-semibold text-marron">
                {t("Tu reseña", "Your review")} *{" "}
                <span className="font-normal text-marron/50">({t("máx. 150", "max. 150")})</span>
              </span>
              <textarea name="comentario" required maxLength={150} rows={3} className={inputCls} />
            </label>

            <div className="mt-4">
              <span className="font-sans text-sm font-semibold text-marron">
                📷 {t("Foto (opcional)", "Photo (optional)")}
              </span>
              <input
                ref={fotoRef}
                type="file"
                accept="image/*"
                className="mt-2 block w-full font-sans text-sm text-marron file:mr-3 file:rounded-full file:border-0 file:bg-mostaza file:px-4 file:py-2 file:font-bold file:text-marron hover:file:bg-mostaza-osc"
              />
              <p className="mt-1 font-sans text-xs text-marron/50">
                {t("Desde el móvil puedes hacer una foto al momento. Máx. 10 MB.", "On mobile you can snap a photo. Max 10 MB.")}
              </p>
            </div>

            {error && <p className="mt-3 font-sans text-sm text-terracota">{error}</p>}
            {enviando && progreso > 0 && (
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-marron/10">
                <div className="h-full bg-mostaza transition-all" style={{ width: `${progreso}%` }} />
              </div>
            )}

            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                disabled={enviando}
                className="rounded-full bg-mostaza px-7 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc disabled:opacity-60"
              >
                {enviando ? t("Enviando…", "Sending…") : t("Clavar reseña", "Pin review")}
              </button>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="font-sans text-sm text-marron/70 hover:text-marron"
              >
                {t("Cancelar", "Cancel")}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Corcho con las notas clavadas */}
      {resenas.length === 0 ? (
        <p className="mt-12 font-sans text-crema/90 drop-shadow">
          {t("Aún no hay notas en el corcho. ¡Sé el primero!", "No notes on the board yet. Be the first!")}
        </p>
      ) : (
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-12 sm:justify-start">
          {resenas.map((r) => {
            const pin = PINS[r.id % PINS.length];
            const papel = NOTAS[r.id % NOTAS.length];
            const rot = giro(r.id);
            return (
              <article
                key={r.id}
                className="relative w-64 pt-4 transition-transform hover:z-10 hover:scale-[1.03]"
                style={{ transform: `rotate(${rot}deg)` }}
              >
                {/* Chincheta */}
                <span
                  className="chincheta absolute left-1/2 top-0 -translate-x-1/2"
                  style={{ "--pin": pin } as React.CSSProperties}
                  aria-hidden
                />
                {r.fotoUrl ? (
                  // Estilo polaroid
                  <div className="bg-white p-3 pb-4 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.fotoUrl} alt={`Foto de ${r.nombre}`} loading="lazy" className="aspect-square w-full object-cover" />
                    <div className="px-1 pt-3">
                      <Estrellas n={r.rating} />
                      <p className="mt-1 font-display text-lg italic leading-snug text-marron">“{r.comentario}”</p>
                      <p className="mt-2 font-display text-base font-semibold text-marron">— {r.nombre}</p>
                      <p className="font-sans text-xs text-marron/50">{fmt.format(new Date(r.creadoISO))}</p>
                    </div>
                  </div>
                ) : (
                  // Nota de papel
                  <div className="p-5 shadow-[0_8px_18px_rgba(0,0,0,0.3)]" style={{ backgroundColor: papel }}>
                    <Estrellas n={r.rating} />
                    <p className="mt-2 font-display text-xl italic leading-snug text-marron">“{r.comentario}”</p>
                    <p className="mt-3 font-display text-base font-semibold text-marron">— {r.nombre}</p>
                    <p className="font-sans text-xs text-marron/50">{fmt.format(new Date(r.creadoISO))}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
