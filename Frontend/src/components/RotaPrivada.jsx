import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function RotaPrivada({ children }) {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB]">
        <span className="text-sm text-[#99a1af]">Carregando...</span>
      </div>
    )
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}
