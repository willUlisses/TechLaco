import { useState } from 'react'
import { Trash2, X } from 'lucide-react'

/**
 * Modal de confirmação antes de deletar um projeto.
 * Chama `onConfirmar()` (async) quando o usuário confirma.
 * Fecha ao clicar no backdrop.
 */
export default function ConfirmarDelecaoModal({ titulo, onConfirmar, onCancelar }) {
  const [deletando, setDeletando] = useState(false)

  async function handleConfirmar() {
    setDeletando(true)
    try {
      await onConfirmar()
    } finally {
      setDeletando(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancelar() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-deletar-titulo"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl animate-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f3f4f6]">
          <h2 id="modal-deletar-titulo" className="text-base font-semibold text-[#101828]">
            Deletar projeto
          </h2>
          <button
            type="button"
            onClick={onCancelar}
            className="p-1.5 rounded-lg text-[#99a1af] hover:text-[#101828] hover:bg-[#f3f4f6] transition-colors"
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo */}
        <div className="px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEF2F2]">
              <Trash2 size={18} className="text-[#EF4444]" />
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Você quer mesmo deletar o projeto{' '}
              <strong className="text-[#101828] font-semibold">"{titulo}"</strong>?{' '}
              Esta ação não pode ser desfeita.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#f3f4f6]">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 rounded-[10px] text-sm font-medium text-[#4a5565] hover:bg-[#f3f4f6] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={deletando}
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#EF4444] text-white text-sm font-medium hover:bg-[#dc2626] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={14} />
            {deletando ? 'Deletando...' : 'Sim, deletar'}
          </button>
        </div>
      </div>
    </div>
  )
}
