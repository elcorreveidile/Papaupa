import { db, usuarios, eventos, resenas } from "./index";
import { sql } from "drizzle-orm";

async function main() {
  // Usuarios del panel (idempotente por email).
  await db
    .insert(usuarios)
    .values([
      { email: "papauparetrofusionfood@gmail.com", nombre: "Paco", rol: "admin" },
      { email: "informa@blablaele.com", nombre: "Javier", rol: "superadmin" },
    ])
    .onConflictDoNothing({ target: usuarios.email });

  // Eventos de ejemplo (solo si no hay ninguno).
  const [{ count }] = await db.execute<{ count: number }>(
    sql`select count(*)::int as count from eventos`,
  );
  if (Number(count) === 0) {
    await db.insert(eventos).values([
      {
        titulo: "Jam Session en vivo",
        tituloEn: "Live Jam Session",
        descripcion: "Noche de música en directo con invitados sorpresa. Ven a cenar y quédate al concierto.",
        descripcionEn: "Live music night with surprise guests. Come for dinner and stay for the show.",
        fecha: new Date("2026-09-18T21:00:00"),
        hora: "21:00",
        publicado: true,
      },
      {
        titulo: "Noche colombiana",
        tituloEn: "Colombian Night",
        descripcion: "Menú especial colombiano, cócteles y música del Caribe. Plazas limitadas.",
        descripcionEn: "Special Colombian menu, cocktails and Caribbean music. Limited seats.",
        fecha: new Date("2026-10-03T20:30:00"),
        hora: "20:30",
        publicado: true,
      },
    ]);
  }

  // Reseñas de ejemplo (aprobadas) — solo si no hay ninguna.
  const [{ count: nResenas }] = await db.execute<{ count: number }>(
    sql`select count(*)::int as count from resenas`,
  );
  if (Number(nResenas) === 0) {
    await db.insert(resenas).values([
      { nombre: "María", email: "maria@example.com", rating: 5, comentario: "La mejor arepa que he comido en Granada. Paco y Margarita, un encanto.", estado: "aprobada" },
      { nombre: "Javier", email: "javier@example.com", rating: 5, comentario: "Ambiente acogedor y comida auténtica. Imprescindible en el Realejo.", estado: "aprobada" },
      { nombre: "Sofía", email: "sofia@example.com", rating: 4, comentario: "El ceviche es un sueño. Volveré con más gente.", estado: "aprobada" },
    ]);
  }

  const us = await db.select().from(usuarios);
  console.log(`✓ Usuarios: ${us.map((u) => `${u.nombre} (${u.rol})`).join(", ")}`);
  console.log(`✓ Eventos y reseñas sembrados.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
