import { NextResponse } from "next/server";
import { and, asc, desc, eq } from "drizzle-orm";
import { db, puntuaciones } from "@/lib/db";
import { puntuacionSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JUEGOS = ["esquiva", "tartazo", "besito"] as const;

/** Top 3 de un juego (o de todos si no se indica `juego`). */
async function top3(juego: string) {
  return db
    .select({ iniciales: puntuaciones.iniciales, puntos: puntuaciones.puntos })
    .from(puntuaciones)
    .where(eq(puntuaciones.juego, juego))
    .orderBy(desc(puntuaciones.puntos), asc(puntuaciones.creadoEn))
    .limit(3);
}

export async function GET(req: Request) {
  const juego = new URL(req.url).searchParams.get("juego") || "";
  if (JUEGOS.includes(juego as (typeof JUEGOS)[number])) {
    return NextResponse.json({ top: await top3(juego) });
  }
  // Sin juego: devuelve el top 3 de cada uno.
  const todos: Record<string, unknown> = {};
  for (const j of JUEGOS) todos[j] = await top3(j);
  return NextResponse.json({ juegos: todos });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = puntuacionSchema.safeParse({ ...body, puntos: Number(body.puntos) });
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  }

  // Iniciales: solo letras/números, mayúsculas, máx. 3.
  const iniciales = parsed.data.iniciales
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 3);
  if (!iniciales) return NextResponse.json({ error: "Iniciales no válidas" }, { status: 400 });

  await db.insert(puntuaciones).values({
    juego: parsed.data.juego,
    iniciales,
    puntos: parsed.data.puntos,
  });

  // Conserva solo el top 3 por juego: borra el resto.
  const sobrantes = await db
    .select({ id: puntuaciones.id })
    .from(puntuaciones)
    .where(eq(puntuaciones.juego, parsed.data.juego))
    .orderBy(desc(puntuaciones.puntos), asc(puntuaciones.creadoEn))
    .offset(3);
  for (const s of sobrantes) {
    await db.delete(puntuaciones).where(and(eq(puntuaciones.id, s.id)));
  }

  return NextResponse.json({ ok: true, top: await top3(parsed.data.juego) });
}
