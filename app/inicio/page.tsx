import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Contacto from "@/components/sections/Contacto";

export default function Inicio() {
  return (
    <div className="min-h-svh bg-crema">
      <Header />
      <Hero />

      {/* Marcador de posición para las siguientes secciones (próxima fase) */}
      <section
        id="menu"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 text-center"
      >
        <p className="font-display text-2xl italic text-marron/50">
          Menú, visitas, eventos y reservas — próximamente.
        </p>
      </section>

      <Contacto />

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
