import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, mensajes } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

async function marcarLeido(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  const leido = formData.get("leido") === "true";
  if (id) {
    await db.update(mensajes).set({ leido: !leido }).where(eq(mensajes.id, id));
    revalidatePath("/admin/mensajes");
  }
}

async function eliminar(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(mensajes).where(eq(mensajes.id, id));
    revalidatePath("/admin/mensajes");
  }
}

export default async function AdminMensajes() {
  await requireSession();
  const lista = await db
    .select()
    .from(mensajes)
    .orderBy(sql`case when ${mensajes.leido} then 1 else 0 end`, sql`${mensajes.creadoEn} desc`);
  const fmt = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Mensajes</h1>
      <p className="mt-1 font-sans text-marron/60">Mensajes recibidos desde el formulario de contacto.</p>

      <div className="mt-6 space-y-3">
        {lista.length === 0 && <p className="font-sans text-marron/60">Aún no hay mensajes.</p>}
        {lista.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl border p-5 ${m.leido ? "border-marron/15 bg-white/40" : "border-mostaza/50 bg-white/70"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {!m.leido && <span className="rounded-full bg-mostaza px-2 py-0.5 text-xs font-bold text-marron">nuevo</span>}
                <span className="font-sans font-semibold text-marron">{m.nombre}</span>
                <a href={`mailto:${m.email}`} className="font-sans text-sm text-terracota hover:underline">
                  {m.email}
                </a>
              </div>
              <span className="font-sans text-xs text-marron/50">{fmt.format(m.creadoEn)}</span>
            </div>
            {m.asunto && <p className="mt-2 font-sans text-sm font-semibold text-marron/80">{m.asunto}</p>}
            <p className="mt-1 whitespace-pre-wrap font-sans text-marron/80">{m.mensaje}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.asunto || "tu mensaje a Papaupa"))}`}
                className="rounded-full bg-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc"
              >
                Responder
              </a>
              <form action={marcarLeido}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="leido" value={String(m.leido)} />
                <button className="rounded-full border border-marron/20 px-4 py-1.5 font-sans text-sm font-medium text-marron hover:border-terracota hover:text-terracota">
                  {m.leido ? "Marcar no leído" : "Marcar leído"}
                </button>
              </form>
              <form action={eliminar}>
                <input type="hidden" name="id" value={m.id} />
                <button className="rounded-full px-4 py-1.5 font-sans text-sm font-medium text-terracota hover:underline">
                  Borrar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
