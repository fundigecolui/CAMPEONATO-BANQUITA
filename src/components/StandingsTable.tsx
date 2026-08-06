import React, { useState } from 'react';
import { Trophy, Shield, Info, Medal, Award, AlertOctagon, Swords } from 'lucide-react';
import { TeamStandings, Team, Match } from '../types';
import tournamentLogo from '../assets/images/san_simon_logo_dark_1785590924842.jpg';
import { checkMathematicalElimination } from '../utils/sanctionsEngine';
import { HeadToHeadModal } from './HeadToHeadModal';

interface StandingsTableProps {
  standings: TeamStandings[];
  teams: Team[];
  matches?: Match[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ standings, teams, matches = [] }) => {
  const [isH2HOpen, setIsH2HOpen] = useState(false);

  // Identify Valla Menos Vencida (Lowest GC among teams with played matches)
  const playedStandings = standings.filter((s) => s.pj > 0);
  const minGC = playedStandings.length > 0 ? Math.min(...playedStandings.map((s) => s.gc)) : null;

  // Identify Fair Play leader (Highest fairPlayPts)
  const maxFP = standings.length > 0 ? Math.max(...standings.map((s) => s.fairPlayPts)) : null;

  // Check mathematical elimination for bottom team
  const eliminationInfo = checkMathematicalElimination(standings, matches);

  // Compute last 3 matches form (W, D, L) for a team
  const getTeamForm = (teamId: string) => {
    const teamMatches = matches
      .filter(
        (m) =>
          (m.homeTeamId === teamId || m.awayTeamId === teamId) &&
          m.homeGoals !== undefined &&
          m.awayGoals !== undefined &&
          (m.status === 'FINALIZADO' || m.homeGoals > 0 || m.awayGoals > 0)
      )
      .sort((a, b) => b.fecha - a.fecha)
      .slice(0, 3);

    return teamMatches.map((m) => {
      const isHome = m.homeTeamId === teamId;
      const myGoals = isHome ? m.homeGoals! : m.awayGoals!;
      const oppGoals = isHome ? m.awayGoals! : m.homeGoals!;

      if (myGoals > oppGoals) return { res: 'W', label: 'G', color: 'bg-emerald-500 text-slate-950' };
      if (myGoals === oppGoals) return { res: 'D', label: 'E', color: 'bg-amber-500 text-slate-950' };
      return { res: 'L', label: 'P', color: 'bg-red-500 text-white' };
    });
  };

  return (
    <div className="space-y-3">
      {/* Mathematical Elimination Banner */}
      {eliminationInfo.isEliminated && (
        <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-red-950/90 border-2 border-red-500/80 p-3.5 rounded-2xl text-red-200 text-xs font-mono shadow-xl flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="font-extrabold text-red-300 uppercase tracking-wide text-xs sm:text-sm">
                🚫 ELIMINACIÓN MATEMÁTICA CONFIRMADA (REGLAMENTO)
              </h3>
              <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase">
                EQUIPO {eliminationInfo.eliminatedTeamName}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
              El equipo <strong className="text-red-300 font-bold">{eliminationInfo.eliminatedTeamName}</strong> ({eliminationInfo.lastTeamPts} pts) ha quedado
              matemáticamente descalificado/eliminado al serle <strong className="text-amber-300">imposible superar al 7° puesto</strong> ({eliminationInfo.seventhTeamName} con {eliminationInfo.seventhTeamPts} pts).
              Puntos máximos alcanzables: <strong className="text-amber-300">{eliminationInfo.lastTeamMaxPossiblePts} pts</strong> ({eliminationInfo.remainingMatchesForLastTeam} partidos pendientes).
            </p>
            <div className="mt-1.5 pt-1.5 border-t border-red-800/40 text-[11px] text-amber-300 font-bold flex items-center gap-1.5">
              <span>⚠️ Las fechas restantes que le faltan disputar a este equipo NO se jugarán.</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-400/40 p-0.5 flex items-center justify-center shrink-0">
              <img
                src={tournamentLogo}
                alt="Campeonato Banquitas San Simón"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white font-mono uppercase">
                Tabla General de Posiciones
              </h2>
              <p className="text-xs text-slate-400">
                Campeonato Banquitas San Simón - Actualización oficial en tiempo real tras cada partido.
              </p>
            </div>
          </div>

          {/* Table Header Subtitle & H2H Button */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsH2HOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Comparar historial directo entre dos equipos"
            >
              <Swords className="w-3.5 h-3.5 text-amber-400" />
              <span>⚔️ Frente a Frente (H2H)</span>
            </button>

            <span className="text-[11px] font-mono text-slate-400 font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              8 Equipos
            </span>
          </div>
        </div>

        {/* Standings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-mono text-[11px] border-b border-slate-800">
                <th className="p-3 text-center font-black w-12">POS</th>
                <th className="p-3 font-black">EQUIPO</th>
                <th className="p-3 text-center font-bold" title="Partidos Jugados">PJ</th>
                <th className="p-3 text-center font-bold text-emerald-400" title="Partidos Ganados">PG</th>
                <th className="p-3 text-center font-bold text-amber-400" title="Partidos Empatados">PE</th>
                <th className="p-3 text-center font-bold text-red-400" title="Partidos Perdidos">PP</th>
                <th className="p-3 text-center font-bold" title="Goles a Favor">GF</th>
                <th className="p-3 text-center font-bold" title="Goles en Contra (Valla)">GC</th>
                <th className="p-3 text-center font-black text-amber-300" title="Diferencia de Goles">DG</th>
                <th className="p-3 text-center font-bold text-slate-300" title="Últimos 3 partidos (G: Ganado, E: Empatado, P: Perdido)">RACHA (ÚLTIMOS 3)</th>
                <th className="p-3 text-center font-bold text-emerald-300" title="Puntos Juego Limpio (Fair Play)">JUEGO LIMPIO</th>
                <th className="p-3 text-center font-extrabold text-amber-400 bg-amber-500/10 text-sm" title="Puntos Totales">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {standings.map((row, idx) => {
                const team = teams.find((t) => t.id === row.teamId);
                const isLeader = idx === 0;
                const isVallaMenosVencida = minGC !== null && row.gc === minGC && row.pj > 0;
                const isFairPlayLeader = maxFP !== null && row.fairPlayPts === maxFP;
                const isEliminatedRow = eliminationInfo.isEliminated && row.teamId === eliminationInfo.eliminatedTeamId;
                const teamForm = getTeamForm(row.teamId);

                return (
                  <tr
                    key={row.teamId}
                    className={`hover:bg-slate-800/60 transition ${
                      isLeader ? 'bg-amber-500/5' : isEliminatedRow ? 'bg-red-950/30' : ''
                    }`}
                  >
                    {/* Position number */}
                    <td className="p-3 text-center font-mono font-black">
                      {idx === 0 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 inline-flex items-center justify-center text-xs font-black shadow-md">
                          1
                        </span>
                      ) : idx === 1 ? (
                        <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 inline-flex items-center justify-center text-xs font-black shadow-md">
                          2
                        </span>
                      ) : idx === 2 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-700 text-amber-100 inline-flex items-center justify-center text-xs font-black shadow-md">
                          3
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">{idx + 1}</span>
                      )}
                    </td>

                    {/* Team Name */}
                    <td className="p-3 font-black">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-lg font-black text-xs uppercase shadow-xs border ${
                            team?.badgeBg || 'bg-slate-800'
                          } ${team?.badgeText || 'text-white'} ${team?.badgeBorder || 'border-slate-700'}`}
                        >
                          {team?.name || row.teamId}
                        </span>

                        {isLeader && (
                          <span className="text-[12px] bg-amber-500/20 border border-amber-500/40 p-1 rounded-md font-bold inline-flex items-center justify-center leading-none" title="Líder del Torneo">
                            🏆
                          </span>
                        )}

                        {isVallaMenosVencida && (
                          <span className="text-[10px] bg-blue-950 border border-blue-500/50 p-1 rounded-md font-bold inline-flex items-center justify-center" title="Valla Menos Vencida (Menos goles recibidos)">
                            <Shield className="w-3.5 h-3.5 text-blue-400" />
                          </span>
                        )}

                        {isFairPlayLeader && (
                          <span className="text-[10px] bg-emerald-950 border border-emerald-500/50 p-1 rounded-md font-bold inline-flex items-center justify-center" title="Líder en Juego Limpio (Fair Play)">
                            <Award className="w-3.5 h-3.5 text-emerald-400" />
                          </span>
                        )}

                        {isEliminatedRow && (
                          <span className="px-2 py-0.5 text-[10px] bg-red-950 border border-red-500/80 text-red-300 rounded font-bold font-mono uppercase tracking-tight flex items-center gap-1" title="Matemáticamente imposible alcanzar al 7° puesto">
                            <AlertOctagon className="w-3 h-3 text-red-400" /> ELIMINADO MATEMÁTICAMENTE
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Match Stats */}
                    <td className="p-3 text-center font-mono font-bold text-slate-300">{row.pj}</td>
                    <td className="p-3 text-center font-mono font-bold text-emerald-400">{row.pg}</td>
                    <td className="p-3 text-center font-mono font-bold text-amber-400">{row.pe}</td>
                    <td className="p-3 text-center font-mono font-bold text-red-400">{row.pp}</td>
                    <td className="p-3 text-center font-mono text-slate-300">{row.gf}</td>
                    <td className={`p-3 text-center font-mono font-bold ${isVallaMenosVencida ? 'text-blue-400 bg-blue-950/40' : 'text-slate-400'}`}>
                      {row.gc}
                    </td>
                    <td className="p-3 text-center font-mono font-black text-amber-300">
                      {row.dg > 0 ? `+${row.dg}` : row.dg}
                    </td>

                    {/* Team Form Badge Pills */}
                    <td className="p-3 text-center font-mono text-xs">
                      {teamForm.length === 0 ? (
                        <span className="text-slate-600 font-sans text-[10px]">-</span>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          {teamForm.map((f, fIdx) => (
                            <span
                              key={fIdx}
                              className={`w-5 h-5 rounded-md font-black text-[10px] inline-flex items-center justify-center shadow-xs ${f.color}`}
                              title={`Partido: ${f.res === 'W' ? 'Ganado' : f.res === 'D' ? 'Empatado' : 'Perdido'}`}
                            >
                              {f.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center font-mono font-bold text-emerald-400 bg-emerald-950/20">
                      {row.fairPlayPts} pts
                    </td>
                    <td className="p-3 text-center font-mono font-black text-base text-amber-400 bg-amber-500/10">
                      {row.pts}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Head to Head Modal */}
        <HeadToHeadModal
          isOpen={isH2HOpen}
          onClose={() => setIsH2HOpen(false)}
          teams={teams}
          matches={matches}
        />

        {/* Footer Legend for Badges & Rules */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
              🏆 Líder del Torneo
            </span>
            <span className="text-blue-300 font-bold flex items-center gap-1 bg-blue-950 border border-blue-500/40 px-2 py-0.5 rounded">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> Valla Menos Vencida
            </span>
            <span className="text-emerald-300 font-bold flex items-center gap-1 bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 rounded">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Líder Juego Limpio
            </span>
          </div>

          <span className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-[11px]">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Criterios de Desempate: Puntos &gt; DG &gt; GF &gt; Juego Limpio
          </span>
        </div>
      </div>
    </div>
  );
};

