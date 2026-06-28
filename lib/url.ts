/**
 * Devuelve la URL pública base a partir de la petición.
 * En local → http://localhost:3000 · en producción (Vercel) → tu dominio real,
 * sin necesidad de configurar nada. Cae a APP_URL si no hay cabeceras.
 */
export function baseUrl(req: Request): string {
  const h = req.headers;
  const host = h.get("x-forwarded-host") || h.get("host");
  if (host) {
    const proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  }
  return process.env.APP_URL || "http://localhost:3000";
}
