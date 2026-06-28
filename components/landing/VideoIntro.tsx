"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Vídeo de bienvenida a pantalla completa. Se muestra tras superar el juego
 * de entrada (o pulsar "Entra"); al terminar (o saltar) entra a /inicio.
 * En móvil cubre toda la pantalla; en escritorio se ve completo (letterbox).
 */
export default function VideoIntro({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const { t } = useLang();

  useEffect(() => {
    ref.current?.play().catch(() => {
      /* si el navegador bloquea el autoplay con sonido, el usuario puede tocar */
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black">
      <video
        ref={ref}
        src="/video/intro.mp4"
        autoPlay
        playsInline
        onEnded={onDone}
        onClick={() => {
          const v = ref.current;
          if (v?.paused) v.play().catch(() => {});
        }}
        className="h-full w-full object-cover sm:object-contain"
      />
      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-4 rounded-full bg-white/15 px-5 py-2 font-sans text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        {t("Saltar", "Skip")} →
      </button>
    </div>
  );
}
