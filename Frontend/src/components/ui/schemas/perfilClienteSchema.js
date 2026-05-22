import { z } from 'zod';

export const perfilClienteSchema = z.object({
  bio: z
    .string()
    .max(500, 'A bio deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
});
