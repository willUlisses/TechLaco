import { CheckCircle } from 'lucide-react'

const servicos = [
  'Landing Pages', 'E-commerce', 'Sistemas de Agendamento',
  'Automações', 'Chatbots', 'Aplicativos Mobile',
  'Gestão de Banco de Dados', 'SEO e Digital', 'Design de Interface',
]

export default function ServicosSection() {
  return (
    <section id="servicos" className="bg-[#F8FAFC] py-10 sm:py-14 md:py-16 pb-14 sm:pb-20 md:pb-24">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">

        <div className="flex flex-col items-center text-center gap-[10px] mb-7 sm:mb-10 md:mb-12">
          <h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem] font-bold text-[#0F172A]">Nossos Serviços</h2>
          <p className="text-[#64748B] text-[0.95rem] sm:text-[1.1rem]">
            Encontre a expertise certa para transformar seu projeto em realidade digital
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-[960px] mx-auto">
          {servicos.map(servico => (
            <div
              key={servico}
              className="flex items-center gap-3 sm:gap-4 bg-white border border-[#E2E8F0] rounded-[14px] px-4 sm:px-5 py-[14px] sm:py-[18px] cursor-default transition-all hover:border-[#0066CC] hover:shadow-[0_4px_24px_rgba(0,102,204,0.1)] hover:-translate-y-0.5"
            >
              <CheckCircle size={28} className="text-[#0066CC] shrink-0" strokeWidth={2} />
              <span className="font-semibold text-[0.95rem] text-[#1E293B]">{servico}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
