import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SemAcesso({ tipo }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Acesso Restrito</h2>
      <p className="text-slate-600 mb-6 max-w-md">
        Você não tem permissão para acessar esta área. Esta página é exclusiva para usuários do tipo{' '}
        <strong>{tipo === 'freelancer' ? 'Freelancer' : 'Cliente'}</strong>.
      </p>
      <Link 
        to="/home" 
        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
      >
        Voltar ao Início
      </Link>
    </div>
  );
}
