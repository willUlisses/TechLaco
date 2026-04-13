import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Home, Users, Search, LayoutDashboard, Menu, X } from 'lucide-react'
import Logo from './ui/Logo'
import { useAuth } from '../contexts/AuthContext'

const paraClientesLinks = [
  { label: 'Publicar Projeto', to: '/clientes/publicar' },
  { label: 'Encontrar Devs', to: '/clientes/buscarFreelancers' },
]

const paraFreelancersLinks = [
  { label: 'Encontrar Projetos', to: '/freelancers/buscarProjeto' },
  { label: 'Minhas Candidaturas', to: '/freelancers/candidaturas' },
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
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D63C1]
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
                `block px-4 py-2.5 text-sm no-underline transition-colors rounded-[8px] mx-1 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0D63C1] outline-none
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  const nomeExibicao = usuario ? `${usuario.nome} ${usuario.sobrenome}` : ''
  const inicial = usuario?.nome?.charAt(0).toUpperCase() ?? '?'

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-[66px] flex items-center justify-between gap-4 sm:gap-6">

          {/* Mobile Hamburger Menu & Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Hamburger Button (visible on md and below) */}
            <button 
              className="md:hidden p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu Principal"
            >
              <Menu size={26} strokeWidth={2.5} />
            </button>
            
            {/* Desktop Logo (always visible, but sits next to hamburger on mobile) */}
            <NavLink to="/home" className="no-underline shrink-0 focus-visible:ring-2 focus-visible:ring-blue-600 outline-none rounded-md">
              {/* If we strictly want the Logo to BECOME the hamburger, we hide logo on sm. But for good UX, we just hide Logo on very small devices or leave it. Leaving it is best. */}
              <div className="max-sm:scale-95 origin-left transition-transform">
                <Logo variant="header" />
              </div>
            </NavLink>
          </div>

          {/* Central Nav (Desktop Only) */}
          <nav className="flex items-center gap-3 max-md:hidden">
            <NavLink
              to="/home"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium no-underline transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D63C1] outline-none
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
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium no-underline transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D63C1] outline-none
                ${isActive ? 'bg-[#0D63C1] text-white' : 'text-[#374151] hover:bg-[#EFF6FF] hover:text-[#0D63C1]'}`
              }
            >
              <LayoutDashboard size={15} />
              Dashboard
            </NavLink>
          </nav>

          {/* User Avatar & Dropdown */}
          <div ref={userMenuRef} className="relative shrink-0">
            <button
              onClick={() => setUserMenuOpen(prev => !prev)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer border-none outline-none bg-transparent focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="w-8 h-8 rounded-full bg-[#0D63C1] text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-inner">
                {inicial}
              </div>
              <span className="text-sm font-medium text-slate-800 max-sm:hidden">{nomeExibicao}</span>
              <ChevronDown
                size={14}
                className={`text-slate-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Desktop User Menu */}
            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 py-1.5 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                  <p className="text-xs text-slate-500 font-medium">Logado como</p>
                  <p className="text-sm text-slate-900 font-semibold truncate">{nomeExibicao}</p>
                </div>
                <NavLink
                  to="/perfil"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg mx-1 mt-1 outline-none focus-visible:bg-slate-50 focus-visible:text-blue-600"
                >
                  Meu Perfil
                </NavLink>
                <NavLink
                  to="/configuracoes"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg mx-1 outline-none focus-visible:bg-slate-50 focus-visible:text-blue-600"
                >
                  Configurações
                </NavLink>
                <hr className="my-1 border-slate-100 mx-3" />
                <button
                  onClick={() => { setUserMenuOpen(false); encerrarSessao(); navigate('/login') }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg mx-1 cursor-pointer border-none bg-transparent block outline-none focus-visible:bg-red-50 focus-visible:text-red-700"
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Slide-in Drawer */}
          <div className="relative w-[85%] max-w-[320px] bg-white h-full shadow-2xl flex flex-col pt-6 pb-8 px-5 overflow-y-auto z-50 animate-in slide-in-from-left duration-300 ease-out">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <Logo variant="header" />
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-2 -mr-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                aria-label="Fechar Menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-6">
              
              <NavLink 
                to="/home" 
                onClick={() => setMobileMenuOpen(false)} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                  ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'}`
                }
              >
                <Home size={20} className="shrink-0" /> 
                <span className="text-[1.05rem]">Início</span>
              </NavLink>

              <div className="flex flex-col gap-1.5">
                <span className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest px-4 mb-1">Para Clientes</span>
                {paraClientesLinks.map(l => (
                   <NavLink 
                     key={l.to} 
                     to={l.to} 
                     onClick={() => setMobileMenuOpen(false)} 
                     className={({ isActive }) => 
                       `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                       ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`
                     }
                   >
                     <Users size={18} className="shrink-0 text-slate-400" /> 
                     <span>{l.label}</span>
                   </NavLink>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest px-4 mb-1">Para Freelancers</span>
                {paraFreelancersLinks.map(l => (
                   <NavLink 
                     key={l.to} 
                     to={l.to} 
                     onClick={() => setMobileMenuOpen(false)} 
                     className={({ isActive }) => 
                       `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                       ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`
                     }
                   >
                     <Search size={18} className="shrink-0 text-slate-400" /> 
                     <span>{l.label}</span>
                   </NavLink>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <NavLink 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                    ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'}`
                  }
                >
                  <LayoutDashboard size={20} className="shrink-0" /> 
                  <span className="text-[1.05rem]">Dashboard</span>
                </NavLink>
              </div>

            </nav>
          </div>
        </div>
      )}
    </>
  )
}
