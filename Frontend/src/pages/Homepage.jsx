import React from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/sections/WelcomeSection'
import ParaOndeIrSection from '../components/sections/ParaOndeIrSection'
import AcessoRapidoSection from '../components/sections/AcessoRapidoSection'
import PerfilCompletoSection from '../components/sections/PerfilCompletoSection'

export default function Homepage() {
  const user = { nome: 'Ana Silva' }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <Navbar user={user} />
      
      <main className="max-w-[1100px] mx-auto px-6 pt-10">
        <WelcomeSection user={user} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Lado Esquerdo (Mais largo) */}
          <div className="flex-1 space-y-10">
            <ParaOndeIrSection />
            <AcessoRapidoSection />
          </div>

          {/* Lado Direito (Widgets) */}
          <aside className="w-full lg:w-[320px] shrink-0 pt-0">
            <PerfilCompletoSection />
          </aside>
        </div>
      </main>
    </div>
  )
}
