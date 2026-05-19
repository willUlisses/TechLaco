import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Apresentacao from './pages/Apresentacao'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import PerfilCliente from './pages/PerfilCliente'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilCliente />} />
        <Route path="/clientes/perfil" element={<PerfilCliente />} />
      </Routes>
    </BrowserRouter>
  )
}
