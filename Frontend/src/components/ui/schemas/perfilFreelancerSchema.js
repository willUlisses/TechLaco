import { z } from 'zod';

export const perfilFreelancerSchema = z.object({
  especialidade: z.string().max(100, 'Máximo 100 caracteres').optional().or(z.literal('')),
  faculdade:     z.string().max(100, 'Máximo 100 caracteres').optional().or(z.literal('')),
  bio:           z.string().max(500, 'Máximo 500 caracteres').optional().or(z.literal('')),
  githubUrl:     z.string().url('URL inválida').optional().or(z.literal('')),
  novaHabilidade: z.string().max(60, 'Máximo 60 caracteres').optional().or(z.literal('')),
});
