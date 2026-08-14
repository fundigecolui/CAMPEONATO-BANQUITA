import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, Check, ShieldAlert } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  mode: 'enter_pin' | 'change_pin';
  onClose: () => void;
  onSuccessEnter: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSuccessEnter,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const getSavedPin = (): string => {
    try {
      return localStorage.getItem('banquitas_admin_pin') || '2026';
    } catch {
      return '2026';
    }
  };

  const handleEnterPin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const savedPin = getSavedPin();
    if (pinInput.trim() === savedPin) {
      setPinInput('');
      onClose();
      setTimeout(() => {
        onSuccessEnter();
      }, 50);
    } else {
      setErrorMessage('❌ Contraseña / PIN incorrecto. Acceso denegado.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const savedPin = getSavedPin();
    if (currentPinInput.trim() !== savedPin) {
      setErrorMessage('❌ La contraseña actual es incorrecta.');
      return;
    }

    if (!newPinInput || newPinInput.trim().length < 4) {
      setErrorMessage('❌ La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (newPinInput.trim() !== confirmPinInput.trim()) {
      setErrorMessage('❌ Las nuevas contraseñas no coinciden.');
      return;
    }

    try {
      localStorage.setItem('banquitas_admin_pin', newPinInput.trim());
      setSuccessMessage('✅ ¡Contraseña / PIN de Administrador actualizado con éxito!');
      setTimeout(() => {
        setCurrentPinInput('');
        setNewPinInput('');
        setConfirmPinInput('');
        setSuccessMessage(null);
        onClose();
      }, 1200);
    } catch {
      setErrorMessage('⚠️ No se pudo guardar la clave en el almacenamiento local.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'enter_pin' ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Acceso Administrador</h3>
                <p className="text-xs text-slate-400">Ingrese su PIN de seguridad para habilitar la edición</p>
              </div>
            </div>

            <form onSubmit={handleEnterPin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  PIN de Seguridad
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Ingrese PIN (por defecto: 2026)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-10 text-white placeholder-slate-500 text-center font-mono text-lg tracking-widest focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Cambiar PIN Administrador</h3>
                <p className="text-xs text-slate-400">Actualice la contraseña para proteger el modo edición</p>
              </div>
            </div>

            <form onSubmit={handleChangePin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  PIN Actual
                </label>
                <input
                  type="password"
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  placeholder="PIN actual"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nuevo PIN (Mínimo 4 caracteres)
                </label>
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Nuevo PIN"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirmar Nuevo PIN
                </label>
                <input
                  type="password"
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  placeholder="Repita el nuevo PIN"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
