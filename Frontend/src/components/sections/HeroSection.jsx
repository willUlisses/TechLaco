import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-[#0066CC] to-[#004C99] py-[42px] px-0">
      <div className="max-w-[1060px] mx-auto px-[18px] flex items-center justify-between gap-[34px] max-md:flex-col max-md:text-center mt-6">

        <div className="flex flex-col max-md:items-center">
          <h1 className="text-white font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.06] mb-4">
            Conectando o profissional de tecnologia com suas ideias
          </h1>
          <p className="text-[#d5e9ff] text-[1.1rem] leading-[1.5] max-w-[56ch] mb-6">
            A plataforma que simplifica a contratação de serviços de tecnologia.
            Sem complicação, com segurança e preços justos para fazer sua visão se tornar realidade.
          </p>
          <div className="flex items-center gap-[15px] max-sm:flex-col max-sm:w-full">
            <a href="#como-funciona" className="bg-[#ff7a1a] text-white px-4 py-[11px] rounded-[10px] font-semibold shadow hover:-translate-y-1 transition-transform no-underline max-sm:w-full max-sm:text-center">
              Encontrar Profissionais
            </a>
            <Link to="/cadastro" className="bg-white text-[#0D63C1] px-4 py-[11px] rounded-[10px] font-semibold shadow hover:-translate-y-1 transition-transform no-underline max-sm:w-full max-sm:text-center">
              Quero Construir
            </Link>
          </div>
        </div>

        <aside className="min-h-[320px] w-full max-w-[500px] overflow-hidden rounded-[12px] shadow-[0_16px_36px_rgba(2,22,59,0.3)] flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
            alt="Profissionais em reunião fechando parceria"
            loading="lazy"
            className="w-full h-full min-h-[320px] object-cover block"
          />
        </aside>

      </div>
    </div>
  )
}
