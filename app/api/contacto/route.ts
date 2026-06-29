import { NextResponse } from "next/server";
import { db, mensajes } from "@/lib/db";
import { contactoSchema } from "@/lib/validators";
import { enviarEmail } from "@/lib/email/brevo";
import { emailLayout } from "@/lib/email/template";
import { baseUrl } from "@/lib/url";
import { CONTACTO_EMAIL, CONTACTO_NOMBRE } from "@/lib/constants";

export const runtime = "nodejs";

function escapar(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = contactoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 });
  }
  const { nombre, email, asunto, mensaje } = parsed.data;
  const base = baseUrl(req);

  // 1) Guardar siempre (aunque falle el email, no se pierde el mensaje).
  await db.insert(mensajes).values({
    nombre,
    email,
    asunto: asunto || null,
    mensaje,
  });

  // 2) Aviso al equipo (no se interrumpe el flujo si el email falla).
  try {
    const cuerpoAdmin = `
      <p style="margin:0 0 14px;">Nuevo mensaje desde el formulario de contacto:</p>
      <table style="width:100%;font-size:15px;border-collapse:collapse;">
        <tr><td style="padding:4px 0;color:#9a8c70;">Nombre</td><td style="padding:4px 0;"><strong>${escapar(nombre)}</strong></td></tr>
        <tr><td style="padding:4px 0;color:#9a8c70;">Email</td><td style="padding:4px 0;"><a href="mailto:${escapar(email)}" style="color:#a23818;">${escapar(email)}</a></td></tr>
        ${asunto ? `<tr><td style="padding:4px 0;color:#9a8c70;">Asunto</td><td style="padding:4px 0;">${escapar(asunto)}</td></tr>` : ""}
      </table>
      <p style="margin:16px 0 6px;color:#9a8c70;font-size:13px;">Mensaje:</p>
      <p style="margin:0;white-space:pre-wrap;">${escapar(mensaje)}</p>`;
    await enviarEmail({
      to: CONTACTO_EMAIL,
      toName: CONTACTO_NOMBRE,
      subject: `Contacto Papaupa: ${asunto || nombre}`,
      html: emailLayout({ base, preheader: `Mensaje de ${nombre}`, cuerpo: cuerpoAdmin }),
      text: `Nuevo mensaje de contacto\n\nNombre: ${nombre}\nEmail: ${email}\n${asunto ? `Asunto: ${asunto}\n` : ""}\n${mensaje}`,
    });

    // 3) Autorrespuesta al remitente.
    const cuerpoUsuario = `
      <p style="margin:0 0 14px;">Hola <strong>${escapar(nombre)}</strong>,</p>
      <p style="margin:0 0 14px;">¡Gracias por escribirnos! Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
      <p style="margin:0 0 6px;color:#9a8c70;font-size:13px;">Tu mensaje:</p>
      <p style="margin:0 0 18px;white-space:pre-wrap;font-style:italic;">"${escapar(mensaje)}"</p>
      <p style="margin:0;">Un abrazo,<br>El equipo de Papaupa 🍌</p>`;
    await enviarEmail({
      to: email,
      toName: nombre,
      subject: "Hemos recibido tu mensaje · Papaupa",
      html: emailLayout({ base, preheader: "Gracias por escribir a Papaupa", cuerpo: cuerpoUsuario }),
      text: `Hola ${nombre},\n\nGracias por escribirnos. Hemos recibido tu mensaje y te responderemos lo antes posible.\n\nUn abrazo,\nEl equipo de Papaupa`,
    });
  } catch {
    // El mensaje ya está guardado; ignoramos fallos de email.
  }

  return NextResponse.json({ ok: true });
}
