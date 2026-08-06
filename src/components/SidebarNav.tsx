import React from 'react';
import {
  Calendar,
  Trophy,
  Users,
  Shield,
  FileText,
  ChevronRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { getFechaFullTitle } from '../utils/fechas';

interface SidebarNavProps {
  activeTab: 'matches' | 'standings' | 'scorers' | 'matrix' | 'teams' | 'reglamento';
  setActiveTab: (tab: 'matches' | 'standings' | 'scorers' | 'matrix' | 'teams' | 'reglamento') => void;
  currentFecha: number;
  setCurrentFecha: (f: number) => void;
  maxUnlockedFecha: number;
  isEditMode: boolean;
  activeSuspendedCount: number;
  totalCardsCount: { amarillas: number; azules: number; rojas: number; total: number };
  currentEditionName?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  currentFecha,
  setCurrentFecha,
  maxUnlockedFecha,
  isEditMode,
  activeSuspendedCount,
  totalCardsCount,
  currentEditionName = 'IISEM 2026',
}) => {
  const navItems = [
    {
      id: 'matches' as const,
      label: 'Partidos',
      sublabel: 'Calendario y resultados x Fecha',
      icon: Calendar,
      color: 'from-amber-500 to-amber-600',
      activeColor: 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50',
      badge: `F${currentFecha}`,
    },
    {
      id: 'standings' as const,
      label: 'Tabla de posiciones',
      sublabel: 'Puntos, DG, PJ y Estadísticas',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-600',
      activeColor: 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50',
    },
    {
      id: 'scorers' as const,
      label: 'Goleadores',
      sublabel: 'Tabla general de anotadores',
      icon: null, // Custom emoji ⚽
      emoji: '⚽',
      color: 'from-blue-500 to-indigo-600',
      activeColor: 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50',
    },
    {
      id: 'matrix' as const,
      label: 'Tarjetas',
      sublabel: 'Control acumulado x Fecha',
      icon: Users,
      color: 'from-yellow-500 to-red-500',
      activeColor: 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50',
      badge: totalCardsCount.total > 0 ? `${totalCardsCount.total}` : undefined,
    },
    {
      id: 'teams' as const,
      label: 'Equipos',
      sublabel: 'Nóminas y plantillas oficiales',
      icon: Shield,
      color: 'from-purple-500 to-pink-600',
      activeColor: 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50',
    },
    {
      id: 'reglamento' as const,
      label: 'Reglamento',
      sublabel: 'Normativa oficial del torneo',
      icon: FileText,
      color: 'from-cyan-500 to-blue-600',
      activeColor: 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50',
    },
  ];

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4 sticky lg:top-20 z-20">
      {/* Main Vertical Nav Card */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow accent */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header Title */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase block font-mono">
              MÓDULOS
            </span>
            <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>Menú Principal</span>
            </h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            {currentEditionName}
          </span>
        </div>

        {/* Vertical Navigation Buttons */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group text-left px-3.5 py-3 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/50 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950 font-bold'
                        : 'bg-slate-800 text-amber-400 border border-slate-700/80'
                    }`}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-5 h-5" />
                    ) : (
                      <span className="text-base">{item.emoji}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold leading-tight truncate">
                      {item.label}
                    </div>
                    <div
                      className={`text-[10px] font-medium truncate mt-0.5 ${
                        isActive ? 'text-slate-900/80' : 'text-slate-400'
                      }`}
                    >
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-slate-950 text-amber-300 font-mono'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? 'text-slate-950 transform translate-x-0.5'
                        : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Fecha Switcher Block in Sidebar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium text-[11px]">Navegar Fecha:</span>
            <span className="font-mono font-bold text-amber-400 text-xs">
              {getFechaFullTitle(currentFecha)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (currentFecha > 1) setCurrentFecha(currentFecha - 1);
              }}
              disabled={currentFecha <= 1}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-bold text-slate-300 transition cursor-pointer"
              title="Fecha Anterior"
            >
              ◀
            </button>

            <select
              value={currentFecha}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!isEditMode && val > maxUnlockedFecha) {
                  alert(
                    `🔒 La Fecha ${val} está restringida para usuarios. Actualmente el Administrador ha habilitado únicamente hasta la Fecha ${maxUnlockedFecha}.`
                  );
                  return;
                }
                setCurrentFecha(val);
              }}
              className="flex-1 bg-slate-950 text-amber-300 font-mono font-extrabold text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              {Array.from({ length: 38 }, (_, i) => i + 1).map((f) => {
                const isLockedForUser = !isEditMode && f > maxUnlockedFecha;
                return (
                  <option
                    key={f}
                    value={f}
                    className={isLockedForUser ? 'text-slate-500 bg-slate-900' : 'text-amber-300 bg-slate-900'}
                  >
                    Fecha {f} {isLockedForUser ? '🔒' : ''}
                  </option>
                );
              })}
            </select>

            <button
              onClick={() => {
                const nextVal = currentFecha + 1;
                if (nextVal <= 38) {
                  if (!isEditMode && nextVal > maxUnlockedFecha) {
                    alert(
                      `🔒 La Fecha ${nextVal} está restringida para usuarios. El Administrador ha habilitado hasta la Fecha ${maxUnlockedFecha}.`
                    );
                    return;
                  }
                  setCurrentFecha(nextVal);
                }
              }}
              disabled={currentFecha >= 38 || (!isEditMode && currentFecha >= maxUnlockedFecha)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-bold text-slate-300 transition cursor-pointer"
              title="Fecha Siguiente"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Active Suspensions Mini Counter */}
        {activeSuspendedCount > 0 && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-between text-xs text-red-200">
            <span className="font-medium text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Sancionados Fecha {currentFecha}:
            </span>
            <span className="font-mono font-black text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-500/50">
              {activeSuspendedCount}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
