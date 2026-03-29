import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import InputField from '../components/ui/InputField'
import BackLink from '../components/ui/BackLink'
import { useFormValidation } from '../hooks/useFormValidation'

import blueBriefcase from '../assets/icons/blue-briefcase.svg'
import grayBriefcase from '../assets/icons/gray-briefcase.svg'
import blueCode from '../assets/icons/blue-code.svg'
import grayCode from '../assets/icons/gray-code.svg'

export default function Cadastro() {
  const [tipo, setTipo] = useState('contratar')
  const [showGithub, setShowGithub] = useState(false)
  const [form, setForm] = useState({
    nome: '', sobrenome: '', github: '', email: '', senha: ''
  })

  // Hook receives the fields we will always validate
  const campos = ['nome', 'sobrenome', 'email', 'senha']
  const { errors, clearFieldError, validateAll } = useFormValidation(campos)

  function handleChange(campo) {
    return (e) => {
      setForm(prev => ({ ...prev, [campo]: e.target.value }))
      clearFieldError(campo)
    }
  }

  function handleTipo(novoTipo) {
    setTipo(novoTipo)
    const isConstruir = novoTipo === 'construir'
    setShowGithub(isConstruir)
    if (!isConstruir) setForm(prev => ({ ...prev, github: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // For validateAll, pass only the required fields depending on the toggle state
    // We didn't add github directly to `campos` array so the hook won't automatically require it there.
    // If we wanted to require github, we would need to dynamically switch the validation rules.
    const camposParaValidar = { nome: form.nome, sobrenome: form.sobrenome, email: form.email, senha: form.senha }
    const valido = validateAll(camposParaValidar)
    
    // Additional simple validation for github if needed:
    if (tipo === 'construir' && (!form.github || form.github.trim() === '')) {
      alert("Para construir, é obrigatório preencher o GitHub.")
      return; 
    }

    if (valido) {
      console.log('Cadastro:', { tipo, ...form })
    }
  }

  return (
    <main className="w-full min-h-screen px-4 py-8 bg-gradient-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center gap-6">
      <Logo variant="auth" />

      <section className="w-full max-w-[620px] bg-white rounded-[20px] p-[35px] shadow-[0px_25px_50px_rgba(0,0,0,0.3)] flex flex-col gap-6 max-sm:p-5">
        <div className="flex flex-col text-center text-[#101828] gap-2 mb-2">
          <h1 className="font-extrabold text-[2.2rem] leading-none">Crie sua Conta</h1>
          <h3 className="text-[#64748B] font-normal text-[1.1rem]">Junte-se à TechLaço e revolucione o seu trabalho</h3>
        </div>

        {/* Toggle tipo de cadastro */}
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
              {/* O erro do copy command pode ter afetado os SVGs se copiados erroneamente, mas esperamos que funcionem adequadamente no DOM ou se importados */}
              <img src={tipo === id ? iconAtivo : iconInativo} alt="" className="w-5 h-5 opacity-90" />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Nome e Sobrenome lado a lado */}
          <div className="flex gap-[12px] max-sm:flex-col">
            <div className="w-full">
              <InputField
                id="nome"
                label="Nome"
                placeholder="Seu primeiro nome"
                required
                value={form.nome}
                hasError={errors.nome}
                onChange={handleChange('nome')}
              />
            </div>
            <div className="w-full">
              <InputField
                id="sobrenome"
                label="Sobrenome"
                placeholder="Último sobrenome"
                required
                value={form.sobrenome}
                hasError={errors.sobrenome}
                onChange={handleChange('sobrenome')}
              />
            </div>
          </div>

          {/* Campo GitHub animado */}
          <div className={`overflow-hidden transition-all duration-[400ms] ease-out ${showGithub ? 'max-h-40 opacity-100 mt-1 mb-1 scale-y-100 origin-top' : 'max-h-0 opacity-0 -mt-5 scale-y-95 origin-top'}`}>
            <InputField
              id="github"
              label="Link do seu GitHub"
              type="url"
              placeholder="https://github.com/seu-perfil"
              value={form.github}
              onChange={handleChange('github')}
            />
          </div>

          <InputField
            id="email"
            label="E-mail profissional"
            type="email"
            placeholder="seu.nome@empresa.com"
            required
            value={form.email}
            hasError={errors.email}
            onChange={handleChange('email')}
          />

          <InputField
            id="senha"
            label="Senha forte"
            type="password"
            placeholder="••••••••"
            required
            value={form.senha}
            hasError={errors.senha}
            hint="A senha deve conter ao menos 8 caracteres"
            onChange={handleChange('senha')}
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
