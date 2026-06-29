import { z } from "zod";

export const resenaSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  rating: z.number().int().min(1).max(5),
  comentario: z.string().trim().min(5).max(150),
  fotoUrl: z.union([z.string().trim().url(), z.literal("")]).optional(),
});

export type ResenaInput = z.infer<typeof resenaSchema>;

export const reservaSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  telefono: z.string().trim().min(6).max(32),
  email: z.union([z.string().trim().email(), z.literal("")]).optional(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora: z.string().regex(/^\d{2}:\d{2}$/),
  personas: z.number().int().min(1).max(20),
  observaciones: z.string().trim().max(300).optional(),
});

export type ReservaInput = z.infer<typeof reservaSchema>;

export const contactoSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  asunto: z.string().trim().max(160).optional(),
  mensaje: z.string().trim().min(5).max(2000),
});

export type ContactoInput = z.infer<typeof contactoSchema>;

export const puntuacionSchema = z.object({
  juego: z.enum(["esquiva", "tartazo", "besito"]),
  iniciales: z.string().trim().min(1).max(3),
  puntos: z.number().int().min(0).max(1000000),
});

export type PuntuacionInput = z.infer<typeof puntuacionSchema>;
