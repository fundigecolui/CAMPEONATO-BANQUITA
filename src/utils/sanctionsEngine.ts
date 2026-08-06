import { Player, CardRecord, GoalRecord, Match, Team, PlayerStats, SuspensionAlert, TeamStandings, TeamId } from '../types';

/**
 * Calculates comprehensive player stats and suspensions across 38 dates
 */
export function computePlayerStats(
  players: Player[],
  cards: CardRecord[],
  goals: GoalRecord[],
  currentActiveFecha: number = 1
): { stats: PlayerStats[]; activeSuspensions: SuspensionAlert[]; allSuspensions: SuspensionAlert[] } {
  const statsMap: Record<number, PlayerStats> = {};
  const allSuspensions: SuspensionAlert[] = [];

  // Initialize stats for all 70 players
  players.forEach((p) => {
    statsMap[p.id] = {
      playerId: p.id,
      name: p.name,
      dorsal: p.dorsal,
      teamId: p.teamId,
      amarillas: 0,
      azules: 0,
      rojas: 0,
      totalCards: 0,
      goles: 0,
      matchesPlayed: 0,
      isCurrentlySuspended: false,
      cardsPerFecha: {},
      goalsPerFecha: {},
    };
  });

  // Aggregate goals (Only goals <= Fecha 35 count for the Goleador title per official rules)
  goals.forEach((g) => {
    if (statsMap[g.playerId]) {
      statsMap[g.playerId].goalsPerFecha[g.fecha] = (statsMap[g.playerId].goalsPerFecha[g.fecha] || 0) + 1;
      if (g.fecha <= 35) {
        statsMap[g.playerId].goles += 1;
      }
    }
  });

  // Aggregate cards & compute suspensions chronologically per player
  players.forEach((p) => {
    const playerCards = cards.filter((c) => c.playerId === p.id).sort((a, b) => a.fecha - b.fecha);
    const pStat = statsMap[p.id];

    let yellowAccumulator = 0;

    playerCards.forEach((c) => {
      // Record card count per fecha
      if (!pStat.cardsPerFecha[c.fecha]) {
        pStat.cardsPerFecha[c.fecha] = { amarillas: 0, azules: 0, rojas: 0 };
      }

      if (c.type === 'AMARILLA') {
        pStat.amarillas += 1;
        pStat.cardsPerFecha[c.fecha].amarillas += 1;
        yellowAccumulator += 1;

        // Rule: 3 Yellow cards -> 1 Match Suspension for next fecha (c.fecha + 1)
        if (yellowAccumulator % 3 === 0) {
          allSuspensions.push({
            playerId: p.id,
            playerName: p.name,
            teamId: p.teamId,
            dorsal: p.dorsal,
            reason: '3_AMARILLAS',
            suspendedForFecha: c.fecha + 1,
            status: c.fecha + 1 <= currentActiveFecha ? (c.fecha + 1 === currentActiveFecha ? 'PENDIENTE' : 'CUMPLIDA') : 'PENDIENTE',
            details: `Acumuló ${yellowAccumulator} amarillas en Fecha ${c.fecha}. Suspendido para Fecha ${c.fecha + 1}.`,
          });
        }
      } else if (c.type === 'AZUL') {
        pStat.azules += 1;
        pStat.cardsPerFecha[c.fecha].azules += 1;
      } else if (c.type === 'ROJA') {
        pStat.rojas += 1;
        pStat.cardsPerFecha[c.fecha].rojas += 1;

        // Rule: 1 Red Card -> Automatic 1 Match Suspension for next fecha (c.fecha + 1)
        allSuspensions.push({
          playerId: p.id,
          playerName: p.name,
          teamId: p.teamId,
          dorsal: p.dorsal,
          reason: '1_ROJA',
          suspendedForFecha: c.fecha + 1,
          status: c.fecha + 1 <= currentActiveFecha ? (c.fecha + 1 === currentActiveFecha ? 'PENDIENTE' : 'CUMPLIDA') : 'PENDIENTE',
          details: `Tarjeta roja directa en Fecha ${c.fecha}. Suspendido para Fecha ${c.fecha + 1}.`,
        });
      }

      pStat.totalCards = pStat.amarillas + pStat.azules + pStat.rojas;
    });

    // Determine if player is suspended specifically for the CURRENT SELECTED FECHA
    const activeSuspension = allSuspensions.find(
      (s) => s.playerId === p.id && s.suspendedForFecha === currentActiveFecha
    );

    if (activeSuspension) {
      pStat.isCurrentlySuspended = true;
      pStat.suspensionReason = activeSuspension.reason === '3_AMARILLAS' ? 'Acumulación 3 Amarillas' : 'Tarjeta Roja';
      pStat.suspendedForFecha = currentActiveFecha;
    }
  });

  // Filter suspensions active specifically for current active fecha
  const activeSuspensions = allSuspensions.filter((s) => s.suspendedForFecha === currentActiveFecha);

  const statsList = Object.values(statsMap);

  return { stats: statsList, activeSuspensions, allSuspensions };
}

/**
 * Computes League Standings (Tabla de Posiciones) from played matches and fair play cards
 */
export function computeStandings(
  teams: Team[],
  matches: Match[],
  cards: CardRecord[] = [],
  players: Player[] = [],
  maxFecha: number = 35
): TeamStandings[] {
  const standingsMap: Record<TeamId, TeamStandings> = {} as any;

  teams.forEach((t) => {
    standingsMap[t.id] = {
      teamId: t.id,
      teamName: t.name,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      dg: 0,
      pts: 0,
      fairPlayPts: 100, // Starts at 100
      amarillas: 0,
      azules: 0,
      rojas: 0,
    };
  });

  // Process Played Matches up to maxFecha (Fase Regular Todos contra Todos)
  matches.forEach((m) => {
    if (!m.isPlayed) return;
    if (m.fecha > maxFecha) return;

    const home = standingsMap[m.homeTeamId];
    const away = standingsMap[m.awayTeamId];

    if (!home || !away) return;

    home.pj += 1;
    away.pj += 1;

    home.gf += m.homeGoals;
    home.gc += m.awayGoals;

    away.gf += m.awayGoals;
    away.gc += m.homeGoals;

    if (m.homeGoals > m.awayGoals) {
      home.pg += 1;
      home.pts += 3;
      away.pp += 1;
    } else if (m.homeGoals < m.awayGoals) {
      away.pg += 1;
      away.pts += 3;
      home.pp += 1;
    } else {
      home.pe += 1;
      home.pts += 1;
      away.pe += 1;
      away.pts += 1;
    }
  });

  // Calculate Goal Difference
  Object.values(standingsMap).forEach((s) => {
    s.dg = s.gf - s.gc;
  });

  // Deduct Fair Play Points based on team cards (only up to maxFecha)
  cards.forEach((c) => {
    if (c.fecha > maxFecha) return;
    const p = players.find((player) => player.id === c.playerId);
    if (p && standingsMap[p.teamId]) {
      const t = standingsMap[p.teamId];
      if (c.type === 'AMARILLA') {
        t.amarillas += 1;
        t.fairPlayPts -= 1;
      } else if (c.type === 'AZUL') {
        t.azules += 1;
        t.fairPlayPts -= 2;
      } else if (c.type === 'ROJA') {
        t.rojas += 1;
        t.fairPlayPts -= 3;
      }
    }
  });

  const sortedStandings = Object.values(standingsMap).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.teamName.localeCompare(b.teamName);
  });

  return sortedStandings;
}

export interface EliminationCheckResult {
  isEliminated: boolean;
  eliminatedTeamId: TeamId | null;
  eliminatedTeamName: string | null;
  seventhTeamId: TeamId | null;
  seventhTeamName: string | null;
  seventhTeamPts: number;
  lastTeamPts: number;
  lastTeamMaxPossiblePts: number;
  remainingMatchesForLastTeam: number;
}

export function checkMathematicalElimination(
  standings: TeamStandings[],
  matches: Match[]
): EliminationCheckResult {
  if (!standings || standings.length < 8) {
    return {
      isEliminated: false,
      eliminatedTeamId: null,
      eliminatedTeamName: null,
      seventhTeamId: null,
      seventhTeamName: null,
      seventhTeamPts: 0,
      lastTeamPts: 0,
      lastTeamMaxPossiblePts: 0,
      remainingMatchesForLastTeam: 0,
    };
  }

  const seventh = standings[6]; // 7th place
  const eighth = standings[7]; // 8th place (last team)

  if (!seventh || !eighth) {
    return {
      isEliminated: false,
      eliminatedTeamId: null,
      eliminatedTeamName: null,
      seventhTeamId: null,
      seventhTeamName: null,
      seventhTeamPts: 0,
      lastTeamPts: 0,
      lastTeamMaxPossiblePts: 0,
      remainingMatchesForLastTeam: 0,
    };
  }

  // Count remaining unplayed regular season matches (fechas 1 to 35) for 8th team
  const unplayedMatchesForEighth = matches.filter(
    (m) =>
      m.fecha <= 35 &&
      !m.isPlayed &&
      (m.homeTeamId === eighth.teamId || m.awayTeamId === eighth.teamId)
  );

  const remainingMatchesCount = unplayedMatchesForEighth.length;
  const maxPossiblePts = eighth.pts + remainingMatchesCount * 3;

  // Condition: Last team mathematically CANNOT reach 7th place (maxPossiblePts < seventh.pts)
  const totalRegularPlayed = matches.filter((m) => m.fecha <= 35 && m.isPlayed).length;
  const isEliminated = totalRegularPlayed > 0 && maxPossiblePts < seventh.pts;

  return {
    isEliminated,
    eliminatedTeamId: eighth.teamId,
    eliminatedTeamName: eighth.teamName,
    seventhTeamId: seventh.teamId,
    seventhTeamName: seventh.teamName,
    seventhTeamPts: seventh.pts,
    lastTeamPts: eighth.pts,
    lastTeamMaxPossiblePts: maxPossiblePts,
    remainingMatchesForLastTeam: remainingMatchesCount,
  };
}

