import React from 'react'
import { LayoutDashboard, User } from 'lucide-react'

export default function AcessoRapidoSection() {
  return (
    <section>
      <h2 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">
        Acesso Rápido
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Dashboard Card */}
        <a href="#dashboard" className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-gray-200 transition-all no-underline h-full flex flex-col justify-between">
          <div className="w-10 h-10 rounded-[10px] bg-gray-50 text-[#6B7280] group-hover:text-[#111827] transition-colors flex items-center justify-center mb-6">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-sm mb-1">Dashboard</h3>
            <p className="text-[#9CA3AF] text-[12px] m-0">Métricas e desempenho</p>
          </div>
        </a>

        {/* Meu Perfil Card */}
        <a href="#perfil" className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-gray-200 transition-all no-underline h-full flex flex-col justify-between">
          <div className="w-10 h-10 rounded-[10px] bg-gray-50 text-[#6B7280] group-hover:text-[#111827] transition-colors flex items-center justify-center mb-6">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-sm mb-1">Meu Perfil</h3>
            <p className="text-[#9CA3AF] text-[12px] m-0">Portfólio e habilidades</p>
          </div>
        </a>

      </div>
    </section>
  )
}
