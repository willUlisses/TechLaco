import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <div className="bg-linear-to-b from-[#0066CC] to-[#004C99] py-[42px] px-0">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-[18px] flex items-center justify-between gap-6 md:gap-[34px] flex-col md:flex-row text-center md:text-start mt-4 sm:mt-6">

        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-white font-bold text-[clamp(1.7rem,5vw,3rem)] leading-[1.1] mb-3 sm:mb-4">
            Conectando o profissional de tecnologia com suas ideias
          </h1>
          <p className="text-[#d5e9ff] text-[0.95rem] sm:text-[1.1rem] leading-[1.5] max-w-[56ch] mb-5 sm:mb-6">
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

        <aside className="w-full max-w-[500px] md:flex-shrink-0 overflow-hidden rounded-[12px] shadow-[0_16px_36px_rgba(2,22,59,0.3)]">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
            alt="Profissionais em reunião fechando parceria"
            loading="lazy"
            className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover block"
          />
        </aside>

      </div>
    </div>
  )
}
