import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus } from 'lucide-react';
import { api } from '../../services/api';
import { perfilFreelancerSchema } from './schemas/perfilFreelancerSchema';

export default function EditarPerfilFreelancerModal({ perfil, onClose, onSaved }) {
  const [salvando, setSalvando] = useState(false);
  const [adicionandoSkill, setAdicionandoSkill] = useState(false);
  const [erroGlobal, setErroGlobal] = useState(null);

  const { register, handleSubmit, formState: { errors }, getValues, resetField } = useForm({
    resolver: zodResolver(perfilFreelancerSchema),
    defaultValues: {
      especialidade: perfil.especialidade ?? '',
      faculdade: perfil.faculdade ?? '',
      bio: perfil.bio ?? '',
      githubUrl: perfil.githubUrl ?? '',
      novaHabilidade: '',
    },
  });

  async function onSubmit(data) {
    setSalvando(true);
    setErroGlobal(null);
    try {
      const body = {};
      if (data.especialidade !== '') body.especialidade = data.especialidade;
      if (data.faculdade !== '') body.faculdade = data.faculdade;
      if (data.bio !== '') body.bio = data.bio;
      if (data.githubUrl !== '') body.githubUrl = data.githubUrl;

      await api.patch('/perfis/freelancer/me', body);
      onSaved();
      onClose();
    } catch (err) {
      setErroGlobal('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  async function handleAdicionarHabilidade() {
    const habilidade = getValues('novaHabilidade').trim();
    if (!habilidade) return;
    setAdicionandoSkill(true);
    setErroGlobal(null);
    try {
      await api.patch('/perfis/freelancer/me/habilidades', { habilidade });
      onSaved();
      resetField('novaHabilidade');
    } catch (err) {
      setErroGlobal('Erro ao adicionar habilidade. Verifique se ela já existe.');
    } finally {
      setAdicionandoSkill(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">
            Editar perfil freelancer
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form id="form-editar-perfil" onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto px-6 py-5 space-y-5">
          {erroGlobal && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{erroGlobal}</p>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Especialidade
            </label>
            <input
              {...register('especialidade')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Desenvolvimento Frontend"
            />
            {errors.especialidade && (
              <p className="mt-1 text-xs text-red-500">{errors.especialidade.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Faculdade / Instituição
            </label>
            <input
              {...register('faculdade')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Universidade de São Paulo"
            />
            {errors.faculdade && (
              <p className="mt-1 text-xs text-red-500">{errors.faculdade.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              GitHub URL
            </label>
            <input
              {...register('githubUrl')}
              type="url"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/seu-usuario"
            />
            {errors.githubUrl && (
              <p className="mt-1 text-xs text-red-500">{errors.githubUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Sobre mim
            </label>
            <textarea
              {...register('bio')}
              rows={4}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Conte um pouco sobre você..."
            />
            {errors.bio && (
              <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Habilidades
            </label>

            {perfil.habilidades && perfil.habilidades.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {perfil.habilidades.map(skill => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 bg-slate-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                {...register('novaHabilidade')}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: React"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); handleAdicionarHabilidade(); }
                }}
              />
              <button
                type="button"
                onClick={handleAdicionarHabilidade}
                disabled={adicionandoSkill}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                <Plus size={14} />
                {adicionandoSkill ? 'Adicionando...' : 'Adicionar'}
              </button>
            </div>
            {errors.novaHabilidade && (
              <p className="mt-1 text-xs text-red-500">{errors.novaHabilidade.message}</p>
            )}
          </div>
        </form>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="form-editar-perfil"
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
