import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Apresentacao from './pages/Apresentacao'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import PublicarProjeto from './pages/PublicarProjeto'
import BuscarProjetos from './pages/BuscarProjetos'
import BuscarFreelancers from './pages/BuscarFreelancers'
import MinhasCandidaturas from './pages/MinhasCandidaturas'
import RotaPrivada from './components/RotaPrivada'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Apresentacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route path="/home" element={<RotaPrivada><Homepage /></RotaPrivada>} />
        <Route path="/clientes/publicar" element={<RotaPrivada><PublicarProjeto /></RotaPrivada>} />
        <Route path="/clientes/buscarFreelancers" element={<RotaPrivada><BuscarFreelancers /></RotaPrivada>} />
        <Route path="/freelancers/buscarProjeto" element={<RotaPrivada><BuscarProjetos /></RotaPrivada>} />
        <Route path="/freelancers/candidaturas" element={<RotaPrivada><MinhasCandidaturas /></RotaPrivada>} />
      </Routes>
    </BrowserRouter>
  )
}
