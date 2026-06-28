import { NextResponse } from "next/server";
import { consumirMagicToken } from "@/lib/auth/magic";
import { signSession, SESSION_COOKIE } from "@/lib/auth/session";
import { baseUrl } from "@/lib/url";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const base = baseUrl(req);
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return NextResponse.redirect(`${base}/admin/login?error=falta`);

  const u = await consumirMagicToken(token);
  if (!u) return NextResponse.redirect(`${base}/admin/login?error=caducado`);

  const jwt = await signSession({ uid: u.id, email: u.email, nombre: u.nombre, rol: u.rol });
  const res = NextResponse.redirect(`${base}/admin`);
  res.cookies.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
