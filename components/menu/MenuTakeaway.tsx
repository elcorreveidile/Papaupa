"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LogoMark from "@/components/layout/LogoMark";
import { LangToggle, useLang } from "@/lib/i18n";
import { PACO_WHATSAPP } from "@/lib/constants";
import { CARTA, GLOSARIO, formatPrecio, platoPorId, type Plato } from "@/lib/menu";

const HORAS = (() => {
  const out: string[] = [];
  for (let h = 13; h <= 22; h++) {
    out.push(`${h}:00`);
    if (h < 22) out.push(`${h}:30`);
  }
  return out;
})();

export default function MenuTakeaway() {
  const { lang, t } = useLang();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState<{ nombre: string; hora: string } | null>(null);

  const nm = (p: Plato) => (lang === "en" ? p.nombreEn : p.nombre);
  const ds = (p: Plato) => (lang === "en" ? p.descEn : p.desc);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id: string) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1;
      const x = { ...c };
      if (n <= 0) delete x[id];
      else x[id] = n;
      return x;
    });

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ p: platoPorId(id), qty }))
        .filter((x): x is { p: NonNullable<ReturnType<typeof platoPorId>>; qty: number } => Boolean(x.p)),
    [cart],
  );
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.p.precio, 0);

  function confirmar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") || "");
    const telefono = String(fd.get("telefono") || "");
    const hora = String(fd.get("hora") || "");
    const notas = String(fd.get("notas") || "");

    // Mensaje a Paco SIEMPRE en español (es quien lo recibe).
    const lineas = items.map((i) => `• ${i.qty}x ${i.p.nombre} (${formatPrecio(i.p.precio * i.qty)})`).join("\n");
    const msg =
      `¡Hola Papaupa! Quiero hacer un pedido para recoger:\n\n${lineas}\n\n` +
      `Total: ${formatPrecio(total)}\n` +
      `Nombre: ${nombre}\n` +
      `Teléfono: ${telefono}\n` +
      `Hora de recogida: ${hora}` +
      (notas ? `\nNotas: ${notas}` : "");
    const url = `https://wa.me/${PACO_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");

    setOrdered({ nombre, hora });
    setCart({});
    setCheckout(false);
    setCartOpen(false);
  }

  return (
    <div
      className="fondo min-h-svh pb-24"
      style={{ "--fondo-img": "url(/images/fondo-menu.jpg)" } as React.CSSProperties}
    >
      {/* Barra superior */}
      <header className="sticky top-0 z-30 border-b border-marron/15 bg-crema/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/inicio" className="flex items-center gap-2">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-xl font-semibold text-marron">Papaupa</span>
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-mostaza px-5 py-2 font-sans font-bold text-marron transition-transform hover:scale-105"
            >
              🛒 {t("Pedido", "Order")}
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-terracota px-1.5 text-xs font-bold text-crema">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 pb-3">
          {CARTA.map((c) => (
            <a
              key={c.id}
              href={`#cat-${c.id}`}
              className="whitespace-nowrap rounded-full border border-marron/20 px-4 py-1.5 font-sans text-sm font-medium text-marron/80 transition-colors hover:border-terracota hover:text-terracota"
            >
              {c.emoji} {lang === "en" ? c.tituloEn : c.titulo}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-5">
        <h1 className="mt-8 font-display text-4xl font-semibold italic text-marron sm:text-5xl">
          {t("La carta", "Our menu")}
        </h1>
        <p className="mt-2 font-sans text-marron/70">
          {t(
            "Cocina casera colombiano-mediterránea. Pide para recoger y paga al recoger 🛍️",
            "Homemade Colombian-Mediterranean cooking. Order for pickup and pay when you collect 🛍️",
          )}
        </p>

        {CARTA.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32 pt-10">
            <div className="flex items-baseline justify-between border-b-2 border-marron/15 pb-2">
              <h2 className="font-display text-2xl font-semibold text-marron">
                {cat.emoji} {lang === "en" ? cat.tituloEn : cat.titulo}
              </h2>
              {!cat.takeaway && (
                <span className="font-sans text-xs uppercase tracking-wider text-marron/50">
                  {t("solo en sala", "dine-in only")}
                </span>
              )}
            </div>
            <ul className="mt-4 divide-y divide-marron/10">
              {cat.platos.map((p) => {
                const qty = cart[p.id] || 0;
                const desc = ds(p);
                return (
                  <li key={p.id} className="flex items-center gap-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-sans font-semibold text-marron">{nm(p)}</p>
                      {desc && <p className="font-sans text-sm text-marron/60">{desc}</p>}
                    </div>
                    <span className="shrink-0 font-sans font-bold text-terracota">{formatPrecio(p.precio)}</span>
                    {cat.takeaway &&
                      (qty > 0 ? (
                        <div className="flex shrink-0 items-center gap-2">
                          <button type="button" onClick={() => dec(p.id)} aria-label={t("Quitar uno", "Remove one")} className="h-8 w-8 rounded-full bg-crema-oscura font-bold text-marron hover:bg-mostaza">
                            −
                          </button>
                          <span className="w-5 text-center font-bold text-marron">{qty}</span>
                          <button type="button" onClick={() => add(p.id)} aria-label={t("Añadir uno", "Add one")} className="h-8 w-8 rounded-full bg-mostaza font-bold text-marron hover:bg-mostaza-osc">
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => add(p.id)}
                          className="shrink-0 rounded-full border-2 border-mostaza px-4 py-1.5 font-sans text-sm font-bold text-marron transition-colors hover:bg-mostaza"
                        >
                          {t("Añadir", "Add")}
                        </button>
                      ))}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {/* Glosario */}
        <section className="mt-14 rounded-3xl bg-crema-oscura/40 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-marron">📖 {t("Glosario", "Glossary")}</h2>
          <p className="mt-1 font-sans text-sm text-marron/60">
            {t("Para que ningún plato te suene a chino (sino a colombiano).", "So no dish sounds foreign — just deliciously Colombian.")}
          </p>
          <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {GLOSARIO.map((g) => (
              <div key={g.termino}>
                <dt className="font-sans font-bold text-marron">{lang === "en" ? g.terminoEn : g.termino}</dt>
                <dd className="font-sans text-sm text-marron/70">{lang === "en" ? g.definicionEn : g.definicion}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-10 text-center font-sans text-sm text-marron/50">
          {t("Disponemos de carta de alérgenos. Precios con IVA incluido.", "Allergen information available. Prices include VAT.")}
        </p>
      </main>

      {/* Barra flotante */}
      {count > 0 && !cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-terracota px-7 py-3 font-sans font-bold text-crema shadow-lg transition-transform hover:scale-105"
        >
          {t("Ver pedido", "View order")} · {count} · {formatPrecio(total)}
        </button>
      )}

      {/* Cajón del carrito */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-label={t("Tu pedido", "Your order")}>
          <div className="absolute inset-0 bg-marron/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative flex h-full w-full max-w-md flex-col bg-crema shadow-2xl">
            <div className="flex items-center justify-between border-b border-marron/15 px-5 py-4">
              <h2 className="font-display text-2xl font-semibold text-marron">{t("Tu pedido", "Your order")}</h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label={t("Cerrar", "Close")} className="text-2xl text-marron/60 hover:text-marron">
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <LogoMark className="h-16 w-16 opacity-40" />
                <p className="font-sans text-marron/60">{t("Aún no has añadido nada. ¡A la carta!", "Nothing here yet. Dig into the menu!")}</p>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-marron/10 overflow-y-auto px-5">
                  {items.map(({ p, qty }) => (
                    <li key={p.id} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans font-semibold text-marron">{nm(p)}</p>
                        <p className="font-sans text-sm text-marron/60">{formatPrecio(p.precio)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => dec(p.id)} className="h-7 w-7 rounded-full bg-crema-oscura font-bold text-marron hover:bg-mostaza">−</button>
                        <span className="w-5 text-center font-bold text-marron">{qty}</span>
                        <button type="button" onClick={() => add(p.id)} className="h-7 w-7 rounded-full bg-mostaza font-bold text-marron hover:bg-mostaza-osc">+</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-marron/15 px-5 py-4">
                  <div className="flex items-center justify-between font-display text-xl font-semibold text-marron">
                    <span>{t("Total", "Total")}</span>
                    <span>{formatPrecio(total)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCheckout(true)}
                    className="mt-4 w-full rounded-full bg-mostaza py-3 font-sans text-lg font-bold text-marron transition-colors hover:bg-mostaza-osc"
                  >
                    {t("Pedir para recoger", "Order for pickup")}
                  </button>
                  <p className="mt-2 text-center font-sans text-xs text-marron/50">{t("Pagas en el local al recoger", "Pay in store when you collect")}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout */}
      {checkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-label={t("Datos de recogida", "Pickup details")}>
          <div className="absolute inset-0 bg-marron/60 backdrop-blur-sm" onClick={() => setCheckout(false)} />
          <form onSubmit={confirmar} className="relative w-full max-w-md rounded-3xl bg-crema p-6 shadow-2xl">
            <h2 className="font-display text-2xl font-semibold text-marron">{t("Recogida en Papaupa", "Pickup at Papaupa")}</h2>
            <p className="mt-1 font-sans text-sm text-marron/60">
              {t("Calle de los Molinos 16, Realejo · pagas al recoger.", "Calle de los Molinos 16, Realejo · pay on pickup.")}
            </p>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Nombre", "Name")} *</span>
                <input name="nombre" required className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none" />
              </label>
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Teléfono", "Phone")} *</span>
                <input name="telefono" type="tel" required className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none" />
              </label>
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Hora de recogida", "Pickup time")} *</span>
                <select name="hora" required defaultValue="" className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none">
                  <option value="" disabled>{t("Elige una hora", "Choose a time")}</option>
                  {HORAS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="font-sans text-sm font-semibold text-marron">{t("Notas (alergias, etc.)", "Notes (allergies, etc.)")}</span>
                <textarea name="notas" rows={2} className="mt-1 w-full rounded-xl border-2 border-marron/20 px-4 py-2 focus:border-mostaza focus:outline-none" />
              </label>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-marron">{formatPrecio(total)}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setCheckout(false)} className="rounded-full px-4 py-2 font-sans font-semibold text-marron/70 hover:text-marron">
                  {t("Atrás", "Back")}
                </button>
                <button type="submit" className="rounded-full bg-[#25D366] px-6 py-2 font-sans font-bold text-white hover:brightness-95">
                  {t("Enviar por WhatsApp", "Send via WhatsApp")}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Confirmación */}
      {ordered && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-marron/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-3xl bg-crema p-8 text-center shadow-2xl">
            <p className="text-5xl">🍌</p>
            <h2 className="mt-3 font-display text-3xl font-semibold italic text-marron">{t("¡Casi listo!", "Almost there!")}</h2>
            <p className="mt-2 font-sans text-marron/80">
              {t(
                `Se ha abierto WhatsApp con tu pedido para las ${ordered.hora}. Solo tienes que darle a enviar para confirmar con Paco.`,
                `WhatsApp has opened with your order for ${ordered.hora}. Just hit send to confirm with Paco.`,
              )}
            </p>
            <p className="mt-1 font-sans text-sm text-marron/60">{t("Pagas en el local al recoger.", "Pay in store when you collect.")}</p>
            <button
              type="button"
              onClick={() => setOrdered(null)}
              className="mt-6 rounded-full bg-mostaza px-7 py-3 font-sans font-bold text-marron hover:bg-mostaza-osc"
            >
              {t("Seguir mirando la carta", "Back to the menu")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
