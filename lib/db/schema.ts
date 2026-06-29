import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

/** Usuarios del panel de administración (Paco = admin, Javier = superadmin). */
export const usuarios = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  telefono: varchar("telefono", { length: 32 }),
  nombre: varchar("nombre", { length: 120 }).notNull(),
  rol: varchar("rol", { length: 20 }).notNull().default("admin"), // admin | superadmin
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Tokens de magic link (passwordless) por email o SMS. */
export const magicTokens = pgTable("magic_tokens", {
  id: serial("id").primaryKey(),
  usuarioId: integer("usuario_id")
    .notNull()
    .references(() => usuarios.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 128 }).notNull(),
  canal: varchar("canal", { length: 10 }).notNull(), // email | sms
  expiraEn: timestamp("expira_en", { withTimezone: true }).notNull(),
  usadoEn: timestamp("usado_en", { withTimezone: true }),
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Eventos / actuaciones del restaurante. */
export const eventos = pgTable("eventos", {
  id: serial("id").primaryKey(),
  titulo: varchar("titulo", { length: 200 }).notNull(),
  tituloEn: varchar("titulo_en", { length: 200 }),
  descripcion: text("descripcion").notNull(),
  descripcionEn: text("descripcion_en"),
  fecha: timestamp("fecha", { withTimezone: true }).notNull(),
  hora: varchar("hora", { length: 10 }),
  imagenUrl: varchar("imagen_url", { length: 500 }),
  enlace: varchar("enlace", { length: 500 }),
  publicado: boolean("publicado").notNull().default(true),
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Reseñas / libro de visitas (con moderación de Paco). */
export const resenas = pgTable("resenas", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  rating: integer("rating").notNull(), // 1-5
  comentario: text("comentario").notNull(),
  fotoUrl: varchar("foto_url", { length: 500 }),
  estado: varchar("estado", { length: 12 }).notNull().default("pendiente"), // pendiente | aprobada | rechazada
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Suscriptores de la newsletter. */
export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  estado: varchar("estado", { length: 12 }).notNull().default("suscrito"),
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Reservas de mesa. */
export const reservas = pgTable("reservas", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 120 }).notNull(),
  telefono: varchar("telefono", { length: 32 }).notNull(),
  email: varchar("email", { length: 255 }),
  fecha: varchar("fecha", { length: 10 }).notNull(), // YYYY-MM-DD
  hora: varchar("hora", { length: 5 }).notNull(), // HH:MM
  personas: integer("personas").notNull(),
  observaciones: text("observaciones"),
  estado: varchar("estado", { length: 12 }).notNull().default("pendiente"), // pendiente | confirmada | cancelada
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Galería de fotos del restaurante (sustituye el feed de Instagram). */
export const galeria = pgTable("galeria", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 500 }).notNull(),
  titulo: varchar("titulo", { length: 160 }),
  tituloEn: varchar("titulo_en", { length: 160 }),
  orden: integer("orden").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

/** Mejores puntuaciones de los juegos del patio (top 3 por juego). */
export const puntuaciones = pgTable("puntuaciones", {
  id: serial("id").primaryKey(),
  juego: varchar("juego", { length: 16 }).notNull(), // esquiva | tartazo | besito
  iniciales: varchar("iniciales", { length: 3 }).notNull(),
  puntos: integer("puntos").notNull(),
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
});

export type Usuario = typeof usuarios.$inferSelect;
export type Reserva = typeof reservas.$inferSelect;
export type Foto = typeof galeria.$inferSelect;
export type Puntuacion = typeof puntuaciones.$inferSelect;
export type Evento = typeof eventos.$inferSelect;
export type NuevoEvento = typeof eventos.$inferInsert;
export type Resena = typeof resenas.$inferSelect;
