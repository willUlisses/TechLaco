import { api } from './api'
export const candidaturaService = {
  // Retorna DadosCandidaturaResponse: { id, projetoId, tituloProjeto, status, mensagem }
  candidatar: (projetoId, body) => api.post(`/candidaturas/${projetoId}`, body),

  // Retorna List<DadosCandidaturaResponse>
  minhas: (status) => api.get(`/candidaturas/minhas${status ? `?status=${status}` : ''}`),

  // Retorna List<CandidaturasProjetoResponse>: { id, status, mensagem, freelancer: { id, nome, especialidade, githubUrl } }
  doProjeto: (projetoId) => api.get(`/candidaturas/projeto/${projetoId}`),

  // Retorna CandidaturaAtualizadaResponse: { id, status, projetoId, tituloProjeto }
  // status aceito: 'VISUALIZADA' | 'ACEITA' | 'RECUSADA'
  atualizarStatus: (id, body) => api.patch(`/candidaturas/${id}/status`, body),
}
