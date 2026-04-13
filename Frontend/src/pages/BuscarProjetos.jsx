import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import BuscarProjetoCard from '../components/sections/BuscarProjetoCard'
import ModalDetalhesProjeto from '../components/ui/ModalDetalhesProjeto'
import ModalCandidatura from '../components/ui/ModalCandidatura'
import { projetoService } from '../services/projetoService'

export default function BuscarProjetos() {
  const [busca, setBusca] = useState('')
  const [projetos, setProjetos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false)
  const [modalCandidaturaAberto, setModalCandidaturaAberto] = useState(false)
  const [projetoSelecionado, setProjetoSelecionado] = useState(null)

  function abrirDetalhes(projeto) {
    setProjetoSelecionado(projeto)
    setModalDetalhesAberto(true)
  }

  function abrirCandidatura(projeto) {
    setProjetoSelecionado(projeto)
    setModalCandidaturaAberto(true)
  }

  function handleSucessoCandidatura() {
    // Opção de atualizar interface ou counter se necessário
  }

  useEffect(() => {
    const carregarProjetos = async () => {
      setCarregando(true)
      setErro(null)
      try {
        const data = await projetoService.buscarAtivos({ busca })
        setProjetos(data.dados)
      } catch (err) {
        setErro(err?.mensagem ?? 'Erro ao carregar projetos')
      } finally {
        setCarregando(false)
      }
    }

    const timeoutId = setTimeout(() => { // debouncezinho pra não torar a api de requisição.
      carregarProjetos();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [busca])

  const projetosFiltrados = projetos;

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

          <div className="pt-4 pb-4 gap-4">
            {/* Busca */}
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
          </div>
        </div>
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 lg:w-full min-w-0">
            {/* Contador */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#6a7282] text-md">
                <span className="text-[#101828] font-semibold">{projetosFiltrados.length}</span>{' '}
                {projetosFiltrados.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {carregando ? (
                <div className="flex items-center justify-center py-12">
                  <span className="text-sm text-[#99a1af]">Carregando projetos...</span>
                </div>
              ) : erro ? (
                <div className="flex items-center justify-center py-12">
                  <span className="text-sm text-[#EF4444]">{erro}</span>
                </div>
              ) : projetosFiltrados.length > 0 ? (
                projetosFiltrados.map(projeto => (
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
          </div>
        </div>
      </div>

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
        onSucesso={handleSucessoCandidatura}
      />

    </div>
  )
}
