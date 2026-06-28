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
