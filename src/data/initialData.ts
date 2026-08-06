import { Team, Player, CardRecord, Match, GoalRecord, TournamentEdition, CardType } from '../types';

export const DEFAULT_EDITIONS: TournamentEdition[] = [
  { id: '2025-1', name: 'I SEMESTRE 2025 (EDICIÓN LV)', status: 'FINALIZADO', champion: 'BLANCO' },
  { id: '2025-2', name: 'II SEMESTRE 2025 (EDICIÓN LVI)', status: 'FINALIZADO', champion: 'AZUL' },
  { id: '2026-1', name: 'I SEMESTRE 2026 (EDICIÓN LVII)', status: 'FINALIZADO', champion: 'BLANCO' },
  { id: '2026-2', name: 'II SEMESTRE 2026 (EDICIÓN LVIII)', status: 'EN_CURSO' },
];

export const JUNTA_DIRECTIVA_2026_2 = [
  { cargo: 'PRESIDENTE', nombre: 'ALBERT MONTERROZA' },
  { cargo: 'FISCAL', nombre: 'IVAN DIAZ' },
  { cargo: 'TESORERO', nombre: 'JORGE PINTO' },
  { cargo: 'SECRETARIO', nombre: 'PEDRO DE LEÓN' },
  { cargo: 'VOCAL', nombre: 'EDUAR MONTIEL' },
];

export const JUNTA_DIRECTIVA_HISTORIC = [
  { cargo: 'PRESIDENTE', nombre: 'FERNANDO HUMÁNEZ' },
  { cargo: 'FISCAL', nombre: 'IVAN DIAZ' },
  { cargo: 'TESORERO', nombre: 'JORGE PINTO' },
  { cargo: 'SECRETARIO', nombre: 'NÉSTOR BETÍN' },
  { cargo: 'VOCAL', nombre: 'EDUAR MONTIEL' },
];

export const JUNTA_DIRECTIVA = JUNTA_DIRECTIVA_HISTORIC;

export const getJuntaDirectiva = (editionId?: string) => {
  if (editionId === '2026-2') {
    return JUNTA_DIRECTIVA_2026_2;
  }
  return JUNTA_DIRECTIVA_HISTORIC;
};

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'AZUL',
    name: 'AZUL',
    colorHex: '#2563eb',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    badgeBorder: 'border-blue-400',
    secondaryColor: '#1d4ed8',
    delegate: 'LEONARDO CASTILLO',
  },
  {
    id: 'VERDE',
    name: 'VERDE',
    colorHex: '#16a34a',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    badgeBorder: 'border-emerald-400',
    secondaryColor: '#15803d',
    delegate: 'MARCOS FIGUEROA',
  },
  {
    id: 'NEGRO',
    name: 'NEGRO',
    colorHex: '#1f2937',
    badgeBg: 'bg-zinc-900',
    badgeText: 'text-zinc-100',
    badgeBorder: 'border-zinc-700',
    secondaryColor: '#111827',
    delegate: 'RUSBELL VILLALBA',
  },
  {
    id: 'NARANJA',
    name: 'NARANJA',
    colorHex: '#f97316',
    badgeBg: 'bg-orange-500',
    badgeText: 'text-white',
    badgeBorder: 'border-orange-400',
    secondaryColor: '#ea580c',
    delegate: 'CARLOS FIGUEROA',
  },
  {
    id: 'RAYADO',
    name: 'RAYADO',
    colorHex: '#3b82f6',
    badgeBg: 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/50',
    secondaryColor: '#1e3a8a',
    delegate: 'MARIO GUERRA',
  },
  {
    id: 'ROJO',
    name: 'ROJO',
    colorHex: '#dc2626',
    badgeBg: 'bg-red-600',
    badgeText: 'text-white',
    badgeBorder: 'border-red-400',
    secondaryColor: '#b91c1c',
    delegate: 'JOSE HOYOS',
  },
  {
    id: 'AMARILLO',
    name: 'AMARILLO',
    colorHex: '#eab308',
    badgeBg: 'bg-yellow-500',
    badgeText: 'text-zinc-950',
    badgeBorder: 'border-yellow-400',
    secondaryColor: '#ca8a04',
    delegate: 'EDWIN TEJADA',
  },
  {
    id: 'BLANCO',
    name: 'BLANCO',
    colorHex: '#f8fafc',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-900',
    badgeBorder: 'border-slate-300',
    secondaryColor: '#e2e8f0',
    delegate: 'CAMILO PACHECO',
  },
];

export const INITIAL_PLAYERS: Player[] = [
  // 1. AZUL
  { id: 1, dorsal: 10, name: 'ALBERTO OSORIO', teamId: 'AZUL' },
  { id: 2, dorsal: 2, name: 'ANIBAL ROMERO', teamId: 'AZUL' },
  { id: 3, dorsal: 3, name: 'OSCAR PACHECO', teamId: 'AZUL' },
  { id: 4, dorsal: 1, name: 'ALBERT MONTERROZA', teamId: 'AZUL' },
  { id: 5, dorsal: 5, name: 'ALBEIRO BUELVAS', teamId: 'AZUL' },
  { id: 6, dorsal: 6, name: 'LEONARDO CASTILLO', teamId: 'AZUL', isCaptain: true },
  { id: 7, dorsal: 7, name: 'MOISES GOMEZ', teamId: 'AZUL' },
  { id: 8, dorsal: 8, name: 'DOUGLAS COAVAS', teamId: 'AZUL' },

  // 2. VERDE
  { id: 9, dorsal: 9, name: 'ANDY ACEVEDO', teamId: 'VERDE' },
  { id: 10, dorsal: 2, name: 'MARCOS FIGUEROA', teamId: 'VERDE', isCaptain: true },
  { id: 11, dorsal: 3, name: 'LUIS PACHECO', teamId: 'VERDE' },
  { id: 12, dorsal: 4, name: 'JAVIER MELGAREJO', teamId: 'VERDE' },
  { id: 13, dorsal: 5, name: 'JAVIER FADUL', teamId: 'VERDE' },
  { id: 14, dorsal: 6, name: 'LUIS SOLANO', teamId: 'VERDE' },
  { id: 15, dorsal: 7, name: 'IVAN ORREGO', teamId: 'VERDE' },
  { id: 16, dorsal: 8, name: 'JACIT ARABIA', teamId: 'VERDE' },

  // 3. NEGRO
  { id: 17, dorsal: 10, name: 'RIGOBERTO LOZANO', teamId: 'NEGRO' },
  { id: 18, dorsal: 2, name: 'JORGE ACEVEDO', teamId: 'NEGRO' },
  { id: 19, dorsal: 3, name: 'NEL MARTINEZ', teamId: 'NEGRO' },
  { id: 20, dorsal: 4, name: 'RUSBELL VILLALBA', teamId: 'NEGRO', isCaptain: true },
  { id: 21, dorsal: 5, name: 'JHON CUARTAS', teamId: 'NEGRO' },
  { id: 22, dorsal: 6, name: 'MANUEL PEÑA', teamId: 'NEGRO' },
  { id: 23, dorsal: 7, name: 'HUGO MERCADO', teamId: 'NEGRO' },
  { id: 24, dorsal: 8, name: 'ALBERTO BUSTOS', teamId: 'NEGRO' },

  // 4. NARANJA
  { id: 25, dorsal: 7, name: 'DIEGO LOPEZ', teamId: 'NARANJA' },
  { id: 26, dorsal: 2, name: 'CARLOS FIGUEROA', teamId: 'NARANJA', isCaptain: true },
  { id: 27, dorsal: 11, name: 'JORGE LOZANO', teamId: 'NARANJA' },
  { id: 28, dorsal: 4, name: 'CESAR MIZGER', teamId: 'NARANJA' },
  { id: 29, dorsal: 5, name: 'JORGE ORREGO', teamId: 'NARANJA' },
  { id: 30, dorsal: 6, name: 'ALBEIRO OJEDA', teamId: 'NARANJA' },
  { id: 31, dorsal: 14, name: 'EDUAR MONTIEL', teamId: 'NARANJA' },
  { id: 32, dorsal: 8, name: 'JOSE ARROYO', teamId: 'NARANJA' },

  // 5. RAYADO
  { id: 33, dorsal: 8, name: 'DAMIAN MORENO', teamId: 'RAYADO' },
  { id: 34, dorsal: 9, name: 'ALVARO BETIN', teamId: 'RAYADO' },
  { id: 35, dorsal: 5, name: 'MARIO GUERRA', teamId: 'RAYADO' },
  { id: 36, dorsal: 39, name: 'WALTER GOEZ', teamId: 'RAYADO' },
  { id: 37, dorsal: 10, name: 'MARIO VELAZCO', teamId: 'RAYADO' },
  { id: 38, dorsal: 6, name: 'ANUAR OJEDA', teamId: 'RAYADO' },
  { id: 39, dorsal: 20, name: 'JORGE LUIS PINTO', teamId: 'RAYADO' },
  { id: 40, dorsal: 12, name: 'FERNANDO HUMANEZ', teamId: 'RAYADO' },

  // 6. ROJO
  { id: 41, dorsal: 1, name: 'JOSE HOYOS', teamId: 'ROJO', isCaptain: true },
  { id: 42, dorsal: 2, name: 'MAURICIO DIAZ', teamId: 'ROJO' },
  { id: 43, dorsal: 3, name: 'URIEL ZAMBRANO', teamId: 'ROJO' },
  { id: 44, dorsal: 4, name: 'NILSON CASTELLANOS', teamId: 'ROJO' },
  { id: 45, dorsal: 5, name: 'ROBERTO PERTUZ', teamId: 'ROJO' },
  { id: 46, dorsal: 6, name: 'GUSTAVO FERNANDEZ', teamId: 'ROJO' },
  { id: 47, dorsal: 7, name: 'ANTONIO ORTEGA', teamId: 'ROJO' },
  { id: 48, dorsal: 8, name: 'ROBERT ORTEGA', teamId: 'ROJO' },

  // 7. AMARILLO
  { id: 49, dorsal: 10, name: 'ALEJANDRO ESCAMILLA', teamId: 'AMARILLO' },
  { id: 50, dorsal: 5, name: 'EDWIN TEJADA', teamId: 'AMARILLO', isCaptain: true },
  { id: 51, dorsal: 18, name: 'YAMIR PINEDA', teamId: 'AMARILLO' },
  { id: 52, dorsal: 11, name: 'PEDRO DE LEON', teamId: 'AMARILLO' },
  { id: 53, dorsal: 7, name: 'JOSE IVAN SIERRA', teamId: 'AMARILLO' },
  { id: 54, dorsal: 17, name: 'HECTOR VERGARA', teamId: 'AMARILLO' },
  { id: 55, dorsal: 4, name: 'BERNARDO GALVIS', teamId: 'AMARILLO' },
  { id: 56, dorsal: 8, name: 'EDGARDO PACHECO', teamId: 'AMARILLO' },

  // 8. BLANCO
  { id: 57, dorsal: 8, name: 'DONALDO MORALES', teamId: 'BLANCO' },
  { id: 58, dorsal: 2, name: 'CAMILO PACHECO', teamId: 'BLANCO', isCaptain: true },
  { id: 59, dorsal: 10, name: 'JOSE FIGUEROA', teamId: 'BLANCO' },
  { id: 60, dorsal: 4, name: 'JUAN ALVAREZ', teamId: 'BLANCO' },
  { id: 61, dorsal: 5, name: 'EVER VILLALBA', teamId: 'BLANCO' },
  { id: 62, dorsal: 6, name: 'DAIRO MERCADO', teamId: 'BLANCO' },
  { id: 63, dorsal: 7, name: 'IVAN DIAZ', teamId: 'BLANCO' },
  { id: 64, dorsal: 12, name: 'DANIEL BORJA', teamId: 'BLANCO' },
];

const createPlayerGoalsByFechas = (playerId: number, teamId: any, goalsMap: Record<number, number>): GoalRecord[] => {
  const result: GoalRecord[] = [];
  let index = 0;
  for (const [fechaStr, count] of Object.entries(goalsMap)) {
    const fecha = parseInt(fechaStr, 10);
    for (let c = 0; c < count; c++) {
      result.push({
        id: `g-${playerId}-${fecha}-${c}-${index++}`,
        playerId,
        fecha,
        teamId,
        createdAt: '2025-05-01',
      });
    }
  }
  return result;
};

const createPlayerCardsByFechas = (playerId: number, cardSpecs: Array<{ fecha: number; type: CardType }>): CardRecord[] => {
  return cardSpecs.map((spec, idx) => ({
    id: `c-${playerId}-${spec.fecha}-${spec.type}-${idx}`,
    playerId,
    fecha: spec.fecha,
    type: spec.type,
    createdAt: '2025-05-01',
  }));
};

export const INITIAL_CARDS: CardRecord[] = [
  // DONALDO MORALES (AMARILLO - #50): 10 AM, 2 AZ
  ...createPlayerCardsByFechas(50, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 4, type: 'AMARILLA' }, { fecha: 5, type: 'AZUL' },
    { fecha: 6, type: 'AMARILLA' }, { fecha: 9, type: 'AMARILLA' }, { fecha: 11, type: 'AMARILLA' },
    { fecha: 13, type: 'AMARILLA' }, { fecha: 18, type: 'AMARILLA' }, { fecha: 23, type: 'AMARILLA' },
    { fecha: 28, type: 'AMARILLA' }, { fecha: 32, type: 'AZUL' }, { fecha: 34, type: 'AMARILLA' },
  ]),

  // RIGOBERTO LOZANO (RAYADO - #33): 11 AM, 1 AZ
  ...createPlayerCardsByFechas(33, [
    { fecha: 1, type: 'AMARILLA' }, { fecha: 3, type: 'AMARILLA' }, { fecha: 5, type: 'AMARILLA' },
    { fecha: 8, type: 'AZUL' }, { fecha: 11, type: 'AMARILLA' }, { fecha: 14, type: 'AMARILLA' },
    { fecha: 17, type: 'AMARILLA' }, { fecha: 19, type: 'AMARILLA' }, { fecha: 23, type: 'AMARILLA' },
    { fecha: 26, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 33, type: 'AMARILLA' },
  ]),

  // ALBERT MONTERROZA (ROJO - #41): 8 AM, 2 AZ, 1 RO
  ...createPlayerCardsByFechas(41, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 6, type: 'AMARILLA' }, { fecha: 8, type: 'AMARILLA' },
    { fecha: 12, type: 'AMARILLA' }, { fecha: 14, type: 'AMARILLA' }, { fecha: 18, type: 'AMARILLA' },
    { fecha: 20, type: 'AMARILLA' }, { fecha: 23, type: 'AZUL' }, { fecha: 27, type: 'AMARILLA' },
    { fecha: 31, type: 'ROJA' }, { fecha: 33, type: 'AZUL' },
  ]),

  // JOSE IVAN SIERRA (VERDE - #54): 8 AM, 2 AZ
  ...createPlayerCardsByFechas(54, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 4, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' },
    { fecha: 10, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' }, { fecha: 16, type: 'AZUL' },
    { fecha: 17, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' }, { fecha: 24, type: 'AZUL' },
    { fecha: 25, type: 'AMARILLA' },
  ]),

  // EDWIN TEJADA (BLANCO - #52): 9 AM, 2 AZ
  ...createPlayerCardsByFechas(52, [
    { fecha: 1, type: 'AMARILLA' }, { fecha: 3, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' },
    { fecha: 10, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' },
    { fecha: 20, type: 'AMARILLA' }, { fecha: 24, type: 'AZUL' }, { fecha: 27, type: 'AMARILLA' },
    { fecha: 30, type: 'AMARILLA' }, { fecha: 33, type: 'AZUL' },
  ]),

  // CAMILO PACHECO (VERDE - #10): 6 AM, 1 AZ, 1 RO
  ...createPlayerCardsByFechas(10, [
    { fecha: 1, type: 'AMARILLA' }, { fecha: 4, type: 'ROJA' }, { fecha: 6, type: 'AMARILLA' },
    { fecha: 9, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 15, type: 'AMARILLA' },
    { fecha: 27, type: 'AZUL' }, { fecha: 29, type: 'AMARILLA' },
  ]),

  // YAMIR PINEDA (VERDE - #9): 7 AM, 1 AZ
  ...createPlayerCardsByFechas(9, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 10, type: 'AMARILLA' },
    { fecha: 14, type: 'AMARILLA' }, { fecha: 18, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' },
    { fecha: 28, type: 'AZUL' }, { fecha: 33, type: 'AMARILLA' },
  ]),

  // JOSE FIGUEROA (AZUL - #1): 7 AM, 1 AZ
  ...createPlayerCardsByFechas(1, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 6, type: 'AMARILLA' }, { fecha: 9, type: 'AMARILLA' },
    { fecha: 11, type: 'AMARILLA' }, { fecha: 15, type: 'AMARILLA' }, { fecha: 16, type: 'AZUL' },
    { fecha: 19, type: 'AMARILLA' }, { fecha: 23, type: 'AMARILLA' },
  ]),
];

// Seeded goal records matching the top scorers table from Edición LV 2025
export const INITIAL_GOALS: GoalRecord[] = [
  ...createPlayerGoalsByFechas(57, 'BLANCO', { 1: 1, 6: 1, 15: 2, 16: 5, 17: 1, 18: 1, 19: 1, 20: 4, 21: 1, 23: 2, 24: 1, 25: 2, 26: 4, 27: 1, 29: 1, 32: 2, 33: 1, 34: 5, 38: 1 }), // ALBERTO OSORIO - 38 Goles
  ...createPlayerGoalsByFechas(33, 'RAYADO', { 5: 3, 6: 1, 13: 1, 14: 3, 16: 1, 18: 1, 19: 2, 20: 4, 23: 2, 24: 2, 25: 1, 26: 2, 27: 1, 28: 2, 29: 1, 30: 3, 32: 2, 33: 1, 34: 2 }), // RIGOBERTO LOZANO - 35 Goles
  ...createPlayerGoalsByFechas(25, 'NARANJA', { 1: 1, 5: 2, 8: 1, 11: 3, 13: 3, 18: 2, 23: 2, 25: 1, 27: 2, 33: 2, 38: 1 }), // ANDY ACEVEDO - 20 Goles
  ...createPlayerGoalsByFechas(34, 'RAYADO', { 3: 1, 4: 1, 7: 2, 8: 1, 10: 1, 11: 3, 12: 1, 15: 1, 18: 1, 19: 1, 23: 1, 26: 1, 29: 1, 30: 2 }), // DIEGO LOPEZ - 19 Goles
  ...createPlayerGoalsByFechas(49, 'AMARILLO', { 3: 1, 4: 1, 5: 1, 7: 4, 10: 1, 12: 1, 13: 3, 17: 1, 18: 2, 19: 1, 21: 1 }), // MARIO GUERRA - 17 Goles
  ...createPlayerGoalsByFechas(41, 'ROJO', { 1: 1, 4: 1, 7: 1, 10: 1, 11: 1, 14: 2, 15: 1, 16: 1, 17: 1, 18: 2, 19: 1, 21: 2, 26: 1, 29: 1 }), // ALBERT MONTERROZA - 16 Goles
  ...createPlayerGoalsByFechas(35, 'RAYADO', { 1: 1, 6: 1, 8: 1, 10: 1, 11: 1, 18: 1, 21: 1, 26: 1, 27: 1, 28: 2, 32: 2, 34: 2 }), // JORGE LOZANO - 15 Goles
  ...createPlayerGoalsByFechas(9, 'VERDE', { 1: 1, 3: 1, 5: 1, 6: 1, 11: 2, 18: 2, 22: 1, 23: 1, 24: 1, 25: 2, 27: 1, 34: 1 }), // YAMIR PINEDA - 15 Goles
  ...createPlayerGoalsByFechas(10, 'VERDE', { 1: 2, 7: 1, 13: 1, 14: 1, 20: 2, 27: 1, 28: 3, 29: 2, 31: 1 }), // CAMILO PACHECO - 14 Goles
  ...createPlayerGoalsByFechas(17, 'NEGRO', { 7: 1, 8: 3, 15: 2, 17: 1, 19: 1, 21: 1, 23: 1, 25: 1, 26: 1, 27: 1, 29: 1 }), // MARIO VELAZCO - 14 Goles
  ...createPlayerGoalsByFechas(50, 'AMARILLO', { 1: 1, 9: 1, 10: 1, 11: 1, 13: 1, 16: 1, 22: 1, 23: 1, 24: 1, 25: 1, 28: 1, 29: 1 }), // DONALDO MORALES - 12 Goles
  ...createPlayerGoalsByFechas(26, 'NARANJA', { 3: 1, 4: 4, 6: 2, 8: 1, 13: 1, 22: 1, 26: 1, 32: 1, 38: 1 }), // JOSE DAVID HOYOS - 12 Goles
  ...createPlayerGoalsByFechas(42, 'ROJO', { 1: 3, 2: 1, 5: 2, 6: 2, 8: 1, 13: 1, 15: 1 }), // ELKIN ACEVEDO - 11 Goles
  ...createPlayerGoalsByFechas(1, 'AZUL', { 5: 2, 8: 1, 10: 1, 17: 1, 19: 1, 22: 2, 27: 1, 29: 1 }), // JOSE FIGUEROA - 10 Goles
  ...createPlayerGoalsByFechas(15, 'VERDE', { 4: 2, 6: 1, 8: 1, 9: 1, 10: 2, 26: 1, 33: 1, 38: 1 }), // LUIS MIGUEL SOLANO - 10 Goles
];

// Seeded complete match records for Season 2025 (Edición LV)
export const INITIAL_MATCHES: Match[] = [
  // FECHA 1
  { id: 'm1-1', fecha: 1, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm1-2', fecha: 1, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 3, isPlayed: true },
  { id: 'm1-3', fecha: 1, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm1-4', fecha: 1, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 1, isPlayed: true },

  // FECHA 2
  { id: 'm2-1', fecha: 2, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-2', fecha: 2, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-3', fecha: 2, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm2-4', fecha: 2, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },

  // FECHA 3
  { id: 'm3-1', fecha: 3, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm3-2', fecha: 3, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'm3-3', fecha: 3, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm3-4', fecha: 3, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 7, isPlayed: true },

  // FECHA 4
  { id: 'm4-1', fecha: 4, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'm4-2', fecha: 4, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm4-3', fecha: 4, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm4-4', fecha: 4, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },

  // FECHA 5
  { id: 'm5-1', fecha: 5, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm5-2', fecha: 5, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 6, isPlayed: true },
  { id: 'm5-3', fecha: 5, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'm5-4', fecha: 5, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 1, isPlayed: true },

  // FECHA 6
  { id: 'm6-1', fecha: 6, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm6-2', fecha: 6, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm6-3', fecha: 6, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 4, isPlayed: true },
  { id: 'm6-4', fecha: 6, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 0, isPlayed: true },

  // FECHA 7
  { id: 'm7-1', fecha: 7, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm7-2', fecha: 7, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm7-3', fecha: 7, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm7-4', fecha: 7, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 5, awayGoals: 2, isPlayed: true },

  // FECHA 8
  { id: 'm8-1', fecha: 8, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm8-2', fecha: 8, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 3, awayGoals: 2, isPlayed: true },
  { id: 'm8-3', fecha: 8, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm8-4', fecha: 8, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 9
  { id: 'm9-1', fecha: 9, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm9-2', fecha: 9, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm9-3', fecha: 9, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm9-4', fecha: 9, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 10
  { id: 'm10-1', fecha: 10, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm10-2', fecha: 10, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm10-3', fecha: 10, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm10-4', fecha: 10, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 11
  { id: 'm11-1', fecha: 11, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'm11-2', fecha: 11, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm11-3', fecha: 11, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 5, awayGoals: 0, isPlayed: true },
  { id: 'm11-4', fecha: 11, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 4, isPlayed: true },

  // FECHA 12
  { id: 'm12-1', fecha: 12, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm12-2', fecha: 12, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm12-3', fecha: 12, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm12-4', fecha: 12, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 13
  { id: 'm13-1', fecha: 13, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 5, isPlayed: true },
  { id: 'm13-2', fecha: 13, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm13-3', fecha: 13, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm13-4', fecha: 13, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 4, isPlayed: true },

  // FECHA 14
  { id: 'm14-1', fecha: 14, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'm14-2', fecha: 14, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm14-3', fecha: 14, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm14-4', fecha: 14, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 15
  { id: 'm15-1', fecha: 15, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 5, awayGoals: 2, isPlayed: true },
  { id: 'm15-2', fecha: 15, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm15-3', fecha: 15, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 2, isPlayed: true },
  { id: 'm15-4', fecha: 15, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 16
  { id: 'm16-1', fecha: 16, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm16-2', fecha: 16, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 6, isPlayed: true },
  { id: 'm16-3', fecha: 16, homeTeamId: 'AMARILLO', awayTeamId: 'VERDE', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm16-4', fecha: 16, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 17
  { id: 'm17-1', fecha: 17, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm17-2', fecha: 17, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm17-3', fecha: 17, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm17-4', fecha: 17, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 18
  { id: 'm18-1', fecha: 18, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm18-2', fecha: 18, homeTeamId: 'RAYADO', awayTeamId: 'VERDE', homeGoals: 4, awayGoals: 2, isPlayed: true },
  { id: 'm18-3', fecha: 18, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm18-4', fecha: 18, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 5, isPlayed: true },

  // FECHA 19
  { id: 'm19-1', fecha: 19, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 6, isPlayed: true },
  { id: 'm19-2', fecha: 19, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm19-3', fecha: 19, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm19-4', fecha: 19, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 20
  { id: 'm20-1', fecha: 20, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm20-2', fecha: 20, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm20-3', fecha: 20, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm20-4', fecha: 20, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 6, isPlayed: true },

  // FECHA 21
  { id: 'm21-1', fecha: 21, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm21-2', fecha: 21, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm21-3', fecha: 21, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm21-4', fecha: 21, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 0, isPlayed: true },

  // FECHA 22
  { id: 'm22-1', fecha: 22, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm22-2', fecha: 22, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm22-3', fecha: 22, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm22-4', fecha: 22, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 1, isPlayed: true },

  // FECHA 23
  { id: 'm23-1', fecha: 23, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm23-2', fecha: 23, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm23-3', fecha: 23, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm23-4', fecha: 23, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 0, isPlayed: true },

  // FECHA 24
  { id: 'm24-1', fecha: 24, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 4, isPlayed: true },
  { id: 'm24-2', fecha: 24, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm24-3', fecha: 24, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm24-4', fecha: 24, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 25
  { id: 'm25-1', fecha: 25, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 5, isPlayed: true },
  { id: 'm25-2', fecha: 25, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'm25-3', fecha: 25, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm25-4', fecha: 25, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 3, isPlayed: true },

  // FECHA 26
  { id: 'm26-1', fecha: 26, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm26-2', fecha: 26, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm26-3', fecha: 26, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm26-4', fecha: 26, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 6, awayGoals: 1, isPlayed: true },

  // FECHA 27
  { id: 'm27-1', fecha: 27, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm27-2', fecha: 27, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm27-3', fecha: 27, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 3, isPlayed: true },
  { id: 'm27-4', fecha: 27, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 2, isPlayed: true },

  // FECHA 28
  { id: 'm28-1', fecha: 28, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm28-2', fecha: 28, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 4, isPlayed: true },
  { id: 'm28-3', fecha: 28, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm28-4', fecha: 28, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 29
  { id: 'm29-1', fecha: 29, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 4, isPlayed: true },
  { id: 'm29-2', fecha: 29, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm29-3', fecha: 29, homeTeamId: 'RAYADO', awayTeamId: 'VERDE', homeGoals: 6, awayGoals: 2, isPlayed: true },
  { id: 'm29-4', fecha: 29, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 30
  { id: 'm30-1', fecha: 30, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm30-2', fecha: 30, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm30-3', fecha: 30, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm30-4', fecha: 30, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 5, awayGoals: 1, isPlayed: true },

  // FECHA 31
  { id: 'm31-1', fecha: 31, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm31-2', fecha: 31, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'm31-3', fecha: 31, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm31-4', fecha: 31, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 32
  { id: 'm32-1', fecha: 32, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm32-2', fecha: 32, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'm32-3', fecha: 32, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 4, awayGoals: 2, isPlayed: true },
  { id: 'm32-4', fecha: 32, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 33
  { id: 'm33-1', fecha: 33, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm33-2', fecha: 33, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm33-3', fecha: 33, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'm33-4', fecha: 33, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 2, isPlayed: true },

  // FECHA 34
  { id: 'm34-1', fecha: 34, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'm34-2', fecha: 34, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 5, isPlayed: true },
  { id: 'm34-3', fecha: 34, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm34-4', fecha: 34, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 35 (Sin disputar)
  { id: 'm35-1', fecha: 35, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm35-2', fecha: 35, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm35-3', fecha: 35, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm35-4', fecha: 35, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false },

  // FECHA 36 (ELIMINATORIA)
  { id: 'm36-1', fecha: 36, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 5, awayGoals: 2, isPlayed: true },
  { id: 'm36-2', fecha: 36, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm36-3', fecha: 36, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 0, isPlayed: true },

  // FECHA 37 (SEMIFINAL)
  { id: 'm37-1', fecha: 37, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'm37-2', fecha: 37, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 38 (TERCER PUESTO Y GRAN FINAL)
  { id: 'm38-1', fecha: 38, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm38-2', fecha: 38, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },
];
