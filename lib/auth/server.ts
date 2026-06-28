import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession, type SessionData } from "./session";

/** Devuelve la sesión actual (o null) en componentes/acciones de servidor. */
export async function getSession(): Promise<SessionData | null> {
  const c = await cookies();
  return verifySession(c.get(SESSION_COOKIE)?.value);
}

/** Exige sesión; si no hay, redirige al login. Devuelve la sesión. */
export async function requireSession(): Promise<SessionData> {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  return s;
}
