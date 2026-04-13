import { Plus } from 'lucide-react'

export default function NovoProjetoCard({ onPublicar }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-2xl px-4 sm:px-6 py-4 sm:py-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FEE9DC] text-[#f97316] flex items-center justify-center shrink-0">
          <Plus size={20} />
        </div>
        <div>
          <p className="font-bold text-[#111827] text-base leading-snug">Novo projeto</p>
          <p className="text-[#64748B] text-sm leading-snug mt-0.5">
            Preencha os detalhes e comece a receber propostas de freelancers. É gratuito.
          </p>
        </div>
      </div>

      <button
        onClick={onPublicar}
        className="flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer border-none shrink-0 w-full sm:w-auto"
      >
        <Plus size={16} />
        Publicar projeto
      </button>
    </div>
  )
}
