import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db, magicTokens, usuarios } from "@/lib/db";

const TTL_MIN = 15;
const hashToken = (t: string) => createHash("sha256").update(t).digest("hex");

/** Crea un magic token para un usuario y devuelve el token en claro (para el enlace). */
export async function crearMagicLink(usuarioId: number, canal: "email" | "sms"): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  await db.insert(magicTokens).values({
    usuarioId,
    tokenHash: hashToken(token),
    canal,
    expiraEn: new Date(Date.now() + TTL_MIN * 60 * 1000),
  });
  return token;
}

/** Valida y consume un token. Devuelve el usuario o null. */
export async function consumirMagicToken(token: string) {
  const [row] = await db
    .select()
    .from(magicTokens)
    .where(eq(magicTokens.tokenHash, hashToken(token)))
    .limit(1);

  if (!row || row.usadoEn || row.expiraEn.getTime() < Date.now()) return null;

  await db.update(magicTokens).set({ usadoEn: new Date() }).where(eq(magicTokens.id, row.id));

  const [u] = await db.select().from(usuarios).where(eq(usuarios.id, row.usuarioId)).limit(1);
  return u ?? null;
}
