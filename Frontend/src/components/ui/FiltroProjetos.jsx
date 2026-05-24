import { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { NIVEIS_PROJETO } from '../../utils/projetoConfig'

/**
 * Botão com popover flutuante de filtros para a página BuscarProjetos.
 *
 * Props:
 *  - filtros: { nivel, valorMin, valorMax }
 *  - onChange(campo, valor): callback ao alterar um filtro
 *  - onLimpar(): reseta nivel, valorMin e valorMax
 */
export default function FiltroProjetos({ filtros, onChange, onLimpar }) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef(null)

  // Fecha ao clicar fora do popover
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setAberto(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Quantidade de filtros ativos (exclui `busca` — ela já está na barra)
  const filtrosAtivos = [filtros.nivel, filtros.valorMin, filtros.valorMax].filter(Boolean).length

  return (
    <div ref={ref} className="relative shrink-0">

      {/* ── Botão que abre o popover ── */}
      <button
        type="button"
        id="btn-filtro-projetos"
        onClick={() => setAberto(prev => !prev)}
        className={`flex items-center gap-2 px-4 py-[10px] rounded-[10px] border text-sm font-medium transition-colors duration-200
          ${aberto
            ? 'border-[#0066cc] bg-[#EFF6FF] text-[#0066cc]'
            : 'border-[#e5e7eb] bg-white text-[#4a5565] hover:bg-[#f3f4f6]'
          }`}
        aria-expanded={aberto}
        aria-controls="painel-filtros"
      >
        <SlidersHorizontal size={15} aria-hidden="true" />
        <span>Filtros</span>
        {filtrosAtivos > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0066cc] text-white text-[10px] font-bold leading-none">
            {filtrosAtivos}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${aberto ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* ── Painel flutuante ── */}
      {aberto && (
        <div
          id="painel-filtros"
          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-[#e5e7eb]
            shadow-[0_8px_24px_rgba(0,0,0,0.10)] z-40 p-4 space-y-4"
        >
          {/* Header do painel */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[#99a1af] uppercase tracking-wider">Filtros</p>
            {filtrosAtivos > 0 && (
              <button
                type="button"
                onClick={() => { onLimpar(); setAberto(false) }}
                className="flex items-center gap-1 text-xs text-[#EF4444] hover:text-[#dc2626] font-medium transition-colors"
              >
                <X size={12} />
                Limpar filtros
              </button>
            )}
          </div>

          {/* Nível — seleção por pills (toggle) */}
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              Nível
            </label>
            <div className="flex flex-wrap gap-2">
              {NIVEIS_PROJETO.map(n => (
                <button
                  key={n.value}
                  type="button"
                  onClick={() => onChange('nivel', filtros.nivel === n.value ? '' : n.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150
                    ${filtros.nivel === n.value
                      ? 'bg-[#0066cc] text-white border-[#0066cc]'
                      : 'bg-white text-[#4a5565] border-[#e5e7eb] hover:border-[#0066cc] hover:text-[#0066cc]'
                    }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Faixa de valor */}
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              Faixa de valor (R$)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="filtro-valor-min"
                min="0"
                placeholder="Mín"
                value={filtros.valorMin}
                onChange={(e) => onChange('valorMin', e.target.value)}
                className="w-full rounded-[8px] border border-[#e5e7eb] px-3 py-1.5 text-sm text-[#101828]
                  focus:outline-none focus:border-[#0066cc] transition-colors"
              />
              <span className="text-[#99a1af] text-xs shrink-0">até</span>
              <input
                type="number"
                id="filtro-valor-max"
                min="0"
                placeholder="Máx"
                value={filtros.valorMax}
                onChange={(e) => onChange('valorMax', e.target.value)}
                className="w-full rounded-[8px] border border-[#e5e7eb] px-3 py-1.5 text-sm text-[#101828]
                  focus:outline-none focus:border-[#0066cc] transition-colors"
              />
            </div>
            {/* Validação inline */}
            {filtros.valorMin && filtros.valorMax &&
              Number(filtros.valorMax) < Number(filtros.valorMin) && (
              <p className="mt-1.5 text-xs text-[#EF4444]">
                Valor máximo deve ser maior que o mínimo.
              </p>
            )}
          </div>

          {/* Botão de aplicar — apenas fecha o painel (filtros são reativos) */}
          <button
            type="button"
            onClick={() => setAberto(false)}
            className="w-full py-2 rounded-[10px] bg-[#0066cc] text-white text-sm font-medium hover:bg-[#005ab4] transition-colors"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  )
}
