import React, { useState } from 'react';
import { Player, Team, CardRecord, SuspensionAlert, TeamId } from '../types';
import {
  Bell,
  AlertTriangle,
  Shield,
  MessageCircle,
  Copy,
  Check,
  X,
  Users,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface DelegateSanctionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFecha: number;
  teams: Team[];
  players: Player[];
  cards: CardRecord[];
  activeSuspensions: SuspensionAlert[];
  allSuspensions: SuspensionAlert[];
}

export const DelegateSanctionsModal: React.FC<DelegateSanctionsModalProps> = ({
  isOpen,
  onClose,
  currentFecha,
  teams,
  players,
  cards,
  activeSuspensions,
  allSuspensions,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamId | 'ALL'>('ALL');
  const [copiedTeam, setCopiedTeam] = useState<string | null>(null);

  if (!isOpen) return null;

  // Identify players "Apercibidos / En Capilla" (2 Cards accumulated - 1 away from 3-card suspension: Amarillas / Azules)
  const playersEnCapilla = players.map((p) => {
    const accumCards = cards.filter((c) => c.playerId === p.id && (c.type === 'AMARILLA' || c.type === 'AZUL'));
    const totalAccum = accumCards.length;
    // Condition: totalAccum % 3 === 2 means 2, 5, 8... accumulated cards (1 card away from suspension)!
    const isEnCapilla = totalAccum % 3 === 2;
    const amarillasCount = accumCards.filter((c) => c.type === 'AMARILLA').length;
    const azulesCount = accumCards.filter((c) => c.type === 'AZUL').length;
    return {
      player: p,
      team: teams.find((t) => t.id === p.teamId),
      totalAccum,
      amarillasCount,
      azulesCount,
      isEnCapilla,
    };
  }).filter((item) => item.isEnCapilla);

  // Filter by selected team
  const filteredSuspensions = selectedTeam === 'ALL'
    ? activeSuspensions
    : activeSuspensions.filter((s) => s.teamId === selectedTeam);

  const filteredCapilla = selectedTeam === 'ALL'
    ? playersEnCapilla
    : playersEnCapilla.filter((c) => c.player.teamId === selectedTeam);

  // Completed suspensions in previous fechas
  const completedSuspensions = allSuspensions.filter(
    (s) => s.suspendedForFecha < currentFecha && (selectedTeam === 'ALL' || s.teamId === selectedTeam)
  );

  // Helper to generate WhatsApp alert message for a specific team delegate
  const generateDelegateMessage = (teamObj: Team) => {
    const teamSuspensions = activeSuspensions.filter((s) => s.teamId === teamObj.id);
    const teamCapilla = playersEnCapilla.filter((c) => c.player.teamId === teamObj.id);

    let msg = `📢 *NOTIFICACIÓN DISCIPLINARIA OFICIAL - MESA DIRECTIVA BANQUITAS SAN SIMÓN*\n`;
    msg += `🛡️ *Equipo:* ${teamObj.name}\n`;
    msg += `👤 *Atención Delegado:* ${teamObj.delegate || 'Delegado de Equipo'}\n`;
    msg += `📅 *Aplica para:* FECHA #${currentFecha}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (teamSuspensions.length > 0) {
      msg += `⛔ *JUGADORES SUSPENDIDOS (NO PUEDEN JUGAR FECHA ${currentFecha}):*\n`;
      teamSuspensions.forEach((s) => {
        msg += `• *#${s.dorsal} ${s.playerName}* → Motivo: ${s.reason === '1_ROJA' ? 'Tarjeta Roja Directa' : 'Acumuló 3 Tarjetas (Amarillas / Azules)'}\n`;
      });
      msg += `\n`;
    } else {
      msg += `✅ *Sanciones Activas:* Sin jugadores suspendidos para la Fecha ${currentFecha}.\n\n`;
    }

    if (teamCapilla.length > 0) {
      msg += `⚠️ *JUGADORES APERCIBIDOS (A 1 TARJETA DE SUSPENSIÓN):*\n`;
      teamCapilla.forEach((c) => {
        const detail = `${c.amarillasCount > 0 ? `${c.amarillasCount} 🟨` : ''}${c.amarillasCount > 0 && c.azulesCount > 0 ? ' + ' : ''}${c.azulesCount > 0 ? `${c.azulesCount} 🟦` : ''}`;
        msg += `• *#${c.player.dorsal} ${c.player.name}* (Tiene ${c.totalAccum} tarjetas acumuladas: ${detail}). Si recibe 1 tarjeta más (amarilla o azul), será suspendido la fecha siguiente.\n`;
      });
      msg += `\n`;
    }

    msg += `📌 *Nota de la regla:* La suspensión vence al finalizar la jornada o pagar la sanción.\n`;
    msg += `_Agradecemos su colaboración para evitar la alineación indebida de jugadores sancionados._`;
    return msg;
  };

  const handleCopyDelegateMessage = (teamObj: Team) => {
    const text = generateDelegateMessage(teamObj);
    navigator.clipboard.writeText(text);
    setCopiedTeam(teamObj.id);
    setTimeout(() => setCopiedTeam(null), 2500);
  };

  const handleOpenWhatsApp = (teamObj: Team) => {
    const text = encodeURIComponent(generateDelegateMessage(teamObj));
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl text-slate-100 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base font-mono">
                MÓDULO DE ALERTAS Y NOTIFICACIONES A DELEGADOS
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Aviso anticipado de acumulaciones de tarjetas (3 amarillas) y fecha de suspensión
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

        {/* Filter Bar */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300 font-bold shrink-0">Filtrar por Equipo:</span>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value as any)}
              className="bg-slate-950 text-amber-300 font-mono font-bold text-xs rounded-lg px-2.5 py-1 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              <option value="ALL">🌐 Todos los Equipos</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  🛡️ {t.name} ({t.delegate || 'Sin delegado'})
                </option>
              ))}
            </select>
          </div>

          <span className="text-[11px] text-amber-400 font-bold hidden sm:inline">
            Fecha Actual: #{currentFecha}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-6 font-mono text-xs">
          {/* Section 1: Active Suspensions for current Fecha */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-2 text-red-400 font-black text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>1. JUGADORES SUSPENDIDOS PARA LA FECHA #{currentFecha}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold">
                {filteredSuspensions.length} Suspendido{filteredSuspensions.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredSuspensions.length === 0 ? (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-slate-400 italic">
                ✅ No hay jugadores suspendidos para la Fecha #{currentFecha} en el filtro seleccionado.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {filteredSuspensions.map((s) => {
                  const teamObj = teams.find((t) => t.id === s.teamId);
                  return (
                    <div
                      key={s.playerId}
                      className="p-3 bg-red-950/40 border border-red-800/80 rounded-xl flex items-start justify-between gap-2 shadow-md"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-red-300 text-sm">
                            #{s.dorsal} {s.playerName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${teamObj?.badgeBg} ${teamObj?.badgeText} ${teamObj?.badgeBorder}`}
                          >
                            {teamObj?.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-red-200 mt-1">
                          Motivo: <strong className="text-amber-300">{s.reason === '1_ROJA' ? 'Tarjeta Roja Directa' : 'Acumuló 3 Tarjetas (Amarillas / Azules)'}</strong>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Delegado responsable: <strong>{teamObj?.delegate || 'Delegado de Equipo'}</strong>
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded bg-red-600 text-white font-black text-[10px] uppercase shrink-0">
                        NO JUEGA
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Players Apercibidos (2 Cards: Amarillas / Azules) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                <Clock className="w-4 h-4" />
                <span>2. ALERTA JUGADORES APERCIBIDOS (A 1 TARJETA DE SUSPENSIÓN)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                {filteredCapilla.length} Jugador{filteredCapilla.length !== 1 ? 'es' : ''}
              </span>
            </div>

            {filteredCapilla.length === 0 ? (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-slate-400 italic">
                ✅ Ningún jugador tiene acumuladas 2 tarjetas actualmente en este filtro.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {filteredCapilla.map(({ player: p, team: t, totalAccum, amarillasCount, azulesCount }) => (
                  <div
                    key={p.id}
                    className="p-3 bg-amber-950/30 border border-amber-800/60 rounded-xl flex items-center justify-between gap-2 shadow-md"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-amber-300 text-sm">
                          #{p.dorsal} {p.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${t?.badgeBg} ${t?.badgeText} ${t?.badgeBorder}`}
                        >
                          {t?.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-1">
                        Acumuladas: <strong className="text-yellow-400">{totalAccum} Tarjetas ({amarillasCount > 0 ? `${amarillasCount} 🟨` : ''}{amarillasCount > 0 && azulesCount > 0 ? ' + ' : ''}{azulesCount > 0 ? `${azulesCount} 🟦` : ''})</strong>. Próxima tarjeta = Suspensión.
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded bg-yellow-500 text-slate-950 font-black text-[10px] uppercase shrink-0">
                      APERCIBIDO
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Direct Delegate WhatsApp Alerts Generator */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-slate-800 pb-1.5 flex items-center gap-2 text-emerald-400 font-black text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>3. ENVIAR NOTIFICACIÓN WHATSAPP POR EQUIPO</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {teams
                .filter((t) => selectedTeam === 'ALL' || t.id === selectedTeam)
                .map((t) => {
                  const teamSusp = activeSuspensions.filter((s) => s.teamId === t.id);
                  const teamCap = playersEnCapilla.filter((c) => c.player.teamId === t.id);

                  return (
                    <div
                      key={t.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2"
                    >
                      <div>
                        <span className="font-extrabold text-white text-xs block">
                          🛡️ {t.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          Delegado: {t.delegate || 'Sin asignar'}
                        </span>
                        <div className="flex items-center gap-2 mt-1 text-[10px]">
                          <span className={teamSusp.length > 0 ? 'text-red-400 font-bold' : 'text-slate-500'}>
                            ⛔ {teamSusp.length} Suspendidos
                          </span>
                          <span className={teamCap.length > 0 ? 'text-yellow-400 font-bold' : 'text-slate-500'}>
                            ⚠️ {teamCap.length} Apercibidos
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenWhatsApp(t)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleCopyDelegateMessage(t)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[10px] rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          {copiedTeam === t.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Section 4: History of Completed Suspensions */}
          {completedSuspensions.length > 0 && (
            <div className="space-y-2 pt-2 opacity-80">
              <div className="border-b border-slate-800 pb-1 flex items-center gap-2 text-slate-400 font-extrabold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>HISTORIAL DE SANCTIONES CUMPLIDAS EN FECHAS ANTERIORES</span>
              </div>
              <div className="space-y-1 text-[11px] max-h-32 overflow-y-auto">
                {completedSuspensions.map((s) => (
                  <div
                    key={`${s.playerId}_f${s.suspendedForFecha}`}
                    className="p-1.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between text-slate-400"
                  >
                    <span>
                      ✅ <strong>#{s.dorsal} {s.playerName}</strong> ({s.teamId}) cumplió sanción en <strong>Fecha #{s.suspendedForFecha}</strong>.
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">HABILITADO</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
