import SelloECR from "@/components/marca/SelloECR";
import SimboloQPQ from "@/components/marca/SimboloQPQ";

/** Página TEMPORAL de previsualización del sello ECR y el símbolo QPQ. */
export default function SelloPreview() {
  return (
    <main className="min-h-svh bg-crema px-6 py-12">
      <h1 className="text-center font-display text-4xl font-semibold italic text-marron">
        Economía Circular · Sello + moneda QPQ
      </h1>

      {/* Sello: color, mono, multi-barrio */}
      <section className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
        <figure className="flex flex-col items-center gap-3 rounded-2xl border border-marron/15 bg-white/50 p-6">
          <SelloECR codigo="ECR" barrio="REALEJO" size={180} />
          <figcaption className="font-sans text-sm text-marron/70">Color · Realejo</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3 rounded-2xl border border-marron/15 bg-white/50 p-6">
          <SelloECR codigo="ECZ" barrio="ZAIDÍN" size={180} color="#a23818" />
          <figcaption className="font-sans text-sm text-marron/70">Otro color · Zaidín</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-3 rounded-2xl border border-marron/15 bg-marron p-6">
          <SelloECR codigo="ECR" barrio="REALEJO" size={180} color="#f5ecd7" />
          <figcaption className="font-sans text-sm text-crema/70">Mono sobre oscuro</figcaption>
        </figure>
      </section>

      {/* Sello a tamaño pequeño (sello/cuño real) */}
      <section className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-8 rounded-2xl border border-marron/15 bg-white/50 p-6">
        <SelloECR codigo="ECR" barrio="REALEJO" size={64} color="#1a1a1a" />
        <SelloECR codigo="ECR" barrio="REALEJO" size={44} color="#1a1a1a" />
        <span className="font-sans text-sm text-marron/60">A tamaño de sello/cuño (mono negro)</span>
      </section>

      {/* Símbolo QPQ */}
      <section className="mx-auto mt-8 max-w-4xl rounded-2xl border border-marron/15 bg-white/50 p-6">
        <h2 className="font-display text-2xl text-marron">Símbolo QPQ (moneda circular)</h2>
        <div className="mt-4 flex flex-wrap items-center gap-8">
          <SimboloQPQ size={88} />
          <SimboloQPQ size={48} color="#1a1a1a" />
          <SimboloQPQ size={28} color="#a23818" />
          <span className="inline-flex items-center gap-2 font-display text-3xl font-semibold text-marron">
            <SimboloQPQ size={34} /> 30 € = 1 QPQ
          </span>
        </div>
      </section>
    </main>
  );
}
