import React, { useState } from 'react';
import { Calendar, Plus, Trophy, AlertTriangle, Check, Trash2, Clock, Shield, Lock, Edit3, Printer, AlertOctagon, FileText } from 'lucide-react';
import { Match, Player, Team, CardType, CardRecord, GoalRecord, SuspensionAlert, TeamId } from '../types';
import { getFechaFullTitle, FECHA_DATES } from '../utils/fechas';
import { computeStandings, checkMathematicalElimination, groupGoalsByPlayer } from '../utils/sanctionsEngine';
import { OfficialPrintSheetModal } from './OfficialPrintSheetModal';

export const MATCH_SCHEDULES = [
  { slot: 1, range: '7:00 p.m. - 7:50 p.m.' },
  { slot: 2, range: '7:55 p.m. - 8:45 p.m.' },
  { slot: 3, range: '8:50 p.m. - 9:40 p.m.' },
  { slot: 4, range: '9:45 p.m. - 10:30 p.m.' },
];

interface FechaMatchLoggerProps {
  currentFecha: number;
  setCurrentFecha: (f: number) => void;
  maxUnlockedFecha: number;
  setMaxUnlockedFecha: (f: number) => void;
  matches: Match[];
  players: Player[];
  teams: Team[];
  cards: CardRecord[];
  goals: GoalRecord[];
  activeSuspensions: SuspensionAlert[];
  isEditMode: boolean;
  onUpdateMatchScore: (matchId: string, homeGoals: number, awayGoals: number) => void;
  onUpdateMatchStatus?: (matchId: string, status: 'PROGRAMADO' | 'EN_VIVO' | 'FINALIZADO') => void;
  onToggleAttendance?: (matchId: string, playerId: number, teamSide: 'home' | 'away') => void;
  onSetAllAttendance?: (matchId: string, teamSide: 'home' | 'away', selectAll: boolean) => void;
  onAddCard: (playerId: number, fecha: number, type: CardType) => void;
  onAddGoal: (playerId: number, fecha: number, teamId: TeamId) => void;
  onRemoveCard: (cardId: string) => void;
  onRemoveGoal: (goalId: string) => void;
}

export const FechaMatchLogger: React.FC<FechaMatchLoggerProps> = ({
  currentFecha,
  setCurrentFecha,
  maxUnlockedFecha,
  setMaxUnlockedFecha,
  matches,
  players,
  teams,
  cards,
  goals,
  activeSuspensions,
  isEditMode,
  onUpdateMatchScore,
  onUpdateMatchStatus,
  onToggleAttendance,
  onSetAllAttendance,
  onAddCard,
  onAddGoal,
  onRemoveCard,
  onRemoveGoal,
}) => {
  const currentMatches = matches.filter((m) => m.fecha === currentFecha);

  // Compute standings & mathematical elimination check
  const standings = computeStandings(teams, matches, cards, players);
  const eliminationInfo = checkMathematicalElimination(standings, matches);

  // Selected player for quick event registration per match
  const [selectedPlayerPerMatch, setSelectedPlayerPerMatch] = useState<Record<string, number>>({});
  const [isPrintSheetOpen, setIsPrintSheetOpen] = useState(false);
  const [openAttendanceMatchId, setOpenAttendanceMatchId] = useState<string | null>(null);

  const handlePrintPlanilla = () => {
    setIsPrintSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6 print:hidden">
        {/* Header bar with Fecha selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-extrabold text-white font-mono uppercase">
                {getFechaFullTitle(currentFecha)}
              </h2>
              {currentFecha >= 36 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-600 text-white animate-pulse">
                  PLAYOFFS
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Sincronización de Hora Activa</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isEditMode
                ? 'Modo Edición Habilitado: Modifique marcadores y registre goles o tarjetas.'
                : 'Modo Lectura Informativo: Consulte los marcadores e incidencias de esta jornada.'}
            </p>
          </div>
        </div>

        {/* Quick Fecha Selector Dropdown, Print & Pager */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrintPlanilla}
            title="Imprimir Resumen de la Fecha (Muestra los marcadores e incidencias de la pantalla principal)"
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 border border-amber-400 cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Resumen Fecha</span>
          </button>

          <button
            onClick={() => setCurrentFecha(Math.max(1, currentFecha - 1))}
            disabled={currentFecha === 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 transition"
          >
            ← Anterior
          </button>

          <button
            onClick={() => {
              if (!isEditMode && currentFecha >= maxUnlockedFecha) {
                alert(`🔒 La Fecha ${currentFecha + 1} está restringida por la Junta Directiva. Actualmente están habilitadas únicamente las Fechas 1 a la ${maxUnlockedFecha}.`);
                return;
              }
              setCurrentFecha(Math.min(38, currentFecha + 1));
            }}
            disabled={currentFecha === 38 || (!isEditMode && currentFecha >= maxUnlockedFecha)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 transition"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Restricted Fecha Banner for Non-Admin Users */}
      {!isEditMode && currentFecha > maxUnlockedFecha ? (
        <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-white font-mono uppercase tracking-wide">
            FECHA {currentFecha} RESTRINGIDA POR LA JUNTA DIRECTIVA
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Las fechas desde la <strong className="text-amber-300">Fecha {maxUnlockedFecha + 1} en adelante</strong> están restringidas para los usuarios hasta que el administrador cargue los siguientes partidos.
          </p>
          <p className="text-xs text-slate-400">
            Actualmente se encuentran disponibles únicamente las <strong>Fechas 1 a la {maxUnlockedFecha} (Vuelta 1)</strong>.
          </p>
          <button
            onClick={() => setCurrentFecha(maxUnlockedFecha)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg cursor-pointer"
          >
            Ir a Fecha {maxUnlockedFecha} Habilitada
          </button>
        </div>
      ) : (
        <>
          {/* Special Banner for Playoffs (Fechas 36, 37, 38) */}
          {currentFecha === 36 && (
            <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border-2 border-purple-500/50 rounded-2xl p-4 text-purple-100 space-y-1 shadow-xl">
              <div className="flex items-center gap-2 font-mono font-black text-sm text-purple-300">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>ESTRUCTURA DE LA FASE ELIMINATORIA (FECHA 36)</span>
              </div>
              <p className="text-xs text-slate-300">
                Se juegan <strong>3 partidos directos</strong> entre los clasificados de la fase regular:
                <span className="text-amber-300 font-bold ml-1">Partido 1: 2° Puesto vs 7° Puesto</span> |
                <span className="text-amber-300 font-bold ml-1">Partido 2: 3° Puesto vs 6° Puesto</span> |
                <span className="text-amber-300 font-bold ml-1">Partido 3: 4° Puesto vs 5° Puesto</span>.
                El 1° Puesto clasifica directamente a Semifinales.
              </p>
            </div>
          )}

          {currentFecha === 37 && (
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500/50 rounded-2xl p-4 text-amber-100 space-y-1 shadow-xl">
              <div className="flex items-center gap-2 font-mono font-black text-sm text-amber-300">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>FASE SEMIFINAL (FECHA 37)</span>
              </div>
              <p className="text-xs text-slate-300">
                Los mejores 4 equipos se enfrentan en 2 llaves por el cupo a la Gran Final del Campeonato San Simón.
              </p>
            </div>
          )}

          {currentFecha === 38 && (
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/50 rounded-2xl p-4 text-emerald-100 space-y-1 shadow-xl">
              <div className="flex items-center gap-2 font-mono font-black text-sm text-emerald-300">
                <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
                <span>GRAN FINAL DEL CAMPEONATO (FECHA 38)</span>
              </div>
              <p className="text-xs text-slate-300">
                Partido definitivo por el título de Campeón Banquitas San Simón.
              </p>
            </div>
          )}

          {/* Grid of Matches for this Fecha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {currentMatches.map((match, matchIdx) => {
          const homeTeam = teams.find((t) => t.id === match.homeTeamId);
          const awayTeam = teams.find((t) => t.id === match.awayTeamId);

          const homePlayers = players.filter((p) => p.teamId === match.homeTeamId);
          const awayPlayers = players.filter((p) => p.teamId === match.awayTeamId);
          const allMatchPlayers = [...homePlayers, ...awayPlayers];

          // Cards logged in this match date for these teams
          const matchCards = cards.filter(
            (c) => c.fecha === currentFecha && allMatchPlayers.some((p) => p.id === c.playerId)
          );

          // Goals logged in this match date for these teams
          const matchGoals = goals.filter(
            (g) => g.fecha === currentFecha && allMatchPlayers.some((p) => p.id === g.playerId)
          );

          const selectedPlayerId = selectedPlayerPerMatch[match.id] || allMatchPlayers[0]?.id;
          const selectedPlayer = players.find((p) => p.id === selectedPlayerId);

          // Check if selected player is suspended
          const isSelectedSuspended = activeSuspensions.some((s) => s.playerId === selectedPlayerId);

          // Check if match involves mathematically eliminated team in regular season
          const isMatchCancelledByElimination =
            eliminationInfo.isEliminated &&
            currentFecha <= 35 &&
            !match.isPlayed &&
            (match.homeTeamId === eliminationInfo.eliminatedTeamId || match.awayTeamId === eliminationInfo.eliminatedTeamId);

          const schedule = MATCH_SCHEDULES[matchIdx % 4];
          const isLive = match.status === 'EN_VIVO';
          const isMatchPlayedOrLive =
            match.status === 'FINALIZADO' ||
            isLive ||
            Boolean(match.isPlayed && match.status !== 'PROGRAMADO') ||
            matchGoals.length > 0 ||
            matchCards.length > 0;

          // Special Match Subtitles for Playoff Fechas
          let matchSubtitle = `Partido #${match.id}`;
          if (currentFecha === 36) {
            if (matchIdx === 0) matchSubtitle = 'Eliminatoria 1: 2° Puesto vs 7° Puesto';
            if (matchIdx === 1) matchSubtitle = 'Eliminatoria 2: 3° Puesto vs 6° Puesto';
            if (matchIdx === 2) matchSubtitle = 'Eliminatoria 3: 4° Puesto vs 5° Puesto';
          } else if (currentFecha === 37) {
            matchSubtitle = `Llave Semifinal ${matchIdx + 1}`;
          } else if (currentFecha === 38) {
            if (matchIdx === 0) {
              matchSubtitle = '🥉 PARTIDO POR EL TERCER PUESTO';
            } else if (matchIdx === 1) {
              matchSubtitle = '🏆 GRAN FINAL POR EL TÍTULO';
            } else {
              matchSubtitle = '🏆 DEFINICIÓN DE POSICIONES';
            }
          }

          return (
            <div
              key={match.id}
              className={`bg-slate-900 rounded-2xl border transition-all overflow-hidden shadow-xl flex flex-col justify-between ${
                isMatchCancelledByElimination
                  ? 'border-red-900/60 bg-slate-950/90 opacity-90'
                  : isLive
                  ? 'border-red-500/80 ring-2 ring-red-500/20 shadow-red-950/40'
                  : 'border-slate-800'
              }`}
            >
              {/* Match Score Banner */}
              <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
                {isMatchCancelledByElimination && (
                  <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-red-950/90 border border-red-500/80 p-2.5 rounded-xl text-[11px] font-mono text-red-200 flex items-center gap-2 mb-3 shadow-md">
                    <AlertOctagon className="w-4.5 h-4.5 text-red-400 shrink-0 animate-pulse" />
                    <span>
                      <strong className="text-red-300 font-bold uppercase">Partido Cancelado por Reglamento:</strong> El equipo <strong className="text-amber-300">{eliminationInfo.eliminatedTeamName}</strong> está matemáticamente eliminado (imposible alcanzar al 7°) y no disputará esta fecha.
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 mb-3 font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-amber-400 text-sm tracking-wide">{matchSubtitle}</span>
                    <div className="flex flex-col gap-0.5 text-xs text-slate-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Horario: {schedule.range}</span>
                      </div>
                      {(match.dateStr || FECHA_DATES[currentFecha]) && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Fecha: {match.dateStr || FECHA_DATES[currentFecha]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {isMatchCancelledByElimination ? (
                      <span className="px-3 py-1 rounded-lg bg-red-950/90 border border-red-500/80 text-red-300 font-bold text-xs font-mono">
                        🚫 CANCELADO (ELIMINADO)
                      </span>
                    ) : isLive ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/90 border border-red-500/80 text-red-400 font-extrabold text-xs font-mono shadow-md">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span>EN VIVO</span>
                      </div>
                    ) : match.status === 'FINALIZADO' || (match.isPlayed && match.status !== 'PROGRAMADO') ? (
                      <span className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/80 text-emerald-400 font-bold text-xs font-mono">
                        FINALIZADO
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs font-mono">
                        PROGRAMADO
                      </span>
                    )}

                    {isEditMode && onUpdateMatchStatus && !isMatchCancelledByElimination && (
                      <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">

                        <button
                          onClick={() => onUpdateMatchStatus(match.id, 'EN_VIVO')}
                          title="Marcar como Partido En Vivo"
                          className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                            isLive
                              ? 'bg-red-600 text-white'
                              : 'text-slate-400 hover:text-red-400'
                          }`}
                        >
                          ● VIVO
                        </button>
                        <button
                          onClick={() => onUpdateMatchStatus(match.id, 'FINALIZADO')}
                          title="Marcar como Finalizado"
                          className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                            match.status === 'FINALIZADO' || (match.isPlayed && !isLive)
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-400 hover:text-emerald-400'
                          }`}
                        >
                          ✓ FIN
                        </button>
                        <button
                          onClick={() => onUpdateMatchStatus(match.id, 'PROGRAMADO')}
                          title="Marcar como Programado"
                          className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                            match.status === 'PROGRAMADO'
                              ? 'bg-amber-600 text-slate-950'
                              : 'text-slate-400 hover:text-amber-400'
                          }`}
                        >
                          ⏳ PROG
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-7 items-center text-center gap-2 my-3">
                  {/* Home Team */}
                  <div className="col-span-3 flex flex-col items-center justify-center">
                    <span
                      className={`px-5 py-1.5 rounded-2xl font-black text-xs sm:text-sm uppercase border shadow-md ${
                        homeTeam?.badgeBg || 'bg-slate-800'
                      } ${homeTeam?.badgeText || 'text-white'} ${homeTeam?.badgeBorder || 'border-slate-700'}`}
                    >
                      {homeTeam?.name || match.homeTeamId}
                    </span>
                  </div>

                  {/* Score Box */}
                  <div className="col-span-1 flex items-center justify-center font-mono font-black text-xl text-white">
                    {isEditMode ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          value={match.homeGoals}
                          onChange={(e) =>
                            onUpdateMatchScore(match.id, Math.max(0, parseInt(e.target.value) || 0), match.awayGoals)
                          }
                          className="w-10 h-10 text-center bg-slate-800 border border-slate-700 rounded-lg text-amber-300 focus:outline-none focus:border-amber-400 font-black text-lg"
                        />
                        <span className="text-slate-500">-</span>
                        <input
                          type="number"
                          min={0}
                          value={match.awayGoals}
                          onChange={(e) =>
                            onUpdateMatchScore(match.id, match.homeGoals, Math.max(0, parseInt(e.target.value) || 0))
                          }
                          className="w-10 h-10 text-center bg-slate-800 border border-slate-700 rounded-lg text-amber-300 focus:outline-none focus:border-amber-400 font-black text-lg"
                        />
                      </div>
                    ) : (
                      <div className="px-5 py-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-amber-400 font-black font-mono text-xl sm:text-2xl shadow-inner tracking-widest flex items-center gap-2">
                        <span>{match.homeGoals}</span>
                        <span className="text-slate-500 font-normal">-</span>
                        <span>{match.awayGoals}</span>
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="col-span-3 flex flex-col items-center justify-center">
                    <span
                      className={`px-5 py-1.5 rounded-2xl font-black text-xs sm:text-sm uppercase border shadow-md ${
                        awayTeam?.badgeBg || 'bg-slate-800'
                      } ${awayTeam?.badgeText || 'text-white'} ${awayTeam?.badgeBorder || 'border-slate-700'}`}
                    >
                      {awayTeam?.name || match.awayTeamId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Recorder Panel (Only in Edit Mode) */}
              {isEditMode ? (
                <div className="p-4 space-y-3 bg-slate-900/60 border-b border-slate-800">
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    Registrar Incidencia / Evento en Vivo:
                  </p>

                  {/* Player Selector for Match */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-medium">Seleccionar Jugador del Partido:</label>
                    <select
                      value={selectedPlayerId || ''}
                      onChange={(e) =>
                        setSelectedPlayerPerMatch({
                          ...selectedPlayerPerMatch,
                          [match.id]: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-800 text-slate-100 font-semibold text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                    >
                      <optgroup label={`Equipo ${homeTeam?.name}`}>
                        {homePlayers.map((p) => {
                          const isSuspended = activeSuspensions.some((s) => s.playerId === p.id);
                          return (
                            <option key={p.id} value={p.id}>
                              {p.dorsal} {p.name} {isSuspended ? '⚠️ [SUSPENDIDO FECHA ' + currentFecha + ']' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                      <optgroup label={`Equipo ${awayTeam?.name}`}>
                        {awayPlayers.map((p) => {
                          const isSuspended = activeSuspensions.some((s) => s.playerId === p.id);
                          return (
                            <option key={p.id} value={p.id}>
                              {p.dorsal} {p.name} {isSuspended ? '⚠️ [SUSPENDIDO FECHA ' + currentFecha + ']' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                    </select>
                  </div>

                  {/* Suspension Warning Box if referee selects a suspended player */}
                  {isSelectedSuspended && selectedPlayer && (
                    <div className="bg-red-950/80 border border-red-500 rounded-xl p-2.5 flex items-start gap-2 text-xs text-red-200 animate-pulse">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold uppercase text-red-300 block">
                          ¡ALERTA DE SUSPENSIÓN!
                        </span>
                        {selectedPlayer.name} (<b>{selectedPlayer.dorsal}</b>) está suspendido para la Fecha {currentFecha}. No debe disputar este partido.
                      </div>
                    </div>
                  )}

                  {/* Event Action Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        if (selectedPlayer) {
                          onAddGoal(selectedPlayer.id, currentFecha, selectedPlayer.teamId);
                        }
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 px-1 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>⚽</span> Gol
                    </button>

                    <button
                      onClick={() => {
                        if (selectedPlayer) {
                          onAddCard(selectedPlayer.id, currentFecha, 'AMARILLA');
                        }
                      }}
                      className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold py-2 px-1 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>🟨</span> Amarilla
                    </button>

                    <button
                      onClick={() => {
                        if (selectedPlayer) {
                          onAddCard(selectedPlayer.id, currentFecha, 'AZUL');
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2 px-1 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>🟦</span> Azul
                    </button>

                    <button
                      onClick={() => {
                        if (selectedPlayer) {
                          onAddCard(selectedPlayer.id, currentFecha, 'ROJA');
                        }
                      }}
                      className="bg-red-600 hover:bg-red-500 text-white font-extrabold py-2 px-1 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>🟥</span> Roja
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Attendance & Lineup Checklist Bar */}
              {(isMatchPlayedOrLive || isEditMode) && (() => {
                const homeAttending = match.attendance?.homePlayerIds ?? homePlayers.map((p) => p.id);
                const awayAttending = match.attendance?.awayPlayerIds ?? awayPlayers.map((p) => p.id);
                const isAttendanceOpen = openAttendanceMatchId === match.id;

                return (
                  <div className="bg-slate-950/80 border-t border-slate-800">
                    <button
                      onClick={() => setOpenAttendanceMatchId(isAttendanceOpen ? null : match.id)}
                      className="w-full px-4 py-2 flex items-center justify-between text-xs font-mono font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2 flex-wrap">
                        <span>📋</span>
                        <span>Control de Asistencia:</span>
                        <span className="text-emerald-400">{homeTeam?.name}: {homeAttending.length}/{homePlayers.length}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-emerald-400">{awayTeam?.name}: {awayAttending.length}/{awayPlayers.length}</span>
                      </span>
                      <span className="text-amber-400 text-[11px] underline shrink-0">
                        {isAttendanceOpen ? 'Ocultar Lista ▲' : 'Ver / Marcar Asistentes ▼'}
                      </span>
                    </button>

                    {isAttendanceOpen && (
                      <div className="p-3 bg-slate-900/90 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        {/* Home Team Attendance */}
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                            <span className="font-extrabold text-amber-400 uppercase text-[11px]">
                              {homeTeam?.name} ({homeAttending.length} Presentes)
                            </span>
                            {isEditMode && onSetAllAttendance && (
                              <div className="flex gap-1.5 text-[10px]">
                                <button
                                  onClick={() => onSetAllAttendance(match.id, 'home', true)}
                                  className="text-emerald-400 hover:underline font-bold cursor-pointer"
                                >
                                  Todos
                                </button>
                                <span className="text-slate-600">|</span>
                                <button
                                  onClick={() => onSetAllAttendance(match.id, 'home', false)}
                                  className="text-red-400 hover:underline font-bold cursor-pointer"
                                >
                                  Ninguno
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                            {homePlayers.map((p) => {
                              const isChecked = homeAttending.includes(p.id);
                              return (
                                <label
                                  key={p.id}
                                  className={`flex items-center justify-between p-1.5 rounded text-[11px] border cursor-pointer transition ${
                                    isChecked
                                      ? 'bg-emerald-950/40 border-emerald-800/60 text-slate-100 font-bold'
                                      : 'bg-slate-900 border-slate-800 text-slate-500 line-through'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      disabled={!isEditMode}
                                      checked={isChecked}
                                      onChange={() => onToggleAttendance && onToggleAttendance(match.id, p.id, 'home')}
                                      className="rounded text-emerald-500 focus:ring-emerald-400 bg-slate-950 border-slate-700"
                                    />
                                    <span>#{p.dorsal} {p.name}</span>
                                  </span>
                                  <span className="text-[10px] uppercase font-mono">
                                    {isChecked ? '✅ Asiste' : '❌ Ausente'}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Away Team Attendance */}
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                            <span className="font-extrabold text-amber-400 uppercase text-[11px]">
                              {awayTeam?.name} ({awayAttending.length} Presentes)
                            </span>
                            {isEditMode && onSetAllAttendance && (
                              <div className="flex gap-1.5 text-[10px]">
                                <button
                                  onClick={() => onSetAllAttendance(match.id, 'away', true)}
                                  className="text-emerald-400 hover:underline font-bold cursor-pointer"
                                >
                                  Todos
                                </button>
                                <span className="text-slate-600">|</span>
                                <button
                                  onClick={() => onSetAllAttendance(match.id, 'away', false)}
                                  className="text-red-400 hover:underline font-bold cursor-pointer"
                                >
                                  Ninguno
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                            {awayPlayers.map((p) => {
                              const isChecked = awayAttending.includes(p.id);
                              return (
                                <label
                                  key={p.id}
                                  className={`flex items-center justify-between p-1.5 rounded text-[11px] border cursor-pointer transition ${
                                    isChecked
                                      ? 'bg-emerald-950/40 border-emerald-800/60 text-slate-100 font-bold'
                                      : 'bg-slate-900 border-slate-800 text-slate-500 line-through'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      disabled={!isEditMode}
                                      checked={isChecked}
                                      onChange={() => onToggleAttendance && onToggleAttendance(match.id, p.id, 'away')}
                                      className="rounded text-emerald-500 focus:ring-emerald-400 bg-slate-950 border-slate-700"
                                    />
                                    <span>#{p.dorsal} {p.name}</span>
                                  </span>
                                  <span className="text-[10px] uppercase font-mono">
                                    {isChecked ? '✅ Asiste' : '❌ Ausente'}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Match Event Timeline Log Divided by Teams (Local vs Visitor) */}
              {(isMatchPlayedOrLive || isEditMode) && (() => {
                const homeAttending = match.attendance?.homePlayerIds ?? homePlayers.map((p) => p.id);
                const awayAttending = match.attendance?.awayPlayerIds ?? awayPlayers.map((p) => p.id);

                const homeAbsent = homePlayers.filter((p) => !homeAttending.includes(p.id));
                const awayAbsent = awayPlayers.filter((p) => !awayAttending.includes(p.id));

                const homeGoals = matchGoals.filter((g) => homePlayers.some((p) => p.id === g.playerId));
                const homeCards = matchCards.filter((c) => homePlayers.some((p) => p.id === c.playerId));
                const homeSuspensions = activeSuspensions.filter((s) => s.teamId === match.homeTeamId);

                const awayGoals = matchGoals.filter((g) => awayPlayers.some((p) => p.id === g.playerId));
                const awayCards = matchCards.filter((c) => awayPlayers.some((p) => p.id === c.playerId));
                const awaySuspensions = activeSuspensions.filter((s) => s.teamId === match.awayTeamId);

                return (
                  <div className="p-3 bg-slate-950 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    {/* Home Team Column */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 space-y-2">
                      <div className="border-b border-slate-800 pb-1.5 flex items-center justify-between">
                        <span className="font-extrabold text-amber-400 uppercase tracking-wide text-[11px]">
                          {homeTeam?.name || match.homeTeamId}
                        </span>
                        {homeAbsent.length > 0 && (
                          <span className="text-[10px] text-red-400 font-bold bg-red-950 px-1.5 py-0.5 rounded border border-red-900">
                            {homeAbsent.length} Ausente{homeAbsent.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        {/* Suspensions if any */}
                        {homeSuspensions.map((s) => (
                          <div
                            key={s.playerId}
                            className="p-1 rounded bg-red-950/80 border border-red-800 text-red-300 font-bold text-[10px]"
                          >
                            ⛔ SUSPENDIDO: #{s.dorsal} {s.playerName} ({s.reason})
                          </div>
                        ))}

                        {/* Goals */}
                        {groupGoalsByPlayer(homeGoals, players).map(({ playerId, player: p, count, goalIds }) => (
                          <div
                            key={goalIds[0]}
                            className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
                          >
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className="text-amber-400 text-xs tracking-tight font-black">{Array(count).fill('⚽').join('')}</span>
                              <span>{p?.dorsal} {p?.name}</span>
                            </span>
                            {isEditMode && (
                              <button
                                onClick={() => onRemoveGoal(goalIds[goalIds.length - 1])}
                                className="text-slate-500 hover:text-red-400 transition ml-1 shrink-0 text-[10px] bg-slate-900 px-1 py-0.5 rounded border border-slate-700 hover:border-red-600"
                                title="Quitar un gol"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Cards */}
                        {homeCards.map((c) => {
                          const p = players.find((pl) => pl.id === c.playerId);
                          return (
                            <div
                              key={c.id}
                              className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
                            >
                              <span className="flex items-center gap-1.5 font-bold">
                                <span
                                  className={`w-3 h-4 rounded-[1px] inline-block shrink-0 ${
                                    c.type === 'AMARILLA'
                                      ? 'bg-yellow-400'
                                      : c.type === 'AZUL'
                                      ? 'bg-blue-600'
                                      : 'bg-red-600'
                                  }`}
                                  title={`Tarjeta ${c.type}`}
                                ></span>
                                <span>{p?.dorsal} {p?.name}</span>
                              </span>
                              {isEditMode && (
                                <button
                                  onClick={() => onRemoveCard(c.id)}
                                  className="text-slate-500 hover:text-red-400 transition ml-1 shrink-0"
                                  title="Eliminar tarjeta"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          );
                        })}

                        {/* Absent players (NO ASISTE) */}
                        {homeAbsent.map((p) => (
                          <div
                            key={`absent-${p.id}`}
                            className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded border border-red-950/60 text-slate-300"
                          >
                            <span className="flex items-center gap-1.5 text-[11px]">
                              <span className="text-red-500 font-bold text-xs">❌</span>
                              <span className="font-semibold text-slate-200">{p.dorsal} {p.name}</span>
                            </span>
                            <span className="text-[9px] font-bold text-red-400 uppercase bg-red-950/90 px-1.5 py-0.5 rounded border border-red-900/40">
                              NO ASISTE
                            </span>
                          </div>
                        ))}

                        {homeGoals.length === 0 &&
                          homeCards.length === 0 &&
                          homeSuspensions.length === 0 &&
                          homeAbsent.length === 0 && (
                            <p className="text-slate-500 italic text-[10px] p-0.5">
                              Sin novedades registradas
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Away Team Column */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 space-y-2">
                      <div className="border-b border-slate-800 pb-1.5 flex items-center justify-between">
                        <span className="font-extrabold text-amber-400 uppercase tracking-wide text-[11px]">
                          {awayTeam?.name || match.awayTeamId}
                        </span>
                        {awayAbsent.length > 0 && (
                          <span className="text-[10px] text-red-400 font-bold bg-red-950 px-1.5 py-0.5 rounded border border-red-900">
                            {awayAbsent.length} Ausente{awayAbsent.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        {/* Suspensions if any */}
                        {awaySuspensions.map((s) => (
                          <div
                            key={s.playerId}
                            className="p-1 rounded bg-red-950/80 border border-red-800 text-red-300 font-bold text-[10px]"
                          >
                            ⛔ SUSPENDIDO: #{s.dorsal} {s.playerName} ({s.reason})
                          </div>
                        ))}

                        {/* Goals */}
                        {groupGoalsByPlayer(awayGoals, players).map(({ playerId, player: p, count, goalIds }) => (
                          <div
                            key={goalIds[0]}
                            className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
                          >
                            <span className="flex items-center gap-1.5 font-bold">
                              <span className="text-amber-400 text-xs tracking-tight font-black">{Array(count).fill('⚽').join('')}</span>
                              <span>{p?.dorsal} {p?.name}</span>
                            </span>
                            {isEditMode && (
                              <button
                                onClick={() => onRemoveGoal(goalIds[goalIds.length - 1])}
                                className="text-slate-500 hover:text-red-400 transition ml-1 shrink-0 text-[10px] bg-slate-900 px-1 py-0.5 rounded border border-slate-700 hover:border-red-600"
                                title="Quitar un gol"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Cards */}
                        {awayCards.map((c) => {
                          const p = players.find((pl) => pl.id === c.playerId);
                          return (
                            <div
                              key={c.id}
                              className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
                            >
                              <span className="flex items-center gap-1.5 font-bold">
                                <span
                                  className={`w-3 h-4 rounded-[1px] inline-block shrink-0 ${
                                    c.type === 'AMARILLA'
                                      ? 'bg-yellow-400'
                                      : c.type === 'AZUL'
                                      ? 'bg-blue-600'
                                      : 'bg-red-600'
                                  }`}
                                  title={`Tarjeta ${c.type}`}
                                ></span>
                                <span>{p?.dorsal} {p?.name}</span>
                              </span>
                              {isEditMode && (
                                <button
                                  onClick={() => onRemoveCard(c.id)}
                                  className="text-slate-500 hover:text-red-400 transition ml-1 shrink-0"
                                  title="Eliminar tarjeta"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          );
                        })}

                        {/* Absent players (NO ASISTE) */}
                        {awayAbsent.map((p) => (
                          <div
                            key={`absent-${p.id}`}
                            className="flex items-center justify-between bg-slate-950 px-2 py-1 rounded border border-red-950/60 text-slate-300"
                          >
                            <span className="flex items-center gap-1.5 text-[11px]">
                              <span className="text-red-500 font-bold text-xs">❌</span>
                              <span className="font-semibold text-slate-200">{p.dorsal} {p.name}</span>
                            </span>
                            <span className="text-[9px] font-bold text-red-400 uppercase bg-red-950/90 px-1.5 py-0.5 rounded border border-red-900/40">
                              NO ASISTE
                            </span>
                          </div>
                        ))}

                        {awayGoals.length === 0 &&
                          awayCards.length === 0 &&
                          awaySuspensions.length === 0 &&
                          awayAbsent.length === 0 && (
                            <p className="text-slate-500 italic text-[10px] p-0.5">
                              Sin novedades registradas
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
        </>
      )}
      </div>
      {/* Official Print Sheet Modal */}
      <OfficialPrintSheetModal
        isOpen={isPrintSheetOpen}
        onClose={() => setIsPrintSheetOpen(false)}
        currentFecha={currentFecha}
        matches={matches}
        players={players}
        teams={teams}
        cards={cards}
        goals={goals}
        activeSuspensions={activeSuspensions}
      />
    </div>
  );
};

