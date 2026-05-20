import { FileText, Trash2 } from 'lucide-react'

const statusConfig = {
  Ativo: 'bg-[#DCFCE7] text-[#16A34A]',
  'Em análise': 'bg-[#FFF7ED] text-[#EA580C]',
  'Concluído': 'bg-[#F1F5F9] text-[#64748B]',
  Cancelado: 'bg-[#FEF2F2] text-[#EF4444]',
}

export default function ProjetoCard({ projeto, onCancelar, onEditar, onVerCandidaturas }) {
  return (
    <div className="flex flex-col gap-3 py-5 px-6 border border-[#E2E8F0] rounded-2xl">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-bold text-[#111827] text-base">{projeto.titulo}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusConfig[projeto.status] ?? statusConfig['Concluído']}`}>
          {projeto.status}
        </span>
      </div>

      <p className="text-sm text-[#64748B]">
        R$ {projeto.valorMin?.toLocaleString('pt-BR')} – R$ {projeto.valorMax?.toLocaleString('pt-BR')}
      </p>

      <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
        <FileText size={14} />
        <span>{projeto.totalCandidaturas} candidaturas</span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <button 
          onClick={() => onVerCandidaturas?.(projeto)}
          className="px-4 py-1.5 rounded-lg border border-[#0D63C1] text-[#0D63C1] text-sm font-medium hover:bg-[#EFF6FF] transition-colors cursor-pointer bg-white"
        >
          Ver propostas
        </button>
        {projeto.status === 'Ativo' && onEditar && (
          <button
            onClick={() => onEditar(projeto)}
             className="px-4 py-1.5 rounded-lg border border-[#e5e7eb] text-[#4a5565] text-sm font-medium hover:bg-[#f3f4f6] transition-colors cursor-pointer bg-white"
          >
            Editar
          </button>
        )}
        {projeto.status === 'Ativo' && onCancelar && (
          <button
            onClick={() => onCancelar(projeto.id)}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg border border-[#D1D5DC] text-[#EF4444] text-sm font-medium hover:bg-[#FEF2F2] transition-colors cursor-pointer bg-white"
          >
            <Trash2 size={13} />
            Cancelar
          </button>
        )}
      </div>
    </div>
  )
}
