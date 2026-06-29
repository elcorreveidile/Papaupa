import Header from "@/components/layout/Header";
import Nosotros from "@/components/sections/Nosotros";
import SiteFooter from "@/components/layout/SiteFooter";

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
      <SiteFooter />
    </div>
  );
}
