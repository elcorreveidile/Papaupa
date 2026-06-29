const BREVO_API = "https://api.brevo.com/v3/smtp/email";

type EmailOpts = { to: string; toName?: string; subject: string; html: string; text?: string };

/**
 * Envía un email transaccional vía Brevo. En desarrollo (sin BREVO_API_KEY)
 * NO envía nada: lo registra en consola. Devuelve { dev: true } en ese caso.
 */
export async function enviarEmail(opts: EmailOpts): Promise<{ sent: boolean; dev?: boolean }> {
  const key = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;

  if (!key || !sender) {
    console.log(
      `\n[DEV · email no enviado]\n  Para: ${opts.to}\n  Asunto: ${opts.subject}\n  (configura BREVO_API_KEY y BREVO_SENDER_EMAIL para enviar de verdad)\n`,
    );
    return { sent: false, dev: true };
  }

  const res = await fetch(BREVO_API, {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { email: sender, name: process.env.BREVO_SENDER_NAME || "Papaupa" },
      to: [{ email: opts.to, name: opts.toName }],
      subject: opts.subject,
      htmlContent: opts.html,
      ...(opts.text ? { textContent: opts.text } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
  return { sent: true };
}

const BREVO_CONTACTS = "https://api.brevo.com/v3/contacts";

/**
 * Da de alta (o actualiza) un contacto en Brevo, opcionalmente en una lista.
 * Si BREVO_NEWSLETTER_LIST_ID está definido, lo añade a esa lista.
 * Best-effort: si no hay clave, no hace nada.
 */
export async function crearContactoBrevo(email: string): Promise<{ ok: boolean; dev?: boolean }> {
  const key = process.env.BREVO_API_KEY;
  if (!key) return { ok: false, dev: true };

  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  const res = await fetch(BREVO_CONTACTS, {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email,
      updateEnabled: true, // no falla si el contacto ya existe
      ...(listId ? { listIds: [listId] } : {}),
    }),
  });

  // 201 creado, 204 actualizado. Otros códigos: lo dejamos pasar (el alta en
  // nuestra BD es la fuente de verdad).
  return { ok: res.ok };
}
