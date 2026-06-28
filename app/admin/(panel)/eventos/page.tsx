import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, eventos } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

async function crearEvento(formData: FormData) {
  "use server";
  await requireSession();
  const titulo = String(formData.get("titulo") || "").trim();
  const descripcion = String(formData.get("descripcion") || "").trim();
  const fechaStr = String(formData.get("fecha") || "");
  const hora = String(formData.get("hora") || "").trim();
  if (!titulo || !descripcion || !fechaStr) return;

  await db.insert(eventos).values({
    titulo,
    tituloEn: String(formData.get("tituloEn") || "").trim() || null,
    descripcion,
    descripcionEn: String(formData.get("descripcionEn") || "").trim() || null,
    fecha: new Date(`${fechaStr}T${hora || "20:00"}:00`),
    hora: hora || null,
    enlace: String(formData.get("enlace") || "").trim() || null,
    publicado: formData.get("publicado") === "on",
  });
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
}

async function eliminarEvento(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(eventos).where(eq(eventos.id, id));
    revalidatePath("/admin/eventos");
    revalidatePath("/eventos");
  }
}

async function togglePublicado(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  const publicado = formData.get("publicado") === "true";
  if (id) {
    await db.update(eventos).set({ publicado: !publicado }).where(eq(eventos.id, id));
    revalidatePath("/admin/eventos");
    revalidatePath("/eventos");
  }
}

export default async function AdminEventos() {
  await requireSession();
  const lista = await db.select().from(eventos).orderBy(desc(eventos.fecha));
  const fmt = new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  const inputCls =
    "mt-1 w-full rounded-xl border-2 border-marron/20 px-3 py-2 focus:border-mostaza focus:outline-none";

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Eventos</h1>

      {/* Crear */}
      <form
        action={crearEvento}
        className="mt-6 grid gap-4 rounded-3xl border border-marron/15 bg-white/60 p-6 sm:grid-cols-2"
      >
        <label className="block sm:col-span-2">
          <span className="font-sans text-sm font-semibold text-marron">Título *</span>
          <input name="titulo" required className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Título (EN)</span>
          <input name="tituloEn" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Enlace (opcional)</span>
          <input name="enlace" placeholder="https://…" className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-sans text-sm font-semibold text-marron">Descripción *</span>
          <textarea name="descripcion" required rows={2} className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-sans text-sm font-semibold text-marron">Descripción (EN)</span>
          <textarea name="descripcionEn" rows={2} className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Fecha *</span>
          <input type="date" name="fecha" required className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Hora</span>
          <input name="hora" placeholder="21:00" className={inputCls} />
        </label>
        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" name="publicado" defaultChecked className="h-4 w-4" />
          <span className="font-sans text-sm text-marron">Publicado (visible en la web)</span>
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-mostaza px-7 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc"
          >
            Crear evento
          </button>
        </div>
      </form>

      {/* Listado */}
      <div className="mt-8 space-y-3">
        {lista.length === 0 && <p className="font-sans text-marron/60">Aún no hay eventos.</p>}
        {lista.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-marron/15 bg-white/60 px-5 py-3"
          >
            <div>
              <p className="font-sans font-semibold text-marron">
                {e.titulo}
                {!e.publicado && (
                  <span className="ml-2 rounded-full bg-marron/10 px-2 py-0.5 text-xs text-marron/60">oculto</span>
                )}
              </p>
              <p className="font-sans text-sm text-marron/60">
                {fmt.format(e.fecha)} {e.hora ? `· ${e.hora}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <form action={togglePublicado}>
                <input type="hidden" name="id" value={e.id} />
                <input type="hidden" name="publicado" value={String(e.publicado)} />
                <button className="rounded-full border border-marron/20 px-4 py-1.5 font-sans text-sm font-medium text-marron hover:border-terracota hover:text-terracota">
                  {e.publicado ? "Ocultar" : "Publicar"}
                </button>
              </form>
              <form action={eliminarEvento}>
                <input type="hidden" name="id" value={e.id} />
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
