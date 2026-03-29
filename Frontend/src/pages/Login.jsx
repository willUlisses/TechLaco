import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import InputField from '../components/ui/InputField'
import BackLink from '../components/ui/BackLink'
import { useFormValidation } from '../hooks/useFormValidation'

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const { errors, clearFieldError, validateAll } = useFormValidation(['email', 'senha'])

  function handleChange(campo) {
    return (e) => {
      setForm(prev => ({ ...prev, [campo]: e.target.value }))
      clearFieldError(campo)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const valido = validateAll(form)
    if (valido) {
      // submeter dados de login
      console.log('Login:', form)
    }
  }

  return (
    <main className="w-full min-h-screen px-6 py-10 bg-gradient-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center gap-[50px]">
      <div className="absolute top-10 mx-auto">
        <Logo variant="auth" />
      </div>

      <section className="w-full max-w-[500px] mt-16 bg-white rounded-[20px] py-[40px] px-8 shadow-[0px_25px_50px_rgba(0,0,0,0.3)] flex flex-col gap-8">
        <div className="flex flex-col text-center text-[#101828] gap-3">
          <h1 className="font-extrabold text-[2rem] leading-none">Bem Vindo!</h1>
          <h3 className="text-[#64748B] font-normal text-[1.1rem]">Entre na sua conta para continuar</h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            id="email"
            label="E-mail profissional"
            type="email"
            placeholder="seu@novoemail.com"
            required
            value={form.email}
            hasError={errors.email}
            onChange={handleChange('email')}
          />

          <InputField
            id="senha"
            label="Senha secreta"
            type="password"
            placeholder="••••••••"
            required
            value={form.senha}
            hasError={errors.senha}
            hint="Esqueci minha senha"
            onChange={handleChange('senha')}
          />

          <button
            type="submit"
            className="w-full bg-[#0066CC] text-white font-bold text-[1.1rem] py-[14px] rounded-[10px] hover:bg-[#0055ff] hover:shadow-[0_8px_20px_rgba(0,102,204,0.3)] hover:-translate-y-0.5 cursor-pointer transition-all border-none mt-2"
          >
            Entrar no Portal
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
