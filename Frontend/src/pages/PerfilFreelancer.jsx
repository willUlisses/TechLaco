import { useState } from 'react';
import PortfolioItem from '../components/ui/PortfolioItem';
import SkillBadge from '../components/ui/SkillBadge';
import MetricCard from '../components/ui/MetricCard';
import ProfileNav from '../components/ui/ProfileNav';
import Navbar from '../components/Navbar';
import SemAcesso from '../components/ui/SemAcesso';
import EditarPerfilFreelancerModal from '../components/ui/EditarPerfilFreelancerModal';
import { useAuth } from '../contexts/AuthContext';
import { usePerfilFreelancer } from '../hooks/usePerfilFreelancer';
import { useCandidaturas } from '../hooks/useCandidaturas';
import { parseStatusCandidatura } from '../utils/candidaturaConfig';

import {
    GraduationCap,
    Pencil,
    Clock,
    XCircle,
    DollarSign,
    CheckCircle2,
} from 'lucide-react';

function SectionHeader({ id, title, actionText, onAction }) {
    return (
        <div className="flex justify-between items-center mb-3">
            <h3
                id={id}
                className="text-xs font-bold text-slate-400 tracking-wider uppercase"
            >
                {title}
            </h3>
            {actionText && (
                <button
                    type="button"
                    onClick={onAction}
                    className="text-blue-600 text-sm font-medium hover:underline"
                >
                    {actionText}
                </button>
            )}
        </div>
    );
}

export default function PerfilFreelancer() {
    const { usuario } = useAuth();
    const [modalAberto, setModalAberto] = useState(false);

    const { perfil, loading: loadingPerfil, error: errorPerfil, refetch } = usePerfilFreelancer();
    const { candidaturas, receitaTotal, loading: loadingCand } = useCandidaturas();

    if (!usuario?.isFreelancer) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <SemAcesso tipo="freelancer" />
            </div>
        );
    }

    if (loadingPerfil || loadingCand) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-sm text-slate-500">Carregando perfil...</span>
            </div>
        );
    }

    if (errorPerfil) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="text-sm text-red-500">Erro ao carregar dados do perfil.</span>
            </div>
        );
    }

    const concluidos = candidaturas.filter(c => parseStatusCandidatura(c.status) === 'ACEITA').length;
    const emAndamento = candidaturas.filter(c => parseStatusCandidatura(c.status) === 'PENDENTE').length;
    const cancelados = candidaturas.filter(c => parseStatusCandidatura(c.status) === 'RECUSADA').length;

    const receitaFormatada = receitaTotal != null
        ? Number(receitaTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : 'R$ 0,00';

    const metrics = [
        { label: 'Concluídos', value: concluidos, icon: CheckCircle2, colorClass: 'bg-emerald-50 text-emerald-600' },
        { label: 'Em andamento', value: emAndamento, icon: Clock, colorClass: 'bg-blue-50 text-blue-600' },
        { label: 'Cancelados', value: cancelados, icon: XCircle, colorClass: 'bg-red-50 text-red-600' },
        { label: 'Receita total', value: receitaFormatada, icon: DollarSign, colorClass: 'bg-orange-50 text-orange-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
            <Navbar />

            {/* ── Cabeçalho do perfil ── */}
            <header className="w-full bg-white border-b border-slate-200 pt-8 pb-0">
                <div className="max-w-6xl mx-auto px-4">

                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 pb-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div
                                    className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-2xl overflow-hidden border border-slate-100 uppercase"
                                    role="img"
                                    aria-label={`Foto de perfil de ${usuario.nome}`}
                                >
                                    {usuario.nome?.charAt(0)}
                                </div>
                                <div
                                    className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                                    aria-label="Perfil verificado"
                                >
                                    ✓
                                </div>
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {usuario.nome} {usuario.sobrenome}
                                </h1>
                                {perfil.especialidade && (
                                    <p className="text-sm text-slate-600 mt-0.5">{perfil.especialidade}</p>
                                )}
                                <p className="text-slate-500 text-sm mt-1 flex items-center gap-4">
                                    {perfil.faculdade && (
                                        <span className="flex items-center gap-1.5">
                                            <GraduationCap size={14} aria-hidden="true" />
                                            {perfil.faculdade}
                                        </span>
                                    )}
                                </p>
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

            {/* ── Conteúdo principal ── */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col gap-8">

                    {/* Métricas de desempenho */}
                    <section aria-labelledby="metricas-heading">
                        <SectionHeader id="metricas-heading" title="Métricas de desempenho" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {metrics.map(({ label, value, icon, colorClass }) => (
                                <MetricCard
                                    key={label}
                                    label={label}
                                    value={value}
                                    icon={icon}
                                    colorClass={colorClass}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Sobre mim */}
                    <section aria-labelledby="sobre-heading">
                        <SectionHeader
                            id="sobre-heading"
                            title="Sobre mim"
                            actionText="Editar"
                            onAction={() => setModalAberto(true)}
                        />
                        <div className="bg-white p-6 rounded-xl border border-slate-200 text-slate-800 leading-relaxed text-sm">
                            {perfil.bio ? (
                                <p>{perfil.bio}</p>
                            ) : (
                                <p className="text-slate-400 italic">Adicione uma biografia ao seu perfil.</p>
                            )}

                            {perfil.githubUrl ? (
                                <a
                                    href={perfil.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline mt-4 font-medium"
                                >
                                    {perfil.githubUrl}
                                </a>
                            ) : (
                                <p className="text-sm text-slate-400 mt-4 italic flex items-center gap-1.5">
                                    Ainda não tem URL do GitHub cadastrada.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Habilidades */}
                    <section aria-labelledby="habilidades-heading">
                        <SectionHeader
                            id="habilidades-heading"
                            title="Habilidades"
                            actionText="+ Editar/Adicionar"
                            onAction={() => setModalAberto(true)}
                        />
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <ul
                                role="list"
                                className="flex flex-wrap gap-2"
                                aria-label="Lista de habilidades"
                            >
                                {perfil.habilidades && perfil.habilidades.length > 0 ? (
                                    perfil.habilidades.map((skill) => (
                                        <SkillBadge key={skill} label={skill} />
                                    ))
                                ) : (
                                    <li><p className="text-sm text-slate-400 italic">Nenhuma habilidade cadastrada ainda.</p></li>
                                )}
                            </ul>
                        </div>
                    </section>

                    {/* Participações */}
                    <section aria-labelledby="participacoes-heading">
                        <SectionHeader
                            id="participacoes-heading"
                            title="Participações"
                        />
                        <ul role="list" className="space-y-4">
                            {candidaturas.filter(c => parseStatusCandidatura(c.status) === 'ACEITA').length > 0 ? (
                                candidaturas
                                    .filter(c => parseStatusCandidatura(c.status) === 'ACEITA')
                                    .map(cand => (
                                        <li key={cand.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900">{cand.tituloProjeto || 'Projeto Sem Título'}</h4>
                                                    {cand.mensagem && (
                                                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{cand.mensagem}</p>
                                                    )}
                                                </div>
                                                <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                                                    <CheckCircle2 size={14} />
                                                    Participando
                                                </span>
                                            </div>
                                        </li>
                                    ))
                            ) : (
                                <li>
                                    <div className="w-full py-8 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                                        <p className="text-sm text-slate-500 italic">Ainda não possui participações ativas.</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </section>

                </div>
            </main>

            {modalAberto && (
                <EditarPerfilFreelancerModal
                    perfil={perfil}
                    onClose={() => setModalAberto(false)}
                    onSaved={refetch}
                />
            )}
        </div>
    );
}