import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Apresentacao from './pages/Apresentacao'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Homepage from './pages/Homepage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}
