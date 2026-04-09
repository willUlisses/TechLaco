import ProjetoCard from './ProjetoCard'

const projetosMock = [
  { id: 1, titulo: 'Desenvolvimento de Site Institucional', status: 'Ativo',      orcamentoMin: 2500, orcamentoMax: 3500, propostas: 12 },
  { id: 2, titulo: 'Sistema de Agendamento Online',         status: 'Em análise', orcamentoMin: 4000, orcamentoMax: 6000, propostas: 8  },
  { id: 3, titulo: 'Automação de Processos',                status: 'Concluído',  orcamentoMin: 3000, orcamentoMax: 4000, propostas: 15 },
]

export default function SeusProjetosSection() {
  if (projetosMock.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl px-6 py-10 text-center text-[#64748B] text-sm">
        Você ainda não tem projetos publicados.
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl px-6">
      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest pt-5 pb-3">
        Seus Projetos
      </p>
      <div className="divide-y divide-[#E2E8F0]">
        {projetosMock.map(projeto => (
          <ProjetoCard key={projeto.id} {...projeto} />
        ))}
      </div>
    </div>
  )
}
