import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Download,
  Eye,
  BookOpen,
  Printer,
  ExternalLink,
  Trash2,
  FilePlus,
  Check,
  Search,
  AlertTriangle,
  Shield,
  Clock,
  Award,
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ReglamentoViewerProps {
  isEditMode: boolean;
  selectedEditionId: string;
  selectedEditionName?: string;
}

export const ReglamentoViewer: React.FC<ReglamentoViewerProps> = ({
  isEditMode,
  selectedEditionId,
  selectedEditionName = 'Edición LVIII',
}) => {
  const STORAGE_PDF_KEY = `banquitas_reglamento_pdf_${selectedEditionId}`;
  
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'pdf' | 'text'>('pdf');
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfUrlInput, setPdfUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Load saved PDF from localStorage on mount or edition change
  useEffect(() => {
    try {
      const savedPdf = localStorage.getItem(STORAGE_PDF_KEY);
      if (savedPdf) {
        const parsed = JSON.parse(savedPdf);
        setPdfDataUrl(parsed.dataUrl || null);
        setPdfFileName(parsed.fileName || 'Reglamento_Oficial.pdf');
      } else {
        setPdfDataUrl(null);
        setPdfFileName('');
      }
    } catch {
      setPdfDataUrl(null);
    }
  }, [selectedEditionId, STORAGE_PDF_KEY]);

  // Handle PDF Upload via File
  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('⚠️ Por favor selecciona un archivo con formato .pdf');
      return;
    }
    // Limit to 10MB to avoid localStorage quota issues
    if (file.size > 12 * 1024 * 1024) {
      alert('⚠️ El archivo PDF es demasiado grande para almacenamiento local (máximo 12 MB).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPdfDataUrl(result);
        setPdfFileName(file.name);
        try {
          localStorage.setItem(
            STORAGE_PDF_KEY,
            JSON.stringify({ dataUrl: result, fileName: file.name, updatedAt: new Date().toISOString() })
          );
        } catch (err) {
          console.error('LocalStorage write error', err);
          alert('⚠️ El PDF cargó en pantalla pero superó el tamaño máximo de guardado automático local.');
        }
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfUrlInput.trim()) return;
    const url = pdfUrlInput.trim();
    setPdfDataUrl(url);
    setPdfFileName('Reglamento_Enlace_Web.pdf');
    try {
      localStorage.setItem(
        STORAGE_PDF_KEY,
        JSON.stringify({ dataUrl: url, fileName: 'Reglamento_Enlace_Web.pdf', updatedAt: new Date().toISOString() })
      );
    } catch (err) {
      console.error(err);
    }
    setPdfUrlInput('');
  };

  const handleRemovePdf = () => {
    if (window.confirm('¿Está seguro de eliminar el PDF cargado para este torneo?')) {
      setPdfDataUrl(null);
      setPdfFileName('');
      localStorage.removeItem(STORAGE_PDF_KEY);
    }
  };

  // Official tournament rulebook chapters for interactive search
  const ARTICLES = [
    {
      capitulo: 'CAPÍTULO I: JUNTA DIRECTIVA Y ESPÍRITU DEL CAMPEONATO',
      articulos: [
        {
          num: 'Art. 1',
          titulo: 'Suprema Autoridad y Autonomía',
          texto:
            'El Campeonato de Fútbol Banquitas San Simón (Banca Recreativo) cuenta con una Junta Directiva que es la suprema autoridad del torneo, encargada de velar por su normal desarrollo. Sus decisiones son autónomas y de obligatorio acatamiento por equipos, delegados y jugadores.\nUbicación: Parque San Simón, Chinú, Córdoba.\nContacto: campeonatobanquitasschinu@gmail.com | Instagram: @banquitas_san_Simón',
        },
        {
          num: 'Art. 2',
          titulo: 'Conformación de la Junta Directiva',
          texto:
            'La Junta Directiva está integrada por:\n• Presidente: ALBERT MONTERROZA\n• Tesorero: JORGE LUIS PINTO\n• Secretario: PEDRO DE LEÓN\n• Fiscales: IVAN DIAZ RAMOS\n• Vocales: EDUAR MONTIEL P\nCada equipo contará con un delegado representante ante la Junta para tratar asuntos oficiales.',
        },
        {
          num: 'Art. 3',
          titulo: 'Requisitos de Inscripción y Cuotas',
          texto:
            '• Cuota por vuelta: Cada jugador debe cancelar $25.000 por vuelta hasta la 5ª fecha de cada vuelta. Si juega sin cancelar, el equipo perderá los puntos por alineación indebida.\n• Edad mínima: 38 años cumplidos para ingresar como miembro activo.\n• Cuota de ingreso aspirantes nuevos: $60.000 cancelables a más tardar al culminar la tercera vuelta.',
        },
      ],
    },
    {
      capitulo: 'CAPÍTULO II: SISTEMA DE COMPETENCIA Y HORARIOS',
      articulos: [
        {
          num: 'Art. 4',
          titulo: 'Nómina de Jugadores por Equipo',
          texto:
            'El campeonato está conformado por ocho (8) equipos. Cada equipo inscribirá una nómina máxima de ocho (8) jugadores. En cancha se alineará un máximo de 5 jugadores y un mínimo de 4 para poder disputar el encuentro.',
        },
        {
          num: 'Art. 5',
          titulo: 'Formato de Torneo (5 Vueltas + Fases Finales)',
          texto:
            '• Fase Regular: Se jugará a 5 vueltas todos contra todos.\n• Clasificación Directa: El equipo que ocupe el 1° PUESTO al cabo de las 5 vueltas clasifica directamente al Cuadrangular Final. El 8° PUESTO queda automáticamente ELIMINADO.\n• Muerte Súbita: Los 6 equipos restantes (2° al 7°) jugarán a eliminación directa a muerte súbita. Los 3 ganadores se unen al 1° lugar para conformar el Cuadrangular Final por sorteo (1° vs 4° y 2° vs 3°).\n• Los perdedores definirán el 3° y 4° puesto, y los ganadores disputarán la Gran Final.',
        },
        {
          num: 'Art. 6',
          titulo: 'Duración del Partido y Programación Horaria',
          texto:
            'El tiempo reglamentario es de 40 minutos (dos tiempos de 20 minutos con descanso intermedio de 5 minutos).\nHorarios de los partidos en Cancha San Simón:\n• 1ra Hora: 7:00 p.m. a 7:50 p.m. (10 minutos de tiempo de espera único)\n• 2da Hora: 7:55 p.m. a 8:45 p.m. (5 minutos de tiempo de espera)\n• 3ra Hora: 8:50 p.m. a 9:40 p.m. (5 minutos de tiempo de espera)\n• 4ta Hora: 9:45 p.m. a 10:30 p.m. (5 minutos de tiempo de espera)',
        },
        {
          num: 'Art. 7',
          titulo: 'Sustituciones y Solicitud de Tiempo',
          texto:
            '• Cambios: Se permiten máximo cinco (5) cambios por periodo de juego. Todos los jugadores inscritos en planilla deben ingresar a jugar obligatoriamente (mínimo 1 cambio por jugador), so pena de perder el partido por marcador 3 - 0.\n• Tiempo Muerto: Se podrá solicitar un (1) tiempo muerto de un (1) minuto por equipo por cada periodo de juego con el balón fuera de cancha.',
        },
      ],
    },
    {
      capitulo: 'CAPÍTULO III: REGLAMENTO DE JUEGO Y ÁREA DE BANQUITAS',
      articulos: [
        {
          num: 'Art. 8',
          titulo: 'Especificaciones de Cancha y Arcos',
          texto:
            'La cancha y sus medidas corresponden a las de Microfútbol. Los arcos (banquitas) tienen medidas de 1.00 metro de largo por 0.60 metros de alto.',
        },
        {
          num: 'Art. 9',
          titulo: 'Área en Semicírculo (1.20m de Radio)',
          texto:
            'El área está delimitada por un semicírculo de 1.20 m de radio. Ningún jugador puede tocar la pelota dentro de este semicírculo:\n• Infracción de Atacante: Se declara falta y saque de arco para el defensor. Si el atacante anota dentro del semicírculo, EL GOL ES ANULADO.\n• Infracción de Defensor: Se sanciona PENA MÁXIMA a favor del atacante y TARJETA AMARILLA al infractor.\n• Autogol: El autogol dentro del semicírculo sí es válido.',
        },
        {
          num: 'Art. 10',
          titulo: 'Prohibición de Cobro Directo y "Punterazo"',
          texto:
            '• Cobro de Faltas: Toda falta debe cobrarse mediante doble jugada hacia los costados o atrás del área. Quien cobre de forma directa al arco contrario o violenta a la barrera será sancionado con TARJETA AMARILLA.\n• Tiro de Puntera ("Punterazo"): Rematar a portería con la punta del pie es falta sancionable con TARJETA AMARILLA y tiro libre indirecto a favor del rival.',
        },
        {
          num: 'Art. 11',
          titulo: 'Faltas Personales Acumuladas',
          texto:
            'Tres (3) faltas personales acumuladas por un jugador en un partido ameritan Tarjeta Amarilla. Al acumular cinco (5) faltas personales en el mismo juego, se sancionará con Tarjeta Azul.',
        },
        {
          num: 'Art. 12',
          titulo: 'Ejecución de la Pena Máxima (Penal)',
          texto:
            'La pena máxima se cobra desde el centro de la cancha. Todos los demás jugadores deben permanecer detrás de la línea central al momento del cobro. Si un jugador intercepta la trayectoria del balón recibirá Tarjeta Azul (y Tarjeta Roja si reincide).',
        },
        {
          num: 'Art. 13',
          titulo: 'Obligatoriedad del Jugador de 8vo Nivel',
          texto:
            'Todo equipo debe contar en su nómina con un jugador clasificado en el 8vo nivel. Este jugador debe ser alineado obligatoriamente durante un mínimo de doce (12) minutos en cualquiera de los dos tiempos del partido.',
        },
        {
          num: 'Art. 14',
          titulo: 'Arrastre Intencional de Arcos',
          texto:
            'El jugador que arrastre intencionalmente los arcos para evitar un gol en contra será sancionado con TARJETA AZUL y se decretará pena máxima en contra de su equipo.',
        },
      ],
    },
    {
      capitulo: 'CAPÍTULO IV: CÓDIGO DE PENAS, TARJETAS Y MULTAS',
      articulos: [
        {
          num: 'Art. 15',
          titulo: 'Tarjeta Amarilla (🟨 Amonestación)',
          texto:
            '• Valor económico: $2.000 por tarjeta.\n• Acumulación: Tres (3) tarjetas amarillas acumuladas acarrean suspensión automática por una (1) fecha o en su defecto multa de $10.000 más el valor de la tarjeta.\n• Las tarjetas amarillas no se borran al pasar de una vuelta a otra.',
        },
        {
          num: 'Art. 16',
          titulo: 'Tarjeta Azul (🟦 Cambio Forzoso)',
          texto:
            '• Valor económico: $5.000 por tarjeta.\n• Implica cambio forzoso inmediato del jugador sancionado. Si el equipo ya agotó sus cambios o queda con 3 jugadores, perderá el partido por sustracción de materia.\n• Acumulación: Tres (3) tarjetas azules acarrean una (1) fecha de suspensión o $10.000 de multa más el valor de la tarjeta.\n• Nota: 2 Amarillas + 1 Azul acumuladas = 1 Fecha de Suspensión.',
        },
        {
          num: 'Art. 17',
          titulo: 'Tarjeta Roja (🟥 Expulsión)',
          texto:
            '• Valor económico: $10.000 más una (1) fecha de sanción automática.\n• Acumulación: Dos (2) tarjetas rojas en el torneo acarrean 4 fechas de suspensión más $50.000 de multa.\n• Tipificación según informe arbitral:\n  1) Falta de juego sin alteración: 1 fecha sin multa.\n  2) Falta de juego + palabras soeces: 1 fecha + $10.000 multa.\n  3) Falta de juego + agresión verbal/física a rivales/árbitro: 2 fechas + $20.000 multa.\n  4) Agresión grave / lenguaje obsceno a dirigentes o espectadores: 4 fechas + $50.000 multa.',
        },
        {
          num: 'Art. 18',
          titulo: 'Pérdida de Puntos y Walkover (W.O.)',
          texto:
            '• Marcador Oficial: Todo partido perdido por W.O. o sanción administrativa se registra con marcador tres a cero (3 - 0).\n• Sanción por W.O.: El equipo que no se presente pierde el partido 3-0, se le restan 3 puntos adicionales de los ya ganados y los jugadores inasistentes reciben multa de $50.000.\n• Sustracción de materia: Si un equipo queda con menos de 4 jugadores (3 jugadores) en campo, perderá el partido automáticamente 3-0.',
        },
        {
          num: 'Art. 19',
          titulo: 'Expulsión Definitiva del Torneo',
          texto:
            'Provocan expulsión inmediata del campeonato: agresión física o verbal grave a jugadores, árbitros, dirigentes o público; participar en riñas; agresión lesiva o fraude. El infractor deberá pagar multa de $50.000 para cualquier eventual postulación futura.',
        },
      ],
    },
    {
      capitulo: 'CAPÍTULO V: CRITERIOS DE DESEMPATE Y DEMANDAS',
      articulos: [
        {
          num: 'Art. 20',
          titulo: 'Criterios Oficiales de Desempate en la Tabla',
          texto:
            'Si se presenta empate en puntos entre dos o más equipos en las fases clasificatorias, la posición se definirá en el siguiente orden estricto:\n1. Mayor Diferencia de Goles (DG)\n2. Mayor número de partidos ganados (PG)\n3. Mayor número de goles a favor (GF)\n4. Menor número de goles en contra (GC)\n5. Mayor número de partidos ganados entre los equipos involucrados\n6. Sorteo público ante la Junta Directiva',
        },
        {
          num: 'Art. 21',
          titulo: 'Procedimiento para Demandas de Partidos',
          texto:
            '• Concepto: Solicitud de nulidad o adjudicación de puntos de un partido por infracción a los estatutos o alineación indebida.\n• Plazo: La demanda debe radicar por escrito ante la Junta Directiva dentro de las 24 horas siguientes a la finalización del encuentro, acompañada de las pruebas correspondientes.\n• Costo: La presentación de demanda NO requiere pago de suma de dinero (es gratuita).',
        },
      ],
    },
  ];

  const filteredArticles = ARTICLES.map((cap) => ({
    ...cap,
    articulos: cap.articulos.filter(
      (art) =>
        art.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.texto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.num.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cap) => cap.articulos.length > 0);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight uppercase font-mono">
                  Reglamento Oficial del Torneo
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  {selectedEditionName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Consulte y administre el reglamento del campeonato en formato PDF oficial o articulado interactivo.
              </p>
            </div>
          </div>

          {/* Sub Tab Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveSubTab('pdf')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'pdf'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Documento PDF
            </button>
            <button
              onClick={() => setActiveSubTab('text')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'text'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Reglamento Articulado
            </button>
          </div>
        </div>
      </div>

      {/* SUB TAB 1: PDF DOCUMENT VIEWER & UPLOADER */}
      {activeSubTab === 'pdf' && (
        <div className="space-y-6">
          {/* PDF Admin Upload Panel (If in Edit Mode or if no PDF exists) */}
          {(isEditMode || !pdfDataUrl) && (
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    {pdfDataUrl ? 'Actualizar Archivo PDF de Reglamento' : 'Cargar Documento PDF del Reglamento'}
                  </h3>
                </div>
                {isEditMode && (
                  <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                    Modo Edición Habilitado
                  </span>
                )}
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragOver
                    ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                    : 'border-slate-700 bg-slate-950/60 hover:border-slate-500'
                }`}
              >
                <FilePlus className="w-10 h-10 text-amber-400 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-semibold text-white">
                  Arrastra y suelta aquí el archivo del Reglamento en formato PDF
                </p>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Soporta documentos PDF de las reglas oficiales del torneo (Máx. 12 MB)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase cursor-pointer transition shadow-md flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Seleccionar PDF desde mi dispositivo
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* URL Alternative input */}
              <form onSubmit={handleUrlSubmit} className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="O pega aquí un enlace directo a un archivo PDF (https://...)"
                  value={pdfUrlInput}
                  onChange={(e) => setPdfUrlInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={!pdfUrlInput.trim()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Cargar Enlace
                </button>
              </form>
            </div>
          )}

          {/* PDF Previewer Container */}
          {pdfDataUrl ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* PDF Action Bar */}
              <div className="bg-slate-950 p-3 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono truncate max-w-xs sm:max-w-md">
                      {pdfFileName || 'Reglamento_Oficial_Banquitas.pdf'}
                    </h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3" /> PDF cargado correctamente
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={pdfDataUrl}
                    download={pdfFileName || 'Reglamento_Banquitas_San_Simon.pdf'}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition"
                    title="Descargar Reglamento PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar PDF
                  </a>

                  <a
                    href={pdfDataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
                    title="Abrir en pestaña nueva"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    Abrir en Ventana Completa
                  </a>

                  {isEditMode && (
                    <button
                      onClick={handleRemovePdf}
                      className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                      title="Eliminar PDF cargado"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Eliminar PDF</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Embedded PDF Viewer iFrame / Object */}
              <div className="w-full h-[650px] bg-slate-950 relative">
                <iframe
                  src={pdfDataUrl}
                  title="Visor del Reglamento PDF"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          ) : (
            /* Fallback state when no custom PDF has been uploaded yet */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
                <FileText className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-bold text-white">No hay un archivo PDF personalizado cargado</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Para visualizar el folleto o documento oficial del campeonato en PDF, activa el{' '}
                  <strong className="text-amber-300">Modo Edición 🔒</strong> o utiliza el botón de carga superior para adjuntar el archivo <span className="font-mono text-amber-300">.pdf</span> del reglamento.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveSubTab('text')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  Ver Reglamento Articulado Interactivo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB TAB 2: INTERACTIVE TEXTUAL RULEBOOK */}
      {activeSubTab === 'text' && (
        <div className="space-y-6">
          {/* Search bar & print bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md print:hidden">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar artículo, tema o regla (ej: Amarilla, W.O., tiempo)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                Imprimir / Exportar a PDF
              </button>
            </div>
          </div>

          {/* Quick Info Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Duración</span>
                <p className="text-xs font-bold text-white mt-0.5">2 Tiempos de 20 min</p>
                <span className="text-[10px] text-slate-400">5 min de descanso</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Modalidad</span>
                <p className="text-xs font-bold text-white mt-0.5">5 vs 5 Sin Arquero</p>
                <span className="text-[10px] text-slate-400">Banquitas de campo</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Acumulación</span>
                <p className="text-xs font-bold text-yellow-300 mt-0.5">3 Tarjetas</p>
                <span className="text-[10px] text-slate-400">= 1 Fecha de Suspensión</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Puntuación</span>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">3 Pts Victoria | 1 Empate</p>
                <span className="text-[10px] text-slate-400">W.O. Oficial = 3-0</span>
              </div>
            </div>
          </div>

          {/* Chapters and Articles list */}
          <div className="space-y-5">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((cap, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-xs font-black text-amber-400 tracking-wider uppercase font-mono">
                      {cap.capitulo}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {cap.articulos.length} artículos
                    </span>
                  </div>

                  <div className="p-5 space-y-4 divide-y divide-slate-800/60">
                    {cap.articulos.map((art, aIdx) => (
                      <div key={aIdx} className={aIdx > 0 ? 'pt-4' : ''}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-[11px] font-mono font-bold border border-slate-700">
                            {art.num}
                          </span>
                          <h4 className="text-sm font-bold text-white">{art.titulo}</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-1 whitespace-pre-line">
                          {art.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                No se encontraron artículos que coincidan con la búsqueda "<span className="text-amber-300 font-bold">{searchTerm}</span>".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
