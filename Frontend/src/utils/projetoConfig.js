// Constantes de configuração dos enums de projeto
// Reutilizadas em formulários, filtros e badges de status

export const NIVEIS_PROJETO = [
  { value: 'INICIANTE',     label: 'Iniciante'     },
  { value: 'INTERMEDIARIO', label: 'Intermediário'  },
  { value: 'AVANCADO',      label: 'Avançado'       },
]

export const STATUS_PROJETO = [
  { value: 'ATIVO',      label: 'Ativo'      },
  { value: 'EM_ANALISE', label: 'Em análise' },
  { value: 'CONCLUIDO',  label: 'Concluído'  },
  { value: 'CANCELADO',  label: 'Cancelado'  },
]

/** Retorna o label humanizado do nível a partir do valor enum ou do próprio label */
export function labelNivel(valor) {
  return NIVEIS_PROJETO.find(n => n.value === valor || n.label === valor)?.label ?? valor
}

/** Retorna o label humanizado do status a partir do valor enum ou do próprio label */
export function labelStatus(valor) {
  return STATUS_PROJETO.find(s => s.value === valor || s.label === valor)?.label ?? valor
}
