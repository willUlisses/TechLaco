import { useRef, useEffect } from 'react'
import { X, GraduationCap, ExternalLink, Code2, User } from 'lucide-react'

export default function FreelancerPerfilModal({ freelancer, onClose }) {
  const modalRef = useRef(null)

  // Foco automático no modal ao abrir (acessibilidade)
  useEffect(() => {
    modalRef.current?.focus()
  }, [])

  // Fechar com Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Travar scroll do body enquanto modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const iniciais = `${freelancer.nome?.charAt(0) ?? ''}${freelancer.sobrenome?.charAt(0) ?? ''}`.toUpperCase()
  const nomeCompleto = `${freelancer.nome} ${freelancer.sobrenome}`
  const habilidades = freelancer.habilidades ?? []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-freelancer-nome"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl flex flex-col max-h-[92vh] outline-none"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#0D63C1]" />
            <h2 id="modal-freelancer-nome" className="text-base font-semibold text-slate-800">
              Perfil do freelancer
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo com scroll */}
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">

          {/* — Identidade — */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0D63C1] text-white text-xl font-bold flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(13,99,193,0.25)]">
              {iniciais}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-slate-900 leading-tight">{nomeCompleto}</p>

              {freelancer.especialidade ? (
                <p className="text-sm text-slate-500 mt-0.5">{freelancer.especialidade}</p>
              ) : (
                <p className="text-sm text-slate-300 mt-0.5 italic">Especialidade não informada</p>
              )}

              {freelancer.faculdade ? (
                <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
                  <GraduationCap size={13} className="text-slate-400 shrink-0" />
                  <span className="truncate">{freelancer.faculdade}</span>
                </p>
              ) : (
                <p className="flex items-center gap-1.5 text-xs text-slate-300 mt-1.5 italic">
                  <GraduationCap size={13} className="shrink-0" />
                  Faculdade não informada
                </p>
              )}
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-slate-100" />

          {/* — Sobre / Bio — */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Sobre
            </p>
            {freelancer.bio ? (
              <p className="text-sm text-slate-700 leading-relaxed">{freelancer.bio}</p>
            ) : (
              <p className="text-sm text-slate-300 italic">
                Este freelancer ainda não adicionou uma bio.
              </p>
            )}
          </div>

          {/* — Habilidades — */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Code2 size={12} />
              Habilidades
            </p>
            {habilidades.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {habilidades.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#0D63C1] text-xs font-medium border border-[#DBEAFE]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-300 italic">Nenhuma habilidade informada.</p>
            )}
          </div>

          {/* — GitHub — */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              GitHub
            </p>
            {freelancer.githubUrl ? (
              <a
                href={freelancer.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#0D63C1] font-medium hover:underline break-all"
              >
                <ExternalLink size={13} className="shrink-0" />
                {freelancer.githubUrl}
              </a>
            ) : (
              <p className="text-sm text-slate-300 italic">GitHub não informado.</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  )
}
