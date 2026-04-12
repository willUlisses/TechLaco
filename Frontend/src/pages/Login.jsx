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
    <main className="w-full min-h-screen px-6 py-10 bg-linear-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center gap-[50px]">
      <div className="absolute top-10 mx-auto">
        <Logo variant="auth" />
      </div>

      <section className="w-full max-w-[500px] mt-16 bg-white rounded-[20px] py-[40px] px-8 shadow-[0px_25px_50px_rgba(0,0,0,0.3)] flex flex-col gap-8">
        <div className="flex flex-col text-center text-[#101828] gap-3">
          <h1 className="font-extrabold text-[2rem] leading-none">Bem Vindo!</h1>
          <h3 className="text-[#64748B] font-normal text-[1.1rem]">Entre na sua conta para continuar</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {erro && (
            <p className="text-[#EF4444] text-sm text-center bg-[#FEF2F2] rounded-lg py-2 px-3">{erro}</p>
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
            className="w-full bg-[#0066CC] text-white font-bold text-[1.1rem] py-[14px] rounded-[10px] hover:bg-[#0055ff] hover:shadow-[0_8px_20px_rgba(0,102,204,0.3)] hover:-translate-y-0.5 cursor-pointer transition-all border-none mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {carregando ? 'Entrando...' : 'Entrar no Portal'}
          </button>

          <span className="self-center text-[#64748B] text-[0.95rem] mt-2">
            Ainda não possui conta?{' '}
            <Link to="/cadastro" className="font-bold text-[#0066CC] no-underline hover:underline">
              Crie uma agora
            </Link>
          </span>
        </form>
      </section>

      <BackLink />
    </main>
  )
}
