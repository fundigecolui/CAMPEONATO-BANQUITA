import { Player, CardRecord, GoalRecord, Match } from '../types';
import { generateAllTournamentMatches } from '../utils/fixtureGenerator';

export const PLAYERS_2026_2: Player[] = [
  // 1. AZUL
  { id: 401, dorsal: 10, name: 'ALBERTO OSORIO', teamId: 'AZUL' },
  { id: 402, dorsal: 7, name: 'ANIBAL ROMERO', teamId: 'AZUL' },
  { id: 403, dorsal: 8, name: 'OSCAR PACHECO', teamId: 'AZUL' },
  { id: 404, dorsal: 11, name: 'ALBERT MONTERROZA', teamId: 'AZUL' },
  { id: 405, dorsal: 5, name: 'ALBEIRO BUELVAS', teamId: 'AZUL' },
  { id: 406, dorsal: 9, name: 'LEONARDO CASTILLO', teamId: 'AZUL', isCaptain: true },
  { id: 407, dorsal: 18, name: 'MOISES GOMEZ', teamId: 'AZUL' },
  { id: 408, dorsal: 6, name: 'DOUGLAS COAVAS', teamId: 'AZUL' },

  // 2. VERDE
  { id: 409, dorsal: 10, name: 'ANDY ACEVEDO', teamId: 'VERDE' },
  { id: 410, dorsal: 19, name: 'MARCOS FIGUEROA', teamId: 'VERDE', isCaptain: true },
  { id: 411, dorsal: 43, name: 'LUIS PACHECO', teamId: 'VERDE' },
  { id: 412, dorsal: 22, name: 'JAVIER MELGAREJO', teamId: 'VERDE' },
  { id: 413, dorsal: 6, name: 'JAVIER FADUL', teamId: 'VERDE' },
  { id: 414, dorsal: 9, name: 'LUIS SOLANO', teamId: 'VERDE' },
  { id: 415, dorsal: 11, name: 'IVAN ORREGO', teamId: 'VERDE' },
  { id: 416, dorsal: 4, name: 'JACIT ARABIA', teamId: 'VERDE' },

  // 3. NEGRO
  { id: 417, dorsal: 10, name: 'RIGOBERTO LOZANO', teamId: 'NEGRO' },
  { id: 418, dorsal: 8, name: 'JORGE ACEVEDO', teamId: 'NEGRO' },
  { id: 419, dorsal: 70, name: 'NEL MARTINEZ', teamId: 'NEGRO' },
  { id: 420, dorsal: 7, name: 'RUSBELL VILLALBA', teamId: 'NEGRO', isCaptain: true },
  { id: 421, dorsal: 41, name: 'JHON CUARTAS', teamId: 'NEGRO' },
  { id: 422, dorsal: 6, name: 'MANUEL PEÑA', teamId: 'NEGRO' },
  { id: 423, dorsal: 5, name: 'HUGO MERCADO', teamId: 'NEGRO' },
  { id: 424, dorsal: 17, name: 'ALBERTO BUSTOS', teamId: 'NEGRO' },

  // 4. NARANJA
  { id: 425, dorsal: 8, name: 'DIEGO LOPEZ', teamId: 'NARANJA' },
  { id: 426, dorsal: 56, name: 'CARLOS FIGUEROA', teamId: 'NARANJA', isCaptain: true },
  { id: 427, dorsal: 9, name: 'JORGE LOZANO', teamId: 'NARANJA' },
  { id: 428, dorsal: 10, name: 'CESAR MIZGER', teamId: 'NARANJA' },
  { id: 429, dorsal: 7, name: 'JORGE ORREGO', teamId: 'NARANJA' },
  { id: 430, dorsal: 12, name: 'ALBEIRO OJEDA', teamId: 'NARANJA' },
  { id: 431, dorsal: 4, name: 'EDUAR MONTIEL', teamId: 'NARANJA' },
  { id: 432, dorsal: 5, name: 'JOSE ARROYO', teamId: 'NARANJA' },

  // 5. RAYADO
  { id: 433, dorsal: 10, name: 'DAMIAN MORENO', teamId: 'RAYADO' },
  { id: 434, dorsal: 8, name: 'ALVARO BETIN', teamId: 'RAYADO' },
  { id: 435, dorsal: 9, name: 'MARIO GUERRA', teamId: 'RAYADO' },
  { id: 436, dorsal: 39, name: 'WALTER GOEZ', teamId: 'RAYADO' },
  { id: 437, dorsal: 21, name: 'MARIO VELAZCO', teamId: 'RAYADO' },
  { id: 438, dorsal: 13, name: 'ANUAR OJEDA', teamId: 'RAYADO' },
  { id: 439, dorsal: 20, name: 'JORGE LUIS PINTO', teamId: 'RAYADO' },
  { id: 440, dorsal: 11, name: 'FERNANDO HUMANEZ', teamId: 'RAYADO' },

  // 6. ROJO
  { id: 441, dorsal: 5, name: 'JOSE HOYOS', teamId: 'ROJO', isCaptain: true },
  { id: 442, dorsal: 87, name: 'MAURICIO DIAZ', teamId: 'ROJO' },
  { id: 443, dorsal: 11, name: 'URIEL ZAMBRANO', teamId: 'ROJO' },
  { id: 444, dorsal: 19, name: 'NILSON CASTELLANOS', teamId: 'ROJO' },
  { id: 445, dorsal: 6, name: 'ROBERTO PERTUZ', teamId: 'ROJO' },
  { id: 446, dorsal: 3, name: 'GUSTAVO FERNANDEZ', teamId: 'ROJO' },
  { id: 447, dorsal: 7, name: 'ANTONIO ORTEGA', teamId: 'ROJO' },
  { id: 448, dorsal: 1, name: 'ROBERT ORTEGA', teamId: 'ROJO' },

  // 7. AMARILLO
  { id: 449, dorsal: 10, name: 'ALEJANDRO ESCAMILLA', teamId: 'AMARILLO' },
  { id: 450, dorsal: 5, name: 'EDWIN TEJADA', teamId: 'AMARILLO', isCaptain: true },
  { id: 451, dorsal: 18, name: 'YAMIR PINEDA', teamId: 'AMARILLO' },
  { id: 452, dorsal: 11, name: 'PEDRO DE LEON', teamId: 'AMARILLO' },
  { id: 453, dorsal: 7, name: 'JOSE SIERRA', teamId: 'AMARILLO' },
  { id: 454, dorsal: 17, name: 'HECTOR VERGARA', teamId: 'AMARILLO' },
  { id: 455, dorsal: 4, name: 'BERNARDO GALVIS', teamId: 'AMARILLO' },
  { id: 456, dorsal: 19, name: 'EDGARDO PACHECO', teamId: 'AMARILLO' },

  // 8. BLANCO
  { id: 457, dorsal: 20, name: 'DONALDO MORALES', teamId: 'BLANCO' },
  { id: 458, dorsal: 8, name: 'CAMILO PACHECO', teamId: 'BLANCO', isCaptain: true },
  { id: 459, dorsal: 3, name: 'JOSE FIGUEROA', teamId: 'BLANCO' },
  { id: 460, dorsal: 24, name: 'JUAN ALVAREZ', teamId: 'BLANCO' },
  { id: 461, dorsal: 9, name: 'EVER VILLALBA', teamId: 'BLANCO' },
  { id: 462, dorsal: 5, name: 'DAIRO MERCADO', teamId: 'BLANCO' },
  { id: 463, dorsal: 29, name: 'IVAN DIAZ', teamId: 'BLANCO' },
  { id: 464, dorsal: 25, name: 'DANIEL BORJA', teamId: 'BLANCO' },
];

export const CARDS_2026_2: CardRecord[] = [
  // Fecha 1
  { id: 'c1-1', playerId: 433, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-2', playerId: 448, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-3', playerId: 417, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-4', playerId: 420, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-5', playerId: 459, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-6', playerId: 424, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-7', playerId: 411, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-8', playerId: 430, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-9', playerId: 404, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'c1-10', playerId: 403, fecha: 1, type: 'AMARILLA', createdAt: new Date('2026-08-04').toISOString() },

  // Fecha 2 (6 de Agosto)
  { id: 'c2-1', playerId: 404, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // ALBERT MONTERROZA (AZUL)
  { id: 'c2-2', playerId: 424, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // ALBERTO BUSTOS (NEGRO)
  { id: 'c2-3', playerId: 436, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // WALTER GOEZ (RAYADO)
  { id: 'c2-4', playerId: 464, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // DANIEL BORJA (BLANCO)
  { id: 'c2-5', playerId: 459, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // JOSE FIGUEROA (BLANCO)
  { id: 'c2-6', playerId: 406, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // LEONARDO CASTILLO (AZUL)
  { id: 'c2-7', playerId: 421, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // JHON CUARTAS (NEGRO)
  { id: 'c2-8', playerId: 423, fecha: 2, type: 'AMARILLA', createdAt: new Date('2026-08-06').toISOString() }, // HUGO MERCADO (NEGRO)

  // Fecha 3 (11 de Agosto)
  { id: 'c3-1', playerId: 451, fecha: 3, type: 'AZUL', createdAt: new Date('2026-08-11').toISOString() }, // YAMIR PINEDA (AMARILLO)
  { id: 'c3-2', playerId: 421, fecha: 3, type: 'AMARILLA', createdAt: new Date('2026-08-11').toISOString() }, // JHON CUARTAS (NEGRO)
  { id: 'c3-3', playerId: 442, fecha: 3, type: 'AMARILLA', createdAt: new Date('2026-08-11').toISOString() }, // MAURICIO DIAZ (ROJO)
  { id: 'c3-4', playerId: 463, fecha: 3, type: 'AMARILLA', createdAt: new Date('2026-08-11').toISOString() }, // IVAN DIAZ (BLANCO)
  { id: 'c3-5', playerId: 407, fecha: 3, type: 'AMARILLA', createdAt: new Date('2026-08-11').toISOString() }, // MOISES GOMEZ (AZUL)
];

export const GOALS_2026_2: GoalRecord[] = [
  // Fecha 1
  { id: 'g1-1', playerId: 435, fecha: 1, teamId: 'RAYADO', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'g1-2', playerId: 433, fecha: 1, teamId: 'RAYADO', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'g1-3', playerId: 409, fecha: 1, teamId: 'VERDE', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'g1-4', playerId: 404, fecha: 1, teamId: 'AZUL', createdAt: new Date('2026-08-04').toISOString() },
  { id: 'g1-5', playerId: 449, fecha: 1, teamId: 'AMARILLO', createdAt: new Date('2026-08-04').toISOString() },

  // Fecha 2 (6 de Agosto)
  // AMARILLO (3) vs BLANCO (1)
  { id: 'g2-1', playerId: 449, fecha: 2, teamId: 'AMARILLO', createdAt: new Date('2026-08-06').toISOString() }, // ALEJANDRO ESCAMILLA
  { id: 'g2-2', playerId: 452, fecha: 2, teamId: 'AMARILLO', createdAt: new Date('2026-08-06').toISOString() }, // PEDRO DE LEON
  { id: 'g2-3', playerId: 451, fecha: 2, teamId: 'AMARILLO', createdAt: new Date('2026-08-06').toISOString() }, // YAMIR PINEDA
  { id: 'g2-4', playerId: 461, fecha: 2, teamId: 'BLANCO', createdAt: new Date('2026-08-06').toISOString() }, // EVER VILLALBA

  // NARANJA (5) vs ROJO (2)
  { id: 'g2-5', playerId: 425, fecha: 2, teamId: 'NARANJA', createdAt: new Date('2026-08-06').toISOString() }, // DIEGO LOPEZ
  { id: 'g2-6', playerId: 425, fecha: 2, teamId: 'NARANJA', createdAt: new Date('2026-08-06').toISOString() }, // DIEGO LOPEZ
  { id: 'g2-7', playerId: 426, fecha: 2, teamId: 'NARANJA', createdAt: new Date('2026-08-06').toISOString() }, // CARLOS FIGUEROA
  { id: 'g2-8', playerId: 427, fecha: 2, teamId: 'NARANJA', createdAt: new Date('2026-08-06').toISOString() }, // JORGE LOZANO
  { id: 'g2-9', playerId: 427, fecha: 2, teamId: 'NARANJA', createdAt: new Date('2026-08-06').toISOString() }, // JORGE LOZANO
  { id: 'g2-10', playerId: 441, fecha: 2, teamId: 'ROJO', createdAt: new Date('2026-08-06').toISOString() }, // JOSE HOYOS
  { id: 'g2-11', playerId: 442, fecha: 2, teamId: 'ROJO', createdAt: new Date('2026-08-06').toISOString() }, // MAURICIO DIAZ

  // AZUL (4) vs NEGRO (1)
  { id: 'g2-12', playerId: 401, fecha: 2, teamId: 'AZUL', createdAt: new Date('2026-08-06').toISOString() }, // ALBERTO OSORIO
  { id: 'g2-13', playerId: 401, fecha: 2, teamId: 'AZUL', createdAt: new Date('2026-08-06').toISOString() }, // ALBERTO OSORIO
  { id: 'g2-14', playerId: 404, fecha: 2, teamId: 'AZUL', createdAt: new Date('2026-08-06').toISOString() }, // ALBERT MONTERROZA
  { id: 'g2-15', playerId: 403, fecha: 2, teamId: 'AZUL', createdAt: new Date('2026-08-06').toISOString() }, // OSCAR PACHECO
  { id: 'g2-16', playerId: 420, fecha: 2, teamId: 'NEGRO', createdAt: new Date('2026-08-06').toISOString() }, // RUSBELL VILLALBA

  // VERDE (1) vs RAYADO (2)
  { id: 'g2-17', playerId: 409, fecha: 2, teamId: 'VERDE', createdAt: new Date('2026-08-06').toISOString() }, // ANDY ACEVEDO
  { id: 'g2-18', playerId: 434, fecha: 2, teamId: 'RAYADO', createdAt: new Date('2026-08-06').toISOString() }, // ALVARO BETIN
  { id: 'g2-19', playerId: 435, fecha: 2, teamId: 'RAYADO', createdAt: new Date('2026-08-06').toISOString() }, // MARIO GUERRA

  // Fecha 3 (11 de Agosto)
  { id: 'g3-1', playerId: 412, fecha: 3, teamId: 'VERDE', createdAt: new Date('2026-08-11').toISOString() }, // JAVIER MELGAREJO (VERDE)
  { id: 'g3-2', playerId: 411, fecha: 3, teamId: 'VERDE', createdAt: new Date('2026-08-11').toISOString() }, // LUIS PACHECO (VERDE)
  { id: 'g3-3', playerId: 409, fecha: 3, teamId: 'VERDE', createdAt: new Date('2026-08-11').toISOString() }, // ANDY ACEVEDO (VERDE)
  { id: 'g3-4', playerId: 441, fecha: 3, teamId: 'ROJO', createdAt: new Date('2026-08-11').toISOString() }, // JOSE HOYOS (ROJO)
  { id: 'g3-5', playerId: 457, fecha: 3, teamId: 'BLANCO', createdAt: new Date('2026-08-11').toISOString() }, // DONALDO MORALES (BLANCO)
  { id: 'g3-6', playerId: 459, fecha: 3, teamId: 'BLANCO', createdAt: new Date('2026-08-11').toISOString() }, // JOSE FIGUEROA (BLANCO)
  { id: 'g3-7', playerId: 437, fecha: 3, teamId: 'RAYADO', createdAt: new Date('2026-08-11').toISOString() }, // MARIO VELAZCO (RAYADO)
  { id: 'g3-8', playerId: 427, fecha: 3, teamId: 'NARANJA', createdAt: new Date('2026-08-11').toISOString() }, // JORGE LOZANO (NARANJA)
  { id: 'g3-9', playerId: 428, fecha: 3, teamId: 'NARANJA', createdAt: new Date('2026-08-11').toISOString() }, // CESAR MIZGER (NARANJA)
  { id: 'g3-10', playerId: 429, fecha: 3, teamId: 'NARANJA', createdAt: new Date('2026-08-11').toISOString() }, // JORGE ORREGO (NARANJA)
  { id: 'g3-11', playerId: 401, fecha: 3, teamId: 'AZUL', createdAt: new Date('2026-08-11').toISOString() }, // ALBERTO OSORIO (AZUL - Gol 1)
  { id: 'g3-12', playerId: 401, fecha: 3, teamId: 'AZUL', createdAt: new Date('2026-08-11').toISOString() }, // ALBERTO OSORIO (AZUL - Gol 2)
];

// Official First 7 Fechas for II Semestre 2026 (Vuelta 1)
const INITIAL_7_FECHAS_2026_2: Match[] = [
  // FECHA 1 (4 de Agosto)
  { id: 'm1-1', fecha: 1, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 0, isPlayed: true, status: 'FINALIZADO', dateStr: '4 de Agosto' },
  {
    id: 'm1-2',
    fecha: 1,
    homeTeamId: 'NEGRO',
    awayTeamId: 'BLANCO',
    homeGoals: 0,
    awayGoals: 0,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '4 de Agosto',
    attendance: {
      homePlayerIds: [417, 419, 420, 421, 423, 424], // Excludes 418 (Jorge Acevedo) & 422 (Manuel Peña)
      awayPlayerIds: [457, 458, 459, 460, 461, 462, 463, 464],
    },
  },
  { id: 'm1-3', fecha: 1, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true, status: 'FINALIZADO', dateStr: '4 de Agosto' },
  {
    id: 'm1-4',
    fecha: 1,
    homeTeamId: 'AZUL',
    awayTeamId: 'AMARILLO',
    homeGoals: 1,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '4 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 406, 407, 408],
      awayPlayerIds: [449, 450, 451, 452, 454, 455, 456], // Excludes 453 (Jose Sierra)
    },
  },

  // FECHA 2 (6 de Agosto)
  {
    id: 'm2-1',
    fecha: 2,
    homeTeamId: 'AMARILLO',
    awayTeamId: 'BLANCO',
    homeGoals: 3,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '6 de Agosto',
    attendance: {
      homePlayerIds: [449, 450, 451, 452, 453, 454, 455, 456],
      awayPlayerIds: [458, 459, 461, 462, 463, 464], // Excludes 457 (Donaldo Morales) & 460 (Juan Alvarez)
    },
  },
  {
    id: 'm2-2',
    fecha: 2,
    homeTeamId: 'NARANJA',
    awayTeamId: 'ROJO',
    homeGoals: 5,
    awayGoals: 2,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '6 de Agosto',
    attendance: {
      homePlayerIds: [425, 426, 427, 428, 429, 430, 431, 432],
      awayPlayerIds: [441, 442, 443, 444, 445, 446, 447, 448],
    },
  },
  {
    id: 'm2-3',
    fecha: 2,
    homeTeamId: 'AZUL',
    awayTeamId: 'NEGRO',
    homeGoals: 4,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '6 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 406, 407, 408],
      awayPlayerIds: [417, 419, 420, 421, 422, 423, 424], // Excludes 418 (Jorge Acevedo)
    },
  },
  {
    id: 'm2-4',
    fecha: 2,
    homeTeamId: 'VERDE',
    awayTeamId: 'RAYADO',
    homeGoals: 1,
    awayGoals: 2,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '6 de Agosto',
    attendance: {
      homePlayerIds: [409, 410, 411, 412, 413, 414, 415, 416],
      awayPlayerIds: [433, 434, 435, 436, 437, 439, 440], // Excludes 438 (Anuar Ojeda)
    },
  },

  // FECHA 3 (11 de Agosto)
  {
    id: 'm3-1',
    fecha: 3,
    homeTeamId: 'NARANJA',
    awayTeamId: 'RAYADO',
    homeGoals: 3,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '11 de Agosto',
    attendance: {
      homePlayerIds: [425, 426, 427, 428, 429, 430, 432], // Excludes 431 (Eduar Montiel)
      awayPlayerIds: [433, 435, 436, 437, 438, 439, 440], // Excludes 434 (Alvaro Betin)
    },
  },
  {
    id: 'm3-2',
    fecha: 3,
    homeTeamId: 'AZUL',
    awayTeamId: 'BLANCO',
    homeGoals: 2,
    awayGoals: 2,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '11 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 407, 408], // Excludes 406 (Leonardo Castillo)
      awayPlayerIds: [457, 458, 459, 460, 461, 462, 463], // Excludes 464 (Daniel Borja)
    },
  },
  {
    id: 'm3-3',
    fecha: 3,
    homeTeamId: 'ROJO',
    awayTeamId: 'VERDE',
    homeGoals: 1,
    awayGoals: 3,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '11 de Agosto',
    attendance: {
      homePlayerIds: [441, 442, 443, 444, 445, 446, 447, 448],
      awayPlayerIds: [409, 410, 411, 412, 413, 414, 415], // Excludes 416 (Jacit Arabia)
    },
  },
  {
    id: 'm3-4',
    fecha: 3,
    homeTeamId: 'NEGRO',
    awayTeamId: 'AMARILLO',
    homeGoals: 0,
    awayGoals: 0,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '11 de Agosto',
    attendance: {
      homePlayerIds: [417, 418, 419, 420, 421, 423, 424], // Excludes 422 (Manuel Peña)
      awayPlayerIds: [449, 450, 451, 452, 454, 455, 456], // Excludes 453 (Jose Sierra)
    },
  },

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
