import { api } from './api'

export const projetoService = {
  buscarAtivos: ({ busca = '', pagina = 0, tamanho = 10 } = {}) => {
    const url = `/projetos?busca=${encodeURIComponent(busca)}&pagina=${pagina}&tamanho=${tamanho}`;
    return api.get(url);
  },

  buscarPorId: (id) => api.get(`/projetos/${id}`),

  meus: () => api.get('/projetos/meus'),

  publicar: (body) => api.post('/projetos', body),

  editar: (id, body) => api.patch(`/projetos/${id}`, body),

  cancelar: (id) => api.delete(`/projetos/${id}`),
}
