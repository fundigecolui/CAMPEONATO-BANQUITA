import React, { useState } from 'react';
import { X, Shield, Trophy, AlertTriangle, Plus, Trash2, Calendar, CheckCircle2 } from 'lucide-react';
import { Player, Team, CardRecord, GoalRecord, PlayerStats, CardType } from '../types';

interface PlayerProfileModalProps {
  player: Player | null;
  teams: Team[];
  cards: CardRecord[];
  goals: GoalRecord[];
  playerStats: PlayerStats | undefined;
  allSuspensions: any[];
  onClose: () => void;
  onAddCard: (playerId: number, fecha: number, type: CardType) => void;
  onRemoveCard: (cardId: string) => void;
  onRemoveGoal: (goalId: string) => void;
}

export const PlayerProfileModal: React.FC<PlayerProfileModalProps> = ({
  player,
  teams,
  cards,
  goals,
  playerStats,
  allSuspensions,
  onClose,
  onAddCard,
  onRemoveCard,
  onRemoveGoal,
}) => {
  if (!player) return null;

  const team = teams.find((t) => t.id === player.teamId);
  const playerCards = cards.filter((c) => c.playerId === player.id).sort((a, b) => a.fecha - b.fecha);
  const playerGoals = goals.filter((g) => g.playerId === player.id).sort((a, b) => a.fecha - b.fecha);
  const playerSuspensions = allSuspensions.filter((s) => s.playerId === player.id);

  const [quickFecha, setQuickFecha] = useState<number>(1);
  const [quickType, setQuickType] = useState<CardType>('AMARILLA');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:hidden">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-2xl w-full p-5 shadow-2xl space-y-5 my-8 text-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Player Header Banner */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg font-mono">
            {player.dorsal}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black font-mono text-white uppercase">{player.name}</h2>
              <span className={`px-2.5 py-0.5 rounded text-xs font-black uppercase ${team?.badgeBg} ${team?.badgeText}`}>
                {player.teamId}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Expediente Individual de Disciplina y Goles - Campeonato Banquitas San Simón
            </p>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="block text-[10px] text-slate-400">⚽ GOLES</span>
            <span className="font-black text-amber-300 text-base">{playerStats?.goles || 0}</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="block text-[10px] text-slate-400">🟨 AMARILLAS</span>
            <span className="font-black text-yellow-300 text-base">{playerStats?.amarillas || 0}</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="block text-[10px] text-slate-400">🟦 AZULES</span>
            <span className="font-black text-blue-300 text-base">{playerStats?.azules || 0}</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="block text-[10px] text-slate-400">🟥 ROJAS</span>
            <span className="font-black text-red-400 text-base">{playerStats?.rojas || 0}</span>
          </div>
        </div>

        {/* Active Suspension Alert if currently suspended */}
        {playerStats?.isCurrentlySuspended && (
          <div className="bg-red-950/80 border-2 border-red-500 rounded-xl p-3 flex items-center gap-3 text-red-200 text-xs">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <span className="font-extrabold uppercase text-red-300 block">
                ¡JUGADOR SUSPENDIDO EN FECHA {playerStats.suspendedForFecha}!
              </span>
              <span>Causa: {playerStats.suspensionReason}. Sanción válida únicamente por 1 fecha.</span>
            </div>
          </div>
        )}

        {/* Suspension History Log */}
        {playerSuspensions.length > 0 && (
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
            <p className="font-mono font-bold text-amber-300 uppercase text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Historial de Suspensiones Automáticas:
            </p>
            <div className="space-y-1">
              {playerSuspensions.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-300 font-medium">{s.details}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.status === 'PENDIENTE'
                        ? 'bg-red-600 text-white'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {s.status === 'PENDIENTE' ? 'SUSPENDIDO' : 'CUMPLIDA ✓'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chronological Card & Goal Log */}
        <div className="space-y-2">
          <h3 className="font-mono font-bold text-xs uppercase text-slate-300">
            Historial de Tarjetas y Goles por Fecha:
          </h3>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {playerCards.length === 0 && playerGoals.length === 0 ? (
              <p className="text-slate-500 text-xs italic">No registra tarjetas ni goles en el campeonato.</p>
            ) : (
              <>
                {playerCards.map((c) => (
                  <div key={c.id} className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-lg text-xs">
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-4 rounded-xs inline-block text-center font-bold text-[9px] ${
                          c.type === 'AMARILLA'
                            ? 'bg-yellow-400 text-slate-950'
                            : c.type === 'AZUL'
                            ? 'bg-blue-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      ></span>
                      <span className="font-bold">Tarjeta {c.type}</span>
                      <span className="text-slate-400 font-mono text-[11px]">en Fecha {c.fecha}</span>
                    </span>
                    <button
                      onClick={() => onRemoveCard(c.id)}
                      className="text-slate-400 hover:text-red-400 p-1"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {playerGoals.map((g) => (
                  <div key={g.id} className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-lg text-xs">
                    <span className="flex items-center gap-2">
                      <span>⚽</span>
                      <span className="font-bold text-amber-300">Gol Anotado</span>
                      <span className="text-slate-400 font-mono text-[11px]">en Fecha {g.fecha}</span>
                    </span>
                    <button
                      onClick={() => onRemoveGoal(g.id)}
                      className="text-slate-400 hover:text-red-400 p-1"
                      title="Eliminar gol"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Quick Add Card Form inside Modal */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-bold text-slate-400 font-mono">Agregar en Fecha:</span>
            <select
              value={quickFecha}
              onChange={(e) => setQuickFecha(Number(e.target.value))}
              className="bg-slate-800 text-amber-300 font-bold text-xs rounded-lg px-2 py-1 border border-slate-700 focus:outline-none"
            >
              {Array.from({ length: 38 }, (_, i) => i + 1).map((f) => (
                <option key={f} value={f}>
                  Fecha {f}
                </option>
              ))}
            </select>

            <select
              value={quickType}
              onChange={(e) => setQuickType(e.target.value as CardType)}
              className="bg-slate-800 text-white font-bold text-xs rounded-lg px-2 py-1 border border-slate-700 focus:outline-none"
            >
              <option value="AMARILLA">🟨 Amarilla</option>
              <option value="AZUL">🟦 Azul</option>
              <option value="ROJA">🟥 Roja</option>
            </select>
          </div>

          <button
            onClick={() => onAddCard(player.id, quickFecha, quickType)}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Registrar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
