"use client";

import { useEffect, useRef, useState } from "react";
import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";

const S = 76; // tamaño personajes
const GAME_TIME = 30; // segundos
const CAKE_SPEED = 10;
const COOLDOWN = 180; // ms entre lanzamientos

type Cake = { el: HTMLDivElement; x: number; y: number; vx: number; vy: number };

export default function JuegoTartazo() {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const cakeLayer = useRef<HTMLDivElement | null>(null);
  const foeEl = useRef<HTMLDivElement | null>(null);
  const dims = useRef({ w: 0, h: 0 });
  const foe = useRef({ x: 0, y: 0, vx: 2.6, vy: 1.8 });
  const cakes = useRef<Cake[]>([]);
  const aim = useRef({ x: 0, y: 0 });
  const lastThrow = useRef(0);
  const startT = useRef(0);
  const over = useRef(false);
  const raf = useRef<number | null>(null);

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_TIME);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"playing" | "over">("playing");

  function origin() {
    return { x: dims.current.w / 2, y: dims.current.h - 56 };
  }

  function throwCake(tx: number, ty: number) {
    if (over.current || !cakeLayer.current) return;
    const now = performance.now();
    if (now - lastThrow.current < COOLDOWN) return;
    lastThrow.current = now;
    const o = origin();
    const dx = tx - o.x;
    const dy = ty - o.y;
    const d = Math.hypot(dx, dy) || 1;
    const el = document.createElement("div");
    el.textContent = "🎂";
    el.style.cssText = "position:absolute;left:0;top:0;font-size:30px;line-height:1;will-change:transform;pointer-events:none;";
    cakeLayer.current.appendChild(el);
    cakes.current.push({ el, x: o.x, y: o.y, vx: (dx / d) * CAKE_SPEED, vy: (dy / d) * CAKE_SPEED });
  }

  function splat(x: number, y: number) {
    if (!cakeLayer.current) return;
    const s = document.createElement("div");
    s.textContent = "💥";
    s.className = "burst-particle";
    s.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:30px;--bx:0px;--by:-26px;pointer-events:none;`;
    cakeLayer.current.appendChild(s);
    window.setTimeout(() => s.remove(), 1000);
  }

  function init() {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) dims.current = { w: r.width, h: r.height };
    const { w } = dims.current;
    foe.current = { x: w * 0.5 - S / 2, y: 30, vx: 2.8, vy: 1.7 };
    cakes.current.forEach((c) => c.el.remove());
    cakes.current = [];
    aim.current = { x: w / 2, y: 40 };
    startT.current = performance.now();
    over.current = false;
    setScore(0);
    setTime(GAME_TIME);
    setStatus("playing");
  }

  useEffect(() => {
    init();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        throwCake(aim.current.x, aim.current.y);
      }
    };
    const onResize = () => {
      const r = areaRef.current?.getBoundingClientRect();
      if (r) dims.current = { w: r.width, h: r.height };
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    let scoreLocal = 0;
    const loop = () => {
      const { w, h } = dims.current;
      if (w > 0 && !over.current) {
        const elapsed = (performance.now() - startT.current) / 1000;
        const left = Math.max(0, GAME_TIME - elapsed);
        const lt = Math.ceil(left);
        setTime((t) => (t !== lt ? lt : t));
        if (left <= 0) {
          over.current = true;
          setBest((b) => Math.max(b, scoreLocal));
          setStatus("over");
        }

        // Don Patacón se mueve (zona superior)
        const f = foe.current;
        const limitY = h * 0.58;
        f.x += f.vx;
        f.y += f.vy;
        if (f.x <= 0) { f.x = 0; f.vx = Math.abs(f.vx); }
        else if (f.x >= w - S) { f.x = w - S; f.vx = -Math.abs(f.vx); }
        if (f.y <= 0) { f.y = 0; f.vy = Math.abs(f.vy); }
        else if (f.y >= limitY) { f.y = limitY; f.vy = -Math.abs(f.vy); }
        if (foeEl.current) foeEl.current.style.transform = `translate(${f.x}px, ${f.y}px) scaleX(${f.vx < 0 ? -1 : 1})`;

        // Tartas
        const fcx = f.x + S / 2;
        const fcy = f.y + S / 2;
        for (let i = cakes.current.length - 1; i >= 0; i--) {
          const c = cakes.current[i];
          c.x += c.vx;
          c.y += c.vy;
          c.el.style.transform = `translate(${c.x - 15}px, ${c.y - 15}px)`;
          const hit = Math.hypot(c.x - fcx, c.y - fcy) < S * 0.5 + 12;
          const outside = c.x < -30 || c.x > w + 30 || c.y < -30 || c.y > h + 30;
          if (hit || outside) {
            if (hit) {
              scoreLocal += 1;
              setScore(scoreLocal);
              splat(c.x, c.y);
            }
            c.el.remove();
            cakes.current.splice(i, 1);
          }
        }
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cakes.current.forEach((c) => c.el.remove());
      cakes.current = [];
    };
  }, []);

  const pointerXY = (e: React.PointerEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-sans text-marron">
        <span className="font-bold">🎂 {score}</span>
        <span className="font-bold">⏱️ {time}s</span>
        <span className="text-sm text-marron/70">Récord: {best}</span>
      </div>

      <div
        ref={areaRef}
        className="patio-field relative h-[62svh] min-h-[340px] w-full touch-none select-none overflow-hidden rounded-3xl border-4 border-marron/20"
        onPointerMove={(e) => (aim.current = pointerXY(e))}
        onPointerDown={(e) => {
          const p = pointerXY(e);
          aim.current = p;
          throwCake(p.x, p.y);
        }}
      >
        {/* Capa de tartas (DOM imperativo) */}
        <div ref={cakeLayer} className="pointer-events-none absolute inset-0" />

        {/* Don Patacón (objetivo) */}
        <div ref={foeEl} className="pointer-events-none absolute left-0 top-0" style={{ width: S, height: (S * 232) / 210 }}>
          <DonPatacon className="h-full w-full drop-shadow-md" />
        </div>

        {/* La Patacona (lanzadora, abajo en el centro) */}
        <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2" style={{ width: S, height: (S * 232) / 210 }}>
          <DonaPatacona className="h-full w-full drop-shadow-md" />
        </div>

        {status === "over" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-marron/70 text-center text-crema backdrop-blur-sm">
            <p className="font-display text-4xl font-bold italic">¡Se acabó el tiempo!</p>
            <p className="mt-2 font-sans text-lg">Le diste {score} tartazo{score === 1 ? "" : "s"} 🎂</p>
            <button
              type="button"
              onClick={init}
              className="mt-6 rounded-full bg-mostaza px-7 py-3 font-sans text-lg font-bold text-marron transition-transform hover:scale-105 active:scale-95"
            >
              🔁 Otra ronda
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-sans text-sm text-marron/60">
        📱 Toca donde quieras lanzar la tarta · 🖥️ apunta con el ratón y haz clic (o <strong>barra espaciadora</strong>).
        ¡Dale a Don Patacón!
      </p>
    </div>
  );
}
