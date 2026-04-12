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

      <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-6">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-2">
          Clientes
        </p>
        <h1 className="text-[2rem] font-extrabold text-[#111827] leading-tight mb-2">
          Publicar Projeto
        </h1>
        <p className="text-[#64748B] text-base">
          Descreva o que precisa e receba propostas de freelancers qualificados.
        </p>
      </div>

      <hr className="border-[#E2E8F0]" />

      <div className='flex gap-12 justify-center items-start py-8'>
        <div className='flex flex-col'>
          <div className="px-6">
            <NovoProjetoCard onPublicar={() => setModalAberto(true)} />
          </div>
          {modalAberto && (
            <PublicarProjetoModal
              onClose={() => setModalAberto(false)}
              onSucesso={handleProjetoPublicado}
            />
          )}
          <div className="px-6 ">
            <SeusProjetosSection
              projetos={projetos}
              carregando={carregando}
              erro={erro}
              onCancelar={handleCancelarProjeto}
              onEditar={abrirEdicao}
              onVerCandidaturas={abrirCandidaturas}
            />
          </div>
        </div>
        <DicasCard />

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
