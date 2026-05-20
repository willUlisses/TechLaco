import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import CardCandidatura from '../components/sections/CardCandidatura'
import ModalDetalhesCandidatura from '../components/ui/ModalDetalhesCandidatura'
import CardResumoCandidaturas from '../components/sections/CardResumoCandidaturas'
import { candidaturaService } from '../services/candidaturaService'
import { parseStatusCandidatura } from '../utils/candidaturaConfig'

export default function MinhasCandidaturas() {
  const [candidaturas, setCandidaturas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [candidaturaSelecionada, setCandidaturaSelecionada] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)

  useEffect(() => {
    candidaturaService.minhas()
      .then(data => setCandidaturas(data))
      .catch(err => setErro(err?.mensagem ?? 'Erro ao carregar suas candidaturas'))
      .finally(() => setCarregando(false))
  }, [])

  // Recarrega quando o usuário volta para a aba (ex: estava no modal do cliente) - Sincronização
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        candidaturaService.minhas()
          .then(data => setCandidaturas(data))
          .catch(() => { })  // silencioso
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Sem filtros para MVP, usamos a lista original
  const candidaturasFiltradas = candidaturas;

  // Contagem por status para os badges das abas e o card de resumo
  const contagem = useMemo(() => {
    return candidaturas.reduce((acc, c) => {
      const chave = parseStatusCandidatura(c.status);
      acc[chave] = (acc[chave] ?? 0) + 1;
      return acc;
    }, {})
  }, [candidaturas])

  function abrirDetalhes(candidatura) {
    setCandidaturaSelecionada(candidatura)
    setModalAberto(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />

      {/* Subheader */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1088px] mx-auto px-4 md:px-8">

          {/* Breadcrumb + Título */}
          <div className="pt-8 pb-8">
            <p className="text-[#99a1af] text-[12px] font-semibold uppercase tracking-[1.2px]">
              Freelancer
            </p>
            <h1 className="font-['Poppins'] font-medium text-[24px] text-[#101828] leading-9 mt-1">
              Minhas Candidaturas
            </h1>
            <p className="text-[#99a1af] text-[14px] mt-1">
              Acompanhe o andamento de todas as suas propostas.
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-[1088px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-6 md:gap-8">

        {/* Coluna esquerda — lista */}
        <div className="flex-1 flex flex-col gap-3">

          {carregando && (
            <div className="flex items-center justify-center py-16">
              <span className="text-[14px] text-[#99a1af]">Carregando candidaturas...</span>
            </div>
          )}

          {erro && !carregando && (
            <div className="flex items-center justify-center py-16">
              <span className="text-[14px] text-[#EF4444]">{erro}</span>
            </div>
          )}

          {!carregando && !erro && candidaturasFiltradas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-[14px] text-[#99a1af]">
                Nenhuma candidatura encontrada.
              </span>
              <Link
                to="/freelancers/buscarProjeto"
                className="text-[14px] text-[#0066cc] font-medium hover:underline no-underline"
              >
                Buscar novos projetos
              </Link>
            </div>
          )}

          {!carregando && !erro && candidaturasFiltradas.map(candidatura => (
            <CardCandidatura
              key={candidatura.id}
              candidatura={candidatura}
              onVerDetalhes={() => abrirDetalhes(candidatura)}
            />
          ))}
        </div>

        {/* Coluna direita */}
        <div className="w-full md:w-[341px] flex flex-col gap-6 shrink-0 order-first md:order-last">
          <CardResumoCandidaturas contagem={contagem} />

          {/* CTA buscar projetos */}
          <div className="bg-white border border-dashed border-[#e5e7eb] rounded-[14px] px-[21px] pt-[21px] pb-[1px] flex flex-col gap-3">
            <p className="text-[#99a1af] text-[12px]">
              Procurando mais oportunidades?
            </p>
            <Link
              to="/freelancers/buscarProjeto"
              className="flex items-center justify-center gap-2 w-full bg-[#0066cc] text-white text-[14px] rounded-[10px] h-10 mb-5 no-underline hover:bg-[#005ab4] transition-colors"
            >
              <Search size={14} />
              Buscar projetos
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de detalhes */}
      <ModalDetalhesCandidatura
        candidatura={candidaturaSelecionada}
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
      />
    </div>
  )
}
