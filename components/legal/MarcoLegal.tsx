import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";

export default function MarcoLegal({
  titulo,
  actualizado,
  children,
}: {
  titulo: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fondo min-h-svh"
      style={{ "--fondo-img": "url(/images/fondo-inicio.jpg)" } as React.CSSProperties}
    >
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <article className="rounded-3xl border border-marron/15 bg-crema/92 p-6 shadow-lg backdrop-blur sm:p-10">
          <h1 className="font-display text-4xl font-semibold italic text-marron sm:text-5xl">{titulo}</h1>
          <p className="mt-2 font-sans text-sm text-marron/50">Última actualización: {actualizado}</p>
          <div className="rainbow-rule mt-4 h-1 w-32 rounded-full" />
          <div
            className="mt-6 font-sans leading-relaxed text-marron/80
              [&_a]:text-terracota [&_a]:underline [&_a]:underline-offset-2
              [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-marron
              [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:font-bold [&_h3]:text-marron
              [&_li]:mb-1
              [&_p]:mb-3
              [&_strong]:text-marron
              [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6
              [&_.ph]:rounded [&_.ph]:border-b [&_.ph]:border-dashed [&_.ph]:border-mostaza-osc [&_.ph]:bg-mostaza/30 [&_.ph]:px-1.5 [&_.ph]:font-bold [&_.ph]:text-marron"
          >
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
