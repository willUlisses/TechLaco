import { z } from 'zod'

export const criarProjetoSchema = z.object({
  titulo:    z.string().min(1, 'Título obrigatório'),
  descricao: z.string().min(1, 'Descrição obrigatória'),
  nivel:     z.enum(['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'], {
    errorMap: () => ({ message: 'Selecione um nível' }),
  }),
  valorMin: z.coerce.number().positive('Deve ser maior que zero'),
  valorMax: z.coerce.number().positive('Deve ser maior que zero'),
}).refine(d => d.valorMax >= d.valorMin, {
  message: 'O valor máximo deve ser maior ou igual ao mínimo',
  path: ['valorMax'],
})

export const editarProjetoSchema = z.object({
  titulo:           z.string().min(1, 'Título é obrigatório').max(100, 'Máximo de 100 caracteres'),
  descricao:        z.string().max(500, 'Máximo de 500 caracteres').optional().or(z.literal('')),
  nivel:            z.enum(['INICIANTE', 'INTERMEDIARIO', 'AVANCADO'], {
    errorMap: () => ({ message: 'Selecione um nível válido' }),
  }),
  valorMin:         z.coerce.number({ invalid_type_error: 'Digite um valor válido' }).positive('Deve ser maior que zero'),
  valorMax:         z.coerce.number({ invalid_type_error: 'Digite um valor válido' }).positive('Deve ser maior que zero'),
  tecnologiasInput: z.string().optional().or(z.literal('')),
}).refine(
  data => data.valorMax >= data.valorMin,
  { message: 'O valor máximo deve ser maior ou igual ao mínimo', path: ['valorMax'] }
)
