import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/ui/Logo'

const TEMPO_REDIRECIONAMENTO = 3200

export default function BemVindo() {
  const navigate = useNavigate()
  const location = useLocation()
  const { usuario } = useAuth()
  const nome = usuario?.nome || 'voce'
  const veioDoCadastro = location.state?.origem === 'cadastro'

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate('/home', { replace: true })
    }, TEMPO_REDIRECIONAMENTO)

    return () => window.clearTimeout(timeoutId)
  }, [navigate])

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#F8FAFC] px-4 py-10 text-slate-900">
      <div className="absolute inset-x-0 top-0 h-[42%] bg-linear-to-b from-[#0066CC] to-[#004C99]" />
      <div className="absolute inset-x-0 top-[42%] h-px bg-[#DCE8F7]" />

      <section className="relative z-10 flex w-full max-w-[760px] flex-col items-center text-center">
        <div className="mb-8">
          <Logo variant="auth" />
        </div>

        <div className="w-full rounded-[28px] border border-white/70 bg-white px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-12 sm:py-11">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#0D63C1]">
            <Sparkles size={30} strokeWidth={2.4} />
          </div>

          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.26em] text-[#F97316]">
            {veioDoCadastro ? 'Conta criada com sucesso' : 'Login realizado com sucesso'}
          </p>

          <h1 className="mx-auto max-w-[620px] text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            Bem-vindo ao TechLaco, {nome}!
          </h1>

          <p className="mx-auto mt-4 max-w-[540px] text-base leading-relaxed text-slate-500 sm:text-lg">
            Estamos preparando seu ambiente para voce encontrar projetos, contratar talentos e acompanhar tudo em um so lugar.
          </p>

          <div className="mx-auto mt-8 grid max-w-[560px] grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {['Perfil pronto', 'Sessao segura', 'Portal carregando'].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-linear-to-r from-[#0D63C1] via-[#2563EB] to-[#F97316] animate-welcome-progress" />
          </div>

          <button
            type="button"
            onClick={() => navigate('/home', { replace: true })}
            className="mx-auto mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#0D63C1] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(13,99,193,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#0055ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D63C1] focus-visible:ring-offset-2"
          >
            Entrar agora
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  )
}
