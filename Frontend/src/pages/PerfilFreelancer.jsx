import PortfolioItem from '../components/ui/PortfolioItem';
import SkillBadge from '../components/ui/SkillBadge';
import MetricCard from '../components/ui/MetricCard';
import ProfileNav from '../components/ui/ProfileNav';
import Navbar from '../components/Navbar';

import {
    Plus,
    MapPin,
    GraduationCap,
    Pencil,
    Clock,
    XCircle,
    DollarSign,
    CheckCircle2,
} from 'lucide-react';

const METRICS = [
    {
        label: 'Concluídos',
        value: 15,
        icon: CheckCircle2,
        colorClass: 'bg-emerald-50 text-emerald-600',
    },
    {
        label: 'Em andamento',
        value: 3,
        icon: Clock,
        colorClass: 'bg-blue-50 text-blue-600',
    },
    {
        label: 'Cancelados',
        value: 1,
        icon: XCircle,
        colorClass: 'bg-red-50 text-red-600',
    },
    {
        label: 'Receita total',
        value: 'R$ 18.400',
        icon: DollarSign,
        colorClass: 'bg-orange-50 text-orange-600',
    },
];

const SKILLS = [
    'React', 'TypeScript', 'JavaScript', 'Tailwind CSS',
    'Next.js', 'HTML/CSS', 'Git', 'Figma', 'Node.js', 'REST APIs',
];

const LANGUAGES = [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Avançado' },
    { name: 'Espanhol', level: 'Intermediário' },
];

const PORTFOLIO_ITEMS = [
    {
        id: 1,
        title: 'Landing Page — Restaurante Gourmet',
        tech: 'React • Tailwind',
        status: 'Concluído',
    },
    {
        id: 2,
        title: 'E-commerce — Boutique Fashion',
        tech: 'Next.js • Stripe',
        status: 'Concluído',
    },
    {
        id: 3,
        title: 'Dashboard — Sistema de Agendamento',
        tech: 'React • Chart.js',
        status: 'Em andamento',
    },
];


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

function LanguageRow({ name, level, isLast }) {
    return (
        <div
            className={`flex justify-between items-center pb-4 ${!isLast ? 'border-b border-slate-100' : ''}`}
        >
            <span className="font-medium text-slate-700 text-sm">{name}</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                {level}
            </span>
        </div>
    );
}

const cliente = {
    nome: 'Ana Silva',
    cidade: 'Sao Paulo, SP',
    universidade: 'Universidade de Sao Paulo (USP)',
    membroDesde: 'Janeiro 2025',
}

export default function PerfilFreelancer() {

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
            <Navbar user={{ nome: cliente.nome }} />

            {/* ── Cabeçalho do perfil ── */}
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

            {/* ── Conteúdo principal ── */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col gap-8">

                    {/* Métricas de desempenho */}
                    <section aria-labelledby="metricas-heading">
                        <SectionHeader id="metricas-heading" title="Métricas de desempenho" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {METRICS.map(({ label, value, icon, colorClass }) => (
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
                            onAction={() => { }}
                        />
                        <div className="bg-white p-6 rounded-xl border border-slate-200 text-slate-800 leading-relaxed text-sm">
                            Sou estudante de Ciência da Computação na USP com foco em
                            desenvolvimento frontend. Tenho experiência em criar interfaces
                            modernas e responsivas para pequenas empresas e empreendedores.
                            Minha missão é ajudar negócios a terem presença digital
                            profissional com preços acessíveis.
                        </div>
                    </section>

                    {/* Habilidades */}
                    <section aria-labelledby="habilidades-heading">
                        <SectionHeader
                            id="habilidades-heading"
                            title="Habilidades"
                            actionText="+ Adicionar"
                            onAction={() => { }}
                        />
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <ul
                                role="list"
                                className="flex flex-wrap gap-2"
                                aria-label="Lista de habilidades"
                            >
                                {SKILLS.map((skill) => (
                                    <SkillBadge key={skill} label={skill} />
                                ))}

                                {/* Ação de adicionar nova skill dentro da lista */}
                                <li>
                                    <button
                                        type="button"
                                        className="px-4 py-1.5 border border-dashed border-slate-300 rounded-full text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 transition"
                                    >
                                        <Plus size={14} aria-hidden="true" />
                                        Nova skill
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Idiomas */}
                    <section aria-labelledby="idiomas-heading">
                        <SectionHeader
                            id="idiomas-heading"
                            title="Idiomas"
                            actionText="Editar"
                            onAction={() => { }}
                        />
                        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                            {LANGUAGES.map(({ name, level }, index) => (
                                <LanguageRow
                                    key={name}
                                    name={name}
                                    level={level}
                                    isLast={index === LANGUAGES.length - 1}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Portfólio */}
                    <section aria-labelledby="portfolio-heading">
                        <SectionHeader
                            id="portfolio-heading"
                            title="Portfólio"
                            actionText="+ Adicionar projeto"
                            onAction={() => { }}
                        />
                        <ul role="list" className="space-y-4">
                            {PORTFOLIO_ITEMS.map(({ id, title, tech, status }) => (
                                <PortfolioItem
                                    key={id}
                                    title={title}
                                    tech={tech}
                                    status={status}
                                />
                            ))}

                            {/* Botão de adicionar ao portfólio */}
                            <li>
                                <button
                                    type="button"
                                    className="w-full py-4 border border-dashed border-slate-300 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-400 transition flex justify-center items-center gap-2"
                                >
                                    <Plus size={18} aria-hidden="true" />
                                    Adicionar ao portfólio
                                </button>
                            </li>
                        </ul>
                    </section>

                </div>
            </main>
        </div>
    );
}