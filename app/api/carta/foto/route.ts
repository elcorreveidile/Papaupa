import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, menuPlatos } from "@/lib/db";
import { getSession } from "@/lib/auth/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Fija (o quita, con url vacía) la foto de un plato. Solo con sesión. */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const id = Number(body.id);
  if (!id) return NextResponse.json({ error: "id" }, { status: 400 });

  await db
    .update(menuPlatos)
    .set({ fotoUrl: (body.url || "").trim() || null })
    .where(eq(menuPlatos.id, id));

  revalidatePath("/admin/carta");
  revalidatePath("/menu");
  return NextResponse.json({ ok: true });
}
