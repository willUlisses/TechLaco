import { Lightbulb, CheckCircle2 } from 'lucide-react'

const dicas = [
  'Seja claro e detalhado na descrição',
  'Defina um orçamento realista',
  'Liste todas as entregas esperadas',
  'Especifique o prazo necessário',
]

export default function DicasCard() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl px-6 py-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Lightbulb size={18} className="text-[#F59E0B]" />
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">Dicas</span>
      </div>

      <ul className="flex flex-col gap-3">
        {dicas.map((dica) => (
          <li key={dica} className="flex items-center gap-2.5 text-sm text-[#374151]">
            <CheckCircle2 size={17} className="text-[#16A34A] shrink-0" />
            {dica}
          </li>
        ))}
      </ul>
    </div>
  )
}
