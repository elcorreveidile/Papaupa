import Link from "next/link";
import PatioJuegos from "@/components/juegos/PatioJuegos";

export const metadata = {
  title: "El patio de Papaupa · Juegos",
  description:
    "La zona de juegos de Papaupa: juega con Don Patacón y la Patacona. Para los más peques (y los no tan peques).",
};

export default function Juegos() {
  return (
    <div className="min-h-svh bg-crema">
      <header className="border-b border-marron/15 bg-crema/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link
            href="/inicio"
            className="font-sans text-sm font-medium text-marron/80 transition-colors hover:text-terracota"
          >
            ← Volver
          </Link>
          <span className="font-display text-xl font-semibold text-marron">
            El patio de Papaupa
          </span>
          <span className="w-16" aria-hidden />
        </div>
        <div className="rainbow-rule h-[2px] w-full opacity-70" />
      </header>

      <main className="px-5 py-10">
        <h1 className="text-center font-display text-4xl font-semibold italic text-marron sm:text-5xl">
          ¡A jugar!
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center font-sans text-marron/70">
          Ponte a los mandos de la Patacona. Esquiva a Don Patacón cuando te
          persigue… o cógela tú y lánzale tartas. ¡Elige juego!
        </p>

        <div className="mt-8">
          <PatioJuegos />
        </div>
      </main>
    </div>
  );
}
