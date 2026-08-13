import React, { useState } from 'react';
import { Trophy, Search, Eye, Flame, Info, Filter, ArrowUpDown } from 'lucide-react';
import { PlayerStats, Team } from '../types';
import { TeamBadgeDot, CardIconVector, GoalBallBadge } from './TeamColorDot';

interface ScorersTableProps {
  playerStats: PlayerStats[];
  teams: Team[];
  onSelectPlayer: (playerId: number) => void;
}

export const ScorersTable: React.FC<ScorersTableProps> = ({ playerStats, teams, onSelectPlayer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');
  const [onlyScorers, setOnlyScorers] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'GOLES' | 'NOMBRE' | 'DORSAL'>('GOLES');

  // Filter players and sort according to selected options
  const scorersList = playerStats
    .filter((s) => {
      // Filter only scorers vs all players
      if (onlyScorers && s.goles <= 0) return false;

      // Filter by team
      const matchesTeam = selectedTeam === 'ALL' || s.teamId === selectedTeam;
      if (!matchesTeam) return false;

      // Filter by search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(term);
        const matchesDorsal = s.dorsal.toString().includes(term);
        if (!matchesName && !matchesDorsal) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'GOLES') {
        return b.goles - a.goles || a.name.localeCompare(b.name) || a.dorsal - b.dorsal;
      }
      if (sortBy === 'NOMBRE') {
        return a.name.localeCompare(b.name) || b.goles - a.goles;
      }
      if (sortBy === 'DORSAL') {
        return a.dorsal - b.dorsal || b.goles - a.goles;
      }
      return 0;
    });

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden print:hidden">
      {/* Header & Controls Bar */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <span className="text-xl">⚽</span>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white font-mono uppercase">
                Tabla Oficial de Goleadores
              </h2>
              <p className="text-xs text-slate-400">
                Estadísticas individuales de goles anotados (Válidos hasta la Fecha 35).
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Options Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 border-t border-slate-800/80">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar jugador o dorsal..."
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-8 pr-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Team Selector */}
          <div className="flex items-center bg-slate-800 rounded-xl px-2.5 py-1 border border-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-semibold w-full focus:outline-none cursor-pointer py-1"
            >
              <option value="ALL" className="bg-slate-900 text-slate-100">Todos los equipos</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-slate-100">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Filter: Solo goleadores vs Todos los jugadores */}
          <div className="flex items-center bg-slate-800 rounded-xl px-2.5 py-1 border border-slate-700">
            <Eye className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <select
              value={onlyScorers ? 'SCORERS' : 'ALL'}
              onChange={(e) => setOnlyScorers(e.target.value === 'SCORERS')}
              className="bg-transparent text-slate-200 text-xs font-semibold w-full focus:outline-none cursor-pointer py-1"
            >
              <option value="SCORERS" className="bg-slate-900 text-slate-100">Solo goleadores</option>
              <option value="ALL" className="bg-slate-900 text-slate-100">Todos los jugadores</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center bg-slate-800 rounded-xl px-2.5 py-1 border border-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'GOLES' | 'NOMBRE' | 'DORSAL')}
              className="bg-transparent text-slate-200 text-xs font-semibold w-full focus:outline-none cursor-pointer py-1"
            >
              <option value="GOLES" className="bg-slate-900 text-slate-100">Orden: Más goles</option>
              <option value="NOMBRE" className="bg-slate-900 text-slate-100">Orden: Nombre (A-Z)</option>
              <option value="DORSAL" className="bg-slate-900 text-slate-100">Orden: Número camiseta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regulation Notice Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-200 flex items-center gap-2 font-sans">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>REGLAMENTO DE GOLEADORES:</strong> Para el título de Goleador de la Temporada, los goles son válidos <strong>únicamente hasta la Fecha 35</strong> (Fase Regular). Los goles de la fase de eliminatorias no suman para la tabla general.
        </span>
      </div>

      {/* Top 3 Podio Goleadores Highlight Cards */}
      {sortBy === 'GOLES' && scorersList.length >= 3 && !searchTerm && selectedTeam === 'ALL' && onlyScorers && (
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3">
          {scorersList.slice(0, 3).map((topScorer, topIdx) => {
            const topTeam = teams.find((t) => t.id === topScorer.teamId);
            const isFirst = topIdx === 0;
            const isSecond = topIdx === 1;

            const badgeBg = isFirst
              ? 'from-amber-500/20 via-slate-900 to-amber-950/30 border-amber-500/50 shadow-amber-500/10'
              : isSecond
              ? 'from-slate-400/20 via-slate-900 to-slate-950 border-slate-400/40 shadow-slate-400/10'
              : 'from-amber-700/20 via-slate-900 to-amber-950/20 border-amber-700/40 shadow-amber-700/10';

            const rankIcon = isFirst ? '🥇' : isSecond ? '🥈' : '🥉';
            const rankTitle = isFirst ? 'LÍDER DE GOLEO' : isSecond ? 'SEGUNDO LUGAR' : 'TERCER LUGAR';

            return (
              <div
                key={topScorer.playerId}
                onClick={() => onSelectPlayer(topScorer.playerId)}
                className={`p-3.5 rounded-xl border bg-gradient-to-br ${badgeBg} flex items-center justify-between cursor-pointer hover:scale-[1.02] transition shadow-xl relative overflow-hidden group`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Podio Icon & Internal Dorsal Number Badge */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <span className="text-xl leading-none mb-1">{rankIcon}</span>
                    <span className="min-w-[32px] px-2 h-7 rounded-lg bg-slate-950 text-amber-300 border border-amber-400/50 flex items-center justify-center font-mono text-xs font-black shadow-inner shadow-amber-500/20">
                      #{topScorer.dorsal}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-extrabold tracking-wider uppercase text-amber-400/90 block">
                      {rankTitle}
                    </span>
                    <h3 className="text-sm font-extrabold text-white truncate group-hover:text-amber-300 transition">
                      {topScorer.name}
                    </h3>
                    <div className="mt-1">
                      <TeamBadgeDot teamId={topScorer.teamId} teamName={topTeam?.name} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2 flex items-center justify-end">
                  <GoalBallBadge goals={topScorer.goles} size="lg" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scorers List Table */}
      {scorersList.length === 0 ? (
        <div className="p-8 text-center text-slate-400 space-y-2">
          <p className="text-sm font-semibold">No se encontraron jugadores con los filtros aplicados.</p>
          <p className="text-xs text-slate-500">Prueba cambiando la búsqueda o las opciones de filtrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-mono text-[11px] border-b border-slate-800">
                <th className="p-3 text-center font-black w-12">POS</th>
                <th className="p-3 font-black">JUGADOR</th>
                <th className="p-3 text-center font-black">EQUIPO</th>
                <th className="p-3 text-center font-bold" title="Tarjetas acumuladas">DISCIPLINA</th>
                <th className="p-3 text-center font-black text-amber-400 text-sm bg-amber-500/10">GOLES ⚽</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {scorersList.map((scorer, idx) => {
                const team = teams.find((t) => t.id === scorer.teamId);

                return (
                  <tr
                    key={scorer.playerId}
                    onClick={() => onSelectPlayer(scorer.playerId)}
                    className="hover:bg-slate-800/60 transition cursor-pointer group"
                  >
                    <td className="p-3 text-center font-mono font-black">
                      {sortBy === 'GOLES' && idx === 0 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 inline-flex items-center justify-center text-xs font-black shadow-md">
                          🥇
                        </span>
                      ) : sortBy === 'GOLES' && idx === 1 ? (
                        <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 inline-flex items-center justify-center text-xs font-black shadow-md">
                          🥈
                        </span>
                      ) : sortBy === 'GOLES' && idx === 2 ? (
                        <span className="w-6 h-6 rounded-full bg-amber-700 text-amber-100 inline-flex items-center justify-center text-xs font-black shadow-md">
                          🥉
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">{idx + 1}</span>
                      )}
                    </td>

                    <td className="p-3 font-bold">
                      <div className="flex items-center gap-2.5">
                        {/* Internal Dorsal Number Badge Card */}
                        <span className="min-w-[28px] px-1.5 h-7 rounded-lg bg-slate-950/90 text-amber-300 border border-amber-500/40 flex items-center justify-center font-mono text-xs font-black shadow-inner shadow-amber-500/10 shrink-0">
                          #{scorer.dorsal}
                        </span>
                        <span className="text-slate-100 font-extrabold group-hover:text-amber-300 transition text-sm">
                          {scorer.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-center">
                      <TeamBadgeDot teamId={scorer.teamId} teamName={team?.name} size="sm" />
                    </td>

                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono">
                        {scorer.amarillas > 0 && (
                          <CardIconVector type="AMARILLA" count={scorer.amarillas} />
                        )}
                        {scorer.azules > 0 && (
                          <CardIconVector type="AZUL" count={scorer.azules} />
                        )}
                        {scorer.rojas > 0 && (
                          <CardIconVector type="ROJA" count={scorer.rojas} />
                        )}
                        {scorer.amarillas === 0 && scorer.azules === 0 && scorer.rojas === 0 && (
                          <span className="text-slate-600 text-xs font-bold">-</span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center">
                        <GoalBallBadge goals={scorer.goles} size="md" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
