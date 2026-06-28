import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/session";
import { baseUrl } from "@/lib/url";

export const runtime = "nodejs";

function salir(req: Request) {
  const res = NextResponse.redirect(`${baseUrl(req)}/admin/login`);
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

export async function POST(req: Request) {
  return salir(req);
}
export async function GET(req: Request) {
  return salir(req);
}
