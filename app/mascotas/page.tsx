import DonPatacon from "@/components/landing/DonPatacon";
import DonaPatacona from "@/components/landing/DonaPatacona";

/**
 * Página TEMPORAL de previsualización de mascotas (para revisar parecido).
 * Se elimina cuando estén validadas.
 */
export default function Mascotas() {
  return (
    <main className="min-h-svh bg-crema px-6 py-16">
      <h1 className="text-center font-display text-4xl font-semibold italic text-marron">
        Las mascotas de Papaupa
      </h1>
      <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
        <figure className="flex flex-col items-center rounded-3xl border border-marron/15 bg-crema-oscura/40 p-8">
          <DonPatacon size={220} />
          <figcaption className="mt-4 font-display text-2xl text-marron">
            Don Patacón
          </figcaption>
          <p className="font-sans text-sm text-marron/70">Paco · en la puerta</p>
        </figure>
        <figure className="flex flex-col items-center rounded-3xl border border-marron/15 bg-crema-oscura/40 p-8">
          <DonaPatacona size={220} />
          <figcaption className="mt-4 font-display text-2xl text-marron">
            La Patacona
          </figcaption>
          <p className="font-sans text-sm text-marron/70">
            La cocinera colombiana · su pareja
          </p>
        </figure>
      </div>
    </main>
  );
}
