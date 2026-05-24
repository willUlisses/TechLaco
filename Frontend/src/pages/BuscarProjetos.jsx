import { useState, useEffect, useCallback } from 'react'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import BuscarProjetoCard from '../components/sections/BuscarProjetoCard'
import ModalDetalhesProjeto from '../components/ui/ModalDetalhesProjeto'
import ModalCandidatura from '../components/ui/ModalCandidatura'
import FiltroProjetos from '../components/ui/FiltroProjetos'
import { api } from '../services/api'
import { NIVEIS_PROJETO } from '../utils/projetoConfig'

// Monta a query string respeitando as regras do workflow
function buildQueryParams(filtros, pagina, tamanho = 10) {
  const params = new URLSearchParams()
  if (filtros.busca)    params.set('busca',    filtros.busca)
  if (filtros.nivel)    params.set('nivel',    filtros.nivel)
  if (filtros.valorMin) params.set('valorMin', filtros.valorMin)
  if (filtros.valorMax) params.set('valorMax', filtros.valorMax)
  params.set('pagina',  String(pagina))
  params.set('tamanho', String(tamanho))
  return params.toString()
}

export default function BuscarProjetos() {
  const [filtros, setFiltros] = useState({
    busca: '', nivel: '', valorMin: '', valorMax: '',
  })
  const [pagina, setPagina]     = useState(0)
  const [resultado, setResultado] = useState({ dados: [], totalPaginas: 0, totalElementos: 0 })
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro]           = useState(null)

  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false)
  const [modalCandidaturaAberto, setModalCandidaturaAberto] = useState(false)
  const [projetoSelecionado, setProjetoSelecionado] = useState(null)

  // Re-fetch sempre que filtros ou página mudarem (com debounce para a busca textual)
  const fetchProjetos = useCallback(() => {
    const qs = buildQueryParams(filtros, pagina)
    setCarregando(true)
    setErro(null)
    api.get(`/projetos?${qs}`)
      .then(data => setResultado(data ?? { dados: [], totalPaginas: 0, totalElementos: 0 }))
      .catch(err => setErro(err?.mensagem ?? 'Erro ao carregar projetos'))
      .finally(() => setCarregando(false))
  }, [filtros, pagina])

  useEffect(() => {
    const timeoutId = setTimeout(fetchProjetos, 300)
    return () => clearTimeout(timeoutId)
  }, [fetchProjetos])

  function atualizarFiltro(campo, valor) {
    setFiltros(prev => ({ ...prev, [campo]: valor }))
    setPagina(0) // sempre volta à primeira página ao filtrar
  }

  function limparFiltros() {
    setFiltros(prev => ({ ...prev, nivel: '', valorMin: '', valorMax: '' }))
    setPagina(0)
  }

  function abrirDetalhes(projeto) {
    setProjetoSelecionado(projeto)
    setModalDetalhesAberto(true)
  }

  function abrirCandidatura(projeto) {
    setProjetoSelecionado(projeto)
    setModalCandidaturaAberto(true)
  }

  const filtrosAtivos = [filtros.nivel, filtros.valorMin, filtros.valorMax].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      {/* ── Subheader ── */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="pt-6 sm:pt-8 pb-6 sm:pb-8">
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

          {/* Barra de busca + botão de filtros */}
          <div className="pb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99a1af] pointer-events-none"
                />
                <input
                  id="input-busca-projetos"
                  type="text"
                  value={filtros.busca}
                  onChange={e => atualizarFiltro('busca', e.target.value)}
                  placeholder="Buscar por tecnologia, empresa ou tipo de projeto..."
                  className="w-full pl-10 pr-4 py-[10px] border border-[#e5e7eb] rounded-[10px] text-sm
                    text-[rgba(10,10,10,0.5)] outline-none focus:border-[#0066cc] transition-colors duration-200
                    placeholder:text-[#99a1af]"
                />
              </div>

              {/* Componente de filtros */}
              <FiltroProjetos
                filtros={filtros}
                onChange={atualizarFiltro}
                onLimpar={limparFiltros}
              />
            </div>

            {/* Tags de filtros ativos */}
            {filtrosAtivos > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#99a1af]">Filtros ativos:</span>

                {filtros.nivel && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#0066cc] text-xs font-medium">
                    Nível: {NIVEIS_PROJETO.find(n => n.value === filtros.nivel)?.label ?? filtros.nivel}
                    <button
                      type="button"
                      onClick={() => atualizarFiltro('nivel', '')}
                      className="ml-0.5 text-[#0066cc] hover:text-[#004da0] transition-colors"
                      aria-label="Remover filtro de nível"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {(filtros.valorMin || filtros.valorMax) && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#0066cc] text-xs font-medium">
                    {filtros.valorMin && `R$ ${filtros.valorMin}`}
                    {filtros.valorMin && filtros.valorMax && ' – '}
                    {filtros.valorMax && `R$ ${filtros.valorMax}`}
                    <button
                      type="button"
                      onClick={() => {
                        atualizarFiltro('valorMin', '')
                        atualizarFiltro('valorMax', '')
                      }}
                      className="ml-0.5 text-[#0066cc] hover:text-[#004da0] transition-colors"
                      aria-label="Remover filtro de valor"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 lg:w-full min-w-0">

            {/* Contador de resultados */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#6a7282] text-md">
                <span className="text-[#101828] font-semibold">
                  {carregando ? '...' : resultado.totalElementos ?? resultado.dados.length}
                </span>{' '}
                {(resultado.totalElementos ?? resultado.dados.length) === 1
                  ? 'projeto encontrado'
                  : 'projetos encontrados'}
              </p>
            </div>

            {/* Cards ou estados */}
            <div className="flex flex-col gap-3">
              {carregando ? (
                <div className="flex items-center justify-center py-12">
                  <span className="text-sm text-[#99a1af]">Carregando projetos...</span>
                </div>
              ) : erro ? (
                <div className="flex items-center justify-center py-12">
                  <span className="text-sm text-[#EF4444]">{erro}</span>
                </div>
              ) : resultado.dados.length > 0 ? (
                resultado.dados.map(projeto => (
                  <BuscarProjetoCard
                    key={projeto.id}
                    projeto={projeto}
                    onVerMais={abrirDetalhes}
                    onCandidatar={abrirCandidatura}
                  />
                ))
              ) : (
                <div className="text-center py-16 text-[#99a1af]">
                  <Search size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">Nenhum projeto encontrado</p>
                  <p className="text-xs mt-1">Tente ajustar seus filtros ou termo de busca.</p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {resultado.totalPaginas > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  id="btn-pagina-anterior"
                  type="button"
                  onClick={() => setPagina(p => Math.max(0, p - 1))}
                  disabled={pagina === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] border border-[#e5e7eb]
                    text-sm text-[#4a5565] disabled:opacity-40 hover:bg-[#f3f4f6] transition-colors"
                >
                  <ChevronLeft size={15} />
                  Anterior
                </button>
                <span className="px-3 py-2 text-sm text-[#6a7282]">
                  {pagina + 1} de {resultado.totalPaginas}
                </span>
                <button
                  id="btn-proxima-pagina"
                  type="button"
                  onClick={() => setPagina(p => Math.min(resultado.totalPaginas - 1, p + 1))}
                  disabled={pagina >= resultado.totalPaginas - 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[10px] border border-[#e5e7eb]
                    text-sm text-[#4a5565] disabled:opacity-40 hover:bg-[#f3f4f6] transition-colors"
                >
                  Próxima
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      <ModalDetalhesProjeto
        projetoId={projetoSelecionado?.id}
        aberto={modalDetalhesAberto}
        onFechar={() => setModalDetalhesAberto(false)}
        onCandidatar={abrirCandidatura}
      />

      <ModalCandidatura
        projeto={projetoSelecionado}
        aberto={modalCandidaturaAberto}
        onFechar={() => setModalCandidaturaAberto(false)}
        onSucesso={() => {}}
      />
    </div>
  )
}
