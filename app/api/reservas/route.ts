import { NextResponse } from "next/server";
import { db, reservas } from "@/lib/db";
import { reservaSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = reservaSchema.safeParse({
    ...body,
    personas: Number(body.personas),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  }

  const { email, observaciones, ...rest } = parsed.data;
  // Se guarda como "pendiente"; Paco la confirma desde el panel.
  // (No se avisa a Paco por email/WhatsApp en desarrollo: es sorpresa.)
  await db.insert(reservas).values({
    ...rest,
    email: email || null,
    observaciones: observaciones || null,
    estado: "pendiente",
  });

  return NextResponse.json({ ok: true });
}
