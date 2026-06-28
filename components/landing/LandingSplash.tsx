"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DonPatacon from "./DonPatacon";

const TOTAL_BITES = 3;
const MASCOT = 120; // tamaño del patacón en modo juego (px)

/**
 * Pantalla de entrada (puerta) a `h-svh`, sin scroll.
 *
 * Solo se muestra en la PRIMERA visita: el middleware redirige a /inicio a
 * quien ya tiene la cookie `papaupa_visited`.
 * - Primera visita con movimiento: MINIJUEGO — la mascota rebota por la
 *   pantalla y huye del cursor; 3 mordiscos ("¡Cómeme para entrar!") → /inicio.
 * - Primera visita con `prefers-reduced-motion`: puerta ESTÁTICA con enlace.
 */
export default function LandingSplash() {
  const router = useRouter();
  const [mode, setMode] = useState<"static" | "game">("static");
  const [bites, setBites] = useState(0);
  const [eaten, setEaten] = useState(false);

  const mascotRef = useRef<HTMLButtonElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: -9999, y: -9999 });
  const scaleRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  // Marca la visita (cookie que lee el middleware) y decide el modo en el
  // cliente. SSR = estático para no desajustar la hidratación.
  useEffect(() => {
    document.cookie = `papaupa_visited=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReduced) {
      setMode("game");
    }
  }, []);

  // Bucle de animación del juego.
  useEffect(() => {
    if (mode !== "game") return;

    pos.current = {
      x: window.innerWidth / 2 - MASCOT / 2,
      y: window.innerHeight / 2 - MASCOT / 2,
    };
    const dir = () => (Math.random() < 0.5 ? -1 : 1);
    vel.current = { x: (2.2 + Math.random()) * dir(), y: (2 + Math.random()) * dir() };

    const onMove = (e: MouseEvent | TouchEvent) => {
      const t = "touches" in e ? e.touches[0] : null;
      cursor.current = {
        x: t ? t.clientX : (e as MouseEvent).clientX,
        y: t ? t.clientY : (e as MouseEvent).clientY,
      };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    const SPEED_CAP = 6.5;
    const FLEE_RADIUS = 155;

    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const size = MASCOT * scaleRef.current;

      // Huir del cursor
      const cx = pos.current.x + size / 2;
      const cy = pos.current.y + size / 2;
      const dx = cx - cursor.current.x;
      const dy = cy - cursor.current.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < FLEE_RADIUS) {
        const f = ((FLEE_RADIUS - dist) / FLEE_RADIUS) * 0.95;
        vel.current.x += (dx / dist) * f;
        vel.current.y += (dy / dist) * f;
      }

      // Mover
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Rebotar en los bordes
      if (pos.current.x <= 0) {
        pos.current.x = 0;
        vel.current.x = Math.abs(vel.current.x);
      } else if (pos.current.x >= w - size) {
        pos.current.x = w - size;
        vel.current.x = -Math.abs(vel.current.x);
      }
      if (pos.current.y <= 0) {
        pos.current.y = 0;
        vel.current.y = Math.abs(vel.current.y);
      } else if (pos.current.y >= h - size) {
        pos.current.y = h - size;
        vel.current.y = -Math.abs(vel.current.y);
      }

      // Limitar / mantener velocidad (que no se pare ni se dispare)
      const sp = Math.hypot(vel.current.x, vel.current.y) || 1;
      if (sp > SPEED_CAP) {
        vel.current.x *= SPEED_CAP / sp;
        vel.current.y *= SPEED_CAP / sp;
      } else if (sp < 2.2) {
        vel.current.x *= 2.2 / sp;
        vel.current.y *= 2.2 / sp;
      }

      if (mascotRef.current) {
        mascotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${scaleRef.current})`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [mode]);

  const handleBite = useCallback(() => {
    setBites((prev) => {
      if (eaten) return prev;
      const next = prev + 1;
      scaleRef.current = Math.max(0.15, 1 - next * (0.82 / TOTAL_BITES));
      // un buen empujón en cada mordisco
      vel.current.x *= -1.15;
      vel.current.y *= -1.1;
      if (next >= TOTAL_BITES) {
        setEaten(true);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.setTimeout(() => router.push("/inicio"), 680);
      }
      return next;
    });
  }, [eaten, router]);

  const restantes = TOTAL_BITES - bites;

  return (
    <main className="relative flex h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Fondo: fachada del restaurante (Realejo) */}
      <Image
        src="/images/fachada.jpg"
        alt="Fachada de Papaupa en el Realejo, Granada"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

      {mode === "static" ? (
        /* ---------- PUERTA ESTÁTICA ---------- */
        <Link
          href="/inicio"
          aria-label="Entrar a Papaupa"
          className="group flex flex-col items-center outline-none"
        >
          <DonPatacon className="animate-patacon w-44 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 sm:w-52" />
          <h1
            className="mt-6 font-display text-5xl font-semibold italic text-crema sm:text-7xl"
            style={{ textShadow: "0 3px 18px rgba(0,0,0,0.65)" }}
          >
            ¿¿Pasas marica??
          </h1>
          <p
            className="mt-4 max-w-md font-sans text-base text-crema/90 sm:text-lg"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
          >
            Comida colombiana, trato familiar, sabor de casa.
          </p>
          <span className="mt-10 flex items-center gap-2 rounded-full border border-crema/50 px-6 py-2 font-sans text-xs uppercase tracking-[0.3em] text-crema/90 transition-colors group-hover:border-mostaza group-hover:text-mostaza">
            Entra
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      ) : (
        /* ---------- MINIJUEGO ---------- */
        <>
          {/* Mensaje */}
          <div className="pointer-events-none absolute inset-x-0 top-[12svh] z-10 flex flex-col items-center px-6">
            <h1
              className="animate-patacon font-display text-4xl font-semibold italic text-crema sm:text-6xl"
              style={{ textShadow: "0 3px 18px rgba(0,0,0,0.7)" }}
            >
              {eaten ? "¡Ñam! 🍴" : "¡Cómeme para entrar!"}
            </h1>
            {!eaten && (
              <p
                className="mt-3 font-sans text-sm uppercase tracking-[0.25em] text-crema/90 sm:text-base"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
              >
                Atrápame · {restantes} mordisco{restantes === 1 ? "" : "s"} más
              </p>
            )}
          </div>

          {/* Mascota que se mueve (botón = mordisco) */}
          {!eaten && (
            <button
              ref={mascotRef}
              type="button"
              onClick={handleBite}
              aria-label="Cómeme: muérdeme para entrar a Papaupa"
              className="absolute left-0 top-0 z-20 cursor-pointer touch-none select-none rounded-full outline-none focus-visible:ring-4 focus-visible:ring-mostaza/70"
              style={{ width: MASCOT, height: (MASCOT * 232) / 210, willChange: "transform" }}
            >
              <DonPatacon className="pointer-events-none h-full w-full drop-shadow-2xl" />
            </button>
          )}

          {/* Saltar (accesibilidad / impaciencia) */}
          <Link
            href="/inicio"
            className="absolute bottom-6 right-6 z-10 font-sans text-xs uppercase tracking-[0.25em] text-crema/70 underline-offset-4 transition-colors hover:text-mostaza hover:underline"
          >
            Saltar →
          </Link>
        </>
      )}
    </main>
  );
}
