import { z } from "zod";

export const resenaSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  rating: z.number().int().min(1).max(5),
  comentario: z.string().trim().min(5).max(150),
});

export type ResenaInput = z.infer<typeof resenaSchema>;
