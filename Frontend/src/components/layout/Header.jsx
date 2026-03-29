import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'

export default function Header() {
  return (
    <header className="bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1060px] mx-auto px-6 min-h-[66px] flex items-center justify-between gap-[18px]">
        <Logo variant="header" />

        <nav className="flex items-center gap-[34px] max-md:hidden">
          <a href="#como-funciona" className="text-[#111827] font-medium text-base hover:text-[#0D63C1] no-underline">
            Encontrar Freelancers
          </a>
          <a href="#servicos" className="text-[#111827] font-medium text-base hover:text-[#0D63C1] no-underline">
            Procurar Projetos
          </a>
        </nav>

        <div className="flex items-center gap-[15px]">
          <Link to="/cadastro" className="bg-[#0D63C1] text-white px-6 py-[10px] rounded-[10px] font-semibold text-[1.1rem] shadow hover:-translate-y-0.5 transition-transform no-underline">
            Cadastro
          </Link>
          <Link to="/login" className="bg-[#f97316] text-white px-6 py-[10px] rounded-[10px] font-semibold text-[1.1rem] shadow hover:-translate-y-0.5 transition-transform no-underline">
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}
