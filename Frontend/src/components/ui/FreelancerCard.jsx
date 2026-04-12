import { GraduationCap, ChevronRight, ExternalLink } from 'lucide-react'

export default function FreelancerCard({ freelancer }) {
  const iniciais = `${freelancer.nome?.charAt(0) ?? ''}${freelancer.sobrenome?.charAt(0) ?? ''}`.toUpperCase()
  const nomeCompleto = `${freelancer.nome} ${freelancer.sobrenome}`

  return (
    <article className="bg-white border border-gray-200 rounded-[14px] flex flex-col sm:flex-row items-start sm:items-center p-4 sm:px-[25px] sm:py-4 gap-4 hover:shadow-md transition-shadow cursor-pointer w-full">

      {/* Container principal para alinhar Avatar e Info em mobile */}
      <div className="flex w-full sm:w-auto items-start sm:items-center gap-4 flex-1">
        {/* Avatar com iniciais */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-[14px] bg-[#0D63C1] text-white text-sm font-bold flex items-center justify-center">
            {iniciais}
          </div>
        </div>

        {/* Info principal */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="text-[#101828] text-sm font-medium">{nomeCompleto}</span>
          </div>

          {freelancer.especialidade && (
            <p className="text-[#6a7282] text-[12px] mb-1.5 truncate">{freelancer.especialidade}</p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {freelancer.faculdade && (
              <div className="flex items-center gap-1 shrink-0">
                <GraduationCap size={12} className="text-[#99a1af]" />
                <span className="text-[#99a1af] text-[12px] truncate max-w-[140px] sm:max-w-none">{freelancer.faculdade}</span>
              </div>
            )}

            {freelancer.githubUrl && (
              <a
                href={freelancer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 shrink-0 no-underline hover:text-[#0D63C1] transition-colors"
              >
                <ExternalLink size={12} className="text-[#99a1af]" />
                <span className="text-[#99a1af] text-[12px]">Ver GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col flex-row-reverse items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-none border-gray-100 shrink-0 gap-3 sm:gap-1.5">
        <ChevronRight size={20} className="text-[#99a1af] shrink-0 hidden sm:block" />
      </div>
    </article>
  )
}
