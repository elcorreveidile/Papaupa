import { asc, desc, eq } from "drizzle-orm";
import { db, galeria } from "@/lib/db";
import Header from "@/components/layout/Header";
import Galeria, { type Foto } from "@/components/sections/Galeria";

export const metadata = {
  title: "Galería · Papaupa",
  description:
    "Fotos de Papaupa Retro Fusión Food: cocina colombiano-mediterránea en el Realejo, Granada.",
};

// Siempre datos frescos de la BD.
export const dynamic = "force-dynamic";

export default async function GaleriaPage() {
  const rows = await db
    .select()
    .from(galeria)
    .where(eq(galeria.visible, true))
    .orderBy(asc(galeria.orden), desc(galeria.creadoEn));

  const fotos: Foto[] = rows.map((f) => ({
    id: f.id,
    url: f.url,
    titulo: f.titulo,
    tituloEn: f.tituloEn,
  }));

  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-galeria.jpg)" } as React.CSSProperties}
    >
      <Header />
      <Galeria fotos={fotos} />
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
