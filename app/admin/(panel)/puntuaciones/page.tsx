import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, puntuaciones } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

const JUEGOS: { id: string; nombre: string; unidad: string }[] = [
  { id: "esquiva", nombre: "¡Que no te pillen!", unidad: "s" },
  { id: "tartazo", nombre: "¡Tartazo!", unidad: " tartas" },
  { id: "besito", nombre: "¡Un besito!", unidad: " besitos" },
];

async function eliminar(formData: FormData) {
  "use server";
  await requireSession();
  const id = Number(formData.get("id"));
  if (id) {
    await db.delete(puntuaciones).where(eq(puntuaciones.id, id));
    revalidatePath("/admin/puntuaciones");
  }
}

async function vaciarJuego(formData: FormData) {
  "use server";
  await requireSession();
  const juego = String(formData.get("juego"));
  if (["esquiva", "tartazo", "besito"].includes(juego)) {
    await db.delete(puntuaciones).where(eq(puntuaciones.juego, juego));
    revalidatePath("/admin/puntuaciones");
  }
}

const MEDALLA = ["🥇", "🥈", "🥉"];

export default async function AdminPuntuaciones() {
  await requireSession();
  const filas = await db
    .select()
    .from(puntuaciones)
    .orderBy(asc(puntuaciones.juego), desc(puntuaciones.puntos), asc(puntuaciones.creadoEn));

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">Puntuaciones</h1>
      <p className="mt-1 font-sans text-marron/60">
        Ranking de los juegos del patio. Borra cualquier entrada que no proceda.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {JUEGOS.map((j) => {
          const top = filas.filter((f) => f.juego === j.id).slice(0, 3);
          return (
            <div key={j.id} className="rounded-2xl border border-marron/15 bg-white/60 p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-marron">{j.nombre}</h2>
                {top.length > 0 && (
                  <form action={vaciarJuego}>
                    <input type="hidden" name="juego" value={j.id} />
                    <button className="font-sans text-xs font-medium text-terracota hover:underline">
                      Vaciar
                    </button>
                  </form>
                )}
              </div>
              <ol className="mt-3 space-y-2">
                {top.length === 0 && (
                  <li className="font-sans text-sm text-marron/50">Sin puntuaciones.</li>
                )}
                {top.map((f, i) => (
                  <li key={f.id} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-sans text-marron">
                      <span>{MEDALLA[i]}</span>
                      <span className="font-mono font-bold tracking-widest">{f.iniciales}</span>
                      <span className="font-bold">
                        {f.puntos}
                        {j.unidad}
                      </span>
                    </span>
                    <form action={eliminar}>
                      <input type="hidden" name="id" value={f.id} />
                      <button
                        className="font-sans text-xs font-medium text-terracota hover:underline"
                        aria-label="Borrar"
                      >
                        ✕
                      </button>
                    </form>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
