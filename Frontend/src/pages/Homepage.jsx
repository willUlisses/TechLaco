import React from 'react'
import Navbar from '../components/Navbar'
import WelcomeSection from '../components/sections/WelcomeSection'
import ParaOndeIrSection from '../components/sections/ParaOndeIrSection'
import AcessoRapidoSection from '../components/sections/AcessoRapidoSection'
import PerfilCompletoSection from '../components/sections/PerfilCompletoSection'

export default function Homepage() {
  const user = { nome: 'Ana Silva' }

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-12">
      <Navbar user={user} />

      <main>
        <section className="border-b border-[#E5E7EB] bg-white">
          <div className="mx-auto max-w-[1100px] px-6 py-10">
            <WelcomeSection user={user} />
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pt-8 md:pt-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
            <div className="flex-1 space-y-8">
            <ParaOndeIrSection />
            <AcessoRapidoSection />
          </div>

            <aside className="w-full shrink-0 lg:w-[320px]">
              <PerfilCompletoSection />
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
