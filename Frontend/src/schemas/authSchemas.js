import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
  senha: z.string().min(1, 'Senha obrigatória'),
})

export const cadastroSchema = z.object({
  nome:         z.string().min(1, 'Nome obrigatório'),
  sobrenome:    z.string().min(1, 'Sobrenome obrigatório'),
  email:        z.string().min(1, 'Email obrigatório').email('Email inválido'),
  senha:        z.string().min(8, 'Mínimo de 8 caracteres'),
  isFreelancer: z.boolean(),
})
