import ProjetoCard from './ProjetoCard'

export default function SeusProjetosSection({ projetos = [], carregando, erro, onCancelar, onEditar, onVerCandidaturas }) {
  if (carregando) {
    return (
      <div className="flex items-center justify-center py-10 px-4">
        <span className="text-sm text-[#99a1af]">Carregando projetos...</span>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center py-10 px-4">
        <span className="text-sm text-[#EF4444]">{erro}</span>
      </div>
    )
  }

  if (projetos.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 sm:px-6 py-10 text-center text-[#64748B] text-sm">
        Você ainda não tem projetos publicados.
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest py-3">
        Seus Projetos
      </p>
      <div className="flex flex-col gap-3">
        {projetos.map(projeto => (
          <ProjetoCard 
            key={projeto.id} 
            projeto={projeto} 
            onCancelar={onCancelar}
            onEditar={onEditar}
            onVerCandidaturas={onVerCandidaturas}
          />
        ))}
      </div>
    </div>
  )
}
