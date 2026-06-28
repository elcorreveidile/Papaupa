import { desc, eq } from "drizzle-orm";
import { db, resenas as resenasTable } from "@/lib/db";
import Header from "@/components/layout/Header";
import VisitasCliente, { type ResenaPublica } from "@/components/sections/VisitasCliente";

export const metadata = {
  title: "Libro de visitas · Papaupa",
  description: "Reseñas de quienes han comido en Papaupa, Realejo (Granada). Deja la tuya.",
};

export const dynamic = "force-dynamic";

export default async function VisitasPage() {
  const rows = await db
    .select()
    .from(resenasTable)
    .where(eq(resenasTable.estado, "aprobada"))
    .orderBy(desc(resenasTable.creadoEn));

  const resenas: ResenaPublica[] = rows.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    rating: r.rating,
    comentario: r.comentario,
    fotoUrl: r.fotoUrl,
    creadoISO: r.creadoEn.toISOString(),
  }));

  return (
    <div className="corcho min-h-svh">
      <Header />
      <VisitasCliente resenas={resenas} />
      <footer className="bg-marron py-8 text-center text-crema/80">
        <p className="font-display text-xl italic">Papaupa · Retro Fusión Food</p>
        <p className="mt-1 font-sans text-sm">
          Calle de los Molinos 16, Granada ·{" "}
          <a href="https://www.instagram.com/papauparetrofusionfood/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-mostaza hover:underline">
            @papauparetrofusionfood
          </a>
        </p>
      </footer>
    </div>
  );
}
