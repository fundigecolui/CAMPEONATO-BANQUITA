import { Player, CardRecord, GoalRecord, Match } from '../types';
import { generateAllTournamentMatches } from '../utils/fixtureGenerator';

export const PLAYERS_2026_2: Player[] = [
  // 1. AZUL
  { id: 401, dorsal: 10, name: 'JOSE FIGUEROA', teamId: 'AZUL' },
  { id: 402, dorsal: 1, name: 'ALBERTO OSPINA', teamId: 'AZUL' },
  { id: 403, dorsal: 2, name: 'ANIBAL ROMERO', teamId: 'AZUL' },
  { id: 404, dorsal: 3, name: 'OSCAR PACHECO', teamId: 'AZUL' },
  { id: 405, dorsal: 5, name: 'ALBEIRO BUENDIA', teamId: 'AZUL' },
  { id: 406, dorsal: 6, name: 'LEONARDO CASTILLO', teamId: 'AZUL', isCaptain: true },
  { id: 407, dorsal: 7, name: 'MOISES GOMEZ', teamId: 'AZUL' },
  { id: 408, dorsal: 8, name: 'DOUGLAS CORREA', teamId: 'AZUL' },

  // 2. VERDE
  { id: 409, dorsal: 18, name: 'YAMIR PINEDA', teamId: 'VERDE' },
  { id: 410, dorsal: 8, name: 'CAMILO PACHECO', teamId: 'VERDE', isCaptain: true },
  { id: 411, dorsal: 2, name: 'MARCOS FIGUEROA', teamId: 'VERDE' },
  { id: 412, dorsal: 3, name: 'LUIS PACHECO', teamId: 'VERDE' },
  { id: 413, dorsal: 4, name: 'JAVIER MELENDEZ', teamId: 'VERDE' },
  { id: 414, dorsal: 5, name: 'JAVIER FADUL', teamId: 'VERDE' },
  { id: 415, dorsal: 6, name: 'LUIS SOLANO', teamId: 'VERDE' },
  { id: 416, dorsal: 7, name: 'IVAN ORREGO', teamId: 'VERDE' },

  // 3. NEGRO
  { id: 417, dorsal: 10, name: 'MARIO VELAZCO', teamId: 'NEGRO' },
  { id: 418, dorsal: 1, name: 'RIGOBERTO LOPEZ', teamId: 'NEGRO' },
  { id: 419, dorsal: 2, name: 'JORGE ACEVEDO', teamId: 'NEGRO' },
  { id: 420, dorsal: 3, name: 'NEL MARTIN', teamId: 'NEGRO' },
  { id: 421, dorsal: 4, name: 'RUSBELL VILLALBA', teamId: 'NEGRO', isCaptain: true },
  { id: 422, dorsal: 5, name: 'JHON CUADROS', teamId: 'NEGRO' },
  { id: 423, dorsal: 6, name: 'MANUEL PEÑA', teamId: 'NEGRO' },
  { id: 424, dorsal: 7, name: 'HUGO MERCADO', teamId: 'NEGRO' },

  // 4. NARANJA
  { id: 425, dorsal: 9, name: 'ANDY ACEVEDO', teamId: 'NARANJA' },
  { id: 426, dorsal: 12, name: 'JOSE DAVID HOYOS', teamId: 'NARANJA' },
  { id: 427, dorsal: 2, name: 'CARLOS FIGUEROA', teamId: 'NARANJA', isCaptain: true },
  { id: 428, dorsal: 4, name: 'CESAR MIZGER', teamId: 'NARANJA' },
  { id: 429, dorsal: 5, name: 'JORGE ORREGO', teamId: 'NARANJA' },
  { id: 430, dorsal: 6, name: 'ALBEIRO OJEDA', teamId: 'NARANJA' },
  { id: 431, dorsal: 7, name: 'EDUAR MONTIEL', teamId: 'NARANJA' },
  { id: 432, dorsal: 8, name: 'JOSE ARROYO', teamId: 'NARANJA' },

  // 5. RAYADO
  { id: 433, dorsal: 10, name: 'RIGOBERTO LOZANO', teamId: 'RAYADO' },
  { id: 434, dorsal: 7, name: 'DIEGO LOPEZ', teamId: 'RAYADO' },
  { id: 435, dorsal: 11, name: 'JORGE LOZANO', teamId: 'RAYADO' },
  { id: 436, dorsal: 8, name: 'DAMIAN MORENO', teamId: 'RAYADO' },
  { id: 437, dorsal: 9, name: 'ALVARO BETIN', teamId: 'RAYADO' },
  { id: 438, dorsal: 39, name: 'WALTER GOEZ', teamId: 'RAYADO' },
  { id: 439, dorsal: 6, name: 'ANUAR OJEDA', teamId: 'RAYADO' },
  { id: 440, dorsal: 20, name: 'JORGE LUIS PINTO', teamId: 'RAYADO' },

  // 6. ROJO
  { id: 441, dorsal: 10, name: 'ALBERT MONTERROZA', teamId: 'ROJO', isCaptain: true },
  { id: 442, dorsal: 9, name: 'ELKIN ACEVEDO', teamId: 'ROJO' },
  { id: 443, dorsal: 1, name: 'JOSE HOYOS', teamId: 'ROJO' },
  { id: 444, dorsal: 2, name: 'MAURICIO DIAZ', teamId: 'ROJO' },
  { id: 445, dorsal: 3, name: 'URIEL ZAMBRANO', teamId: 'ROJO' },
  { id: 446, dorsal: 4, name: 'NILSON CASTILLO', teamId: 'ROJO' },
  { id: 447, dorsal: 5, name: 'ROBERTO PEREZ', teamId: 'ROJO' },
  { id: 448, dorsal: 6, name: 'GUSTAVO FERRER', teamId: 'ROJO' },

  // 7. AMARILLO
  { id: 449, dorsal: 9, name: 'MARIO GUERRA', teamId: 'AMARILLO', isCaptain: true },
  { id: 450, dorsal: 8, name: 'DONALDO MORALES', teamId: 'AMARILLO' },
  { id: 451, dorsal: 10, name: 'ALEJANDRO ESCAMILLA', teamId: 'AMARILLO' },
  { id: 452, dorsal: 5, name: 'EDWIN TEJADA', teamId: 'AMARILLO' },
  { id: 453, dorsal: 11, name: 'PEDRO DE LEON', teamId: 'AMARILLO' },
  { id: 454, dorsal: 7, name: 'JOSE IVAN SIERRA', teamId: 'AMARILLO' },
  { id: 455, dorsal: 17, name: 'HECTOR VERGARA', teamId: 'AMARILLO' },
  { id: 456, dorsal: 4, name: 'BERNARDO GALVIS', teamId: 'AMARILLO' },

  // 8. BLANCO
  { id: 457, dorsal: 10, name: 'ALBERTO OSORIO', teamId: 'BLANCO' },
  { id: 458, dorsal: 1, name: 'DONALDO MARTINEZ', teamId: 'BLANCO' },
  { id: 459, dorsal: 4, name: 'JUAN ALVAREZ', teamId: 'BLANCO' },
  { id: 460, dorsal: 5, name: 'EVER VILLALBA', teamId: 'BLANCO' },
  { id: 461, dorsal: 6, name: 'DAIRO MERCADO', teamId: 'BLANCO' },
  { id: 462, dorsal: 7, name: 'IVAN DIAZ', teamId: 'BLANCO' },
  { id: 463, dorsal: 8, name: 'DANIEL BORJA', teamId: 'BLANCO' },
];

export const CARDS_2026_2: CardRecord[] = [];
export const GOALS_2026_2: GoalRecord[] = [];

// Official First 7 Fechas for II Semestre 2026 (Vuelta 1)
const INITIAL_7_FECHAS_2026_2: Match[] = [
  // FECHA 1 (4 de Agosto)
  { id: 'm1-1', fecha: 1, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '4 de Agosto' },
  { id: 'm1-2', fecha: 1, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '4 de Agosto' },
  { id: 'm1-3', fecha: 1, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '4 de Agosto' },
  { id: 'm1-4', fecha: 1, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '4 de Agosto' },

  // FECHA 2 (6 de Agosto)
  { id: 'm2-1', fecha: 2, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '6 de Agosto' },
  { id: 'm2-2', fecha: 2, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '6 de Agosto' },
  { id: 'm2-3', fecha: 2, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '6 de Agosto' },
  { id: 'm2-4', fecha: 2, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '6 de Agosto' },

  // FECHA 3 (11 de Agosto)
  { id: 'm3-1', fecha: 3, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '11 de Agosto' },
  { id: 'm3-2', fecha: 3, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '11 de Agosto' },
  { id: 'm3-3', fecha: 3, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '11 de Agosto' },
  { id: 'm3-4', fecha: 3, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '11 de Agosto' },

  // FECHA 4 (13 de Agosto)
  { id: 'm4-1', fecha: 4, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '13 de Agosto' },
  { id: 'm4-2', fecha: 4, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '13 de Agosto' },
  { id: 'm4-3', fecha: 4, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '13 de Agosto' },
  { id: 'm4-4', fecha: 4, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '13 de Agosto' },

  // FECHA 5 (18 de Agosto)
  { id: 'm5-1', fecha: 5, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '18 de Agosto' },
  { id: 'm5-2', fecha: 5, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '18 de Agosto' },
  { id: 'm5-3', fecha: 5, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '18 de Agosto' },
  { id: 'm5-4', fecha: 5, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '18 de Agosto' },

  // FECHA 6 (20 de Agosto)
  { id: 'm6-1', fecha: 6, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '20 de Agosto' },
  { id: 'm6-2', fecha: 6, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '20 de Agosto' },
  { id: 'm6-3', fecha: 6, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '20 de Agosto' },
  { id: 'm6-4', fecha: 6, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '20 de Agosto' },

  // FECHA 7 (25 de Agosto)
  { id: 'm7-1', fecha: 7, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '25 de Agosto' },
  { id: 'm7-2', fecha: 7, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '25 de Agosto' },
  { id: 'm7-3', fecha: 7, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '25 de Agosto' },
  { id: 'm7-4', fecha: 7, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: '25 de Agosto' },
];

export const MATCHES_2026_2: Match[] = generateAllTournamentMatches(INITIAL_7_FECHAS_2026_2);
