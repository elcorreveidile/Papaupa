import Header from "@/components/layout/Header";
import ReservasCliente from "@/components/sections/ReservasCliente";
import SiteFooter from "@/components/layout/SiteFooter";

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
      <SiteFooter />
    </div>
  );
}
