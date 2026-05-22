import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useProjetosCliente() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchProjetos = useCallback(() => {
    setLoading(true);
    api.get('/projetos/meus')
      .then(setProjetos)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProjetos(); }, [fetchProjetos]);

  return { projetos, loading, error, refetch: fetchProjetos };
}
