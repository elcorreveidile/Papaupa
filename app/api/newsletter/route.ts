import { NextResponse } from "next/server";
import { db, newsletter } from "@/lib/db";
import { newsletterSchema } from "@/lib/validators";
import { crearContactoBrevo, enviarEmail } from "@/lib/email/brevo";
import { emailLayout } from "@/lib/email/template";
import { baseUrl } from "@/lib/url";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();
  const base = baseUrl(req);

  // 1) Alta en nuestra BD (fuente de verdad). Si ya estaba, no pasa nada.
  const insertado = await db
    .insert(newsletter)
    .values({ email })
    .onConflictDoNothing({ target: newsletter.email })
    .returning();
  const esNuevo = insertado.length > 0;

  // 2) Sincroniza con Brevo (best-effort) y manda bienvenida solo si es nuevo.
  try {
    await crearContactoBrevo(email);
    if (esNuevo) {
      const cuerpo = `
        <p style="margin:0 0 14px;">¡Gracias por suscribirte a Papaupa! 🍌</p>
        <p style="margin:0 0 14px;">Te avisaremos de nuestros eventos, novedades de la carta y los planes especiales del Realejo. Sin spam, prometido.</p>
        <p style="margin:0;">Nos vemos pronto. Un abrazo,<br>El equipo de Papaupa</p>`;
      await enviarEmail({
        to: email,
        subject: "¡Bienvenido a Papaupa! 🍌",
        html: emailLayout({ base, preheader: "Gracias por suscribirte a Papaupa", cuerpo }),
        text: "¡Gracias por suscribirte a Papaupa! Te avisaremos de eventos, novedades de la carta y planes especiales. Sin spam. Un abrazo, el equipo de Papaupa.",
      });
    }
  } catch {
    // El alta en BD ya está hecha; ignoramos fallos de Brevo.
  }

  return NextResponse.json({ ok: true, nuevo: esNuevo });
}
