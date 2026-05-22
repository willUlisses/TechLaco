import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { api } from '../../services/api';
import { perfilClienteSchema } from './schemas/perfilClienteSchema';

export default function EditarPerfilClienteModal({ perfil, onClose, onSaved }) {
  const [salvando, setSalvando] = useState(false);
  const [erroGlobal, setErroGlobal] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(perfilClienteSchema),
    defaultValues: {
      bio: perfil?.bio ?? '',
    },
  });

  const bioAtual = watch('bio') ?? '';

  async function onSubmit(data) {
    setSalvando(true);
    setErroGlobal(null);
    try {
      await api.patch('/perfis/cliente/me', { bio: data.bio });
      onSaved();
      onClose();
    } catch (err) {
      setErroGlobal('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cliente-titulo"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 id="modal-cliente-titulo" className="text-base font-semibold text-slate-800">
            Editar perfil
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto px-6 py-5 space-y-5"
        >
          {erroGlobal && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {erroGlobal}
            </p>
          )}

          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sobre mim
              </label>
              <span className="text-xs text-slate-400">
                {bioAtual.length}/500
              </span>
            </div>
            <textarea
              {...register('bio')}
              rows={5}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Conte um pouco sobre você ou sua empresa..."
            />
            {errors.bio && (
              <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
            )}
          </div>
        </form>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={salvando}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
