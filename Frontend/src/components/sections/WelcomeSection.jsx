import React from 'react'

export default function WelcomeSection({ user }) {
  return (
    <section className="mb-12">
      <p className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1.5">
        Olá, {user?.nome || 'Usuário'}
      </p>
      <h1 className="text-[32px] md:text-[36px] font-extrabold text-[#111827] leading-tight mb-2">
        {user?.nome || 'Usuário'}
      </h1>
      <p className="text-[#6B7280] text-sm md:text-base">
        Bem-vindo ao TechLaço. Por onde você quer começar hoje?
      </p>
    </section>
  )
}
