"use client";

import { useEffect, useRef, useState } from "react";
import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";
import { useLang } from "@/lib/i18n";

const S = 76;
const PSPEED = 4.6;
const MAXFOES = 3;

type Foe = { x: number; y: number; vx: number; vy: number; active: boolean };

export default function JuegoEsquiva() {
  const { t } = useLang();
  const areaRef = useRef<HTMLDivElement | null>(null);
  const heroEl = useRef<HTMLDivElement | null>(null);
  const foeEls = useRef<(HTMLDivElement | null)[]>([]);
  const dims = useRef({ w: 0, h: 0 });
  const hero = useRef({ x: 0, y: 0, face: 1 });
  const heroV = useRef({ x: 0, y: 0 });
  const foes = useRef<Foe[]>([]);
  const keys = useRef<Set<string>>(new Set());
  const touch = useRef<{ x: number; y: number } | null>(null);
  const startT = useRef(0);
  const over = useRef(false);
  const scoreRef = useRef(0);
  const raf = useRef<number | null>(null);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [chasers, setChasers] = useState(1);
  const [status, setStatus] = useState<"playing" | "over">("playing");

  function place(el: HTMLDivElement | null, x: number, y: number, face = 1) {
    if (el) el.style.transform = `translate(${x}px, ${y}px) scaleX(${face})`;
  }

  function farCorner() {
    const { w, h } = dims.current;
    const hx = hero.current.x + S / 2;
    const hy = hero.current.y + S / 2;
    const corners = [
      { x: 0, y: 0 },
      { x: w - S, y: 0 },
      { x: 0, y: h - S },
      { x: w - S, y: h - S },
    ];
    corners.sort(
      (a, b) =>
        Math.hypot(b.x + S / 2 - hx, b.y + S / 2 - hy) -
        Math.hypot(a.x + S / 2 - hx, a.y + S / 2 - hy),
    );
    return corners[0];
  }

  function init() {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) dims.current = { w: r.width, h: r.height };
    const { w, h } = dims.current;
    hero.current = { x: w * 0.5 - S / 2, y: h * 0.72, face: 1 };
    heroV.current = { x: 0, y: 0 };
    foes.current = Array.from({ length: MAXFOES }, (_, i) => ({
      x: w * 0.5 - S / 2,
      y: h * 0.12,
      vx: 0,
      vy: 0,
      active: i === 0,
    }));
    startT.current = performance.now();
    scoreRef.current = 0;
    over.current = false;
    setScore(0);
    setChasers(1);
    setStatus("playing");
    place(heroEl.current, hero.current.x, hero.current.y);
    foes.current.forEach((f, i) => place(foeEls.current[i], f.x, f.y));
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
        const elapsed = (performance.now() - startT.current) / 1000;

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
        heroV.current = { x: vx, y: vy };
        hero.current.x = Math.max(0, Math.min(w - S, hero.current.x + vx));
        hero.current.y = Math.max(0, Math.min(h - S, hero.current.y + vy));
        if (vx) hero.current.face = vx < 0 ? -1 : 1;
        place(heroEl.current, hero.current.x, hero.current.y, hero.current.face);

        const px = hero.current.x + S / 2;
        const py = hero.current.y + S / 2;

        // --- Perseguidores (refuerzos según el tiempo) ---
        const want = 1 + (elapsed > 14 ? 1 : 0) + (elapsed > 28 ? 1 : 0);
        if (want !== chasers) setChasers(want);
        const es = Math.min(7, 3 + elapsed * 0.07); // aceleran con el tiempo

        for (let i = 0; i < MAXFOES; i++) {
          const f = foes.current[i];
          if (i < want && !f.active) {
            const c = farCorner();
            f.x = c.x;
            f.y = c.y;
            f.vx = 0;
            f.vy = 0;
            f.active = true;
          }
          if (!f.active) {
            if (foeEls.current[i]) foeEls.current[i]!.style.opacity = "0";
            continue;
          }
          if (foeEls.current[i]) foeEls.current[i]!.style.opacity = "1";

          const ex = f.x + S / 2;
          const ey = f.y + S / 2;
          const dx = px - ex;
          const dy = py - ey;
          const d = Math.hypot(dx, dy) || 1;
          // Persecución con PREDICCIÓN: apunta a donde estarás (intercepta los círculos)
          const lead = Math.min(24, d / Math.max(es, 0.5));
          const tx = px + heroV.current.x * lead;
          const ty = py + heroV.current.y * lead;
          const tdx = tx - ex;
          const tdy = ty - ey;
          const td = Math.hypot(tdx, tdy) || 1;
          f.vx += ((tdx / td) * es - f.vx) * 0.13;
          f.vy += ((tdy / td) * es - f.vy) * 0.13;
          f.x = Math.max(0, Math.min(w - S, f.x + f.vx));
          f.y = Math.max(0, Math.min(h - S, f.y + f.vy));
          place(foeEls.current[i], f.x, f.y, f.vx < 0 ? -1 : 1);

          if (d < S * 0.58) {
            over.current = true;
            setBest((b) => Math.max(b, scoreRef.current));
            setStatus("over");
          }
        }

        const s = Math.floor(elapsed);
        if (s !== scoreRef.current) {
          scoreRef.current = s;
          setScore(s);
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
    };
  }, []);

  const setTouchFromEvent = (e: React.PointerEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (r) touch.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-sans text-marron">
        <span className="font-bold">⏱️ {score}s</span>
        <span className="text-sm font-semibold text-terracota">
          {chasers} {t(chasers === 1 ? "perseguidor" : "perseguidores", chasers === 1 ? "chaser" : "chasers")}
        </span>
        <span className="text-sm text-marron/70">{t("Récord", "Best")}: {best}s</span>
      </div>

      <div
        ref={areaRef}
        className="patio-field relative h-[62svh] min-h-[340px] w-full touch-none select-none overflow-hidden rounded-3xl border-4 border-marron/20"
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
        {Array.from({ length: MAXFOES }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              foeEls.current[i] = el;
            }}
            className="pointer-events-none absolute left-0 top-0"
            style={{ width: S, height: (S * 232) / 210, opacity: i === 0 ? 1 : 0 }}
          >
            <DonPatacon className="h-full w-full drop-shadow-md" />
          </div>
        ))}
        <div ref={heroEl} className="pointer-events-none absolute left-0 top-0" style={{ width: S, height: (S * 232) / 210 }}>
          <DonaPatacona className="h-full w-full drop-shadow-md" />
        </div>

        {status === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-marron/70 text-center text-crema backdrop-blur-sm">
            <p className="font-display text-4xl font-bold italic">{t("¡Te pillaron! 😵", "You got caught! 😵")}</p>
            <p className="mt-2 font-sans text-lg">{t(`Aguantaste ${score} segundos`, `You lasted ${score} seconds`)}</p>
            <button
              type="button"
              onClick={init}
              className="mt-6 rounded-full bg-mostaza px-7 py-3 font-sans text-lg font-bold text-marron transition-transform hover:scale-105 active:scale-95"
            >
              🔁 {t("Jugar otra vez", "Play again")}
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-sans text-sm text-marron/60">
        {t(
          "🖥️ Flechas o WASD · 📱 arrastra el dedo. Don Patacón anticipa tus movimientos y llegan refuerzos… ¡no te confíes!",
          "🖥️ Arrow keys or WASD · 📱 drag your finger. Don Patacón predicts your moves and backup arrives… don't get cocky!",
        )}
      </p>
    </div>
  );
}
