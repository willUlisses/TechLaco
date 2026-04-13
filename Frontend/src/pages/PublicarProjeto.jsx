import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SeusProjetosSection from '../components/sections/SeusProjetosSection'
import DicasCard from '../components/sections/DicasCard'
import NovoProjetoCard from '../components/sections/NovoProjetoCard'
import PublicarProjetoModal from '../components/ui/PublicarProjetoModal'
import ModalEditarProjeto from '../components/ui/ModalEditarProjeto'
import ModalCandidaturasRecebidas from '../components/ui/ModalCandidaturasRecebidas'
import { projetoService } from '../services/projetoService'

export default function PublicarProjeto() {
  const [modalAberto, setModalAberto] = useState(false)
  const [modalEditarAberto, setModalEditarAberto] = useState(false)
  const [modalCandidaturasAberto, setModalCandidaturasAberto] = useState(false)
  const [projetoSelecionado, setProjetoSelecionado] = useState(null)
  const [projetos, setProjetos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  function abrirEdicao(projeto) {
    setProjetoSelecionado(projeto)
    setModalEditarAberto(true)
  }

  function handleSucessoEdicao(projetoAtualizado) {
    setProjetos(prev =>
      prev.map(p => p.id === projetoAtualizado.id ? projetoAtualizado : p)
    )
  }

  function abrirCandidaturas(projeto) {
    setProjetoSelecionado(projeto)
    setModalCandidaturasAberto(true)
  }

  function carregarProjetos() {
    setCarregando(true)
    setErro(null)
    projetoService.meus()
      .then(data => setProjetos(data))
      .catch(err => setErro(err?.mensagem ?? 'Erro ao carregar projetos'))
      .finally(() => setCarregando(false))
  }

  useEffect(() => {
    carregarProjetos()
  }, [])

  function handleProjetoPublicado() {
    setModalAberto(false)
    carregarProjetos()
  }

  function handleCancelarProjeto(id) {
    projetoService.cancelar(id)
      .then(() => setProjetos(prev => prev.filter(p => p.id !== id)))
      .catch(err => setErro(err?.mensagem ?? 'Erro ao cancelar projeto'))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-4 sm:pb-6">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-2">
          Clientes
        </p>
        <h1 className="text-2xl sm:text-[2rem] font-extrabold text-[#111827] leading-tight mb-2">
          Publicar Projeto
        </h1>
        <p className="text-[#64748B] text-sm sm:text-base">
          Descreva o que precisa e receba propostas de freelancers qualificados.
        </p>
      </div>

      <hr className="border-[#E2E8F0]" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Coluna principal */}
        <div className="flex flex-col gap-4 w-full lg:flex-1 min-w-0">
          <NovoProjetoCard onPublicar={() => setModalAberto(true)} />
          {modalAberto && (
            <PublicarProjetoModal
              onClose={() => setModalAberto(false)}
              onSucesso={handleProjetoPublicado}
            />
          )}
          <SeusProjetosSection
            projetos={projetos}
            carregando={carregando}
            erro={erro}
            onCancelar={handleCancelarProjeto}
            onEditar={abrirEdicao}
            onVerCandidaturas={abrirCandidaturas}
          />
        </div>

        {/* Coluna lateral — vai para baixo em mobile */}
        <div className="w-full lg:w-[300px] shrink-0">
          <DicasCard />
        </div>
      </div>
      <ModalEditarProjeto
        projeto={projetoSelecionado}
        aberto={modalEditarAberto}
        onFechar={() => setModalEditarAberto(false)}
        onSucesso={handleSucessoEdicao}
      />

      <ModalCandidaturasRecebidas
        projeto={projetoSelecionado}
        aberto={modalCandidaturasAberto}
        onFechar={() => setModalCandidaturasAberto(false)}
      />
    </div>
  )
}
