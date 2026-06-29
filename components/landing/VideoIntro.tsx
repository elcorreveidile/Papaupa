"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Vídeo de bienvenida a pantalla completa. Se muestra tras superar el juego
 * de entrada (o pulsar "Entra"); al terminar (o saltar) entra a /inicio.
 *
 * Clave en MÓVIL: el autoplay con sonido está bloqueado, así que arranca
 * SILENCIADO (eso sí lo permiten todos los navegadores) para que reproduzca y
 * avance solo. Botón "🔊 Sonido" para activar el audio. Además hay salvavidas
 * por tiempo y onError por si `onEnded` no se dispara (frecuente en iOS).
 */
export default function VideoIntro({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const doneRef = useRef(false);
  const { t } = useLang();
  const [conSonido, setConSonido] = useState(false);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // El prop `muted` de React no siempre aplica: lo forzamos por la propiedad.
    v.muted = true;
    v.play().catch(() => {
      /* algún navegador aún lo bloquea: el usuario puede tocar para reproducir */
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
    const next = !conSonido;
    setConSonido(next);
    v.muted = !next;
    v.play().catch(() => {});
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black">
      <video
        ref={ref}
        src="/video/intro.mp4"
        autoPlay
        muted
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
        {conSonido ? `🔇 ${t("Silenciar", "Mute")}` : `🔊 ${t("Sonido", "Sound")}`}
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
