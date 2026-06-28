"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

export default function SubirFoto() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [titulo, setTitulo] = useState("");
  const [tituloEn, setTituloEn] = useState("");
  const [orden, setOrden] = useState(0);
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Elige una foto primero.");
      return;
    }

    setSubiendo(true);
    setProgreso(0);
    try {
      // 1) El navegador sube la foto directamente a Vercel Blob.
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/galeria/upload",
        onUploadProgress: (p) => setProgreso(Math.round(p.percentage)),
      });

      // 2) Damos de alta la foto en la galería con su URL definitiva.
      const res = await fetch("/api/galeria", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: blob.url, titulo, tituloEn, orden }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "No se pudo guardar la foto.");
      }

      // Limpia y refresca el listado.
      setTitulo("");
      setTituloEn("");
      setOrden(0);
      if (fileRef.current) fileRef.current.value = "";
      setOk(true);
      router.refresh();
    } catch (err) {
      setError((err as Error).message || "Error al subir la foto.");
    } finally {
      setSubiendo(false);
      setProgreso(0);
    }
  }

  const inputCls =
    "mt-1 w-full rounded-xl border-2 border-marron/20 px-3 py-2 focus:border-mostaza focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid gap-4 rounded-3xl border-2 border-mostaza/40 bg-mostaza/10 p-6 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <span className="font-sans text-sm font-semibold text-marron">📷 Subir foto desde el dispositivo</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="mt-2 block w-full font-sans text-sm text-marron file:mr-3 file:rounded-full file:border-0 file:bg-mostaza file:px-4 file:py-2 file:font-bold file:text-marron hover:file:bg-mostaza-osc"
        />
        <p className="mt-1 font-sans text-xs text-marron/60">
          Desde el móvil puedes elegir hacer una foto con la cámara o cogerla de la galería. Máx. 15 MB.
        </p>
      </div>
      <label className="block">
        <span className="font-sans text-sm font-semibold text-marron">Pie de foto (ES)</span>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className="font-sans text-sm font-semibold text-marron">Pie de foto (EN)</span>
        <input value={tituloEn} onChange={(e) => setTituloEn(e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className="font-sans text-sm font-semibold text-marron">Orden</span>
        <input
          type="number"
          value={orden}
          onChange={(e) => setOrden(Number(e.target.value))}
          className={inputCls}
        />
      </label>
      <div className="flex items-end">
        <button
          type="submit"
          disabled={subiendo}
          className="rounded-full bg-mostaza px-7 py-2.5 font-sans font-bold text-marron hover:bg-mostaza-osc disabled:opacity-50"
        >
          {subiendo ? `Subiendo… ${progreso}%` : "Subir foto"}
        </button>
      </div>

      {subiendo && (
        <div className="sm:col-span-2 h-2 overflow-hidden rounded-full bg-marron/10">
          <div className="h-full bg-mostaza transition-all" style={{ width: `${progreso}%` }} />
        </div>
      )}
      {error && <p className="sm:col-span-2 font-sans text-sm font-semibold text-terracota">⚠️ {error}</p>}
      {ok && <p className="sm:col-span-2 font-sans text-sm font-semibold text-verde">✓ Foto subida y publicada.</p>}
    </form>
  );
}
