import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, resenas } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

async function moderar(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  const estado = String(formData.get("estado"));
  if (id && ["aprobada", "rechazada", "pendiente"].includes(estado)) {
    await db.update(resenas).set({ estado }).where(eq(resenas.id, id));
    revalidatePath("/admin/visitas");
    revalidatePath("/visitas");
  }
}

async function eliminar(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(resenas).where(eq(resenas.id, id));
    revalidatePath("/admin/visitas");
    revalidatePath("/visitas");
  }
}

const BADGE: Record<string, string> = {
  pendiente: "bg-mostaza/40 text-marron",
  aprobada: "bg-verde/20 text-verde",
  rechazada: "bg-marron/10 text-marron/50",
};

export default async function AdminVisitas() {
  await requireSession();
  // Pendientes primero, luego por fecha.
  const lista = await db
    .select()
    .from(resenas)
    .orderBy(sql`case when ${resenas.estado} = 'pendiente' then 0 else 1 end`, sql`${resenas.creadoEn} desc`);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Reseñas</h1>
      <p className="mt-1 font-sans text-marron/60">
        Aprueba las que quieras publicar en el libro de visitas.
      </p>

      <div className="mt-6 space-y-3">
        {lista.length === 0 && <p className="font-sans text-marron/60">Aún no hay reseñas.</p>}
        {lista.map((r) => (
          <div key={r.id} className="rounded-2xl border border-marron/15 bg-white/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-sans font-semibold text-marron">{r.nombre}</span>
                <span className="text-mostaza-osc">{"★".repeat(r.rating)}<span className="text-marron/20">{"★".repeat(5 - r.rating)}</span></span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${BADGE[r.estado] ?? ""}`}>{r.estado}</span>
              </div>
              <span className="font-sans text-xs text-marron/40">{r.email}</span>
            </div>
            <p className="mt-2 font-sans text-marron/80">“{r.comentario}”</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.estado !== "aprobada" && (
                <form action={moderar}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="estado" value="aprobada" />
                  <button className="rounded-full bg-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc">Aprobar</button>
                </form>
              )}
              {r.estado !== "rechazada" && (
                <form action={moderar}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="estado" value="rechazada" />
                  <button className="rounded-full border border-marron/20 px-4 py-1.5 font-sans text-sm font-medium text-marron hover:border-terracota hover:text-terracota">Rechazar</button>
                </form>
              )}
              <form action={eliminar}>
                <input type="hidden" name="id" value={r.id} />
                <button className="rounded-full px-4 py-1.5 font-sans text-sm font-medium text-terracota hover:underline">Borrar</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
