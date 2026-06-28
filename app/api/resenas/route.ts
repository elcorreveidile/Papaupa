import { NextResponse } from "next/server";
import { db, resenas } from "@/lib/db";
import { resenaSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = resenaSchema.safeParse({
    ...body,
    rating: Number(body.rating),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  }

  // Se guarda como "pendiente": Paco la aprueba desde el panel antes de publicarse.
  await db.insert(resenas).values({ ...parsed.data, estado: "pendiente" });

  return NextResponse.json({ ok: true });
}
