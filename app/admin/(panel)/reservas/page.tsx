import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, reservas } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

async function cambiarEstado(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  const estado = String(formData.get("estado"));
  if (id && ["confirmada", "cancelada", "pendiente"].includes(estado)) {
    await db.update(reservas).set({ estado }).where(eq(reservas.id, id));
    revalidatePath("/admin/reservas");
  }
}

async function eliminar(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(reservas).where(eq(reservas.id, id));
    revalidatePath("/admin/reservas");
  }
}

const BADGE: Record<string, string> = {
  pendiente: "bg-mostaza/40 text-marron",
  confirmada: "bg-verde/20 text-verde",
  cancelada: "bg-marron/10 text-marron/50",
};

export default async function AdminReservas() {
  await requireSession();
  const lista = await db
    .select()
    .from(reservas)
    .orderBy(
      sql`case when ${reservas.estado} = 'pendiente' then 0 else 1 end`,
      sql`${reservas.fecha} asc`,
      sql`${reservas.hora} asc`,
    );

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Reservas</h1>
      <p className="mt-1 font-sans text-marron/60">Confirma o cancela las solicitudes de mesa.</p>

      <div className="mt-6 space-y-3">
        {lista.length === 0 && <p className="font-sans text-marron/60">Aún no hay reservas.</p>}
        {lista.map((r) => (
          <div key={r.id} className="rounded-2xl border border-marron/15 bg-white/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-display text-lg font-semibold text-marron">
                  {r.fecha} · {r.hora}
                </span>
                <span className="font-sans text-marron/80">· {r.personas} pax</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${BADGE[r.estado] ?? ""}`}>{r.estado}</span>
              </div>
              <div className="font-sans text-sm text-marron/70">
                {r.nombre} · <a href={`tel:${r.telefono}`} className="text-terracota hover:underline">{r.telefono}</a>
                {r.email ? ` · ${r.email}` : ""}
              </div>
            </div>
            {r.observaciones && <p className="mt-2 font-sans text-sm text-marron/70">“{r.observaciones}”</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {r.estado !== "confirmada" && (
                <form action={cambiarEstado}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="estado" value="confirmada" />
                  <button className="rounded-full bg-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc">Confirmar</button>
                </form>
              )}
              {r.estado !== "cancelada" && (
                <form action={cambiarEstado}>
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="estado" value="cancelada" />
                  <button className="rounded-full border border-marron/20 px-4 py-1.5 font-sans text-sm font-medium text-marron hover:border-terracota hover:text-terracota">Cancelar</button>
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
