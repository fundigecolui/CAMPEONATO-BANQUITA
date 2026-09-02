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
  { id: 418, dorsal: 9, name: 'JORGE ACEVEDO', teamId: 'NEGRO' },
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
  { id: 437, dorsal: 21, name: 'MARIO VELASCO', teamId: 'RAYADO' },
  { id: 438, dorsal: 13, name: 'ANUAR OJEDA', teamId: 'RAYADO' },
  { id: 439, dorsal: 20, name: 'JORGE LUIS PINTO', teamId: 'RAYADO' },
  { id: 440, dorsal: 12, name: 'FERNANDO HUMANEZ', teamId: 'RAYADO' },
  { id: 465, dorsal: 11, name: 'CARLOS MIRANDA', teamId: 'RAYADO' },

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

  // Fecha 4 (13 de Agosto)
  { id: 'c4-1', playerId: 435, fecha: 4, type: 'ROJA', createdAt: new Date('2026-08-13').toISOString() }, // MARIO GUERRA (RAYADO) - Roja
  { id: 'c4-2', playerId: 446, fecha: 4, type: 'ROJA', createdAt: new Date('2026-08-13').toISOString() }, // GUSTAVO FERNANDEZ (ROJO) - Roja
  { id: 'c4-3', playerId: 410, fecha: 4, type: 'AZUL', createdAt: new Date('2026-08-13').toISOString() }, // MARCOS FIGUEROA (VERDE) - Azul
  { id: 'c4-4', playerId: 404, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // ALBERT MONTERROZA (AZUL) - Amarilla (Acumula 3 tarjetas -> Suspensión)
  { id: 'c4-5', playerId: 406, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // LEONARDO CASTILLO (AZUL) - Amarilla
  { id: 'c4-6', playerId: 426, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // CARLOS FIGUEROA (NARANJA) - Amarilla
  { id: 'c4-7', playerId: 420, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // RUSBELL VILLALBA (NEGRO) - Amarilla
  { id: 'c4-8', playerId: 412, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // JAVIER MELGAREJO (VERDE) - Amarilla
  { id: 'c4-9', playerId: 447, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // ANTONIO ORTEGA (ROJO) - Amarilla
  { id: 'c4-10', playerId: 459, fecha: 4, type: 'AMARILLA', createdAt: new Date('2026-08-13').toISOString() }, // JOSE FIGUEROA (BLANCO) - Amarilla

  // Fecha 5 (18 de Agosto)
  { id: 'c5-1', playerId: 405, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // ALBEIRO BUELVAS (AZUL) - Amarilla
  { id: 'c5-2', playerId: 443, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // URIEL ZAMBRANO (ROJO) - Amarilla
  { id: 'c5-3', playerId: 438, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // ANUAR OJEDA (RAYADO) - Amarilla
  { id: 'c5-4', playerId: 444, fecha: 5, type: 'AZUL', createdAt: new Date('2026-08-18').toISOString() }, // NILSON CASTELLANOS (ROJO) - Azul
  { id: 'c5-5', playerId: 411, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // LUIS PACHECO (VERDE) - Amarilla
  { id: 'c5-6', playerId: 420, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // RUSBELL VILLALBA (NEGRO) - Amarilla
  { id: 'c5-7', playerId: 421, fecha: 5, type: 'AZUL', createdAt: new Date('2026-08-18').toISOString() }, // JHON CUARTAS (NEGRO) - Azul
  { id: 'c5-8', playerId: 427, fecha: 5, type: 'AZUL', createdAt: new Date('2026-08-18').toISOString() }, // JORGE LOZANO (NARANJA) - Azul
  { id: 'c5-9', playerId: 428, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // CESAR MIZGER (NARANJA) - Amarilla
  { id: 'c5-10', playerId: 429, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // JORGE ORREGO (NARANJA) - Amarilla
  { id: 'c5-11', playerId: 431, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // EDUAR MONTIEL (NARANJA) - Amarilla
  { id: 'c5-12', playerId: 432, fecha: 5, type: 'AMARILLA', createdAt: new Date('2026-08-18').toISOString() }, // JOSE ARROYO (NARANJA) - Amarilla

  // Fecha 6 (20 de Agosto)
  { id: 'c6-1', playerId: 418, fecha: 6, type: 'AMARILLA', createdAt: new Date('2026-08-20').toISOString() }, // JORGE ACEVEDO (NEGRO) - Amarilla
  { id: 'c6-2', playerId: 457, fecha: 6, type: 'AMARILLA', createdAt: new Date('2026-08-20').toISOString() }, // DONALDO MORALES (BLANCO) - Amarilla
  { id: 'c6-3', playerId: 410, fecha: 6, type: 'AMARILLA', createdAt: new Date('2026-08-20').toISOString() }, // MARCOS FIGUEROA (VERDE) - Amarilla
  { id: 'c6-4', playerId: 422, fecha: 6, type: 'AMARILLA', createdAt: new Date('2026-08-20').toISOString() }, // MANUEL PEÑA (NEGRO) - Amarilla
  { id: 'c6-5', playerId: 444, fecha: 6, type: 'AMARILLA', createdAt: new Date('2026-08-20').toISOString() }, // NILSON CASTELLANOS (ROJO) - Amarilla
  { id: 'c6-6', playerId: 404, fecha: 6, type: 'AMARILLA', createdAt: new Date('2026-08-20').toISOString() }, // ALBERT MONTERROZA (AZUL) - Amarilla
  { id: 'c6-7', playerId: 406, fecha: 6, type: 'AZUL', createdAt: new Date('2026-08-20').toISOString() }, // LEONARDO CASTILLO (AZUL) - Azul

  // Fecha 7 (25 y 26 de Agosto)
  { id: 'c7-2', playerId: 421, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-25').toISOString() }, // JHON CUARTAS (NEGRO) - Amarilla
  { id: 'c7-3', playerId: 436, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-25').toISOString() }, // WALTER GOEZ (RAYADO) - Amarilla
  { id: 'c7-4', playerId: 410, fecha: 7, type: 'AZUL', createdAt: new Date('2026-08-25').toISOString() }, // MARCOS FIGUEROA (VERDE) - Azul
  { id: 'c7-5', playerId: 450, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-25').toISOString() }, // EDWIN TEJADA (AMARILLO) - Amarilla
  { id: 'c7-6', playerId: 411, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-25').toISOString() }, // LUIS PACHECO (VERDE) - Amarilla
  { id: 'c7-7', playerId: 449, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-25').toISOString() }, // ALEJANDRO ESCAMILLA (AMARILLO) - Amarilla
  { id: 'c7-8', playerId: 416, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-25').toISOString() }, // JACIT ARABIA (VERDE) - Amarilla
  { id: 'c7-9', playerId: 442, fecha: 7, type: 'AZUL', createdAt: new Date('2026-08-26').toISOString() }, // MAURICIO DIAZ (ROJO) - Azul
  { id: 'c7-10', playerId: 459, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-26').toISOString() }, // JOSE FIGUEROA (BLANCO) - Amarilla
  { id: 'c7-11', playerId: 428, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-26').toISOString() }, // CESAR MIZGER (NARANJA) - Amarilla
  { id: 'c7-12', playerId: 432, fecha: 7, type: 'AMARILLA', createdAt: new Date('2026-08-26').toISOString() }, // JOSE ARROYO (NARANJA) - Amarilla

  // Fecha 8 (27 de Agosto)
  { id: 'c8-1', playerId: 452, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // PEDRO DE LEON (AMARILLO) - Amarilla
  { id: 'c8-2', playerId: 450, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // EDWIN TEJADA (AMARILLO) - Amarilla
  { id: 'c8-3', playerId: 453, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // JOSE SIERRA (AMARILLO) - Amarilla
  { id: 'c8-4', playerId: 417, fecha: 8, type: 'ROJA', createdAt: new Date('2026-08-27').toISOString() }, // RIGOBERTO LOZANO (NEGRO) - Roja
  { id: 'c8-6', playerId: 451, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // YAMIR PINEDA (AMARILLO) - Amarilla
  { id: 'c8-7', playerId: 442, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // MAURICIO DIAZ (ROJO) - Amarilla
  { id: 'c8-8', playerId: 404, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // ALBERT MONTERROZA (AZUL) - Amarilla
  { id: 'c8-9', playerId: 407, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // MOISES GOMEZ (AZUL) - Amarilla
  { id: 'c8-10', playerId: 419, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // NEL MARTINEZ (NEGRO) - Amarilla
  { id: 'c8-11', playerId: 421, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // JHON CUARTAS (NEGRO) - Amarilla
  { id: 'c8-12', playerId: 422, fecha: 8, type: 'AZUL', createdAt: new Date('2026-08-27').toISOString() }, // MANUEL PEÑA (NEGRO) - Azul
  { id: 'c8-13', playerId: 459, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // JOSE FIGUEROA (BLANCO) - Amarilla
  { id: 'c8-14', playerId: 426, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // CARLOS FIGUEROA (NARANJA) - Amarilla
  { id: 'c8-15', playerId: 427, fecha: 8, type: 'AMARILLA', createdAt: new Date('2026-08-27').toISOString() }, // JORGE LOZANO (NARANJA) - Amarilla

  // Fecha 9 (1 de Septiembre)
  { id: 'c9-1', playerId: 451, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // YAMIR PINEDA (AMARILLO) - Amarilla
  { id: 'c9-2', playerId: 421, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // JHON CUARTAS (NEGRO) - Amarilla
  { id: 'c9-3', playerId: 419, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // NEL MARTINEZ (NEGRO) - Amarilla
  { id: 'c9-4', playerId: 445, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // ROBERTO PERTUZ (ROJO) - Amarilla
  { id: 'c9-5', playerId: 443, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // URIEL ZAMBRANO (ROJO) - Amarilla
  { id: 'c9-6', playerId: 461, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // EVER VILLALBA (BLANCO) - Amarilla
  { id: 'c9-7', playerId: 458, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // CAMILO PACHECO (BLANCO) - Amarilla
  { id: 'c9-8', playerId: 446, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // GUSTAVO FERNANDEZ (ROJO) - Amarilla
  { id: 'c9-9', playerId: 459, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // JOSE FIGUEROA (BLANCO) - Amarilla
  { id: 'c9-10', playerId: 404, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // ALBERT MONTERROZA (AZUL) - Amarilla
  { id: 'c9-11', playerId: 406, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // LEONARDO CASTILLO (AZUL) - Amarilla
  { id: 'c9-12', playerId: 431, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // EDUAR MONTIEL (NARANJA) - Amarilla
  { id: 'c9-13', playerId: 429, fecha: 9, type: 'AMARILLA', createdAt: new Date('2026-09-01').toISOString() }, // JORGE ORREGO (NARANJA) - Amarilla
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

  // Fecha 4 (13 de Agosto)
  // ROJO (1) vs BLANCO (1)
  { id: 'g4-1', playerId: 443, fecha: 4, teamId: 'ROJO', createdAt: new Date('2026-08-13').toISOString() }, // URIEL ZAMBRANO (ROJO)
  { id: 'g4-2', playerId: 461, fecha: 4, teamId: 'BLANCO', createdAt: new Date('2026-08-13').toISOString() }, // EVER VILLALBA (BLANCO)

  // VERDE (2) vs NEGRO (1)
  { id: 'g4-3', playerId: 412, fecha: 4, teamId: 'VERDE', createdAt: new Date('2026-08-13').toISOString() }, // JAVIER MELGAREJO (VERDE)
  { id: 'g4-4', playerId: 414, fecha: 4, teamId: 'VERDE', createdAt: new Date('2026-08-13').toISOString() }, // LUIS SOLANO (VERDE)
  { id: 'g4-5', playerId: 417, fecha: 4, teamId: 'NEGRO', createdAt: new Date('2026-08-13').toISOString() }, // RIGOBERTO LOZANO (NEGRO)

  // AMARILLO (1) vs RAYADO (6)
  { id: 'g4-6', playerId: 451, fecha: 4, teamId: 'AMARILLO', createdAt: new Date('2026-08-13').toISOString() }, // YAMIR PINEDA (AMARILLO)
  { id: 'g4-7', playerId: 434, fecha: 4, teamId: 'RAYADO', createdAt: new Date('2026-08-13').toISOString() }, // ALVARO BETIN (RAYADO)
  { id: 'g4-8', playerId: 436, fecha: 4, teamId: 'RAYADO', createdAt: new Date('2026-08-13').toISOString() }, // WALTER GOEZ (RAYADO - Gol 1)
  { id: 'g4-9', playerId: 436, fecha: 4, teamId: 'RAYADO', createdAt: new Date('2026-08-13').toISOString() }, // WALTER GOEZ (RAYADO - Gol 2)
  { id: 'g4-10', playerId: 433, fecha: 4, teamId: 'RAYADO', createdAt: new Date('2026-08-13').toISOString() }, // DAMIAN MORENO (RAYADO - Gol 1)
  { id: 'g4-11', playerId: 433, fecha: 4, teamId: 'RAYADO', createdAt: new Date('2026-08-13').toISOString() }, // DAMIAN MORENO (RAYADO - Gol 2)
  { id: 'g4-12', playerId: 433, fecha: 4, teamId: 'RAYADO', createdAt: new Date('2026-08-13').toISOString() }, // DAMIAN MORENO (RAYADO - Gol 3)

  // AZUL (4) vs NARANJA (1)
  { id: 'g4-13', playerId: 404, fecha: 4, teamId: 'AZUL', createdAt: new Date('2026-08-13').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 1)
  { id: 'g4-14', playerId: 404, fecha: 4, teamId: 'AZUL', createdAt: new Date('2026-08-13').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 2)
  { id: 'g4-15', playerId: 404, fecha: 4, teamId: 'AZUL', createdAt: new Date('2026-08-13').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 3)
  { id: 'g4-16', playerId: 406, fecha: 4, teamId: 'AZUL', createdAt: new Date('2026-08-13').toISOString() }, // LEONARDO CASTILLO (AZUL)
  { id: 'g4-17', playerId: 425, fecha: 4, teamId: 'NARANJA', createdAt: new Date('2026-08-13').toISOString() }, // DIEGO LOPEZ (NARANJA)

  // Fecha 5 (18 de Agosto)
  // AZUL (3) vs VERDE (2)
  { id: 'g5-1', playerId: 404, fecha: 5, teamId: 'AZUL', createdAt: new Date('2026-08-18').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 1)
  { id: 'g5-2', playerId: 404, fecha: 5, teamId: 'AZUL', createdAt: new Date('2026-08-18').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 2)
  { id: 'g5-3', playerId: 404, fecha: 5, teamId: 'AZUL', createdAt: new Date('2026-08-18').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 3)
  { id: 'g5-18', playerId: 410, fecha: 5, teamId: 'VERDE', createdAt: new Date('2026-08-18').toISOString() }, // MARCOS FIGUEROA (VERDE)
  { id: 'g5-19', playerId: 412, fecha: 5, teamId: 'VERDE', createdAt: new Date('2026-08-18').toISOString() }, // JAVIER MELGAREJO (VERDE)

  // ROJO (2) vs AMARILLO (1)
  { id: 'g5-4', playerId: 445, fecha: 5, teamId: 'ROJO', createdAt: new Date('2026-08-18').toISOString() }, // ROBERTO PERTUZ (ROJO - Gol 1)
  { id: 'g5-5', playerId: 445, fecha: 5, teamId: 'ROJO', createdAt: new Date('2026-08-18').toISOString() }, // ROBERTO PERTUZ (ROJO - Gol 2)
  { id: 'g5-6', playerId: 451, fecha: 5, teamId: 'AMARILLO', createdAt: new Date('2026-08-18').toISOString() }, // YAMIR PINEDA (AMARILLO)

  // NEGRO (5) vs NARANJA (4)
  { id: 'g5-7', playerId: 420, fecha: 5, teamId: 'NEGRO', createdAt: new Date('2026-08-18').toISOString() }, // RUSBELL VILLALBA (NEGRO - Gol 1)
  { id: 'g5-8', playerId: 420, fecha: 5, teamId: 'NEGRO', createdAt: new Date('2026-08-18').toISOString() }, // RUSBELL VILLALBA (NEGRO - Gol 2)
  { id: 'g5-9', playerId: 420, fecha: 5, teamId: 'NEGRO', createdAt: new Date('2026-08-18').toISOString() }, // RUSBELL VILLALBA (NEGRO - Gol 3)
  { id: 'g5-10', playerId: 423, fecha: 5, teamId: 'NEGRO', createdAt: new Date('2026-08-18').toISOString() }, // HUGO MERCADO (NEGRO)
  { id: 'g5-11', playerId: 421, fecha: 5, teamId: 'NEGRO', createdAt: new Date('2026-08-18').toISOString() }, // JHON CUARTAS (NEGRO)
  { id: 'g5-12', playerId: 426, fecha: 5, teamId: 'NARANJA', createdAt: new Date('2026-08-18').toISOString() }, // CARLOS FIGUEROA (NARANJA)
  { id: 'g5-13', playerId: 429, fecha: 5, teamId: 'NARANJA', createdAt: new Date('2026-08-18').toISOString() }, // JORGE ORREGO (NARANJA - Gol 1)
  { id: 'g5-14', playerId: 429, fecha: 5, teamId: 'NARANJA', createdAt: new Date('2026-08-18').toISOString() }, // JORGE ORREGO (NARANJA - Gol 2)
  { id: 'g5-20', playerId: 430, fecha: 5, teamId: 'NARANJA', createdAt: new Date('2026-08-18').toISOString() }, // ALBEIRO OJEDA (NARANJA)

  // RAYADO (3) vs BLANCO (0)
  { id: 'g5-15', playerId: 437, fecha: 5, teamId: 'RAYADO', createdAt: new Date('2026-08-18').toISOString() }, // MARIO VELAZCO (RAYADO - Gol 1)
  { id: 'g5-16', playerId: 437, fecha: 5, teamId: 'RAYADO', createdAt: new Date('2026-08-18').toISOString() }, // MARIO VELAZCO (RAYADO - Gol 2)
  { id: 'g5-17', playerId: 436, fecha: 5, teamId: 'RAYADO', createdAt: new Date('2026-08-18').toISOString() }, // WALTER GOEZ (RAYADO)

  // Fecha 6 (20 de Agosto)
  // NARANJA (1) vs AMARILLO (1)
  { id: 'g6-1', playerId: 429, fecha: 6, teamId: 'NARANJA', createdAt: new Date('2026-08-20').toISOString() }, // JORGE ORREGO (NARANJA)
  { id: 'g6-2', playerId: 452, fecha: 6, teamId: 'AMARILLO', createdAt: new Date('2026-08-20').toISOString() }, // PEDRO DE LEON (AMARILLO)
  // AZUL (4) vs RAYADO (1)
  { id: 'g6-3', playerId: 404, fecha: 6, teamId: 'AZUL', createdAt: new Date('2026-08-20').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 1)
  { id: 'g6-4', playerId: 401, fecha: 6, teamId: 'AZUL', createdAt: new Date('2026-08-20').toISOString() }, // ALBERTO OSORIO (AZUL)
  { id: 'g6-5', playerId: 404, fecha: 6, teamId: 'AZUL', createdAt: new Date('2026-08-20').toISOString() }, // ALBERT MONTERROZA (AZUL - Gol 2)
  { id: 'g6-6', playerId: 405, fecha: 6, teamId: 'AZUL', createdAt: new Date('2026-08-20').toISOString() }, // ALBEIRO BUELVAS (AZUL)
  { id: 'g6-7', playerId: 435, fecha: 6, teamId: 'RAYADO', createdAt: new Date('2026-08-20').toISOString() }, // MARIO GUERRA (RAYADO)
  // VERDE (1) vs BLANCO (2)
  { id: 'g6-8', playerId: 409, fecha: 6, teamId: 'VERDE', createdAt: new Date('2026-08-20').toISOString() }, // ANDY ACEVEDO (VERDE)
  { id: 'g6-9', playerId: 459, fecha: 6, teamId: 'BLANCO', createdAt: new Date('2026-08-20').toISOString() }, // JOSE FIGUEROA (BLANCO)
  { id: 'g6-10', playerId: 461, fecha: 6, teamId: 'BLANCO', createdAt: new Date('2026-08-20').toISOString() }, // EVER VILLALBA (BLANCO)
  // NEGRO (1) vs ROJO (3)
  { id: 'g6-11', playerId: 420, fecha: 6, teamId: 'NEGRO', createdAt: new Date('2026-08-20').toISOString() }, // RUSBELL VILLALBA (NEGRO)
  { id: 'g6-12', playerId: 442, fecha: 6, teamId: 'ROJO', createdAt: new Date('2026-08-20').toISOString() }, // MAURICIO DIAZ (ROJO)
  { id: 'g6-13', playerId: 445, fecha: 6, teamId: 'ROJO', createdAt: new Date('2026-08-20').toISOString() }, // ROBERTO PERTUZ (ROJO - Gol 1)
  { id: 'g6-14', playerId: 445, fecha: 6, teamId: 'ROJO', createdAt: new Date('2026-08-20').toISOString() }, // ROBERTO PERTUZ (ROJO - Gol 2)

  // Fecha 7 (25 de Agosto)
  // NEGRO (1) vs RAYADO (3)
  { id: 'g7-1', playerId: 417, fecha: 7, teamId: 'NEGRO', createdAt: new Date('2026-08-25').toISOString() }, // RIGOBERTO LOZANO (NEGRO)
  { id: 'g7-2', playerId: 436, fecha: 7, teamId: 'RAYADO', createdAt: new Date('2026-08-25').toISOString() }, // WALTER GOEZ (RAYADO - Gol 1)
  { id: 'g7-3', playerId: 437, fecha: 7, teamId: 'RAYADO', createdAt: new Date('2026-08-25').toISOString() }, // MARIO VELASCO (RAYADO)
  { id: 'g7-4', playerId: 436, fecha: 7, teamId: 'RAYADO', createdAt: new Date('2026-08-25').toISOString() }, // WALTER GOEZ (RAYADO - Gol 2)

  // VERDE (1) vs AMARILLO (1)
  { id: 'g7-5', playerId: 412, fecha: 7, teamId: 'VERDE', createdAt: new Date('2026-08-25').toISOString() }, // JAVIER MELGAREJO (VERDE)
  { id: 'g7-6', playerId: 451, fecha: 7, teamId: 'AMARILLO', createdAt: new Date('2026-08-25').toISOString() }, // YAMIR PINEDA (AMARILLO)

  // AZUL (3) vs ROJO (2)
  { id: 'g7-7', playerId: 401, fecha: 7, teamId: 'AZUL', createdAt: new Date('2026-08-26').toISOString() }, // ALBERTO OSORIO (AZUL - Gol 1)
  { id: 'g7-8', playerId: 401, fecha: 7, teamId: 'AZUL', createdAt: new Date('2026-08-26').toISOString() }, // ALBERTO OSORIO (AZUL - Gol 2)
  { id: 'g7-9', playerId: 404, fecha: 7, teamId: 'AZUL', createdAt: new Date('2026-08-26').toISOString() }, // ALBERT MONTERROZA (AZUL)
  { id: 'g7-10', playerId: 446, fecha: 7, teamId: 'ROJO', createdAt: new Date('2026-08-26').toISOString() }, // GUSTAVO FERNANDEZ (ROJO - Gol 1)
  { id: 'g7-11', playerId: 446, fecha: 7, teamId: 'ROJO', createdAt: new Date('2026-08-26').toISOString() }, // GUSTAVO FERNANDEZ (ROJO - Gol 2)

  // NARANJA (0) vs BLANCO (1)
  { id: 'g7-12', playerId: 459, fecha: 7, teamId: 'BLANCO', createdAt: new Date('2026-08-26').toISOString() }, // JOSE FIGUEROA (BLANCO)

  // Fecha 8 (27 de Agosto)
  // BLANCO (0) vs NARANJA (2)
  { id: 'g8-6', playerId: 425, fecha: 8, teamId: 'NARANJA', createdAt: new Date('2026-08-27').toISOString() }, // DIEGO LOPEZ (NARANJA)
  { id: 'g8-7', playerId: 426, fecha: 8, teamId: 'NARANJA', createdAt: new Date('2026-08-27').toISOString() }, // CARLOS FIGUEROA (NARANJA)

  // AZUL (2) vs AMARILLO (3)
  { id: 'g8-1', playerId: 451, fecha: 8, teamId: 'AMARILLO', createdAt: new Date('2026-08-27').toISOString() }, // YAMIR PINEDA (AMARILLO - Gol 1)
  { id: 'g8-2', playerId: 451, fecha: 8, teamId: 'AMARILLO', createdAt: new Date('2026-08-27').toISOString() }, // YAMIR PINEDA (AMARILLO - Gol 2)
  { id: 'g8-3', playerId: 451, fecha: 8, teamId: 'AMARILLO', createdAt: new Date('2026-08-27').toISOString() }, // YAMIR PINEDA (AMARILLO - Gol 3)
  { id: 'g8-4', playerId: 401, fecha: 8, teamId: 'AZUL', createdAt: new Date('2026-08-27').toISOString() }, // ALBERTO OSORIO (AZUL)
  { id: 'g8-5', playerId: 404, fecha: 8, teamId: 'AZUL', createdAt: new Date('2026-08-27').toISOString() }, // ALBERT MONTERROZA (AZUL)

  // NEGRO (1) vs RAYADO (0)
  { id: 'g8-9', playerId: 421, fecha: 8, teamId: 'NEGRO', createdAt: new Date('2026-08-27').toISOString() }, // JHON CUARTAS (NEGRO)

  // ROJO (0) vs VERDE (1)
  { id: 'g8-8', playerId: 411, fecha: 8, teamId: 'VERDE', createdAt: new Date('2026-08-27').toISOString() }, // LUIS PACHECO (VERDE)

  // Fecha 9 (1 de Septiembre)
  // AMARILLO (4) vs NEGRO (2)
  { id: 'g9-1', playerId: 449, fecha: 9, teamId: 'AMARILLO', createdAt: new Date('2026-09-01').toISOString() }, // ALEJANDRO ESCAMILLA (AMARILLO - Gol 1)
  { id: 'g9-2', playerId: 449, fecha: 9, teamId: 'AMARILLO', createdAt: new Date('2026-09-01').toISOString() }, // ALEJANDRO ESCAMILLA (AMARILLO - Gol 2)
  { id: 'g9-3', playerId: 452, fecha: 9, teamId: 'AMARILLO', createdAt: new Date('2026-09-01').toISOString() }, // PEDRO DE LEON (AMARILLO)
  { id: 'g9-4', playerId: 451, fecha: 9, teamId: 'AMARILLO', createdAt: new Date('2026-09-01').toISOString() }, // YAMIR PINEDA (AMARILLO)
  { id: 'g9-5', playerId: 419, fecha: 9, teamId: 'NEGRO', createdAt: new Date('2026-09-01').toISOString() }, // NEL MARTINEZ (NEGRO)
  { id: 'g9-6', playerId: 420, fecha: 9, teamId: 'NEGRO', createdAt: new Date('2026-09-01').toISOString() }, // RUSBELL VILLALBA (NEGRO)

  // BLANCO (1) vs ROJO (1)
  { id: 'g9-7', playerId: 445, fecha: 9, teamId: 'ROJO', createdAt: new Date('2026-09-01').toISOString() }, // ROBERTO PERTUZ (ROJO)
  { id: 'g9-8', playerId: 463, fecha: 9, teamId: 'BLANCO', createdAt: new Date('2026-09-01').toISOString() }, // IVAN DIAZ (BLANCO)

  // VERDE (2) vs RAYADO (2)
  { id: 'g9-9', playerId: 437, fecha: 9, teamId: 'RAYADO', createdAt: new Date('2026-09-01').toISOString() }, // MARIO VELASCO (RAYADO)
  { id: 'g9-10', playerId: 433, fecha: 9, teamId: 'RAYADO', createdAt: new Date('2026-09-01').toISOString() }, // DAMIAN MORENO (RAYADO)
  { id: 'g9-11', playerId: 409, fecha: 9, teamId: 'VERDE', createdAt: new Date('2026-09-01').toISOString() }, // ANDY ACEVEDO (VERDE - Gol 1)
  { id: 'g9-12', playerId: 409, fecha: 9, teamId: 'VERDE', createdAt: new Date('2026-09-01').toISOString() }, // ANDY ACEVEDO (VERDE - Gol 2)

  // AZUL (1) vs NARANJA (1)
  { id: 'g9-13', playerId: 403, fecha: 9, teamId: 'AZUL', createdAt: new Date('2026-09-01').toISOString() }, // OSCAR PACHECO (AZUL)
  { id: 'g9-14', playerId: 427, fecha: 9, teamId: 'NARANJA', createdAt: new Date('2026-09-01').toISOString() }, // JORGE LOZANO (NARANJA)
];

// Official Fechas for II Semestre 2026 (Vuelta 1: Fechas 1 a 7, Vuelta 2: Fechas 8 a 14)
const INITIAL_FECHAS_2026_2: Match[] = [
  // FECHA 1 (4 de Agosto)
  { id: 'P1-1', fecha: 1, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 0, isPlayed: true, status: 'FINALIZADO', dateStr: '4 de Agosto' },
  {
    id: 'P1-2',
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
  { id: 'P1-3', fecha: 1, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true, status: 'FINALIZADO', dateStr: '4 de Agosto' },
  {
    id: 'P1-4',
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
    id: 'P2-1',
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
    id: 'P2-2',
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
    id: 'P2-3',
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
    id: 'P2-4',
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
    id: 'P3-1',
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
    id: 'P3-2',
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
    id: 'P3-3',
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
    id: 'P3-4',
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
  {
    id: 'P4-1',
    fecha: 4,
    homeTeamId: 'ROJO',
    awayTeamId: 'BLANCO',
    homeGoals: 1,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '13 de Agosto',
    attendance: {
      homePlayerIds: [441, 442, 443, 445, 446, 447, 448], // Excludes 444 (Nilson Castellanos - Excusa)
      awayPlayerIds: [457, 458, 459, 460, 461, 462, 463, 464],
    },
  },
  {
    id: 'P4-2',
    fecha: 4,
    homeTeamId: 'VERDE',
    awayTeamId: 'NEGRO',
    homeGoals: 2,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '13 de Agosto',
    attendance: {
      homePlayerIds: [409, 410, 411, 412, 413, 414, 415], // Excludes 416 (Jacit Arabia - Excusa)
      awayPlayerIds: [417, 418, 419, 420, 423, 424], // Excludes 421 (Jhon Cuartas/Peña) and 422 (Manuel Peña) - No asisten
    },
  },
  {
    id: 'P4-3',
    fecha: 4,
    homeTeamId: 'AMARILLO',
    awayTeamId: 'RAYADO',
    homeGoals: 1,
    awayGoals: 6,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '13 de Agosto',
    attendance: {
      homePlayerIds: [449, 450, 451, 452, 453, 454, 455, 456],
      awayPlayerIds: [433, 434, 435, 436, 438, 439, 440], // Excludes 437 (Mario Velazco - Excusa)
    },
  },
  {
    id: 'P4-4',
    fecha: 4,
    homeTeamId: 'AZUL',
    awayTeamId: 'NARANJA',
    homeGoals: 4,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '13 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 406, 407, 408],
      awayPlayerIds: [425, 426, 427, 428, 429, 430, 431, 432],
    },
  },

  // FECHA 5 (18 de Agosto)
  {
    id: 'P5-1',
    fecha: 5,
    homeTeamId: 'AZUL',
    awayTeamId: 'VERDE',
    homeGoals: 3,
    awayGoals: 2,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '18 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 406, 408], // Excluye 407 (Moises Gomez - No asiste hoy)
      awayPlayerIds: [409, 410, 411, 412, 413, 414, 415], // Excluye 416 (Jacit Arabia - No asiste hoy)
    },
  },
  {
    id: 'P5-2',
    fecha: 5,
    homeTeamId: 'ROJO',
    awayTeamId: 'AMARILLO',
    homeGoals: 2,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '18 de Agosto',
    attendance: {
      homePlayerIds: [441, 442, 443, 444, 445, 446, 447, 448],
      awayPlayerIds: [449, 450, 451, 452, 453, 454, 455, 456],
    },
  },
  {
    id: 'P5-3',
    fecha: 5,
    homeTeamId: 'NEGRO',
    awayTeamId: 'NARANJA',
    homeGoals: 5,
    awayGoals: 4,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '18 de Agosto',
    attendance: {
      homePlayerIds: [417, 419, 420, 421, 423, 424], // Excluye 418 (Jorge Acevedo - No asiste) y 422 (Manuel Peña - No asiste). Rusbell Villalba (420) presente.
      awayPlayerIds: [426, 427, 428, 429, 430, 431, 432], // Excluye 425 (Diego Lopez - No asiste)
    },
  },
  {
    id: 'P5-4',
    fecha: 5,
    homeTeamId: 'RAYADO',
    awayTeamId: 'BLANCO',
    homeGoals: 3,
    awayGoals: 0,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '18 de Agosto',
    attendance: {
      homePlayerIds: [433, 434, 435, 436, 437, 438, 439, 440],
      awayPlayerIds: [457, 458, 459, 461, 463, 464], // Excluye 460 (Juan Alvarez - No asiste) y 462 (Dairo Mercado - No asiste)
    },
  },

  // FECHA 6 (20 de Agosto)
  {
    id: 'P6-1',
    fecha: 6,
    homeTeamId: 'NARANJA',
    awayTeamId: 'AMARILLO',
    homeGoals: 1,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '20 de Agosto',
    attendance: {
      homePlayerIds: [425, 426, 427, 428, 429, 430, 431, 432],
      awayPlayerIds: [449, 450, 451, 452, 454, 455, 456], // Excluye 453 (Jose Sierra - No asiste)
    },
  },
  {
    id: 'P6-2',
    fecha: 6,
    homeTeamId: 'AZUL',
    awayTeamId: 'RAYADO',
    homeGoals: 4,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '20 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 406, 407, 408],
      awayPlayerIds: [433, 434, 435, 436, 438, 439, 440], // Excluye 437 (Mario Velasco - No asiste)
    },
  },
  {
    id: 'P6-3',
    fecha: 6,
    homeTeamId: 'VERDE',
    awayTeamId: 'BLANCO',
    homeGoals: 1,
    awayGoals: 2,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '20 de Agosto',
    attendance: {
      homePlayerIds: [409, 410, 411, 412, 413, 414, 415, 416],
      awayPlayerIds: [457, 458, 459, 460, 461, 463, 464], // Excluye 462 (Dairo Mercado - No asiste)
    },
  },
  {
    id: 'P6-4',
    fecha: 6,
    homeTeamId: 'NEGRO',
    awayTeamId: 'ROJO',
    homeGoals: 1,
    awayGoals: 3,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '20 de Agosto',
    attendance: {
      homePlayerIds: [417, 418, 419, 420, 422, 423, 424], // Excluye 421 (Jhon Cuartas - No asiste)
      awayPlayerIds: [441, 442, 443, 444, 445, 446, 447, 448],
    },
  },

  // FECHA 7 (25 de Agosto)
  {
    id: 'P7-1',
    fecha: 7,
    homeTeamId: 'NEGRO',
    awayTeamId: 'RAYADO',
    homeGoals: 1,
    awayGoals: 3,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '25 de Agosto',
    attendance: {
      homePlayerIds: [417, 418, 419, 420, 421, 422, 423, 424],
      awayPlayerIds: [433, 434, 435, 436, 437, 438, 439, 440, 465],
    },
  },
  {
    id: 'P7-2',
    fecha: 7,
    homeTeamId: 'VERDE',
    awayTeamId: 'AMARILLO',
    homeGoals: 1,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '25 de Agosto',
    attendance: {
      homePlayerIds: [409, 410, 411, 412, 413, 414, 416], // Sin asistencia: Ivan / Juan Orrego (415)
      awayPlayerIds: [449, 450, 451, 452, 453, 454, 455, 456],
    },
  },
  {
    id: 'P7-3',
    fecha: 7,
    homeTeamId: 'AZUL',
    awayTeamId: 'ROJO',
    homeGoals: 3,
    awayGoals: 2,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '26 de Agosto',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 406, 407, 408], // Sin asistencia: Albeiro Buelvas (405)
      awayPlayerIds: [441, 442, 443, 444, 445, 446, 447, 448],
    },
  },
  {
    id: 'P7-4',
    fecha: 7,
    homeTeamId: 'NARANJA',
    awayTeamId: 'BLANCO',
    homeGoals: 0,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '26 de Agosto',
  },

  // ==========================================
  // II RONDA (FECHAS 8 a 14) - CALENDARIO OFICIAL
  // ==========================================

  // FECHA 8 (1. FECHA II Ronda: 1 Vs 3, 7 Vs 8, 4 Vs 6, 2 Vs 5)
  { id: 'P8-1', fecha: 8, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true, status: 'FINALIZADO', dateStr: 'II Ronda - F1' },
  {
    id: 'P8-2',
    fecha: 8,
    homeTeamId: 'NEGRO',
    awayTeamId: 'RAYADO',
    homeGoals: 1,
    awayGoals: 0,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: 'II Ronda - F1',
    attendance: {
      homePlayerIds: [417, 418, 419, 420, 421, 422, 423], // Excluye 424 (Alberto Bustos - No asiste)
      awayPlayerIds: [433, 434, 435, 436, 437, 438, 439, 440, 465],
    },
  },
  { id: 'P8-3', fecha: 8, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 3, isPlayed: true, status: 'FINALIZADO', dateStr: 'II Ronda - F1' },
  { id: 'P8-4', fecha: 8, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 1, isPlayed: true, status: 'FINALIZADO', dateStr: 'II Ronda - F1' },

  // FECHA 9 (2. FECHA II Ronda: 6 Vs 7, 1 Vs 2, 5 Vs 8, 4 Vs 3)
  { id: 'P9-1', fecha: 9, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 2, isPlayed: true, status: 'FINALIZADO', dateStr: '1 de Septiembre' },
  { id: 'P9-2', fecha: 9, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true, status: 'FINALIZADO', dateStr: '1 de Septiembre' },
  { id: 'P9-3', fecha: 9, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true, status: 'FINALIZADO', dateStr: '1 de Septiembre' },
  {
    id: 'P9-4',
    fecha: 9,
    homeTeamId: 'AZUL',
    awayTeamId: 'NARANJA',
    homeGoals: 1,
    awayGoals: 1,
    isPlayed: true,
    status: 'FINALIZADO',
    dateStr: '1 de Septiembre',
    attendance: {
      homePlayerIds: [401, 402, 403, 404, 405, 406, 408], // Excluye 407 (Moises Gomez - No asiste)
      awayPlayerIds: [425, 426, 427, 428, 429, 430, 431], // Excluye 432 (Jose Arroyo - No asiste)
    },
  },

  // FECHA 10 (3. FECHA II Ronda: 3 Vs 5, 4 Vs 8, 1 Vs 6, 2 Vs 7)
  { id: 'P10-1', fecha: 10, homeTeamId: 'NARANJA', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F3' },
  { id: 'P10-2', fecha: 10, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F3' },
  { id: 'P10-3', fecha: 10, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F3' },
  { id: 'P10-4', fecha: 10, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F3' },

  // FECHA 11 (4. FECHA II Ronda: 1 Vs 4, 2 Vs 3, 7 Vs 5, 6 Vs 8)
  { id: 'P11-1', fecha: 11, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F4' },
  { id: 'P11-2', fecha: 11, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F4' },
  { id: 'P11-3', fecha: 11, homeTeamId: 'NEGRO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F4' },
  { id: 'P11-4', fecha: 11, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F4' },

  // FECHA 12 (5. FECHA II Ronda: 3 Vs 7, 1 Vs 8, 2 Vs 6, 4 Vs 5)
  { id: 'P12-1', fecha: 12, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F5' },
  { id: 'P12-2', fecha: 12, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F5' },
  { id: 'P12-3', fecha: 12, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F5' },
  { id: 'P12-4', fecha: 12, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F5' },

  // FECHA 13 (6. FECHA II Ronda: 5 Vs 6, 2 Vs 4, 3 Vs 8, 1 Vs 7)
  { id: 'P13-1', fecha: 13, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F6' },
  { id: 'P13-2', fecha: 13, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F6' },
  { id: 'P13-3', fecha: 13, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F6' },
  { id: 'P13-4', fecha: 13, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F6' },

  // FECHA 14 (7. FECHA II Ronda: 2 Vs 8, 1 Vs 5, 4 Vs 7, 3 Vs 6)
  { id: 'P14-1', fecha: 14, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F7' },
  { id: 'P14-2', fecha: 14, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F7' },
  { id: 'P14-3', fecha: 14, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F7' },
  { id: 'P14-4', fecha: 14, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: false, dateStr: 'II Ronda - F7' },
];

export const MATCHES_2026_2: Match[] = generateAllTournamentMatches(INITIAL_FECHAS_2026_2);
