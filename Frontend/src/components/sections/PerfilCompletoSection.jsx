import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function PerfilCompletoSection() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] mb-6 relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-[#111827] text-sm">Perfil completo</h3>
        <span className="text-[13px] font-bold text-[#111827]">85%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 relative overflow-hidden">
        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
      </div>
      <p className="text-[13px] text-[#6B7280] mb-4 leading-relaxed">
        Adicione mais projetos ao portfólio para aumentar suas chances.
      </p>
      <a href="#perfil-completar" className="text-[#0D63C1] text-[13px] font-bold hover:underline flex items-center gap-1">
        Completar perfil <ArrowRight size={14} />
      </a>
    </div>
  )
}
