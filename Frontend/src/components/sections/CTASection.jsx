import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <div className="bg-linear-to-b from-[#0066CC] to-[#004C99] flex justify-center items-center py-10 sm:py-14 md:py-[70px] px-4 sm:px-6">
      <div className="text-white flex flex-col items-center text-center gap-[15px] max-w-[600px]">
        <h2 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] font-bold tracking-tight leading-tight">Vamos construir algo incrível juntos?</h2>
        <p className="text-[#d5e9ff] text-[0.95rem] sm:text-[1.1rem] mb-3 sm:mb-4">
          Junte-se a milhares de parceiros que já levaram as suas ideias para o próximo nível digital.
        </p>
        <Link to="/cadastro" className="w-full max-w-[280px]">
          <button className="w-full bg-[#f97316] text-white px-6 py-4 text-[1.2rem] font-bold rounded-[12px] shadow-lg hover:bg-[#ff8633] hover:-translate-y-1 transition-all cursor-pointer border-none">
            Começar Agora
          </button>
        </Link>
      </div>
    </div>
  )
}
