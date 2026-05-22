import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Folder,
  Pencil,
} from 'lucide-react'
import { createElement, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileNav from '../components/ui/ProfileNav'
import { useAuth } from '../contexts/AuthContext'
import { usePerfilCliente } from '../hooks/usePerfilCliente'
import { useProjetosCliente } from '../hooks/useProjetosCliente'
import SemAcesso from '../components/ui/SemAcesso'
import EditarPerfilClienteModal from '../components/ui/EditarPerfilClienteModal'

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
      {budget && <span>{budget}</span>}
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
          <ProjectMeta
            name={projeto.nivel || 'Nível não definido'}
            budget={projeto.orcamentoFormatado}
          />
        </div>
        <span className="rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0D63C1]">
          Em andamento
        </span>
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
            name={`${projeto.totalCandidaturas || 0} candidatos`}
            budget={projeto.orcamentoFormatado}
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
          <ProjectMeta name={projeto.nivel || 'Nível não definido'} budget={projeto.orcamentoFormatado} />
        </div>
        <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#059669]">
          Concluído
        </span>
      </div>
    </article>
  )
}

export default function PerfilCliente() {
  const { usuario } = useAuth()
  const [modalAberto, setModalAberto] = useState(false)
  const { perfil, loading: loadingPerfil, error: errorPerfil, refetch } = usePerfilCliente()
  const { projetos, loading: loadingProjetos, error: errorProjetos } = useProjetosCliente()

  if (!usuario?.isCliente) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <SemAcesso tipo="cliente" />
      </div>
    )
  }

  if (loadingPerfil || loadingProjetos) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <span className="text-sm text-slate-500">Carregando perfil...</span>
      </div>
    )
  }

  if (errorPerfil || errorProjetos) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <span className="text-sm text-red-500">Erro ao carregar dados do perfil.</span>
      </div>
    )
  }

  const normalizeStatus = s => String(s || '').toUpperCase().replace(' ', '_');

  const projetosFormatados = (projetos || []).map(p => {
    let orcamentoFormatado = 'Orçamento não definido';
    if (p.valorMin != null && p.valorMax != null) {
      const min = p.valorMin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const max = p.valorMax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      orcamentoFormatado = `${min} - ${max}`;
    } else if (p.valorMin != null) {
      orcamentoFormatado = `A partir de ${p.valorMin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    }
    return { ...p, orcamentoFormatado };
  });

  const emAndamento = projetosFormatados.filter(p => normalizeStatus(p.status) === 'EM_ANDAMENTO');
  const aguardando = projetosFormatados.filter(p => normalizeStatus(p.status) === 'AGUARDANDO' || normalizeStatus(p.status) === 'PENDENTE');
  const concluidos = projetosFormatados.filter(p => normalizeStatus(p.status) === 'CONCLUIDO');

  const totalProjetos = perfil?.totalProjetos ?? projetosFormatados.length;

  const resumoProjetos = [
    { label: 'Publicados', valor: totalProjetos, icon: Folder, iconColor: 'text-[#0D63C1]', iconBg: 'bg-[#EFF6FF]' },
    { label: 'Em andamento', valor: emAndamento.length, icon: Clock3, iconColor: 'text-[#F97316]', iconBg: 'bg-[#FFF7ED]' },
    { label: 'Concluídos', valor: concluidos.length, icon: CheckCircle2, iconColor: 'text-[#10B981]', iconBg: 'bg-[#ECFDF5]' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <header className="w-full bg-white border-b border-slate-200 pt-8 pb-0">
        <div className="max-w-6xl mx-auto px-4">

          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 pb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div
                  className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-2xl overflow-hidden border border-slate-100"
                  role="img"
                  aria-label={`Foto de perfil de ${usuario?.nome}`}
                >
                  {usuario?.nome?.charAt(0).toUpperCase()}
                </div>
                <div
                  className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  aria-label="Perfil verificado"
                >
                  ✓
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">{usuario?.nome} {usuario?.sobrenome}</h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalAberto(true)}
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
          <SectionTitle>Visão geral dos projetos</SectionTitle>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {resumoProjetos.map((item) => (
              <SummaryCard key={item.label} {...item} />
            ))}
          </div>

          <div className="mt-8">
            <SectionTitle
              action={
                <button
                  type="button"
                  onClick={() => setModalAberto(true)}
                  className="border-none bg-transparent text-sm font-medium text-blue-600 hover:underline"
                >
                  Editar
                </button>
              }
            >
              Sobre mim
            </SectionTitle>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-800">
              {perfil?.bio ? (
                <p>{perfil.bio}</p>
              ) : (
                <p className="text-slate-400 italic">
                  Adicione uma apresentação ao seu perfil.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle>
              Em andamento ({emAndamento.length})
            </SectionTitle>
            <div className="flex flex-col gap-4">
              {emAndamento.length > 0 ? (
                emAndamento.map((projeto) => (
                  <ProgressProject key={projeto.id} projeto={projeto} />
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">Nenhum projeto em andamento.</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle>Aguardando contratação ({aguardando.length})</SectionTitle>
            <div className="flex flex-col gap-4">
              {aguardando.length > 0 ? (
                aguardando.map((projeto) => (
                  <WaitingProject key={projeto.id} projeto={projeto} />
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">Nenhum projeto aguardando contratação.</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle>Concluídos ({concluidos.length})</SectionTitle>
            <div className="flex flex-col gap-4">
              {concluidos.length > 0 ? (
                concluidos.map((projeto) => (
                  <FinishedProject key={projeto.id} projeto={projeto} />
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">Nenhum projeto concluído.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      {modalAberto && (
        <EditarPerfilClienteModal
          perfil={perfil}
          onClose={() => setModalAberto(false)}
          onSaved={refetch}
        />
      )}
    </div>
  )
}
