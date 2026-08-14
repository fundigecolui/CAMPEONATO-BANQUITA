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
    colorHex: '#000000',
    badgeBg: 'bg-black',
    badgeText: 'text-white',
    badgeBorder: 'border-zinc-700',
    secondaryColor: '#09090b',
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
    colorHex: '#ffffff',
    badgeBg: 'bg-white',
    badgeText: 'text-slate-950',
    badgeBorder: 'border border-black/50',
    secondaryColor: '#f1f5f9',
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
  { id: 53, dorsal: 7, name: 'JOSE SIERRA', teamId: 'AMARILLO' },
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

  // JOSE SIERRA (VERDE - #54): 8 AM, 2 AZ
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
  { id: 'P1-1', fecha: 1, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'P1-2', fecha: 1, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 3, isPlayed: true },
  { id: 'P1-3', fecha: 1, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true, attendance: { homePlayerIds: [57, 58, 59, 60, 61, 62, 63, 64], awayPlayerIds: [49, 50, 51, 52, 54, 55, 56] } },
  { id: 'P1-4', fecha: 1, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 1, isPlayed: true, attendance: { homePlayerIds: [17, 19, 20, 21, 23, 24], awayPlayerIds: [25, 26, 27, 28, 29, 30, 31, 32] } },

  // FECHA 2
  { id: 'P2-1', fecha: 2, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'P2-2', fecha: 2, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P2-3', fecha: 2, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P2-4', fecha: 2, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },

  // FECHA 3
  { id: 'P3-1', fecha: 3, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'P3-2', fecha: 3, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'P3-3', fecha: 3, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'P3-4', fecha: 3, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 7, isPlayed: true },

  // FECHA 4
  { id: 'P4-1', fecha: 4, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'P4-2', fecha: 4, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P4-3', fecha: 4, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'P4-4', fecha: 4, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },

  // FECHA 5
  { id: 'P5-1', fecha: 5, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P5-2', fecha: 5, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 6, isPlayed: true },
  { id: 'P5-3', fecha: 5, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'P5-4', fecha: 5, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 1, isPlayed: true },

  // FECHA 6
  { id: 'P6-1', fecha: 6, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P6-2', fecha: 6, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'P6-3', fecha: 6, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 4, isPlayed: true },
  { id: 'P6-4', fecha: 6, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 0, isPlayed: true },

  // FECHA 7
  { id: 'P7-1', fecha: 7, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P7-2', fecha: 7, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P7-3', fecha: 7, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P7-4', fecha: 7, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 5, awayGoals: 2, isPlayed: true },

  // FECHA 8
  { id: 'P8-1', fecha: 8, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P8-2', fecha: 8, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 3, awayGoals: 2, isPlayed: true },
  { id: 'P8-3', fecha: 8, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'P8-4', fecha: 8, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 9
  { id: 'P9-1', fecha: 9, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'P9-2', fecha: 9, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P9-3', fecha: 9, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'P9-4', fecha: 9, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 10
  { id: 'P10-1', fecha: 10, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P10-2', fecha: 10, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P10-3', fecha: 10, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P10-4', fecha: 10, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 11
  { id: 'P11-1', fecha: 11, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'P11-2', fecha: 11, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P11-3', fecha: 11, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 5, awayGoals: 0, isPlayed: true },
  { id: 'P11-4', fecha: 11, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 4, isPlayed: true },

  // FECHA 12
  { id: 'P12-1', fecha: 12, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P12-2', fecha: 12, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P12-3', fecha: 12, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'P12-4', fecha: 12, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 13
  { id: 'P13-1', fecha: 13, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 5, isPlayed: true },
  { id: 'P13-2', fecha: 13, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'P13-3', fecha: 13, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P13-4', fecha: 13, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 4, isPlayed: true },

  // FECHA 14
  { id: 'P14-1', fecha: 14, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'P14-2', fecha: 14, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P14-3', fecha: 14, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P14-4', fecha: 14, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 15
  { id: 'P15-1', fecha: 15, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 5, awayGoals: 2, isPlayed: true },
  { id: 'P15-2', fecha: 15, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'P15-3', fecha: 15, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 2, isPlayed: true },
  { id: 'P15-4', fecha: 15, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 16
  { id: 'P16-1', fecha: 16, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'P16-2', fecha: 16, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 6, isPlayed: true },
  { id: 'P16-3', fecha: 16, homeTeamId: 'AMARILLO', awayTeamId: 'VERDE', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P16-4', fecha: 16, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 17
  { id: 'P17-1', fecha: 17, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P17-2', fecha: 17, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'P17-3', fecha: 17, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P17-4', fecha: 17, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 18
  { id: 'P18-1', fecha: 18, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P18-2', fecha: 18, homeTeamId: 'RAYADO', awayTeamId: 'VERDE', homeGoals: 4, awayGoals: 2, isPlayed: true },
  { id: 'P18-3', fecha: 18, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'P18-4', fecha: 18, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 5, isPlayed: true },

  // FECHA 19
  { id: 'P19-1', fecha: 19, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 6, isPlayed: true },
  { id: 'P19-2', fecha: 19, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'P19-3', fecha: 19, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P19-4', fecha: 19, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 20
  { id: 'P20-1', fecha: 20, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P20-2', fecha: 20, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P20-3', fecha: 20, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P20-4', fecha: 20, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 6, isPlayed: true },

  // FECHA 21
  { id: 'P21-1', fecha: 21, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'P21-2', fecha: 21, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'P21-3', fecha: 21, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'P21-4', fecha: 21, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 0, isPlayed: true },

  // FECHA 22
  { id: 'P22-1', fecha: 22, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P22-2', fecha: 22, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P22-3', fecha: 22, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'P22-4', fecha: 22, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 1, isPlayed: true },

  // FECHA 23
  { id: 'P23-1', fecha: 23, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'P23-2', fecha: 23, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P23-3', fecha: 23, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P23-4', fecha: 23, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 0, isPlayed: true },

  // FECHA 24
  { id: 'P24-1', fecha: 24, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 4, isPlayed: true },
  { id: 'P24-2', fecha: 24, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'P24-3', fecha: 24, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P24-4', fecha: 24, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 25
  { id: 'P25-1', fecha: 25, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 5, isPlayed: true },
  { id: 'P25-2', fecha: 25, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'P25-3', fecha: 25, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'P25-4', fecha: 25, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 3, isPlayed: true },

  // FECHA 26
  { id: 'P26-1', fecha: 26, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P26-2', fecha: 26, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'P26-3', fecha: 26, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P26-4', fecha: 26, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 6, awayGoals: 1, isPlayed: true },

  // FECHA 27
  { id: 'P27-1', fecha: 27, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'P27-2', fecha: 27, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P27-3', fecha: 27, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 3, isPlayed: true },
  { id: 'P27-4', fecha: 27, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 2, isPlayed: true },

  // FECHA 28
  { id: 'P28-1', fecha: 28, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'P28-2', fecha: 28, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 4, isPlayed: true },
  { id: 'P28-3', fecha: 28, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P28-4', fecha: 28, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 29
  { id: 'P29-1', fecha: 29, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 4, isPlayed: true },
  { id: 'P29-2', fecha: 29, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'P29-3', fecha: 29, homeTeamId: 'RAYADO', awayTeamId: 'VERDE', homeGoals: 6, awayGoals: 2, isPlayed: true },
  { id: 'P29-4', fecha: 29, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 30
  { id: 'P30-1', fecha: 30, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'P30-2', fecha: 30, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P30-3', fecha: 30, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'P30-4', fecha: 30, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 5, awayGoals: 1, isPlayed: true },

  // FECHA 31
  { id: 'P31-1', fecha: 31, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'P31-2', fecha: 31, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'P31-3', fecha: 31, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P31-4', fecha: 31, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 32
  { id: 'P32-1', fecha: 32, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P32-2', fecha: 32, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'P32-3', fecha: 32, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 4, awayGoals: 2, isPlayed: true },
  { id: 'P32-4', fecha: 32, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 33
  { id: 'P33-1', fecha: 33, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'P33-2', fecha: 33, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'P33-3', fecha: 33, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'P33-4', fecha: 33, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 2, isPlayed: true },

  // FECHA 34
  { id: 'P34-1', fecha: 34, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'P34-2', fecha: 34, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 5, isPlayed: true },
  { id: 'P34-3', fecha: 34, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'P34-4', fecha: 34, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 35 (Sin disputar)
  { id: 'P35-1', fecha: 35, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'P35-2', fecha: 35, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'P35-3', fecha: 35, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'P35-4', fecha: 35, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false },

  // FECHA 36 (ELIMINATORIA)
  { id: 'P36-1', fecha: 36, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 5, awayGoals: 2, isPlayed: true },
  { id: 'P36-2', fecha: 36, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'P36-3', fecha: 36, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 0, isPlayed: true },

  // FECHA 37 (SEMIFINAL)
  { id: 'P37-1', fecha: 37, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'P37-2', fecha: 37, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 38 (TERCER PUESTO Y GRAN FINAL)
  { id: 'P38-1', fecha: 38, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'P38-2', fecha: 38, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true },
];
