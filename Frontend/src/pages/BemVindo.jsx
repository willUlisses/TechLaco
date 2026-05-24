import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/ui/Logo'

const TEMPO_REDIRECIONAMENTO = 2000

export default function BemVindo() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { usuario } = useAuth()
  const nome = usuario?.nome ?? 'você'
  const veioDoCadastro = location.state?.origem === 'cadastro'

  useEffect(() => {
    const id = window.setTimeout(() => navigate('/home', { replace: true }), TEMPO_REDIRECIONAMENTO)
    return () => window.clearTimeout(id)
  }, [navigate])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#F8FAFC] px-4 py-10">

      <div className="mb-10">
        <Logo variant="header" />
      </div>

      <div className="flex flex-col items-center text-center gap-4 max-w-[480px] w-full">

        {/* Label de contexto */}
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#F97316]">
          {veioDoCadastro ? 'Conta criada com sucesso' : 'Login realizado com sucesso'}
        </span>

        {/* Saudação principal */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          Bem-vindo, {nome}!
        </h1>

        {/* Subtítulo */}
        <p className="text-slate-500 text-base leading-relaxed">
          {veioDoCadastro
            ? 'Sua conta foi criada. Você será redirecionado em instantes.'
            : 'Sessão iniciada. Você será redirecionado em instantes.'}
        </p>

        {/* Botão de ação */}
        <button
          type="button"
          onClick={() => navigate('/home', { replace: true })}
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#0D63C1] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(13,99,193,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#0055ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D63C1] focus-visible:ring-offset-2"
        >
          Entrar agora
          <ArrowRight size={16} />
        </button>

      </div>
    </main>
  )
}
