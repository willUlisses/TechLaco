import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function PerfilCompletoSection() {
  return (
    <section className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[14px] font-medium text-[#364153]">Perfil completo</h2>
        <span className="text-[14px] text-[#101828]">85%</span>
      </div>

      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-[#F3F4F6]">
        <div className="h-full w-[85%] rounded-full bg-[#00A86B]" />
      </div>

      <p className="mb-4 text-[12px] leading-4 text-[#99A1AF]">
        Adicione mais projetos ao portfólio para aumentar suas chances.
      </p>

      <a
        href="#perfil-completar"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0066CC] no-underline"
      >
        Completar perfil
        <ArrowRight size={12} />
      </a>
    </section>
  )
}
