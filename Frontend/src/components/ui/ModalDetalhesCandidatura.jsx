import { Clock, Eye, CheckCircle, XCircle, Trophy } from 'lucide-react'
import Modal from './Modal'
import { statusConfig, parseStatusCandidatura } from '../../utils/candidaturaConfig'

const icones = { Clock, Eye, CheckCircle, XCircle, Trophy }

export default function ModalDetalhesCandidatura({ candidatura, aberto, onFechar }) {
  if (!candidatura) return null

  const chaveStatus = parseStatusCandidatura(candidatura.status)
  const config = statusConfig[chaveStatus]
  const StatusIcon = icones[config.Icon]

  return (
    <Modal aberto={aberto} onFechar={onFechar} titulo="Detalhes da Candidatura">

      {/* Badge de status */}
      <div className="flex items-center gap-2">
        <span className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1 rounded-full ${config.badgeBg} ${config.badgeText}`}>
          <StatusIcon size={12} />
          {config.label}
        </span>
      </div>

      {/* Projeto */}
      <div className="flex flex-col gap-1 mt-2">
        <p className="text-[12px] text-[#99a1af] uppercase tracking-wide font-semibold">Projeto</p>
        <p className="text-[15px] font-medium text-[#101828]">{candidatura.tituloProjeto}</p>
      </div>

      {/* Mensagem enviada */}
      <div className="flex flex-col gap-1.5 mt-2">
        <p className="text-[12px] text-[#99a1af] uppercase tracking-wide font-semibold">
          Sua mensagem
        </p>
        <div className="bg-[#f8f9fb] rounded-[10px] px-4 py-3">
          <p className="text-[13px] text-[#4a5565] leading-relaxed">
            {candidatura.mensagem}
          </p>
        </div>
      </div>

      {/* Banner contextual de status */}
      <div className={`bg-[#f9fafb] border-l-2 ${config.bannerBorder} rounded-[10px] px-[14px] py-3 mt-4`}>
        <p className="text-[13px] font-medium text-[#364153]">
          {config.mensagem}
        </p>
      </div>

      {/* Botão fechar */}
      <div className="pt-4 mt-2 border-t border-[#f3f4f6]">
        <button
          type="button"
          onClick={onFechar}
          className="w-full border border-[#e5e7eb] text-[#4a5565] text-[14px] font-medium py-[10px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </Modal>
  )
}
