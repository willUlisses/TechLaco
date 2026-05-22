import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function usePerfilCliente() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPerfil = useCallback(() => {
    setLoading(true);
    api.get('/perfis/cliente/me')
      .then(setPerfil)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchPerfil(); }, [fetchPerfil]);

  return { perfil, loading, error, refetch: fetchPerfil };
}
