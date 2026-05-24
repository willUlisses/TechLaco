import { GraduationCap, ExternalLink, ChevronRight } from 'lucide-react'

const MAX_HABILIDADES_VISIVEIS = 3

export default function FreelancerCard({ freelancer, onClick }) {
  const iniciais = `${freelancer.nome?.charAt(0) ?? ''}${freelancer.sobrenome?.charAt(0) ?? ''}`.toUpperCase()
  const nomeCompleto = `${freelancer.nome} ${freelancer.sobrenome}`

  const habilidades = freelancer.habilidades ?? []
  const habilidadesVisiveis = habilidades.slice(0, MAX_HABILIDADES_VISIVEIS)
  const habilidadesExtra    = habilidades.length - MAX_HABILIDADES_VISIVEIS

  return (
    <article
      onClick={onClick}
      className="bg-white border border-[#e5e7eb] rounded-[14px] p-5 sm:px-6 hover:border-[#0D63C1] hover:shadow-md transition-all cursor-pointer w-full"
    >
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className="w-11 h-11 rounded-[12px] bg-[#0D63C1] text-white text-sm font-bold flex items-center justify-center shrink-0">
          {iniciais}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">

          {/* Nome + especialidade */}
          <p className="text-[#101828] text-sm font-semibold leading-tight">{nomeCompleto}</p>
          {freelancer.especialidade && (
            <p className="text-[#6a7282] text-xs mt-0.5 truncate">{freelancer.especialidade}</p>
          )}

          {/* Bio truncada */}
          {freelancer.bio && (
            <p className="text-[#6a7282] text-xs mt-2 leading-relaxed line-clamp-2">
              {freelancer.bio}
            </p>
          )}

          {/* Habilidades */}
          {habilidades.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {habilidadesVisiveis.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#0D63C1] text-[11px] font-medium"
                >
                  {skill}
                </span>
              ))}
              {habilidadesExtra > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium">
                  +{habilidadesExtra}
                </span>
              )}
            </div>
          )}

          {/* Faculdade + GitHub */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
            {freelancer.faculdade && (
              <span className="flex items-center gap-1 text-[#99a1af] text-[11px]">
                <GraduationCap size={11} />
                <span className="truncate max-w-[160px]">{freelancer.faculdade}</span>
              </span>
            )}
            {freelancer.githubUrl && (
              <a
                href={freelancer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-[#99a1af] text-[11px] no-underline hover:text-[#0D63C1] transition-colors"
              >
                <ExternalLink size={11} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Chevron — indica clicabilidade */}
        <ChevronRight size={18} className="text-[#cbd5e1] shrink-0 mt-0.5" />
      </div>
    </article>
  )
}
