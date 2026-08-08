import React from 'react';
import { Shield, AlertTriangle, Trophy, Users, Calendar, RotateCcw, Download, Upload, UserPlus, Lock, Edit3, Key, Plus, Archive, FileText } from 'lucide-react';
import { getFechaFullTitle } from '../utils/fechas';
import tournamentLogo from '../assets/images/san_simon_logo_dark_1785590924842.jpg';
import { TournamentEdition } from '../types';

interface HeaderProps {
  currentFecha: number;
  setCurrentFecha: (f: number) => void;
  maxUnlockedFecha: number;
  setMaxUnlockedFecha: (f: number) => void;
  activeTab: 'matrix' | 'matches' | 'standings' | 'scorers' | 'teams' | 'reglamento';
  setActiveTab: (tab: 'matrix' | 'matches' | 'standings' | 'scorers' | 'teams' | 'reglamento') => void;
  activeSuspendedCount: number;
  totalCardsCount: { amarillas: number; azules: number; rojas: number; total: number };
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onResetData: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenAddPlayer: () => void;
  selectedEditionId: string;
  setSelectedEditionId: (id: string) => void;
  editions: TournamentEdition[];
  onAddNewEdition: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentFecha,
  setCurrentFecha,
  maxUnlockedFecha,
  setMaxUnlockedFecha,
  activeTab,
  setActiveTab,
  activeSuspendedCount,
  totalCardsCount,
  isEditMode,
  setIsEditMode,
  onResetData,
  onExportData,
  onImportData,
  onOpenAddPlayer,
  selectedEditionId,
  setSelectedEditionId,
  editions,
  onAddNewEdition,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  const handleToggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      const savedPin = localStorage.getItem('banquitas_admin_pin') || '2026';
      const enteredPin = window.prompt(
        `🔒 ACCESO ADMINISTRADOR\nIngrese la contraseña / PIN de seguridad para ingresar al MODO EDICIÓN:\n(PIN inicial por defecto: 2026)`
      );
      if (enteredPin === null) return;
      if (enteredPin.trim() === savedPin) {
        setIsEditMode(true);
      } else {
        alert('❌ Contraseña / PIN incorrecto. Acceso denegado.');
      }
    }
  };

  const handleChangePin = () => {
    const currentSavedPin = localStorage.getItem('banquitas_admin_pin') || '2026';
    const currentPin = window.prompt('🔒 SEGURIDAD ADMINISTRADOR\nIngrese la contraseña / PIN actual:');
    if (currentPin === null) return;
    if (currentPin.trim() !== currentSavedPin) {
      alert('❌ Contraseña actual incorrecta.');
      return;
    }
    const newPin = window.prompt('🔑 NUEVA CONTRASEÑA\nIngrese la nueva contraseña / PIN de seguridad (mínimo 4 caracteres):');
    if (!newPin || newPin.trim().length < 4) {
      alert('❌ La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }
    const confirmPin = window.prompt('🔑 CONFIRMAR CONTRASEÑA\nRepita la nueva contraseña para verificar:');
    if (confirmPin === null) return;
    if (confirmPin.trim() !== newPin.trim()) {
      alert('❌ Las contraseñas no coinciden. Intente de nuevo.');
      return;
    }
    localStorage.setItem('banquitas_admin_pin', newPin.trim());
    alert('✅ ¡Contraseña / PIN de Administrador actualizado con éxito!');
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-xl print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Title Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-xl bg-slate-950 p-1 border-2 border-amber-400/50 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={tournamentLogo}
                alt="Escudo Oficial Campeonato Banquitas San Simón"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono uppercase">
                  Campeonato Banquitas San Simón
                </h1>

                {/* Edición Selector Dropdown */}
                <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 rounded-xl px-2.5 py-1 text-xs text-amber-300 font-bold font-mono shadow-inner">
                  <Archive className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-400 text-[11px] hidden sm:inline">Edición:</span>
                  <select
                    value={selectedEditionId}
                    onChange={(e) => setSelectedEditionId(e.target.value)}
                    className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer text-xs"
                    title="Seleccionar Edición o Torneo Anterior"
                  >
                    {editions.map((ed) => (
                      <option key={ed.id} value={ed.id} className="bg-slate-900 text-white font-sans">
                        {ed.name} {ed.status === 'FINALIZADO' ? `🏆 (Campeón: ${ed.champion})` : '🟢 (En Curso)'}
                      </option>
                    ))}
                  </select>
                </div>

                {isEditMode && (
                  <button
                    onClick={onAddNewEdition}
                    className="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition"
                    title="Crear / Archivar Nueva Edición de Torneo"
                  >
                    <Plus className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline">Nueva Edición</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Edit Mode Toggle Switch & Quick Stat Badges */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex flex-wrap items-center gap-2">
              {/* Mode Switch Button */}
              <button
                onClick={handleToggleEditMode}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md border cursor-pointer ${
                  isEditMode
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 ring-2 ring-amber-400/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title={
                  isEditMode
                    ? 'Modo Administrador activo: Haz clic para salir y volver al Modo Consulta (Usuario)'
                    : 'Modo Consulta activo: Haz clic e ingresa clave/PIN para activar MODO ADMINISTRADOR'
                }
              >
                {isEditMode ? (
                  <>
                    <Edit3 className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>MODO ADMINISTRADOR</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-950 border border-emerald-400 animate-pulse"></span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>MODO USUARIO (CONSULTA)</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-500/30">
                      Clave Admin 🔒
                    </span>
                  </>
                )}
              </button>

              {/* Quick Cambiar PIN Button when in Edit Mode */}
              {isEditMode && (
                <button
                  onClick={handleChangePin}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  title="Cambiar Contraseña / PIN de Administrador"
                >
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cambiar Clave</span>
                </button>
              )}

              {/* Security & Share Info Button */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition cursor-pointer flex items-center gap-1.5 px-2.5"
                title="Información sobre Modo Usuario y Cambio de Contraseña"
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline font-medium text-[11px]">Compartir / Clave</span>
              </button>
            </div>

            {/* Quick Stat Counter Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                <span className="w-2.5 h-3.5 bg-yellow-400 rounded-xs shadow-xs" title="Amarillas"></span>
                <span className="font-mono font-bold text-yellow-300">{totalCardsCount.amarillas}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                <span className="w-2.5 h-3.5 bg-blue-500 rounded-xs shadow-xs" title="Azules"></span>
                <span className="font-mono font-bold text-blue-300">{totalCardsCount.azules}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
                <span className="w-2.5 h-3.5 bg-red-600 rounded-xs shadow-xs" title="Rojas"></span>
                <span className="font-mono font-bold text-red-400">{totalCardsCount.rojas}</span>
              </div>

              {activeSuspendedCount > 0 ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/50 text-xs text-red-300 font-bold animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>{activeSuspendedCount} Suspendidos</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-medium">
                  <span>Sin Suspendidos F{currentFecha}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls & Fecha Selector Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Sistema Oficial de Control Banquitas San Simón</span>
          </div>

          {/* Fecha Selector & Data Management Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Admin Fecha Unlocking Control */}
            {isEditMode && (
              <div className="flex items-center gap-1.5 bg-slate-800/90 border border-amber-500/40 rounded-lg px-2.5 py-1 text-xs text-amber-300 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">Habilitadas hasta:</span>
                <select
                  value={maxUnlockedFecha}
                  onChange={(e) => setMaxUnlockedFecha(Number(e.target.value))}
                  className="bg-slate-900 text-amber-300 font-extrabold text-xs rounded px-1.5 py-0.5 border border-amber-500/50 focus:outline-none cursor-pointer"
                  title="Configurar el límite de fechas visibles para los usuarios"
                >
                  <option value={7}>F7 (Vuelta 1)</option>
                  <option value={14}>F14 (Vuelta 2)</option>
                  <option value={21}>F21 (Vuelta 3)</option>
                  <option value={28}>F28 (Vuelta 4)</option>
                  <option value={35}>F35 (Vuelta 5)</option>
                  <option value={38}>F38 (Todas)</option>
                </select>
                <button
                  onClick={() => {
                    const nextLimit = Math.min(maxUnlockedFecha + 7, 38);
                    setMaxUnlockedFecha(nextLimit);
                    alert(`🔓 ¡Se han habilitado las fechas para los usuarios hasta la Fecha ${nextLimit}!`);
                  }}
                  className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] uppercase transition cursor-pointer"
                  title="Cargar y habilitar los siguientes 7 partidos para usuarios"
                >
                  +7
                </button>
              </div>
            )}

            {/* Active Fecha Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400 font-medium">Fecha:</span>
              <select
                value={currentFecha}
                onChange={(e) => {
                  const selectedVal = Number(e.target.value);
                  if (!isEditMode && selectedVal > maxUnlockedFecha) {
                    alert(`🔒 La Fecha ${selectedVal} está restringida para usuarios. Actualmente el Administrador ha habilitado únicamente hasta la Fecha ${maxUnlockedFecha}.`);
                    return;
                  }
                  setCurrentFecha(selectedVal);
                }}
                className="bg-slate-900 text-amber-300 font-bold text-xs rounded px-2 py-0.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                {Array.from({ length: 38 }, (_, i) => i + 1).map((f) => {
                  const isLockedForUser = !isEditMode && f > maxUnlockedFecha;
                  return (
                    <option
                      key={f}
                      value={f}
                      className={isLockedForUser ? 'text-slate-500 bg-slate-900' : 'text-amber-300 bg-slate-900'}
                    >
                      {getFechaFullTitle(f)} {isLockedForUser ? '🔒' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Admin Quick Actions (Visible in Edit Mode or disabled visually in read-only) */}
            {isEditMode && (
              <button
                onClick={onOpenAddPlayer}
                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center gap-1 px-2.5 shadow-md"
                title="Añadir Nuevo Jugador"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nuevo Jugador</span>
              </button>
            )}

            <button
              onClick={onExportData}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition"
              title="Exportar Respaldo JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {isEditMode && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition"
                  title="Importar Datos JSON"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onImportData}
                  accept=".json"
                  className="hidden"
                />

                <button
                  onClick={handleChangePin}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs transition"
                  title="Cambiar PIN de Administrador"
                >
                  <Key className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onResetData}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/50 text-red-300 text-xs transition"
                  title="Restablecer Datos de Fábrica San Simón"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Ayuda: Cambiar Contraseña y Compartir en Modo Usuario */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full text-slate-100 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Shield className="w-6 h-6 text-amber-400" />
                <h3 className="font-bold text-lg text-white">Seguridad y Enlace para Usuarios</h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 text-xs font-bold px-2.5 cursor-pointer"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
                <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400 shrink-0" />
                  1. ¿Cómo cambiar la contraseña de Administrador?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  1. Haz clic en el botón <strong className="text-white">"MODO USUARIO (CONSULTA)"</strong> e ingresa la contraseña actual (inicialmente <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">2026</code>).<br />
                  2. Una vez activo el Modo Administrador, presiona el botón <strong className="text-amber-300">🔑 Cambiar Clave</strong>.<br />
                  3. Ingresa tu clave actual, luego la nueva clave (mínimo 4 dígitos) y confírmala.
                </p>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  2. ¿Cómo hacer para que al compartir solo aparezca el modo usuario?
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  ¡Ya está configurado por defecto! La aplicación <strong className="text-white">inicia automáticamente en Modo Usuario (Consulta)</strong> para cualquier persona que abra el enlace.<br />
                  Los usuarios y jugadores solo pueden consultar partidos, tablas, goleadores y sanciones. <strong className="text-emerald-300">No tienen permisos para modificar o borrar datos</strong>.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-between items-center gap-3 border-t border-slate-800">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('📋 Enlace de la aplicación copiado al portapapeles. ¡Puedes enviarlo a los usuarios y jugadores!');
                }}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                📋 Copiar Enlace para Usuarios
              </button>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

