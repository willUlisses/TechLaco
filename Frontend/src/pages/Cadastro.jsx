import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import InputField from '../components/ui/InputField'
import BackLink from '../components/ui/BackLink'

import blueBriefcase from '../assets/icons/blue-briefcase.svg'
import grayBriefcase from '../assets/icons/gray-briefcase.svg'
import blueCode from '../assets/icons/blue-code.svg'
import grayCode from '../assets/icons/gray-code.svg'

const cadastroSchema = z
  .object({
    tipo: z.enum(['contratar', 'construir']),
    nome: z.string().min(1, 'Nome é obrigatório'),
    sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
    github: z.string().optional(),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Digite um email válido'),
    senha: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.tipo === 'construir' && !data.github?.trim()) {
      ctx.addIssue({
        path: ['github'],
        code: z.ZodIssueCode.custom,
        message: 'O link do GitHub é obrigatório para freelancers',
      })
    }
    if (data.tipo === 'construir' && data.github && !data.github.startsWith('https://github.com/')) {
      ctx.addIssue({
        path: ['github'],
        code: z.ZodIssueCode.custom,
        message: 'Informe um link válido e.g: https://github.com/...',
      })
    }
  })

export default function Cadastro() {
  const [tipo, setTipo] = useState('contratar')
  const [showGithub, setShowGithub] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { tipo: 'contratar' },
  })

  function handleTipo(novoTipo) {
    setTipo(novoTipo)
    setValue('tipo', novoTipo)           // sincroniza com react-hook-form
    const isConstruir = novoTipo === 'construir'
    setShowGithub(isConstruir)
    if (!isConstruir) setValue('github', '') // limpa o campo ao trocar para contratar
  }

  function onSubmit(data) {
    // data já chegou validado pelo Zod
    console.log('Cadastro:', data)
  }

  return (
    <main className="w-full min-h-screen px-4 py-8 bg-linear-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center gap-6">
      <Logo variant="auth" />

      <section className="w-full max-w-[620px] bg-white rounded-[20px] p-[35px] shadow-[0px_25px_50px_rgba(0,0,0,0.3)] flex flex-col gap-6 max-sm:p-5">
        <div className="flex flex-col text-center text-[#101828] gap-2 mb-2">
          <h1 className="font-extrabold text-[2.2rem] leading-none">Crie sua Conta</h1>
          <h3 className="text-[#64748B] font-normal text-[1.1rem]">Junte-se à TechLaço e revolucione o seu trabalho</h3>
        </div>

        {/* Toggle tipo de cadastro — controlado por estado local + setValue */}
        <div className="grid grid-cols-2 bg-[#F1F5F9] rounded-[14px] p-1.5 border border-[#E2E8F0] shadow-inner mb-2">
          {[
            { id: 'contratar', label: 'Quero Contratar', iconAtivo: blueBriefcase, iconInativo: grayBriefcase },
            { id: 'construir', label: 'Sou Profissional', iconAtivo: blueCode, iconInativo: grayCode },
          ].map(({ id, label, iconAtivo, iconInativo }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleTipo(id)}
              className={`rounded-[10px] py-[12px] font-semibold text-[0.95rem] flex items-center justify-center gap-2 cursor-pointer transition-all border-none outline-none
                ${tipo === id ? 'bg-white text-[#0066CC] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'bg-transparent text-[#64748B] hover:text-[#0F172A]'}`}
            >
              <img src={tipo === id ? iconAtivo : iconInativo} alt="" className="w-5 h-5 opacity-90" />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
            <InputField
              id="nome"
              label="Nome"
              placeholder="João"
              hasError={!!errors.nome}
              errorMessage={errors.nome?.message}
              {...register('nome')}
            />
            <InputField
              id="sobrenome"
              label="Sobrenome"
              placeholder="Silva"
              hasError={!!errors.sobrenome}
              errorMessage={errors.sobrenome?.message}
              {...register('sobrenome')}
            />
          </div>

          {/* Campo GitHub — animado, obrigatório só se tipo === 'construir' */}
          <div className={`overflow-hidden transition-all duration-400 ease-out ${showGithub ? 'max-h-40 opacity-100 mt-1 mb-1 scale-y-100 origin-top' : 'max-h-0 opacity-0 -mt-5 scale-y-95 origin-top'}`}>
            <InputField
              id="github"
              label="Link do seu GitHub"
              type="url"
              placeholder="https://github.com/seu-perfil"
              hasError={!!errors.github}
              errorMessage={errors.github?.message}
              {...register('github')}
            />
          </div>

          <InputField
            id="email"
            label="E-mail profissional"
            type="email"
            placeholder="seu.nome@empresa.com"
            hasError={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <InputField
            id="senha"
            label="Senha forte"
            type="password"
            placeholder="••••••••"
            hint="A senha deve conter ao menos 8 caracteres"
            hasError={!!errors.senha}
            errorMessage={errors.senha?.message}
            {...register('senha')}
          />

          <button
            type="submit"
            className="w-full bg-[#f97316] text-white font-bold text-[1.1rem] py-[14px] rounded-[10px] shadow-[0_6px_15px_rgba(249,115,22,0.3)] hover:bg-[#ff8633] hover:shadow-[0_8px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 cursor-pointer transition-all border-none mt-3"
          >
            Cadastrar
          </button>

          <span className="self-center text-[#64748B] text-[0.95rem] mt-2">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-bold text-[#0066CC] no-underline hover:underline">
              Entrar agora
            </Link>
          </span>
        </form>
      </section>

      <BackLink />
    </main>
  )
}
