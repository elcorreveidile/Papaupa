"use client";

import { useLang } from "@/lib/i18n";
import ReservaForm from "./ReservaForm";

export default function ReservasCliente() {
  const { t } = useLang();
  return (
    <main className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
        {t("Reserva tu mesa", "Book your table")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
        {t("Reservar mesa", "Book a table")}
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <ReservaForm />

        <aside className="rounded-3xl border border-marron/15 bg-crema/85 p-6 backdrop-blur">
          <h2 className="font-display text-2xl text-marron">{t("Horario", "Hours")}</h2>
          <p className="mt-2 font-sans text-marron/80">{t("Todos los días · 13:00 – 23:00", "Every day · 1 pm – 11 pm")}</p>

          <h2 className="mt-6 font-display text-2xl text-marron">{t("¿Grupo grande o evento?", "Large group or event?")}</h2>
          <p className="mt-2 font-sans text-marron/80">
            {t("Para grupos grandes u ocasiones especiales, escríbenos por WhatsApp.", "For large groups or special occasions, message us on WhatsApp.")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="tel:+34958991844" className="rounded-full bg-mostaza px-5 py-2 font-sans font-semibold text-marron hover:bg-mostaza-osc">📞 958 99 18 44</a>
            <a href="https://wa.me/34958991844" target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-verde/40 px-5 py-2 font-sans font-semibold text-verde hover:border-verde hover:bg-verde/5">💬 WhatsApp</a>
          </div>
          <p className="mt-6 font-sans text-sm text-marron/60">Calle de los Molinos 16, Realejo · Granada</p>
        </aside>
      </div>
    </main>
  );
}
