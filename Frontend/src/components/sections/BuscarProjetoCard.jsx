import { Briefcase, ChevronRight, DollarSign, Users } from 'lucide-react'

// Aceita tanto enum backend (INICIANTE) quanto label humanizado (Iniciante)
const nivelConfig = {
  INICIANTE:      { bg: 'bg-[rgba(0,168,107,0.08)]',  text: 'text-[#00a86b]',  label: 'Iniciante'     },
  Iniciante:      { bg: 'bg-[rgba(0,168,107,0.08)]',  text: 'text-[#00a86b]',  label: 'Iniciante'     },
  INTERMEDIARIO:  { bg: 'bg-[rgba(245,158,11,0.08)]', text: 'text-[#f59e0b]',  label: 'Intermediário'  },
  'Intermediário':{ bg: 'bg-[rgba(245,158,11,0.08)]', text: 'text-[#f59e0b]',  label: 'Intermediário'  },
  AVANCADO:       { bg: 'bg-[rgba(220,38,38,0.08)]',  text: 'text-[#dc2626]',  label: 'Avançado'       },
  'Avançado':     { bg: 'bg-[rgba(220,38,38,0.08)]',  text: 'text-[#dc2626]',  label: 'Avançado'       },
}

export default function BuscarProjetoCard({ projeto, onVerMais, onCandidatar }) {
  const nivel = nivelConfig[projeto.nivel] ?? nivelConfig['INICIANTE']

  return (
    <article
      className="group bg-white border border-[#e5e7eb] rounded-[14px] p-4 sm:p-5
        hover:shadow-[0_4px_20px_rgba(0,102,204,0.08)] hover:border-[#0066cc]/20
        transition-all duration-300 cursor-pointer"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Ícone */}
        <div
          className="hidden sm:flex w-9 h-9 rounded-[10px] bg-[rgba(0,102,204,0.08)]
            items-center justify-center shrink-0 mt-0.5
            group-hover:bg-[rgba(0,102,204,0.14)] transition-colors duration-300"
        >
          <Briefcase size={16} className="text-[#0066cc]" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Título + badge de nível */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <span className="text-[#101828] text-sm font-medium leading-snug line-clamp-2 sm:line-clamp-1">
              {projeto.titulo}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`${nivel.bg} ${nivel.text} text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap`}
              >
                {nivel.label}
              </span>
              <ChevronRight
                size={16}
                className="text-[#99a1af] hidden sm:block group-hover:text-[#0066cc] group-hover:translate-x-0.5 transition-all duration-200"
              />
            </div>
          </div>

          {/* Cliente e status */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[#6a7282] text-xs font-medium">{projeto.cliente?.nome ?? 'Cliente'}</span>
            <span className="text-[#99a1af] text-xs">·</span>
            <span className="text-[#6a7282] text-xs">{projeto.status}</span>
          </div>

          {/* Descrição */}
          <p className="text-[#6a7282] text-xs font-medium mb-2.5 line-clamp-2">
            {projeto.descricao}
          </p>

          {/* Tecnologias como pills */}
          {projeto.tecnologias?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2.5">
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

          {/* Valor e candidaturas */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#99a1af]">
            <div className="flex items-center gap-1 text-[#364153]">
              <DollarSign size={11} />
              <span>
                R$ {projeto.valorMin?.toLocaleString('pt-BR')} – R${' '}
                {projeto.valorMax?.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={11} />
              <span>{projeto.totalCandidaturas} candidatura{projeto.totalCandidaturas !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Botões — mobile */}
          <div className="flex gap-2 mt-3 sm:hidden">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onVerMais?.(projeto) }}
              className="flex-1 border border-[#e5e7eb] text-[#4a5565] text-[12px] font-medium py-[8px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors"
            >
              Ver mais
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onCandidatar?.(projeto) }}
              className="flex-1 bg-[#0066cc] text-white text-[12px] font-medium py-[8px] rounded-[10px] hover:bg-[#005ab4] transition-colors"
            >
              Enviar Proposta
            </button>
          </div>
        </div>
      </div>

      {/* Botões — desktop */}
      <div className="hidden sm:flex gap-2 mt-3">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onVerMais?.(projeto) }}
          className="flex-1 border border-[#e5e7eb] text-[#4a5565] text-[12px] font-medium py-[8px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors"
        >
          Ver mais
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onCandidatar?.(projeto) }}
          className="flex-1 bg-[#0066cc] text-white text-[12px] font-medium py-[8px] rounded-[10px] hover:bg-[#005ab4] transition-colors"
        >
          Enviar Proposta
        </button>
      </div>
    </article>
  )
}
