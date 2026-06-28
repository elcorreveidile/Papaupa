import Header from "@/components/layout/Header";
import ReservasCliente from "@/components/sections/ReservasCliente";

export const metadata = {
  title: "Reservar mesa · Papaupa",
  description: "Reserva tu mesa en Papaupa, Realejo (Granada). Cocina colombiano-mediterránea.",
};

export default function ReservasPage() {
  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-reservas.jpg)" } as React.CSSProperties}
    >
      <Header />
      <ReservasCliente />
      <footer className="bg-marron py-8 text-center text-crema/80">
        <p className="font-display text-xl italic">Papaupa · Retro Fusión Food</p>
        <p className="mt-1 font-sans text-sm">
          Calle de los Molinos 16, Granada ·{" "}
          <a href="https://www.instagram.com/papauparetrofusionfood/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-mostaza hover:underline">
            @papauparetrofusionfood
          </a>
        </p>
      </footer>
    </div>
  );
}
