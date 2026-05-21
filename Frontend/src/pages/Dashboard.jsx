import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [menuClienteAberto, setMenuClienteAberto] = useState(false);
  const [menuFreelaAberto, setMenuFreelaAberto] = useState(false);
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);
  const [acaoSelecionada, setAcaoSelecionada] = useState("");
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const clienteLinks = [
    { label: "Criar projeto", to: "/clientes/publicar" },
    { label: "Ver freelancers", to: "/clientes/buscarFreelancers" },
  ];

  const freelaLinks = [
    { label: "Encontrar projetos", to: "/freelancers/buscarProjeto" },
    { label: "Minhas candidaturas", to: "/freelancers/candidaturas" },
  ];

  const metricas = [
    {
      valor: "3",
      titulo: "Projetos ativos",
      cor: "bg-blue-50 text-blue-600",
      icone: "▣",
    },
    {
      valor: "12",
      titulo: "Concluídos",
      cor: "bg-green-50 text-green-600",
      icone: "✓",
    },
    {
      valor: "R$ 5.420",
      titulo: "Receita total",
      cor: "bg-orange-50 text-orange-500",
      icone: "$",
    },
    {
      valor: "4.9",
      titulo: "Avaliação média",
      cor: "bg-yellow-50 text-yellow-500",
      icone: "★",
    },
  ];

  const projetos = [
    {
      nome: "Landing Page para Restaurante",
      info: "Maria Costa · R$ 850 · até 15 abr",
      status: "Em andamento",
      cor: "bg-blue-50 text-blue-600",
    },
    {
      nome: "Sistema de Agendamento Online",
      info: "João Silva · R$ 1.200 · até 10 abr",
      status: "Em revisão",
      cor: "bg-yellow-50 text-yellow-600",
    },
    {
      nome: "Automação de WhatsApp",
      info: "Ana Paula · R$ 600 · até 20 abr",
      status: "Iniciando",
      cor: "bg-green-50 text-green-600",
    },
    {
      nome: "Automação de WhatsApp",
      info: "Ana Paula · R$ 600 · até 20 abr",
      status: "Iniciando",
      cor: "bg-green-50 text-green-600",
    },
  ];

  const acoesRapidas = [
    {
      texto: "Buscar novos projetos",
      cor: "bg-blue-50 text-blue-600",
      icone: "⌕",
      to: "/freelancers/buscarProjeto",
    },
    {
      texto: "Minhas candidaturas",
      cor: "bg-green-50 text-green-600",
      icone: "✓",
      to: "/freelancers/candidaturas",
    },
    {
      texto: "Meu perfil",
      cor: "bg-orange-50 text-orange-500",
      icone: "👤",
      to: usuario?.isCliente ? "/perfil/cliente" : "/perfil/freelancer",
    },
  ];

  function clicarAcao(acao) {
    setAcaoSelecionada(acao.texto);
    if (acao.to) {
      navigate(acao.to);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-sans text-[#101828]">
      <header className="sticky top-0 z-50 h-[57px] border-b border-[#e5e7eb] bg-white">
        <Navbar />
      </header>

      <section className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-[1088px] px-4 py-8">
          <p className="text-xs font-semibold uppercase tracking-[1.2px] text-[#99a1af]">
            Visão geral
          </p>

          <h1 className="mt-1 text-2xl font-medium leading-9 text-[#101828]">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#99a1af]">
            Acompanhe seu desempenho e projetos em andamento.
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1088px] grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_341px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[1.2px] text-[#99a1af]">
              Métricas
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metricas.map((item) => (
                <div
                  key={item.titulo}
                  className="h-[140px] rounded-[14px] border border-[#e5e7eb] bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`mb-3 flex h-8 w-8 items-center justify-center rounded-[10px] text-sm ${item.cor}`}
                  >
                    {item.icone}
                  </div>

                  <p className="mt-2 text-base font-semibold text-[#101828]">
                    {item.valor}
                  </p>

                  <p className="mt-1 text-xs text-[#99a1af]">
                    {item.titulo}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[1.2px] text-[#99a1af]">
                Projetos ativos
              </h2>

              <button
                onClick={() => navigate('/freelancers/buscarProjeto')}
                className="text-xs text-[#0066cc] transition hover:underline"
              >
                Ver todos →
              </button>
            </div>

            <div className="space-y-3">
              {projetos.map((projeto) => (
                <button
                  key={projeto.nome}
                  onClick={() => navigate(usuario?.isCliente ? '/clientes/buscarFreelancers' : '/freelancers/buscarProjeto')}
                  className="flex min-h-[80px] w-full items-center justify-between rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-left transition hover:border-blue-200 hover:shadow-md"
                >
                  <div>
                    <h3 className="text-sm font-medium text-[#1e2939]">
                      {projeto.nome}
                    </h3>

                    <p className="mt-1 text-xs text-[#99a1af]">
                      {projeto.info}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-[10px] py-1 text-xs ${projeto.cor}`}
                  >
                    {projeto.status}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[1.2px] text-[#99a1af]">
              Ações rápidas
            </h2>

            <div className="space-y-2">
              {acoesRapidas.map((acao) => (
                <button
                  key={acao.texto}
                  onClick={() => clicarAcao(acao)}
                  className="flex h-[54px] w-full items-center gap-3 rounded-[14px] border border-[#e5e7eb] bg-white px-4 text-left text-sm text-[#364153] transition hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-[10px] text-xs ${acao.cor}`}
                  >
                    {acao.icone}
                  </span>

                  <span className="flex-1">{acao.texto}</span>

                  <span className="text-gray-300">›</span>
                </button>
              ))}
            </div>

            {acaoSelecionada && (
              <div className="mt-4 rounded-[14px] border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
                Ação selecionada: <strong>{acaoSelecionada}</strong>
              </div>
            )}
          </section>

          <section className="rounded-[14px] border border-[#e5e7eb] bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[1.2px] text-[#99a1af]">
              Resumo
            </h2>

            <p className="mt-3 text-sm text-[#364153]">
              Você possui <strong>3 projetos ativos</strong> e uma avaliação
              média de <strong>4.9</strong>.
            </p>

            <button
              onClick={() => navigate('/home')}
              className="mt-4 w-full rounded-[10px] bg-[#0066cc] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Ver desempenho
            </button>
          </section>
        </aside>
      </main>
    </div>
  );
}