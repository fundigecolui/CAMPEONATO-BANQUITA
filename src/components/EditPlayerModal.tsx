import React, { useState, useEffect } from 'react';
import { X, Edit3, Trash2, Shield, UserCheck } from 'lucide-react';
import { Player, Team, TeamId } from '../types';

interface EditPlayerModalProps {
  player: Player | null;
  teams: Team[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (playerId: number, name: string, dorsal: number, teamId: TeamId) => void;
  onDelete: (playerId: number) => void;
}

export const EditPlayerModal: React.FC<EditPlayerModalProps> = ({
  player,
  teams,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState('');
  const [dorsal, setDorsal] = useState<number>(10);
  const [teamId, setTeamId] = useState<TeamId>('AZUL');

  useEffect(() => {
    if (player) {
      setName(player.name);
      setDorsal(player.dorsal);
      setTeamId(player.teamId);
    }
  }, [player]);

  if (!isOpen || !player) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(player.id, name.trim().toUpperCase(), dorsal, teamId);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`¿Está seguro de eliminar a ${player.name} de la plantilla oficial?`)) {
      onDelete(player.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400/50 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold font-mono text-white uppercase">
              Editar Jugador (Modo Edición)
            </h2>
            <p className="text-xs text-slate-400">Actualiza datos o trasfiere el jugador de equipo</p>
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
              placeholder="Ej. LUIS PACHECO"
              className="w-full bg-slate-800 text-slate-100 font-bold text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Número de Dorsal:</label>
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
              <label className="block text-slate-300 font-bold mb-1">Equipo / Plantilla:</label>
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

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleDelete}
              className="px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar Jugador</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition shadow-md flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
