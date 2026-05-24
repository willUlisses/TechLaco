import {
  BarChart3,
  Wallet,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SemAcesso from '../components/ui/SemAcesso';
import { useAuth } from '../contexts/AuthContext';
import { useCandidaturas } from '../hooks/useCandidaturas';
import { statusConfig, parseStatusCandidatura } from '../utils/candidaturaConfig';

export default function Dashboard() {
  const { usuario } = useAuth();
  const { candidaturas, receitaTotal, loading, error } = useCandidaturas();

  if (!usuario?.isFreelancer) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <SemAcesso tipo="freelancer" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="text-sm text-slate-500">Carregando dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="text-sm text-red-500">Erro ao carregar dados do dashboard.</span>
      </div>
    );
  }

  const concluidos = candidaturas.filter(c => parseStatusCandidatura(c.status) === 'ACEITA').length;
  const emAndamento = candidaturas.filter(c => parseStatusCandidatura(c.status) === 'PENDENTE').length;
  const cancelados = candidaturas.filter(c => parseStatusCandidatura(c.status) === 'RECUSADA').length;

  const receitaFormatada = receitaTotal != null
    ? Number(receitaTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : 'R$ 0,00';

  // Mostrar até 5 candidaturas recentes
  const candidaturasRecentes = candidaturas.slice(0, 5);

  const stats = [
    {
      title: 'Ganhos Totais',
      value: receitaFormatada,
      trend: '+12.5%',
      icon: Wallet,
      color: 'bg-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Projetos Concluídos',
      value: concluidos.toString(),
      trend: '+2.4%',
      icon: Briefcase,
      color: 'bg-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Em Andamento',
      value: emAndamento.toString(),
      trend: '-1.5%',
      icon: Activity,
      color: 'bg-purple-500',
      bg: 'bg-purple-50'
    },
    {
      title: 'Taxa de Sucesso',
      value: candidaturas.length > 0
        ? `${Math.round((concluidos / candidaturas.length) * 100)}%`
        : '0%',
      trend: '+4.1%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      bg: 'bg-orange-50'
    },
  ];

  const getStatusIcon = (statusNormalizado) => {
    switch (statusNormalizado) {
      case 'ACEITA': return <CheckCircle2 size={16} />;
      case 'RECUSADA': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Bem-vindo de volta, {usuario?.nome}. Aqui está o resumo do seu desempenho.</p>
          </div>
          <Link
            to="/freelancers/buscarProjeto"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Buscar Projetos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg}`}>
                  <stat.icon size={20} className={`text-${stat.color.split('-')[1]}-600`} />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                  }`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Conteúdo Principal: Gráficos e Atividades */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Gráfico de Ganhos (Placeholder estático para demonstração) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Visão de Ganhos</h2>
              <select className="text-sm border-slate-200 rounded-lg text-slate-600 bg-slate-50 px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option>Últimos 6 meses</option>
                <option>Este ano</option>
              </select>
            </div>

            <div className="h-64 flex items-end justify-between gap-2 pt-4">
              {/* Barras de mockup geradas */}
              {[40, 70, 45, 90, 65, 85].map((height, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2 group">
                  <div className="w-full relative h-full flex items-end justify-center">
                    <div
                      className="w-full max-w-[40px] bg-blue-100 rounded-t-sm group-hover:bg-blue-200 transition-colors"
                      style={{ height: '100%' }}
                    >
                      <div
                        className="w-full bg-blue-600 rounded-t-sm transition-all duration-500 shadow-sm"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Atividades Recentes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Candidaturas Recentes</h2>
              <Link to="/candidaturas/minhas" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                Ver todas <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {candidaturasRecentes.length > 0 ? candidaturasRecentes.map((cand) => {
                const statusNorm = parseStatusCandidatura(cand.status);
                const conf = statusConfig[statusNorm];
                return (
                  <div key={cand.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                    <div className={`mt-1 p-2 rounded-full ${conf.badgeBg} ${conf.badgeText}`}>
                      {getStatusIcon(statusNorm)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {cand.tituloProjeto || 'Projeto Sem Título'}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        Status: <span className="font-medium">{conf.label}</span>
                      </p>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  <BarChart3 size={32} className="mx-auto mb-3 text-slate-300" />
                  <p>Nenhuma candidatura recente.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}