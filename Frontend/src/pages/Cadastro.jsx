import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { cadastroSchema } from '../schemas/authSchemas'
import { authService } from '../services/authService'
import { useAuth } from '../contexts/AuthContext'
import InputField from '../components/ui/InputField'
import BackLink from '../components/ui/BackLink'

import blueBriefcase from '../assets/icons/blue-briefcase.svg'
import grayBriefcase from '../assets/icons/gray-briefcase.svg'
import blueCode from '../assets/icons/blue-code.svg'
import grayCode from '../assets/icons/gray-code.svg'

export default function Cadastro() {
  const navigate = useNavigate()
  const { salvarSessao } = useAuth()
  const [tipo, setTipo] = useState('contratar')
  const [showGithub, setShowGithub] = useState(false)
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { isFreelancer: false },
  })

  function handleTipo(novoTipo) {
    setTipo(novoTipo)
    const isConstruir = novoTipo === 'construir'
    setValue('isFreelancer', isConstruir)
    setShowGithub(isConstruir)
  }

  async function onSubmit(data) {
    setErro(null)
    setCarregando(true)
    try {
      const resposta = await authService.cadastrar(data)
      salvarSessao(resposta)
      navigate('/home')
    } catch (err) {
      setErro(err?.mensagem ?? 'Erro ao criar conta. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="w-full min-h-dvh px-4 py-4 sm:py-8 bg-linear-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center gap-4 sm:gap-6">

      <section className="w-full max-w-[620px] bg-white rounded-[20px] sm:rounded-3xl p-5 sm:p-8 shadow-[0px_20px_40px_rgba(0,0,0,0.25)] flex flex-col gap-4 sm:gap-6">

        <div className="flex flex-col text-center text-[#101828] gap-1">
          <h1 className="font-extrabold text-3xl sm:text-[2.2rem] leading-tight">Crie sua Conta</h1>
          <h3 className="text-[#64748B] font-normal text-sm sm:text-[1.1rem]">Junte-se à TechLaço</h3>
        </div>

        <div className="grid grid-cols-2 bg-[#F1F5F9] rounded-[14px] gap-2 p-1.5 border border-[#E2E8F0] shadow-inner mb-1 sm:mb-2">
          {[
            { id: 'contratar', label: 'Quero Contratar', iconAtivo: blueBriefcase, iconInativo: grayBriefcase },
            { id: 'construir', label: 'Sou Profissional', iconAtivo: blueCode, iconInativo: grayCode },
          ].map(({ id, label, iconAtivo, iconInativo }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleTipo(id)}
              className={`rounded-[10px] py-2 sm:py-[12px] focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 font-semibold text-sm sm:text-[0.95rem] flex items-center justify-center gap-2 cursor-pointer transition-all border-none outline-none
                ${tipo === id ? 'bg-white text-[#0066CC] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent text-[#64748B] hover:text-[#0F172A]'}`}
            >
              <img src={tipo === id ? iconAtivo : iconInativo} alt="" className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
          {erro && (
            <p className="text-[#EF4444] text-sm text-center bg-[#FEF2F2] border border-red-100 rounded-lg px-3 block">{erro}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <InputField
              id="nome"
              label="Nome*"
              placeholder="João"
              hasError={!!errors.nome}
              errorMessage={errors.nome?.message}
              {...register('nome')}
            />
            <InputField
              id="sobrenome"
              label="Sobrenome*"
              placeholder="Silva"
              hasError={!!errors.sobrenome}
              errorMessage={errors.sobrenome?.message}
              {...register('sobrenome')}
            />
          </div>

          <div className={`overflow-hidden transition-all duration-400 ease-out ${showGithub ? 'max-h-40 opacity-100 mt-1 mb-1 scale-y-100 origin-top' : 'max-h-0 opacity-0 -mt-2 sm:-mt-5 scale-y-95 origin-top'}`}>
            <p className="text-[#64748B] text-xs italic px-1">
              Você poderá configurar seu GitHub no perfil após o cadastro.
            </p>
          </div>

          <InputField
            id="email"
            label="E-mail*"
            type="email"
            placeholder="seu.nome@empresa.com"
            hasError={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <InputField
            id="senha"
            label="Senha*"
            type="password"
            placeholder="••••••••"
            hint="A senha deve conter ao menos 8 caracteres"
            hasError={!!errors.senha}
            errorMessage={errors.senha?.message}
            {...register('senha')}
          />

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-[#f97316] text-white font-bold text-base sm:text-[1.1rem] py-3.5 sm:py-[14px] rounded-xl shadow-[0_6px_15px_rgba(249,115,22,0.3)] hover:bg-[#ff8633] hover:shadow-[0_8px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f97316] cursor-pointer transition-all border-none mt-2 sm:mt-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {carregando ? 'Criando conta...' : 'Cadastrar'}
          </button>

          <div className='flex justify-evenly items-center'>
            <span className="self-center text-[#64748B] text-sm sm:text-[0.95rem]">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-bold text-[#0066CC] no-underline hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#0066CC] rounded-sm">
                Entrar agora
              </Link>
            </span>
            <BackLink />
          </div>
        </form>
      </section>
    </main>
  )
}
