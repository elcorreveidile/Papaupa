"use client";

import { useLang } from "@/lib/i18n";
import ContactoForm from "./ContactoForm";

const MAPS_EMBED =
  "https://www.google.com/maps?q=Papaupa,+Calle+de+los+Molinos+16,+18009+Granada&output=embed";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Papaupa+Calle+de+los+Molinos+16+Granada";

export default function Contacto() {
  const { t } = useLang();
  return (
    <section id="contacto" className="scroll-mt-24 border-t border-marron/10 bg-crema-oscura/30 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">{t("¿Dónde estamos?", "Where are we?")}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-marron sm:text-5xl">
          {t("En el corazón del Realejo", "In the heart of the Realejo")}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-marron/15 shadow-lg">
            <iframe
              title={t("Mapa de Papaupa", "Map of Papaupa")}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full md:h-full"
              style={{ border: 0, minHeight: "20rem" }}
            />
          </div>

          <div className="flex flex-col gap-7">
            <div>
              <h3 className="font-display text-2xl text-marron">{t("Dirección", "Address")}</h3>
              <p className="mt-2 font-sans text-marron/80">
                Calle de los Molinos, 16
                <br />
                18009 Granada · {t("Barrio del Realejo", "Realejo neighbourhood")}
              </p>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-sans text-sm font-semibold text-terracota underline-offset-4 hover:underline">
                {t("Cómo llegar", "Get directions")} →
              </a>
            </div>

            <div>
              <h3 className="font-display text-2xl text-marron">{t("Horario", "Opening hours")}</h3>
              <p className="mt-2 font-sans text-marron/80">{t("Todos los días · 13:00 – 23:00", "Every day · 1 pm – 11 pm")}</p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-marron">{t("Reserva y pedidos", "Bookings & orders")}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="tel:+34958991844" className="rounded-full bg-mostaza px-6 py-3 font-sans font-semibold text-marron shadow-sm transition-all hover:bg-mostaza-osc hover:shadow-md">
                  📞 958 99 18 44
                </a>
                <a href="https://wa.me/34958991844" target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-verde/40 px-6 py-3 font-sans font-semibold text-verde transition-colors hover:border-verde hover:bg-verde/5">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl text-marron">{t("Síguenos", "Follow us")}</h3>
              <a href="https://www.instagram.com/papauparetrofusionfood/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 font-sans font-semibold text-marron transition-colors hover:text-terracota">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
                </svg>
                @papauparetrofusionfood
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ContactoForm />
        </div>
      </div>
    </section>
  );
}
