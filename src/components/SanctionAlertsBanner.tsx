import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SuspensionAlert, Team } from '../types';
import { EliminationCheckResult } from '../utils/sanctionsEngine';

interface SanctionAlertsBannerProps {
  currentFecha: number;
  activeSuspensions: SuspensionAlert[];
  teams: Team[];
  onPlayerClick?: (playerId: number) => void;
  eliminationInfo?: EliminationCheckResult;
}

export const SanctionAlertsBanner: React.FC<SanctionAlertsBannerProps> = ({
  currentFecha,
  activeSuspensions,
  teams,
  onPlayerClick,
  eliminationInfo,
}) => {
  return (
    <div className="space-y-2 print:hidden">
      {/* Mathematical Elimination Banner Alert */}
      {eliminationInfo?.isEliminated && (
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-2 border-red-500/80 rounded-xl p-3 text-xs font-mono text-red-200 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
            <span>
              <strong className="text-red-300 font-bold uppercase">Eliminación Matemática Activa:</strong> El equipo <strong className="text-amber-300">{eliminationInfo.eliminatedTeamName}</strong> no puede alcanzar la 7ª posición ({eliminationInfo.seventhTeamName}) y no disputará sus fechas restantes.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-red-800 text-white text-[10px] font-bold uppercase whitespace-nowrap hidden sm:inline">
            Reglamento Aplicado
          </span>
        </div>
      )}

      {/* Active Suspensions Banner */}
      {activeSuspensions.length === 0 ? (
        <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="font-semibold text-emerald-200">Sin Jugadores Suspendidos:</strong> Todos los jugadores de los equipos habilitados están disponibles para la <strong className="font-bold">Fecha {currentFecha}</strong>.
            </span>
          </div>
          <span className="text-[10px] text-emerald-400/70 font-mono hidden md:inline">
            REGLAMENTO: 3 Tarjetas / 1 Roja = 1 Fecha Suspensión
          </span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-2 border-red-500/80 rounded-xl p-3.5 shadow-lg shadow-red-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-red-800/50">
            <div className="flex items-center gap-2 text-red-300">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse shrink-0" />
              <h2 className="text-xs sm:text-sm font-black uppercase font-mono tracking-wider text-red-200">
                Alerta de Suspensiones Activas - Fecha {currentFecha}
              </h2>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-red-900/80 text-red-200 font-bold border border-red-500/40">
              {activeSuspensions.length} {activeSuspensions.length === 1 ? 'Sancionado' : 'Sancionados'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {activeSuspensions.map((s, idx) => {
              const team = teams.find((t) => t.id === s.teamId);
              return (
                <div
                  key={`${s.playerId}-${idx}`}
                  onClick={() => onPlayerClick && onPlayerClick(s.playerId)}
                  className="bg-slate-900/90 border border-red-600/60 hover:border-red-400 p-2.5 rounded-lg flex items-center justify-between gap-2 shadow-xs cursor-pointer transition group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="w-6 h-6 rounded bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {s.dorsal}
                    </span>
                    <div className="truncate">
                      <p className="font-bold text-xs text-slate-100 group-hover:text-red-300 transition truncate">
                        {s.playerName}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase border ${team?.badgeBg || 'bg-slate-700'} ${team?.badgeText || 'text-white'} ${team?.badgeBorder || 'border-transparent'}`}>
                          {s.teamId}
                        </span>
                        <span className="text-[10px] text-red-400 font-medium truncate">
                          {s.reason === '1_ROJA' ? 'Tarjeta Roja directa' : 'Acumulación de 3 Tarjetas (Amarillas / Azules)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-red-600 text-white tracking-widest shadow-xs">
                      SUS
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Solo F{s.suspendedForFecha}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono italic">
            * Nota de regla: La suspensión se aplica únicamente durante la Fecha {currentFecha}. Al ingresar datos en la Fecha {currentFecha + 1}, la sanción vence automáticamente.
          </p>
        </div>
      )}
    </div>
  );
};

