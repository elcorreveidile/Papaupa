"use client";

import { useLang } from "@/lib/i18n";

export type EventoPublico = {
  id: number;
  titulo: string;
  tituloEn: string | null;
  descripcion: string;
  descripcionEn: string | null;
  fechaISO: string;
  hora: string | null;
  imagenUrl: string | null;
  enlace: string | null;
};

export default function EventosLista({ eventos }: { eventos: EventoPublico[] }) {
  const { lang, t } = useLang();
  const fmt = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
        {t("Agenda", "What's on")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
        {t("Eventos y actuaciones", "Events & live music")}
      </h1>

      {eventos.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-marron/15 bg-crema/85 p-10 text-center backdrop-blur">
          <p className="text-4xl">🎸</p>
          <p className="mt-3 font-sans text-marron/70">
            {t("No hay eventos próximos por ahora. ¡Vuelve pronto!", "No upcoming events right now. Check back soon!")}
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {eventos.map((e) => {
            const titulo = lang === "en" && e.tituloEn ? e.tituloEn : e.titulo;
            const desc = lang === "en" && e.descripcionEn ? e.descripcionEn : e.descripcion;
            return (
              <article
                key={e.id}
                className="overflow-hidden rounded-3xl border border-marron/15 bg-crema/90 shadow-lg backdrop-blur"
              >
                <div className="rainbow-rule h-1 w-full opacity-70" />
                {e.imagenUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.imagenUrl} alt={titulo} className="h-44 w-full object-cover" />
                )}
                <div className="p-6">
                  <p className="font-sans text-sm font-semibold uppercase tracking-wide text-terracota">
                    {fmt.format(new Date(e.fechaISO))}
                    {e.hora ? ` · ${e.hora}` : ""}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-marron">{titulo}</h2>
                  <p className="mt-2 font-sans text-marron/75">{desc}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={e.enlace || "https://wa.me/34958991844"}
                      target={e.enlace ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="rounded-full bg-mostaza px-6 py-2.5 font-sans font-bold text-marron transition-colors hover:bg-mostaza-osc"
                    >
                      {t("Reservar mesa", "Book a table")}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
