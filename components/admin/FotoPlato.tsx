"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

/** Miniatura + subir/quitar foto de un plato (subida directa a Vercel Blob). */
export default function FotoPlato({ id, foto }: { id: number; foto: string | null }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendo(true);
    setError(false);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/galeria/upload",
      });
      const r = await fetch("/api/carta/foto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, url: blob.url }),
      });
      if (!r.ok) throw new Error();
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setSubiendo(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function quitar() {
    await fetch("/api/carta/foto", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, url: "" }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      {foto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto} alt="plato" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-marron/30 text-lg">
          🍽️
        </div>
      )}
      <div className="text-xs">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          className="block w-full font-sans text-xs text-marron file:mr-2 file:rounded-full file:border-0 file:bg-mostaza file:px-3 file:py-1 file:text-xs file:font-bold file:text-marron hover:file:bg-mostaza-osc"
        />
        {subiendo && <span className="font-sans text-marron/60">Subiendo…</span>}
        {error && <span className="font-sans text-terracota">Error al subir</span>}
        {foto && !subiendo && (
          <button type="button" onClick={quitar} className="font-sans text-terracota hover:underline">
            Quitar foto
          </button>
        )}
      </div>
    </div>
  );
}
