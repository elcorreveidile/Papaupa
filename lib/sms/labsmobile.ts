const LABSMOBILE_URL = "https://api.labsmobile.com/json/send";

/**
 * Envía un SMS vía LabsMobile (auth Basic usuario:token).
 * En desarrollo (sin credenciales) NO envía: lo registra en consola.
 */
export async function enviarSMS(opts: { to: string; message: string }): Promise<{ sent: boolean; dev?: boolean }> {
  const user = process.env.LABSMOBILE_USERNAME;
  const token = process.env.LABSMOBILE_TOKEN;
  const msisdn = opts.to.replace(/\D/g, ""); // solo dígitos, formato internacional: 34XXXXXXXXX

  if (!user || !token) {
    console.log(`\n[DEV · SMS no enviado] a ${msisdn}: ${opts.message}\n`);
    return { sent: false, dev: true };
  }

  const auth = Buffer.from(`${user}:${token}`).toString("base64");
  const res = await fetch(LABSMOBILE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Basic ${auth}`,
      "cache-control": "no-cache",
    },
    body: JSON.stringify({
      message: opts.message,
      tpoa: process.env.SMS_SENDER || "Papaupa",
      recipient: [{ msisdn }],
    }),
  });

  const data = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
  if (!res.ok || data.code !== "0") {
    throw new Error(`LabsMobile ${data.code ?? res.status}: ${data.message ?? "error de envío"}`);
  }
  return { sent: true };
}
