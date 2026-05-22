import { useState, useEffect, useCallback } from 'react';
import { candidaturaService } from '../services/candidaturaService';

export function useCandidaturas(status) {
  const [candidaturas, setCandidaturas] = useState([]);
  const [receitaTotal, setReceitaTotal] = useState(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const fetchCandidaturas = useCallback(() => {
    setLoading(true);
    candidaturaService.minhas(status)
      .then(data => {
        setCandidaturas(data.candidaturas || []);
        setReceitaTotal(data.receitaTotal || 0);
      })
      .catch(err => setError(err?.mensagem ?? 'Erro ao buscar candidaturas'))
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => {
    fetchCandidaturas();
  }, [fetchCandidaturas]);

  return { candidaturas, receitaTotal, loading, error, refetch: fetchCandidaturas };
}
