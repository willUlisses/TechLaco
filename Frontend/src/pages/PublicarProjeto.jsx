import { useState } from 'react'
import Navbar from '../components/Navbar'
import NovoProjetoCard from '../components/sections/NovoProjetoCard'
import PublicarProjetoModal from '../components/ui/PublicarProjetoModal'

export default function PublicarProjeto() {
  const [modalAberto, setModalAberto] = useState(false)

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

      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <NovoProjetoCard onPublicar={() => setModalAberto(true)} />
      </div>

      {modalAberto && (
        <PublicarProjetoModal onClose={() => setModalAberto(false)} />
      )}
    </div>
  )
}
