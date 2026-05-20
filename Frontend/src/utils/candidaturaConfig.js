export const statusConfig = {
  PENDENTE: {
    label: 'Pendente',
    barColor: 'bg-[#f59e0b]',
    badgeBg: 'bg-[rgba(245,158,11,0.08)]',
    badgeText: 'text-[#f59e0b]',
    bannerBorder: 'border-[#f59e0b]',
    mensagem: 'Sua proposta está aguardando avaliação.',
    Icon: 'Clock',
  },
  ACEITA: {
    label: 'Aceita',
    barColor: 'bg-[#00a86b]',
    badgeBg: 'bg-[rgba(0,168,107,0.08)]',
    badgeText: 'text-[#00a86b]',
    bannerBorder: 'border-[#00a86b]',
    mensagem: 'Parabéns, você foi aprovado!',
    Icon: 'CheckCircle',
  },
  RECUSADA: {
    label: 'Recusada',
    barColor: 'bg-[#dc2626]',
    badgeBg: 'bg-[rgba(220,38,38,0.08)]',
    badgeText: 'text-[#dc2626]',
    bannerBorder: 'border-[#dc2626]',
    mensagem: 'Infelizmente sua proposta foi recusada :(',
    Icon: 'XCircle',
  }
}

export const parseStatusCandidatura = (statusDaApi) => {
  if (!statusDaApi) return 'PENDENTE';

  const statusNormalizado = String(statusDaApi).toUpperCase().trim();

  return statusConfig[statusNormalizado] ? statusNormalizado : 'PENDENTE';
};
