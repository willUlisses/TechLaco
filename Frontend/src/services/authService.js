import { api } from './api'

export const authService = {
  cadastrar: (body) => api.post('/auth/cadastro', body, { auth: false }),
  login: (body) => api.post('/auth/login', body, { auth: false }),
  me: () => api.get('/auth/me'),
}

