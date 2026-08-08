import React, { useRef, useState } from 'react';
import { Match, Player, Team, CardRecord, GoalRecord, SuspensionAlert } from '../types';
import { getFechaFullTitle, FECHA_DATES } from '../utils/fechas';
import { computeStandings, groupGoalsByPlayer } from '../utils/sanctionsEngine';
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
  Calendar,
  Sparkles,
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
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentMatches = matches.filter((m) => m.fecha === currentFecha);
  const fechaDate = FECHA_DATES[currentFecha] || 'Fecha Programada';
  const standings = computeStandings(teams, matches, cards, players);

  // Generate formatted WhatsApp Text
  const generateWhatsAppText = () => {
    let txt = `🏆 *CAMPEONATO BANQUITAS SAN SIMÓN*\n`;
    txt += `📅 *${getFechaFullTitle(currentFecha).toUpperCase()}* (${fechaDate})\n`;
    txt += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    txt += `⚽ *RESULTADOS DE LA FECHA:*\n`;
    currentMatches.forEach((m, idx) => {
      const homeTeam = teams.find((t) => t.id === m.homeTeamId)?.name || m.homeTeamId;
      const awayTeam = teams.find((t) => t.id === m.awayTeamId)?.name || m.awayTeamId;
      const statusStr = m.status === 'FINALIZADO' || m.isPlayed ? ' (Fin)' : m.status === 'EN_VIVO' ? ' (🔴 En Vivo)' : ' (Prog)';

      txt += `*P${idx + 1}:* ${homeTeam} *${m.homeGoals} - ${m.awayGoals}* ${awayTeam}${statusStr}\n`;

      // Goals summary
      const matchPlayers = players.filter((p) => p.teamId === m.homeTeamId || p.teamId === m.awayTeamId);
      const matchGoals = goals.filter((g) => g.fecha === currentFecha && matchPlayers.some((p) => p.id === g.playerId));
      if (matchGoals.length > 0) {
        const goalList = groupGoalsByPlayer(matchGoals, players)
          .map(({ player: p, count }) => `${p ? `${p.dorsal} ${p.name}` : 'Gol'} (${'⚽'.repeat(count)})`)
          .join(', ');
        txt += `   └ ⚽ _${goalList}_\n`;
      }
    });

    txt += `\n📊 *TABLA DE POSICIONES:*\n`;
    txt += `\`Pos  Equipo         PJ  PTS  DG\`\n`;
    standings.forEach((s, i) => {
      const pos = i + 1;
      const medal = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `${pos}.`;
      const namePad = s.teamName.padEnd(12, ' ').substring(0, 12);
      const pjPad = String(s.pj).padStart(2, ' ');
      const ptsPad = String(s.pts).padStart(3, ' ');
      const dgPad = (s.dg >= 0 ? `+${s.dg}` : String(s.dg)).padStart(3, ' ');
      txt += `${medal} ${namePad} | ${pjPad} | ${ptsPad} | ${dgPad}\n`;
    });

    if (activeSuspensions.length > 0) {
      txt += `\n⚠️ *JUGADORES SUSPENDIDOS PARA PRÓXIMA FECHA:*\n`;
      activeSuspensions.forEach((s) => {
        txt += `• *#${s.dorsal} ${s.playerName}* (${s.teamId}) - ${s.reason === '3_AMARILLAS' ? '3 Amarillas' : 'Tarjeta Roja'}\n`;
      });
    }

    txt += `\n📌 _Información oficial de la mesa directiva - San Simón_`;
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
                COMPARTIR RESUMEN RÁPIDO - FECHA #{currentFecha}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Genera texto o imagen para enviar a grupos de WhatsApp
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
                  Vista previa de la tarjeta gráfica resumen (resolución optimizada):
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
              <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950">
                <div
                  ref={cardRef}
                  className="p-5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-mono space-y-4 max-w-lg mx-auto"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-amber-500/40 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border border-amber-500/50 p-1 bg-slate-900 flex items-center justify-center">
                        <img src={tournamentLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h2 className="text-sm font-black text-amber-400 uppercase tracking-tight">
                          CAMPEONATO BANQUITAS SAN SIMÓN
                        </h2>
                        <p className="text-[11px] font-extrabold text-slate-200">
                          {getFechaFullTitle(currentFecha)} • {fechaDate}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                      OFICIAL
                    </span>
                  </div>

                  {/* Matches Grid */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                      ⚽ RESULTADOS DE LA JORNADA
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      {currentMatches.map((m, idx) => {
                        const home = teams.find((t) => t.id === m.homeTeamId);
                        const away = teams.find((t) => t.id === m.awayTeamId);
                        return (
                          <div
                            key={m.id}
                            className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 flex flex-col justify-between"
                          >
                            <span className="text-[9px] text-slate-400 font-bold block mb-1">
                              Partido #{idx + 1}
                            </span>
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-extrabold text-slate-100 truncate max-w-[55px]">
                                {home?.name}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[11px]">
                                {m.homeGoals} - {m.awayGoals}
                              </span>
                              <span className="font-extrabold text-slate-100 truncate max-w-[55px] text-right">
                                {away?.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Standings Summary */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block border-b border-slate-800 pb-1">
                      📊 TABLA DE POSICIONES
                    </span>
                    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2 text-[10px]">
                      <div className="grid grid-cols-6 font-bold text-slate-400 border-b border-slate-800 pb-1 text-[9px]">
                        <span className="col-span-3">EQUIPO</span>
                        <span className="text-center">PJ</span>
                        <span className="text-center">DG</span>
                        <span className="text-center text-amber-300">PTS</span>
                      </div>
                      {standings.slice(0, 8).map((s, i) => (
                        <div key={s.teamId} className="grid grid-cols-6 py-0.5 border-b border-slate-800/40 text-slate-200">
                          <span className="col-span-3 font-bold truncate">
                            {i + 1}. {s.teamName}
                          </span>
                          <span className="text-center text-slate-400">{s.pj}</span>
                          <span className="text-center text-slate-400">{s.dg >= 0 ? `+${s.dg}` : s.dg}</span>
                          <span className="text-center font-black text-amber-400">{s.pts}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-500 font-mono">
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
