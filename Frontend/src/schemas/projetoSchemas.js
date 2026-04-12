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
  titulo:    z.string().max(100, 'Máximo de 100 caracteres').optional(),
  descricao: z.string().max(500, 'Máximo de 500 caracteres').optional(),
  nivel:     z.enum(['INICIANTE', 'INTERMEDIARIO', 'AVANCADO']).optional(),
  valorMin:  z.coerce.number().positive('Deve ser maior que zero').optional(),
  valorMax:  z.coerce.number().positive('Deve ser maior que zero').optional(),
}).refine(
  data => {
    if (data.valorMin && data.valorMax) return data.valorMax >= data.valorMin
    return true
  },
  { message: 'O valor máximo deve ser maior ou igual ao mínimo', path: ['valorMax'] }
)
