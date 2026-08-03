import React, { useState } from 'react';
import { X, UserPlus, Shield } from 'lucide-react';
import { Team, TeamId } from '../types';

interface AddPlayerModalProps {
  isOpen: boolean;
  teams: Team[];
  onClose: () => void;
  onAddPlayer: (name: string, dorsal: number, teamId: TeamId) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  isOpen,
  teams,
  onClose,
  onAddPlayer,
}) => {
  const [name, setName] = useState('');
  const [dorsal, setDorsal] = useState<number>(10);
  const [teamId, setTeamId] = useState<TeamId>('AZUL');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPlayer(name.trim().toUpperCase(), dorsal, teamId);
    setName('');
    setDorsal(10);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold font-mono text-white uppercase">
              Registrar Nuevo Jugador
            </h2>
            <p className="text-xs text-slate-400">Añade un jugador al padrón del torneo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Nombre Completo del Jugador:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. CARLOS MENDOZA"
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Número de Dorsal / Camiseta:</label>
              <input
                type="number"
                required
                min={1}
                max={99}
                value={dorsal}
                onChange={(e) => setDorsal(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-800 text-amber-300 font-mono font-black text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Equipo (8 Equipos):</label>
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value as TeamId)}
                className="w-full bg-slate-800 text-slate-100 font-bold text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-md"
            >
              Guardar Jugador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
