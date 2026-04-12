import { useState, useEffect } from 'react'
import Modal from './Modal'
import { candidaturaService } from '../../services/candidaturaService'
import { Check, X as XIcon, ExternalLink } from 'lucide-react'

// Mapeamento de status visual
const statusColor = {
  Pendente: 'bg-[#FFF7ED] text-[#EA580C]',
  Visualizada: 'bg-[#EFF6FF] text-[#3B82F6]',
  Aceita: 'bg-[#DCFCE7] text-[#16A34A]',
  Recusada: 'bg-[#FEF2F2] text-[#EF4444]'
}

export default function ModalCandidaturasRecebidas({ projeto, aberto, onFechar }) {
  const [candidaturas, setCandidaturas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [atualizandoId, setAtualizandoId] = useState(null)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!aberto || !projeto) return

    setCarregando(true)
    setErro(null)

    candidaturaService.doProjeto(projeto.id)
      .then(data => setCandidaturas(data))
      .catch(err => setErro(err?.mensagem ?? 'Erro ao carregar propostas'))
      .finally(() => setCarregando(false))
  }, [aberto, projeto])

  async function handleAtualizarStatus(id, novoStatus) {
    setAtualizandoId(id)
    setErro(null)
    
    try {
      const atualizada = await candidaturaService.atualizarStatus(id, { status: novoStatus })
      
      // Atualiza localmente
      setCandidaturas(prev => prev.map(c => 
        c.id === id ? { ...c, status: atualizada.status } : c
      ))
    } catch (err) {
      setErro(err?.mensagem ?? 'Erro ao atualizar status.')
    } finally {
      setAtualizandoId(null)
    }
  }

  return (
    <Modal aberto={aberto} onFechar={onFechar} titulo={`Propostas: ${projeto?.titulo}`}>
      {erro && (
        <p className="text-[#EF4444] text-[13px] text-center mb-2">{erro}</p>
      )}

      {carregando ? (
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-[#99a1af]">Carregando propostas...</span>
        </div>
      ) : candidaturas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[14px] text-[#6a7282]">Nenhum freelancer enviou proposta ainda.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {candidaturas.map(c => (
            <div key={c.id} className="border border-[#e5e7eb] rounded-[10px] p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-['Poppins'] font-medium text-[15px] text-[#101828]">
                    {c.freelancer.nome}
                  </h4>
                  <p className="text-[13px] text-[#6a7282] mt-0.5">
                    {c.freelancer.especialidade}
                  </p>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusColor[c.status] ?? 'bg-[#f3f4f6] text-[#4a5565]'}`}>
                  {c.status}
                </span>
              </div>

              {c.freelancer.githubUrl && (
                <a 
                  href={c.freelancer.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 text-[13px] text-[#0066cc] max-w-fit hover:underline"
                >
                  <ExternalLink size={14} /> Ver GitHub
                </a>
              )}

              <div className="bg-[#F8F9FB] p-3 rounded-[8px] text-[13px] text-[#4a5565] mt-1 whitespace-pre-wrap">
                {c.mensagem}
              </div>

              {/* Ações de status */}
              {(c.status === 'Pendente' || c.status === 'Visualizada') && (
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-[#f3f4f6]">
                  <button
                    type="button"
                    disabled={atualizandoId === c.id}
                    onClick={() => handleAtualizarStatus(c.id, 'ACEITA')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#00a86b] text-white text-[13px] font-medium py-2 rounded-[8px] hover:bg-[#00925d] transition-colors disabled:opacity-60"
                  >
                    <Check size={14} /> Aceitar
                  </button>
                  <button
                    type="button"
                    disabled={atualizandoId === c.id}
                    onClick={() => handleAtualizarStatus(c.id, 'RECUSADA')}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-[#e5e7eb] text-[#dc2626] text-[13px] font-medium py-2 rounded-[8px] hover:bg-[#fef2f2] transition-colors disabled:opacity-60"
                  >
                    <XIcon size={14} /> Recusar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 pt-3 border-t border-[#f3f4f6]">
        <button
          type="button"
          onClick={onFechar}
          className="w-full border border-[#e5e7eb] text-[#4a5565] text-[14px] font-medium py-[10px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors"
        >
          Fechar
        </button>
      </div>
    </Modal>
  )
}
