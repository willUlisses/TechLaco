import { X } from 'lucide-react';

export default function SkillBadge({ label, onRemove }) {
  return (
    <li>
      <span
        className={`inline-flex items-center gap-1.5 border border-slate-200 rounded-full text-sm text-slate-600 bg-white transition-colors
          ${onRemove ? 'pl-4 pr-2 py-1.5' : 'px-4 py-1.5'}`}
      >
        {label}

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center justify-center w-4 h-4 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label={`Remover habilidade ${label}`}
          >
            <X size={11} strokeWidth={2.5} aria-hidden="true" />
          </button>
        )}
      </span>
    </li>
  );
}