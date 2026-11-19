import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  FileSpreadsheet,
  X,
  PlusCircle,
  RefreshCw,
  UploadCloud,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  LogOut,
  Download,
} from 'lucide-react';
import { Match, Player, Team, CardRecord, GoalRecord } from '../types';
import { initAuth, googleSignIn, getAccessToken, clearAccessToken, logout } from '../utils/googleAuth';
import {
  createTournamentSheet,
  pushDataToSheet,
  readAndPreviewFromSheet,
  extractSpreadsheetId,
  SheetSyncPreview,
} from '../utils/googleSheetsSync';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  editionId: string;
  editionName: string;
  teams: Team[];
  players: Player[];
  matches: Match[];
  cards: CardRecord[];
  goals: GoalRecord[];
  currentFecha: number;
  onApplySheetData: (data: { matches: Match[]; goals: GoalRecord[]; cards: CardRecord[] }) => void;
}

type ConfirmActionState =
  | { type: 'CREATE_SHEET' }
  | { type: 'PUSH_TO_SHEET' }
  | { type: 'APPLY_FROM_SHEET'; preview: SheetSyncPreview }
  | null;

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  isOpen,
  onClose,
  editionId,
  editionName,
  teams,
  players,
  matches,
  cards,
  goals,
  currentFecha,
  onApplySheetData,
}) => {
  const SHEET_STORAGE_KEY = `banquitas_sheet_id_${editionId}`;

  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [sheetInput, setSheetInput] = useState('');
  const [linkedSheetUrl, setLinkedSheetUrl] = useState('');
  const [linkedSheetTitle, setLinkedSheetTitle] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const [isBusy, setIsBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<SheetSyncPreview | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmActionState>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (loggedUser) => {
        setUser(loggedUser);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setErrorMessage(null);
    setStatusMessage(null);
    setPreview(null);
    setConfirmAction(null);
    try {
      const saved = localStorage.getItem(SHEET_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSheetInput(parsed.spreadsheetId || '');
        setLinkedSheetUrl(parsed.spreadsheetUrl || '');
        setLinkedSheetTitle(parsed.title || '');
      } else {
        setSheetInput('');
        setLinkedSheetUrl('');
        setLinkedSheetTitle('');
      }
    } catch {
      // Ignore storage parse error
    }
  }, [isOpen, editionId, SHEET_STORAGE_KEY]);

  if (!isOpen) return null;

  const saveLinkedSheet = (spreadsheetId: string, spreadsheetUrl: string, title: string) => {
    setSheetInput(spreadsheetId);
    setLinkedSheetUrl(spreadsheetUrl);
    setLinkedSheetTitle(title);
    try {
      localStorage.setItem(
        SHEET_STORAGE_KEY,
        JSON.stringify({ spreadsheetId, spreadsheetUrl, title })
      );
    } catch {
      // Ignore localStorage error
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al iniciar sesión con Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setPreview(null);
    setStatusMessage(null);
  };

  const requireToken = async (): Promise<string | null> => {
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      setErrorMessage('Tu sesión de Google Sheets expiró o requiere iniciar sesión nuevamente.');
      return null;
    }
    return token;
  };

  const handleApiError = (err: any) => {
    if (err?.status === 401) {
      clearAccessToken();
      setNeedsAuth(true);
      setErrorMessage('La autorización de Google expiró. Por favor vuelve a iniciar sesión con Google.');
    } else {
      setErrorMessage(err?.message || 'Ocurrió un error al comunicarse con Google Sheets.');
    }
  };

  const executeCreateSheet = async () => {
    const token = await requireToken();
    if (!token) return;

    setConfirmAction(null);
    setIsBusy(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const created = await createTournamentSheet(
        token,
        editionName,
        teams,
        players,
        matches,
        cards,
        goals,
        currentFecha
      );
      saveLinkedSheet(created.spreadsheetId, created.spreadsheetUrl, created.title);
      setStatusMessage(
        `¡Hoja "${created.title}" creada con éxito en tu Google Drive con 6 pestañas (Partidos, Goles, Tarjetas, Posiciones, Goleadores y Jugadores)!`
      );
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setIsBusy(false);
    }
  };

  const handleReadAndPreview = async () => {
    const cleanId = extractSpreadsheetId(sheetInput);
    if (!cleanId) {
      setErrorMessage('Ingresa el enlace o ID de tu Google Sheet primero.');
      return;
    }

    const token = await requireToken();
    if (!token) return;

    setIsBusy(true);
    setErrorMessage(null);
    setStatusMessage(null);
    setPreview(null);

    try {
      const result = await readAndPreviewFromSheet(
        cleanId,
        token,
        matches,
        players,
        goals,
        cards
      );
      saveLinkedSheet(
        cleanId,
        `https://docs.google.com/spreadsheets/d/${cleanId}/edit`,
        result.spreadsheetTitle
      );
      setPreview(result);
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setIsBusy(false);
    }
  };

  const executeApplyPreview = (syncPreview: SheetSyncPreview) => {
    setConfirmAction(null);
    onApplySheetData({
      matches: syncPreview.matches,
      goals: syncPreview.goals,
      cards: syncPreview.cards,
    });
    setPreview(null);
    setStatusMessage(
      `Aplicación actualizada con los datos leídos de "${syncPreview.spreadsheetTitle}": ${syncPreview.playedCount} partidos jugados, ${syncPreview.goals.length} goles y ${syncPreview.cards.length} tarjetas.`
    );
  };

  const executePushToSheet = async () => {
    const cleanId = extractSpreadsheetId(sheetInput);
    if (!cleanId) {
      setErrorMessage('Ingresa el enlace o ID de tu Google Sheet primero.');
      return;
    }

    const token = await requireToken();
    if (!token) return;

    setConfirmAction(null);
    setIsBusy(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const meta = await pushDataToSheet(
        cleanId,
        token,
        editionName,
        teams,
        players,
        matches,
        cards,
        goals,
        currentFecha
      );
      saveLinkedSheet(meta.spreadsheetId, meta.spreadsheetUrl, meta.title);
      setStatusMessage(
        `¡Datos actuales subidos a "${meta.title}"! Posiciones, partidos, goles y tarjetas actualizados en la hoja.`
      );
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setIsBusy(false);
    }
  };

  const handleCopyId = () => {
    if (!sheetInput) return;
    navigator.clipboard.writeText(sheetInput);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:hidden">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl text-slate-100 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm sm:text-base font-mono uppercase">
                Sincronización con Google Sheets
              </h3>
              <p className="text-xs text-slate-400">
                Edición: <strong className="text-amber-300">{editionName}</strong> — Genera tu hoja, edita resultados y actualiza la app.
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

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Status / Error Feedback */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/60 text-red-200 flex items-start gap-2.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {statusMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Step 1: Google Sign-In Gate */}
          {needsAuth ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Conecta tu cuenta de Google para usar Google Sheets
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inicia sesión con tu cuenta de Google para generar automáticamente la hoja de cálculo del torneo en tu Drive y leer los resultados actualizados cuando la edites.
                </p>
              </div>

              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button"
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {isLoggingIn ? 'Conectando...' : 'Sign in with Google'}
                    </span>
                    <span style={{ display: 'none' }}>Sign in with Google</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Connected Google Account Bar */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-300">
                    Conectado como <strong className="text-white">{user?.email || user?.displayName}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cambiar cuenta</span>
                </button>
              </div>

              {/* Action 1: Generate New Google Sheet */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h4 className="font-black text-emerald-300 text-xs sm:text-sm uppercase font-mono">
                      1. Generar Nueva Google Sheet del Torneo
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Crea una hoja de cálculo nueva con todos los partidos (Fechas 1–38), goles, tarjetas, tabla de posiciones y nómina de jugadores lista para editar.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => setConfirmAction({ type: 'CREATE_SHEET' })}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs flex items-center gap-1.5 transition shadow-md cursor-pointer shrink-0"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{isBusy ? 'Procesando...' : 'Generar Google Sheet'}</span>
                  </button>
                </div>

                {linkedSheetUrl && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block">
                        Hoja vinculada ({linkedSheetTitle || 'Google Sheet'})
                      </span>
                      <a
                        href={linkedSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300 hover:text-amber-200 font-bold inline-flex items-center gap-1 truncate max-w-full underline"
                      >
                        <span className="truncate">Abrir hoja en Google Sheets</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId ? 'ID Copiado' : 'Copiar ID'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Action 2: Connect / Read & Sync from Google Sheet */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-3">
                <div>
                  <h4 className="font-black text-amber-300 text-xs sm:text-sm uppercase font-mono">
                    2. Leer Resultados de la Sheet y Actualizar la App
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Cuando edites los marcadores, goles, tarjetas o ausencias en tu Google Sheet, pega su URL o ID y presiona <strong>Leer Cambios</strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={sheetInput}
                    onChange={(e) => setSheetInput(e.target.value)}
                    placeholder="Pega la URL o el ID de tu Google Sheet..."
                    className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    type="button"
                    disabled={isBusy || !sheetInput.trim()}
                    onClick={handleReadAndPreview}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isBusy ? 'Leyendo...' : 'Leer Cambios'}</span>
                  </button>
                  <button
                    type="button"
                    disabled={isBusy || !sheetInput.trim()}
                    onClick={() => setConfirmAction({ type: 'PUSH_TO_SHEET' })}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-600 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
                    title="Subir los datos actuales de la app hacia esta Google Sheet"
                  >
                    <UploadCloud className="w-4 h-4 text-sky-400" />
                    <span>Subir App → Sheet</span>
                  </button>
                </div>

                {/* Preview Box before confirming import into App */}
                {preview && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border-2 border-amber-400/60 space-y-3 text-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <span className="font-black text-amber-300 uppercase font-mono">
                        Vista Previa: {preview.spreadsheetTitle}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Pestañas: {preview.sheetTitles.join(', ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center font-mono">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Partidos Jugados</span>
                        <strong className="text-base text-emerald-400">{preview.playedCount}</strong>
                        <span className="text-[10px] text-amber-300 block">({preview.changedMatchesCount} con cambios)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Goles Leídos</span>
                        <strong className="text-base text-sky-400">{preview.goals.length}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Tarjetas Leídas</span>
                        <strong className="text-base text-amber-400">{preview.cards.length}</strong>
                      </div>
                    </div>

                    {preview.warnings.length > 0 && (
                      <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-200 space-y-1 max-h-28 overflow-y-auto text-[11px]">
                        <p className="font-bold text-amber-300">Advertencias detectadas ({preview.warnings.length}):</p>
                        {preview.warnings.map((w, i) => (
                          <p key={i}>• {w}</p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmAction({ type: 'APPLY_FROM_SHEET', preview })}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Aplicar y Actualizar App</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Guide for Manual Editing in Google Sheets */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-bold text-slate-300">Instrucciones rápidas para editar la Google Sheet:</p>
                <p>• En la pestaña <strong>Partidos</strong>: cambia <code className="text-amber-300">Goles_Local</code>, <code className="text-amber-300">Goles_Visitante</code> y escribe <code className="text-emerald-300">SI</code> en <code className="text-amber-300">Jugado</code>. En Ausentes escribe nombres separados por coma.</p>
                <p>• En <strong>Goles</strong> y <strong>Tarjetas</strong>: agrega filas nuevas con <code className="text-amber-300">Fecha</code>, <code className="text-amber-300">Equipo</code>, <code className="text-amber-300">Jugador</code> (o <code className="text-amber-300">Jugador_ID</code> de la pestaña Jugadores) y <code className="text-amber-300">Cantidad</code> o <code className="text-amber-300">Tipo</code> (AMARILLA, AZUL, ROJA).</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Explicit Confirmation Dialog for Mutating Operations */}
      {confirmAction && (
        <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400/70 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="font-black text-white text-sm uppercase font-mono">
                  {confirmAction.type === 'CREATE_SHEET' && '¿Crear nueva Google Sheet?'}
                  {confirmAction.type === 'PUSH_TO_SHEET' && '¿Sobrescribir datos en Google Sheet?'}
                  {confirmAction.type === 'APPLY_FROM_SHEET' && '¿Actualizar la app con la Google Sheet?'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {confirmAction.type === 'CREATE_SHEET' &&
                    `Se creará una nueva hoja de cálculo llamada "Banquitas San Simón - ${editionName}" en tu Google Drive con ${matches.length} partidos, ${goals.length} goles, ${cards.length} tarjetas y ${players.length} jugadores.`}
                  {confirmAction.type === 'PUSH_TO_SHEET' &&
                    `Se sobrescribirán las pestañas Partidos, Goles, Tarjetas, Posiciones, Goleadores y Jugadores de "${linkedSheetTitle || sheetInput}" con los datos actuales de la aplicación (${matches.filter((m) => m.isPlayed).length} partidos jugados, ${goals.length} goles, ${cards.length} tarjetas).`}
                  {confirmAction.type === 'APPLY_FROM_SHEET' &&
                    `Se reemplazarán los partidos, goles y tarjetas actuales en la aplicación con los ${confirmAction.preview.playedCount} partidos jugados, ${confirmAction.preview.goals.length} goles y ${confirmAction.preview.cards.length} tarjetas leídos desde "${confirmAction.preview.spreadsheetTitle}".`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmAction.type === 'CREATE_SHEET') executeCreateSheet();
                  if (confirmAction.type === 'PUSH_TO_SHEET') executePushToSheet();
                  if (confirmAction.type === 'APPLY_FROM_SHEET') executeApplyPreview(confirmAction.preview);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
