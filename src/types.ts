export type TeamId = 'AZUL' | 'AMARILLO' | 'NARANJA' | 'NEGRO' | 'BLANCO' | 'ROJO' | 'RAYADO' | 'VERDE';

export interface Team {
  id: TeamId;
  name: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  secondaryColor: string;
  delegate?: string;
}

export interface TournamentEdition {
  id: string;
  name: string;
  status: 'EN_CURSO' | 'FINALIZADO';
  champion?: string;
}

export type CardType = 'AMARILLA' | 'AZUL' | 'ROJA';

export interface CardRecord {
  id: string;
  playerId: number;
  fecha: number; // 1 to 38
  type: CardType;
  minute?: number;
  notes?: string;
  createdAt: string;
}

export interface GoalRecord {
  id: string;
  playerId: number;
  fecha: number; // 1 to 38
  minute?: number;
  teamId: TeamId;
  createdAt: string;
}

export interface Player {
  id: number;
  dorsal: number;
  name: string;
  teamId: TeamId;
  isCaptain?: boolean;
}

export interface Match {
  id: string;
  fecha: number; // 1 to 38
  homeTeamId: TeamId;
  awayTeamId: TeamId;
  homeGoals: number;
  awayGoals: number;
  isPlayed: boolean;
  status?: 'PROGRAMADO' | 'EN_VIVO' | 'FINALIZADO';
  dateStr?: string;
}

export interface SuspensionAlert {
  playerId: number;
  playerName: string;
  teamId: TeamId;
  dorsal: number;
  reason: '3_AMARILLAS' | '1_ROJA' | 'MANUAL';
  suspendedForFecha: number; // The fecha where player MUST NOT play
  status: 'PENDIENTE' | 'CUMPLIDA' | 'EXPIRADA';
  details: string;
}

export interface PlayerStats {
  playerId: number;
  name: string;
  dorsal: number;
  teamId: TeamId;
  amarillas: number;
  azules: number;
  rojas: number;
  totalCards: number;
  goles: number;
  matchesPlayed: number;
  isCurrentlySuspended: boolean;
  suspensionReason?: string;
  suspendedForFecha?: number;
  cardsPerFecha: Record<number, { amarillas: number; azules: number; rojas: number }>;
  goalsPerFecha: Record<number, number>;
}

export interface TeamStandings {
  teamId: TeamId;
  teamName: string;
  pj: number; // Partidos Jugados
  pg: number; // Ganados
  pe: number; // Empatados
  pp: number; // Perdidos
  gf: number; // Goles Favor
  gc: number; // Goles Contra
  dg: number; // Dif Goles
  pts: number; // Puntos
  fairPlayPts: number; // Puntos juego limpio (Amarilla = -1, Azul = -2, Roja = -3)
  amarillas: number;
  azules: number;
  rojas: number;
}
