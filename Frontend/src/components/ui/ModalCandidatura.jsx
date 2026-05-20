import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from './Modal'
import { criarCandidaturaSchema } from '../../schemas/candidaturaSchemas'
import { candidaturaService } from '../../services/candidaturaService'

export default function ModalCandidatura({ projeto, aberto, onFechar, onSucesso }) {
  const [erro, setErro]         = useState(null)
  const [carregando, setCarregando] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(criarCandidaturaSchema) })

  async function onSubmit(data) {
    setErro(null)
    setCarregando(true)
    try {
      await candidaturaService.candidatar(projeto.id, data)
      reset()
      onSucesso?.()
      onFechar()
    } catch (err) {
      setErro(err?.mensagem ?? 'Erro ao enviar candidatura. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  function handleFechar() {
    reset()
    setErro(null)
    onFechar()
  }

  return (
    <Modal aberto={aberto} onFechar={handleFechar} titulo="Enviar Proposta">

      {/* Info do projeto */}
      {projeto && (
        <div className="bg-[#f8f9fb] rounded-[10px] px-4 py-3">
          <p className="text-[12px] text-[#99a1af] uppercase tracking-wide font-semibold mb-1">
            Projeto
          </p>
          <p className="text-[14px] font-medium text-[#101828]">{projeto.titulo}</p>
          <p className="text-[12px] text-[#6a7282] mt-0.5">
            R$ {projeto.valorMin?.toLocaleString('pt-BR')} – R$ {projeto.valorMax?.toLocaleString('pt-BR')}
          </p>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-[#101828]">
            Mensagem de proposta
          </label>
          <textarea
            {...register('mensagem')}
            rows={5}
            placeholder="Descreva sua experiência, abordagem e por que você é o profissional ideal para este projeto..."
            className="border border-[#D1D5DC] rounded-[10px] px-3 py-3 text-[14px] text-[#101828] placeholder-[#99a1af] outline-none focus:border-[#0066cc] resize-none transition-colors"
          />
          {errors.mensagem && (
            <span className="text-[#EF4444] text-[12px]">{errors.mensagem.message}</span>
          )}
        </div>

        {erro && (
          <p className="text-[#EF4444] text-[13px] text-center">{erro}</p>
        )}

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
            {carregando ? 'Enviando...' : 'Enviar Proposta'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
