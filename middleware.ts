import { NextRequest, NextResponse } from "next/server";

/**
 * El visitante que YA ha pasado por la puerta (cookie `papaupa_visited`) va
 * directo a la Home real: redirigimos `/` → `/inicio` en el servidor, sin que
 * llegue a ver el splash. La primera visita (sin cookie) sí ve la puerta/juego.
 */
export function middleware(request: NextRequest) {
  if (request.cookies.has("papaupa_visited")) {
    const url = request.nextUrl.clone();
    url.pathname = "/inicio";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
