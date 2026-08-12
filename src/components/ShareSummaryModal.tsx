import React, { useRef, useState, useEffect } from 'react';
import { Match, Player, Team, CardRecord, GoalRecord, SuspensionAlert } from '../types';
import { getFechaFullTitle, FECHA_DATES } from '../utils/fechas';
import { computeStandings, computePlayerStats, groupGoalsByPlayer } from '../utils/sanctionsEngine';
import { toPng } from 'html-to-image';
import { TeamBadgeDot, CardIconVector, getTeamEmoji, getTeamColorHex } from './TeamColorDot';
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
  
  // Calculate top scorers and cards in selected fecha
  const { stats } = computePlayerStats(players, cards, goals, currentFecha);
  const topScorers = stats
    .filter((s) => s.goles > 0)
    .sort((a, b) => b.goles - a.goles || a.name.localeCompare(b.name))
    .slice(0, 6);

  // Cards shown in selected fecha
  const cardsInFecha = cards.filter((c) => c.fecha === currentFecha);

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

      if (activeSuspensions.length > 0) {
        txt += `⚠️ *JUGADORES SUSPENDIDOS (PRÓXIMA FECHA):*\n`;
        activeSuspensions.forEach((s) => {
          const teamEmoji = getTeamEmoji(s.teamId);
          const teamObj = teams.find((t) => t.id === s.teamId);
          txt += `• ⛔ #${s.dorsal} ${s.playerName} (${teamEmoji} ${teamObj?.name || s.teamId}) ➔ ${
            s.reason === '3_AMARILLAS' ? '3 Amarillas acumuladas' : 'Tarjeta Roja Directa'
          }\n`;
        });
        txt += `\n`;
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
        quality: 0.95,
        backgroundColor: '#090d16',
      });
      const link = document.createElement('a');
      link.download = `Resumen_Fecha_${currentFecha}_San_Simon.png`;
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
              <div className="overflow-x-auto p-2 bg-slate-950/60 rounded-2xl border border-slate-800 flex justify-center">
                <div
                  ref={cardRef}
                  className="w-full max-w-[500px] bg-slate-950 text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-2xl space-y-3 font-sans"
                  style={{ backgroundColor: '#090d16' }}
                >
                  {/* Header / Brand */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-amber-500/40 p-0.5 flex items-center justify-center shrink-0">
                        <img src={tournamentLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-tight leading-tight">
                          CAMPEONATO BANQUITAS SAN SIMÓN
                        </h2>
                        <p className="text-[11px] font-extrabold text-slate-200 mt-0.5">
                          {getFechaFullTitle(currentFecha)}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shrink-0 shadow">
                      OFICIAL
                    </span>
                  </div>

                  {/* Matches Grid (Resultados por Colores) */}
                  {includeResults && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <Swords className="w-3.5 h-3.5 text-amber-400" />
                        <span>RESULTADOS DE LA JORNADA</span>
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {currentMatches.map((m, idx) => {
                          const home = teams.find((t) => t.id === m.homeTeamId);
                          const away = teams.find((t) => t.id === m.awayTeamId);

                          const isPlayed = m.status === 'FINALIZADO' || m.isPlayed;
                          const homeWins = isPlayed && m.homeGoals! > m.awayGoals!;
                          const awayWins = isPlayed && m.awayGoals! > m.homeGoals!;
                          const isDraw = isPlayed && m.homeGoals! === m.awayGoals!;

                          return (
                            <div
                              key={m.id}
                              className={`p-2 rounded-xl border transition-all flex flex-col justify-between space-y-1 ${
                                isDraw
                                  ? 'bg-slate-900/90 border-slate-800'
                                  : homeWins
                                  ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-rose-950/30 border-emerald-500/40'
                                  : awayWins
                                  ? 'bg-gradient-to-r from-rose-950/30 via-slate-900 to-emerald-950/80 border-emerald-500/40'
                                  : 'bg-slate-900/90 border-slate-800'
                              }`}
                            >
                              <span className="text-[9px] text-slate-400 font-mono font-bold block">
                                Partido #{idx + 1}
                              </span>
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-1 min-w-0 flex-1">
                                  <TeamBadgeDot teamId={home?.id} teamName={home?.name} size="sm" />
                                </div>

                                <span
                                  className={`px-1.5 py-0.5 rounded font-black text-[11px] shrink-0 font-mono shadow-xs ${
                                    isPlayed
                                      ? 'bg-amber-500 text-slate-950'
                                      : 'bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  {m.homeGoals} - {m.awayGoals}
                                </span>

                                <div className="flex items-center gap-1 min-w-0 flex-1 justify-end">
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
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                        <span>TABLA DE POSICIONES</span>
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-xs overflow-hidden">
                        <div className="grid grid-cols-12 font-bold text-slate-400 border-b border-slate-800 pb-1 text-[9px] uppercase tracking-wider font-mono">
                          <span className="col-span-6">EQUIPO</span>
                          <span className="col-span-2 text-center">PJ</span>
                          <span className="col-span-2 text-center">DG</span>
                          <span className="col-span-2 text-center text-amber-300 bg-amber-500/10 rounded">PTS</span>
                        </div>
                        {standings.slice(0, 8).map((s, i) => {
                          const isLeader = i === 0;
                          const isTopFour = i >= 1 && i <= 3;
                          const isBottomTwo = i >= 6;

                          const zoneBorderClass = isLeader
                            ? 'border-l-4 border-l-amber-400 bg-amber-500/10'
                            : isTopFour
                            ? 'border-l-4 border-l-emerald-500/80 bg-emerald-950/20'
                            : isBottomTwo
                            ? 'border-l-4 border-l-rose-500/80 bg-rose-950/20'
                            : 'border-l-4 border-l-slate-700/60 bg-slate-900/40';

                          return (
                            <div
                              key={s.teamId}
                              className={`grid grid-cols-12 py-1 px-1 border-b border-slate-800/40 text-slate-200 items-center transition ${zoneBorderClass}`}
                            >
                              <div className="col-span-6 font-bold truncate flex items-center gap-1 text-[11px]">
                                <span className="font-mono text-[10px] text-slate-400 w-4 text-right">
                                  {i + 1}.
                                </span>
                                <TeamBadgeDot teamId={s.teamId} teamName={s.teamName} size="sm" />
                                {isLeader && <span className="text-[10px]">🥇</span>}
                              </div>
                              <span className="col-span-2 text-center text-slate-400 font-mono text-[10px]">{s.pj}</span>
                              <span className="col-span-2 text-center text-slate-400 font-mono text-[10px]">
                                {s.dg >= 0 ? `+${s.dg}` : s.dg}
                              </span>
                              <span className="col-span-2 text-center font-black text-amber-300 text-xs font-mono bg-amber-500/10 rounded">
                                {s.pts}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Top Scorers Summary */}
                  {includeScorers && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>TOP GOLEADORES DE LA TEMPORADA</span>
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-xs">
                        {topScorers.length === 0 ? (
                          <p className="text-slate-400 text-[10px] text-center py-1 font-mono">Sin goles registrados.</p>
                        ) : (
                          <div className="grid grid-cols-2 gap-1.5">
                            {topScorers.map((p, idx) => {
                              const teamObj = teams.find((t) => t.id === p.teamId);
                              return (
                                <div
                                  key={p.playerId}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/80 border border-slate-800/80"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="font-extrabold text-amber-400 text-[10px] font-mono">
                                      #{p.dorsal}
                                    </span>
                                    <div className="min-w-0">
                                      <p className="font-bold text-slate-100 truncate text-[10px] leading-tight">
                                        {p.name}
                                      </p>
                                      <div className="mt-0.5">
                                        <TeamBadgeDot teamId={p.teamId} teamName={teamObj?.name} size="sm" />
                                      </div>
                                    </div>
                                  </div>
                                  <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-[10px] rounded-md shrink-0 font-mono">
                                    ⚽ {p.goles}
                                  </span>
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
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>TARJETAS Y SANCIONES</span>
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-xs space-y-2">
                        {/* Cards in Fecha */}
                        <div>
                          <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                            Amonestaciones Fecha #{currentFecha}:
                          </p>
                          {cardsInFecha.length === 0 ? (
                            <p className="text-slate-400 text-[10px] italic font-mono">Sin amonestaciones registradas.</p>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {cardsInFecha.map((c, i) => {
                                const player = players.find((p) => p.id === c.playerId);
                                const teamObj = teams.find((t) => t.id === player?.teamId);
                                return (
                                  <span
                                    key={i}
                                    className="px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[9px] font-bold text-slate-200 flex items-center gap-1.5"
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

                        {/* Active Suspensions for Next Fecha */}
                        {activeSuspensions.length > 0 && (
                          <div className="pt-1.5 border-t border-slate-800">
                            <p className="text-[9px] font-extrabold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1 font-mono">
                              <span>⚠️ Suspendidos Próxima Fecha:</span>
                            </p>
                            <div className="space-y-1">
                              {activeSuspensions.map((s, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-[9px] bg-rose-950/40 border border-rose-900/50 p-1.5 rounded-md text-rose-200"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <CardIconVector type={s.reason === '3_AMARILLAS' ? 'AMARILLA' : 'ROJA'} />
                                    <span className="font-bold">
                                      #{s.dorsal} {s.playerName}
                                    </span>
                                    <TeamBadgeDot teamId={s.teamId} size="sm" showName={false} />
                                  </div>
                                  <span className="font-semibold text-rose-300 font-mono">
                                    {s.reason === '3_AMARILLAS' ? '3 Amarillas' : 'Roja Directa'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Attendance for current Fecha */}
                  {includeAttendanceFecha && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>CONTROL DE ASISTENCIA FECHA #{currentFecha}</span>
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-xs space-y-1.5 font-mono">
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
                            <div key={m.id} className="p-1.5 bg-slate-950/80 rounded-lg border border-slate-800/80 space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-200">
                                <div className="flex items-center gap-1">
                                  <TeamBadgeDot teamId={home.id} teamName={home.name} size="sm" />
                                  <span>({homeAtt ? homeAtt.length : homePlayers.length}/{homePlayers.length})</span>
                                </div>
                                <span className="text-slate-500 font-mono text-[9px]">VS</span>
                                <div className="flex items-center gap-1">
                                  <TeamBadgeDot teamId={away.id} teamName={away.name} size="sm" />
                                  <span>({awayAtt ? awayAtt.length : awayPlayers.length}/{awayPlayers.length})</span>
                                </div>
                              </div>
                              {(homeAbsent.length > 0 || awayAbsent.length > 0) && (
                                <div className="text-[9px] space-y-0.5 pt-1 border-t border-slate-800/60 font-mono">
                                  {homeAbsent.length > 0 && (
                                    <p className="text-rose-300">
                                      <span className="font-bold text-rose-400">Ausentes {home.name}:</span>{' '}
                                      {homeAbsent.map((p) => `#${p.dorsal} ${p.name}`).join(', ')}
                                    </p>
                                  )}
                                  {awayAbsent.length > 0 && (
                                    <p className="text-rose-300">
                                      <span className="font-bold text-rose-400">Ausentes {away.name}:</span>{' '}
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
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>CONSOLIDADO GENERAL DE ASISTENCIA</span>
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-xs space-y-1 font-mono">
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
                            <div key={t.id} className="p-1 bg-slate-950/80 rounded border border-slate-800/80 text-[9px]">
                              <div className="flex items-center justify-between font-bold">
                                <TeamBadgeDot teamId={t.id} teamName={`${t.name} (${totalPJ} PJ)`} size="sm" />
                                {absentPlayers.length === 0 ? (
                                  <span className="text-emerald-400 font-extrabold">✅ 100% Asistencia</span>
                                ) : (
                                  <span className="text-orange-400 font-extrabold">{absentPlayers.length} Con Faltas</span>
                                )}
                              </div>
                              {absentPlayers.length > 0 && (
                                <p className="text-slate-300 text-[8.5px] mt-0.5 truncate">
                                  <span className="text-slate-400 font-bold">Ausentes:</span>{' '}
                                  {absentPlayers.map((a) => `#${a.player.dorsal} ${a.player.name} (${a.absent}F)`).join(', ')}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Next Fecha Schedule Summary */}
                  {includeNextFecha && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/80 pb-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>PRÓXIMA JORNADA - FECHA #{nextFecha} ({nextFechaDate})</span>
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-xs">
                        {nextMatches.length === 0 ? (
                          <p className="text-slate-400 text-[10px] text-center py-1 italic font-mono">Partidos por programar.</p>
                        ) : (
                          <div className="grid grid-cols-2 gap-1.5">
                            {nextMatches.map((m, idx) => {
                              const home = teams.find((t) => t.id === m.homeTeamId);
                              const away = teams.find((t) => t.id === m.awayTeamId);
                              return (
                                <div
                                  key={m.id}
                                  className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80 flex flex-col justify-between"
                                >
                                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold mb-1 font-mono">
                                    <span>Partido #{idx + 1}</span>
                                    {m.time && <span className="text-amber-400 font-semibold">{m.time}</span>}
                                  </div>
                                  <div className="flex items-center justify-between gap-1 text-[10px]">
                                    <TeamBadgeDot teamId={home?.id} teamName={home?.name} size="sm" />
                                    <span className="text-slate-500 font-black text-[9px] font-mono">VS</span>
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
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
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
