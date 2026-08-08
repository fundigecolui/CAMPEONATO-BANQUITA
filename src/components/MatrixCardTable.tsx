import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, Edit3, X, Check, Eye, Lock } from 'lucide-react';
import { Player, Team, CardRecord, CardType, PlayerStats, TeamId } from '../types';
import { getFechaLabel } from '../utils/fechas';

interface MatrixCardTableProps {
  players: Player[];
  teams: Team[];
  cards: CardRecord[];
  playerStats: PlayerStats[];
  currentFecha: number;
  maxUnlockedFecha?: number;
  isEditMode: boolean;
  onAddCard: (playerId: number, fecha: number, type: CardType) => void;
  onRemoveCard: (cardId: string) => void;
  onSelectPlayer: (playerId: number) => void;
  onOpenAddPlayerModal: () => void;
}

export const MatrixCardTable: React.FC<MatrixCardTableProps> = ({
  players,
  teams,
  cards,
  playerStats,
  currentFecha,
  maxUnlockedFecha = 38,
  isEditMode,
  onAddCard,
  onRemoveCard,
  onSelectPlayer,
  onOpenAddPlayerModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');
  const [onlyCarded, setOnlyCarded] = useState(false);
  const [sortBy, setSortBy] = useState<'CARDS' | 'NAME' | 'DORSAL' | 'GOALS'>('CARDS');
  
  // Cell Popover State for editing cards on a specific date
  const [activeCell, setActiveCell] = useState<{ playerId: number; fecha: number } | null>(null);

  // Filter & Sort Players
  const filteredPlayers = players.filter((p) => {
    const stat = playerStats.find((s) => s.playerId === p.id);
    const isCarded = (stat?.totalCards || 0) > 0 || stat?.isCurrentlySuspended;
    if (onlyCarded && !isCarded) return false;

    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.dorsal.toString().includes(searchTerm);
    const matchesTeam = selectedTeam === 'ALL' || p.teamId === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const statA = playerStats.find((s) => s.playerId === a.id);
    const statB = playerStats.find((s) => s.playerId === b.id);

    if (sortBy === 'CARDS') {
      return (statB?.totalCards || 0) - (statA?.totalCards || 0);
    }
    if (sortBy === 'NAME') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'DORSAL') {
      return a.dorsal - b.dorsal;
    }
    if (sortBy === 'GOALS') {
      return (statB?.goles || 0) - (statA?.goles || 0);
    }
    return 0;
  });

  // Calculate totals per Fecha for footer
  const totalCardsPerFecha: Record<number, { amarillas: number; azules: number; rojas: number; total: number }> = {};
  for (let f = 1; f <= 38; f++) {
    totalCardsPerFecha[f] = { amarillas: 0, azules: 0, rojas: 0, total: 0 };
  }

  cards.forEach((c) => {
    if (totalCardsPerFecha[c.fecha]) {
      if (c.type === 'AMARILLA') totalCardsPerFecha[c.fecha].amarillas += 1;
      if (c.type === 'AZUL') totalCardsPerFecha[c.fecha].azules += 1;
      if (c.type === 'ROJA') totalCardsPerFecha[c.fecha].rojas += 1;
      totalCardsPerFecha[c.fecha].total += 1;
    }
  });

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col print:hidden">
      {/* Controls Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar jugador por nombre o número de camiseta..."
            className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters & Sorting */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Team Filter */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-slate-200">Todos los Equipos (8)</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                  Equipo {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Solo Amonestados Toggle */}
          <button
            onClick={() => setOnlyCarded(!onlyCarded)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              onlyCarded
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
            }`}
          >
            <span>🟨 Solo amonestados</span>
          </button>

          {/* Sorting */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400">Orden:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="CARDS" className="bg-slate-900">Más Tarjetas</option>
              <option value="NAME" className="bg-slate-900">Nombre (A-Z)</option>
              <option value="DORSAL" className="bg-slate-900">Número Camiseta</option>
              <option value="GOALS" className="bg-slate-900">Más Goles</option>
            </select>
          </div>

          {/* Add Player (Visible in Edit Mode) */}
          {isEditMode ? (
            <button
              onClick={onOpenAddPlayerModal}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Jugador</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Consulta Informativa
            </span>
          )}
        </div>
      </div>

      {/* Main Matrix Table Container with Sticky Columns & Scroll */}
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        <table className="w-full text-left border-collapse font-sans text-xs min-w-[1800px]">
          <thead>
            <tr className="bg-slate-950 text-slate-300 uppercase tracking-wider font-mono text-[11px] sticky top-0 z-20 shadow-md">
              <th className="p-2.5 font-extrabold sticky left-0 z-30 bg-slate-950 border-r border-b border-slate-800 min-w-[50px] text-center">
                #
              </th>
              <th className="p-2.5 font-extrabold sticky left-[50px] z-30 bg-slate-950 border-r border-b border-slate-800 min-w-[180px]">
                Jugador
              </th>
              <th className="p-2.5 font-extrabold sticky left-[230px] z-30 bg-slate-950 border-r border-b border-slate-800 min-w-[100px] text-center">
                Equipo
              </th>

              {/* Fechas 1 to 38 Header Columns */}
              {Array.from({ length: 38 }, (_, i) => i + 1).map((f) => {
                const isLocked = !isEditMode && f > maxUnlockedFecha;
                return (
                  <th
                    key={f}
                    className={`p-1 font-bold border-r border-b text-center min-w-[36px] transition-colors ${
                      f === currentFecha
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : isLocked
                        ? 'bg-slate-950/80 text-slate-600 border-slate-900 font-normal'
                        : f >= 36
                        ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title={isLocked ? `Fecha ${f} (Restringida por el Administrador)` : getFechaLabel(f)}
                  >
                    {isLocked ? '🔒' : `F${f}`}
                  </th>
                );
              })}

              {/* Totals Columns */}
              <th className="p-2 font-black border-r border-b border-slate-800 bg-yellow-950/60 text-yellow-300 text-center min-w-[42px]" title="Amarillas">
                🟨 A
              </th>
              <th className="p-2 font-black border-r border-b border-slate-800 bg-blue-950/60 text-blue-300 text-center min-w-[42px]" title="Azules">
                🟦 AZ
              </th>
              <th className="p-2 font-black border-r border-b border-slate-800 bg-red-950/60 text-red-300 text-center min-w-[42px]" title="Rojas">
                🟥 R
              </th>
              <th className="p-2 font-black border-r border-b border-slate-800 bg-slate-950 text-amber-400 text-center min-w-[50px]" title="Suspenso">
                SUS
              </th>
              <th className="p-2 font-black border-b border-slate-800 bg-slate-950 text-white text-center min-w-[48px]" title="Total Tarjetas">
                T
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 text-slate-200">
            {sortedPlayers.map((player) => {
              const stat = playerStats.find((s) => s.playerId === player.id);
              const team = teams.find((t) => t.id === player.teamId);
              const playerCards = cards.filter((c) => c.playerId === player.id);

              return (
                <tr
                  key={player.id}
                  className="hover:bg-slate-800/60 transition group font-sans text-xs"
                >
                  {/* Dorsal */}
                  <td className="p-2 font-black text-center sticky left-0 z-10 bg-slate-900 group-hover:bg-slate-800 border-r border-slate-800 text-slate-300 min-w-[50px]">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">
                      {player.dorsal}
                    </span>
                  </td>

                  {/* Player Name */}
                  <td className="p-2 font-bold sticky left-[50px] z-10 bg-slate-900 group-hover:bg-slate-800 border-r border-slate-800 truncate min-w-[180px]">
                    <div className="flex items-center justify-between gap-1">
                      <button
                        onClick={() => onSelectPlayer(player.id)}
                        className="text-left font-bold hover:text-amber-300 transition truncate text-slate-100 flex items-center gap-1.5"
                      >
                        <Eye className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition shrink-0" />
                        <span className="truncate">{player.name}</span>
                      </button>

                      {stat?.goles ? (
                        <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/20 shrink-0">
                          ⚽ {stat.goles}
                        </span>
                      ) : null}
                    </div>
                  </td>

                  {/* Team Badge */}
                  <td className="p-2 text-center sticky left-[230px] z-10 bg-slate-900 group-hover:bg-slate-800 border-r border-slate-800 min-w-[100px]">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-black text-[10px] uppercase shadow-xs tracking-wider border ${
                        team?.badgeBg || 'bg-slate-800'
                      } ${team?.badgeText || 'text-white'} ${team?.badgeBorder || 'border-slate-700'}`}
                    >
                      {player.teamId}
                    </span>
                  </td>

                  {/* Cells for Fechas 1 to 38 */}
                  {Array.from({ length: 38 }, (_, i) => i + 1).map((f) => {
                    const fechaCards = playerCards.filter((c) => c.fecha === f);
                    const isCurrent = f === currentFecha;
                    const isCellActive = activeCell?.playerId === player.id && activeCell?.fecha === f;

                    // Check if player had suspension alert on this date
                    const isSuspendedOnFecha = stat?.suspendedForFecha === f || false;

                    return (
                      <td
                        key={f}
                        onClick={() => {
                          if (isEditMode) {
                            setActiveCell(isCellActive ? null : { playerId: player.id, fecha: f });
                          } else {
                            onSelectPlayer(player.id);
                          }
                        }}
                        className={`p-1 border-r border-slate-800 text-center relative cursor-pointer min-w-[36px] transition hover:bg-slate-700/60 ${
                          isCurrent ? 'bg-amber-500/5 ring-1 ring-amber-500/20' : ''
                        }`}
                      >
                        {/* Render card symbols inside cell */}
                        <div className="flex flex-col items-center justify-center gap-0.5 min-h-[26px]">
                          {fechaCards.map((c) => (
                            <span
                              key={c.id}
                              title={`${c.type} - Fecha ${f}`}
                              className={`w-4 h-5 rounded-xs flex items-center justify-center text-[9px] font-black shadow-xs ${
                                c.type === 'AMARILLA'
                                  ? 'bg-yellow-400 text-slate-950 ring-1 ring-yellow-300'
                                  : c.type === 'AZUL'
                                  ? 'bg-blue-600 text-white ring-1 ring-blue-400'
                                  : 'bg-red-600 text-white ring-1 ring-red-400 animate-pulse'
                              }`}
                            >
                              {c.type === 'AMARILLA' ? 'A' : c.type === 'AZUL' ? 'AZ' : 'R'}
                            </span>
                          ))}

                          {/* Suspension Alert Indicator badge on that fecha */}
                          {isSuspendedOnFecha && fechaCards.length === 0 && (
                            <span
                              className="px-1 py-0.2 rounded bg-red-600 text-white font-black text-[9px] shadow-xs ring-1 ring-red-400 animate-bounce"
                              title={`SUSPENDIDO en Fecha ${f}`}
                            >
                              SUS
                            </span>
                          )}
                        </div>

                        {/* Interactive Cell Popover / Card Adder (Only in Edit Mode) */}
                        {isEditMode && isCellActive && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-50 bg-slate-900 border-2 border-amber-400 rounded-xl p-2.5 shadow-2xl w-48 text-left text-xs"
                          >
                            <div className="flex items-center justify-between gap-1 mb-2 pb-1 border-b border-slate-800">
                              <span className="font-bold text-amber-300 text-[11px] truncate">
                                F{f} - {player.name}
                              </span>
                              <button
                                onClick={() => setActiveCell(null)}
                                className="text-slate-400 hover:text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Existing Cards on this date */}
                            {fechaCards.length > 0 && (
                              <div className="mb-2 space-y-1">
                                <p className="text-[10px] text-slate-400 font-mono">Tarjetas registradas:</p>
                                {fechaCards.map((c) => (
                                  <div
                                    key={c.id}
                                    className="flex items-center justify-between bg-slate-800 px-2 py-1 rounded text-[11px]"
                                  >
                                    <span className="font-bold flex items-center gap-1">
                                      <span
                                        className={`w-2.5 h-3 rounded-xs inline-block ${
                                          c.type === 'AMARILLA'
                                            ? 'bg-yellow-400'
                                            : c.type === 'AZUL'
                                            ? 'bg-blue-500'
                                            : 'bg-red-600'
                                        }`}
                                      ></span>
                                      {c.type}
                                    </span>
                                    <button
                                      onClick={() => onRemoveCard(c.id)}
                                      className="text-red-400 hover:text-red-300 p-0.5"
                                      title="Borrar tarjeta"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            <p className="text-[10px] text-slate-400 mb-1.5 font-semibold">
                              + Agregar Tarjeta en F{f}:
                            </p>
                            <div className="grid grid-cols-3 gap-1">
                              <button
                                onClick={() => {
                                  onAddCard(player.id, f, 'AMARILLA');
                                  setActiveCell(null);
                                }}
                                className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold py-1 rounded text-[10px] shadow-xs flex items-center justify-center gap-0.5"
                              >
                                🟨 Amarilla
                              </button>

                              <button
                                onClick={() => {
                                  onAddCard(player.id, f, 'AZUL');
                                  setActiveCell(null);
                                }}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-1 rounded text-[10px] shadow-xs flex items-center justify-center gap-0.5"
                              >
                                🟦 Azul
                              </button>

                              <button
                                onClick={() => {
                                  onAddCard(player.id, f, 'ROJA');
                                  setActiveCell(null);
                                }}
                                className="bg-red-600 hover:bg-red-500 text-white font-extrabold py-1 rounded text-[10px] shadow-xs flex items-center justify-center gap-0.5"
                              >
                                🟥 Roja
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}

                  {/* Summary Totals Columns */}
                  <td className="p-2 text-center font-mono font-bold bg-yellow-950/20 text-yellow-300 border-r border-slate-800">
                    {stat?.amarillas ? stat.amarillas : ''}
                  </td>
                  <td className="p-2 text-center font-mono font-bold bg-blue-950/20 text-blue-300 border-r border-slate-800">
                    {stat?.azules ? stat.azules : ''}
                  </td>
                  <td className="p-2 text-center font-mono font-bold bg-red-950/20 text-red-300 border-r border-slate-800">
                    {stat?.rojas ? stat.rojas : ''}
                  </td>
                  <td className="p-2 text-center border-r border-slate-800">
                    {stat?.isCurrentlySuspended ? (
                      <span
                        className="px-1.5 py-0.5 rounded bg-red-600 text-white font-black text-[10px] shadow-xs"
                        title={stat.suspensionReason}
                      >
                        SUS
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px]"></span>
                    )}
                  </td>
                  <td className="p-2 text-center font-mono font-black text-amber-400 bg-slate-950">
                    {stat?.totalCards ? stat.totalCards : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Bottom Table Totals Footer */}
          <tfoot>
            <tr className="bg-slate-950 text-slate-200 font-mono text-xs font-black border-t-2 border-slate-700 sticky bottom-0 z-20 shadow-lg">
              <td colSpan={3} className="p-2.5 text-right uppercase tracking-wider sticky left-0 bg-slate-950 z-30 border-r border-slate-800">
                Total Tarjetas x Fecha:
              </td>

              {Array.from({ length: 38 }, (_, i) => i + 1).map((f) => (
                <td key={f} className="p-1 text-center border-r border-slate-800">
                  <span className="text-amber-400 text-[11px]">
                    {totalCardsPerFecha[f]?.total ? totalCardsPerFecha[f].total : ''}
                  </span>
                </td>
              ))}

              <td className="p-2 text-center text-yellow-300 bg-yellow-950/50 border-r border-slate-800">
                {cards.filter((c) => c.type === 'AMARILLA').length || ''}
              </td>
              <td className="p-2 text-center text-blue-300 bg-blue-950/50 border-r border-slate-800">
                {cards.filter((c) => c.type === 'AZUL').length || ''}
              </td>
              <td className="p-2 text-center text-red-400 bg-red-950/50 border-r border-slate-800">
                {cards.filter((c) => c.type === 'ROJA').length || ''}
              </td>
              <td className="p-2 text-center text-red-400 border-r border-slate-800">
                
              </td>
              <td className="p-2 text-center text-amber-300 bg-slate-950 text-sm font-extrabold">
                {cards.length || ''}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

