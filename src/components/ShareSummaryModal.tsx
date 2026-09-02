import React, { useRef, useState, useEffect } from 'react';
import { Match, Player, Team, CardRecord, GoalRecord, SuspensionAlert } from '../types';
import { getFechaFullTitle, FECHA_DATES } from '../utils/fechas';
import { computeStandings, computePlayerStats, groupGoalsByPlayer } from '../utils/sanctionsEngine';
import { toPng } from 'html-to-image';
import { TeamBadgeDot, CardIconVector, GoalBallBadge, getTeamEmoji, getTeamColorHex } from './TeamColorDot';
import {
  Share2,
  Copy,
  Download,
  Check,
  X,
  MessageSquare,
  Image as ImageIcon,
  Trophy,
  AlertTriangle,
  Flame,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Award,
  Shield,
  Calendar,
  UserCheck,
  Target,
  Swords,
  Zap,
} from 'lucide-react';
import tournamentLogo from '../assets/images/san_simon_logo_dark_1785590924842.jpg';

interface ShareSummaryModalProps {
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

export const ShareSummaryModal: React.FC<ShareSummaryModalProps> = ({
  isOpen,
  onClose,
  currentFecha: initialFecha,
  matches,
  players,
  teams,
  cards,
  goals,
  activeSuspensions,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  
  // Selected Fecha navigation state inside modal
  const [selectedFecha, setSelectedFecha] = useState(initialFecha);

  useEffect(() => {
    setSelectedFecha(initialFecha);
  }, [initialFecha, isOpen]);

  // Max fecha available in matches
  const maxFechaInMatches = matches.length > 0 ? Math.max(...matches.map((m) => m.fecha), 35) : 35;

  // Section toggle options for sharing
  const [includeResults, setIncludeResults] = useState(true);
  const [includeStandings, setIncludeStandings] = useState(true);
  const [includeScorers, setIncludeScorers] = useState(true);
  const [includeCards, setIncludeCards] = useState(true);
  const [includeAttendanceFecha, setIncludeAttendanceFecha] = useState(true);
  const [includeAttendanceConsolidated, setIncludeAttendanceConsolidated] = useState(true);
  const [includeNextFecha, setIncludeNextFecha] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentFecha = selectedFecha;
  const currentMatches = matches.filter((m) => m.fecha === currentFecha);
  const nextFecha = currentFecha + 1;
  const nextMatches = matches.filter((m) => m.fecha === nextFecha);
  const fechaDate = FECHA_DATES[currentFecha] || 'Fecha Programada';
  const nextFechaDate = FECHA_DATES[nextFecha] || 'Por Programar';
  
  // Compute standings up to selected Fecha
  const standings = computeStandings(teams, matches, cards, players);
  
  // Calculate top scorers, cards, and suspensions for selected and next fecha
  const { stats, allSuspensions } = computePlayerStats(players, cards, goals, currentFecha);
  const topScorers = stats
    .filter((s) => s.goles > 0)
    .sort((a, b) => b.goles - a.goles || a.name.localeCompare(b.name))
    .slice(0, 6);

  // Cards shown in selected fecha
  const cardsInFecha = cards.filter((c) => c.fecha === currentFecha);

  // Suspensions for the NEXT FECHA (Fecha selected + 1)
  const nextFechaSuspensions = allSuspensions.filter(
    (s) => s.suspendedForFecha === nextFecha
  );

  // Helper for short name formatting (e.g., "Manuel Peña" -> "M. Peña")
  const formatShortName = (name?: string): string => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
  };

  // Generate formatted WhatsApp Text with color badges and clean alignment
  const generateWhatsAppText = () => {
    let txt = `🏆 CAMPEONATO BANQUITAS SAN SIMÓN\n`;
    txt += `📅 FECHA ${currentFecha} | ${fechaDate}\n\n`;

    if (includeResults) {
      txt += `─── ⚽ RESULTADOS DE LA FECHA ───\n\n`;
      currentMatches.forEach((m, idx) => {
        const homeTeam = teams.find((t) => t.id === m.homeTeamId);
        const awayTeam = teams.find((t) => t.id === m.awayTeamId);
        const homeName = homeTeam?.name || m.homeTeamId;
        const awayName = awayTeam?.name || m.awayTeamId;
        const homeEmoji = getTeamEmoji(m.homeTeamId);
        const awayEmoji = getTeamEmoji(m.awayTeamId);

        const homeGoalsCount = m.homeGoals ?? 0;
        const awayGoalsCount = m.awayGoals ?? 0;

        txt += `P${idx + 1}: ${homeEmoji} ${homeName}  ${homeGoalsCount} - ${awayGoalsCount}  ${awayName} ${awayEmoji}\n`;

        // Goals summary
        const matchPlayers = players.filter((p) => p.teamId === m.homeTeamId || p.teamId === m.awayTeamId);
        const matchGoals = goals.filter((g) => g.fecha === currentFecha && matchPlayers.some((p) => p.id === g.playerId));
        
        if (matchGoals.length > 0) {
          const homeTeamGoals = matchGoals.filter((g) => {
            const p = players.find((pl) => pl.id === g.playerId);
            return p?.teamId === m.homeTeamId;
          });
          const awayTeamGoals = matchGoals.filter((g) => {
            const p = players.find((pl) => pl.id === g.playerId);
            return p?.teamId === m.awayTeamId;
          });

          const homeGoalStr = groupGoalsByPlayer(homeTeamGoals, players)
            .map(({ player: p, count }) => `#${p?.dorsal} ${formatShortName(p?.name)}${count > 1 ? ` (${count})` : ''}`)
            .join(', ');

          const awayGoalStr = groupGoalsByPlayer(awayTeamGoals, players)
            .map(({ player: p, count }) => `#${p?.dorsal} ${formatShortName(p?.name)}${count > 1 ? ` (${count})` : ''}`)
            .join(', ');

          let goalSummaryLine = '';
          if (homeGoalStr && awayGoalStr) {
            goalSummaryLine = `${homeGoalStr} / ${awayGoalStr}`;
          } else if (homeGoalStr) {
            goalSummaryLine = homeGoalStr;
          } else if (awayGoalStr) {
            goalSummaryLine = `/ ${awayGoalStr}`;
          }

          txt += `└ ⚽ Goles: ${goalSummaryLine}\n\n`;
        } else {
          txt += `└ 🤝 Sin goles\n\n`;
        }
      });
    }

    if (includeStandings) {
      txt += `─── 📊 TABLA DE POSICIONES ───\n\n`;
      txt += `Pos  Equipo      PJ   PTS   DG\n`;
      txt += `-------------------------------\n`;
      standings.slice(0, 8).forEach((s, i) => {
        const posNum = String(i + 1).padStart(2, ' ');
        const teamEmoji = getTeamEmoji(s.teamId);
        const teamNamePad = s.teamName.padEnd(8, ' ');
        const pjPad = String(s.pj).padStart(3, ' ');
        const ptsPad = String(s.pts).padStart(4, ' ');
        const dgStr = s.dg >= 0 ? `+${s.dg}` : String(s.dg);
        const dgPad = dgStr.padStart(5, ' ');
        txt += `${posNum}.  ${teamEmoji} ${teamNamePad} ${pjPad}  ${ptsPad}  ${dgPad}\n`;
      });
      txt += `\n`;
    }

    if (includeScorers) {
      txt += `─── 👑 TOP GOLEADORES ───\n\n`;
      if (topScorers.length === 0) {
        txt += `_Aún no hay goles registrados._\n\n`;
      } else {
        topScorers.forEach((p, idx) => {
          const teamObj = teams.find((t) => t.id === p.teamId);
          const teamEmoji = getTeamEmoji(p.teamId);
          const posBadge = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`;
          txt += `${posBadge} #${p.dorsal} ${p.name} (${teamEmoji} ${teamObj?.name || p.teamId}) ➔ ${p.goles} Goles\n`;
        });
        txt += `\n`;
      }
    }

    if (includeCards) {
      txt += `─── 🟨 TARJETAS Y SANCIONES (FECHA ${currentFecha}) ───\n\n`;
      if (cardsInFecha.length > 0) {
        cardsInFecha.forEach((c) => {
          const player = players.find((p) => p.id === c.playerId);
          const icon = c.type === 'AMARILLA' ? '🟨' : c.type === 'AZUL' ? '🟦' : '🟥';
          const teamObj = teams.find((t) => t.id === player?.teamId);
          const teamEmoji = getTeamEmoji(player?.teamId);
          const cardTypeSuffix = c.type === 'AZUL' ? ' — Tarjeta Azul' : c.type === 'ROJA' ? ' — Tarjeta Roja' : '';
          txt += `• ${icon} #${player?.dorsal || ''} ${player?.name || 'Jugador'} (${teamEmoji} ${teamObj?.name || player?.teamId || ''})${cardTypeSuffix}\n`;
        });
        txt += `\n`;
      }

      if (nextFechaSuspensions.length > 0) {
        txt += `⚠️ *JUGADORES SUSPENDIDOS (PRÓXIMA FECHA #${nextFecha}):*\n`;
        nextFechaSuspensions.forEach((s) => {
          const teamEmoji = getTeamEmoji(s.teamId);
          const teamObj = teams.find((t) => t.id === s.teamId);
          const cardCount = s.cardCount || 3;
          const reasonLabel = s.reason === '1_ROJA' ? 'Tarjeta Roja Directa' : `${cardCount} Tarjetas`;
          txt += `• ⛔ #${s.dorsal} ${s.playerName} (${teamEmoji} ${teamObj?.name || s.teamId}) ➔ Suspendido [${reasonLabel}]\n`;
        });
        txt += `_Nota: La suspensión vence al finalizar la jornada o pagar la sanción respectiva._\n\n`;
      } else if (cardsInFecha.length === 0) {
        txt += `_Sin tarjetas ni suspensiones en esta jornada._\n\n`;
      }
    }

    if (includeAttendanceFecha || includeAttendanceConsolidated) {
      txt += `─── 📋 CONTROL DE ASISTENCIA ───\n\n`;

      if (includeAttendanceFecha) {
        txt += `Ausentes Fecha ${currentFecha}:\n`;
        teams.forEach((t) => {
          const teamEmoji = getTeamEmoji(t.id);
          const match = currentMatches.find((m) => m.homeTeamId === t.id || m.awayTeamId === t.id);
          const teamPlayers = players.filter((p) => p.teamId === t.id);
          
          if (!match || !match.attendance) {
            txt += `• ${teamEmoji} ${t.name}: 100% Asistencia\n`;
            return;
          }

          const isHome = match.homeTeamId === t.id;
          const attIds = isHome ? match.attendance.homePlayerIds : match.attendance.awayPlayerIds;

          if (!attIds) {
            txt += `• ${teamEmoji} ${t.name}: 100% Asistencia\n`;
            return;
          }

          const absentPlayers = teamPlayers.filter((p) => !attIds.includes(p.id));

          if (absentPlayers.length === 0) {
            txt += `• ${teamEmoji} ${t.name}: 100% Asistencia\n`;
          } else {
            const absentNames = absentPlayers.map((p) => `#${p.dorsal} ${p.name}`).join(', ');
            txt += `• ${teamEmoji} ${t.name}: ${absentNames}\n`;
          }
        });
        txt += `\n`;
      }

      if (includeAttendanceConsolidated) {
        txt += `Acumulado de Faltas (Corte Fecha ${currentFecha}):\n`;
        teams.forEach((t) => {
          const teamEmoji = getTeamEmoji(t.id);
          const teamPlayers = players.filter((p) => p.teamId === t.id);
          const teamPlayedMatches = matches.filter(
            (m) =>
              m.fecha <= currentFecha &&
              (m.homeTeamId === t.id || m.awayTeamId === t.id) &&
              (m.isPlayed || m.status === 'FINALIZADO')
          );
          const totalPJ = teamPlayedMatches.length;

          if (totalPJ === 0) {
            txt += `• ${teamEmoji} ${t.name}: Asistencia perfecta (0 faltas)\n`;
            return;
          }

          const playerAbsences = teamPlayers
            .map((p) => {
              const attended = teamPlayedMatches.filter((m) => {
                const isHome = m.homeTeamId === t.id;
                const attIds = isHome ? m.attendance?.homePlayerIds : m.attendance?.awayPlayerIds;
                return attIds ? attIds.includes(p.id) : true;
              }).length;
              const absent = totalPJ - attended;
              return { player: p, attended, absent };
            })
            .filter((item) => item.absent > 0);

          if (playerAbsences.length === 0) {
            txt += `• ${teamEmoji} ${t.name}: Asistencia perfecta (0 faltas)\n`;
          } else {
            const absentDetails = playerAbsences
              .map((item) => `#${item.player.dorsal} ${formatShortName(item.player.name)} (${item.absent} F)`)
              .join(', ');
            txt += `• ${teamEmoji} ${t.name}: ${absentDetails}\n`;
          }
        });
        txt += `\n`;
      }
    }

    if (includeNextFecha) {
      txt += `─── 🗓️ PRÓXIMA JORNADA (FECHA ${nextFecha}) ───\n`;
      txt += `📆 ${nextFechaDate}\n\n`;
      if (nextMatches.length === 0) {
        txt += `_Partidos por programar._\n`;
      } else {
        nextMatches.forEach((m, idx) => {
          const homeTeam = teams.find((t) => t.id === m.homeTeamId);
          const awayTeam = teams.find((t) => t.id === m.awayTeamId);
          const homeName = homeTeam?.name || m.homeTeamId;
          const awayName = awayTeam?.name || m.awayTeamId;
          const hEmoji = getTeamEmoji(m.homeTeamId);
          const aEmoji = getTeamEmoji(m.awayTeamId);
          const timeStr = m.time ? ` (${m.time})` : '';

          txt += `• P${idx + 1}: ${hEmoji} ${homeName}  vs  ${awayName} ${aEmoji}${timeStr}\n`;
        });
      }
      txt += `\n`;
    }

    txt += `───\n`;
    txt += `🏛️ Mesa Directiva - Campeonato Banquitas San Simón\n`;
    txt += `🌐 www.banquitassansimon.com`;
    return txt;
  };

  const handleCopyText = () => {
    const text = generateWhatsAppText();
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsGeneratingImage(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        quality: 1.0,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `Resumen_Oficial_Fecha_${currentFecha}_San_Simon.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generando imagen:', err);
      alert('Hubo un error al generar la imagen. Intenta de nuevo.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Modal Top Nav Header with Fecha Pagination */}
        <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-white font-mono uppercase tracking-wide flex items-center gap-1.5">
                <span>Compartir Reporte Oficial</span>
              </h2>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Personaliza la información y compártela como Texto o Imagen
              </p>
            </div>
          </div>

          {/* Fecha Navigator Pagination Control */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setSelectedFecha((prev) => Math.max(1, prev - 1))}
              disabled={selectedFecha <= 1}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:hover:bg-slate-800 transition cursor-pointer"
              title="Fecha Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-xs font-bold text-amber-400">
              Fecha #{selectedFecha}
            </span>
            <button
              onClick={() => setSelectedFecha((prev) => Math.min(maxFechaInMatches, prev + 1))}
              disabled={selectedFecha >= maxFechaInMatches}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 disabled:hover:bg-slate-800 transition cursor-pointer"
              title="Fecha Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'text'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Texto Formateado WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'image'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Imagen HD para Redes / WhatsApp</span>
          </button>
        </div>

        {/* Content Section Filter Toggles */}
        <div className="p-3 bg-slate-950/80 border-b border-slate-800 space-y-2 shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            Selecciona el contenido a incluir en la Fecha #{currentFecha}:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-[11px] font-mono">
            <button
              onClick={() => setIncludeResults(!includeResults)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer ${
                includeResults
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeResults ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">⚽ Resultados</span>
            </button>

            <button
              onClick={() => setIncludeStandings(!includeStandings)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer ${
                includeStandings
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeStandings ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">📊 Tabla</span>
            </button>

            <button
              onClick={() => setIncludeScorers(!includeScorers)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer ${
                includeScorers
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeScorers ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">🥇 Goleadores</span>
            </button>

            <button
              onClick={() => setIncludeCards(!includeCards)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer ${
                includeCards
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeCards ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">🟨 Tarjetas</span>
            </button>

            <button
              onClick={() => setIncludeAttendanceFecha(!includeAttendanceFecha)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer ${
                includeAttendanceFecha
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeAttendanceFecha ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">📋 Asist. Fecha</span>
            </button>

            <button
              onClick={() => setIncludeAttendanceConsolidated(!includeAttendanceConsolidated)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer ${
                includeAttendanceConsolidated
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeAttendanceConsolidated ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">📈 Consolidado</span>
            </button>

            <button
              onClick={() => setIncludeNextFecha(!includeNextFecha)}
              className={`p-1.5 rounded-xl border flex items-center gap-1 transition cursor-pointer col-span-2 sm:col-span-1 ${
                includeNextFecha
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              {includeNextFecha ? <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">📅 Próxima</span>
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-900">
          {activeTab === 'text' ? (
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  readOnly
                  value={generateWhatsAppText()}
                  rows={14}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500/50 leading-relaxed shadow-inner"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-mono">
                  Listo para pegar directamente en WhatsApp.
                </span>
                <button
                  onClick={handleCopyText}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  {copiedText ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedText ? '¡COPIADO AL PORTAPAPELES!' : 'COPIAR PARA WHATSAPP'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-mono font-bold">
                  Vista previa de la imagen exportable:
                </span>
                <button
                  onClick={handleDownloadImage}
                  disabled={isGeneratingImage}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingImage ? 'Generando Imagen...' : 'DESCARGAR IMAGEN (PNG)'}</span>
                </button>
              </div>

              {/* Rendered Visual Card Canvas */}
              <div className="overflow-x-auto p-2 bg-slate-950/80 rounded-2xl border border-slate-800 flex justify-center">
                <div
                  ref={cardRef}
                  className="w-full max-w-[520px] bg-[#fcfcfd] text-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-2xl space-y-4 font-sans antialiased"
                  style={{ backgroundColor: '#fcfcfd' }}
                >
                  {/* Header / Brand with 3D Silver Official Badge */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center shrink-0 shadow-sm">
                        <img src={tournamentLogo} alt="Logo" className="max-h-full max-w-full object-contain rounded-lg" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-sm sm:text-base font-black text-slate-950 uppercase tracking-tight leading-tight">
                          CAMPEONATO BANQUITAS SAN SIMÓN
                        </h2>
                        <p className="text-xs font-extrabold text-slate-600 mt-0.5">
                          Fecha {currentFecha} - {fechaDate}
                        </p>
                      </div>
                    </div>

                    {/* 3D Embossed Silver Official Badge */}
                    <div className="flex flex-col items-center justify-center px-3 py-1 rounded-xl bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 border border-slate-400/90 shadow-xs shrink-0 select-none">
                      <span className="text-[9px] leading-none text-slate-700">👑</span>
                      <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase leading-tight font-mono">
                        OFICIAL
                      </span>
                      <span className="text-[7px] text-slate-600 font-black tracking-widest leading-none">
                        ★★★
                      </span>
                    </div>
                  </div>

                  {/* Matches Grid (Resultados por Colores) */}
                  {includeResults && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b-2 border-slate-200">
                        <Swords className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                          RESULTADOS DE LA JORNADA
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {currentMatches.map((m, idx) => {
                          const home = teams.find((t) => t.id === m.homeTeamId);
                          const away = teams.find((t) => t.id === m.awayTeamId);

                          const isPlayed = m.status === 'FINALIZADO' || m.isPlayed;

                          return (
                            <div
                              key={m.id}
                              className="p-2.5 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/90 to-blue-50/20 text-slate-950 flex flex-col justify-between space-y-1.5 shadow-xs"
                            >
                              <span className="text-[9.5px] text-slate-400 font-mono font-bold block">
                                Partido #{idx + 1}
                              </span>
                              <div className="flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                  <TeamBadgeDot teamId={home?.id} teamName={home?.name} size="sm" />
                                </div>

                                <span
                                  className={`px-2.5 py-0.5 rounded-md font-black text-xs shrink-0 font-mono shadow-xs ${
                                    isPlayed
                                      ? 'bg-black text-white border border-amber-500/80'
                                      : 'bg-slate-200 text-slate-800'
                                  }`}
                                >
                                  {m.homeGoals ?? 0} - {m.awayGoals ?? 0}
                                </span>

                                <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end">
                                  <TeamBadgeDot teamId={away?.id} teamName={away?.name} size="sm" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Standings Summary (Zonas de Clasificación y Descenso) */}
                  {includeStandings && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b-2 border-slate-200">
                        <BarChart3 className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                          TABLA DE POSICIONES
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-2 text-xs overflow-hidden shadow-xs space-y-1">
                        <div className="grid grid-cols-12 font-black text-slate-500 border-b border-slate-200 pb-1.5 px-2 text-[9.5px] uppercase tracking-wider font-mono">
                          <span className="col-span-6">EQUIPO</span>
                          <span className="col-span-2 text-center">PJ</span>
                          <span className="col-span-2 text-center">DG</span>
                          <span className="col-span-2 text-center text-slate-800 bg-slate-100 rounded-md py-0.5">PTS</span>
                        </div>
                        {standings.slice(0, 8).map((s, i) => {
                          const isLeader = i === 0;

                          return (
                            <div
                              key={s.teamId}
                              className={`grid grid-cols-12 py-1.5 px-2 text-slate-950 items-center transition rounded-xl ${
                                isLeader
                                  ? 'bg-gradient-to-r from-[#fbe7c6] via-[#fde8c8] to-[#e4b568]/90 border border-amber-300/80 font-bold shadow-2xs'
                                  : 'border-b border-slate-100 hover:bg-slate-50/60'
                              }`}
                            >
                              <div className="col-span-6 font-bold truncate flex items-center gap-1.5 text-xs">
                                <span className="font-mono text-[11px] text-slate-500 w-3 text-right">
                                  {i + 1}.
                                </span>
                                <TeamBadgeDot teamId={s.teamId} teamName={s.teamName} size="sm" />
                                {isLeader && <span className="text-xs">🏅 🏆</span>}
                              </div>
                              <span className="col-span-2 text-center text-slate-700 font-mono text-[11px] font-bold">
                                {s.pj}
                              </span>
                              <span className="col-span-2 text-center text-slate-800 font-mono text-[11px] font-bold">
                                {s.dg >= 0 ? `+${s.dg}` : s.dg}
                              </span>
                              <div className="col-span-2 flex justify-center">
                                <span
                                  className={`min-w-[28px] py-0.5 text-center font-black text-xs font-mono rounded-md shadow-2xs ${
                                    isLeader
                                      ? 'bg-[#b8860b] text-white px-2'
                                      : 'text-slate-950 bg-slate-100/90 px-1.5'
                                  }`}
                                >
                                  {s.pts}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Top Scorers Summary with Golden Boot Header */}
                  {includeScorers && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b-2 border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                            TOP GOLEADORES DE LA TEMPORADA
                          </span>
                        </div>
                        <span className="text-xl leading-none select-none drop-shadow-xs" title="Bota de Oro">
                          👞⚽
                        </span>
                      </div>
                      <div className="bg-transparent text-xs">
                        {topScorers.length === 0 ? (
                          <div className="bg-white rounded-2xl border border-slate-200 p-3 text-center">
                            <p className="text-slate-500 text-xs italic font-mono">Sin goles registrados.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {topScorers.map((p, idx) => {
                              const teamObj = teams.find((t) => t.id === p.teamId);
                              return (
                                <div
                                  key={p.playerId}
                                  className="flex items-center justify-between p-2 rounded-2xl bg-white border-2 border-amber-400/80 ring-1 ring-amber-200/70 shadow-xs"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="min-w-[28px] h-7 px-1.5 rounded-lg bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/50 text-amber-400 font-mono font-black text-[11px] flex items-center justify-center shrink-0 shadow-xs">
                                      #{p.dorsal}
                                    </span>
                                    <div className="min-w-0">
                                      <p className="font-black text-slate-950 truncate text-[11px] leading-tight uppercase">
                                        {p.name}
                                      </p>
                                      <div className="mt-0.5">
                                        <TeamBadgeDot teamId={p.teamId} teamName={teamObj?.name} size="sm" />
                                      </div>
                                    </div>
                                  </div>
                                  <GoalBallBadge goals={p.goles} size="md" />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cards & Suspensions Summary */}
                  {includeCards && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b-2 border-slate-200">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                          TARJETAS Y SANCIONES
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-2.5 text-xs space-y-2.5 shadow-xs">
                        {/* Cards in Fecha */}
                        <div>
                          <p className="text-[9.5px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                            Amonestaciones Fecha #{currentFecha}:
                          </p>
                          {cardsInFecha.length === 0 ? (
                            <p className="text-slate-500 text-xs italic font-mono">Sin amonestaciones registradas.</p>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {cardsInFecha.map((c, i) => {
                                const player = players.find((p) => p.id === c.playerId);
                                const teamObj = teams.find((t) => t.id === player?.teamId);
                                return (
                                  <span
                                    key={i}
                                    className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[9.5px] font-bold text-slate-950 flex items-center gap-1.5 shadow-xs"
                                  >
                                    <CardIconVector type={c.type} />
                                    <span>#{player?.dorsal} {player?.name}</span>
                                    <TeamBadgeDot teamId={player?.teamId} teamName={teamObj?.name} size="sm" showName={false} />
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Suspensions for Next Fecha */}
                        {nextFechaSuspensions.length > 0 && (
                          <div className="pt-2 border-t-2 border-slate-200">
                            <p className="text-[9.5px] font-black text-red-900 uppercase tracking-wider mb-1.5 flex items-center gap-1 font-mono">
                              <span>⚠️ Suspendidos Próxima Fecha (#{nextFecha}):</span>
                            </p>
                            <div className="space-y-1">
                              {nextFechaSuspensions.map((s, idx) => {
                                const teamObj = teams.find((t) => t.id === s.teamId);
                                const cardCount = s.cardCount || 3;
                                const reasonLabel = s.reason === '1_ROJA' ? 'Tarjeta Roja Directa' : `${cardCount} Tarjetas`;
                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between text-[9.5px] bg-red-50 border border-red-300 p-1.5 rounded-lg text-red-950 font-bold"
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2 h-3.5 rounded-xs bg-red-600 inline-block shadow-2xs"></span>
                                      <span className="font-extrabold">
                                        #{s.dorsal} {s.playerName}
                                      </span>
                                      <TeamBadgeDot teamId={s.teamId} teamName={teamObj?.name} size="sm" showName={false} />
                                      <span className="text-[8.5px] text-red-800 font-mono font-medium">({teamObj?.name || s.teamId})</span>
                                    </div>
                                    <span className="font-black text-red-700 font-mono text-[9px] bg-red-100 px-1 py-0.5 rounded border border-red-200">
                                      {reasonLabel}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-[8.5px] text-slate-500 font-mono italic mt-1 text-right">
                              * La suspensión vence al finalizar la jornada o pagar la sanción respectiva.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Attendance for current Fecha */}
                  {includeAttendanceFecha && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b-2 border-slate-200">
                        <UserCheck className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                          CONTROL DE ASISTENCIA FECHA #{currentFecha}
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-2.5 text-xs space-y-2 font-mono shadow-xs">
                        {currentMatches.map((m) => {
                          const home = teams.find((t) => t.id === m.homeTeamId);
                          const away = teams.find((t) => t.id === m.awayTeamId);
                          if (!home || !away) return null;

                          const homePlayers = players.filter((p) => p.teamId === home.id);
                          const awayPlayers = players.filter((p) => p.teamId === away.id);

                          const homeAtt = m.attendance?.homePlayerIds;
                          const awayAtt = m.attendance?.awayPlayerIds;

                          const homeAbsent = homeAtt ? homePlayers.filter((p) => !homeAtt.includes(p.id)) : [];
                          const awayAbsent = awayAtt ? awayPlayers.filter((p) => !awayAtt.includes(p.id)) : [];

                          return (
                            <div key={m.id} className="p-2 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-950">
                                <div className="flex items-center gap-1">
                                  <TeamBadgeDot teamId={home.id} teamName={home.name} size="sm" />
                                  <span className="font-semibold text-slate-700">({homeAtt ? homeAtt.length : homePlayers.length}/{homePlayers.length})</span>
                                </div>
                                <span className="text-slate-400 font-mono text-[9px] font-extrabold">VS</span>
                                <div className="flex items-center gap-1">
                                  <TeamBadgeDot teamId={away.id} teamName={away.name} size="sm" />
                                  <span className="font-semibold text-slate-700">({awayAtt ? awayAtt.length : awayPlayers.length}/{awayPlayers.length})</span>
                                </div>
                              </div>
                              {(homeAbsent.length > 0 || awayAbsent.length > 0) && (
                                <div className="text-[9px] space-y-0.5 pt-1 border-t border-slate-200 font-mono">
                                  {homeAbsent.length > 0 && (
                                    <p className="text-red-900 bg-red-50/80 px-1.5 py-0.5 rounded border border-red-200">
                                      <span className="font-black text-red-950">Ausentes {home.name}:</span>{' '}
                                      {homeAbsent.map((p) => `#${p.dorsal} ${p.name}`).join(', ')}
                                    </p>
                                  )}
                                  {awayAbsent.length > 0 && (
                                    <p className="text-red-900 bg-red-50/80 px-1.5 py-0.5 rounded border border-red-200">
                                      <span className="font-black text-red-950">Ausentes {away.name}:</span>{' '}
                                      {awayAbsent.map((p) => `#${p.dorsal} ${p.name}`).join(', ')}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Attendance Consolidated */}
                  {includeAttendanceConsolidated && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b-2 border-slate-200">
                        <UserCheck className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                          CONSOLIDADO GENERAL DE ASISTENCIA
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl border border-slate-200 p-2.5 text-xs space-y-1.5 font-mono shadow-xs">
                        {teams.map((t) => {
                          const teamPlayers = players.filter((p) => p.teamId === t.id);
                          const teamMatches = matches.filter(
                            (m) =>
                              (m.homeTeamId === t.id || m.awayTeamId === t.id) &&
                              (m.isPlayed || m.status === 'FINALIZADO')
                          );
                          const totalPJ = teamMatches.length;

                          if (totalPJ === 0) return null;

                          const absentPlayers = teamPlayers
                            .map((p) => {
                              const attended = teamMatches.filter((m) => {
                                const isHome = m.homeTeamId === t.id;
                                const attIds = isHome ? m.attendance?.homePlayerIds : m.attendance?.awayPlayerIds;
                                return attIds ? attIds.includes(p.id) : true;
                              }).length;
                              const absent = totalPJ - attended;
                              return { player: p, attended, absent };
                            })
                            .filter((item) => item.absent > 0);

                          return (
                            <div key={t.id} className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[9.5px] text-slate-950">
                              <div className="flex items-center justify-between font-bold">
                                <TeamBadgeDot teamId={t.id} teamName={`${t.name} (${totalPJ} PJ)`} size="sm" />
                                {absentPlayers.length === 0 ? (
                                  <span className="text-emerald-700 font-black">✅ 100% Asistencia</span>
                                ) : (
                                  <span className="text-amber-800 font-black">{absentPlayers.length} Con Faltas</span>
                                )}
                              </div>
                              {absentPlayers.length > 0 && (
                                <p className="text-slate-700 text-[9px] mt-0.5 truncate">
                                  <span className="text-red-700 font-black">Ausentes:</span>{' '}
                                  {absentPlayers.map((a) => `#${a.player.dorsal} ${a.player.name} (${a.absent}F)`).join(', ')}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Next Fecha Schedule Summary with 3D Calendar Header */}
                  {includeNextFecha && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b-2 border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                            PRÓXIMA JORNADA - FECHA #{nextFecha} ({nextFechaDate})
                          </span>
                        </div>
                        <span className="text-xl leading-none select-none drop-shadow-xs" title="Calendario">
                          🗓️
                        </span>
                      </div>
                      <div className="bg-transparent text-xs">
                        {nextMatches.length === 0 ? (
                          <div className="bg-white rounded-2xl border border-slate-200 p-3 text-center">
                            <p className="text-slate-500 text-xs italic font-mono">Partidos por programar.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {nextMatches.map((m, idx) => {
                              const home = teams.find((t) => t.id === m.homeTeamId);
                              const away = teams.find((t) => t.id === m.awayTeamId);
                              return (
                                <div
                                  key={m.id}
                                  className="bg-gradient-to-b from-slate-50/90 to-blue-50/20 p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-1.5"
                                >
                                  <div className="flex items-center justify-between text-[9.5px] text-slate-400 font-bold font-mono">
                                    <span>Partido #{idx + 1}</span>
                                    {m.time && <span className="text-slate-950 font-black font-mono">⏰ {m.time}</span>}
                                  </div>
                                  <div className="flex items-center justify-between gap-1 text-[11px]">
                                    <TeamBadgeDot teamId={home?.id} teamName={home?.name} size="sm" />
                                    <span className="text-slate-400 font-black text-[10px] font-mono">vs</span>
                                    <TeamBadgeDot teamId={away?.id} teamName={away?.name} size="sm" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono font-bold">
                    <span>Mesa Directiva San Simón</span>
                    <span>www.sansimon.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
