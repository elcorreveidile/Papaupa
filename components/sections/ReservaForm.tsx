"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const HORAS = (() => {
  const out: string[] = [];
  for (let h = 13; h <= 22; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 22) out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

export default function ReservaForm() {
  const { t } = useLang();
  const [minFecha, setMinFecha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState<{ fecha: string; hora: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setMinFecha(new Date().toISOString().slice(0, 10));
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    setEnviando(true);
    try {
      const r = await fetch("/api/reservas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre: fd.get("nombre"),
          telefono: fd.get("telefono"),
          email: fd.get("email"),
          fecha: fd.get("fecha"),
          hora: fd.get("hora"),
          personas: Number(fd.get("personas")),
          observaciones: fd.get("observaciones"),
        }),
      });
      if (!r.ok) throw new Error();
      setHecho({ fecha: String(fd.get("fecha")), hora: String(fd.get("hora")) });
    } catch {
      setError(t("No se pudo enviar. Revisa los datos e inténtalo de nuevo.", "Couldn't send it. Check the fields and try again."));
    } finally {
      setEnviando(false);
    }
  }

  if (hecho) {
    return (
      <div className="rounded-3xl border border-verde/30 bg-verde/10 p-8 text-center">
        <p className="text-5xl">📅</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-marron">
          {t("¡Solicitud recibida!", "Request received!")}
        </h2>
        <p className="mt-2 font-sans text-marron/80">
          {t(
            `Te confirmaremos la mesa para el ${hecho.fecha} a las ${hecho.hora} lo antes posible. Si es para hoy o un grupo grande, mejor llámanos.`,
            `We'll confirm your table for ${hecho.fecha} at ${hecho.hora} as soon as possible. For today or large groups, please call us.`,
          )}
        </p>
        <a href="tel:+34958991844" className="mt-5 inline-block rounded-full bg-mostaza px-6 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc">
          📞 958 99 18 44
        </a>
      </div>
    );
  }

  const input = "mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none";

  return (
    <form onSubmit={enviar} className="rounded-3xl border border-marron/15 bg-crema/85 p-6 backdrop-blur sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">{t("Nombre", "Name")} *</span>
          <input name="nombre" required className={input} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">{t("Teléfono", "Phone")} *</span>
          <input name="telefono" type="tel" required placeholder="+34 …" className={input} />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-sans text-sm font-semibold text-marron">{t("Email (opcional)", "Email (optional)")}</span>
          <input name="email" type="email" className={input} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">{t("Fecha", "Date")} *</span>
          <input name="fecha" type="date" required min={minFecha} className={input} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">{t("Hora", "Time")} *</span>
          <select name="hora" required defaultValue="" className={input}>
            <option value="" disabled>{t("Elige una hora", "Choose a time")}</option>
            {HORAS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">{t("Personas", "People")} *</span>
          <input name="personas" type="number" min={1} max={20} defaultValue={2} required className={input} />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-sans text-sm font-semibold text-marron">{t("Observaciones (alergias, ocasión…)", "Notes (allergies, occasion…)")}</span>
          <textarea name="observaciones" rows={2} className={input} />
        </label>
      </div>

      {error && <p className="mt-3 font-sans text-sm text-terracota">{error}</p>}

      <button type="submit" disabled={enviando} className="mt-5 w-full rounded-full bg-mostaza py-3 font-sans text-lg font-bold text-marron transition-colors hover:bg-mostaza-osc disabled:opacity-60 sm:w-auto sm:px-10">
        {enviando ? t("Enviando…", "Sending…") : t("Solicitar reserva", "Request booking")}
      </button>
      <p className="mt-2 font-sans text-xs text-marron/50">
        {t("Te confirmamos por teléfono. Sin pagos online.", "We'll confirm by phone. No online payment.")}
      </p>
    </form>
  );
}
