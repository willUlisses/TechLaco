import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Edit3,
  Folder,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { createElement } from 'react'
import Navbar from '../components/Navbar'

const cliente = {
  nome: 'Ana Silva',
  cidade: 'Sao Paulo, SP',
  universidade: 'Universidade de Sao Paulo (USP)',
  membroDesde: 'Janeiro 2025',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
}

const resumoProjetos = [
  {
    label: 'Publicados',
    valor: '8',
    icon: Folder,
    iconColor: 'text-[#0D63C1]',
    iconBg: 'bg-[#EFF6FF]',
  },
  {
    label: 'Em andamento',
    valor: '3',
    icon: Clock3,
    iconColor: 'text-[#F97316]',
    iconBg: 'bg-[#FFF7ED]',
  },
  {
    label: 'Concluidos',
    valor: '4',
    icon: CheckCircle2,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-[#ECFDF5]',
  },
  {
    label: 'Total investido',
    valor: 'R$ 12.600',
    icon: CircleDollarSign,
    iconColor: 'text-[#0D63C1]',
    iconBg: 'bg-[#EFF6FF]',
  },
]

const projetosEmAndamento = [
  {
    titulo: 'Landing Page para Restaurante',
    freelancer: 'Ana Silva',
    orcamento: 'R$ 1.200',
    prazo: '10 abr 2026',
    progresso: 65,
  },
  {
    titulo: 'Sistema de Reservas Online',
    freelancer: 'Carlos Mendes',
    orcamento: 'R$ 3.500',
    prazo: '30 abr 2026',
    progresso: 30,
  },
]

const aguardandoContratacao = [
  {
    titulo: 'Chatbot para Atendimento',
    candidatos: 7,
    orcamento: 'R$ 800',
    prazo: '20 abr 2026',
  },
]

const projetosConcluidos = [
  {
    titulo: 'App de Agendamento',
    freelancer: 'Bruno Costa',
    orcamento: 'R$ 4.200',
  },
  {
    titulo: 'E-commerce Delivery',
    freelancer: 'Laura Rocha',
    orcamento: 'R$ 2.900',
  },
]

const distribuicao = [
  { label: 'Concluidos', atual: 2, total: 5, color: 'bg-[#10B981]' },
  { label: 'Em andamento', atual: 2, total: 5, color: 'bg-[#0D63C1]' },
  { label: 'Aguardando', atual: 1, total: 5, color: 'bg-[#F97316]' },
]

const atalhos = [
  { label: 'Publicar novo projeto', icon: Plus, color: 'text-[#F97316]', bg: 'bg-[#FFF7ED]' },
  { label: 'Buscar freelancers', icon: Search, color: 'text-[#0D63C1]', bg: 'bg-[#EFF6FF]' },
  { label: 'Meus projetos', icon: BriefcaseBusiness, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
]

function SectionTitle({ children, action }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-[#94A3B8]">
        {children}
      </h2>
      {action}
    </div>
  )
}

function InfoChip({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
      {createElement(Icon, { size: 13 })}
      {children}
    </span>
  )
}

function SummaryCard({ label, valor, icon: Icon, iconColor, iconBg }) {
  return (
    <article className="min-h-[96px] rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-center gap-4">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
          {createElement(Icon, { size: 19, className: iconColor })}
        </span>
        <div>
          <p className="text-[0.72rem] font-medium text-[#94A3B8]">{label}</p>
          <p className="mt-0.5 text-[1.05rem] font-extrabold leading-tight text-[#0F172A]">{valor}</p>
        </div>
      </div>
    </article>
  )
}

function ProjectMeta({ name, budget, date, highlight }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#94A3B8]">
      <span className={highlight ? 'font-semibold text-[#F97316]' : ''}>{name}</span>
      <span>{budget}</span>
      {date && (
        <span className="flex items-center gap-1">
          <CalendarDays size={12} />
          {date}
        </span>
      )}
    </div>
  )
}

function ProgressProject({ projeto }) {
  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">{projeto.titulo}</h3>
          <ProjectMeta name={projeto.freelancer} budget={projeto.orcamento} date={projeto.prazo} />
        </div>
        <span className="rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0D63C1]">
          Em andamento
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-[#64748B]">
          <span>Progresso</span>
          <span>{projeto.progresso}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div className="h-full rounded-full bg-[#0D63C1]" style={{ width: `${projeto.progresso}%` }} />
        </div>
      </div>
    </article>
  )
}

function WaitingProject({ projeto }) {
  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">{projeto.titulo}</h3>
          <ProjectMeta
            name={`${projeto.candidatos} candidatos`}
            budget={projeto.orcamento}
            date={projeto.prazo}
            highlight
          />
          <button className="mt-3 border-none bg-transparent p-0 text-xs font-semibold text-[#0D63C1] transition-colors hover:text-[#004C99]">
            Ver candidatos
          </button>
        </div>
        <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-semibold text-[#F97316]">
          Aguardando
        </span>
      </div>
    </article>
  )
}

function FinishedProject({ projeto }) {
  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">{projeto.titulo}</h3>
          <ProjectMeta name={projeto.freelancer} budget={projeto.orcamento} />
        </div>
        <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#059669]">
          Concluido
        </span>
      </div>
    </article>
  )
}

function CompanyInfo() {
  const linhas = [
    ['Empresa', 'Restaurante Sabor & Cia'],
    ['Segmento', 'Alimentacao - MEI'],
    ['Localizacao', 'Sao Paulo, SP'],
    ['Membro desde', 'Janeiro 2025'],
  ]

  return (
    <aside className="rounded-xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      {linhas.map(([label, value], index) => (
        <div
          key={label}
          className={`px-5 py-4 ${index > 0 ? 'border-t border-[#EEF2F7]' : ''}`}
        >
          <p className="text-[0.72rem] font-medium text-[#94A3B8]">{label}</p>
          <p className="mt-1 text-sm font-semibold text-[#334155]">{value}</p>
        </div>
      ))}
    </aside>
  )
}

function DistributionCard() {
  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex flex-col gap-3">
        {distribuicao.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs text-[#475569]">
              <span>{item.label}</span>
              <span>{item.atual}/{item.total}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.atual / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function ShortcutsCard() {
  return (
    <div className="flex flex-col gap-3">
      {atalhos.map(({ label, icon: Icon, color, bg }) => (
        <button
          key={label}
          className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-left text-sm font-medium text-[#334155] shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition-colors hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
        >
          <span className="flex items-center gap-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
              {createElement(Icon, { size: 15, className: color })}
            </span>
            {label}
          </span>
          <ChevronRight size={15} className="text-[#CBD5E1]" />
        </button>
      ))}
    </div>
  )
}

export default function PerfilCliente() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar user={{ nome: cliente.nome }} />

      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1100px] px-6 py-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={cliente.avatar}
                  alt={cliente.nome}
                  className="h-[76px] w-[76px] rounded-xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#10B981] text-white">
                  <ShieldCheck size={14} />
                </span>
              </div>

              <div>
                <h1 className="text-[1.75rem] font-extrabold leading-tight text-[#111827]">{cliente.nome}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <InfoChip icon={MapPin}>{cliente.cidade}</InfoChip>
                  <InfoChip icon={GraduationCap}>{cliente.universidade}</InfoChip>
                  <InfoChip icon={CalendarDays}>Membro desde {cliente.membroDesde}</InfoChip>
                </div>
              </div>
            </div>

            <button className="mt-2 flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]">
              <Edit3 size={15} />
              Editar perfil
            </button>
          </div>

          <div className="mt-8 flex items-center gap-8 border-b border-[#E2E8F0]">
            <button className="flex items-center gap-2 border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-semibold text-[#64748B]">
              <Code2 size={15} />
              Perfil Freelancer
            </button>
            <button className="flex items-center gap-2 border-0 border-b-2 border-[#0D63C1] bg-transparent px-0 pb-3 text-sm font-bold text-[#0D63C1]">
              <BriefcaseBusiness size={15} />
              Perfil Cliente
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1100px] grid-cols-[minmax(0,1fr)_330px] gap-8 px-6 py-9 max-lg:grid-cols-1">
        <section>
          <SectionTitle>Visao geral dos projetos</SectionTitle>
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {resumoProjetos.map((item) => (
              <SummaryCard key={item.label} {...item} />
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle
              action={
                <button className="border-none bg-transparent text-xs font-bold text-[#0D63C1] hover:text-[#004C99]">
                  Ver todos
                </button>
              }
            >
              Em andamento (2)
            </SectionTitle>
            <div className="flex flex-col gap-4">
              {projetosEmAndamento.map((projeto) => (
                <ProgressProject key={projeto.titulo} projeto={projeto} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle>Aguardando contratacao (1)</SectionTitle>
            <div className="flex flex-col gap-4">
              {aguardandoContratacao.map((projeto) => (
                <WaitingProject key={projeto.titulo} projeto={projeto} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle>Concluidos (2)</SectionTitle>
            <div className="flex flex-col gap-4">
              {projetosConcluidos.map((projeto) => (
                <FinishedProject key={projeto.titulo} projeto={projeto} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div>
            <SectionTitle
              action={
                <button className="border-none bg-transparent text-xs font-bold text-[#0D63C1] hover:text-[#004C99]">
                  Editar
                </button>
              }
            >
              Dados da empresa
            </SectionTitle>
            <CompanyInfo />
          </div>

          <div>
            <SectionTitle>Distribuicao</SectionTitle>
            <DistributionCard />
          </div>

          <div>
            <SectionTitle>Atalhos</SectionTitle>
            <ShortcutsCard />
          </div>
        </section>
      </main>
    </div>
  )
}
