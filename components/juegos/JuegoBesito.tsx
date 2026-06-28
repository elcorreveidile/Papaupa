"use client";

import { useEffect, useRef, useState } from "react";
import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";
import { useLang } from "@/lib/i18n";
import { BotonEmpezar, CuentaAtras, useCuentaAtras } from "./Inicio";

const sizeFor = (w: number) => Math.max(34, Math.min(72, Math.round(w * 0.105)));

type Obstacle = { el: HTMLDivElement; x: number; y: number; vx: number; vy: number };

export default function JuegoBesito() {
  const { t } = useLang();
  const areaRef = useRef<HTMLDivElement | null>(null);
  const heroEl = useRef<HTMLDivElement | null>(null);
  const goalEl = useRef<HTMLDivElement | null>(null);
  const obsLayer = useRef<HTMLDivElement | null>(null);
  const dims = useRef({ w: 0, h: 0 });
  const sizeRef = useRef(56);
  const hero = useRef({ x: 0, y: 0, face: 1 });
  const goal = useRef({ x: 0, y: 0 });
  const obs = useRef<Obstacle[]>([]);
  const keys = useRef<Set<string>>(new Set());
  const touch = useRef<{ x: number; y: number } | null>(null);
  const over = useRef(false);
  const running = useRef(false);
  const scoreRef = useRef(0);
  const raf = useRef<number | null>(null);

  const [size, setSize] = useState(56);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");

  function empezar() {
    over.current = false;
    running.current = true;
    setStatus("playing");
  }
  const { count, lanzar } = useCuentaAtras(empezar);

  function place(el: HTMLDivElement | null, x: number, y: number, face = 1) {
    if (el) el.style.transform = `translate(${x}px, ${y}px) scaleX(${face})`;
  }

  function measure() {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) {
      dims.current = { w: r.width, h: r.height };
      const s = sizeFor(r.width);
      sizeRef.current = s;
      setSize(s);
    }
  }

  function relocateGoal() {
    const { w, h } = dims.current;
    const S = sizeRef.current;
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
    const S = sizeRef.current;
    const el = document.createElement("div");
    el.textContent = "🌶️";
    el.style.cssText = `position:absolute;left:0;top:0;font-size:${Math.round(S * 0.5)}px;line-height:1;will-change:transform;pointer-events:none;`;
    obsLayer.current.appendChild(el);
    const ang = Math.random() * Math.PI * 2;
    const sp = (2.4 + Math.random() * 1.6 + scoreRef.current * 0.12) * (S / 76);
    obs.current.push({ el, x: w * 0.5, y: h * 0.3, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp });
  }

  function hearts(x: number, y: number) {
    if (!obsLayer.current) return;
    ["❤️", "💛", "💕", "❤️", "💖"].forEach((e, i) => {
      const s = document.createElement("div");
      s.textContent = e;
      s.className = "burst-particle";
      const ang = (i / 5) * Math.PI * 2;
      s.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${Math.round(sizeRef.current * 0.4)}px;pointer-events:none;--bx:${Math.cos(ang) * 55}px;--by:${Math.sin(ang) * 55 - 18}px;`;
      obsLayer.current!.appendChild(s);
      window.setTimeout(() => s.remove(), 1000);
    });
  }

  function init() {
    measure();
    const { w, h } = dims.current;
    const S = sizeRef.current;
    hero.current = { x: w * 0.5 - S / 2, y: h * 0.8, face: 1 };
    obs.current.forEach((o) => o.el.remove());
    obs.current = [];
    scoreRef.current = 0;
    over.current = false;
    running.current = false;
    setScore(0);
    setStatus("ready");
    place(heroEl.current, hero.current.x, hero.current.y);
    relocateGoal();
    addObstacle();
    addObstacle();
  }

  function reiniciar() {
    init();
    lanzar();
  }

  useEffect(() => {
    init();

    const kd = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
      keys.current.add(k);
    };
    const ku = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("resize", measure);

    const loop = () => {
      const { w, h } = dims.current;
      const S = sizeRef.current;
      if (w > 0 && running.current && !over.current) {
        const pspeed = 4.6 * (S / 76);
        let vx = 0;
        let vy = 0;
        const ks = keys.current;
        if (ks.has("arrowleft") || ks.has("a")) vx -= 1;
        if (ks.has("arrowright") || ks.has("d")) vx += 1;
        if (ks.has("arrowup") || ks.has("w")) vy -= 1;
        if (ks.has("arrowdown") || ks.has("s")) vy += 1;
        if (vx || vy) {
          const l = Math.hypot(vx, vy);
          vx = (vx / l) * pspeed;
          vy = (vy / l) * pspeed;
        } else if (touch.current) {
          const dx = touch.current.x - (hero.current.x + S / 2);
          const dy = touch.current.y - (hero.current.y + S / 2);
          const d = Math.hypot(dx, dy);
          if (d > 4) {
            vx = (dx / d) * pspeed;
            vy = (dy / d) * pspeed;
          }
        }
        hero.current.x = Math.max(0, Math.min(w - S, hero.current.x + vx));
        hero.current.y = Math.max(0, Math.min(h - S, hero.current.y + vy));
        if (vx) hero.current.face = vx < 0 ? -1 : 1;
        place(heroEl.current, hero.current.x, hero.current.y, hero.current.face);

        const hx = hero.current.x + S / 2;
        const hy = hero.current.y + S / 2;

        if (Math.hypot(hx - (goal.current.x + S / 2), hy - (goal.current.y + S / 2)) < S * 0.7) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          hearts(goal.current.x + S / 2, goal.current.y + S / 2);
          relocateGoal();
          addObstacle();
        }

        const r = S * 0.25;
        for (const o of obs.current) {
          o.x += o.vx;
          o.y += o.vy;
          if (o.x <= 0 || o.x >= w - 2 * r) o.vx *= -1;
          if (o.y <= 0 || o.y >= h - 2 * r) o.vy *= -1;
          o.x = Math.max(0, Math.min(w - 2 * r, o.x));
          o.y = Math.max(0, Math.min(h - 2 * r, o.y));
          o.el.style.transform = `translate(${o.x}px, ${o.y}px)`;
          if (Math.hypot(o.x + r - hx, o.y + r - hy) < S * 0.46 + r) {
            over.current = true;
            running.current = false;
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
      window.removeEventListener("resize", measure);
      obs.current.forEach((o) => o.el.remove());
      obs.current = [];
    };
  }, []);

  const setTouchFromEvent = (e: React.PointerEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) touch.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const wrap = { width: size, height: (size * 232) / 210 };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-sans text-marron">
        <span className="font-bold">💋 {score}</span>
        <span className="text-sm text-marron/70">{t("Récord", "Best")}: {best}</span>
      </div>

      <div
        ref={areaRef}
        className="patio-field relative h-[58svh] min-h-[300px] w-full touch-none select-none overflow-hidden rounded-3xl border-4 border-marron/20"
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

        <div ref={goalEl} className="pointer-events-none absolute left-0 top-0" style={wrap}>
          <DonPatacon className="h-full w-full drop-shadow-md" />
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-lg">💋</span>
        </div>

        <div ref={heroEl} className="pointer-events-none absolute left-0 top-0" style={wrap}>
          <DonaPatacona className="h-full w-full drop-shadow-md" />
        </div>

        {status === "ready" && count === null && (
          <BotonEmpezar
            onStart={lanzar}
            pista={t("Lleva a la Patacona hasta Don Patacón y esquiva los chiles.", "Guide the Patacona to Don Patacón and dodge the chilies.")}
          />
        )}
        {count !== null && <CuentaAtras n={count} />}

        {status === "over" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-marron/70 px-4 text-center text-crema backdrop-blur-sm">
            <p className="font-display text-3xl font-bold italic sm:text-4xl">{t("¡Ay, el chile! 🌶️", "Ouch, the chili! 🌶️")}</p>
            <p className="mt-2 font-sans text-lg">
              {t(`Repartiste ${score} besito${score === 1 ? "" : "s"} 💋`, `You gave ${score} kiss${score === 1 ? "" : "es"} 💋`)}
            </p>
            <button
              type="button"
              onClick={reiniciar}
              className="mt-6 rounded-full bg-mostaza px-7 py-3 font-sans text-lg font-bold text-marron transition-transform hover:scale-105 active:scale-95"
            >
              🔁 {t("Otra vez", "Again")}
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-sans text-sm text-marron/60">
        {t(
          "Lleva a la Patacona hasta Don Patacón para darle un besito 💋, ¡pero esquiva los chiles 🌶️! 🖥️ flechas/WASD · 📱 arrastra el dedo.",
          "Guide the Patacona to Don Patacón for a kiss 💋, but dodge the chilies 🌶️! 🖥️ arrows/WASD · 📱 drag your finger.",
        )}
      </p>
    </div>
  );
}
