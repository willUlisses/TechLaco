import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setCarregando(false); return }

    api.get('/auth/me')
      .then(data => setUsuario({
        ...data,
        isCliente:    data.tipo.includes('ROLE_CLIENTE'),
        isFreelancer: data.tipo.includes('ROLE_FREELANCER'),
      }))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setCarregando(false))
  }, [])

  function salvarSessao(authResponse) {
    localStorage.setItem('token', authResponse.token)
    setUsuario({
      id:           authResponse.id,
      email:        authResponse.email,
      nome:         authResponse.nome,
      sobrenome:    authResponse.sobrenome,
      tipo:         authResponse.tipo,
      isCliente:    authResponse.tipo.includes('ROLE_CLIENTE'),
      isFreelancer: authResponse.tipo.includes('ROLE_FREELANCER'),
    })
  }

  function encerrarSessao() {
    localStorage.removeItem('token')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, salvarSessao, encerrarSessao }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
