import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Home, Users, Search, LayoutDashboard } from 'lucide-react'
import Logo from './ui/Logo'
import { useAuth } from '../contexts/AuthContext'

const paraClientesLinks = [
  { label: 'Publicar Projeto', to: '/clientes/publicar' },
  { label: 'Encontrar Devs', to: '/clientes/buscarFreelancers' },
]

const paraFreelancersLinks = [
  { label: 'Encontrar Projetos', to: '/freelancers/buscarProjeto' },
  { label: 'Meu Portfólio', to: '/freelancers/buscarProjeto' },
]

function DropdownMenu({ label, icon: Icon, links, activeColor }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = links.some(l => window.location.pathname === l.to)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border-none outline-none
          ${isActive
            ? 'bg-[#0D63C1] text-white'
            : 'text-[#374151] hover:bg-[#EFF6FF] hover:text-[#0D63C1]'
          }`}
      >
        <Icon size={15} />
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#E2E8F0] py-1.5 z-50">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm no-underline transition-colors rounded-[8px] mx-1
                ${isActive
                  ? 'bg-[#EFF6FF] text-[#0D63C1] font-semibold'
                  : 'text-[#374151] hover:bg-[#F8FAFC]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { usuario, encerrarSessao } = useAuth()
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const nomeExibicao = usuario ? `${usuario.nome} ${usuario.sobrenome}` : ''
  const inicial = usuario?.nome?.charAt(0).toUpperCase() ?? '?'

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
      <div className="max-w-[1100px] mx-auto px-6 h-[66px] flex items-center justify-between gap-6">

        {/* Logo */}
        <NavLink to="/" className="no-underline shrink-0">
          <Logo variant="header" />
        </NavLink>

        {/* Nav central */}
        <nav className="flex items-center gap-3 max-md:hidden">
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium no-underline transition-colors
              ${isActive ? 'bg-[#0D63C1] text-white' : 'text-[#374151] hover:bg-[#EFF6FF] hover:text-[#0D63C1]'}`
            }
          >
            <Home size={15} />
            Início
          </NavLink>

          <DropdownMenu
            label="Para Clientes"
            icon={Users}
            links={paraClientesLinks}
          />

          <DropdownMenu
            label="Para Freelancers"
            icon={Search}
            links={paraFreelancersLinks}
          />

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium no-underline transition-colors
              ${isActive ? 'bg-[#0D63C1] text-white' : 'text-[#374151] hover:bg-[#EFF6FF] hover:text-[#0D63C1]'}`
            }
          >
            <LayoutDashboard size={15} />
            Dashboard
          </NavLink>
        </nav>

        {/* Avatar do usuário */}
        <div ref={userMenuRef} className="relative shrink-0">
          <button
            onClick={() => setUserMenuOpen(prev => !prev)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[#F1F5F9] transition-colors cursor-pointer border-none outline-none bg-transparent"
          >
            <div className="w-8 h-8 rounded-full bg-[#0D63C1] text-white text-sm font-bold flex items-center justify-center shrink-0">
              {inicial}
            </div>
            <span className="text-sm font-medium text-[#111827] max-sm:hidden">{nomeExibicao}</span>
            <ChevronDown
              size={14}
              className={`text-[#6B7280] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#E2E8F0] py-1.5 z-50">
              <NavLink
                to="/perfil"
                onClick={() => setUserMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-[#374151] no-underline hover:bg-[#F8FAFC] rounded-[8px] mx-1"
              >
                Meu Perfil
              </NavLink>
              <NavLink
                to="/configuracoes"
                onClick={() => setUserMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-[#374151] no-underline hover:bg-[#F8FAFC] rounded-[8px] mx-1"
              >
                Configurações
              </NavLink>
              <hr className="my-1 border-[#E2E8F0] mx-3" />
              <button
                onClick={() => { setUserMenuOpen(false); encerrarSessao(); navigate('/login') }}
                className="w-full text-left px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#FEF2F2] rounded-[8px] mx-1 cursor-pointer border-none bg-transparent font-medium block"
                style={{ width: 'calc(100% - 8px)' }}
              >
                Sair
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
