"use client";

import Link from "next/link";
import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";
import { useLang } from "@/lib/i18n";

type Perfil = {
  nombre: string;
  rolEs: string;
  rolEn: string;
  bioEs: string;
  bioEn: string;
  mascota: "patacon" | "patacona";
  fondo: string; // color del círculo (cuando no hay foto)
  foto?: string; // foto real; si existe, sustituye a la mascota
};

const PERFILES: Perfil[] = [
  {
    nombre: "Paco",
    rolEs: "El anfitrión",
    rolEn: "The host",
    bioEs: "Paco es el alma de la casa: el que te recibe en la puerta, te busca sitio y se asegura de que salgas más contento de como entraste. Aquí cada plato se sirve con su cariño y el de todo el equipo, sin prisa y con la puerta siempre abierta.",
    bioEn: "Paco is the soul of the house: the one who greets you at the door, finds you a table and makes sure you leave happier than you came in. Every dish is served with his care and the whole team's — no rush, and the door always open.",
    mascota: "patacon",
    fondo: "#f7d77a",
  },
  {
    nombre: "Margarita",
    rolEs: "La cocinera",
    rolEn: "The cook",
    bioEs: "Margarita trae a Granada los sabores de Colombia. Cocina como en casa, respetando los tiempos naturales y el producto, y los funde con el Mediterráneo en cada arepa, patacón y ceviche. Lo que llega a la mesa es comida hecha con tiempo y con alma.",
    bioEn: "Margarita brings the flavours of Colombia to Granada. She cooks the way you would at home, respecting natural rhythms and good produce, blending them with the Mediterranean in every arepa, patacón and ceviche. What reaches your table is food made with time and soul.",
    mascota: "patacona",
    fondo: "#f3b6a6",
    foto: "/images/margarita.jpg",
  },
];

export default function Nosotros() {
  const { lang, t } = useLang();

  return (
    <main className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-terracota">
        {t("Quiénes somos", "Who we are")}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
        {t("Nosotros", "About us")}
      </h1>
      <div className="rainbow-rule mt-5 h-1 w-40 rounded-full" />

      <p className="mt-6 max-w-2xl font-display text-xl font-medium italic text-marron sm:text-2xl">
        {t(
          "Papaupa es más que un restaurante: es la casa de Paco y Margarita en pleno Realejo.",
          "Papaupa is more than a restaurant: it's Paco and Margarita's home in the heart of the Realejo.",
        )}
      </p>
      <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-marron/80">
        {t(
          "Una cocina colombiano-mediterránea, casera y sin prisa, donde el sabor auténtico de Colombia se encuentra con el Mediterráneo y donde, de verdad, te sientes como en casa.",
          "A Colombian-Mediterranean kitchen, homemade and unhurried, where the authentic flavours of Colombia meet the Mediterranean — and where you genuinely feel at home.",
        )}
      </p>

      {/* Perfiles */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {PERFILES.map((p) => (
          <article
            key={p.nombre}
            className="flex flex-col items-center rounded-3xl border border-marron/15 bg-crema/90 p-8 text-center shadow-sm backdrop-blur"
          >
            {p.foto ? (
              <div className="h-40 w-40 overflow-hidden rounded-full ring-4 ring-mostaza/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.foto} alt={p.nombre} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div
                className="flex h-40 w-40 items-center justify-center rounded-full"
                style={{ backgroundColor: p.fondo }}
              >
                {p.mascota === "patacon" ? <DonPatacon size={120} /> : <DonaPatacona size={120} />}
              </div>
            )}
            <h2 className="mt-5 font-display text-3xl font-semibold italic text-marron">{p.nombre}</h2>
            <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-terracota">
              {lang === "en" ? p.rolEn : p.rolEs}
            </p>
            <p className="mt-4 font-sans leading-relaxed text-marron/80">
              {lang === "en" ? p.bioEn : p.bioEs}
            </p>
          </article>
        ))}
      </div>

      {/* Cierre + CTA */}
      <div className="mt-12 rounded-3xl border border-marron/15 bg-marron/5 p-8 text-center backdrop-blur">
        <p className="font-display text-2xl italic text-marron">
          {t("Te esperamos en la mesa.", "We'll be waiting for you at the table.")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/reservas"
            className="rounded-full bg-mostaza px-7 py-3 font-sans font-bold text-marron shadow-sm transition-transform hover:scale-105"
          >
            {t("Reservar mesa", "Book a table")}
          </Link>
          <Link
            href="/menu"
            className="rounded-full border-2 border-marron/30 px-7 py-3 font-sans font-semibold text-marron transition-colors hover:border-terracota hover:text-terracota"
          >
            {t("Ver el menú", "See the menu")}
          </Link>
        </div>
      </div>
    </main>
  );
}
