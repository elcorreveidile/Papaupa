import { asc, eq } from "drizzle-orm";
import { db, menuCategorias, menuPlatos } from "@/lib/db";
import type { Categoria } from "@/lib/menu";

/**
 * Carta desde la base de datos (lo que se edita en /admin/carta).
 * `soloVisible` filtra categorías ocultas y platos no disponibles (uso público).
 */
export async function getCarta(soloVisible = true): Promise<Categoria[]> {
  const cats = await db
    .select()
    .from(menuCategorias)
    .orderBy(asc(menuCategorias.orden), asc(menuCategorias.id));
  const platos = await db
    .select()
    .from(menuPlatos)
    .orderBy(asc(menuPlatos.orden), asc(menuPlatos.id));

  return cats
    .filter((c) => !soloVisible || c.visible)
    .map((c) => ({
      id: c.slug,
      titulo: c.titulo,
      tituloEn: c.tituloEn,
      emoji: c.emoji,
      takeaway: c.takeaway,
      platos: platos
        .filter((p) => p.categoriaId === c.id && (!soloVisible || p.disponible))
        .map((p) => ({
          id: String(p.id),
          nombre: p.nombre,
          nombreEn: p.nombreEn,
          desc: p.descripcion || undefined,
          descEn: p.descripcionEn || undefined,
          precio: Number(p.precio),
          foto: p.fotoUrl || undefined,
        })),
    }));
}
