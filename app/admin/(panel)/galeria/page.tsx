import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, galeria } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

function revalida() {
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}

async function crearFoto(formData: FormData) {
  "use server";
  await requireSession();
  const url = String(formData.get("url") || "").trim();
  if (!url) return;
  await db.insert(galeria).values({
    url,
    titulo: String(formData.get("titulo") || "").trim() || null,
    tituloEn: String(formData.get("tituloEn") || "").trim() || null,
    orden: Number(formData.get("orden")) || 0,
    visible: formData.get("visible") === "on",
  });
  revalida();
}

async function eliminarFoto(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(galeria).where(eq(galeria.id, id));
    revalida();
  }
}

async function toggleVisible(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  const visible = formData.get("visible") === "true";
  if (id) {
    await db.update(galeria).set({ visible: !visible }).where(eq(galeria.id, id));
    revalida();
  }
}

export default async function AdminGaleria() {
  await requireSession();
  const lista = await db
    .select()
    .from(galeria)
    .orderBy(asc(galeria.orden), desc(galeria.creadoEn));
  const inputCls =
    "mt-1 w-full rounded-xl border-2 border-marron/20 px-3 py-2 focus:border-mostaza focus:outline-none";

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Galería</h1>
      <p className="mt-1 font-sans text-marron/60">
        Pega la URL de una foto (puede ser <code>/images/archivo.jpg</code> del propio sitio o un
        enlace externo). Las de menor número de orden salen primero.
      </p>

      {/* Crear */}
      <form
        action={crearFoto}
        className="mt-6 grid gap-4 rounded-3xl border border-marron/15 bg-white/60 p-6 sm:grid-cols-2"
      >
        <label className="block sm:col-span-2">
          <span className="font-sans text-sm font-semibold text-marron">URL de la foto *</span>
          <input name="url" required placeholder="/images/… o https://…" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Pie de foto (ES)</span>
          <input name="titulo" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Pie de foto (EN)</span>
          <input name="tituloEn" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-sans text-sm font-semibold text-marron">Orden</span>
          <input type="number" name="orden" defaultValue={0} className={inputCls} />
        </label>
        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" name="visible" defaultChecked className="h-4 w-4" />
          <span className="font-sans text-sm text-marron">Visible en la web</span>
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-mostaza px-7 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc"
          >
            Añadir foto
          </button>
        </div>
      </form>

      {/* Listado */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lista.length === 0 && <p className="font-sans text-marron/60">Aún no hay fotos.</p>}
        {lista.map((f) => (
          <div key={f.id} className="overflow-hidden rounded-2xl border border-marron/15 bg-white/60">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.url} alt={f.titulo || "foto"} className="h-40 w-full object-cover" />
              {!f.visible && (
                <span className="absolute left-2 top-2 rounded-full bg-marron/80 px-2 py-0.5 text-xs font-semibold text-crema">
                  oculta
                </span>
              )}
              <span className="absolute right-2 top-2 rounded-full bg-crema/90 px-2 py-0.5 text-xs font-semibold text-marron/70">
                #{f.orden}
              </span>
            </div>
            <div className="p-3">
              <p className="font-sans text-sm text-marron/80">{f.titulo || <em className="text-marron/40">sin pie</em>}</p>
              <div className="mt-2 flex items-center gap-2">
                <form action={toggleVisible}>
                  <input type="hidden" name="id" value={f.id} />
                  <input type="hidden" name="visible" value={String(f.visible)} />
                  <button className="rounded-full border border-marron/20 px-3 py-1 font-sans text-xs font-medium text-marron hover:border-terracota hover:text-terracota">
                    {f.visible ? "Ocultar" : "Mostrar"}
                  </button>
                </form>
                <form action={eliminarFoto}>
                  <input type="hidden" name="id" value={f.id} />
                  <button className="rounded-full px-3 py-1 font-sans text-xs font-medium text-terracota hover:underline">
                    Borrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
