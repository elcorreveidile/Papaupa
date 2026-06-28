"use client";

import { useEffect, useRef, useState } from "react";
import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";
import { useLang } from "@/lib/i18n";
import { BotonEmpezar, CuentaAtras, useCuentaAtras } from "./Inicio";

const GAME_TIME = 30;
const COOLDOWN = 180;
const sizeFor = (w: number) => Math.max(34, Math.min(76, Math.round(w * 0.11)));

type Cake = { el: HTMLDivElement; x: number; y: number; vx: number; vy: number };

export default function JuegoTartazo() {
  const { t } = useLang();
  const areaRef = useRef<HTMLDivElement | null>(null);
  const cakeLayer = useRef<HTMLDivElement | null>(null);
  const foeEl = useRef<HTMLDivElement | null>(null);
  const dims = useRef({ w: 0, h: 0 });
  const sizeRef = useRef(60);
  const foe = useRef({ x: 0, y: 0, vx: 2.6, vy: 1.8 });
  const cakes = useRef<Cake[]>([]);
  const aim = useRef({ x: 0, y: 0 });
  const lastThrow = useRef(0);
  const startT = useRef(0);
  const over = useRef(false);
  const running = useRef(false);
  const scoreRef = useRef(0);
  const raf = useRef<number | null>(null);

  const [size, setSize] = useState(60);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_TIME);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"ready" | "playing" | "over">("ready");

  function empezar() {
    startT.current = performance.now();
    scoreRef.current = 0;
    setScore(0);
    setTime(GAME_TIME);
    over.current = false;
    running.current = true;
    setStatus("playing");
  }
  const { count, lanzar } = useCuentaAtras(empezar);

  function measure() {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) {
      dims.current = { w: r.width, h: r.height };
      const s = sizeFor(r.width);
      sizeRef.current = s;
      setSize(s);
    }
  }

  function origin() {
    return { x: dims.current.w / 2, y: dims.current.h - sizeRef.current * 0.7 };
  }

  function throwCake(tx: number, ty: number) {
    if (over.current || !running.current || !cakeLayer.current) return;
    const now = performance.now();
    if (now - lastThrow.current < COOLDOWN) return;
    lastThrow.current = now;
    const o = origin();
    const dx = tx - o.x;
    const dy = ty - o.y;
    const d = Math.hypot(dx, dy) || 1;
    const speed = 10 * (sizeRef.current / 76);
    const fs = Math.round(sizeRef.current * 0.42);
    const el = document.createElement("div");
    el.textContent = "🎂";
    el.style.cssText = `position:absolute;left:0;top:0;font-size:${fs}px;line-height:1;will-change:transform;pointer-events:none;`;
    cakeLayer.current.appendChild(el);
    cakes.current.push({ el, x: o.x, y: o.y, vx: (dx / d) * speed, vy: (dy / d) * speed });
  }

  function splat(x: number, y: number) {
    if (!cakeLayer.current) return;
    const s = document.createElement("div");
    s.textContent = "💥";
    s.className = "burst-particle";
    s.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${Math.round(sizeRef.current * 0.42)}px;--bx:0px;--by:-26px;pointer-events:none;`;
    cakeLayer.current.appendChild(s);
    window.setTimeout(() => s.remove(), 1000);
  }

  function init() {
    measure();
    const { w } = dims.current;
    const k = sizeRef.current / 76;
    foe.current = { x: w * 0.5 - sizeRef.current / 2, y: 24, vx: 2.8 * k, vy: 1.7 * k };
    cakes.current.forEach((c) => c.el.remove());
    cakes.current = [];
    aim.current = { x: w / 2, y: 40 };
    over.current = false;
    running.current = false;
    setScore(0);
    setTime(GAME_TIME);
    setStatus("ready");
  }

  function reiniciar() {
    init();
    lanzar();
  }

  useEffect(() => {
    init();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        throwCake(aim.current.x, aim.current.y);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", measure);

    const loop = () => {
      const { w, h } = dims.current;
      const S = sizeRef.current;
      if (w > 0 && running.current && !over.current) {
        const elapsed = (performance.now() - startT.current) / 1000;
        const left = Math.max(0, GAME_TIME - elapsed);
        const lt = Math.ceil(left);
        setTime((tm) => (tm !== lt ? lt : tm));
        if (left <= 0) {
          over.current = true;
          running.current = false;
          setBest((b) => Math.max(b, scoreRef.current));
          setStatus("over");
        }

        const f = foe.current;
        const limitY = h * 0.58;
        f.x += f.vx;
        f.y += f.vy;
        if (f.x <= 0) { f.x = 0; f.vx = Math.abs(f.vx); }
        else if (f.x >= w - S) { f.x = w - S; f.vx = -Math.abs(f.vx); }
        if (f.y <= 0) { f.y = 0; f.vy = Math.abs(f.vy); }
        else if (f.y >= limitY) { f.y = limitY; f.vy = -Math.abs(f.vy); }
        if (foeEl.current) foeEl.current.style.transform = `translate(${f.x}px, ${f.y}px) scaleX(${f.vx < 0 ? -1 : 1})`;

        const fcx = f.x + S / 2;
        const fcy = f.y + S / 2;
        for (let i = cakes.current.length - 1; i >= 0; i--) {
          const c = cakes.current[i];
          c.x += c.vx;
          c.y += c.vy;
          const r = S * 0.21;
          c.el.style.transform = `translate(${c.x - r}px, ${c.y - r}px)`;
          const hit = Math.hypot(c.x - fcx, c.y - fcy) < S * 0.5 + r;
          const outside = c.x < -30 || c.x > w + 30 || c.y < -30 || c.y > h + 30;
          if (hit || outside) {
            if (hit) {
              scoreRef.current += 1;
              setScore(scoreRef.current);
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
      window.removeEventListener("resize", measure);
      cakes.current.forEach((c) => c.el.remove());
      cakes.current = [];
    };
  }, []);

  const pointerXY = (e: React.PointerEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };

  const wrap = { width: size, height: (size * 232) / 210 };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-sans text-marron">
        <span className="font-bold">🎂 {score}</span>
        <span className="font-bold">⏱️ {time}s</span>
        <span className="text-sm text-marron/70">{t("Récord", "Best")}: {best}</span>
      </div>

      <div
        ref={areaRef}
        className="patio-field relative h-[58svh] min-h-[300px] w-full touch-none select-none overflow-hidden rounded-3xl border-4 border-marron/20"
        onPointerMove={(e) => (aim.current = pointerXY(e))}
        onPointerDown={(e) => {
          const p = pointerXY(e);
          aim.current = p;
          throwCake(p.x, p.y);
        }}
      >
        <div ref={cakeLayer} className="pointer-events-none absolute inset-0" />

        <div ref={foeEl} className="pointer-events-none absolute left-0 top-0" style={wrap}>
          <DonPatacon className="h-full w-full drop-shadow-md" />
        </div>

        <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2" style={wrap}>
          <DonaPatacona className="h-full w-full drop-shadow-md" />
        </div>

        {status === "ready" && count === null && (
          <BotonEmpezar
            onStart={lanzar}
            pista={t("Lánzale tartas a Don Patacón. Tienes 30 segundos.", "Throw cakes at Don Patacón. You've got 30 seconds.")}
          />
        )}
        {count !== null && <CuentaAtras n={count} />}

        {status === "over" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-marron/70 px-4 text-center text-crema backdrop-blur-sm">
            <p className="font-display text-3xl font-bold italic sm:text-4xl">{t("¡Se acabó el tiempo!", "Time's up!")}</p>
            <p className="mt-2 font-sans text-lg">
              {t(`Le diste ${score} tartazo${score === 1 ? "" : "s"} 🎂`, `You landed ${score} cake${score === 1 ? "" : "s"} 🎂`)}
            </p>
            <button
              type="button"
              onClick={reiniciar}
              className="mt-6 rounded-full bg-mostaza px-7 py-3 font-sans text-lg font-bold text-marron transition-transform hover:scale-105 active:scale-95"
            >
              🔁 {t("Otra ronda", "Another round")}
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-sans text-sm text-marron/60">
        {t(
          "📱 Toca donde quieras lanzar la tarta · 🖥️ apunta con el ratón y haz clic (o barra espaciadora). ¡Dale a Don Patacón!",
          "📱 Tap where you want to throw the cake · 🖥️ aim with the mouse and click (or spacebar). Hit Don Patacón!",
        )}
      </p>
    </div>
  );
}
