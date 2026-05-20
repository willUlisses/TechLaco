import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PublicarProjetoCard() {
  return (
    <div className="bg-white border border-dashed border-[#e5e7eb] rounded-[14px] p-5">
      <p className="text-[#99a1af] text-[12px] font-semibold uppercase tracking-[1.2px] mb-3">
        Cliente
      </p>
      <p className="text-[#4a5565] text-[14px] leading-5 mb-6">
        Precisa de ajuda para encontrar o profissional certo? Publique seu projeto e receba propostas.
      </p>
      <Link
        to="/clientes/publicar"
        className="flex items-center justify-center gap-2 w-full bg-[#0D63C1] text-white text-[14px] rounded-[10px] h-10 no-underline hover:bg-[#0b54a6] transition-colors"
      >
        <Plus size={15} />
        Publicar projeto
      </Link>
    </div>
  )
}
