import { asc, eq } from "drizzle-orm";
import { db, eventos as eventosTable } from "@/lib/db";
import Header from "@/components/layout/Header";
import EventosLista, { type EventoPublico } from "@/components/sections/EventosLista";
import SiteFooter from "@/components/layout/SiteFooter";

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
      <SiteFooter />
    </div>
  );
}
