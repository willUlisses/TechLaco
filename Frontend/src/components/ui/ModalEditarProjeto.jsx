import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2 } from 'lucide-react'
import Modal from './Modal'
import { editarProjetoSchema } from '../../schemas/projetoSchemas'
import { projetoService } from '../../services/projetoService'
import { NIVEIS_PROJETO } from '../../utils/projetoConfig'

export default function ModalEditarProjeto({ projeto, aberto, onFechar, onSucesso }) {
  const [erro, setErro]           = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [tecnologias, setTecnologias] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editarProjetoSchema),
  })

  // Preencher o formulário e o estado de tecnologias ao abrir o modal
  useEffect(() => {
    if (aberto && projeto) {
      // Normaliza o valor do nível (pode vir como label "Iniciante" ou enum "INICIANTE")
      const mapaNivel = {
        'Iniciante':    'INICIANTE',
        'Intermediário':'INTERMEDIARIO',
        'Avançado':     'AVANCADO',
      }
      reset({
        titulo:           projeto.titulo    ?? '',
        descricao:        projeto.descricao ?? '',
        nivel:            mapaNivel[projeto.nivel] ?? projeto.nivel ?? 'INICIANTE',
        valorMin:         projeto.valorMin  ?? 0,
        valorMax:         projeto.valorMax  ?? 0,
        tecnologiasInput: '',
      })
      setTecnologias(projeto.tecnologias ?? [])
    }
  }, [aberto, projeto, reset])

  function adicionarTecnologia() {
    const valor = getValues('tecnologiasInput').trim()
    if (!valor || tecnologias.includes(valor)) return
    setTecnologias(prev => [...prev, valor])
    setValue('tecnologiasInput', '')
  }

  function removerTecnologia(tech) {
    setTecnologias(prev => prev.filter(t => t !== tech))
  }

  async function onSubmit(data) {
    setErro(null)
    setCarregando(true)
    try {
      const body = {
        titulo:      data.titulo,
        descricao:   data.descricao,
        nivel:       data.nivel,
        valorMin:    Number(data.valorMin),
        valorMax:    Number(data.valorMax),
        tecnologias, // sempre envia o array atualizado
      }
      const atualizado = await projetoService.editar(projeto.id, body)
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
          <label className="text-[13px] font-semibold text-[#101828]">
            Título <span className="text-[#EF4444]">*</span>
          </label>
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
            rows={3}
            className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] resize-none transition-colors"
          />
          {errors.descricao && (
            <span className="text-[#EF4444] text-[12px]">{errors.descricao.message}</span>
          )}
        </div>

        {/* Nível */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#101828]">
            Nível <span className="text-[#EF4444]">*</span>
          </label>
          <select
            {...register('nivel')}
            className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] bg-white transition-colors"
          >
            {NIVEIS_PROJETO.map(op => (
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
            <label className="text-[13px] font-semibold text-[#101828]">
              Valor mínimo (R$) <span className="text-[#EF4444]">*</span>
            </label>
            <input
              {...register('valorMin')}
              type="number"
              min="0"
              step="0.01"
              className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] transition-colors"
            />
            {errors.valorMin && (
              <span className="text-[#EF4444] text-[12px]">{errors.valorMin.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[13px] font-semibold text-[#101828]">
              Valor máximo (R$) <span className="text-[#EF4444]">*</span>
            </label>
            <input
              {...register('valorMax')}
              type="number"
              min="0"
              step="0.01"
              className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] transition-colors"
            />
            {errors.valorMax && (
              <span className="text-[#EF4444] text-[12px]">{errors.valorMax.message}</span>
            )}
          </div>
        </div>

        {/* Tecnologias */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#101828]">Tecnologias</label>

          {/* Pills das tecnologias adicionadas */}
          {tecnologias.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-1">
              {tecnologias.map(tech => (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#e5e7eb] text-xs text-[#4a5565] bg-[#f3f4f6]"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removerTecnologia(tech)}
                    className="text-[#99a1af] hover:text-[#EF4444] transition-colors"
                    aria-label={`Remover ${tech}`}
                  >
                    <Trash2 size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input + botão para adicionar */}
          <div className="flex gap-2">
            <input
              {...register('tecnologiasInput')}
              className="flex-1 border border-[#D1D5DC] rounded-[10px] px-3 py-2.5 text-[14px] text-[#101828] outline-none focus:border-[#0066cc] transition-colors"
              placeholder="Ex: React, Node.js..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); adicionarTecnologia() }
              }}
            />
            <button
              type="button"
              onClick={adicionarTecnologia}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-[#0066cc] text-white text-sm font-medium hover:bg-[#005ab4] transition-colors shrink-0"
            >
              <Plus size={14} />
              Adicionar
            </button>
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
