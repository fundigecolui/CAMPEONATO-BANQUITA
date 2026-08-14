import React, { useState } from 'react';
import { Match, Team } from '../types';
import { Trophy, Shield, X, Swords } from 'lucide-react';

interface HeadToHeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  matches: Match[];
}

export const HeadToHeadModal: React.FC<HeadToHeadModalProps> = ({ isOpen, onClose, teams, matches }) => {
  if (!isOpen) return null;

  const [teamAId, setTeamAId] = useState<string>(teams[0]?.id || 'AZUL');
  const [teamBId, setTeamBId] = useState<string>(teams[1]?.id || 'VERDE');

  const teamA = teams.find((t) => t.id === teamAId);
  const teamB = teams.find((t) => t.id === teamBId);

  // Find all matches played between Team A and Team B
  const h2hMatches = matches.filter(
    (m) =>
      (m.homeTeamId === teamAId && m.awayTeamId === teamBId) ||
      (m.homeTeamId === teamBId && m.awayTeamId === teamAId)
  );

  // Calculate H2H Statistics
  let teamAWins = 0;
  let teamBWins = 0;
  let draws = 0;
  let teamAGoals = 0;
  let teamBGoals = 0;

  h2hMatches.forEach((m) => {
    if (m.homeGoals === undefined || m.awayGoals === undefined) return;

    const isAHome = m.homeTeamId === teamAId;
    const aScore = isAHome ? m.homeGoals : m.awayGoals;
    const bScore = isAHome ? m.awayGoals : m.homeGoals;

    teamAGoals += aScore;
    teamBGoals += bScore;

    if (aScore > bScore) teamAWins++;
    else if (bScore > aScore) teamBWins++;
    else draws++;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl text-slate-100 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Swords className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-white text-base font-mono">
                COMPARATIVA FRENTE A FRENTE (HEAD TO HEAD)
              </h3>
              <p className="text-xs text-slate-400">Historial de enfrentamientos directos en el torneo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Team Selectors */}
        <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 font-mono uppercase">
              EQUIPO A:
            </label>
            <select
              value={teamAId}
              onChange={(e) => setTeamAId(e.target.value)}
              className="w-full bg-slate-800 text-white font-bold text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === teamBId}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 font-mono uppercase">
              EQUIPO B:
            </label>
            <select
              value={teamBId}
              onChange={(e) => setTeamBId(e.target.value)}
              className="w-full bg-slate-800 text-white font-bold text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === teamAId}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Stats Banner */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-center font-mono">
            <div className="space-y-1">
              <span
                className={`inline-block px-3 py-1 rounded-lg font-black text-xs uppercase border ${
                  teamA?.badgeBg || 'bg-slate-800'
                } ${teamA?.badgeText || 'text-white'} ${teamA?.badgeBorder || 'border-transparent'}`}
              >
                {teamA?.name}
              </span>
              <div className="text-2xl font-black text-amber-400">{teamAWins}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Victorias</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Empates</span>
              <div className="text-xl font-bold text-slate-300">{draws}</div>
              <div className="text-[10px] text-slate-500 font-mono">{h2hMatches.length} partidos jugados</div>
            </div>

            <div className="space-y-1">
              <span
                className={`inline-block px-3 py-1 rounded-lg font-black text-xs uppercase border ${
                  teamB?.badgeBg || 'bg-slate-800'
                } ${teamB?.badgeText || 'text-white'} ${teamB?.badgeBorder || 'border-transparent'}`}
              >
                {teamB?.name}
              </span>
              <div className="text-2xl font-black text-amber-400">{teamBWins}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Victorias</div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-400 px-2">
            <span>Goles {teamA?.name}: <strong className="text-white">{teamAGoals}</strong></span>
            <span>Goles {teamB?.name}: <strong className="text-white">{teamBGoals}</strong></span>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-400 font-mono uppercase">
            Historial de Enfrentamientos ({h2hMatches.length})
          </h4>

          {h2hMatches.length === 0 ? (
            <p className="text-xs text-slate-400 p-4 text-center bg-slate-950 rounded-xl border border-slate-800">
              Aún no se registran enfrentamientos disputados entre estos dos equipos en el torneo.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {h2hMatches.map((m) => {
                const home = teams.find((t) => t.id === m.homeTeamId);
                const away = teams.find((t) => t.id === m.awayTeamId);

                return (
                  <div
                    key={m.id}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-slate-400 font-bold">Fecha {m.fecha}</span>
                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-slate-200">{home?.name}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black">
                        {m.homeGoals ?? '-'} - {m.awayGoals ?? '-'}
                      </span>
                      <span className="text-slate-200">{away?.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{m.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
