import React from 'react'
import { BriefcaseBusiness, ChevronRight, FileText, Search } from 'lucide-react'

const items = [
  {
    title: 'Buscar Projetos',
    description: 'Explore oportunidades que combinam com suas habilidades e especialidades',
    icon: Search,
    tone: 'blue',
    href: '/freelancers/BuscarProjeto',
  },
  {
    title: 'Minhas Candidaturas',
    description: 'Acompanhe o andamento de cada candidatura enviada',
    icon: FileText,
    tone: 'green',
    href: '/freelancers/candidaturas',
  },
  {
    title: 'Meus Projetos',
    description: 'Veja projetos em andamento e contratos em aberto',
    icon: BriefcaseBusiness,
    tone: 'blue',
    href: '/clientes/publicar',
  },
]

const toneClasses = {
  blue: {
    box: 'bg-[#EDF4FF] text-[#0066CC]',
    arrow: 'group-hover:text-[#0066CC]',
  },
  green: {
    box: 'bg-[#ECFBF3] text-[#00A86B]',
    arrow: 'group-hover:text-[#00A86B]',
  },
}

function MainActionCard({ title, description, icon: Icon, tone, href }) {
  const styles = toneClasses[tone]

  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-[14px] border border-[#E5E7EB] bg-white px-5 py-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D7DCE3] hover:shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)]"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${styles.box}`}>
        <Icon size={18} strokeWidth={2.1} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-[16px] font-medium text-[#101828]">{title}</span>
        </div>
        <p className="m-0 text-[14px] leading-5 text-[#6A7282]">{description}</p>
      </div>

      <ChevronRight
        size={16}
        className={`shrink-0 text-[#C7CDD4] transition-colors duration-200 ${styles.arrow}`}
      />
    </a>
  )
}

export default function ParaOndeIrSection() {
  return (
    <section>
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#99A1AF]">
        Para onde ir
      </h2>

      <div className="space-y-3.5">
        {items.map((item) => (
          <MainActionCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}
