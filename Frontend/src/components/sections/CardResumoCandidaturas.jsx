import { Clock, CheckCircle, XCircle, TrendingUp, Trophy } from 'lucide-react'

const linhas = [
  { chave: 'PENDENTE',    label: 'Pendentes',     Icon: Clock,        cor: 'text-[#f59e0b]' },
  { chave: 'ACEITA',      label: 'Aceitas',       Icon: CheckCircle,  cor: 'text-[#00a86b]' },
  { chave: 'RECUSADA',    label: 'Recusadas',     Icon: XCircle,      cor: 'text-[#dc2626]' },
]

export default function CardResumoCandidaturas({ contagem }) {
  return (
    <div>
      <p className="font-['Poppins'] font-semibold text-[12px] text-[#99a1af] uppercase tracking-[1.2px] mb-4">
        Resumo
      </p>
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden">
        {linhas.map((linha, i) => (
          <div
            key={linha.chave}
            className={`flex items-center gap-3 px-4 py-3 ${i < linhas.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}
          >
            <linha.Icon size={13} className={linha.cor} />
            <span className="flex-1 text-[12px] text-[#6a7282]">{linha.label}</span>
            <span className="text-[14px] font-medium text-[#101828]">
              {contagem[linha.chave] ?? 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
