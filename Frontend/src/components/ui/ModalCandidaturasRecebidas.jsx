import { useState, useEffect } from 'react'
import Modal from './Modal'
import { candidaturaService } from '../../services/candidaturaService'
import { Check, X as XIcon, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react'
import { statusConfig, parseStatusCandidatura } from '../../utils/candidaturaConfig'

const icones = { Clock, CheckCircle, XCircle }

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

      // Atualiza localmente com o status novo que vem da API
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
    <Modal aberto={aberto} onFechar={onFechar} titulo={`Propostas: ${projeto?.titulo || ''}`} maxWidth="max-w-[720px]">
      {erro && (
        <div className="bg-[#fef2f2] border border-[#f87171] rounded-[10px] p-3 mb-4 mt-2">
          <p className="text-[#dc2626] text-[13px] font-medium text-center">{erro}</p>
        </div>
      )}

      {carregando ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[rgba(0,102,204,0.1)] border-t-[#0066cc] rounded-full animate-spin"></div>
            <span className="text-[14px] text-[#6a7282] font-medium">Analisando propostas...</span>
          </div>
        </div>
      ) : candidaturas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mb-2">
            <XIcon className="text-[#99a1af]" size={24} />
          </div>
          <h3 className="text-[#101828] font-['Poppins'] font-medium text-[16px]">Nenhuma proposta recebida</h3>
          <p className="text-[14px] text-[#6a7282] text-center max-w-[300px]">
            Ainda não há freelancers interessados neste projeto. Aguarde mais um pouco!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-2">
          {candidaturas.map(c => {
            const chaveStatus = parseStatusCandidatura(c.status)
            const isPendente = chaveStatus === 'PENDENTE'
            const cfg = statusConfig[chaveStatus]
            const StatusIcon = icones[cfg.Icon]

            return (
              <div key={c.id} className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md hover:border-[#d1d5db]">

                {/* Header do Card da Candidatura */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-['Poppins'] font-semibold text-[17px] text-[#101828] leading-tight">
                      {c.freelancer.nome}
                    </h4>
                    <p className="text-[14px] text-[#6a7282] font-medium">
                      {c.freelancer.especialidade}
                    </p>
                    {c.freelancer.githubUrl && (
                      <a
                        href={c.freelancer.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-[#0066cc] font-medium hover:text-[#005ab4] hover:underline mt-1 transition-colors w-fit outline-none"
                      >
                        <ExternalLink size={14} />
                        Portfólio / GitHub
                      </a>
                    )}
                  </div>

                  <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap self-start ${cfg.bg} ${cfg.text}`}>
                    <StatusIcon size={14} />
                    {cfg.label}
                  </span>
                </div>

                {/* Mensagem do Freelancer */}
                <div className="bg-[#f8f9fb] border-l-[3px] border-[#d1d5db] rounded-r-[10px] p-4 mt-2">
                  <p className="text-[14px] text-[#2c3442] leading-relaxed whitespace-pre-wrap font-['Inter']">
                    {c.mensagem}
                  </p>
                </div>

                {/* Ações de status */}
                {isPendente && (
                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 pt-4 border-t border-[#f3f4f6]">
                    <button
                      type="button"
                      disabled={atualizandoId === c.id}
                      onClick={() => handleAtualizarStatus(c.id, 'ACEITA')}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#00a86b] text-white text-[14px] font-semibold py-2.5 rounded-[10px] hover:bg-[#00925d] transition-all hover:-translate-y-0.5 shadow-sm disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer border-none outline-none"
                    >
                      <Check size={16} /> Aceitar Proposta
                    </button>
                    <button
                      type="button"
                      disabled={atualizandoId === c.id}
                      onClick={() => handleAtualizarStatus(c.id, 'RECUSADA')}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-white border border-[#e5e7eb] text-[#dc2626] text-[14px] font-semibold py-2.5 rounded-[10px] hover:bg-[#fef2f2] hover:border-[#fca5a5] transition-all cursor-pointer disabled:opacity-60 outline-none"
                    >
                      <XIcon size={16} /> Recusar Proposta
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <button
          type="button"
          onClick={onFechar}
          className="w-full bg-[#f3f4f6] border-none text-[#4a5565] text-[15px] font-semibold py-3 rounded-[10px] hover:bg-[#e5e7eb] transition-colors cursor-pointer outline-none"
        >
          Fechar Janela
        </button>
      </div>
    </Modal>
  )
}
