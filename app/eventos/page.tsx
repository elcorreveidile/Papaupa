import { asc, eq } from "drizzle-orm";
import { db, eventos as eventosTable } from "@/lib/db";
import Header from "@/components/layout/Header";
import EventosLista, { type EventoPublico } from "@/components/sections/EventosLista";

export const metadata = {
  title: "Eventos · Papaupa",
  description: "Conciertos, jam sessions y actuaciones en Papaupa, Realejo (Granada).",
};

// Siempre datos frescos de la BD.
export const dynamic = "force-dynamic";

export default async function EventosPage() {
  const rows = await db
    .select()
    .from(eventosTable)
    .where(eq(eventosTable.publicado, true))
    .orderBy(asc(eventosTable.fecha));

  const eventos: EventoPublico[] = rows.map((e) => ({
    id: e.id,
    titulo: e.titulo,
    tituloEn: e.tituloEn,
    descripcion: e.descripcion,
    descripcionEn: e.descripcionEn,
    fechaISO: e.fecha.toISOString(),
    hora: e.hora,
    imagenUrl: e.imagenUrl,
    enlace: e.enlace,
  }));

  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-eventos.jpg)" } as React.CSSProperties}
    >
      <Header />
      <EventosLista eventos={eventos} />
      <footer className="bg-marron py-8 text-center text-crema/80">
        <p className="font-display text-xl italic">Papaupa · Retro Fusión Food</p>
        <p className="mt-1 font-sans text-sm">
          Calle de los Molinos 16, Granada ·{" "}
          <a
            href="https://www.instagram.com/papauparetrofusionfood/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-mostaza hover:underline"
          >
            @papauparetrofusionfood
          </a>
        </p>
      </footer>
    </div>
  );
}
