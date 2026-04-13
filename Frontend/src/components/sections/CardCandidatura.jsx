import { Clock, Eye, CheckCircle, XCircle, Trophy } from 'lucide-react'
import { statusConfig, parseStatusCandidatura } from '../../utils/candidaturaConfig'

const icones = { Clock, Eye, CheckCircle, XCircle, Trophy }

export default function CardCandidatura({ candidatura, onVerDetalhes }) {
  const chaveStatus = parseStatusCandidatura(candidatura.status)
  const config = statusConfig[chaveStatus]
  const StatusIcon = icones[config.Icon]

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden">

      <div className={`h-[2px] w-full ${config.barColor}`} />

      <div className="px-5 pt-4 pb-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="text-[14px] font-medium text-[#101828] leading-snug">
              {candidatura.tituloProjeto}
            </p>
          </div>
          <span className={`flex items-center gap-1.5 text-[12px] font-normal px-2 py-1 rounded-full shrink-0 ${config.badgeBg} ${config.badgeText}`}>
            {config.label}
          </span>
        </div>

        <div className={`bg-[#f9fafb] border-l-2 ${config.bannerBorder} rounded-[10px] px-[14px] py-2`}>
          <p className="text-[12px] font-medium text-[#364153]">
            {config.mensagem}
          </p>
        </div>

        <div className="pb-3">
          <button
            type="button"
            onClick={onVerDetalhes}
            className="flex items-center gap-1.5 border border-[#e5e7eb] text-[#4a5565] text-[12px] font-medium px-[13px] py-[7px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
          >
            Ver detalhes
            <span className="text-[10px]">›</span>
          </button>
        </div>
      </div>
    </div>
  )
}
