import { FileText } from 'lucide-react'

const statusConfig = {
  Ativo: 'bg-[#DCFCE7] text-[#16A34A]',
  'Em análise': 'bg-[#FFF7ED] text-[#EA580C]',
  Concluído: 'bg-[#F1F5F9] text-[#64748B]',
}

export default function ProjetoCard({ titulo, status, orcamentoMin, orcamentoMax, propostas }) {
  return (
    <div className="flex flex-col gap-3 py-5 px-6 border border-[#E2E8F0] rounded-2xl">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-bold text-[#111827] text-base">{titulo}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusConfig[status] ?? statusConfig['Concluído']}`}>
          {status}
        </span>
      </div>

      <p className="text-sm text-[#64748B]">
        R$ {orcamentoMin.toLocaleString('pt-BR')} – R$ {orcamentoMax.toLocaleString('pt-BR')}
      </p>

      <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
        <FileText size={14} />
        <span>{propostas} propostas</span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <button className="px-4 py-1.5 rounded-lg border border-[#0D63C1] text-[#0D63C1] text-sm font-medium hover:bg-[#EFF6FF] transition-colors cursor-pointer bg-white">
          Ver propostas
        </button>
        <button className="px-4 py-1.5 rounded-lg border border-[#D1D5DC] text-[#374151] text-sm font-medium hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-white">
          Editar
        </button>
      </div>
    </div>
  )
}
