import Link from "next/link";
import LogoMark from "./LogoMark";

const NAV = [
  { href: "#menu", label: "Menú" },
  { href: "#reservas", label: "Reservas" },
  { href: "#visitas", label: "Visitas" },
  { href: "#eventos", label: "Eventos" },
  { href: "#contacto", label: "Contacto" },
  { href: "/juegos", label: "El patio 🎮" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-marron/15 bg-crema/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-3 sm:flex-row sm:justify-between sm:gap-6">
        <Link href="/inicio" className="group flex items-center gap-2.5">
          <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:rotate-6" />
          <span className="flex flex-col">
            <span className="font-display text-2xl font-semibold leading-none text-marron">
              Papaupa
            </span>
            <span className="font-sans text-[0.6rem] uppercase tracking-[0.35em] text-terracota">
              retro&nbsp;fusión&nbsp;food
            </span>
          </span>
        </Link>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-sans text-sm font-medium text-marron/80">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors hover:text-terracota"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="rainbow-rule h-[2px] w-full opacity-70" />
    </header>
  );
}
