import React from 'react'
import { LayoutDashboard, UserRound } from 'lucide-react'

const links = [
  {
    title: 'Dashboard',
    description: 'Métricas e desempenho',
    icon: LayoutDashboard,
    href: '#dashboard',
  },
  {
    title: 'Meu Perfil',
    description: 'Portfólio e habilidades',
    icon: UserRound,
    href: '#perfil',
  },
]

function QuickLinkCard({ title, description, icon: Icon, href }) {
  return (
    <a
      href={href}
      className="group relative flex min-h-[128px] flex-col rounded-[14px] border border-[#E5E7EB] bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D7DCE3] hover:shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)]"
    >
      <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F3F4F6] text-[#6A7282] transition-colors duration-200 group-hover:text-[#101828]">
        <Icon size={17} strokeWidth={2} />
      </div>

      <div className="mt-auto">
        <h3 className="mb-1 text-[14px] font-medium text-[#1E2939]">{title}</h3>
        <p className="m-0 text-[12px] leading-4 text-[#99A1AF]">{description}</p>
      </div>
    </a>
  )
}

export default function AcessoRapidoSection() {
  return (
    <section>
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#99A1AF]">
        Acesso rápido
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <QuickLinkCard key={link.title} {...link} />
        ))}
      </div>
    </section>
  )
}
