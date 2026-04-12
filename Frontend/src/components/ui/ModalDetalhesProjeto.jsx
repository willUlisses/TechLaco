import { useState, useEffect } from 'react'
import { DollarSign, BarChart2, Users } from 'lucide-react'
import Modal from './Modal'
import { projetoService } from '../../services/projetoService'

const labelNivel = {
  INICIANTE:     'Iniciante',
  INTERMEDIARIO: 'Intermediário',
  AVANCADO:      'Avançado',
}

const corNivel = {
  INICIANTE:     'bg-[rgba(0,168,107,0.08)] text-[#00a86b]',
  INTERMEDIARIO: 'bg-[rgba(245,158,11,0.08)] text-[#f59e0b]',
  AVANCADO:      'bg-[rgba(220,38,38,0.08)] text-[#dc2626]',
}

export default function ModalDetalhesProjeto({ projetoId, aberto, onFechar, onCandidatar }) {
  const [projeto, setProjeto]       = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro]             = useState(null)

  useEffect(() => {
    if (!aberto || !projetoId) return

    setCarregando(true)
    setErro(null)
    setProjeto(null)

    projetoService.buscarPorId(projetoId)
      .then(data => setProjeto(data))
      .catch(err  => setErro(err?.mensagem ?? 'Erro ao carregar projeto'))
      .finally(()  => setCarregando(false))
  }, [aberto, projetoId])

  return (
    <Modal aberto={aberto} onFechar={onFechar} titulo="Detalhes do Projeto">

      {carregando && (
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-[#99a1af]">Carregando...</span>
        </div>
      )}

      {erro && (
        <p className="text-sm text-[#EF4444] text-center py-4">{erro}</p>
      )}

      {projeto && !carregando && (
        <>
          {/* Título + badge nível */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-['Poppins'] font-medium text-[16px] text-[#101828] leading-snug">
              {projeto.titulo}
            </h3>
            <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full shrink-0 ${corNivel[projeto.nivel] ?? 'bg-[#f3f4f6] text-[#4a5565]'}`}>
              {labelNivel[projeto.nivel] ?? projeto.nivel}
            </span>
          </div>

          {/* Cliente */}
          <p className="text-[13px] text-[#6a7282]">
            Publicado por <span className="font-medium text-[#101828]">{projeto.cliente?.nome}</span>
          </p>

          {/* Descrição */}
          <p className="text-[14px] text-[#4a5565] leading-relaxed">
            {projeto.descricao}
          </p>

          {/* Métricas */}
          <div className="flex items-center gap-5 pt-1">
            <div className="flex items-center gap-1.5 text-[#364153]">
              <DollarSign size={14} className="text-[#99a1af]" />
              <span className="text-[13px] font-medium">
                R$ {projeto.valorMin?.toLocaleString('pt-BR')} – R$ {projeto.valorMax?.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#99a1af]">
              <Users size={14} />
              <span className="text-[13px]">{projeto.totalCandidaturas} propostas</span>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-2 border-t border-[#f3f4f6]">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 border border-[#e5e7eb] text-[#4a5565] text-[14px] font-medium py-[10px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={() => { onFechar(); onCandidatar(projeto) }}
              className="flex-1 bg-[#0066cc] text-white text-[14px] font-medium py-[10px] rounded-[10px] hover:bg-[#005ab4] transition-colors"
            >
              Enviar Proposta
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
