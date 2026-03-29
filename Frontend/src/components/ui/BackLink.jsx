import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BackLink() {
  return (
    <div className="flex gap-3 items-center text-white font-medium text-[0.9rem]">
      <ArrowLeft size={18} color="white" />
      <Link to="/" className="text-white no-underline hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  )
}
