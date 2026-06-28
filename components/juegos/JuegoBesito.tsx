"use client";

import { useEffect, useRef, useState } from "react";
import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";

const S = 72;
const PSPEED = 4.6;

type Obstacle = { el: HTMLDivElement; x: number; y: number; vx: number; vy: number };

export default function JuegoBesito() {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const heroEl = useRef<HTMLDivElement | null>(null);
  const goalEl = useRef<HTMLDivElement | null>(null);
  const obsLayer = useRef<HTMLDivElement | null>(null);
  const dims = useRef({ w: 0, h: 0 });
  const hero = useRef({ x: 0, y: 0, face: 1 });
  const goal = useRef({ x: 0, y: 0 });
  const obs = useRef<Obstacle[]>([]);
  const keys = useRef<Set<string>>(new Set());
  const touch = useRef<{ x: number; y: number } | null>(null);
  const over = useRef(false);
  const scoreRef = useRef(0);
  const raf = useRef<number | null>(null);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"playing" | "over">("playing");

  function place(el: HTMLDivElement | null, x: number, y: number, face = 1) {
    if (el) el.style.transform = `translate(${x}px, ${y}px) scaleX(${face})`;
  }

  function relocateGoal() {
    const { w, h } = dims.current;
    let x = 0;
    let y = 0;
    for (let i = 0; i < 12; i++) {
      x = Math.random() * (w - S);
      y = Math.random() * (h * 0.7);
      if (Math.hypot(x - hero.current.x, y - hero.current.y) > Math.min(w, h) * 0.4) break;
    }
    goal.current = { x, y };
    place(goalEl.current, x, y);
  }

  function addObstacle() {
    if (!obsLayer.current) return;
    const { w, h } = dims.current;
    const el = document.createElement("div");
    el.textContent = "🌶️";
    el.style.cssText = "position:absolute;left:0;top:0;font-size:34px;line-height:1;will-change:transform;pointer-events:none;";
    obsLayer.current.appendChild(el);
    const ang = Math.random() * Math.PI * 2;
    const sp = 2.4 + Math.random() * 1.6 + scoreRef.current * 0.12;
    obs.current.push({
      el,
      x: w * 0.5,
      y: h * 0.3,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp,
    });
  }

  function hearts(x: number, y: number) {
    if (!obsLayer.current) return;
    ["❤️", "💛", "💕", "❤️", "💖"].forEach((e, i) => {
      const s = document.createElement("div");
      s.textContent = e;
      s.className = "burst-particle";
      const ang = (i / 5) * Math.PI * 2;
      s.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:24px;pointer-events:none;--bx:${Math.cos(ang) * 55}px;--by:${Math.sin(ang) * 55 - 18}px;`;
      obsLayer.current!.appendChild(s);
      window.setTimeout(() => s.remove(), 1000);
    });
  }

  function init() {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) dims.current = { w: r.width, h: r.height };
    const { w, h } = dims.current;
    hero.current = { x: w * 0.5 - S / 2, y: h * 0.8, face: 1 };
    obs.current.forEach((o) => o.el.remove());
    obs.current = [];
    scoreRef.current = 0;
    over.current = false;
    setScore(0);
    setStatus("playing");
    place(heroEl.current, hero.current.x, hero.current.y);
    relocateGoal();
    addObstacle();
    addObstacle();
  }

  useEffect(() => {
    init();

    const kd = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
      keys.current.add(k);
    };
    const ku = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    const onResize = () => {
      const r = areaRef.current?.getBoundingClientRect();
      if (r) dims.current = { w: r.width, h: r.height };
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("resize", onResize);

    const loop = () => {
      const { w, h } = dims.current;
      if (w > 0 && !over.current) {
        // --- Jugador ---
        let vx = 0;
        let vy = 0;
        const k = keys.current;
        if (k.has("arrowleft") || k.has("a")) vx -= 1;
        if (k.has("arrowright") || k.has("d")) vx += 1;
        if (k.has("arrowup") || k.has("w")) vy -= 1;
        if (k.has("arrowdown") || k.has("s")) vy += 1;
        if (vx || vy) {
          const l = Math.hypot(vx, vy);
          vx = (vx / l) * PSPEED;
          vy = (vy / l) * PSPEED;
        } else if (touch.current) {
          const dx = touch.current.x - (hero.current.x + S / 2);
          const dy = touch.current.y - (hero.current.y + S / 2);
          const d = Math.hypot(dx, dy);
          if (d > 5) {
            vx = (dx / d) * PSPEED;
            vy = (dy / d) * PSPEED;
          }
        }
        hero.current.x = Math.max(0, Math.min(w - S, hero.current.x + vx));
        hero.current.y = Math.max(0, Math.min(h - S, hero.current.y + vy));
        if (vx) hero.current.face = vx < 0 ? -1 : 1;
        place(heroEl.current, hero.current.x, hero.current.y, hero.current.face);

        const hx = hero.current.x + S / 2;
        const hy = hero.current.y + S / 2;

        // --- ¿Llegó al besito? ---
        if (Math.hypot(hx - (goal.current.x + S / 2), hy - (goal.current.y + S / 2)) < S * 0.7) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          hearts(goal.current.x + S / 2, goal.current.y + S / 2);
          relocateGoal();
          addObstacle();
        }

        // --- Obstáculos ---
        for (const o of obs.current) {
          o.x += o.vx;
          o.y += o.vy;
          if (o.x <= 0 || o.x >= w - 30) o.vx *= -1;
          if (o.y <= 0 || o.y >= h - 30) o.vy *= -1;
          o.x = Math.max(0, Math.min(w - 30, o.x));
          o.y = Math.max(0, Math.min(h - 30, o.y));
          o.el.style.transform = `translate(${o.x}px, ${o.y}px)`;
          if (Math.hypot(o.x + 15 - hx, o.y + 15 - hy) < S * 0.46 + 14) {
            over.current = true;
            setBest((b) => Math.max(b, scoreRef.current));
            setStatus("over");
          }
        }
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("resize", onResize);
      obs.current.forEach((o) => o.el.remove());
      obs.current = [];
    };
  }, []);

  const setTouchFromEvent = (e: React.PointerEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) touch.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-sans text-marron">
        <span className="font-bold">💋 {score}</span>
        <span className="text-sm text-marron/70">Récord: {best}</span>
      </div>

      <div
        ref={areaRef}
        className="relative h-[62svh] min-h-[340px] w-full touch-none select-none overflow-hidden rounded-3xl border-4 border-marron/20"
        style={{ background: "repeating-linear-gradient(45deg, #f5ecd7 0 26px, #efe3c6 26px 52px)" }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setTouchFromEvent(e);
        }}
        onPointerMove={(e) => {
          if (touch.current) setTouchFromEvent(e);
        }}
        onPointerUp={() => (touch.current = null)}
        onPointerCancel={() => (touch.current = null)}
      >
        <div ref={obsLayer} className="pointer-events-none absolute inset-0" />

        {/* Don Patacón (al que hay que llegar) */}
        <div ref={goalEl} className="pointer-events-none absolute left-0 top-0" style={{ width: S, height: (S * 232) / 210 }}>
          <DonPatacon className="h-full w-full drop-shadow-md" />
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl">💋</span>
        </div>

        {/* La Patacona (jugadora) */}
        <div ref={heroEl} className="pointer-events-none absolute left-0 top-0" style={{ width: S, height: (S * 232) / 210 }}>
          <DonaPatacona className="h-full w-full drop-shadow-md" />
        </div>

        {status === "over" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-marron/70 text-center text-crema backdrop-blur-sm">
            <p className="font-display text-4xl font-bold italic">¡Ay, el chile! 🌶️</p>
            <p className="mt-2 font-sans text-lg">Repartiste {score} besito{score === 1 ? "" : "s"} 💋</p>
            <button
              type="button"
              onClick={init}
              className="mt-6 rounded-full bg-mostaza px-7 py-3 font-sans text-lg font-bold text-marron transition-transform hover:scale-105 active:scale-95"
            >
              🔁 Otra vez
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-sans text-sm text-marron/60">
        Lleva a la Patacona hasta Don Patacón para darle un besito 💋, ¡pero esquiva los chiles
        🌶️! 🖥️ flechas/WASD · 📱 arrastra el dedo.
      </p>
    </div>
  );
}
