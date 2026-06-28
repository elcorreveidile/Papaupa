import Link from "next/link";
import { requireSession } from "@/lib/auth/server";
import LogoMark from "@/components/layout/LogoMark";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <div className="min-h-svh bg-crema">
      <header className="sticky top-0 z-30 border-b border-marron/15 bg-crema/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-xl font-semibold text-marron">Admin</span>
            </Link>
            <nav className="flex gap-4 font-sans text-sm font-medium text-marron/80">
              <Link href="/admin" className="hover:text-terracota">Panel</Link>
              <Link href="/admin/eventos" className="hover:text-terracota">Eventos</Link>
              <Link href="/admin/visitas" className="hover:text-terracota">Reseñas</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 font-sans text-sm text-marron/70">
            <span>
              {session.nombre}
              <span className="ml-1 rounded-full bg-crema-oscura px-2 py-0.5 text-xs font-semibold text-marron/70">
                {session.rol}
              </span>
            </span>
            <a href="/api/auth/logout" className="font-semibold text-terracota hover:underline">
              Salir
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  );
}
