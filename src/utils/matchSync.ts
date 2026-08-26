import { Match } from '../types';
import { FECHA_DATES } from './fechas';

export const MATCH_SLOT_TIMES = [
  { slot: 1, label: '7:00 p.m. - 7:50 p.m.', startHour: 19, startMin: 0, endHour: 19, endMin: 50 },
  { slot: 2, label: '7:55 p.m. - 8:45 p.m.', startHour: 19, startMin: 55, endHour: 20, endMin: 45 },
  { slot: 3, label: '8:50 p.m. - 9:40 p.m.', startHour: 20, startMin: 50, endHour: 21, endMin: 40 },
  { slot: 4, label: '9:45 p.m. - 10:30 p.m.', startHour: 21, startMin: 45, endHour: 22, endMin: 30 },
];

const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

/**
 * Parses a date string like "6 de Agosto", "6 de Agosto de 2026", or "2026-08-06"
 */
export function parseFechaDate(dateStr?: string, fechaNumber?: number, defaultYear: number = 2026): { day: number; month: number; year: number } {
  const str = dateStr || (fechaNumber ? FECHA_DATES[fechaNumber] : '');

  if (str) {
    // Check ISO YYYY-MM-DD
    const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      return {
        year: parseInt(isoMatch[1], 10),
        month: parseInt(isoMatch[2], 10) - 1,
        day: parseInt(isoMatch[3], 10),
      };
    }

    // Check "6 de Agosto" or "6 de Agosto de 2026"
    const match = str.match(/(\d{1,2})\s+de\s+([a-zA-Z]+)(?:\s+de\s+(\d{4}))?/i);
    if (match) {
      const day = parseInt(match[1], 10);
      const monthName = match[2].toLowerCase();
      const month = SPANISH_MONTHS[monthName] ?? 7;
      const year = match[3] ? parseInt(match[3], 10) : defaultYear;
      return { day, month, year };
    }
  }

  // Fallback for fecha 1..38 if date string is missing
  if (fechaNumber && FECHA_DATES[fechaNumber]) {
    return parseFechaDate(FECHA_DATES[fechaNumber], undefined, defaultYear);
  }

  return { day: 6, month: 7, year: defaultYear };
}

/**
 * Parses time string like "7:00 p.m. - 7:50 p.m." or defaults to matchIdx slot
 */
export function parseMatchTimeRange(
  timeStr?: string,
  matchIdxInFecha: number = 0
): { startHour: number; startMin: number; endHour: number; endMin: number } {
  const defaultSlot = MATCH_SLOT_TIMES[matchIdxInFecha % 4];

  if (!timeStr) {
    return {
      startHour: defaultSlot.startHour,
      startMin: defaultSlot.startMin,
      endHour: defaultSlot.endHour,
      endMin: defaultSlot.endMin,
    };
  }

  const parts = timeStr.split('-');
  if (parts.length === 2) {
    const start = parseSingleTime(parts[0]);
    const end = parseSingleTime(parts[1]);
    if (start && end) {
      return {
        startHour: start.hour,
        startMin: start.minute,
        endHour: end.hour,
        endMin: end.minute,
      };
    }
  }

  return {
    startHour: defaultSlot.startHour,
    startMin: defaultSlot.startMin,
    endHour: defaultSlot.endHour,
    endMin: defaultSlot.endMin,
  };
}

function parseSingleTime(str: string): { hour: number; minute: number } | null {
  const match = str.match(/(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)?/i);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toLowerCase().replace(/\./g, '') : null;

  if (ampm === 'pm' && hour < 12) {
    hour += 12;
  } else if (ampm === 'am' && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
}

/**
 * Returns exact start and end Date objects for a match
 */
export function getMatchStartAndEndDates(
  match: Match,
  matchIdxInFecha: number = 0,
  defaultYear: number = 2026
): { startDate: Date; endDate: Date } {
  const { day, month, year } = parseFechaDate(match.dateStr, match.fecha, defaultYear);
  const { startHour, startMin, endHour, endMin } = parseMatchTimeRange(match.time, matchIdxInFecha);

  const startDate = new Date(year, month, day, startHour, startMin, 0, 0);
  const endDate = new Date(year, month, day, endHour, endMin, 0, 0);

  return { startDate, endDate };
}

/**
 * Auto-syncs match statuses according to date & time
 */
export function syncMatchStatuses(
  matches: Match[],
  now: Date = new Date(),
  defaultYear: number = 2026
): { syncedMatches: Match[]; hasChanges: boolean } {
  const fechaCounts: Record<number, number> = {};
  let hasChanges = false;

  const syncedMatches = matches.map((match) => {
    const f = match.fecha || 1;
    const matchIdxInFecha = fechaCounts[f] || 0;
    fechaCounts[f] = matchIdxInFecha + 1;

    if (match.status === 'SUSPENDIDO') {
      return match;
    }

    const { startDate, endDate } = getMatchStartAndEndDates(match, matchIdxInFecha, defaultYear);

    let targetStatus: 'PROGRAMADO' | 'EN_VIVO' | 'FINALIZADO';
    let targetPlayed = match.isPlayed;

    if (now >= startDate && now <= endDate) {
      targetStatus = 'EN_VIVO';
    } else if (now > endDate) {
      targetStatus = 'FINALIZADO';
      targetPlayed = true;
    } else {
      targetStatus = 'PROGRAMADO';
    }

    if (match.status !== targetStatus || match.isPlayed !== targetPlayed) {
      hasChanges = true;
      return {
        ...match,
        status: targetStatus,
        isPlayed: targetPlayed,
      };
    }

    return match;
  });

  return { syncedMatches, hasChanges };
}
