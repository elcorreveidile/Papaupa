"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Devuelve el texto en el idioma activo. t("Hola", "Hi") */
  t: (es: string, en: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const s = localStorage.getItem("papaupa_lang");
      if (s === "en" || s === "es") setLangState(s);
    } catch {
      /* noop */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("papaupa_lang", l);
    } catch {
      /* noop */
    }
    document.documentElement.lang = l;
  };

  const t = (es: string, en: string) => (lang === "en" ? en : es);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return c;
}

/** Botón de cambio de idioma ES/EN. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
      className={`rounded-full border border-marron/30 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-marron/80 transition-colors hover:border-terracota hover:text-terracota ${className}`}
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
