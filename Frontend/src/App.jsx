import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Apresentacao from './pages/Apresentacao'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import PublicarProjeto from './pages/PublicarProjeto'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientes/publicar" element={<PublicarProjeto />} />
      </Routes>
    </BrowserRouter>
  )
}
