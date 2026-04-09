import React from 'react'

export default function WelcomeSection({ user }) {
  const nome = user?.nome || 'Usuário'

  return (
    <section>
      <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.18em] text-[#99A1AF]">
        Olá,
      </p>
      <h1 className="mb-2 text-[34px] font-semibold leading-none text-[#101828] md:text-[36px]">
        {nome}
      </h1>
      <p className="text-[15px] leading-6 text-[#6A7282] md:text-[16px]">
        Bem-vindo ao TechLaço. Por onde você quer começar hoje?
      </p>
    </section>
  )
}
