import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import FreelancerCard from '../components/ui/FreelancerCard'
import FreelancerListHeader from '../components/ui/FreelancerListHeader'
import PublicarProjetoCard from '../components/ui/PublicarProjetoCard'
import { perfilService } from '../services/perfilService'

export default function BuscarFreelancers() {
  const [busca, setBusca] = useState('')
  const [freelancers, setFreelancers] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    setCarregando(true)
    setErro(null)
    perfilService.buscarFreelancers({ busca })
      .then(data => setFreelancers(data.dados))
      .catch(err => setErro(err?.mensagem ?? 'Erro ao carregar freelancers'))
      .finally(() => setCarregando(false))
  }, [busca])

  return (
    <div className="bg-[#f8f9fb] min-h-screen flex flex-col">
      <Navbar />

      {/* Subheader */}
      <div className="bg-white border-b border-[#e5e7eb] w-full">
        <div className="max-w-[1088px] mx-auto w-full px-4 md:px-8 lg:px-[15px] pt-8 pb-0">
          <p className="text-[#99a1af] text-[12px] font-semibold uppercase tracking-[1.2px]">Contratação</p>
          <h1 className="font-['Poppins'] font-medium text-[24px] text-[#101828] leading-9 mt-1">
            Buscar Freelancers
          </h1>
          <p className="text-[#99a1af] text-[14px] mt-1">
            Profissionais verificados e estudantes de TI prontos para seu projeto.
          </p>
        </div>

        {/* Busca */}
        <div className="max-w-[1088px] mx-auto w-full px-4 md:px-8 lg:px-[15px] pt-4 pb-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-3.5 text-[#99a1af]" />
              <input
                type="text"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar por nome ou especialidade..."
                className="w-full pl-10 pr-4 py-[10px] border border-[#e5e7eb] rounded-[10px] text-[14px] text-[rgba(10,10,10,0.5)] outline-none focus:border-[#0D63C1]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1088px] mx-auto px-4 md:px-8 lg:px-[15px] py-8 flex flex-col lg:flex-row gap-8">

        {/* Lista de Freelancers (Esquerda) */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <FreelancerListHeader count={freelancers.length} />

          <div className="flex flex-col gap-3">
            {carregando ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-sm text-[#99a1af]">Carregando freelancers...</span>
              </div>
            ) : erro ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-sm text-[#EF4444]">{erro}</span>
              </div>
            ) : freelancers.length > 0 ? (
              freelancers.map(freelancer => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
              ))
            ) : (
              <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-8 text-center text-[#6a7282]">
                Nenhum freelancer encontrado para esta busca.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Lateral (Direita) */}
        <aside className="w-full lg:w-[341px] shrink-0">
          <div className="sticky top-[90px]">
            <PublicarProjetoCard />
          </div>
        </aside>

      </main>
    </div>
  )
}
