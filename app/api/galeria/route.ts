import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db, galeria } from "@/lib/db";
import { getSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

/** Da de alta una foto ya subida a Blob (o por URL). Solo con sesión del panel. */
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let data: { url?: string; titulo?: string; tituloEn?: string; orden?: number };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const url = (data.url || "").trim();
  if (!url) return NextResponse.json({ error: "Falta la URL" }, { status: 400 });

  const [foto] = await db
    .insert(galeria)
    .values({
      url,
      titulo: (data.titulo || "").trim() || null,
      tituloEn: (data.tituloEn || "").trim() || null,
      orden: Number(data.orden) || 0,
      visible: true,
    })
    .returning();

  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
  return NextResponse.json({ ok: true, foto });
}
