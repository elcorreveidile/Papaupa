"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function NewsletterForm() {
  const { t } = useLang();
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState(false);
  const [error, setError] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    setEnviando(true);
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error();
      setHecho(true);
    } catch {
      setError(t("No se pudo suscribir. Inténtalo de nuevo.", "Couldn't subscribe. Try again."));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <p className="font-display text-lg italic text-crema">
        {t("¿Te avisamos de eventos y novedades?", "Want news about events and dishes?")}
      </p>
      {hecho ? (
        <p className="mt-2 font-sans text-sm text-mostaza">
          🎉 {t("¡Listo! Revisa tu correo.", "Done! Check your inbox.")}
        </p>
      ) : (
        <form onSubmit={enviar} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            name="email"
            type="email"
            required
            placeholder={t("tu@email.com", "you@email.com")}
            aria-label={t("Tu email", "Your email")}
            className="min-w-0 flex-1 rounded-full border border-crema/25 bg-crema/10 px-4 py-2 font-sans text-sm text-crema placeholder:text-crema/40 focus:border-mostaza focus:outline-none"
          />
          <button
            type="submit"
            disabled={enviando}
            className="shrink-0 rounded-full bg-mostaza px-5 py-2 font-sans text-sm font-bold text-marron transition-colors hover:bg-mostaza-osc disabled:opacity-60"
          >
            {enviando ? t("Enviando…", "Sending…") : t("Suscribirme", "Subscribe")}
          </button>
        </form>
      )}
      {error && <p className="mt-2 font-sans text-sm text-mostaza">{error}</p>}
      <p className="mt-2 font-sans text-[0.7rem] text-crema/40">
        {t("Sin spam. Te puedes dar de baja cuando quieras.", "No spam. Unsubscribe anytime.")}
      </p>
    </div>
  );
}
