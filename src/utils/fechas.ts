export const FECHA_DATES: Record<number, string> = {
  1: '4 de Agosto',
  2: '6 de Agosto',
  3: '11 de Agosto',
  4: '13 de Agosto',
  5: '18 de Agosto',
  6: '20 de Agosto',
  7: '25 de Agosto',
  8: '27 de Agosto',
  9: '1 de Septiembre',
  10: '3 de Septiembre',
  11: '8 de Septiembre',
  12: '10 de Septiembre',
  13: '15 de Septiembre',
  14: '17 de Septiembre',
  15: '22 de Septiembre',
  16: '24 de Septiembre',
  17: '29 de Septiembre',
  18: '1 de Octubre',
  19: '6 de Octubre',
  20: '8 de Octubre',
  21: '13 de Octubre',
  22: '15 de Octubre',
  23: '20 de Octubre',
  24: '22 de Octubre',
  25: '27 de Octubre',
  26: '29 de Octubre',
  27: '3 de Noviembre',
  28: '5 de Noviembre',
  29: '10 de Noviembre',
  30: '12 de Noviembre',
  31: '17 de Noviembre',
  32: '19 de Noviembre',
  33: '24 de Noviembre',
  34: '26 de Noviembre',
  35: '1 de Diciembre',
  36: '3 de Diciembre',
  37: '8 de Diciembre',
  38: '10 de Diciembre',
};

export function getFechaLabel(fecha: number): string {
  if (fecha === 36) return 'FASE ELIMINATORIA';
  if (fecha === 37) return 'SEMIFINAL';
  if (fecha === 38) return 'GRAN FINAL Y 3ER PUESTO';
  const dateStr = FECHA_DATES[fecha];
  return dateStr ? `Fecha ${fecha} (${dateStr})` : `Fecha ${fecha}`;
}

export function getFechaFullTitle(fecha: number): string {
  if (fecha === 36) return 'Fecha 36 - FASE ELIMINATORIA';
  if (fecha === 37) return 'Fecha 37 - SEMIFINAL';
  if (fecha === 38) return 'Fecha 38 - GRAN FINAL Y TERCER PUESTO';
  const dateStr = FECHA_DATES[fecha];
  return dateStr ? `Fecha ${fecha} - ${dateStr}` : `Fecha ${fecha}`;
}

export function getFechaBadgeStyle(fecha: number): { bg: string; text: string; border: string } {
  if (fecha === 36) {
    return { bg: 'bg-purple-600', text: 'text-white', border: 'border-purple-400' };
  }
  if (fecha === 37) {
    return { bg: 'bg-amber-500', text: 'text-slate-950', border: 'border-amber-400' };
  }
  if (fecha === 38) {
    return { bg: 'bg-emerald-500', text: 'text-slate-950', border: 'border-emerald-400' };
  }
  return { bg: 'bg-slate-800', text: 'text-amber-300', border: 'border-slate-700' };
}

export function formatMatchId(id: string): string {
  if (!id) return '';
  return id.replace(/^m/i, 'P');
}

