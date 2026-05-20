import { api } from './api'

export const perfilService = {
  buscarFreelancers: ({ busca = '', pagina = 0, limite = 10 } = {}) =>
    api.get(`/perfis/freelancer?busca=${encodeURIComponent(busca)}&pagina=${pagina}&limite=${limite}`),

  buscarFreelancerPorId: (id) => api.get(`/perfis/freelancer/${id}`),

  meuPerfilFreelancer: () => api.get('/perfis/freelancer/me'),

  atualizarFreelancer: (body) => api.patch('/perfis/freelancer/me', body),

  meuPerfilCliente: () => api.get('/perfis/cliente/me'),

  atualizarCliente: (body) => api.patch('/perfis/cliente/me', body),
}
