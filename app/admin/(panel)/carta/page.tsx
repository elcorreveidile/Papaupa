import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, menuCategorias, menuPlatos } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";
import FotoPlato from "@/components/admin/FotoPlato";

export const dynamic = "force-dynamic";

function revalida() {
  revalidatePath("/admin/carta");
  revalidatePath("/menu");
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function guardarPlato(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (!id) return;
  const precio = Number(formData.get("precio"));
  await db
    .update(menuPlatos)
    .set({
      nombre: String(formData.get("nombre") || "").trim(),
      nombreEn: String(formData.get("nombreEn") || "").trim(),
      descripcion: String(formData.get("descripcion") || "").trim() || null,
      descripcionEn: String(formData.get("descripcionEn") || "").trim() || null,
      precio: String(isFinite(precio) && precio >= 0 ? precio : 0),
      disponible: formData.get("disponible") === "on",
      orden: Number(formData.get("orden")) || 0,
    })
    .where(eq(menuPlatos.id, id));
  revalida();
}

async function crearPlato(formData: FormData) {
  "use server";
  await requireSession();
  const categoriaId = Number(formData.get("categoriaId"));
  const nombre = String(formData.get("nombre") || "").trim();
  if (!categoriaId || !nombre) return;
  const precio = Number(formData.get("precio"));
  await db.insert(menuPlatos).values({
    categoriaId,
    nombre,
    nombreEn: String(formData.get("nombreEn") || "").trim() || nombre,
    precio: String(isFinite(precio) && precio >= 0 ? precio : 0),
    orden: 999,
  });
  revalida();
}

async function eliminarPlato(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(menuPlatos).where(eq(menuPlatos.id, id));
    revalida();
  }
}

async function guardarCategoria(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (!id) return;
  await db
    .update(menuCategorias)
    .set({
      titulo: String(formData.get("titulo") || "").trim(),
      tituloEn: String(formData.get("tituloEn") || "").trim(),
      emoji: String(formData.get("emoji") || "").trim().slice(0, 8),
      takeaway: formData.get("takeaway") === "on",
      visible: formData.get("visible") === "on",
      orden: Number(formData.get("orden")) || 0,
    })
    .where(eq(menuCategorias.id, id));
  revalida();
}

async function crearCategoria(formData: FormData) {
  "use server";
  await requireSession();
  const titulo = String(formData.get("titulo") || "").trim();
  if (!titulo) return;
  const slug = slugify(titulo) || `cat-${Date.now()}`;
  await db.insert(menuCategorias).values({
    slug,
    titulo,
    tituloEn: String(formData.get("tituloEn") || "").trim() || titulo,
    emoji: String(formData.get("emoji") || "").trim().slice(0, 8),
    orden: 999,
  });
  revalida();
}

async function eliminarCategoria(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(menuCategorias).where(eq(menuCategorias.id, id));
    revalida();
  }
}

const inp =
  "w-full rounded-lg border border-marron/20 px-2 py-1.5 font-sans text-sm focus:border-mostaza focus:outline-none";

export default async function AdminCarta() {
  await requireSession();
  const cats = await db
    .select()
    .from(menuCategorias)
    .orderBy(asc(menuCategorias.orden), asc(menuCategorias.id));
  const platos = await db
    .select()
    .from(menuPlatos)
    .orderBy(asc(menuPlatos.orden), asc(menuPlatos.id));

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Carta</h1>
      <p className="mt-1 font-sans text-marron/60">
        Edita platos, precios, descripciones y fotos. Los cambios se ven al momento en la web.
      </p>

      {cats.map((c) => {
        const suyos = platos.filter((p) => p.categoriaId === c.id);
        return (
          <section key={c.id} className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-marron/15 pb-2">
              <h2 className="font-display text-2xl font-semibold text-marron">
                {c.emoji} {c.titulo}
                {!c.visible && (
                  <span className="ml-2 rounded-full bg-marron/10 px-2 py-0.5 text-xs text-marron/60">oculta</span>
                )}
              </h2>
              <details className="text-sm">
                <summary className="cursor-pointer font-sans font-medium text-marron/60 hover:text-terracota">
                  ⚙ Categoría
                </summary>
                <form action={guardarCategoria} className="mt-2 grid gap-2 rounded-xl bg-white/60 p-3 sm:grid-cols-2">
                  <input type="hidden" name="id" value={c.id} />
                  <label className="block">
                    <span className="font-sans text-xs text-marron/60">Título</span>
                    <input name="titulo" defaultValue={c.titulo} className={inp} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-xs text-marron/60">Título (EN)</span>
                    <input name="tituloEn" defaultValue={c.tituloEn} className={inp} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-xs text-marron/60">Emoji</span>
                    <input name="emoji" defaultValue={c.emoji} className={inp} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-xs text-marron/60">Orden</span>
                    <input type="number" name="orden" defaultValue={c.orden} className={inp} />
                  </label>
                  <label className="flex items-center gap-2 font-sans text-sm text-marron">
                    <input type="checkbox" name="takeaway" defaultChecked={c.takeaway} className="h-4 w-4" /> Take away
                  </label>
                  <label className="flex items-center gap-2 font-sans text-sm text-marron">
                    <input type="checkbox" name="visible" defaultChecked={c.visible} className="h-4 w-4" /> Visible
                  </label>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <button className="rounded-full bg-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc">
                      Guardar categoría
                    </button>
                  </div>
                </form>
                <form action={eliminarCategoria} className="mt-2">
                  <input type="hidden" name="id" value={c.id} />
                  <button className="font-sans text-xs font-medium text-terracota hover:underline">
                    Borrar categoría y sus platos
                  </button>
                </form>
              </details>
            </div>

            <div className="mt-3 space-y-3">
              {suyos.map((p) => (
                <form
                  key={p.id}
                  action={guardarPlato}
                  className="rounded-2xl border border-marron/15 bg-white/60 p-4"
                >
                  <input type="hidden" name="id" value={p.id} />
                  <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <label className="block">
                      <span className="font-sans text-xs text-marron/60">Nombre</span>
                      <input name="nombre" defaultValue={p.nombre} className={inp} />
                    </label>
                    <label className="block">
                      <span className="font-sans text-xs text-marron/60">Nombre (EN)</span>
                      <input name="nombreEn" defaultValue={p.nombreEn} className={inp} />
                    </label>
                    <label className="block">
                      <span className="font-sans text-xs text-marron/60">Precio €</span>
                      <input type="number" step="0.1" name="precio" defaultValue={Number(p.precio)} className={`${inp} w-24`} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="font-sans text-xs text-marron/60">Descripción</span>
                      <input name="descripcion" defaultValue={p.descripcion ?? ""} className={inp} />
                    </label>
                    <label className="block sm:col-span-1">
                      <span className="font-sans text-xs text-marron/60">Orden</span>
                      <input type="number" name="orden" defaultValue={p.orden} className={`${inp} w-24`} />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="font-sans text-xs text-marron/60">Descripción (EN)</span>
                      <input name="descripcionEn" defaultValue={p.descripcionEn ?? ""} className={inp} />
                    </label>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <FotoPlato id={p.id} foto={p.fotoUrl} />
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 font-sans text-sm text-marron">
                        <input type="checkbox" name="disponible" defaultChecked={p.disponible} className="h-4 w-4" />
                        Disponible
                      </label>
                      <button className="rounded-full bg-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc">
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              ))}

              {/* Añadir plato */}
              <form action={crearPlato} className="flex flex-wrap items-end gap-2 rounded-2xl border border-dashed border-marron/25 p-3">
                <input type="hidden" name="categoriaId" value={c.id} />
                <label className="flex-1">
                  <span className="font-sans text-xs text-marron/60">Nuevo plato</span>
                  <input name="nombre" placeholder="Nombre" className={inp} />
                </label>
                <input name="nombreEn" placeholder="Name (EN)" className={`${inp} flex-1`} />
                <input type="number" step="0.1" name="precio" placeholder="€" className={`${inp} w-20`} />
                <button className="rounded-full border-2 border-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza">
                  + Añadir
                </button>
              </form>
            </div>
          </section>
        );
      })}

      {/* Añadir categoría */}
      <form action={crearCategoria} className="mt-10 flex flex-wrap items-end gap-2 rounded-2xl border border-dashed border-marron/25 p-4">
        <label>
          <span className="font-sans text-xs text-marron/60">Nueva categoría</span>
          <input name="titulo" placeholder="Título" className={inp} />
        </label>
        <input name="tituloEn" placeholder="Title (EN)" className={inp} />
        <input name="emoji" placeholder="🍴" className={`${inp} w-16`} />
        <button className="rounded-full bg-mostaza px-5 py-1.5 font-sans text-sm font-bold text-marron hover:bg-mostaza-osc">
          + Crear categoría
        </button>
      </form>
    </div>
  );
}
