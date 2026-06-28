import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, usuarios } from "@/lib/db";
import { crearMagicLink } from "@/lib/auth/magic";
import { enviarEmail } from "@/lib/email/brevo";
import { magicLinkEmail } from "@/lib/email/template";
import { enviarSMS } from "@/lib/sms/labsmobile";
import { baseUrl } from "@/lib/url";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const canal: "email" | "sms" = body.canal === "sms" ? "sms" : "email";
  if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const [u] = await db.select().from(usuarios).where(eq(usuarios.email, email)).limit(1);

  let devUrl: string | undefined;
  if (u && (canal === "email" || u.telefono)) {
    const base = baseUrl(req);
    const token = await crearMagicLink(u.id, canal);
    const url = `${base}/api/auth/verify?token=${token}`;

    let r: { sent: boolean; dev?: boolean };
    if (canal === "sms") {
      r = await enviarSMS({
        to: u.telefono!,
        message: `Papaupa · entra con este enlace (caduca en 15 min): ${url}`,
      });
    } else {
      const { html, text } = magicLinkEmail({ nombre: u.nombre, url, base });
      r = await enviarEmail({
        to: u.email,
        toName: u.nombre,
        subject: "Tu acceso al panel de Papaupa",
        html,
        text,
      });
    }

    if (r.dev) {
      devUrl = url; // solo en desarrollo, para probar sin email/SMS real
      console.log(`\n[DEV · magic link · ${canal}] ${url}\n`);
    }
  }

  // Respuesta genérica: no revelamos si el email/teléfono está registrado.
  return NextResponse.json({ ok: true, ...(devUrl ? { devUrl } : {}) });
}
