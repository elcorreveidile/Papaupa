import Header from "@/components/layout/Header";
import Nosotros from "@/components/sections/Nosotros";

export const metadata = {
  title: "Nosotros · Papaupa",
  description:
    "Paco y Margarita: cocina colombiano-mediterránea, casera y sin prisa, en el Realejo de Granada.",
};

export default function NosotrosPage() {
  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-nosotros.jpg)" } as React.CSSProperties}
    >
      <Header />
      <Nosotros />
      <footer className="bg-marron py-8 text-center text-crema/80">
        <p className="font-display text-xl italic">Papaupa · Retro Fusión Food</p>
        <p className="mt-1 font-sans text-sm">
          Calle de los Molinos 16, Granada ·{" "}
          <a
            href="https://www.instagram.com/papauparetrofusionfood/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-mostaza hover:underline"
          >
            @papauparetrofusionfood
          </a>
        </p>
      </footer>
    </div>
  );
}
