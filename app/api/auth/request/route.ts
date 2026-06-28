import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, usuarios } from "@/lib/db";
import { crearMagicLink } from "@/lib/auth/magic";
import { enviarEmail } from "@/lib/email/brevo";
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
    const token = await crearMagicLink(u.id, canal);
    const url = `${baseUrl(req)}/api/auth/verify?token=${token}`;

    let r: { sent: boolean; dev?: boolean };
    if (canal === "sms") {
      r = await enviarSMS({
        to: u.telefono!,
        message: `Papaupa · entra con este enlace (caduca en 15 min): ${url}`,
      });
    } else {
      const html = `
        <div style="font-family:sans-serif;line-height:1.6;color:#3b2415">
          <h2 style="color:#a23818">Papaupa · Acceso al panel</h2>
          <p>Hola ${u.nombre}, pulsa para entrar:</p>
          <p><a href="${url}" style="background:#f2b705;color:#3b2415;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Entrar a Papaupa</a></p>
          <p style="color:#888;font-size:14px">El enlace caduca en 15 minutos. Si no lo has pedido tú, ignóralo.</p>
        </div>`;
      r = await enviarEmail({ to: u.email, toName: u.nombre, subject: "Tu acceso a Papaupa", html });
    }

    if (r.dev) {
      devUrl = url; // solo en desarrollo, para probar sin email/SMS real
      console.log(`\n[DEV · magic link · ${canal}] ${url}\n`);
    }
  }

  // Respuesta genérica: no revelamos si el email/teléfono está registrado.
  return NextResponse.json({ ok: true, ...(devUrl ? { devUrl } : {}) });
}
