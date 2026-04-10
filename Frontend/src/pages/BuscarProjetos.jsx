import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import BuscarProjetoCard from '../components/sections/BuscarProjetoCard'

const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado']

const projetos = [
  {
    id: 1,
    titulo: 'Desenvolvimento de Site Institucional',
    nivel: 'Iniciante',
    empresa: 'Boutique Maria Clara',
    empresaVerificada: true,
    rating: 4.8,
    descricao:
      'Site moderno e responsivo com catálogo de produtos, integração com Instagram e formulário de contato.',
    tags: ['HTML/CSS', 'JavaScript', 'Responsivo'],
    valorMin: 2500,
    valorMax: 3500,
    prazo: 30,
    local: 'Remoto',
    propostas: 8,
    tempo: 'Há 2 dias',
  },
  {
    id: 2,
    titulo: 'App Mobile para Delivery de Marmitas',
    nivel: 'Avançado',
    empresa: 'Sabor Caseiro Delivery',
    empresaVerificada: true,
    rating: 4.9,
    descricao:
      'App iOS e Android com pedidos, pagamento integrado (PIX e cartão) e rastreamento de entrega.',
    tags: ['React Native', 'Flutter', 'Node.js'],
    valorMin: 8000,
    valorMax: 12000,
    prazo: 60,
    local: 'Remoto',
    propostas: 15,
    tempo: 'Há 1 dia',
  },
  {
    id: 3,
    titulo: 'Sistema de Gestão para Salão de Beleza',
    nivel: 'Intermediário',
    empresa: 'Espaço Elegance',
    empresaVerificada: true,
    rating: 5,
    descricao:
      'Agendamento online, controle de clientes, gestão financeira e relatórios para salão.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    valorMin: 5000,
    valorMax: 7000,
    prazo: 45,
    local: 'Híbrido · São Paulo',
    propostas: 12,
    tempo: 'Há 3 dias',
  },
  {
    id: 4,
    titulo: 'Automação de WhatsApp para Atendimento',
    nivel: 'Intermediário',
    empresa: 'AutoPeças Figueiredo',
    empresaVerificada: false,
    rating: 4.5,
    descricao:
      'Chatbot para responder dúvidas, enviar catálogos e integrar com planilha de estoque.',
    tags: ['Python', 'APIs WhatsApp', 'Chatbot'],
    valorMin: 1500,
    valorMax: 2500,
    prazo: 20,
    local: 'Remoto',
    propostas: 6,
    tempo: 'Há 5 dias',
  },
  {
    id: 5,
    titulo: 'Redesign de Identidade Visual e Landing Page',
    nivel: 'Intermediário',
    empresa: 'FitCoach Online',
    empresaVerificada: true,
    rating: 4.7,
    descricao:
      'Nova identidade visual e landing page otimizada para conversão de leads.',
    tags: ['UI/UX Design', 'Figma', 'Landing Page'],
    valorMin: 3000,
    valorMax: 4500,
    prazo: 35,
    local: 'Remoto',
    propostas: 20,
    tempo: 'Há 4 dias',
  },
  {
    id: 6,
    titulo: 'Sistema de Controle de Estoque e Vendas',
    nivel: 'Iniciante',
    empresa: 'Papelaria Estudo Fácil',
    empresaVerificada: true,
    rating: 4.6,
    descricao:
      'Controle simples de estoque, registro de vendas e relatórios básicos para papelaria.',
    tags: ['Desenvolvimento Web', 'PHP', 'MySQL'],
    valorMin: 3500,
    valorMax: 5000,
    prazo: 40,
    local: 'Híbrido · Campinas',
    propostas: 10,
    tempo: 'Há 1 semana',
  },
]

const estatisticas = { total: 6, hoje: 3, mediaProposta: 11 }

export default function BuscarProjetos() {
  const [busca, setBusca] = useState('')
  const [nivelAtivo, setNivelAtivo] = useState('Todos')

  const projetosFiltrados = projetos.filter(p => {
    const matchNivel = nivelAtivo === 'Todos' || p.nivel === nivelAtivo
    const termo = busca.toLowerCase()
    const matchBusca =
      p.titulo.toLowerCase().includes(termo) ||
      p.empresa.toLowerCase().includes(termo) ||
      p.tags.some(t => t.toLowerCase().includes(termo))
    return matchNivel && matchBusca
  })

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* ── Subheader ── */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="pt-6 sm:pt-8 pb-0">
            <p className="text-[#99a1af] text-xs font-semibold uppercase tracking-[1.2px]">
              Oportunidades
            </p>
            <h1 className="font-['Poppins'] font-medium text-xl sm:text-2xl text-[#101828] leading-9 mt-1">
              Buscar Projetos
            </h1>
            <p className="text-[#99a1af] text-sm mt-1">
              Projetos reais de MEIs e pequenas empresas que precisam do seu talento.
            </p>
          </div>

          <div className="pt-4 pb-4 flex flex-col gap-4">
            {/* Busca + Filtros */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99a1af] pointer-events-none"
                />
                <input
                  type="text"
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  placeholder="Buscar por tecnologia, empresa ou tipo de projeto..."
                  className="w-full pl-10 pr-4 py-[10px] border border-[#e5e7eb] rounded-[10px] text-sm
                    text-[rgba(10,10,10,0.5)] outline-none focus:border-[#0066cc] transition-colors duration-200
                    placeholder:text-[#99a1af]"
                />
              </div>
            </div>

            {/* Chips de nível */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-none">
              {niveis.map(nivel => (
                <button
                  key={nivel}
                  onClick={() => setNivelAtivo(nivel)}
                  className={`px-3 py-1.5 rounded-[10px] text-xs font-medium whitespace-nowrap
                    transition-colors duration-150 cursor-pointer border-none shrink-0
                    ${nivel === nivelAtivo
                      ? 'bg-[#0066cc] text-white shadow-[0_2px_8px_rgba(0,102,204,0.25)]'
                      : 'bg-[#f3f4f6] text-[#4a5565] hover:bg-[#e5e7eb]'
                    }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Coluna esquerda — lista de projetos */}
          <div className="flex-1 lg:w-full min-w-0">
            {/* Contador + ordenação */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#6a7282] text-md">
                <span className="text-[#101828] font-semibold">{projetosFiltrados.length}</span>{' '}
                {projetosFiltrados.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {projetosFiltrados.length > 0 ? (
                projetosFiltrados.map(projeto => (
                  <BuscarProjetoCard key={projeto.id} projeto={projeto} />
                ))
              ) : (
                <div className="text-center py-16 text-[#99a1af]">
                  <Search size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">Nenhum projeto encontrado</p>
                  <p className="text-xs mt-1">Tente ajustar seus filtros ou termo de busca.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
