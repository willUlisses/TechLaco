import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BackLink() {
  return (
    <div className="flex gap-3 items-center text-blue-600 font-medium">
      <ArrowLeft size={18} color="blue" />
      <Link to="/" className="text-blue-600 no-underline hover:underline">
        Voltar
      </Link>
    </div>
  )
}
