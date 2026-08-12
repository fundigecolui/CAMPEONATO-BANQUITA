import React, { useState } from 'react';
import { PlusCircle, X, Check } from 'lucide-react';

interface CreateEditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export const CreateEditionModal: React.FC<CreateEditionModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [editionName, setEditionName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editionName.trim()) return;
    onCreate(editionName.trim());
    setEditionName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Crear Nueva Edición de Torneo</h3>
            <p className="text-xs text-slate-400">Inicia una nueva temporada o semestre de Banquitas</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Nombre de la Edición
            </label>
            <input
              type="text"
              value={editionName}
              onChange={(e) => setEditionName(e.target.value)}
              placeholder="Ej: I SEMESTRE 2027"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 font-semibold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!editionName.trim()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Crear Edición
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
