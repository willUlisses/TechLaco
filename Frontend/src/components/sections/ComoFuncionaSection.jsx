import { Search, Users, FileText } from 'lucide-react'

const cards = [
  {
    title: 'Match Inteligente',
    description: 'Responda perguntas simples e encontramos os freelancers perfeitos para seu projeto',
    borderColor: 'border-[#2563EB]',
    iconBg: 'bg-[#2563EB]',
    Icon: Search,
  },
  {
    title: 'Profissionais Verificados',
    description: 'Contrate especialistas validados mediante análise rigorosa de portfólio',
    borderColor: 'border-[#F97316]',
    iconBg: 'bg-[#F97316]',
    Icon: Users,
  },
  {
    title: 'Contratos Simples',
    description: 'Documentos automáticos e claros, protegendo o seu negócio',
    borderColor: 'border-[#10B981]',
    iconBg: 'bg-[#10B981]',
    Icon: FileText,
  },
]

export default function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="bg-white py-10 sm:py-14 md:py-[70px]">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">

        <div className="flex flex-col items-center text-center gap-[10px] mb-8 sm:mb-10 md:mb-[60px]">
          <h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem] font-bold text-[#0F172A] leading-tight">Como a TechLaço Funciona</h2>
          <p className="text-[#64748B] text-[0.95rem] sm:text-[1.1rem] max-w-[480px] leading-[1.65]">
            Simplificamos o processo de contratação para que você foque no que importa:{' '}
            <strong className="text-[#0F172A]">seu negócio</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-7 max-w-[900px] mx-auto">
          {cards.map(({ title, description, borderColor, iconBg, Icon }) => (
            <div
              key={title}
              className={`bg-white border-2 ${borderColor} rounded-[16px] p-5 sm:p-6 md:p-8 flex flex-col gap-[10px] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]`}
            >
              <div className={`w-[50px] h-[50px] rounded-[16px] flex items-center justify-center ${iconBg}`}>
                <Icon size={25} color="white" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-[1.2rem] text-[#0F172A] mt-2">{title}</h3>
              <p className="text-[0.9rem] text-[#64748B] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
