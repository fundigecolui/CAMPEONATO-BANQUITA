import React, { useState } from 'react';
import { Match, Player, Team, CardRecord, GoalRecord, SuspensionAlert } from '../types';
import { getFechaFullTitle, FECHA_DATES } from '../utils/fechas';
import tournamentLogo from '../assets/images/san_simon_logo_dark_1785590924842.jpg';
import {
  Printer,
  Shield,
  AlertTriangle,
  CheckCircle2,
  FileText,
  X,
  Trophy,
  Users,
  Award,
  CheckSquare,
  Swords,
  Clock,
} from 'lucide-react';
import { computeStandings, computePlayerStats, checkMathematicalElimination } from '../utils/sanctionsEngine';

interface OfficialPrintSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFecha: number;
  matches: Match[];
  players: Player[];
  teams: Team[];
  cards: CardRecord[];
  goals: GoalRecord[];
  activeSuspensions: SuspensionAlert[];
}

export const MATCH_SCHEDULE_TIMES = [
  '7:00 p.m. - 7:50 p.m.',
  '7:55 p.m. - 8:45 p.m.',
  '8:50 p.m. - 9:40 p.m.',
  '9:45 p.m. - 10:30 p.m.',
];

export const OfficialPrintSheetModal: React.FC<OfficialPrintSheetModalProps> = ({
  isOpen,
  onClose,
  currentFecha,
  matches,
  players,
  teams,
  cards,
  goals,
  activeSuspensions,
}) => {
  if (!isOpen) return null;

  // Print section toggles
  const [printFechaSummary, setPrintFechaSummary] = useState(true);
  const [printMatches, setPrintMatches] = useState(false);
  const [printStandings, setPrintStandings] = useState(false);
  const [printCards, setPrintCards] = useState(false);
  const [printAttendance, setPrintAttendance] = useState(false);
  const [printOnlyAttending, setPrintOnlyAttending] = useState(true);

  const currentMatches = matches.filter((m) => m.fecha === currentFecha);
  const fechaDate = FECHA_DATES[currentFecha] || 'Fecha Programada';

  // Compute official standings and player stats for printable pages
  const standings = computeStandings(teams, matches, cards, players);
  const { stats: playerStats } = computePlayerStats(players, cards, goals, currentFecha);

  // Identify Valla Menos Vencida & Top Scorer
  const playedStandings = standings.filter((s) => s.pj > 0);
  const minGC = playedStandings.length > 0 ? Math.min(...playedStandings.map((s) => s.gc)) : null;
  const bestDefenses = playedStandings.filter((s) => minGC !== null && s.gc === minGC);

  const topScorers = [...playerStats].sort((a, b) => b.goles - a.goles).filter((s) => s.goles > 0);
  const leaderScorer = topScorers[0];

  const handlePrint = () => {
    window.print();
  };

  // Compute team form (last 3 matches) for standings
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

      if (myGoals > oppGoals) return { res: 'W', label: 'G', color: 'bg-emerald-600 text-white' };
      if (myGoals === oppGoals) return { res: 'D', label: 'E', color: 'bg-amber-500 text-slate-950' };
      return { res: 'L', label: 'P', color: 'bg-red-600 text-white' };
    });
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:static print:bg-white print:p-0 print:m-0 print:overflow-visible print:w-full">
      {/* CSS Print Styles for Multi-Page PDF & Horizontal Landscape Margins */}
      <style>{`
        @media print {
          @page {
            size: letter landscape;
            size: landscape;
            margin: 5mm 6mm 5mm 6mm;
          }
          html, body {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: visible !important;
          }
          .modal-overlay {
            position: static !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            display: block !important;
          }
          .modal-container {
            position: static !important;
            max-width: 100% !important;
            width: 100% !important;
            max-height: none !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            display: block !important;
          }
          .print-page-break {
            page-break-after: always !important;
            break-after: page !important;
          }
          .print-avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      <div className="modal-container bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl text-slate-100 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh] print:max-h-none print:bg-white print:text-black">
        {/* Top Controls Header (Non-printable) */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-white text-sm sm:text-base font-mono">
                CENTRAL DE IMPRESIÓN Y EXPORTACIÓN PDF - JORNADA #{currentFecha}
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Genera el Resumen de Fecha, Planillas por Partido, Posiciones y Tarjetas.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer font-mono"
            >
              <Printer className="w-4 h-4" />
              <span>IMPRIMIR / EXPORTAR A PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter / Section Selectors Toolbar (Non-printable) */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between text-xs font-mono gap-3 print:hidden shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-amber-400 font-bold shrink-0">VISTAS RÁPIDAS:</span>
            <button
              onClick={() => {
                setPrintFechaSummary(true);
                setPrintMatches(false);
                setPrintStandings(false);
                setPrintCards(false);
                setPrintAttendance(false);
              }}
              className={`px-2.5 py-1 rounded-lg border font-bold transition cursor-pointer ${
                printFechaSummary && !printMatches && !printStandings && !printCards && !printAttendance
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              📺 Solo Resumen Fecha (Pantalla Principal)
            </button>
            <button
              onClick={() => {
                setPrintFechaSummary(false);
                setPrintMatches(true);
                setPrintStandings(false);
                setPrintCards(false);
                setPrintAttendance(false);
              }}
              className={`px-2.5 py-1 rounded-lg border font-bold transition cursor-pointer ${
                !printFechaSummary && printMatches && !printStandings && !printCards && !printAttendance
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              📄 Solo Planillas de Partido
            </button>
            <button
              onClick={() => {
                setPrintFechaSummary(true);
                setPrintMatches(true);
                setPrintStandings(true);
                setPrintCards(true);
                setPrintAttendance(true);
              }}
              className={`px-2.5 py-1 rounded-lg border font-bold transition cursor-pointer ${
                printFechaSummary && printMatches && printStandings && printCards && printAttendance
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              📊 Todo el Expediente Completo
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-300 flex-wrap border-t md:border-t-0 border-slate-800 pt-2 md:pt-0 w-full md:w-auto">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={printFechaSummary}
                onChange={(e) => setPrintFechaSummary(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
              />
              <span className="text-amber-300 font-bold">Resumen Fecha (Pantalla Principal)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={printMatches}
                onChange={(e) => setPrintMatches(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
              />
              <span>Planillas ({currentMatches.length})</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={printStandings}
                onChange={(e) => setPrintStandings(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
              />
              <span>Posiciones</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={printCards}
                onChange={(e) => setPrintCards(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
              />
              <span>Tarjetas</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={printAttendance}
                onChange={(e) => setPrintAttendance(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400 bg-slate-950 border-slate-700"
              />
              <span>Consolidado Asistencia</span>
            </label>
          </div>
        </div>

        {/* Printable Viewport Container */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-950 text-slate-900 print:bg-white print:text-black print:p-0 print:overflow-visible space-y-8">
          {/* ======================================================== */}
          {/* SECTION 0: RESUMEN DE LA FECHA (PANTALLA PRINCIPAL)     */}
          {/* ======================================================== */}
          {printFechaSummary && (
            <div className="bg-white text-black p-5 sm:p-6 rounded-2xl border-2 border-slate-800 print:border-black shadow-md space-y-5 print-page-break print:p-2">
              {/* Header */}
              <div className="border-b-2 border-black pb-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg border border-black p-0.5 flex items-center justify-center shrink-0">
                    <img src={tournamentLogo} alt="San Simón" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-black tracking-tight text-black uppercase font-mono leading-tight">
                      CAMPEONATO BANQUITAS SAN SIMÓN
                    </h1>
                    <p className="text-xs font-extrabold text-slate-800">
                      Resumen Oficial de Partidos, Marcadores e Incidencias (Pantalla Principal)
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono">
                      {getFechaFullTitle(currentFecha)} — {fechaDate}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs shrink-0 space-y-1">
                  <div className="px-3 py-1 rounded bg-black text-white font-extrabold text-xs uppercase tracking-wide inline-block">
                    RESUMEN JORNADA
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">
                    4 Partidos Registrados
                  </div>
                </div>
              </div>

              {/* Grid of Matches for this Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono print:grid-cols-2 print:gap-2.5">
                {currentMatches.map((m, idx) => {
                  const homeTeam = teams.find((t) => t.id === m.homeTeamId);
                  const awayTeam = teams.find((t) => t.id === m.awayTeamId);

                  const homePlayers = players.filter((p) => p.teamId === m.homeTeamId);
                  const awayPlayers = players.filter((p) => p.teamId === m.awayTeamId);

                  const homeAttending = m.attendance?.homePlayerIds ?? homePlayers.map((p) => p.id);
                  const awayAttending = m.attendance?.awayPlayerIds ?? awayPlayers.map((p) => p.id);

                  const homeAbsent = homePlayers.filter((p) => !homeAttending.includes(p.id));
                  const awayAbsent = awayPlayers.filter((p) => !awayAttending.includes(p.id));

                  const allMatchPlayers = [...homePlayers, ...awayPlayers];
                  const matchGoals = goals.filter(
                    (g) => g.fecha === currentFecha && allMatchPlayers.some((p) => p.id === g.playerId)
                  );
                  const matchCards = cards.filter(
                    (c) => c.fecha === currentFecha && allMatchPlayers.some((p) => p.id === c.playerId)
                  );

                  const homeGoals = matchGoals.filter((g) => homePlayers.some((p) => p.id === g.playerId));
                  const homeCards = matchCards.filter((c) => homePlayers.some((p) => p.id === c.playerId));
                  const homeSuspensions = activeSuspensions.filter((s) => s.teamId === m.homeTeamId);

                  const awayGoals = matchGoals.filter((g) => awayPlayers.some((p) => p.id === g.playerId));
                  const awayCards = matchCards.filter((c) => awayPlayers.some((p) => p.id === c.playerId));
                  const awaySuspensions = activeSuspensions.filter((s) => s.teamId === m.awayTeamId);

                  const scheduleTime = m.time || MATCH_SCHEDULE_TIMES[idx] || 'Horario Programado';

                  return (
                    <div
                      key={m.id}
                      className="border-2 border-black rounded-xl overflow-hidden bg-slate-900 text-white p-3 space-y-2.5 print:bg-slate-900 print:text-white"
                    >
                      {/* Match Bar */}
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 text-xs">
                        <span className="font-extrabold text-amber-400">
                          Partido #{m.id}
                        </span>
                        <span className="text-[10px] text-slate-300">
                          ⏰ {scheduleTime}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {m.status || (m.isPlayed ? 'FINALIZADO' : 'PROGRAMADO')}
                        </span>
                      </div>

                      {/* Scoreboard */}
                      <div className="flex items-center justify-between gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="flex-1 font-black text-xs text-slate-100 uppercase truncate">
                          {homeTeam?.name || m.homeTeamId}
                        </div>
                        <div className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-sm rounded shadow-inner">
                          {m.homeGoals ?? 0} - {m.awayGoals ?? 0}
                        </div>
                        <div className="flex-1 font-black text-xs text-slate-100 uppercase truncate">
                          {awayTeam?.name || m.awayTeamId}
                        </div>
                      </div>

                      {/* Attendance Summary Bar */}
                      <div className="text-[10px] text-slate-300 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 flex items-center justify-between">
                        <span>📋 Control Asistencia:</span>
                        <span className="font-bold">
                          <span className="text-emerald-400">{homeTeam?.name}: {homeAttending.length}/{homePlayers.length}</span>
                          <span className="text-slate-500 mx-1">•</span>
                          <span className="text-emerald-400">{awayTeam?.name}: {awayAttending.length}/{awayPlayers.length}</span>
                        </span>
                      </div>

                      {/* Events & Absences Columns */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-800">
                        {/* Home Team Events */}
                        <div className="space-y-1 bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
                          <span className="font-extrabold text-amber-300 block text-[9px] border-b border-slate-800 pb-0.5">
                            {homeTeam?.name}
                          </span>
                          {homeGoals.map((g) => {
                            const p = players.find((pl) => pl.id === g.playerId);
                            return (
                              <div key={g.id} className="text-emerald-300 flex items-center gap-1">
                                <span>⚽</span>
                                <span className="font-bold">{p ? `${p.dorsal} ${p.name}` : 'Gol'}</span>
                              </div>
                            );
                          })}
                          {homeCards.map((c) => {
                            const p = players.find((pl) => pl.id === c.playerId);
                            return (
                              <div key={c.id} className="flex items-center gap-1">
                                <span>{c.type === 'AMARILLA' ? '🟨' : c.type === 'AZUL' ? '🟦' : '🟥'}</span>
                                <span className="text-slate-200">{p ? `${p.dorsal} ${p.name}` : 'Tarjeta'}</span>
                              </div>
                            );
                          })}
                          {homeSuspensions.map((s) => (
                            <div key={s.playerId} className="text-red-400 flex items-center gap-1 font-bold">
                              <span>⚠️</span>
                              <span>{s.playerName} (Sancionado)</span>
                            </div>
                          ))}
                          {homeAbsent.map((p) => (
                            <div key={`abs-${p.id}`} className="text-red-300 flex items-center justify-between gap-1">
                              <span className="truncate">❌ {p.dorsal} {p.name}</span>
                              <span className="text-[8px] bg-red-950 text-red-300 px-1 rounded border border-red-900 shrink-0 font-bold">
                                NO ASISTE
                              </span>
                            </div>
                          ))}
                          {homeGoals.length === 0 && homeCards.length === 0 && homeSuspensions.length === 0 && homeAbsent.length === 0 && (
                            <span className="text-slate-500 italic text-[9px]">Sin novedades</span>
                          )}
                        </div>

                        {/* Away Team Events */}
                        <div className="space-y-1 bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
                          <span className="font-extrabold text-amber-300 block text-[9px] border-b border-slate-800 pb-0.5">
                            {awayTeam?.name}
                          </span>
                          {awayGoals.map((g) => {
                            const p = players.find((pl) => pl.id === g.playerId);
                            return (
                              <div key={g.id} className="text-emerald-300 flex items-center gap-1">
                                <span>⚽</span>
                                <span className="font-bold">{p ? `${p.dorsal} ${p.name}` : 'Gol'}</span>
                              </div>
                            );
                          })}
                          {awayCards.map((c) => {
                            const p = players.find((pl) => pl.id === c.playerId);
                            return (
                              <div key={c.id} className="flex items-center gap-1">
                                <span>{c.type === 'AMARILLA' ? '🟨' : c.type === 'AZUL' ? '🟦' : '🟥'}</span>
                                <span className="text-slate-200">{p ? `${p.dorsal} ${p.name}` : 'Tarjeta'}</span>
                              </div>
                            );
                          })}
                          {awaySuspensions.map((s) => (
                            <div key={s.playerId} className="text-red-400 flex items-center gap-1 font-bold">
                              <span>⚠️</span>
                              <span>{s.playerName} (Sancionado)</span>
                            </div>
                          ))}
                          {awayAbsent.map((p) => (
                            <div key={`abs-${p.id}`} className="text-red-300 flex items-center justify-between gap-1">
                              <span className="truncate">❌ {p.dorsal} {p.name}</span>
                              <span className="text-[8px] bg-red-950 text-red-300 px-1 rounded border border-red-900 shrink-0 font-bold">
                                NO ASISTE
                              </span>
                            </div>
                          ))}
                          {awayGoals.length === 0 && awayCards.length === 0 && awaySuspensions.length === 0 && awayAbsent.length === 0 && (
                            <span className="text-slate-500 italic text-[9px]">Sin novedades</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Signatures */}
              <div className="pt-3 border-t border-black grid grid-cols-2 gap-8 text-center font-mono text-[10px]">
                <div className="space-y-2">
                  <div className="border-b border-black h-6"></div>
                  <p className="font-extrabold uppercase">COORDINADOR DE MESA Y CANCHA</p>
                </div>
                <div className="space-y-2">
                  <div className="border-b border-black h-6"></div>
                  <p className="font-extrabold uppercase">VOCAL DE DISCIPLINA Y ASISTENCIA</p>
                </div>
              </div>
            </div>
          )}
          {/* ======================================================== */}
          {/* SECTION 1: MATCH PLANILLAS (1 PAGE PER MATCH)           */}
          {/* ======================================================== */}
          {printMatches &&
            currentMatches.map((m, idx) => {
              const homeTeam = teams.find((t) => t.id === m.homeTeamId);
              const awayTeam = teams.find((t) => t.id === m.awayTeamId);

              const homePlayers = players.filter((p) => p.teamId === m.homeTeamId);
              const awayPlayers = players.filter((p) => p.teamId === m.awayTeamId);

              // Find active suspensions for these two specific teams in current fecha
              const matchSuspensions = activeSuspensions.filter(
                (s) => s.teamId === m.homeTeamId || s.teamId === m.awayTeamId
              );

              const scheduleTime = m.time || MATCH_SCHEDULE_TIMES[idx] || 'Horario Programado';

              const allMatchPlayers = [...homePlayers, ...awayPlayers];
              const matchCards = cards.filter(
                (c) => c.fecha === currentFecha && allMatchPlayers.some((p) => p.id === c.playerId)
              );
              const matchGoals = goals.filter(
                (g) => g.fecha === currentFecha && allMatchPlayers.some((p) => p.id === g.playerId)
              );

              return (
                <div
                  key={m.id}
                  className="bg-white text-black p-5 sm:p-6 rounded-2xl border-2 border-slate-800 print:border-black shadow-md space-y-4 print-page-break print:p-2"
                >
                  {/* Official Header */}
                  <div className="border-b-2 border-black pb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border border-black p-0.5 flex items-center justify-center shrink-0">
                        <img src={tournamentLogo} alt="San Simón" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h1 className="text-base sm:text-lg font-black tracking-tight text-black uppercase font-mono leading-tight">
                          CAMPEONATO BANQUITAS SAN SIMÓN IISEM
                        </h1>
                        <p className="text-xs font-extrabold text-slate-800">
                          Planilla Oficial de Juzgamiento, Alineaciones y Control de Cancha
                        </p>
                        <p className="text-[11px] text-slate-600 font-mono">
                          {getFechaFullTitle(currentFecha)} ({fechaDate}) — Cancha San Simón
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs shrink-0">
                      <div className="px-3 py-1 rounded bg-black text-white font-extrabold text-xs">
                        PARTIDO #{idx + 1} DE 4
                      </div>
                      <div className="text-[11px] font-bold mt-1 text-slate-800">
                        ⏰ {scheduleTime}
                      </div>
                    </div>
                  </div>

                  {/* Match Teams, Score & Divided Incidents Box (Dark Card, No Full Rosters) */}
                  <div className="bg-[#0b1329] text-white rounded-2xl border border-slate-800 shadow-md font-mono overflow-hidden print:border-black">
                    {/* Top Header Bar */}
                    <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-amber-400 text-sm tracking-wide block">
                          Partido #{m.id}
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400 inline" />
                          Horario: {scheduleTime} • {fechaDate}
                        </span>
                      </div>

                      <div>
                        {m.status === 'FINALIZADO' || (m.isPlayed && m.status !== 'PROGRAMADO') ? (
                          <span className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-500/80 text-emerald-400 font-extrabold text-xs">
                            FINALIZADO
                          </span>
                        ) : m.status === 'EN_VIVO' ? (
                          <span className="px-3 py-1 rounded-lg bg-red-950 border border-red-500/80 text-red-400 font-extrabold text-xs">
                            EN VIVO
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-extrabold text-xs">
                            PROGRAMADO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle Score & Badges Row */}
                    <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 grid grid-cols-7 items-center text-center gap-2 border-b border-slate-800">
                      <div className="col-span-3 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">LOCAL</span>
                        <span
                          className={`px-5 py-1.5 rounded-2xl font-black text-xs sm:text-sm uppercase border shadow-md ${
                            homeTeam?.badgeBg || 'bg-slate-800'
                          } ${homeTeam?.badgeText || 'text-white'} ${homeTeam?.badgeBorder || 'border-slate-700'}`}
                        >
                          {homeTeam?.name || m.homeTeamId}
                        </span>
                      </div>

                      <div className="col-span-1 flex items-center justify-center font-mono font-black text-xl text-white">
                        <div className="px-4 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-amber-400 font-black font-mono text-xl sm:text-2xl tracking-widest flex items-center gap-2 shadow-inner">
                          <span>{m.homeGoals ?? 0}</span>
                          <span className="text-slate-500 font-normal">-</span>
                          <span>{m.awayGoals ?? 0}</span>
                        </div>
                      </div>

                      <div className="col-span-3 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">VISITANTE</span>
                        <span
                          className={`px-5 py-1.5 rounded-2xl font-black text-xs sm:text-sm uppercase border shadow-md ${
                            awayTeam?.badgeBg || 'bg-slate-800'
                          } ${awayTeam?.badgeText || 'text-white'} ${awayTeam?.badgeBorder || 'border-slate-700'}`}
                        >
                          {awayTeam?.name || m.awayTeamId}
                        </span>
                      </div>
                    </div>

                    {/* Divided Team Incidents Section: Local on Left, Visitor on Right */}
                    {(() => {
                      const homeGoals = goals.filter(
                        (g) => g.fecha === currentFecha && homePlayers.some((p) => p.id === g.playerId)
                      );
                      const homeCards = cards.filter(
                        (c) => c.fecha === currentFecha && homePlayers.some((p) => p.id === c.playerId)
                      );
                      const homeSuspensions = matchSuspensions.filter((s) => s.teamId === m.homeTeamId);

                      const awayGoals = goals.filter(
                        (g) => g.fecha === currentFecha && awayPlayers.some((p) => p.id === g.playerId)
                      );
                      const awayCards = cards.filter(
                        (c) => c.fecha === currentFecha && awayPlayers.some((p) => p.id === c.playerId)
                      );
                      const awaySuspensions = matchSuspensions.filter((s) => s.teamId === m.awayTeamId);

                      return (
                        <div className="p-4 bg-slate-950 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          {/* Local Team Column */}
                          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                            <div className="border-b border-slate-800 pb-1.5">
                              <span className="font-extrabold text-amber-400 uppercase tracking-wide text-[11px]">
                                {homeTeam?.name || m.homeTeamId}
                              </span>
                            </div>

                            <div className="space-y-1.5 text-[11px]">
                              {/* Suspensions if any */}
                              {homeSuspensions.map((s) => (
                                <div
                                  key={s.playerId}
                                  className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-300 font-bold text-[10px]"
                                >
                                  ⛔ SUSPENDIDO: #{s.dorsal} {s.playerName} ({s.reason})
                                </div>
                              ))}

                              {/* Goals */}
                              {homeGoals.map((g) => {
                                const p = players.find((pl) => pl.id === g.playerId);
                                return (
                                  <div
                                    key={g.id}
                                    className="flex items-center gap-2 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-200"
                                  >
                                    <span className="text-amber-400 text-sm">⚽</span>
                                    <span className="font-bold">
                                      {p?.dorsal} {p?.name}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Cards */}
                              {homeCards.map((c) => {
                                const p = players.find((pl) => pl.id === c.playerId);
                                return (
                                  <div
                                    key={c.id}
                                    className="flex items-center gap-2 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-200"
                                  >
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
                                    <span className="font-bold">
                                      {p?.dorsal} {p?.name}
                                    </span>
                                  </div>
                                );
                              })}

                              {homeGoals.length === 0 &&
                                homeCards.length === 0 &&
                                homeSuspensions.length === 0 && (
                                  <p className="text-slate-500 italic text-[11px] p-1">
                                    Sin eventos registrados
                                  </p>
                                )}
                            </div>
                          </div>

                          {/* Away Team Column */}
                          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                            <div className="border-b border-slate-800 pb-1.5">
                              <span className="font-extrabold text-amber-400 uppercase tracking-wide text-[11px]">
                                {awayTeam?.name || m.awayTeamId}
                              </span>
                            </div>

                            <div className="space-y-1.5 text-[11px]">
                              {/* Suspensions if any */}
                              {awaySuspensions.map((s) => (
                                <div
                                  key={s.playerId}
                                  className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-300 font-bold text-[10px]"
                                >
                                  ⛔ SUSPENDIDO: #{s.dorsal} {s.playerName} ({s.reason})
                                </div>
                              ))}

                              {/* Goals */}
                              {awayGoals.map((g) => {
                                const p = players.find((pl) => pl.id === g.playerId);
                                return (
                                  <div
                                    key={g.id}
                                    className="flex items-center gap-2 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-200"
                                  >
                                    <span className="text-amber-400 text-sm">⚽</span>
                                    <span className="font-bold">
                                      {p?.dorsal} {p?.name}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Cards */}
                              {awayCards.map((c) => {
                                const p = players.find((pl) => pl.id === c.playerId);
                                return (
                                  <div
                                    key={c.id}
                                    className="flex items-center gap-2 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-200"
                                  >
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
                                    <span className="font-bold">
                                      {p?.dorsal} {p?.name}
                                    </span>
                                  </div>
                                );
                              })}

                              {awayGoals.length === 0 &&
                                awayCards.length === 0 &&
                                awaySuspensions.length === 0 && (
                                  <p className="text-slate-500 italic text-[11px] p-1">
                                    Sin eventos registrados
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Official Lineup / Attendance Table on Printed Sheet */}
                  {(() => {
                    const homeAttending = m.attendance?.homePlayerIds ?? homePlayers.map((p) => p.id);
                    const awayAttending = m.attendance?.awayPlayerIds ?? awayPlayers.map((p) => p.id);

                    const displayedHome = printOnlyAttending
                      ? homePlayers.filter((p) => homeAttending.includes(p.id))
                      : homePlayers;

                    const displayedAway = printOnlyAttending
                      ? awayPlayers.filter((p) => awayAttending.includes(p.id))
                      : awayPlayers;

                    return (
                      <div className="border border-black rounded-lg p-2.5 bg-white text-black font-mono text-[10px]">
                        <div className="flex items-center justify-between border-b border-black pb-1 mb-1 font-bold">
                          <span className="uppercase text-[11px] font-black">
                            📋 ALINEACIÓN OFICIAL Y NÓMINA DE CAMPO ({printOnlyAttending ? 'SOLO ASISTENTES CONVOCADOS' : 'NÓMINA COMPLETA'})
                          </span>
                          <span className="text-[10px] text-slate-700">
                            Local: {displayedHome.length} jug. | Visitante: {displayedAway.length} jug.
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Home Team Lineup */}
                          <div>
                            <span className="font-extrabold text-black block mb-0.5 border-b border-black pb-0.5 uppercase text-[10px]">
                              LOCAL: {homeTeam?.name}
                            </span>
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-black font-bold bg-slate-100">
                                  <th className="p-0.5 w-6 text-center">#</th>
                                  <th className="p-0.5">Jugador</th>
                                  <th className="p-0.5 text-center w-14">Asistencia</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayedHome.map((p) => {
                                  const attended = homeAttending.includes(p.id);
                                  return (
                                    <tr key={p.id} className="border-b border-slate-200">
                                      <td className="p-0.5 text-center font-bold">{p.dorsal}</td>
                                      <td className="p-0.5">{p.name} {p.isCaptain ? '(C)' : ''}</td>
                                      <td className="p-0.5 text-center font-bold">
                                        {attended ? '✅ Pres.' : '❌ Aus.'}
                                      </td>
                                    </tr>
                                  );
                                })}
                                {displayedHome.length === 0 && (
                                  <tr>
                                    <td colSpan={3} className="p-1 italic text-slate-500 text-center">Sin jugadores convocados</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          {/* Away Team Lineup */}
                          <div>
                            <span className="font-extrabold text-black block mb-0.5 border-b border-black pb-0.5 uppercase text-[10px]">
                              VISITANTE: {awayTeam?.name}
                            </span>
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-black font-bold bg-slate-100">
                                  <th className="p-0.5 w-6 text-center">#</th>
                                  <th className="p-0.5">Jugador</th>
                                  <th className="p-0.5 text-center w-14">Asistencia</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayedAway.map((p) => {
                                  const attended = awayAttending.includes(p.id);
                                  return (
                                    <tr key={p.id} className="border-b border-slate-200">
                                      <td className="p-0.5 text-center font-bold">{p.dorsal}</td>
                                      <td className="p-0.5">{p.name} {p.isCaptain ? '(C)' : ''}</td>
                                      <td className="p-0.5 text-center font-bold">
                                        {attended ? '✅ Pres.' : '❌ Aus.'}
                                      </td>
                                    </tr>
                                  );
                                })}
                                {displayedAway.length === 0 && (
                                  <tr>
                                    <td colSpan={3} className="p-1 italic text-slate-500 text-center">Sin jugadores convocados</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Arbitral Control & Field Incidents Notes Box */}
                  <div className="p-2.5 bg-slate-50 border border-black rounded-lg space-y-1 font-mono text-xs">
                    <span className="font-extrabold text-black block text-[11px] uppercase">
                      OBSERVACIONES DEL ÁRBITRO Y NOVEDADES DEL PARTIDO:
                    </span>
                    <div className="border-b border-dashed border-slate-400 h-6"></div>
                    <div className="border-b border-dashed border-slate-400 h-6"></div>
                  </div>

                  {/* Official Signatures Grid */}
                  <div className="pt-2 border-t border-black grid grid-cols-4 gap-3 text-center font-mono text-[9px] text-black">
                    <div className="space-y-3">
                      <div className="border-b border-black h-7"></div>
                      <p className="font-extrabold uppercase">FIRMA ÁRBITRO CENTRAL</p>
                    </div>
                    <div className="space-y-3">
                      <div className="border-b border-black h-7"></div>
                      <p className="font-extrabold uppercase">FIRMA VEEDOR / DELEGADO</p>
                    </div>
                    <div className="space-y-3">
                      <div className="border-b border-black h-7"></div>
                      <p className="font-extrabold uppercase">CAPITÁN {homeTeam?.name}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="border-b border-black h-7"></div>
                      <p className="font-extrabold uppercase">CAPITÁN {awayTeam?.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* ======================================================== */}
          {/* SECTION 2: TABLA DE POSICIONES OFICIAL (1 PAGE)         */}
          {/* ======================================================== */}
          {printStandings && (
            <div className="bg-white text-black p-5 sm:p-6 rounded-2xl border-2 border-black shadow-md space-y-4 print-page-break print:p-2">
              {/* Header */}
              <div className="border-b-2 border-black pb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-black p-0.5 flex items-center justify-center shrink-0">
                    <img src={tournamentLogo} alt="San Simón" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-black tracking-tight text-black uppercase font-mono leading-tight">
                      CAMPEONATO BANQUITAS SAN SIMÓN IISEM
                    </h1>
                    <p className="text-xs font-extrabold text-slate-800 uppercase">
                      Tabla de Posiciones Oficial del Torneo
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono">
                      Corte acumulado hasta el {getFechaFullTitle(currentFecha)} ({fechaDate})
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs shrink-0">
                  <div className="px-3 py-1 rounded bg-black text-white font-extrabold text-xs">
                    JORNADA #{currentFecha}
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 mt-1">
                    8 EQUIPOS PARTICIPANTES
                  </div>
                </div>
              </div>

              {/* Standings Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse border-2 border-black">
                  <thead>
                    <tr className="bg-black text-white font-mono text-[11px] font-extrabold">
                      <th className="p-2 text-center w-8 border border-slate-700">POS</th>
                      <th className="p-2 border border-slate-700">EQUIPO</th>
                      <th className="p-2 text-center border border-slate-700">PJ</th>
                      <th className="p-2 text-center border border-slate-700">PG</th>
                      <th className="p-2 text-center border border-slate-700">PE</th>
                      <th className="p-2 text-center border border-slate-700">PP</th>
                      <th className="p-2 text-center border border-slate-700">GF</th>
                      <th className="p-2 text-center border border-slate-700">GC</th>
                      <th className="p-2 text-center border border-slate-700">DG</th>
                      <th className="p-2 text-center border border-slate-700">RACHA (ÚLT 3)</th>
                      <th className="p-2 text-center border border-slate-700">JUEGO LIMPIO</th>
                      <th className="p-2 text-center bg-amber-400 text-black border border-slate-700">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black font-mono">
                    {standings.map((row, idx) => {
                      const form = getTeamForm(row.teamId);
                      return (
                        <tr
                          key={row.teamId}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-100'}
                        >
                          <td className="p-2 text-center font-black border border-black">
                            #{idx + 1}
                          </td>
                          <td className="p-2 font-black border border-black text-sm uppercase">
                            {row.teamName}
                          </td>
                          <td className="p-2 text-center font-bold border border-black">{row.pj}</td>
                          <td className="p-2 text-center font-bold border border-black">{row.pg}</td>
                          <td className="p-2 text-center font-bold border border-black">{row.pe}</td>
                          <td className="p-2 text-center font-bold border border-black">{row.pp}</td>
                          <td className="p-2 text-center font-bold border border-black">{row.gf}</td>
                          <td className="p-2 text-center font-bold border border-black">{row.gc}</td>
                          <td className="p-2 text-center font-black border border-black">
                            {row.dg > 0 ? `+${row.dg}` : row.dg}
                          </td>
                          <td className="p-2 text-center border border-black text-[10px]">
                            <div className="flex items-center justify-center gap-1">
                              {form.map((f, fIdx) => (
                                <span
                                  key={fIdx}
                                  className={`w-4 h-4 rounded font-bold inline-flex items-center justify-center ${f.color}`}
                                >
                                  {f.label}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-2 text-center font-bold border border-black text-emerald-800">
                            {row.fairPlayPts} pts
                          </td>
                          <td className="p-2 text-center font-black border border-black bg-amber-100 text-black text-base">
                            {row.pts}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tournament Distinction Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-2.5 bg-slate-100 border border-black rounded-lg">
                  <span className="text-[10px] font-bold text-slate-600 uppercase block">
                    🏆 LÍDER DEL TORNEO:
                  </span>
                  <span className="font-extrabold text-black text-sm uppercase">
                    {standings[0]?.teamName || 'N/A'} ({standings[0]?.pts} PTS)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-100 border border-black rounded-lg">
                  <span className="text-[10px] font-bold text-slate-600 uppercase block">
                    🛡️ VALLA MENOS VENCIDA:
                  </span>
                  <span className="font-extrabold text-black text-xs uppercase">
                    {bestDefenses.map((d) => d.teamName).join(', ') || 'N/A'} ({minGC} GC)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-100 border border-black rounded-lg">
                  <span className="text-[10px] font-bold text-slate-600 uppercase block">
                    ⚽ GOLEADOR PRINCIPAL:
                  </span>
                  <span className="font-extrabold text-black text-xs uppercase">
                    {leaderScorer ? `${leaderScorer.name} (${leaderScorer.goles} Goles)` : 'Sin goles'}
                  </span>
                </div>
              </div>

              {/* Signature Line */}
              <div className="pt-4 border-t border-black grid grid-cols-2 gap-8 text-center font-mono text-[10px]">
                <div className="space-y-4">
                  <div className="border-b border-black h-8"></div>
                  <p className="font-extrabold uppercase">PRESIDENTE COMITÉ ORGANIZADOR</p>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-black h-8"></div>
                  <p className="font-extrabold uppercase">DIRECTOR TÉCNICO DE ESTADÍSTICAS</p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 3: CONTROL DE TARJETAS Y SANCIONES (1 PAGE)     */}
          {/* ======================================================== */}
          {printCards && (
            <div className="bg-white text-black p-5 sm:p-6 rounded-2xl border-2 border-black shadow-md space-y-4 print-page-break print:p-2">
              {/* Header */}
              <div className="border-b-2 border-black pb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-black p-0.5 flex items-center justify-center shrink-0">
                    <img src={tournamentLogo} alt="San Simón" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-black tracking-tight text-black uppercase font-mono leading-tight">
                      CAMPEONATO BANQUITAS SAN SIMÓN IISEM
                    </h1>
                    <p className="text-xs font-extrabold text-slate-800 uppercase">
                      Control Oficial de Tarjetas, Sanciones y Juego Limpio
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono">
                      Informe Disciplinario para la Jornada #{currentFecha}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs shrink-0">
                  <div className="px-3 py-1 rounded bg-black text-white font-extrabold text-xs">
                    DISCIPLINA
                  </div>
                </div>
              </div>

              {/* Active Suspensions List */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-black font-mono uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>SANCIONADOS INHABILITADOS PARA LA JORNADA #{currentFecha} ({activeSuspensions.length})</span>
                </h3>

                {activeSuspensions.length === 0 ? (
                  <p className="text-xs font-mono p-3 bg-slate-100 border border-black rounded text-emerald-800 font-bold">
                    ✅ No hay jugadores sancionados para esta fecha. Todos los inscritos están habilitados.
                  </p>
                ) : (
                  <table className="w-full text-left font-sans text-xs border-collapse border border-black font-mono">
                    <thead>
                      <tr className="bg-black text-white font-bold text-[10px]">
                        <th className="p-1.5 border border-slate-700">N° Dorsal</th>
                        <th className="p-1.5 border border-slate-700">Jugador Sancionado</th>
                        <th className="p-1.5 border border-slate-700">Equipo</th>
                        <th className="p-1.5 border border-slate-700">Causa Sanción</th>
                        <th className="p-1.5 border border-slate-700 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSuspensions.map((s) => (
                        <tr key={s.playerId} className="bg-red-50 text-red-950 font-bold">
                          <td className="p-1.5 border border-black font-black">{s.dorsal}</td>
                          <td className="p-1.5 border border-black font-extrabold text-sm">{s.playerName}</td>
                          <td className="p-1.5 border border-black">{s.teamId}</td>
                          <td className="p-1.5 border border-black text-red-700">{s.details}</td>
                          <td className="p-1.5 border border-black text-center">
                            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-black uppercase">
                              SUSPENDIDO
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Cards Accumulation Table by Team (Fair Play) */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-black text-black font-mono uppercase">
                  RESUMEN GENERAL DE TARJETAS Y FAIR PLAY POR EQUIPO
                </h3>

                <table className="w-full text-left font-sans text-xs border-collapse border border-black font-mono">
                  <thead>
                    <tr className="bg-slate-200 text-black font-bold text-[10px]">
                      <th className="p-1.5 border border-black">Equipo</th>
                      <th className="p-1.5 border border-black text-center">🟨 Amarillas (-1pt)</th>
                      <th className="p-1.5 border border-black text-center">🟦 Azules (-2pts)</th>
                      <th className="p-1.5 border border-black text-center">🟥 Rojas (-3pts)</th>
                      <th className="p-1.5 border border-black text-center">Puntos Juego Limpio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t) => (
                      <tr key={t.teamId} className="border-b border-black">
                        <td className="p-1.5 border border-black font-extrabold uppercase">{t.teamName}</td>
                        <td className="p-1.5 border border-black text-center font-bold">{t.amarillas}</td>
                        <td className="p-1.5 border border-black text-center font-bold">{t.azules}</td>
                        <td className="p-1.5 border border-black text-center font-bold text-red-700">{t.rojas}</td>
                        <td className="p-1.5 border border-black text-center font-black text-emerald-800 text-sm">
                          {t.fairPlayPts} pts
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Consolidated Player Cards Table (Only Carded/Suspended Players) */}
              <div className="space-y-2 pt-2">
                {(() => {
                  const cardedList = players
                    .map((p) => {
                      const stat = playerStats.find((s) => s.playerId === p.id);
                      const team = teams.find((t) => t.id === p.teamId);
                      const yellowRem = stat ? stat.amarillas % 3 : 0;
                      return {
                        player: p,
                        stat,
                        teamName: team?.name || p.teamId,
                        yellowRem,
                      };
                    })
                    .filter(({ stat }) => (stat?.totalCards || 0) > 0 || stat?.isCurrentlySuspended)
                    .sort((a, b) => {
                      const cardsA = a.stat?.totalCards || 0;
                      const cardsB = b.stat?.totalCards || 0;
                      if (cardsB !== cardsA) return cardsB - cardsA;
                      if (a.teamName !== b.teamName) return a.teamName.localeCompare(b.teamName);
                      return a.player.dorsal - b.player.dorsal;
                    });

                  return (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-black font-mono uppercase flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-800" />
                          <span>CONSOLIDADO DE JUGADORES AMONESTADOS Y SANCIONADOS ({cardedList.length})</span>
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-slate-600">
                          Corte acumulado Fecha {currentFecha}
                        </span>
                      </div>

                      {cardedList.length === 0 ? (
                        <p className="text-xs font-mono p-3 bg-slate-100 border border-black rounded text-slate-700 font-bold text-center">
                          ✅ No hay jugadores amonestados ni sancionados registrados hasta la Fecha #{currentFecha}.
                        </p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-sans text-xs border-collapse border border-black font-mono">
                            <thead>
                              <tr className="bg-black text-white font-bold text-[10px]">
                                <th className="p-1.5 border border-slate-700 text-center w-8">N°</th>
                                <th className="p-1.5 border border-slate-700">Jugador</th>
                                <th className="p-1.5 border border-slate-700">Equipo</th>
                                <th className="p-1.5 border border-slate-700 text-center w-14">🟨 Amarillas</th>
                                <th className="p-1.5 border border-slate-700 text-center w-14">🟦 Azules</th>
                                <th className="p-1.5 border border-slate-700 text-center w-14">🟥 Rojas</th>
                                <th className="p-1.5 border border-slate-700 text-center w-16">Total Tarjetas</th>
                                <th className="p-1.5 border border-slate-700 text-center">Estado Disciplinario</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-black text-[11px]">
                              {cardedList.map(({ player: p, stat, teamName, yellowRem }, idx) => {
                                const isSuspended = stat?.isCurrentlySuspended;

                                let statusText = '✅ Habilitado';
                                let statusBg = 'bg-emerald-100 text-emerald-900';

                                if (isSuspended) {
                                  statusText = `⛔ SUSPENDIDO (${stat?.suspensionReason || 'Sanción'})`;
                                  statusBg = 'bg-red-600 text-white font-black';
                                } else if (yellowRem === 2) {
                                  statusText = '⚠️ 2 Amarillas (A 1 de suspensión)';
                                  statusBg = 'bg-amber-100 text-amber-900 font-bold';
                                } else if (yellowRem === 1) {
                                  statusText = '🟨 1 Amarilla acumulada';
                                  statusBg = 'bg-yellow-50 text-slate-800';
                                }

                                return (
                                  <tr
                                    key={p.id}
                                    className={
                                      isSuspended
                                        ? 'bg-red-50 font-bold'
                                        : (stat?.totalCards || 0) > 0
                                        ? 'bg-amber-50/40'
                                        : idx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-slate-50'
                                    }
                                  >
                                    <td className="p-1.5 text-center font-black border border-black">
                                      {p.dorsal}
                                    </td>
                                    <td className="p-1.5 border border-black font-bold">
                                      {p.name} {p.isCaptain && ' (C)'}
                                    </td>
                                    <td className="p-1.5 border border-black font-bold text-slate-700 uppercase text-[10px]">
                                      {teamName}
                                    </td>
                                    <td className="p-1.5 text-center border border-black font-bold text-amber-800">
                                      {stat?.amarillas || 0}
                                    </td>
                                    <td className="p-1.5 text-center border border-black font-bold text-blue-800">
                                      {stat?.azules || 0}
                                    </td>
                                    <td className="p-1.5 text-center border border-black font-bold text-red-700">
                                      {stat?.rojas || 0}
                                    </td>
                                    <td className="p-1.5 text-center border border-black font-black text-black">
                                      {stat?.totalCards || 0}
                                    </td>
                                    <td className={`p-1.5 border border-black text-center text-[10px] ${statusBg}`}>
                                      {statusText}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Signature Line */}
              <div className="pt-6 border-t border-black grid grid-cols-2 gap-8 text-center font-mono text-[10px]">
                <div className="space-y-4">
                  <div className="border-b border-black h-8"></div>
                  <p className="font-extrabold uppercase">VOCAL COMITÉ DISCIPLINARIO</p>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-black h-8"></div>
                  <p className="font-extrabold uppercase">COORDINADOR DE ARBITRAJE</p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 4: CONSOLIDADO DE ASISTENCIA Y PARTICIPACIÓN       */}
          {/* ======================================================== */}
          {printAttendance && (
            <div className="bg-white text-black p-6 rounded-2xl border-2 border-slate-800 print:border-black shadow-md space-y-4 print-page-break print:p-2">
              {/* Header */}
              <div className="border-b-2 border-black pb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-black p-0.5 flex items-center justify-center shrink-0">
                    <img src={tournamentLogo} alt="San Simón" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-black tracking-tight text-black uppercase font-mono leading-tight">
                      CAMPEONATO BANQUITAS SAN SIMÓN IISEM
                    </h1>
                    <p className="text-xs font-extrabold text-slate-800">
                      Consolidado Oficial de Asistencia y Convocatoria de Jugadores
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono">
                      Corte a la {getFechaFullTitle(currentFecha)} — {fechaDate}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] font-bold">
                      <span className="flex items-center gap-1 text-emerald-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        Asistencia
                      </span>
                      <span className="flex items-center gap-1 text-orange-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                        No Asistencia / Ausencia
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-xs shrink-0">
                  <div className="px-3 py-1 rounded bg-black text-white font-extrabold text-xs">
                    REPORTE GENERAL
                  </div>
                  <div className="text-[11px] font-bold mt-1 text-slate-800">
                    {teams.length} Equipos Registrados
                  </div>
                </div>
              </div>

              {/* Attendance Consolidated Tables by Team */}
              <div className="space-y-4 font-mono">
                {teams.map((t) => {
                  const teamPlayers = players.filter((p) => p.teamId === t.id);
                  const teamMatches = matches.filter(
                    (m) => (m.isPlayed || m.status === 'FINALIZADO') && m.fecha! <= currentFecha && (m.homeTeamId === t.id || m.awayTeamId === t.id)
                  );
                  const totalTeamPlayed = teamMatches.length;

                  const attendanceRows = teamPlayers.map((p) => {
                    const attendedCount = teamMatches.filter((m) => {
                      const isHome = m.homeTeamId === t.id;
                      const list = isHome ? m.attendance?.homePlayerIds : m.attendance?.awayPlayerIds;
                      if (list) return list.includes(p.id);
                      return true; // Default attended if no explicit log
                    }).length;

                    const pct = totalTeamPlayed > 0 ? Math.round((attendedCount / totalTeamPlayed) * 100) : 100;
                    return { player: p, attendedCount, pct };
                  });

                  return (
                    <div key={t.id} className="border border-black rounded-lg overflow-hidden">
                      <div className="bg-slate-900 text-white p-2 flex items-center justify-between font-bold text-xs">
                        <span className="uppercase font-black text-amber-400">
                          {t.name} ({teamPlayers.length} Jugadores)
                        </span>
                        <span>Total Partidos Jugados del Equipo: {totalTeamPlayed}</span>
                      </div>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                          <tr className="bg-slate-100 border-b border-black font-bold">
                            <th className="p-1.5 w-10 text-center border-r border-black">#</th>
                            <th className="p-1.5 border-r border-black">Jugador</th>
                            <th className="p-1.5 text-center w-24 border-r border-black">Partidos Equipo</th>
                            <th className="p-1.5 text-center w-28 border-r border-black">Partidos Asistidos</th>
                            <th className="p-1.5 text-center w-24 border-r border-black">% Asistencia</th>
                            <th className="p-1.5 text-center w-48">Asistencia</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300">
                          {attendanceRows.map(({ player: p, attendedCount, pct }, idx) => {
                            const absentCount = Math.max(0, totalTeamPlayed - attendedCount);
                            return (
                              <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="p-1.5 text-center font-bold border-r border-black">{p.dorsal}</td>
                                <td className="p-1.5 font-bold border-r border-black">{p.name} {p.isCaptain ? '(C)' : ''}</td>
                                <td className="p-1.5 text-center border-r border-black">{totalTeamPlayed}</td>
                                <td className="p-1.5 text-center font-bold text-emerald-800 border-r border-black">{attendedCount}</td>
                                <td className="p-1.5 text-center font-black border-r border-black">{pct}%</td>
                                <td className="p-1.5 text-center">
                                  <div className="flex items-center justify-center gap-2 px-1">
                                    {/* Cylindrical capsule bar */}
                                    <div
                                      className="w-28 h-4 bg-orange-500 rounded-full border border-slate-700 overflow-hidden flex shadow-inner relative"
                                      title={`${attendedCount} Asistidos (Verde) | ${absentCount} Ausencias (Naranja)`}
                                    >
                                      {pct > 0 && (
                                        <div
                                          className="bg-emerald-500 h-full transition-all duration-300 flex items-center justify-center"
                                          style={{ width: `${pct}%` }}
                                        />
                                      )}
                                    </div>
                                    <span className="text-[10px] font-extrabold font-mono shrink-0">
                                      <span className="text-emerald-700">{attendedCount}A</span>
                                      <span className="text-slate-400">/</span>
                                      <span className="text-orange-600">{absentCount}F</span>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>

              {/* Signatures */}
              <div className="pt-4 border-t border-black grid grid-cols-2 gap-8 text-center font-mono text-[10px]">
                <div className="space-y-3">
                  <div className="border-b border-black h-7"></div>
                  <p className="font-extrabold uppercase">VOCAL DE ASISTENCIA Y CONTROL</p>
                </div>
                <div className="space-y-3">
                  <div className="border-b border-black h-7"></div>
                  <p className="font-extrabold uppercase">COORDINADOR GENERAL DE TORNEO</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
