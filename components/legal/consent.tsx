"use client";

import { useEffect, useState } from "react";

export type Consent = "all" | "necesarias";
const KEY = "papaupa_cookies";
const EVT = "papaupa-cookies";

export function leerConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "all" || v === "necesarias" ? v : null;
}

export function guardarConsent(v: Consent) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent(EVT, { detail: v }));
}

/**
 * Estado de consentimiento reactivo. Devuelve `undefined` mientras se lee
 * (evita parpadeos en SSR/hidratación), luego `null` (sin decisión) o el valor.
 */
export function useConsent(): Consent | null | undefined {
  const [c, setC] = useState<Consent | null | undefined>(undefined);
  useEffect(() => {
    const sync = () => setC(leerConsent());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return c;
}
