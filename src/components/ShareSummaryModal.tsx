import React, { useRef, useState } from 'react';
import { Match, Player, Team, CardRecord, GoalRecord, SuspensionAlert } from '../types';
import { getFechaFullTitle, FECHA_DATES } from '../utils/fechas';
import { computeStandings, computePlayerStats, groupGoalsByPlayer } from '../utils/sanctionsEngine';
import { toPng } from 'html-to-image';
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
  currentFecha,
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

  // Section toggle options for sharing
  const [includeResults, setIncludeResults] = useState(true);
  const [includeStandings, setIncludeStandings] = useState(true);
  const [includeScorers, setIncludeScorers] = useState(true);
  const [includeCards, setIncludeCards] = useState(true);
  const [includeAttendanceFecha, setIncludeAttendanceFecha] = useState(true);
  const [includeAttendanceConsolidated, setIncludeAttendanceConsolidated] = useState(false);
  const [includeNextFecha, setIncludeNextFecha] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentMatches = matches.filter((m) => m.fecha === currentFecha);
  const nextFecha = currentFecha + 1;
  const nextMatches = matches.filter((m) => m.fecha === nextFecha);
  const fechaDate = FECHA_DATES[currentFecha] || 'Fecha Programada';
  const nextFechaDate = FECHA_DATES[nextFecha] || 'Por Programar';
  const standings = computeStandings(teams, matches, cards, players);
  
  // Calculate top scorers and cards in fecha
  const { stats } = computePlayerStats(players, cards, goals, currentFecha);
  const topScorers = stats
    .filter((s) => s.goles > 0)
    .sort((a, b) => b.goles - a.goles || a.name.localeCompare(b.name))
    .slice(0, 6);

  // Cards shown in current fecha
  const cardsInFecha = cards.filter((c) => c.fecha === currentFecha);

  // Generate formatted WhatsApp Text
  const generateWhatsAppText = () => {
    let txt = `🏆 *CAMPEONATO BANQUITAS SAN SIMÓN*\n`;
    txt += `📅 *${getFechaFullTitle(currentFecha).toUpperCase()}*\n`;
    txt += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (includeResults) {
      txt += `⚽ *RESULTADOS DE LA FECHA:*\n`;
      currentMatches.forEach((m, idx) => {
        const homeTeam = teams.find((t) => t.id === m.homeTeamId)?.name || m.homeTeamId;
        const awayTeam = teams.find((t) => t.id === m.awayTeamId)?.name || m.awayTeamId;
        const statusStr =
          m.status === 'FINALIZADO' || m.isPlayed
            ? ' (Fin)'
            : m.status === 'EN_VIVO'
            ? ' (🔴 En Vivo)'
            : ' (Prog)';

        txt += `*P${idx + 1}:* ${homeTeam} *${m.homeGoals} - ${m.awayGoals}* ${awayTeam}${statusStr}\n`;

        // Goals summary
        const matchPlayers = players.filter((p) => p.teamId === m.homeTeamId || p.teamId === m.awayTeamId);
        const matchGoals = goals.filter((g) => g.fecha === currentFecha && matchPlayers.some((p) => p.id === g.playerId));
        if (matchGoals.length > 0) {
          const goalList = groupGoalsByPlayer(matchGoals, players)
            .map(({ player: p, count }) => `${p ? `#${p.dorsal} ${p.name}` : 'Gol'} (${'⚽'.repeat(count)})`)
            .join(', ');
          txt += `   └ ⚽ _${goalList}_\n`;
        }
      });
      txt += `\n`;
    }

    if (includeStandings) {
      txt += `📊 *TABLA DE POSICIONES:*\n`;
      txt += `\`Pos  Equipo         PJ  PTS  DG\`\n`;
      standings.slice(0, 8).forEach((s, i) => {
        const pos = i + 1;
        const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `${pos}.`;
        const namePad = s.teamName.padEnd(12, ' ').substring(0, 12);
        const pjPad = String(s.pj).padStart(2, ' ');
        const ptsPad = String(s.pts).padStart(3, ' ');
        const dgPad = (s.dg >= 0 ? `+${s.dg}` : String(s.dg)).padStart(3, ' ');
        txt += `${medal} ${namePad} | ${pjPad} | ${ptsPad} | ${dgPad}\n`;
      });
      txt += `\n`;
    }

    if (includeScorers) {
      txt += `🥇 *TOP GOLEADORES DE LA TEMPORADA:*\n`;
      if (topScorers.length === 0) {
        txt += `_Aún no hay goles registrados._\n`;
      } else {
        topScorers.forEach((p, idx) => {
          const teamObj = teams.find((t) => t.id === p.teamId);
          const posBadge = idx === 0 ? '👑' : `#${idx + 1}`;
          txt += `${posBadge} *#${p.dorsal} ${p.name}* (${teamObj?.name || p.teamId}) → *${p.goles} Goles ⚽*\n`;
        });
      }
      txt += `\n`;
    }

    if (includeCards) {
      txt += `🟨 *REPORTE DE TARJETAS Y SANCIÓNES:*\n`;
      if (cardsInFecha.length > 0) {
        txt += `_Tarjetas en la Fecha ${currentFecha}:_\n`;
        cardsInFecha.forEach((c) => {
          const player = players.find((p) => p.id === c.playerId);
          const icon = c.type === 'AMARILLA' ? '🟨' : c.type === 'AZUL' ? '🟦' : '🟥';
          txt += `• ${icon} *#${player?.dorsal || ''} ${player?.name || 'Jugador'}* (${player?.teamId || ''})\n`;
        });
      }

      if (activeSuspensions.length > 0) {
        txt += `\n⚠️ *JUGADORES SUSPENDIDOS (PRÓXIMA FECHA):*\n`;
        activeSuspensions.forEach((s) => {
          txt += `• ⛔ *#${s.dorsal} ${s.playerName}* (${s.teamId}) → ${
            s.reason === '3_AMARILLAS' ? '3 Amarillas acumuladas' : 'Tarjeta Roja Directa'
          }\n`;
        });
      } else if (cardsInFecha.length === 0) {
        txt += `_Sin tarjetas ni suspensiones en esta jornada._\n`;
      }
      txt += `\n`;
    }

    if (includeAttendanceFecha) {
      txt += `📋 *CONTROL DE ASISTENCIA - FECHA #${currentFecha}:*\n`;
      let registeredAny = false;

      currentMatches.forEach((m) => {
        const homeTeam = teams.find((t) => t.id === m.homeTeamId);
        const awayTeam = teams.find((t) => t.id === m.awayTeamId);
        if (!homeTeam || !awayTeam) return;

        const homePlayers = players.filter((p) => p.teamId === homeTeam.id);
        const awayPlayers = players.filter((p) => p.teamId === awayTeam.id);

        const homeAtt = m.attendance?.homePlayerIds;
        const awayAtt = m.attendance?.awayPlayerIds;

        if (homeAtt || awayAtt) {
          registeredAny = true;
          const hCount = homeAtt ? homeAtt.length : homePlayers.length;
          const aCount = awayAtt ? awayAtt.length : awayPlayers.length;

          txt += `*${homeTeam.name}* (${hCount}/${homePlayers.length}) vs *${awayTeam.name}* (${aCount}/${awayPlayers.length})\n`;

          if (homeAtt) {
            const homeAbsent = homePlayers.filter((p) => !homeAtt.includes(p.id));
            if (homeAbsent.length > 0) {
              txt += ` └ ❌ _Ausentes ${homeTeam.name}:_ ${homeAbsent.map((p) => `#${p.dorsal} ${p.name}`).join(', ')}\n`;
            } else {
              txt += ` └ ✅ _${homeTeam.name}: 100% Asistentes_\n`;
            }
          }

          if (awayAtt) {
            const awayAbsent = awayPlayers.filter((p) => !awayAtt.includes(p.id));
            if (awayAbsent.length > 0) {
              txt += ` └ ❌ _Ausentes ${awayTeam.name}:_ ${awayAbsent.map((p) => `#${p.dorsal} ${p.name}`).join(', ')}\n`;
            } else {
              txt += ` └ ✅ _${awayTeam.name}: 100% Asistentes_\n`;
            }
          }
        }
      });

      if (!registeredAny) {
        txt += `_Sin registro especial de inasistencias en esta jornada._\n`;
      }
      txt += `\n`;
    }

    if (includeAttendanceConsolidated) {
      txt += `📈 *CONSOLIDADO GENERAL DE ASISTENCIA (CORTE FECHA #${currentFecha}):*\n`;
      teams.forEach((t) => {
        const teamPlayers = players.filter((p) => p.teamId === t.id);
        const teamPlayedMatches = matches.filter(
          (m) =>
            (m.homeTeamId === t.id || m.awayTeamId === t.id) &&
            (m.isPlayed || m.status === 'FINALIZADO')
        );
        const totalPJ = teamPlayedMatches.length;

        if (totalPJ === 0) {
          txt += `• *${t.name}:* _Sin partidos jugados_\n`;
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
          txt += `• *${t.name}:* ✅ 100% Asistencia Perfecta (${totalPJ} PJ)\n`;
        } else {
          const absentDetails = playerAbsences
            .map((item) => `#${item.player.dorsal} ${item.player.name} (${item.absent} F)`)
            .join(', ');
          txt += `• *${t.name}:* ⚠️ Faltas: ${absentDetails}\n`;
        }
      });
      txt += `\n`;
    }

    if (includeNextFecha) {
      txt += `📅 *PRÓXIMA JORNADA - FECHA #${nextFecha}* (${nextFechaDate}):\n`;
      if (nextMatches.length === 0) {
        txt += `_Partidos por programar._\n`;
      } else {
        nextMatches.forEach((m, idx) => {
          const homeTeam = teams.find((t) => t.id === m.homeTeamId)?.name || m.homeTeamId;
          const awayTeam = teams.find((t) => t.id === m.awayTeamId)?.name || m.awayTeamId;
          const timeStr = m.time ? ` ⏰ ${m.time}` : '';
          txt += `• *P${idx + 1}:* ${homeTeam} vs ${awayTeam}${timeStr}\n`;
        });
      }
      txt += `\n`;
    }

    txt += `📌 _Información oficial de la Mesa Directiva - San Simón_`;
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
    try {
      setIsGeneratingImage(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        backgroundColor: '#020617',
      });
      const link = document.createElement('a');
      link.download = `Resumen_San_Simon_Fecha_${currentFecha}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Error al generar la imagen. Inténtelo de nuevo.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl text-slate-100 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base font-mono">
                COMPARTIR RESUMEN - FECHA #{currentFecha}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Personaliza y genera texto o imagen para WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Toggle Filter Controls */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
            Selecciona el contenido a incluir en el resumen:
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
              <span className="truncate">📊 Posiciones</span>
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
              <span className="truncate">📅 Próx. Fecha</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-2 bg-slate-900 border-b border-slate-800 flex gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 px-3 rounded-xl font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'text'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Texto Formateado WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 px-3 rounded-xl font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'image'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Imagen PNG para WhatsApp</span>
          </button>
        </div>

        {/* Body Viewport */}
        <div className="p-4 overflow-y-auto space-y-4">
          {activeTab === 'text' ? (
            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-300 whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed selection:bg-emerald-500 selection:text-slate-950">
                {generateWhatsAppText()}
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  Copie y pegue directamente en su chat de WhatsApp.
                </span>
                <button
                  onClick={handleCopyText}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer font-mono shrink-0"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>¡COPIADO AL PORTAPAPELES!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPIAR PARA WHATSAPP</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 font-mono">
                  Vista previa de la tarjeta gráfica resumen:
                </p>
                <button
                  onClick={handleDownloadImage}
                  disabled={isGeneratingImage}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer font-mono disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingImage ? 'GENERANDO...' : 'DESCARGAR IMAGEN PNG'}</span>
                </button>
              </div>

              {/* Graphical Card Renderable Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl bg-slate-950 p-2 sm:p-4 flex justify-center">
                <div
                  ref={cardRef}
                  className="w-[540px] p-5 sm:p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-mono space-y-4 rounded-2xl border border-slate-800/80 shrink-0"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-amber-500/40 pb-3 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl border border-amber-500/50 p-1 bg-slate-900 flex items-center justify-center shrink-0 shadow-md">
                        <img src={tournamentLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-tight leading-tight">
                          CAMPEONATO BANQUITAS SAN SIMÓN
                        </h2>
                        <p className="text-xs font-extrabold text-slate-200 mt-0.5">
                          {getFechaFullTitle(currentFecha)}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shrink-0 shadow">
                      OFICIAL
                    </span>
                  </div>

                  {/* Matches Grid */}
                  {includeResults && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        ⚽ RESULTADOS DE LA JORNADA
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {currentMatches.map((m, idx) => {
                          const home = teams.find((t) => t.id === m.homeTeamId);
                          const away = teams.find((t) => t.id === m.awayTeamId);
                          return (
                            <div
                              key={m.id}
                              className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-1"
                            >
                              <span className="text-[10px] text-slate-400 font-bold block">
                                Partido #{idx + 1}
                              </span>
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-extrabold text-slate-100 truncate text-xs flex-1">
                                  {home?.name}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-xs shrink-0 shadow-sm">
                                  {m.homeGoals} - {m.awayGoals}
                                </span>
                                <span className="font-extrabold text-slate-100 truncate text-xs flex-1 text-right">
                                  {away?.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Standings Summary */}
                  {includeStandings && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        📊 TABLA DE POSICIONES
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 text-xs">
                        <div className="grid grid-cols-12 font-bold text-slate-400 border-b border-slate-800 pb-1.5 text-[10px] uppercase tracking-wider">
                          <span className="col-span-6">EQUIPO</span>
                          <span className="col-span-2 text-center">PJ</span>
                          <span className="col-span-2 text-center">DG</span>
                          <span className="col-span-2 text-center text-amber-300">PTS</span>
                        </div>
                        {standings.slice(0, 8).map((s, i) => (
                          <div key={s.teamId} className="grid grid-cols-12 py-1 border-b border-slate-800/40 text-slate-200 items-center">
                            <span className="col-span-6 font-bold truncate">
                              {i + 1}. {s.teamName}
                            </span>
                            <span className="col-span-2 text-center text-slate-400 font-medium">{s.pj}</span>
                            <span className="col-span-2 text-center text-slate-400 font-medium">{s.dg >= 0 ? `+${s.dg}` : s.dg}</span>
                            <span className="col-span-2 text-center font-black text-amber-400 text-sm">{s.pts}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Top Scorers Summary */}
                  {includeScorers && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        🥇 TOP GOLEADORES DE LA TEMPORADA
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 text-xs">
                        {topScorers.length === 0 ? (
                          <p className="text-slate-400 text-[11px] text-center py-1">Sin goles registrados.</p>
                        ) : (
                          <div className="grid grid-cols-2 gap-1.5">
                            {topScorers.map((p, idx) => {
                              const teamObj = teams.find((t) => t.id === p.teamId);
                              return (
                                <div
                                  key={p.playerId}
                                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/80 border border-slate-800"
                                >
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="font-extrabold text-amber-400 text-[10px]">
                                      #{p.dorsal}
                                    </span>
                                    <div className="min-w-0">
                                      <p className="font-bold text-slate-100 truncate text-[11px] leading-tight">
                                        {p.name}
                                      </p>
                                      <p className="text-[9px] text-slate-400 truncate">
                                        {teamObj?.name || p.teamId}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] rounded-md shrink-0">
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
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        🟨 TARJETAS Y SANCIÓNES DE LA FECHA
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 text-xs space-y-2">
                        {/* Cards in Fecha */}
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                            Amonestaciones Fecha #{currentFecha}:
                          </p>
                          {cardsInFecha.length === 0 ? (
                            <p className="text-slate-400 text-[11px] italic">Sin amonestaciones registradas.</p>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {cardsInFecha.map((c, i) => {
                                const player = players.find((p) => p.id === c.playerId);
                                const cardBg =
                                  c.type === 'AMARILLA'
                                    ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
                                    : c.type === 'AZUL'
                                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                                return (
                                  <span
                                    key={i}
                                    className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${cardBg}`}
                                  >
                                    #{player?.dorsal} {player?.name} ({player?.teamId})
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Active Suspensions for Next Fecha */}
                        {activeSuspensions.length > 0 && (
                          <div className="pt-1 border-t border-slate-800">
                            <p className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <span>⚠️ Suspendidos Próxima Fecha:</span>
                            </p>
                            <div className="space-y-1">
                              {activeSuspensions.map((s, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-[10px] bg-rose-950/40 border border-rose-900/50 p-1.5 rounded-md text-rose-200"
                                >
                                  <span className="font-bold">
                                    #{s.dorsal} {s.playerName} ({s.teamId})
                                  </span>
                                  <span className="font-semibold text-rose-300">
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
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        📋 CONTROL DE ASISTENCIA FECHA #{currentFecha}
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 text-xs space-y-2 font-mono">
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
                            <div key={m.id} className="p-2 bg-slate-950/80 rounded-lg border border-slate-800/80 space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
                                <span>{home.name} ({homeAtt ? homeAtt.length : homePlayers.length}/{homePlayers.length})</span>
                                <span className="text-slate-500 font-mono text-[9px]">VS</span>
                                <span>{away.name} ({awayAtt ? awayAtt.length : awayPlayers.length}/{awayPlayers.length})</span>
                              </div>
                              {(homeAbsent.length > 0 || awayAbsent.length > 0) && (
                                <div className="text-[10px] space-y-0.5 pt-1 border-t border-slate-800/60 font-mono">
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
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        📈 CONSOLIDADO GENERAL DE ASISTENCIA
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 text-xs space-y-1.5 font-mono">
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
                            <div key={t.id} className="p-1.5 bg-slate-950/80 rounded-md border border-slate-800/80 text-[10px]">
                              <div className="flex items-center justify-between font-bold">
                                <span className="text-amber-300">{t.name} ({totalPJ} PJ)</span>
                                {absentPlayers.length === 0 ? (
                                  <span className="text-emerald-400 font-extrabold">✅ 100% Asistencia</span>
                                ) : (
                                  <span className="text-orange-400 font-extrabold">{absentPlayers.length} Con Faltas</span>
                                )}
                              </div>
                              {absentPlayers.length > 0 && (
                                <p className="text-slate-300 text-[9px] mt-0.5 truncate">
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
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                        📅 PRÓXIMA JORNADA - FECHA #{nextFecha} ({nextFechaDate})
                      </span>
                      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 text-xs">
                        {nextMatches.length === 0 ? (
                          <p className="text-slate-400 text-[11px] text-center py-1 italic">Partidos por programar.</p>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {nextMatches.map((m, idx) => {
                              const home = teams.find((t) => t.id === m.homeTeamId);
                              const away = teams.find((t) => t.id === m.awayTeamId);
                              return (
                                <div
                                  key={m.id}
                                  className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex flex-col justify-between"
                                >
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                                    <span>Partido #{idx + 1}</span>
                                    {m.time && <span className="text-amber-400 font-semibold">{m.time}</span>}
                                  </div>
                                  <div className="flex items-center justify-between gap-1 text-[11px]">
                                    <span className="font-bold text-slate-100 truncate flex-1">{home?.name}</span>
                                    <span className="text-slate-500 font-black text-[10px]">VS</span>
                                    <span className="font-bold text-slate-100 truncate flex-1 text-right">{away?.name}</span>
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
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
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

