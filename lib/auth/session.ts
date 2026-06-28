import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "papaupa_session";

export type SessionData = {
  uid: number;
  email: string;
  nombre: string;
  rol: string; // admin | superadmin
};

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("Falta AUTH_SECRET");
  return new TextEncoder().encode(s);
}

export async function signSession(data: SessionData): Promise<string> {
  return new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

/** Verifica el JWT de sesión. Edge-safe (sin acceso a BD). */
export async function verifySession(token?: string | null): Promise<SessionData | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      uid: payload.uid as number,
      email: payload.email as string,
      nombre: payload.nombre as string,
      rol: payload.rol as string,
    };
  } catch {
    return null;
  }
}
