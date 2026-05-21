import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Folder,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  Pencil,
} from 'lucide-react'
import { createElement, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileNav from '../components/ui/ProfileNav'

const cliente = {
  nome: 'Ana Silva',
  cidade: 'Sao Paulo, SP',
  universidade: 'Universidade de Sao Paulo (USP)',
  membroDesde: 'Janeiro 2025',
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

export default function PerfilCliente() {

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar user={{ nome: cliente.nome }} />

      <header className="w-full bg-white border-b border-slate-200 pt-8 pb-0">
        <div className="max-w-6xl mx-auto px-4">

          {/* Identidade + botão de edição */}
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 pb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                {/* Avatar — idealmente um <img> com alt descritivo */}
                <div
                  className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-2xl overflow-hidden border border-slate-100"
                  role="img"
                  aria-label="Foto de perfil de Ana Silva"
                >
                  👩‍💻
                </div>
                <div
                  className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  aria-label="Perfil verificado"
                >
                  ✓
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">Ana Silva</h1>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    São Paulo, SP
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={14} aria-hidden="true" />
                    Universidade de São Paulo (USP)
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
            >
              <Pencil size={14} aria-hidden="true" />
              Editar perfil
            </button>
          </div>

          <ProfileNav />

        </div>
      </header>

      <main className="flex flex-col mx-auto max-w-6xl gap-8 px-6 py-9">
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
      </main>
    </div>
  )
}
