"use client";

import { useState } from "react";
import LogoMark from "@/components/layout/LogoMark";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [canal, setCanal] = useState<"email" | "sms">("email");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devUrl, setDevUrl] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, canal }),
      });
      const d = await r.json().catch(() => ({}));
      setDevUrl(d.devUrl || null);
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-crema px-5">
      <div className="w-full max-w-sm rounded-3xl border border-marron/15 bg-white/70 p-8 shadow-lg backdrop-blur">
        <div className="flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-3 font-display text-2xl font-semibold text-marron">Panel de Papaupa</h1>
          <p className="mt-1 font-sans text-sm text-marron/60">Acceso solo para el equipo</p>
        </div>

        {sent ? (
          <div className="mt-6 text-center">
            <p className="text-4xl">📬</p>
            <p className="mt-3 font-sans text-marron/80">
              Si ese correo está dado de alta, te hemos enviado un enlace de acceso. Caduca en 15 minutos.
            </p>
            {devUrl && (
              <a
                href={devUrl}
                className="mt-5 inline-block rounded-full bg-mostaza px-6 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc"
              >
                Entrar (enlace de desarrollo) →
              </a>
            )}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 block w-full font-sans text-sm text-marron/60 hover:text-terracota"
            >
              Probar con otro email
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="font-sans text-sm font-semibold text-marron">Tu email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none"
              />
            </label>
            <div className="flex gap-2">
              {(["email", "sms"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCanal(c)}
                  className={`flex-1 rounded-full px-4 py-2 font-sans text-sm font-bold transition-colors ${
                    canal === c ? "bg-marron text-crema" : "bg-crema-oscura/60 text-marron hover:bg-crema-oscura"
                  }`}
                >
                  {c === "email" ? "📧 Email" : "📱 SMS"}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-mostaza py-3 font-sans text-lg font-bold text-marron transition-colors hover:bg-mostaza-osc disabled:opacity-60"
            >
              {loading ? "Enviando…" : canal === "sms" ? "Enviarme el enlace por SMS" : "Enviarme el enlace por email"}
            </button>
            <p className="text-center font-sans text-xs text-marron/50">
              Enlace mágico, sin contraseñas.{" "}
              {canal === "sms" ? "Lo enviamos al móvil registrado de ese usuario." : "Lo enviamos a tu correo."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
