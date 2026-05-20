import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from './Modal'
import { editarProjetoSchema } from '../../schemas/projetoSchemas'
import { projetoService } from '../../services/projetoService'

const opcoesNivel = [
  { value: 'INICIANTE',     label: 'Iniciante' },
  { value: 'INTERMEDIARIO', label: 'Intermediário' },
  { value: 'AVANCADO',      label: 'Avançado' },
]

export default function ModalEditarProjeto({ projeto, aberto, onFechar, onSucesso }) {
  const [erro, setErro]             = useState(null)
  const [carregando, setCarregando] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editarProjetoSchema),
  })

  // Preencher o formulário com os dados do projeto ao abrir
  useEffect(() => {
    if (aberto && projeto) {
      // Mapear o valor humanizado do enum de volta para o valor do enum
      const mapaNivel = {
        'Iniciante':    'INICIANTE',
        'Intermediário':'INTERMEDIARIO',
        'Avançado':     'AVANCADO',
      }
      reset({
        titulo:    projeto.titulo,
        descricao: projeto.descricao,
        nivel:     mapaNivel[projeto.nivel] ?? projeto.nivel,
        valorMin:  projeto.valorMin,
        valorMax:  projeto.valorMax,
      })
    }
  }, [aberto, projeto, reset])

  async function onSubmit(data) {
    setErro(null)
    setCarregando(true)
    try {
      const atualizado = await projetoService.editar(projeto.id, data)
      onSucesso?.(atualizado)
      onFechar()
    } catch (err) {
      setErro(err?.mensagem ?? 'Erro ao atualizar projeto. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  function handleFechar() {
    setErro(null)
    onFechar()
  }

  return (
    <Modal aberto={aberto} onFechar={handleFechar} titulo="Editar Projeto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Título */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#101828]">Título</label>
          <input
            {...register('titulo')}
            type="text"
            className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] transition-colors"
          />
          {errors.titulo && (
            <span className="text-[#EF4444] text-[12px]">{errors.titulo.message}</span>
          )}
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#101828]">Descrição</label>
          <textarea
            {...register('descricao')}
            rows={4}
            className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] resize-none transition-colors"
          />
          {errors.descricao && (
            <span className="text-[#EF4444] text-[12px]">{errors.descricao.message}</span>
          )}
        </div>

        {/* Nível */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#101828]">Nível</label>
          <select
            {...register('nivel')}
            className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] bg-white transition-colors"
          >
            <option value="">Selecione um nível</option>
            {opcoesNivel.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
          {errors.nivel && (
            <span className="text-[#EF4444] text-[12px]">{errors.nivel.message}</span>
          )}
        </div>

        {/* Valores lado a lado */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-semibold text-[#101828]">Valor mínimo (R$)</label>
            <input
              {...register('valorMin')}
              type="number"
              step="0.01"
              className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] transition-colors"
            />
            {errors.valorMin && (
              <span className="text-[#EF4444] text-[12px]">{errors.valorMin.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-semibold text-[#101828]">Valor máximo (R$)</label>
            <input
              {...register('valorMax')}
              type="number"
              step="0.01"
              className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] transition-colors"
            />
            {errors.valorMax && (
              <span className="text-[#EF4444] text-[12px]">{errors.valorMax.message}</span>
            )}
          </div>
        </div>

        {erro && (
          <p className="text-[#EF4444] text-[13px] text-center">{erro}</p>
        )}

        {/* Ações */}
        <div className="flex gap-3 pt-1 border-t border-[#f3f4f6]">
          <button
            type="button"
            onClick={handleFechar}
            className="flex-1 border border-[#e5e7eb] text-[#4a5565] text-[14px] font-medium py-[10px] rounded-[10px] hover:bg-[#f3f4f6] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={carregando}
            className="flex-1 bg-[#0066cc] text-white text-[14px] font-medium py-[10px] rounded-[10px] hover:bg-[#005ab4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {carregando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
