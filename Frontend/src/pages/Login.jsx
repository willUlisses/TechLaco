import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../schemas/authSchemas'
import { authService } from '../services/authService'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/ui/Logo'
import InputField from '../components/ui/InputField'
import BackLink from '../components/ui/BackLink'

export default function Login() {
  const navigate = useNavigate()
  const { salvarSessao } = useAuth()
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data) {
    setErro(null)
    setCarregando(true)
    try {
      const resposta = await authService.login(data)
      salvarSessao(resposta)
      navigate('/home')
    } catch (err) {
      setErro(err?.mensagem ?? 'Erro ao fazer login. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="w-full min-h-dvh px-4 py-8 sm:py-12 bg-linear-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center gap-6 sm:gap-8">
      <Logo variant="auth" />

      <section className="w-full max-w-[480px] bg-white rounded-3xl p-6 sm:p-10 shadow-[0px_20px_40px_rgba(0,0,0,0.25)] flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col text-center text-slate-900 gap-1.5 sm:gap-2">
          <h1 className="font-extrabold text-3xl sm:text-[2rem] leading-tight">Bem Vindo!</h1>
          <h3 className="text-slate-500 font-normal text-sm sm:text-[1.1rem]">Entre na sua conta para continuar</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
          {erro && (
            <p className="text-[#EF4444] text-sm text-center bg-[#FEF2F2] border border-red-100 rounded-lg py-2.5 px-3 block">{erro}</p>
          )}

          <InputField
            id="email"
            label="E-mail profissional"
            type="email"
            placeholder="seu@novoemail.com"
            hasError={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <InputField
            id="senha"
            label="Senha secreta"
            type="password"
            placeholder="••••••••"
            hint="Esqueci minha senha"
            hasError={!!errors.senha}
            errorMessage={errors.senha?.message}
            {...register('senha')}
          />

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-[#0066CC] text-white font-bold text-base sm:text-[1.1rem] py-3.5 sm:py-[14px] rounded-xl hover:bg-[#0055ff] shadow-[0_4px_12px_rgba(0,102,204,0.3)] hover:shadow-[0_8px_20px_rgba(0,102,204,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0066CC] cursor-pointer transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {carregando ? 'Entrando...' : 'Entrar no Portal'}
          </button>

          <div className='flex flex-col gap-3 justify-evenly items-center'>
            <span className="self-center text-slate-500 text-sm sm:text-[0.95rem] mt-1 sm:mt-2">
              Ainda não possui conta?{' '}
              <Link to="/cadastro" className="font-bold text-[#0066CC] no-underline hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#0066CC] rounded-sm">
                Crie uma agora
              </Link>
            </span>
            <BackLink />
          </div>
        </form>
      </section>


    </main>
  )
}
