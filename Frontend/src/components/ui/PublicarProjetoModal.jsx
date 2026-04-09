import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import InputField from './InputField'

const schema = z.object({
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  descricao: z.string().min(20, 'Descreva o projeto com pelo menos 20 caracteres'),
  orcamento: z.string().min(1, 'Informe um orçamento estimado'),
  prazo: z.string().min(1, 'Informe um prazo'),
})

const categorias = [
  'Desenvolvimento Web',
  'Desenvolvimento Mobile',
  'Design UI/UX',
  'Banco de Dados',
  'DevOps / Infraestrutura',
  'Automação / Scripts',
  'Outro',
]

export default function PublicarProjetoModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  // Fecha com Esc
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function onSubmit(data) {
    console.log('Projeto publicado:', data)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.2)] flex flex-col">

        {/* Header do modal */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#E2E8F0]">
          <div>
            <h2 className="font-extrabold text-[1.3rem] text-[#111827]">Publicar Projeto</h2>
            <p className="text-[#64748B] text-sm mt-0.5">Preencha os detalhes para receber propostas.</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9] rounded-lg p-1.5 transition-colors cursor-pointer border-none bg-transparent"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-7 py-6">
          <InputField
            id="titulo"
            label="Título do projeto"
            placeholder="Ex: Criação de site para minha loja"
            hasError={!!errors.titulo}
            errorMessage={errors.titulo?.message}
            {...register('titulo')}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoria" className="font-bold text-[0.9rem] text-[#101828]">
              Categoria
            </label>
            <select
              id="categoria"
              {...register('categoria')}
              defaultValue=""
              className={`w-full px-3 py-3 border rounded-[10px] outline-none transition-colors bg-white focus:border-[#0066CC]
                ${errors.categoria ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#D1D5DC]'}`}
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categorias.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.categoria && (
              <span className="text-[#EF4444] text-[0.75rem] mt-[2px]">{errors.categoria.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="descricao" className="font-bold text-[0.9rem] text-[#101828]">
              Descrição
            </label>
            <textarea
              id="descricao"
              {...register('descricao')}
              rows={4}
              placeholder="Descreva o que você precisa de forma simples..."
              className={`w-full px-3 py-3 border rounded-[10px] outline-none transition-colors resize-none focus:border-[#0066CC]
                ${errors.descricao ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#D1D5DC]'}`}
            />
            {errors.descricao && (
              <span className="text-[#EF4444] text-[0.75rem] mt-[2px]">{errors.descricao.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="orcamento"
              label="Orçamento estimado"
              placeholder="Ex: R$ 500"
              hasError={!!errors.orcamento}
              errorMessage={errors.orcamento?.message}
              {...register('orcamento')}
            />
            <InputField
              id="prazo"
              label="Prazo"
              placeholder="Ex: 2 semanas"
              hasError={!!errors.prazo}
              errorMessage={errors.prazo?.message}
              {...register('prazo')}
            />
          </div>

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#D1D5DC] text-[#374151] font-semibold text-sm hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-sm transition-colors cursor-pointer border-none"
            >
              Publicar projeto
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
