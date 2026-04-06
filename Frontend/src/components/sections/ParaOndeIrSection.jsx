import React from 'react'
import { Search, FileText, Briefcase, ChevronRight } from 'lucide-react'

export default function ParaOndeIrSection() {
  return (
    <section>
      <h2 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">
        Para Onde Ir
      </h2>
      <div className="space-y-3">
        {/* Buscar Projetos */}
        <a href="#buscar-projetos" className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 no-underline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-blue-50 text-[#0D63C1] flex items-center justify-center shrink-0">
                <Search size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-[#111827] text-lg">Buscar Projetos</span>
                  <span className="bg-blue-50 text-[#0D63C1] font-semibold px-2.5 py-0.5 rounded-full text-[11px]">12 novos hoje</span>
                </div>
                <p className="text-[#6B7280] text-[13px] m-0">Explore oportunidades que combinam com suas habilidades e especialidades</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#0D63C1] transition-colors" />
          </div>
        </a>

        {/* Minhas Candidaturas */}
        <a href="#minhas-candidaturas" className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 no-underline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <FileText size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-[#111827] text-lg">Minhas Candidaturas</span>
                  <span className="bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-0.5 rounded-full text-[11px]">5 ativas</span>
                </div>
                <p className="text-[#6B7280] text-[13px] m-0">Acompanhe o andamento de cada candidatura enviada</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        </a>

        {/* Meus Projetos */}
        <a href="#meus-projetos" className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 no-underline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-blue-50 text-[#0D63C1] flex items-center justify-center shrink-0">
                <Briefcase size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-[#111827] text-lg">Meus Projetos</span>
                  <span className="bg-blue-50 text-[#0D63C1] font-semibold px-2.5 py-0.5 rounded-full text-[11px]">3 em andamento</span>
                </div>
                <p className="text-[#6B7280] text-[13px] m-0">Veja projetos em andamento e contratos em aberto</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#0D63C1] transition-colors" />
          </div>
        </a>
      </div>
    </section>
  )
}
