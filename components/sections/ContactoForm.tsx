"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function ContactoForm() {
  const { t } = useLang();
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState(false);
  const [error, setError] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    setEnviando(true);
    try {
      const r = await fetch("/api/contacto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: fd.get("nombre"),
          email: fd.get("email"),
          asunto: fd.get("asunto"),
          mensaje: fd.get("mensaje"),
        }),
      });
      if (!r.ok) throw new Error();
      setHecho(true);
    } catch {
      setError(
        t(
          "No se pudo enviar. Revisa los datos e inténtalo de nuevo.",
          "Couldn't send it. Check the fields and try again.",
        ),
      );
    } finally {
      setEnviando(false);
    }
  }

  const inputCls =
    "mt-1 w-full rounded-xl border-2 border-marron/20 bg-white/90 px-4 py-2 focus:border-mostaza focus:outline-none";

  if (hecho) {
    return (
      <div className="rounded-2xl border border-verde/30 bg-verde/10 p-6 font-sans text-marron">
        <p className="text-3xl">📬</p>
        <p className="mt-2 font-semibold">
          {t("¡Mensaje enviado! Te responderemos pronto.", "Message sent! We'll get back to you soon.")}
        </p>
        <p className="mt-1 text-sm text-marron/70">
          {t("Te hemos mandado una copia por email.", "We've sent you a copy by email.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="rounded-3xl border border-marron/15 bg-crema/80 p-6 shadow-sm backdrop-blur">
      <h3 className="font-display text-2xl text-marron">{t("Escríbenos", "Drop us a line")}</h3>
      <p className="mt-1 font-sans text-sm text-marron/60">
        {t("¿Una duda, un evento, una sugerencia? Cuéntanos.", "A question, an event, a suggestion? Tell us.")}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">{t("Nombre", "Name")} *</span>
          <input name="nombre" required className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Email *</span>
          <input name="email" type="email" required className={inputCls} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="font-sans text-sm font-semibold text-marron">{t("Asunto", "Subject")}</span>
        <input name="asunto" className={inputCls} />
      </label>
      <label className="mt-4 block">
        <span className="font-sans text-sm font-semibold text-marron">{t("Mensaje", "Message")} *</span>
        <textarea name="mensaje" required rows={4} maxLength={2000} className={inputCls} />
      </label>

      {error && <p className="mt-3 font-sans text-sm text-terracota">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="mt-5 rounded-full bg-mostaza px-7 py-3 font-sans font-bold text-marron transition-colors hover:bg-mostaza-osc disabled:opacity-60"
      >
        {enviando ? t("Enviando…", "Sending…") : t("Enviar mensaje", "Send message")}
      </button>
    </form>
  );
}
