import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ aberto, onFechar, titulo, children, maxWidth = 'max-w-[520px]' }) {
  // Fechar com Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onFechar()
    }
    if (aberto) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [aberto, onFechar])

  // Travar scroll do body enquanto modal aberto
  useEffect(() => {
    if (aberto) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [aberto])

  if (!aberto) return null

  return (
    // Overlay — fechar ao clicar fora
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onFechar}
    >
      {/* Container do modal — stopPropagation evita fechar ao clicar dentro */}
      <div
        className={`bg-white rounded-[14px] w-full ${maxWidth} shadow-[0_24px_48px_rgba(0,0,0,0.18)] flex flex-col max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#e5e7eb] shrink-0">
          <h2 className="font-['Poppins'] font-semibold text-[18px] text-[#101828]">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 flex items-center justify-center rounded-[8px] text-[#99a1af] hover:bg-[#f3f4f6] hover:text-[#101828] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Conteúdo — fornecido via children */}
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
