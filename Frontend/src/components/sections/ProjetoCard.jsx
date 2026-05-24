import { useState } from 'react'
import { FileText, Pencil, Trash2 } from 'lucide-react'
import ConfirmarDelecaoModal from '../ui/ConfirmarDelecaoModal'
import { api } from '../../services/api'
import { labelStatus } from '../../utils/projetoConfig'

// Mapa de estilos por status — aceita enum backend e label humanizado
const statusConfig = {
  ATIVO:        'bg-[#DCFCE7] text-[#16A34A]',
  Ativo:        'bg-[#DCFCE7] text-[#16A34A]',
  EM_ANALISE:   'bg-[#FFF7ED] text-[#EA580C]',
  'Em análise': 'bg-[#FFF7ED] text-[#EA580C]',
  CONCLUIDO:    'bg-[#F1F5F9] text-[#64748B]',
  'Concluído':  'bg-[#F1F5F9] text-[#64748B]',
  CANCELADO:    'bg-[#FEF2F2] text-[#EF4444]',
  Cancelado:    'bg-[#FEF2F2] text-[#EF4444]',
}

export default function ProjetoCard({ projeto, onAtualizado, onEditar, onVerCandidaturas }) {
  const [modalDeletar, setModalDeletar] = useState(false)

  const statusCls = statusConfig[projeto.status] ?? 'bg-[#F1F5F9] text-[#64748B]'
  const statusLabel = labelStatus(projeto.status)

  // Status que permitem edição e deleção
  const podeEditar  = ['ATIVO', 'Ativo', 'EM_ANALISE', 'Em análise'].includes(projeto.status)

  async function handleDeletar() {
    await api.delete(`/projetos/${projeto.id}`)
    onAtualizado?.()
  }

  return (
    <>
      <div className="flex flex-col gap-3 py-5 px-6 border border-[#E2E8F0] rounded-2xl bg-white">
        {/* Cabeçalho: título + status + ações */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap min-w-0">
            <span className="font-bold text-[#111827] text-base truncate">{projeto.titulo}</span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${statusCls}`}>
              {statusLabel}
            </span>
          </div>

          {/* Ações: editar + deletar (ícones) */}
          {podeEditar && (
            <div className="flex items-center gap-1 shrink-0">
              {onEditar && (
                <button
                  type="button"
                  onClick={() => onEditar(projeto)}
                  className="p-1.5 rounded-lg text-[#99a1af] hover:text-[#0066cc] hover:bg-[#EFF6FF] transition-colors"
                  aria-label={`Editar projeto ${projeto.titulo}`}
                >
                  <Pencil size={15} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setModalDeletar(true)}
                className="p-1.5 rounded-lg text-[#99a1af] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                aria-label={`Deletar projeto ${projeto.titulo}`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Faixa de valor */}
        <p className="text-sm text-[#64748B]">
          R$ {projeto.valorMin?.toLocaleString('pt-BR')} – R$ {projeto.valorMax?.toLocaleString('pt-BR')}
        </p>

        {/* Tecnologias como pills */}
        {projeto.tecnologias?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {projeto.tecnologias.map(tech => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#0066cc] text-[11px] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Candidaturas */}
        <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
          <FileText size={14} />
          <span>{projeto.totalCandidaturas} candidatura{projeto.totalCandidaturas !== 1 ? 's' : ''}</span>
        </div>

        {/* Botão ver propostas */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => onVerCandidaturas?.(projeto)}
            className="px-4 py-1.5 rounded-lg border border-[#0D63C1] text-[#0D63C1] text-sm font-medium hover:bg-[#EFF6FF] transition-colors cursor-pointer bg-white"
          >
            Ver propostas
          </button>
        </div>
      </div>

      {/* Modal de confirmação de deleção */}
      {modalDeletar && (
        <ConfirmarDelecaoModal
          titulo={projeto.titulo}
          onConfirmar={handleDeletar}
          onCancelar={() => setModalDeletar(false)}
        />
      )}
    </>
  )
}
