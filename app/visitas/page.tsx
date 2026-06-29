import { desc, eq } from "drizzle-orm";
import { db, resenas as resenasTable } from "@/lib/db";
import Header from "@/components/layout/Header";
import VisitasCliente, { type ResenaPublica } from "@/components/sections/VisitasCliente";
import SiteFooter from "@/components/layout/SiteFooter";

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
      <SiteFooter />
    </div>
  );
}
