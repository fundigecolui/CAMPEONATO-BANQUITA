import { Player, CardRecord, GoalRecord, Match, CardType } from '../types';

export const PLAYERS_2025_2: Player[] = [
  // NEGRO
  { id: 226, dorsal: 8, name: 'LUIS PACHECO', teamId: 'NEGRO', isCaptain: true },
  { id: 227, dorsal: 25, name: 'JUAN MARTINEZ', teamId: 'NEGRO' },
  { id: 228, dorsal: 31, name: 'OSCAR PACHECO', teamId: 'NEGRO' },
  { id: 229, dorsal: 32, name: 'EVER VILLALBA', teamId: 'NEGRO' },
  { id: 230, dorsal: 38, name: 'CAMILO PACHECO', teamId: 'NEGRO' },
  { id: 250, dorsal: 29, name: 'IVAN DIAZ', teamId: 'NEGRO' },
  { id: 251, dorsal: 4, name: 'BERNARDO GALVIS', teamId: 'NEGRO' },
  { id: 252, dorsal: 26, name: 'DANIEL BORJA', teamId: 'NEGRO' },
  { id: 253, dorsal: 50, name: 'ANIBAL ROMERO', teamId: 'NEGRO' },

  // BLANCO
  { id: 216, dorsal: 4, name: 'ANDY ACEVEDO', teamId: 'BLANCO', isCaptain: true },
  { id: 217, dorsal: 30, name: 'DAIRO CASTILLO', teamId: 'BLANCO' },
  { id: 218, dorsal: 41, name: 'EDWIN TEJADA', teamId: 'BLANCO' },
  { id: 219, dorsal: 33, name: 'JORGE ORREGO', teamId: 'BLANCO' },
  { id: 220, dorsal: 37, name: 'NILSON CASTELLANOS', teamId: 'BLANCO' },
  { id: 254, dorsal: 6, name: 'GUSTAVO FERNANDEZ', teamId: 'BLANCO' },
  { id: 255, dorsal: 5, name: 'HUGO MERCADO', teamId: 'BLANCO' },
  { id: 256, dorsal: 51, name: 'ALBERTO BUSTOS', teamId: 'BLANCO' },

  // VERDE
  { id: 201, dorsal: 10, name: 'ALBERTO OSORIO', teamId: 'VERDE' },
  { id: 202, dorsal: 11, name: 'ALBERT MONTERROZA', teamId: 'VERDE', isCaptain: true },
  { id: 203, dorsal: 11, name: 'JOSE FIGUEROA', teamId: 'VERDE' },
  { id: 204, dorsal: 9, name: 'JOSE DAVID HOYOS', teamId: 'VERDE' },
  { id: 207, dorsal: 7, name: 'JOSE SIERRA', teamId: 'VERDE' },
  { id: 257, dorsal: 9, name: 'ROBERT VILLALBA', teamId: 'VERDE' },
  { id: 258, dorsal: 20, name: 'JORGE LUIS PINTO', teamId: 'VERDE' },
  { id: 259, dorsal: 4, name: 'EDUAR MONTIEL', teamId: 'VERDE' },
  { id: 260, dorsal: 58, name: 'JOSE DOMINGUEZ', teamId: 'VERDE' },

  // AMARILLO
  { id: 236, dorsal: 12, name: 'MARIO GUERRA', teamId: 'AMARILLO', isCaptain: true },
  { id: 237, dorsal: 15, name: 'JORGE ACEVEDO', teamId: 'AMARILLO' },
  { id: 238, dorsal: 18, name: 'JOSE HOYOS', teamId: 'AMARILLO' },
  { id: 239, dorsal: 26, name: 'JAVIER MELGAREJO', teamId: 'AMARILLO' },
  { id: 240, dorsal: 35, name: 'ALBEIRO OJEDA', teamId: 'AMARILLO' },
  { id: 261, dorsal: 29, name: 'LEONARDO CASTILLO', teamId: 'AMARILLO' },
  { id: 262, dorsal: 20, name: 'FERNANDO HUMANEZ', teamId: 'AMARILLO' },
  { id: 263, dorsal: 1, name: 'ROBERT ORTEGA', teamId: 'AMARILLO' },

  // RAYADO
  { id: 221, dorsal: 5, name: 'RIGOBERTO LOZANO', teamId: 'RAYADO', isCaptain: true },
  { id: 222, dorsal: 13, name: 'ALVARO BETIN', teamId: 'RAYADO' },
  { id: 224, dorsal: 27, name: 'NEL MARTINEZ', teamId: 'RAYADO' },
  { id: 264, dorsal: 11, name: 'PEDRO DE LEON', teamId: 'RAYADO' },
  { id: 265, dorsal: 30, name: 'MANUEL PEÑA', teamId: 'RAYADO' },
  { id: 266, dorsal: 49, name: 'NESTOR BETIN', teamId: 'RAYADO' },
  { id: 267, dorsal: 6, name: 'IVAN ORREGO', teamId: 'RAYADO' },
  { id: 268, dorsal: 53, name: 'JACIT ARABIA ALVAREZ', teamId: 'RAYADO' },

  // AZUL
  { id: 209, dorsal: 3, name: 'JUAN ALVAREZ', teamId: 'AZUL' },
  { id: 210, dorsal: 6, name: 'CARLOS FIGUEROA', teamId: 'AZUL', isCaptain: true },
  { id: 211, dorsal: 7, name: 'DAMIAN MORENO', teamId: 'AZUL' },
  { id: 212, dorsal: 9, name: 'MAURICIO DIAZ', teamId: 'AZUL' },
  { id: 215, dorsal: 17, name: 'JAVIER FADUL', teamId: 'AZUL' },
  { id: 269, dorsal: 34, name: 'DAIRO MERCADO', teamId: 'AZUL' },
  { id: 270, dorsal: 36, name: 'HECTOR VERGARA', teamId: 'AZUL' },
  { id: 271, dorsal: 8, name: 'EDGARDO PACHECO', teamId: 'AZUL' },

  // NARANJA
  { id: 241, dorsal: 10, name: 'JORGE LOZANO', teamId: 'NARANJA', isCaptain: true },
  { id: 242, dorsal: 22, name: 'YAMIR PINEDA', teamId: 'NARANJA' },
  { id: 243, dorsal: 23, name: 'URIEL ZAMBRANO', teamId: 'NARANJA' },
  { id: 244, dorsal: 28, name: 'LUIS MIGUEL SOLANO', teamId: 'NARANJA' },
  { id: 272, dorsal: 11, name: 'DONALDO MORALES', teamId: 'NARANJA' },
  { id: 273, dorsal: 6, name: 'ROBERTO PERTUZ', teamId: 'NARANJA' },
  { id: 274, dorsal: 18, name: 'MOISES GOMEZ', teamId: 'NARANJA' },
  { id: 275, dorsal: 57, name: 'DOUGLAS COAVAS', teamId: 'NARANJA' },
  { id: 276, dorsal: 52, name: 'ALBEIRO BUELVAS', teamId: 'NARANJA' },

  // ROJO
  { id: 231, dorsal: 16, name: 'MARCOS FIGUEROA', teamId: 'ROJO', isCaptain: true },
  { id: 232, dorsal: 19, name: 'MARIO VELAZCO', teamId: 'ROJO' },
  { id: 233, dorsal: 20, name: 'DIEGO LOPEZ', teamId: 'ROJO' },
  { id: 234, dorsal: 21, name: 'JHON CUARTAS', teamId: 'ROJO' },
  { id: 235, dorsal: 24, name: 'JHON ARROYO', teamId: 'ROJO' },
  { id: 277, dorsal: 45, name: 'ANUAR OJEDA', teamId: 'ROJO' },
  { id: 278, dorsal: 42, name: 'ANTONIO ORTEGA', teamId: 'ROJO' },
  { id: 279, dorsal: 15, name: 'JOSE ARROYO', teamId: 'ROJO' },
  { id: 280, dorsal: 9, name: 'JUAN MORALES', teamId: 'ROJO' },
];

const createPlayerGoalsByFechas = (playerId: number, teamId: any, goalsMap: Record<number, number>): GoalRecord[] => {
  const result: GoalRecord[] = [];
  let index = 0;
  for (const [fechaStr, count] of Object.entries(goalsMap)) {
    const fecha = parseInt(fechaStr, 10);
    for (let c = 0; c < count; c++) {
      result.push({
        id: `g2-${playerId}-${fecha}-${c}-${index++}`,
        playerId,
        fecha,
        teamId,
        createdAt: '2025-11-01',
      });
    }
  }
  return result;
};

const createCards = (playerId: number, cardSpecs: Array<{ fecha: number; type: CardType }>): CardRecord[] => {
  return cardSpecs.map((spec, idx) => ({
    id: `c2-${playerId}-${spec.fecha}-${spec.type}-${idx}`,
    playerId,
    fecha: spec.fecha,
    type: spec.type,
    createdAt: '2025-11-01',
  }));
};

export const CARDS_2025_2: CardRecord[] = [
  // JOSE FIGUEROA (VERDE - #203): 12 AM, 3 AZ, 1 RO
  ...createCards(203, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 4, type: 'AMARILLA' }, { fecha: 6, type: 'AZUL' },
    { fecha: 8, type: 'AMARILLA' }, { fecha: 10, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' },
    { fecha: 14, type: 'AZUL' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 18, type: 'AMARILLA' },
    { fecha: 20, type: 'AMARILLA' }, { fecha: 22, type: 'AMARILLA' }, { fecha: 24, type: 'AZUL' },
    { fecha: 26, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' },
    { fecha: 31, type: 'ROJA' },
  ]),

  // YAMIR PINEDA (NARANJA - #242): 9 AM, 3 AZ
  ...createCards(242, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 5, type: 'AZUL' }, { fecha: 7, type: 'AMARILLA' },
    { fecha: 9, type: 'AMARILLA' }, { fecha: 11, type: 'AZUL' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 15, type: 'AMARILLA' }, { fecha: 17, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' },
    { fecha: 23, type: 'AZUL' }, { fecha: 27, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' },
  ]),

  // NEL MARTINEZ (RAYADO - #224): 11 AM, 1 RO
  ...createCards(224, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 5, type: 'AMARILLA' }, { fecha: 8, type: 'AMARILLA' },
    { fecha: 10, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 15, type: 'ROJA' },
    { fecha: 18, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' }, { fecha: 22, type: 'AMARILLA' },
    { fecha: 25, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 31, type: 'AMARILLA' },
  ]),

  // DAIRO CASTILLO (BLANCO - #217): 11 AM
  ...createCards(217, [
    { fecha: 1, type: 'AMARILLA' }, { fecha: 4, type: 'AMARILLA' }, { fecha: 6, type: 'AMARILLA' },
    { fecha: 9, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 14, type: 'AMARILLA' },
    { fecha: 17, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' }, { fecha: 24, type: 'AMARILLA' },
    { fecha: 27, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' },
  ]),

  // MARCOS FIGUEROA (ROJO - #231): 6 AM, 4 AZ
  ...createCards(231, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 6, type: 'AZUL' }, { fecha: 10, type: 'AMARILLA' },
    { fecha: 13, type: 'AZUL' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 19, type: 'AZUL' },
    { fecha: 22, type: 'AMARILLA' }, { fecha: 25, type: 'AZUL' }, { fecha: 28, type: 'AMARILLA' },
    { fecha: 32, type: 'AMARILLA' },
  ]),

  // LUIS PACHECO (NEGRO - #226): 7 AM, 2 AZ
  ...createCards(226, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 6, type: 'AMARILLA' }, { fecha: 9, type: 'AZUL' },
    { fecha: 13, type: 'AMARILLA' }, { fecha: 17, type: 'AMARILLA' }, { fecha: 21, type: 'AZUL' },
    { fecha: 24, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 32, type: 'AMARILLA' },
  ]),

  // EDWIN TEJADA (BLANCO - #218): 7 AM, 1 AZ
  ...createCards(218, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 5, type: 'AMARILLA' }, { fecha: 9, type: 'AMARILLA' },
    { fecha: 12, type: 'AZUL' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' },
    { fecha: 25, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' },
  ]),

  // JOSE SIERRA (VERDE - #207): 7 AM, 1 RO
  ...createCards(207, [
    { fecha: 1, type: 'AMARILLA' }, { fecha: 5, type: 'AMARILLA' }, { fecha: 8, type: 'AMARILLA' },
    { fecha: 11, type: 'ROJA' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' },
    { fecha: 24, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' },
  ]),
];

export const GOALS_2025_2: GoalRecord[] = [
  ...createPlayerGoalsByFechas(201, 'VERDE', { 4: 4, 6: 1, 7: 2, 8: 1, 13: 3, 14: 1, 15: 2, 16: 1, 17: 1, 18: 1, 19: 1, 20: 2, 24: 1, 25: 1, 27: 1, 28: 2, 29: 1, 32: 3 }), // ALBERTO OSORIO - 30 Goles
  ...createPlayerGoalsByFechas(202, 'VERDE', { 1: 3, 3: 1, 5: 1, 6: 2, 7: 1, 9: 1, 10: 1, 14: 1, 15: 2, 16: 1, 21: 2, 24: 1, 25: 3, 27: 3, 31: 1, 33: 2 }), // ALBERT MONTERROZA - 26 Goles
  ...createPlayerGoalsByFechas(209, 'AZUL', { 2: 2, 4: 2, 5: 1, 8: 2, 11: 1, 13: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 3, 23: 1, 27: 1, 28: 1, 31: 3 }), // JUAN ALVAREZ - 20 Goles
  ...createPlayerGoalsByFechas(216, 'BLANCO', { 2: 1, 3: 1, 6: 3, 7: 1, 8: 4, 15: 1, 18: 1, 25: 1, 26: 1, 27: 1, 30: 1, 31: 1, 32: 2 }), // ANDY ACEVEDO - 19 Goles
  ...createPlayerGoalsByFechas(221, 'RAYADO', { 3: 3, 5: 2, 6: 1, 17: 1, 22: 2, 23: 1, 25: 1, 26: 2, 30: 2, 32: 3 }), // RIGOBERTO LOZANO - 19 Goles
  ...createPlayerGoalsByFechas(210, 'AZUL', { 2: 1, 5: 1, 6: 1, 8: 1, 10: 1, 13: 2, 19: 1, 22: 1, 24: 2, 26: 1, 28: 1, 30: 1, 31: 2, 32: 3 }), // CARLOS FIGUEROA - 19 Goles
  ...createPlayerGoalsByFechas(211, 'AZUL', { 2: 1, 4: 1, 15: 2, 17: 1, 18: 1, 20: 1, 22: 1, 24: 3, 26: 1, 31: 2, 32: 1, 33: 1 }), // DAMIAN MORENO - 16 Goles
  ...createPlayerGoalsByFechas(226, 'NEGRO', { 9: 1, 14: 1, 20: 1, 22: 1, 24: 2, 25: 1, 28: 1, 29: 1, 30: 1, 31: 2, 33: 1 }), // LUIS PACHECO - 13 Goles
  ...createPlayerGoalsByFechas(212, 'AZUL', { 2: 1, 8: 2, 10: 1, 19: 1, 22: 1, 23: 1, 28: 1, 31: 2, 33: 2 }), // MAURICIO DIAZ - 12 Goles
  ...createPlayerGoalsByFechas(241, 'NARANJA', { 1: 1, 2: 2, 7: 1, 11: 1, 20: 1, 22: 1, 24: 1, 27: 1, 29: 1, 32: 1 }), // JORGE LOZANO - 11 Goles
  ...createPlayerGoalsByFechas(203, 'VERDE', { 4: 1, 5: 1, 6: 1, 8: 1, 9: 1, 10: 1, 20: 2, 28: 1, 32: 2 }), // JOSE FIGUEROA - 11 Goles
  ...createPlayerGoalsByFechas(236, 'AMARILLO', { 1: 2, 2: 1, 6: 2, 7: 2, 8: 1, 24: 1, 25: 1 }), // MARIO GUERRA - 10 Goles
  ...createPlayerGoalsByFechas(222, 'RAYADO', { 2: 1, 3: 1, 5: 2, 7: 2, 14: 1, 25: 1, 27: 1, 28: 1 }), // ALVARO BETIN - 10 Goles
  ...createPlayerGoalsByFechas(204, 'VERDE', { 6: 1, 7: 2, 11: 1, 14: 1, 25: 1, 26: 1, 27: 1, 29: 1, 31: 1 }), // JOSE DAVID HOYOS - 10 Goles
  ...createPlayerGoalsByFechas(237, 'AMARILLO', { 1: 1, 4: 1, 14: 2, 20: 1, 21: 1, 22: 1, 26: 1, 32: 1, 33: 1 }), // JORGE ACEVEDO - 10 Goles
];

export const MATCHES_2025_2: Match[] = [
  // FECHA 1
  { id: 'm2-1-1', fecha: 1, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 5, awayGoals: 1, isPlayed: true },
  { id: 'm2-1-2', fecha: 1, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 4, isPlayed: true },
  { id: 'm2-1-3', fecha: 1, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm2-1-4', fecha: 1, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 2
  { id: 'm2-2-1', fecha: 2, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'm2-2-2', fecha: 2, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 6, awayGoals: 2, isPlayed: true },
  { id: 'm2-2-3', fecha: 2, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'm2-2-4', fecha: 2, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },

  // FECHA 3
  { id: 'm2-3-1', fecha: 3, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm2-3-2', fecha: 3, homeTeamId: 'RAYADO', awayTeamId: 'VERDE', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm2-3-3', fecha: 3, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-3-4', fecha: 3, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 1, isPlayed: true },

  // FECHA 4
  { id: 'm2-4-1', fecha: 4, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 5, isPlayed: true },
  { id: 'm2-4-2', fecha: 4, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm2-4-3', fecha: 4, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'm2-4-4', fecha: 4, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 3, awayGoals: 0, isPlayed: true },

  // FECHA 5
  { id: 'm2-5-1', fecha: 5, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm2-5-2', fecha: 5, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-5-3', fecha: 5, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-5-4', fecha: 5, homeTeamId: 'AMARILLO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 6
  { id: 'm2-6-1', fecha: 6, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm2-6-2', fecha: 6, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 3, isPlayed: true },
  { id: 'm2-6-3', fecha: 6, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 6, isPlayed: true },
  { id: 'm2-6-4', fecha: 6, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 0, isPlayed: true },

  // FECHA 7
  { id: 'm2-7-1', fecha: 7, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-7-2', fecha: 7, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-7-3', fecha: 7, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-7-4', fecha: 7, homeTeamId: 'NARANJA', awayTeamId: 'VERDE', homeGoals: 4, awayGoals: 3, isPlayed: true },

  // FECHA 8
  { id: 'm2-8-1', fecha: 8, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 7, isPlayed: true },
  { id: 'm2-8-2', fecha: 8, homeTeamId: 'NARANJA', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-8-3', fecha: 8, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-8-4', fecha: 8, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 3, isPlayed: true },

  // FECHA 9
  { id: 'm2-9-1', fecha: 9, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 3, awayGoals: 0, isPlayed: true },
  { id: 'm2-9-2', fecha: 9, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm2-9-3', fecha: 9, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm2-9-4', fecha: 9, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true },

  // FECHA 10
  { id: 'm2-10-1', fecha: 10, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-10-2', fecha: 10, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'm2-10-3', fecha: 10, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-10-4', fecha: 10, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 11
  { id: 'm2-11-1', fecha: 11, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-11-2', fecha: 11, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-11-3', fecha: 11, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm2-11-4', fecha: 11, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 12
  { id: 'm2-12-1', fecha: 12, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-12-2', fecha: 12, homeTeamId: 'AMARILLO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 4, isPlayed: true },
  { id: 'm2-12-3', fecha: 12, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-12-4', fecha: 12, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 13
  { id: 'm2-13-1', fecha: 13, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 5, awayGoals: 2, isPlayed: true },
  { id: 'm2-13-2', fecha: 13, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-13-3', fecha: 13, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-13-4', fecha: 13, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 5, awayGoals: 1, isPlayed: true },

  // FECHA 14
  { id: 'm2-14-1', fecha: 14, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 4, isPlayed: true },
  { id: 'm2-14-2', fecha: 14, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-14-3', fecha: 14, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-14-4', fecha: 14, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 1, isPlayed: true },

  // FECHA 15
  { id: 'm2-15-1', fecha: 15, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 0, isPlayed: true },
  { id: 'm2-15-2', fecha: 15, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm2-15-3', fecha: 15, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-15-4', fecha: 15, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 1, isPlayed: true },

  // FECHA 16
  { id: 'm2-16-1', fecha: 16, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-16-2', fecha: 16, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-16-3', fecha: 16, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm2-16-4', fecha: 16, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true },

  // FECHA 17
  { id: 'm2-17-1', fecha: 17, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-17-2', fecha: 17, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-17-3', fecha: 17, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-17-4', fecha: 17, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 18
  { id: 'm2-18-1', fecha: 18, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-18-2', fecha: 18, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-18-3', fecha: 18, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-18-4', fecha: 18, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 19
  { id: 'm2-19-1', fecha: 19, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 3, awayGoals: 4, isPlayed: true },
  { id: 'm2-19-2', fecha: 19, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm2-19-3', fecha: 19, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm2-19-4', fecha: 19, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 2, isPlayed: true },

  // FECHA 20
  { id: 'm2-20-1', fecha: 20, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 4, isPlayed: true },
  { id: 'm2-20-2', fecha: 20, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-20-3', fecha: 20, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm2-20-4', fecha: 20, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 1, isPlayed: true },

  // FECHA 21
  { id: 'm2-21-1', fecha: 21, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm2-21-2', fecha: 21, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: true },
  { id: 'm2-21-3', fecha: 21, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-21-4', fecha: 21, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 22
  { id: 'm2-22-1', fecha: 22, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-22-2', fecha: 22, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-22-3', fecha: 22, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 3, isPlayed: true },
  { id: 'm2-22-4', fecha: 22, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 4, isPlayed: true },

  // FECHA 23
  { id: 'm2-23-1', fecha: 23, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-23-2', fecha: 23, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-23-3', fecha: 23, homeTeamId: 'RAYADO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-23-4', fecha: 23, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 1, isPlayed: true },

  // FECHA 24
  { id: 'm2-24-1', fecha: 24, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-24-2', fecha: 24, homeTeamId: 'AMARILLO', awayTeamId: 'VERDE', homeGoals: 2, awayGoals: 4, isPlayed: true },
  { id: 'm2-24-3', fecha: 24, homeTeamId: 'NEGRO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 6, isPlayed: true },
  { id: 'm2-24-4', fecha: 24, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 7, isPlayed: true },

  // FECHA 25
  { id: 'm2-25-1', fecha: 25, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 3, isPlayed: true },
  { id: 'm2-25-2', fecha: 25, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-25-3', fecha: 25, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-25-4', fecha: 25, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 2, isPlayed: true },

  // FECHA 26
  { id: 'm2-26-1', fecha: 26, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 2, isPlayed: true },
  { id: 'm2-26-2', fecha: 26, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'm2-26-3', fecha: 26, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 4, isPlayed: true },
  { id: 'm2-26-4', fecha: 26, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 4, isPlayed: true },

  // FECHA 27
  { id: 'm2-27-1', fecha: 27, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-27-2', fecha: 27, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'm2-27-3', fecha: 27, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 5, isPlayed: true },
  { id: 'm2-27-4', fecha: 27, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 3, isPlayed: true },

  // FECHA 28
  { id: 'm2-28-1', fecha: 28, homeTeamId: 'NARANJA', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'm2-28-2', fecha: 28, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-28-3', fecha: 28, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 4, isPlayed: true },
  { id: 'm2-28-4', fecha: 28, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 3, isPlayed: true },

  // FECHA 29
  { id: 'm2-29-1', fecha: 29, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 5, isPlayed: true },
  { id: 'm2-29-2', fecha: 29, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-29-3', fecha: 29, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 1, isPlayed: true },
  { id: 'm2-29-4', fecha: 29, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 5, awayGoals: 0, isPlayed: true },

  // FECHA 30
  { id: 'm2-30-1', fecha: 30, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true },
  { id: 'm2-30-2', fecha: 30, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 4, awayGoals: 1, isPlayed: true },
  { id: 'm2-30-3', fecha: 30, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-30-4', fecha: 30, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true },

  // FECHA 31
  { id: 'm2-31-1', fecha: 31, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 8, awayGoals: 1, isPlayed: true },
  { id: 'm2-31-2', fecha: 31, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 2, isPlayed: true },
  { id: 'm2-31-3', fecha: 31, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 1, isPlayed: true },
  { id: 'm2-31-4', fecha: 31, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 0, isPlayed: true },

  // FECHA 32
  { id: 'm2-32-1', fecha: 32, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 0, isPlayed: true },
  { id: 'm2-32-2', fecha: 32, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, isPlayed: true },
  { id: 'm2-32-3', fecha: 32, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true },
  { id: 'm2-32-4', fecha: 32, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 4, isPlayed: true },

  // FECHA 33
  { id: 'm2-33-1', fecha: 33, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 7, isPlayed: true },
  { id: 'm2-33-2', fecha: 33, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 1, isPlayed: true },
  { id: 'm2-33-3', fecha: 33, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 3, isPlayed: true },
  { id: 'm2-33-4', fecha: 33, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 1, isPlayed: true },

  // FECHA 34 (Sin disputar)
  { id: 'm2-34-1', fecha: 34, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm2-34-2', fecha: 34, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm2-34-3', fecha: 34, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm2-34-4', fecha: 34, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false },

  // FECHA 35 (Sin disputar)
  { id: 'm2-35-1', fecha: 35, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm2-35-2', fecha: 35, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm2-35-3', fecha: 35, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: false },
  { id: 'm2-35-4', fecha: 35, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false },

  // FECHA 36 (ELIMINATORIAS)
  { id: 'm2-36-1', fecha: 36, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 1, homePenalties: 2, awayPenalties: 1, isPlayed: true },
  { id: 'm2-36-2', fecha: 36, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, homePenalties: 0, awayPenalties: 1, isPlayed: true },
  { id: 'm2-36-3', fecha: 36, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 1, isPlayed: true },

  // FECHA 37 (SEMIFINALES)
  { id: 'm2-37-1', fecha: 37, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 2, homePenalties: 1, awayPenalties: 2, isPlayed: true },
  { id: 'm2-37-2', fecha: 37, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 1, homePenalties: 2, awayPenalties: 2, isPlayed: true },

  // FECHA 38 (TERCER PUESTO Y FINAL)
  { id: 'm2-38-1', fecha: 38, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true },
  { id: 'm2-38-2', fecha: 38, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 1, awayGoals: 0, isPlayed: true },
];
