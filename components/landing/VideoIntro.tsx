"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Vídeo de bienvenida a pantalla completa. Se muestra tras superar el juego
 * de entrada (o pulsar "Entra"); al terminar (o saltar) entra a /inicio.
 *
 * Arranca CON SONIDO (en iPhone funciona tras la interacción del juego de
 * entrada). Para que SIEMPRE avance solo aunque `onEnded` no se dispare
 * (frecuente en móvil), hay salvavidas por tiempo (duración +1,5 s) y onError.
 * Botón "🔇 Silenciar" por cortesía.
 */
export default function VideoIntro({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const doneRef = useRef(false);
  const { t } = useLang();
  const [silenciado, setSilenciado] = useState(false);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      /* si un navegador bloquea el autoplay con sonido, el usuario puede tocar */
    });

    // Salvavidas: si no llega `onEnded` (habitual en móvil), avanza igualmente.
    let timer = window.setTimeout(finish, 45000);
    const ajustar = () => {
      if (isFinite(v.duration) && v.duration > 0) {
        clearTimeout(timer);
        timer = window.setTimeout(finish, v.duration * 1000 + 1500);
      }
    };
    v.addEventListener("loadedmetadata", ajustar);
    if (v.readyState >= 1) ajustar();

    return () => {
      clearTimeout(timer);
      v.removeEventListener("loadedmetadata", ajustar);
    };
  }, []);

  function alternarSonido() {
    const v = ref.current;
    if (!v) return;
    const next = !silenciado;
    setSilenciado(next);
    v.muted = next;
    v.play().catch(() => {});
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black">
      <video
        ref={ref}
        src="/video/intro.mp4"
        autoPlay
        playsInline
        onEnded={finish}
        onError={finish}
        onClick={() => {
          const v = ref.current;
          if (v?.paused) v.play().catch(() => {});
        }}
        className="h-full w-full object-cover sm:object-contain"
      />

      <button
        type="button"
        onClick={alternarSonido}
        className="absolute bottom-4 left-4 rounded-full bg-white/15 px-5 py-2 font-sans text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        {silenciado ? `🔊 ${t("Sonido", "Sound")}` : `🔇 ${t("Silenciar", "Mute")}`}
      </button>

      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-4 rounded-full bg-white/15 px-5 py-2 font-sans text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        {t("Saltar", "Skip")} →
      </button>
    </div>
  );
}
