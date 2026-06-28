import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { db, eventos, resenas } from "@/lib/db";
import { getSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getSession();
  const [{ value: numEventos }] = await db.select({ value: count() }).from(eventos);
  const [{ value: numResenasPend }] = await db
    .select({ value: count() })
    .from(resenas)
    .where(eq(resenas.estado, "pendiente"));

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold italic text-marron">
        ¡Hola, {session?.nombre}! 👋
      </h1>
      <p className="mt-1 font-sans text-marron/60">Este es el panel de Papaupa.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/eventos"
          className="rounded-3xl border border-marron/15 bg-white/60 p-6 shadow-sm transition-transform hover:-translate-y-1"
        >
          <p className="font-sans text-sm uppercase tracking-wide text-terracota">Eventos</p>
          <p className="mt-1 font-display text-4xl font-semibold text-marron">{numEventos}</p>
          <p className="mt-1 font-sans text-sm text-marron/60">Gestionar eventos y actuaciones →</p>
        </Link>

        <div className="rounded-3xl border border-marron/15 bg-white/60 p-6 shadow-sm">
          <p className="font-sans text-sm uppercase tracking-wide text-terracota">Reseñas pendientes</p>
          <p className="mt-1 font-display text-4xl font-semibold text-marron">{numResenasPend}</p>
          <p className="mt-1 font-sans text-sm text-marron/60">Moderación (próximamente)</p>
        </div>
      </div>
    </div>
  );
}
