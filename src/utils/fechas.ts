export const FECHA_DATES: Record<number, string> = {
  1: '4 de Agosto',
  2: '6 de Agosto',
  3: '11 de Agosto',
  4: '13 de Agosto',
  5: '18 de Agosto',
  6: '20 de Agosto',
  7: '25 de Agosto',
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
