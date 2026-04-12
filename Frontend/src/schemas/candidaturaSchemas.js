import { z } from 'zod'

export const criarCandidaturaSchema = z.object({
  mensagem: z.string().min(1, 'Mensagem obrigatória'),
})

export const statusCandidaturaSchema = z.object({
  status: z.enum(['VISUALIZADA', 'ACEITA', 'RECUSADA'], {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
})
