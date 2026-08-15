import { Player, CardRecord, GoalRecord, Match, TeamId } from '../types';

export const PLAYERS_2026_1: Player[] = [
  // 1. AZUL
  { id: 301, dorsal: 43, name: 'LUIS PACHECO', teamId: 'AZUL' },
  { id: 302, dorsal: 7, name: 'PEDRO DE LEON', teamId: 'AZUL' },
  { id: 303, dorsal: 10, name: 'MARCOS FIGUEROA', teamId: 'AZUL' },
  { id: 304, dorsal: 16, name: 'JHON CUARTAS', teamId: 'AZUL' },
  { id: 305, dorsal: 6, name: 'MANUEL PEÑA', teamId: 'AZUL' },
  { id: 306, dorsal: 11, name: 'DONALDO MORALES', teamId: 'AZUL' },
  { id: 307, dorsal: 26, name: 'DANIEL BORJA', teamId: 'AZUL' },
  { id: 308, dorsal: 18, name: 'JOSE DOMINGUEZ', teamId: 'AZUL' },
  { id: 309, dorsal: 24, name: 'ALEJANDRO ESCAMILLA', teamId: 'AZUL' },

  // 2. VERDE
  { id: 310, dorsal: 4, name: 'JACIT ARABIA', teamId: 'VERDE' },
  { id: 311, dorsal: 7, name: 'JORGE ORREGO', teamId: 'VERDE' },
  { id: 312, dorsal: 8, name: 'ALVARO BETIN', teamId: 'VERDE' },
  { id: 313, dorsal: 6, name: 'JAVIER FADUL', teamId: 'VERDE' },
  { id: 314, dorsal: 10, name: 'NILSON CASTELLANOS', teamId: 'VERDE' },
  { id: 315, dorsal: 20, name: 'JORGE LUIS PINTO', teamId: 'VERDE' },
  { id: 316, dorsal: 9, name: 'JOSE HOYOS', teamId: 'VERDE' },
  { id: 317, dorsal: 3, name: 'ROBERT VILLALBA', teamId: 'VERDE' },
  { id: 318, dorsal: 3, name: 'WALTER GOEZ', teamId: 'VERDE' },

  // 3. NEGRO
  { id: 319, dorsal: 7, name: 'RIGOBERTO LOZANO', teamId: 'NEGRO' },
  { id: 320, dorsal: 11, name: 'ALBERT MONTERROZA', teamId: 'NEGRO' },
  { id: 321, dorsal: 6, name: 'EDGARDO PACHECO', teamId: 'NEGRO' },
  { id: 322, dorsal: 13, name: 'ANUAR OJEDA', teamId: 'NEGRO' },
  { id: 323, dorsal: 9, name: 'MARIO GUERRA', teamId: 'NEGRO' },
  { id: 324, dorsal: 87, name: 'MAURICIO DIAZ', teamId: 'NEGRO' },
  { id: 325, dorsal: 10, name: 'IVAN ORREGO', teamId: 'NEGRO' },
  { id: 368, dorsal: 8, name: 'IVAN DIAZ', teamId: 'NEGRO' },

  // 4. NARANJA
  { id: 326, dorsal: 5, name: 'EDWIN TEJADA', teamId: 'NARANJA' },
  { id: 327, dorsal: 8, name: 'NEL MARTINEZ', teamId: 'NARANJA' },
  { id: 328, dorsal: 9, name: 'JOSÉ ARROYO', teamId: 'NARANJA' },
  { id: 329, dorsal: 6, name: 'DAIRO MERCADO', teamId: 'NARANJA' },
  { id: 330, dorsal: 22, name: 'JAVIER MELGAREJO', teamId: 'NARANJA' },
  { id: 331, dorsal: 10, name: 'DAMIAN MORENO', teamId: 'NARANJA' },
  { id: 332, dorsal: 10, name: 'BERNARDO GALVIS', teamId: 'NARANJA' },
  { id: 365, dorsal: 12, name: 'MOISES GOMEZ', teamId: 'NARANJA' },

  // 5. ROJO
  { id: 333, dorsal: 9, name: 'ROBERTO PERTUZ', teamId: 'ROJO' },
  { id: 334, dorsal: 10, name: 'ANIBAL ROMERO', teamId: 'ROJO' },
  { id: 335, dorsal: 7, name: 'URIEL ZAMBRANO', teamId: 'ROJO' },
  { id: 336, dorsal: 2, name: 'ALBEIRO OJEDA', teamId: 'ROJO' },
  { id: 337, dorsal: 5, name: 'HUGO MERCADO', teamId: 'ROJO' },
  { id: 338, dorsal: 6, name: 'DOUGLAS COAVAS', teamId: 'ROJO' },
  { id: 339, dorsal: 29, name: 'OSCAR PACHECO', teamId: 'ROJO' },
  { id: 340, dorsal: 10, name: 'DIEGO LOPEZ', teamId: 'ROJO' },

  // 6. AMARILLO
  { id: 341, dorsal: 31, name: 'YAMIR PINEDA', teamId: 'AMARILLO' },
  { id: 342, dorsal: 54, name: 'CARLOS FIGUEROA', teamId: 'AMARILLO' },
  { id: 343, dorsal: 20, name: 'FERNANDO HUMANEZ', teamId: 'AMARILLO' },
  { id: 344, dorsal: 4, name: 'EDUAR MONTIEL', teamId: 'AMARILLO' },
  { id: 345, dorsal: 15, name: 'NESTOR BETIN', teamId: 'AMARILLO' },
  { id: 346, dorsal: 8, name: 'MARIO VELAZCO', teamId: 'AMARILLO' },
  { id: 347, dorsal: 9, name: 'EVER VILLALBA', teamId: 'AMARILLO' },
  { id: 348, dorsal: 5, name: 'LUIS SOLANO', teamId: 'AMARILLO' },
  { id: 349, dorsal: 10, name: 'ALBERTO OSORIO', teamId: 'AMARILLO' },

  // 7. BLANCO
  { id: 350, dorsal: 7, name: 'JOSE IVAN SIERRA', teamId: 'BLANCO' },
  { id: 351, dorsal: 26, name: 'CAMILO PACHECO', teamId: 'BLANCO' },
  { id: 352, dorsal: 2, name: 'GUSTAVO FERNANDEZ', teamId: 'BLANCO' },
  { id: 353, dorsal: 7, name: 'JUAN MARTINEZ', teamId: 'BLANCO' },
  { id: 354, dorsal: 9, name: 'JORGE LOZANO', teamId: 'BLANCO' },
  { id: 355, dorsal: 22, name: 'ALBERTO BUSTOS', teamId: 'BLANCO' },
  { id: 356, dorsal: 17, name: 'JOSE DAVID HOYOS', teamId: 'BLANCO' },
  { id: 366, dorsal: 15, name: 'ANTONIO ORTEGA', teamId: 'BLANCO' },
  { id: 367, dorsal: 18, name: 'RUSBELL VILLALBA', teamId: 'BLANCO' },

  // 8. RAYADO
  { id: 357, dorsal: 5, name: 'ALBEIRO BUELVAS', teamId: 'RAYADO' },
  { id: 358, dorsal: 3, name: 'JOSE FIGUEROA', teamId: 'RAYADO' },
  { id: 359, dorsal: 11, name: 'JORGE ACEVEDO', teamId: 'RAYADO' },
  { id: 360, dorsal: 9, name: 'LEONARDO CASTILLO', teamId: 'RAYADO' },
  { id: 361, dorsal: 1, name: 'ROBERT ORTEGA', teamId: 'RAYADO' },
  { id: 362, dorsal: 7, name: 'HECTOR VERGARA', teamId: 'RAYADO' },
  { id: 363, dorsal: 20, name: 'JUAN ALVAREZ', teamId: 'RAYADO' },
  { id: 364, dorsal: 10, name: 'ANDY ACEVEDO', teamId: 'RAYADO' },
];

const createCards = (playerId: number, items: { fecha: number; type: 'AMARILLA' | 'AZUL' | 'ROJA' }[]): CardRecord[] => {
  return items.map((item, index) => ({
    id: `c_2026_1_${playerId}_${item.fecha}_${index}`,
    playerId,
    fecha: item.fecha,
    fechaNumber: item.fecha,
    type: item.type,
  }));
};

export const CARDS_2026_1: CardRecord[] = [
  // LUIS PACHECO (301)
  ...createCards(301, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 3, type: 'AMARILLA' }, { fecha: 6, type: 'AMARILLA' },
    { fecha: 12, type: 'AZUL' }, { fecha: 18, type: 'AMARILLA' }, { fecha: 21, type: 'AZUL' },
    { fecha: 24, type: 'AZUL' }, { fecha: 32, type: 'AMARILLA' }, { fecha: 33, type: 'AMARILLA' }
  ]),
  // PEDRO DE LEON (302)
  ...createCards(302, [
    { fecha: 1, type: 'AMARILLA' }, { fecha: 2, type: 'AMARILLA' }, { fecha: 3, type: 'AMARILLA' },
    { fecha: 5, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 19, type: 'AMARILLA' }, { fecha: 23, type: 'ROJA' }, { fecha: 26, type: 'AZUL' },
    { fecha: 29, type: 'AZUL' }, { fecha: 32, type: 'AMARILLA' }, { fecha: 33, type: 'AMARILLA' }
  ]),
  // EDWIN TEJADA (326)
  ...createCards(326, [
    { fecha: 7, type: 'AMARILLA' }, { fecha: 9, type: 'AZUL' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 18, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' }, { fecha: 26, type: 'AMARILLA' },
    { fecha: 30, type: 'AMARILLA' }, { fecha: 36, type: 'AMARILLA' }
  ]),
  // YAMIR PINEDA (341)
  ...createCards(341, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 10, type: 'AZUL' },
    { fecha: 13, type: 'AMARILLA' }, { fecha: 14, type: 'AMARILLA' }, { fecha: 15, type: 'AMARILLA' },
    { fecha: 16, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' }, { fecha: 22, type: 'AMARILLA' },
    { fecha: 24, type: 'AMARILLA' }, { fecha: 25, type: 'AMARILLA' }, { fecha: 27, type: 'AMARILLA' },
    { fecha: 28, type: 'AMARILLA' }, { fecha: 30, type: 'AZUL' }
  ]),
  // NEL MARTINEZ (327)
  ...createCards(327, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 9, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' },
    { fecha: 22, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 31, type: 'AMARILLA' }
  ]),
  // MARCOS FIGUEROA (303)
  ...createCards(303, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 8, type: 'AZUL' },
    { fecha: 12, type: 'AZUL' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 17, type: 'AMARILLA' },
    { fecha: 26, type: 'AZUL' }, { fecha: 29, type: 'AMARILLA' }, { fecha: 32, type: 'AMARILLA' }
  ]),
  // ROBERTO PERTUZ (333)
  ...createCards(333, [
    { fecha: 4, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 9, type: 'AMARILLA' },
    { fecha: 21, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }
  ]),
  // ALBEIRO BUELVAS (357)
  ...createCards(357, [
    { fecha: 13, type: 'AMARILLA' }, { fecha: 16, type: 'AZUL' }, { fecha: 17, type: 'AZUL' },
    { fecha: 26, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' }, { fecha: 31, type: 'AZUL' }
  ]),
  // JHON CUARTAS (304)
  ...createCards(304, [
    { fecha: 7, type: 'AMARILLA' }, { fecha: 11, type: 'AMARILLA' }, { fecha: 15, type: 'AMARILLA' },
    { fecha: 18, type: 'AMARILLA' }, { fecha: 24, type: 'AMARILLA' }, { fecha: 25, type: 'AMARILLA' },
    { fecha: 29, type: 'AZUL' }, { fecha: 32, type: 'AMARILLA' }
  ]),
  // ANIBAL ROMERO (334)
  ...createCards(334, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 5, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' },
    { fecha: 22, type: 'AMARILLA' }, { fecha: 23, type: 'AZUL' }, { fecha: 30, type: 'AMARILLA' },
    { fecha: 31, type: 'AMARILLA' }
  ]),
  // JACIT ARABIA (310)
  ...createCards(310, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 10, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' },
    { fecha: 13, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' },
    { fecha: 31, type: 'AZUL' }, { fecha: 32, type: 'AMARILLA' }
  ]),
  // RIGOBERTO LOZANO (319)
  ...createCards(319, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 3, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 17, type: 'AZUL' }, { fecha: 19, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' },
    { fecha: 21, type: 'AMARILLA' }
  ]),
  // ALBERT MONTERROZA (320)
  ...createCards(320, [
    { fecha: 9, type: 'AMARILLA' }, { fecha: 10, type: 'AMARILLA' }, { fecha: 11, type: 'AMARILLA' },
    { fecha: 17, type: 'ROJA' }, { fecha: 19, type: 'AMARILLA' }, { fecha: 24, type: 'AMARILLA' },
    { fecha: 32, type: 'AMARILLA' }
  ]),
  // MANUEL PEÑA (305)
  ...createCards(305, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 5, type: 'AZUL' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 16, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' },
    { fecha: 31, type: 'AMARILLA' }, { fecha: 32, type: 'AMARILLA' }
  ]),
  // JORGE ORREGO (311)
  ...createCards(311, [
    { fecha: 4, type: 'AMARILLA' }, { fecha: 9, type: 'AMARILLA' }, { fecha: 10, type: 'AMARILLA' },
    { fecha: 11, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' }, { fecha: 31, type: 'AMARILLA' },
    { fecha: 32, type: 'AMARILLA' }
  ]),
  // JOSE FIGUEROA (358)
  ...createCards(358, [
    { fecha: 4, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 11, type: 'AMARILLA' },
    { fecha: 17, type: 'AMARILLA' }, { fecha: 32, type: 'AMARILLA' }, { fecha: 33, type: 'AMARILLA' }
  ]),
  // JOSE IVAN SIERRA (350)
  ...createCards(350, [
    { fecha: 7, type: 'AMARILLA' }, { fecha: 18, type: 'AMARILLA' }, { fecha: 19, type: 'AZUL' },
    { fecha: 20, type: 'ROJA' }
  ]),
  // JOSÉ ARROYO (328)
  ...createCards(328, [
    { fecha: 6, type: 'AMARILLA' }, { fecha: 8, type: 'AMARILLA' }, { fecha: 17, type: 'AZUL' },
    { fecha: 19, type: 'AZUL' }, { fecha: 21, type: 'AMARILLA' }, { fecha: 25, type: 'AMARILLA' }
  ]),
  // URIEL ZAMBRANO (335)
  ...createCards(335, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 6, type: 'AMARILLA' }, { fecha: 8, type: 'AMARILLA' },
    { fecha: 21, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' }
  ]),
  // JORGE ACEVEDO (359)
  ...createCards(359, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 17, type: 'ROJA' }, { fecha: 26, type: 'AMARILLA' }
  ]),
  // ALBEIRO OJEDA (336)
  ...createCards(336, [
    { fecha: 6, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 17, type: 'AMARILLA' },
    { fecha: 24, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }, { fecha: 32, type: 'AMARILLA' }
  ]),
  // ALVARO BETIN (312)
  ...createCards(312, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 3, type: 'AMARILLA' }, { fecha: 5, type: 'AZUL' },
    { fecha: 16, type: 'AMARILLA' }
  ]),
  // DONALDO MORALES (306)
  ...createCards(306, [
    { fecha: 8, type: 'AMARILLA' }, { fecha: 11, type: 'AMARILLA' }, { fecha: 14, type: 'AZUL' },
    { fecha: 17, type: 'AMARILLA' }
  ]),
  // CAMILO PACHECO (351)
  ...createCards(351, [
    { fecha: 4, type: 'AZUL' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' },
    { fecha: 20, type: 'AMARILLA' }
  ]),
  // JAVIER FADUL (313)
  ...createCards(313, [
    { fecha: 6, type: 'AMARILLA' }, { fecha: 7, type: 'AMARILLA' }, { fecha: 20, type: 'AZUL' },
    { fecha: 21, type: 'AMARILLA' }
  ]),
  // LEONARDO CASTILLO (360)
  ...createCards(360, [
    { fecha: 5, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 19, type: 'AMARILLA' },
    { fecha: 21, type: 'AMARILLA' }, { fecha: 22, type: 'AZUL' }
  ]),
  // CARLOS FIGUEROA (342)
  ...createCards(342, [
    { fecha: 16, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' }, { fecha: 25, type: 'AMARILLA' },
    { fecha: 26, type: 'AZUL' }, { fecha: 29, type: 'AMARILLA' }
  ]),
  // EDGARDO PACHECO (321)
  ...createCards(321, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' },
    { fecha: 20, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' }
  ]),
  // ANUAR OJEDA (322)
  ...createCards(322, [
    { fecha: 8, type: 'AZUL' }, { fecha: 11, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' },
    { fecha: 14, type: 'AMARILLA' }, { fecha: 17, type: 'AMARILLA' }, { fecha: 26, type: 'AMARILLA' },
    { fecha: 31, type: 'AMARILLA' }
  ]),
  // MARIO GUERRA (323)
  ...createCards(323, [
    { fecha: 4, type: 'ROJA' }, { fecha: 9, type: 'AMARILLA' }, { fecha: 15, type: 'AMARILLA' },
    { fecha: 31, type: 'AMARILLA' }
  ]),
  // ROBERT ORTEGA (361)
  ...createCards(361, [
    { fecha: 2, type: 'AMARILLA' }, { fecha: 20, type: 'AMARILLA' }, { fecha: 26, type: 'AMARILLA' },
    { fecha: 31, type: 'AMARILLA' }
  ]),
  // FERNANDO HUMANEZ (343)
  ...createCards(343, [
    { fecha: 7, type: 'AMARILLA' }, { fecha: 8, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' },
    { fecha: 17, type: 'AMARILLA' }, { fecha: 18, type: 'AMARILLA' }, { fecha: 19, type: 'AMARILLA' },
    { fecha: 20, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' },
    { fecha: 33, type: 'AMARILLA' }
  ]),
  // DAIRO MERCADO (329)
  ...createCards(329, [
    { fecha: 9, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' },
    { fecha: 14, type: 'AMARILLA' }, { fecha: 15, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }
  ]),
  // NILSON CASTELLANOS (314)
  ...createCards(314, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 4, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' }
  ]),
  // EDUAR MONTIEL (344)
  ...createCards(344, [
    { fecha: 5, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' },
    { fecha: 32, type: 'AMARILLA' }
  ]),
  // JORGE LUIS PINTO (315)
  ...createCards(315, [
    { fecha: 11, type: 'AMARILLA' }, { fecha: 13, type: 'AMARILLA' }, { fecha: 19, type: 'AMARILLA' }
  ]),
  // HECTOR VERGARA (362)
  ...createCards(362, [
    { fecha: 11, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' }
  ]),
  // JUAN ALVAREZ (363)
  ...createCards(363, [
    { fecha: 6, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }, { fecha: 23, type: 'AMARILLA' }
  ]),
  // GUSTAVO FERNANDEZ (352)
  ...createCards(352, [
    { fecha: 4, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' }, { fecha: 26, type: 'AMARILLA' }
  ]),
  // JOSE HOYOS (316)
  ...createCards(316, [
    { fecha: 16, type: 'AMARILLA' }, { fecha: 27, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' }
  ]),
  // HUGO MERCADO (337)
  ...createCards(337, [
    { fecha: 24, type: 'AMARILLA' }, { fecha: 27, type: 'AMARILLA' }, { fecha: 30, type: 'AMARILLA' }
  ]),
  // JAVIER MELGAREJO (330)
  ...createCards(330, [
    { fecha: 21, type: 'ROJA' }, { fecha: 23, type: 'AMARILLA' }, { fecha: 31, type: 'AMARILLA' }
  ]),
  // JUAN MARTINEZ (353)
  ...createCards(353, [
    { fecha: 4, type: 'AMARILLA' }, { fecha: 10, type: 'AMARILLA' }
  ]),
  // MAURICIO DIAZ (324)
  ...createCards(324, [
    { fecha: 10, type: 'AMARILLA' }, { fecha: 12, type: 'AMARILLA' }
  ]),
  // DOUGLAS COAVAS (338)
  ...createCards(338, [
    { fecha: 5, type: 'AMARILLA' }, { fecha: 16, type: 'AMARILLA' }
  ]),
  // ROBERT VILLALBA (317)
  ...createCards(317, [
    { fecha: 3, type: 'AMARILLA' }, { fecha: 21, type: 'AMARILLA' }
  ]),
  // DANIEL BORJA (307)
  ...createCards(307, [
    { fecha: 14, type: 'AMARILLA' }, { fecha: 25, type: 'AMARILLA' }
  ]),
  // JORGE LOZANO (354)
  ...createCards(354, [
    { fecha: 13, type: 'AMARILLA' }, { fecha: 25, type: 'AMARILLA' }
  ]),
  // OSCAR PACHECO (339)
  ...createCards(339, [
    { fecha: 24, type: 'AMARILLA' }, { fecha: 28, type: 'AMARILLA' }
  ]),
  // WALTER GOEZ (318)
  ...createCards(318, [
    { fecha: 25, type: 'AMARILLA' }, { fecha: 29, type: 'AMARILLA' }
  ]),
  // DAMIAN MORENO (331)
  ...createCards(331, [
    { fecha: 5, type: 'AZUL' }, { fecha: 29, type: 'AMARILLA' }
  ]),
  // DIEGO LOPEZ (340)
  ...createCards(340, [
    { fecha: 16, type: 'AMARILLA' }, { fecha: 32, type: 'AMARILLA' }
  ]),
  // ANDY ACEVEDO (364)
  ...createCards(364, [{ fecha: 3, type: 'AMARILLA' }]),
  // NESTOR BETIN (345)
  ...createCards(345, [{ fecha: 3, type: 'AMARILLA' }]),
  // MARIO VELAZCO (346)
  ...createCards(346, [{ fecha: 4, type: 'AMARILLA' }]),
  // ALBERTO BUSTOS (355)
  ...createCards(355, [{ fecha: 14, type: 'AMARILLA' }]),
  // EVER VILLALBA (347)
  ...createCards(347, [{ fecha: 16, type: 'AMARILLA' }]),
  // BERNARDO GALVIS (332)
  ...createCards(332, [{ fecha: 16, type: 'AMARILLA' }]),
  // JOSE DOMINGUEZ (308)
  ...createCards(308, [{ fecha: 17, type: 'AMARILLA' }]),
  // LUIS SOLANO (348)
  ...createCards(348, [{ fecha: 18, type: 'AMARILLA' }]),
  // ALBERTO OSORIO (349)
  ...createCards(349, [{ fecha: 19, type: 'AMARILLA' }]),
  // IVAN ORREGO (325)
  ...createCards(325, [{ fecha: 22, type: 'AMARILLA' }]),
  // ALEJANDRO ESCAMILLA (309)
  ...createCards(309, [{ fecha: 26, type: 'AMARILLA' }]),
];

// Helper function to build goal records per fecha
const createGoalsMap = (playerId: number, teamId: TeamId, fechaGoalsMap: Record<number, number>): GoalRecord[] => {
  const records: GoalRecord[] = [];
  Object.entries(fechaGoalsMap).forEach(([fechaStr, count]) => {
    const fechaNumber = Number(fechaStr);
    if (count > 0) {
      for (let i = 1; i <= count; i++) {
        records.push({
          id: `g_2026_1_${playerId}_f${fechaNumber}_${i}`,
          playerId,
          teamId,
          fecha: fechaNumber,
          fechaNumber,
          count: 1,
        });
      }
    }
  });
  return records;
};

// Top Scorers Goals Records for 2026-1 (Exact matrix match from official table)
export const GOALS_2026_1: GoalRecord[] = [
  ...createGoalsMap(340, 'ROJO', { 3: 2, 5: 1, 6: 3, 7: 1, 8: 1, 10: 3, 11: 1, 12: 1, 17: 1, 19: 1, 20: 2, 21: 1, 23: 1, 24: 2, 26: 1, 27: 1, 31: 1, 34: 1 }), // DIEGO LOPEZ (24)
  ...createGoalsMap(349, 'AMARILLO', { 1: 1, 2: 1, 3: 1, 5: 1, 9: 3, 11: 2, 13: 1, 15: 1, 16: 4, 18: 1, 20: 2, 21: 1, 25: 1, 26: 1, 27: 1, 29: 1 }), // ALBERTO OSORIO (23)
  ...createGoalsMap(323, 'NEGRO', { 1: 2, 6: 1, 10: 2, 11: 2, 12: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 3, 25: 1, 26: 1, 27: 2, 32: 1 }), // MARIO GUERRA (21)
  ...createGoalsMap(319, 'NEGRO', { 1: 1, 8: 1, 9: 1, 11: 1, 13: 1, 14: 1, 15: 1, 18: 1, 20: 3, 21: 1, 22: 2, 23: 1, 25: 1, 26: 1, 27: 1, 28: 2, 33: 1 }), // RIGOBERTO LOZANO (21)
  ...createGoalsMap(354, 'BLANCO', { 6: 1, 8: 2, 10: 1, 11: 2, 12: 1, 18: 2, 19: 1, 20: 1, 26: 1, 27: 1, 28: 1, 31: 2, 32: 3 }), // JORGE LOZANO (19)
  ...createGoalsMap(364, 'RAYADO', { 1: 2, 4: 1, 7: 1, 8: 1, 9: 1, 11: 2, 15: 1, 18: 1, 19: 1, 20: 1, 26: 2, 30: 1, 32: 1, 33: 1, 34: 1 }), // ANDY ACEVEDO (18 + 1 EL)
  ...createGoalsMap(356, 'BLANCO', { 2: 1, 3: 1, 4: 1, 7: 2, 11: 2, 16: 1, 17: 1, 21: 2, 23: 1, 25: 2, 26: 1, 31: 1, 33: 1 }), // JOSE DAVID HOYOS (17)
  ...createGoalsMap(339, 'ROJO', { 1: 1, 2: 1, 5: 2, 6: 1, 7: 1, 19: 1, 20: 1, 21: 1, 23: 2, 24: 1, 25: 1, 34: 1 }), // OSCAR PACHECO (14)
  ...createGoalsMap(358, 'RAYADO', { 1: 1, 4: 1, 11: 1, 12: 1, 15: 1, 16: 1, 18: 1, 22: 1, 30: 1, 31: 2, 34: 1 }), // JOSE FIGUEROA (12)
  ...createGoalsMap(331, 'NARANJA', { 10: 1, 15: 1, 16: 2, 21: 1, 26: 1, 27: 3, 33: 1, 34: 2 }), // DAMIAN MORENO (12)
  ...createGoalsMap(330, 'NARANJA', { 1: 1, 2: 2, 4: 1, 5: 2, 15: 1, 16: 1, 20: 1, 26: 1, 28: 1, 33: 1 }), // JAVIER MELGAREJO (12)
  ...createGoalsMap(313, 'VERDE', { 1: 1, 5: 1, 9: 1, 10: 2, 11: 1, 13: 1, 14: 1, 21: 1, 23: 2, 34: 1 }), // JAVIER FADUL (12)
  ...createGoalsMap(363, 'RAYADO', { 2: 1, 7: 1, 12: 1, 16: 1, 17: 1, 18: 1, 24: 1, 25: 1, 27: 1, 29: 1, 30: 1 }), // JUAN ALVAREZ (11)
  ...createGoalsMap(320, 'NEGRO', { 1: 1, 3: 2, 6: 1, 7: 2, 10: 1, 11: 1, 13: 1, 18: 1, 32: 1 }), // ALBERT MONTERROZA (11)
  ...createGoalsMap(304, 'AZUL', { 4: 2, 9: 1, 12: 2, 18: 1, 24: 1, 26: 1, 29: 1, 33: 2 }), // JHON CUARTAS (11)
  ...createGoalsMap(301, 'AZUL', { 6: 1, 8: 1, 14: 1, 19: 1, 20: 1, 23: 1, 24: 1, 26: 1, 31: 2, 34: 1 }), // LUIS PACHECO (11)
  ...createGoalsMap(341, 'AMARILLO', { 3: 1, 11: 1, 12: 1, 13: 1, 20: 1, 21: 3, 32: 2 }), // YAMIR PINEDA (10)
  ...createGoalsMap(312, 'VERDE', { 2: 1, 6: 1, 12: 1, 16: 1, 17: 1, 22: 1, 23: 1, 32: 1, 34: 2 }), // ALVARO BETIN (10)
  ...createGoalsMap(335, 'ROJO', { 2: 2, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 12: 1, 18: 1 }), // URIEL ZAMBRANO (9)
  ...createGoalsMap(316, 'VERDE', { 10: 1, 11: 1, 13: 3, 15: 1, 18: 1, 19: 1, 29: 1 }), // JOSE HOYOS (9)
  ...createGoalsMap(302, 'AZUL', { 1: 1, 26: 2, 28: 1, 30: 1, 31: 1, 32: 1, 33: 1, 34: 1 }), // PEDRO DE LEON (9)
  ...createGoalsMap(327, 'NARANJA', { 9: 1, 12: 1, 14: 1, 26: 2, 27: 2, 28: 1 }), // NEL MARTINEZ (8)
  ...createGoalsMap(359, 'RAYADO', { 2: 1, 8: 2, 9: 1, 11: 1, 26: 1, 30: 1, 33: 1 }), // JORGE ACEVEDO (8)
  ...createGoalsMap(303, 'AZUL', { 2: 1, 3: 2, 19: 1, 27: 2, 31: 2 }), // MARCOS FIGUEROA (8)
  ...createGoalsMap(326, 'NARANJA', { 11: 1, 24: 1, 25: 1, 27: 1, 28: 2, 31: 1, 32: 1 }), // EDWIN TEJADA (8)
  ...createGoalsMap(353, 'BLANCO', { 5: 1, 7: 1, 8: 2, 9: 1, 18: 1, 21: 1 }), // JUAN MARTINEZ (7)
  ...createGoalsMap(333, 'ROJO', { 7: 1, 15: 1, 16: 1, 17: 1, 18: 1, 27: 1, 28: 1 }), // ROBERTO PERTUZ (7)
  ...createGoalsMap(355, 'BLANCO', { 6: 1, 11: 1, 13: 1, 19: 1, 20: 1, 22: 1, 31: 1 }), // ALBERTO BUSTOS (7)
  ...createGoalsMap(346, 'AMARILLO', { 10: 1, 11: 1, 15: 1, 16: 2, 23: 1 }), // MARIO VELAZCO (6)
  ...createGoalsMap(347, 'AMARILLO', { 13: 2, 14: 1, 17: 1, 22: 1, 27: 1 }), // EVER VILLALBA (6)
  ...createGoalsMap(352, 'BLANCO', { 1: 1, 15: 2, 17: 1, 25: 1, 33: 1 }), // GUSTAVO FERNANDEZ (6)
  ...createGoalsMap(324, 'NEGRO', { 2: 1, 11: 1, 15: 1, 30: 1, 31: 1, 33: 1 }), // MAURICIO DIAZ (6)
  ...createGoalsMap(351, 'BLANCO', { 13: 1, 21: 1, 22: 1, 23: 1, 26: 1 }), // CAMILO PACHECO (5)
  ...createGoalsMap(309, 'AZUL', { 30: 1, 31: 2, 32: 1, 33: 1 }), // ALEJANDRO ESCAMILLA (5)
  ...createGoalsMap(311, 'VERDE', { 2: 1, 19: 1, 23: 1, 24: 1 }), // JORGE ORREGO (4)
  ...createGoalsMap(329, 'NARANJA', { 2: 1, 4: 2, 11: 1 }), // DAIRO MERCADO (4)
  ...createGoalsMap(365, 'NARANJA', { 23: 2, 24: 1, 27: 1 }), // MOISES GOMEZ (4)
  ...createGoalsMap(336, 'ROJO', { 10: 1, 16: 1, 18: 1, 31: 1 }), // ALBEIRO OJEDA (4)
  ...createGoalsMap(366, 'BLANCO', { 31: 2, 34: 2 }), // ANTONIO ORTEGA (4)
  ...createGoalsMap(357, 'RAYADO', { 15: 1, 20: 1, 32: 1 }), // ALBEIRO BUELVAS (3)
  ...createGoalsMap(317, 'VERDE', { 6: 1, 34: 2 }), // ROBERT VILLALBA (3)
  ...createGoalsMap(342, 'AMARILLO', { 8: 2 }), // CARLOS FIGUEROA (2)
  ...createGoalsMap(348, 'AMARILLO', { 21: 1, 24: 1 }), // LUIS SOLANO (2)
  ...createGoalsMap(334, 'ROJO', { 18: 1, 27: 1 }), // ANIBAL ROMERO (2)
  ...createGoalsMap(360, 'RAYADO', { 5: 1, 29: 1 }), // LEONARDO CASTILLO (2)
  ...createGoalsMap(305, 'AZUL', { 11: 1, 31: 1 }), // MANUEL PEÑA (2)
  ...createGoalsMap(318, 'VERDE', { 30: 1, 33: 1 }), // WALTER GOEZ (2)
  ...createGoalsMap(337, 'ROJO', { 26: 1, 34: 1 }), // HUGO MERCADO (2)
  ...createGoalsMap(350, 'BLANCO', { 5: 1 }), // JOSE IVAN SIERRA (1)
  ...createGoalsMap(314, 'VERDE', { 7: 1 }), // NILSON CASTELLANOS (1)
  ...createGoalsMap(343, 'AMARILLO', { 10: 1 }), // FERNANDO HUMANEZ (1)
  ...createGoalsMap(362, 'RAYADO', { 10: 1 }), // HECTOR VERGARA (1)
  ...createGoalsMap(306, 'AZUL', { 13: 1 }), // DONALDO MORALES (1)
  ...createGoalsMap(307, 'AZUL', { 16: 1 }), // DANIEL BORJA (1)
  ...createGoalsMap(325, 'NEGRO', { 26: 1 }), // IVAN ORREGO (1)
  ...createGoalsMap(322, 'NEGRO', { 28: 1 }), // ANUAR OJEDA (1)
  ...createGoalsMap(367, 'BLANCO', { 31: 1 }), // RUSBELL VILLALBA (1)
  ...createGoalsMap(338, 'ROJO', { 32: 1 }), // DOUGLAS COAVAS (1)
];

export const MATCHES_2026_1: Match[] = [
  // FECHA 1
  { id: 'm26_1_1', fecha: 1, fechaNumber: 1, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_1_2', fecha: 1, fechaNumber: 1, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 4, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_1_3', fecha: 1, fechaNumber: 1, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_1_4', fecha: 1, fechaNumber: 1, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 2
  { id: 'm26_2_1', fecha: 2, fechaNumber: 2, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_2_2', fecha: 2, fechaNumber: 2, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 5, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_2_3', fecha: 2, fechaNumber: 2, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_2_4', fecha: 2, fechaNumber: 2, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 3
  { id: 'm26_3_1', fecha: 3, fechaNumber: 3, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_3_2', fecha: 3, fechaNumber: 3, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_3_3', fecha: 3, fechaNumber: 3, homeTeamId: 'ROJO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_3_4', fecha: 3, fechaNumber: 3, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 4
  { id: 'm26_4_1', fecha: 4, fechaNumber: 4, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_4_2', fecha: 4, fechaNumber: 4, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_4_3', fecha: 4, fechaNumber: 4, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_4_4', fecha: 4, fechaNumber: 4, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 5
  { id: 'm26_5_1', fecha: 5, fechaNumber: 5, homeTeamId: 'AZUL', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_5_2', fecha: 5, fechaNumber: 5, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 6, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_5_3', fecha: 5, fechaNumber: 5, homeTeamId: 'NEGRO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 4, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_5_4', fecha: 5, fechaNumber: 5, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 6
  { id: 'm26_6_1', fecha: 6, fechaNumber: 6, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_6_2', fecha: 6, fechaNumber: 6, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_6_3', fecha: 6, fechaNumber: 6, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_6_4', fecha: 6, fechaNumber: 6, homeTeamId: 'NEGRO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 7
  { id: 'm26_7_1', fecha: 7, fechaNumber: 7, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_7_2', fecha: 7, fechaNumber: 7, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_7_3', fecha: 7, fechaNumber: 7, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_7_4', fecha: 7, fechaNumber: 7, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 4, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 8
  { id: 'm26_8_1', fecha: 8, fechaNumber: 8, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_8_2', fecha: 8, fechaNumber: 8, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 4, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_8_3', fecha: 8, fechaNumber: 8, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_8_4', fecha: 8, fechaNumber: 8, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 9
  { id: 'm26_9_1', fecha: 9, fechaNumber: 9, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 5, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_9_2', fecha: 9, fechaNumber: 9, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_9_3', fecha: 9, fechaNumber: 9, homeTeamId: 'NEGRO', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_9_4', fecha: 9, fechaNumber: 9, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 10
  { id: 'm26_10_1', fecha: 10, fechaNumber: 10, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_10_2', fecha: 10, fechaNumber: 10, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_10_3', fecha: 10, fechaNumber: 10, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_10_4', fecha: 10, fechaNumber: 10, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 11
  { id: 'm26_11_1', fecha: 11, fechaNumber: 11, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_11_2', fecha: 11, fechaNumber: 11, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_11_3', fecha: 11, fechaNumber: 11, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 5, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_11_4', fecha: 11, fechaNumber: 11, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 4, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 12
  { id: 'm26_12_1', fecha: 12, fechaNumber: 12, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 2, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_12_2', fecha: 12, fechaNumber: 12, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 1, awayGoals: 4, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_12_3', fecha: 12, fechaNumber: 12, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_12_4', fecha: 12, fechaNumber: 12, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 13
  { id: 'm26_13_1', fecha: 13, fechaNumber: 13, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_13_2', fecha: 13, fechaNumber: 13, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_13_3', fecha: 13, fechaNumber: 13, homeTeamId: 'ROJO', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_13_4', fecha: 13, fechaNumber: 13, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 14
  { id: 'm26_14_1', fecha: 14, fechaNumber: 14, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_14_2', fecha: 14, fechaNumber: 14, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_14_3', fecha: 14, fechaNumber: 14, homeTeamId: 'RAYADO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_14_4', fecha: 14, fechaNumber: 14, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 15
  { id: 'm26_15_1', fecha: 15, fechaNumber: 15, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 3, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_15_2', fecha: 15, fechaNumber: 15, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_15_3', fecha: 15, fechaNumber: 15, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_15_4', fecha: 15, fechaNumber: 15, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 16
  { id: 'm26_16_1', fecha: 16, fechaNumber: 16, homeTeamId: 'NEGRO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 6, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_16_2', fecha: 16, fechaNumber: 16, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_16_3', fecha: 16, fechaNumber: 16, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_16_4', fecha: 16, fechaNumber: 16, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 17
  { id: 'm26_17_1', fecha: 17, fechaNumber: 17, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_17_2', fecha: 17, fechaNumber: 17, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_17_3', fecha: 17, fechaNumber: 17, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_17_4', fecha: 17, fechaNumber: 17, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 18
  { id: 'm26_18_1', fecha: 18, fechaNumber: 18, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_18_2', fecha: 18, fechaNumber: 18, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_18_3', fecha: 18, fechaNumber: 18, homeTeamId: 'NEGRO', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_18_4', fecha: 18, fechaNumber: 18, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 19
  { id: 'm26_19_1', fecha: 19, fechaNumber: 19, homeTeamId: 'NARANJA', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_19_2', fecha: 19, fechaNumber: 19, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_19_3', fecha: 19, fechaNumber: 19, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_19_4', fecha: 19, fechaNumber: 19, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 20
  { id: 'm26_20_1', fecha: 20, fechaNumber: 20, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 4, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_20_2', fecha: 20, fechaNumber: 20, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_20_3', fecha: 20, fechaNumber: 20, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_20_4', fecha: 20, fechaNumber: 20, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 21
  { id: 'm26_21_1', fecha: 21, fechaNumber: 21, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 4, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_21_2', fecha: 21, fechaNumber: 21, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_21_3', fecha: 21, fechaNumber: 21, homeTeamId: 'NARANJA', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_21_4', fecha: 21, fechaNumber: 21, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 3, awayGoals: 5, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 22
  { id: 'm26_22_1', fecha: 22, fechaNumber: 22, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_22_2', fecha: 22, fechaNumber: 22, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_22_3', fecha: 22, fechaNumber: 22, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_22_4', fecha: 22, fechaNumber: 22, homeTeamId: 'AZUL', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 23
  { id: 'm26_23_1', fecha: 23, fechaNumber: 23, homeTeamId: 'AMARILLO', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_23_2', fecha: 23, fechaNumber: 23, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_23_3', fecha: 23, fechaNumber: 23, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 4, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_23_4', fecha: 23, fechaNumber: 23, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 2, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 24
  { id: 'm26_24_1', fecha: 24, fechaNumber: 24, homeTeamId: 'RAYADO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_24_2', fecha: 24, fechaNumber: 24, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_24_3', fecha: 24, fechaNumber: 24, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_24_4', fecha: 24, fechaNumber: 24, homeTeamId: 'AZUL', awayTeamId: 'BLANCO', homeGoals: 2, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 25
  { id: 'm26_25_1', fecha: 25, fechaNumber: 25, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_25_2', fecha: 25, fechaNumber: 25, homeTeamId: 'AZUL', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_25_3', fecha: 25, fechaNumber: 25, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 4, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_25_4', fecha: 25, fechaNumber: 25, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 26
  { id: 'm26_26_1', fecha: 26, fechaNumber: 26, homeTeamId: 'RAYADO', awayTeamId: 'BLANCO', homeGoals: 3, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_26_2', fecha: 26, fechaNumber: 26, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_26_3', fecha: 26, fechaNumber: 26, homeTeamId: 'AZUL', awayTeamId: 'AMARILLO', homeGoals: 4, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_26_4', fecha: 26, fechaNumber: 26, homeTeamId: 'NARANJA', awayTeamId: 'ROJO', homeGoals: 3, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 27
  { id: 'm26_27_1', fecha: 27, fechaNumber: 27, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_27_2', fecha: 27, fechaNumber: 27, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 6, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_27_3', fecha: 27, fechaNumber: 27, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_27_4', fecha: 27, fechaNumber: 27, homeTeamId: 'VERDE', awayTeamId: 'BLANCO', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 28
  { id: 'm26_28_1', fecha: 28, fechaNumber: 28, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 5, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_28_2', fecha: 28, fechaNumber: 28, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_28_3', fecha: 28, fechaNumber: 28, homeTeamId: 'NARANJA', awayTeamId: 'BLANCO', homeGoals: 5, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_28_4', fecha: 28, fechaNumber: 28, homeTeamId: 'RAYADO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 29
  { id: 'm26_29_1', fecha: 29, fechaNumber: 29, homeTeamId: 'AZUL', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_29_2', fecha: 29, fechaNumber: 29, homeTeamId: 'ROJO', awayTeamId: 'NEGRO', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_29_3', fecha: 29, fechaNumber: 29, homeTeamId: 'VERDE', awayTeamId: 'AMARILLO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_29_4', fecha: 29, fechaNumber: 29, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 30
  { id: 'm26_30_1', fecha: 30, fechaNumber: 30, homeTeamId: 'RAYADO', awayTeamId: 'NEGRO', homeGoals: 5, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_30_2', fecha: 30, fechaNumber: 30, homeTeamId: 'AMARILLO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_30_3', fecha: 30, fechaNumber: 30, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_30_4', fecha: 30, fechaNumber: 30, homeTeamId: 'VERDE', awayTeamId: 'AZUL', homeGoals: 1, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 31
  { id: 'm26_31_1', fecha: 31, fechaNumber: 31, homeTeamId: 'AMARILLO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 8, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_31_2', fecha: 31, fechaNumber: 31, homeTeamId: 'BLANCO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_31_3', fecha: 31, fechaNumber: 31, homeTeamId: 'VERDE', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_31_4', fecha: 31, fechaNumber: 31, homeTeamId: 'ROJO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 32
  { id: 'm26_32_1', fecha: 32, fechaNumber: 32, homeTeamId: 'NARANJA', awayTeamId: 'NEGRO', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_32_2', fecha: 32, fechaNumber: 32, homeTeamId: 'VERDE', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_32_3', fecha: 32, fechaNumber: 32, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 2, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_32_4', fecha: 32, fechaNumber: 32, homeTeamId: 'BLANCO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 33
  { id: 'm26_33_1', fecha: 33, fechaNumber: 33, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 2, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_33_2', fecha: 33, fechaNumber: 33, homeTeamId: 'NARANJA', awayTeamId: 'RAYADO', homeGoals: 3, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_33_3', fecha: 33, fechaNumber: 33, homeTeamId: 'ROJO', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_33_4', fecha: 33, fechaNumber: 33, homeTeamId: 'AZUL', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 34
  { id: 'm26_34_1', fecha: 34, fechaNumber: 34, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_34_2', fecha: 34, fechaNumber: 34, homeTeamId: 'BLANCO', awayTeamId: 'AZUL', homeGoals: 4, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_34_3', fecha: 34, fechaNumber: 34, homeTeamId: 'VERDE', awayTeamId: 'NEGRO', homeGoals: 3, awayGoals: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_34_4', fecha: 34, fechaNumber: 34, homeTeamId: 'ROJO', awayTeamId: 'NARANJA', homeGoals: 3, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 35 (Jornada 7 de la Vuelta 5 - No jugada)
  { id: 'm26_35_1', fecha: 35, fechaNumber: 35, homeTeamId: 'ROJO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, isPlayed: false, played: false, status: 'PROGRAMADO' },
  { id: 'm26_35_2', fecha: 35, fechaNumber: 35, homeTeamId: 'VERDE', awayTeamId: 'RAYADO', homeGoals: 0, awayGoals: 0, isPlayed: false, played: false, status: 'PROGRAMADO' },
  { id: 'm26_35_3', fecha: 35, fechaNumber: 35, homeTeamId: 'BLANCO', awayTeamId: 'NARANJA', homeGoals: 0, awayGoals: 0, isPlayed: false, played: false, status: 'PROGRAMADO' },
  { id: 'm26_35_4', fecha: 35, fechaNumber: 35, homeTeamId: 'AMARILLO', awayTeamId: 'NEGRO', homeGoals: 0, awayGoals: 0, isPlayed: false, played: false, status: 'PROGRAMADO' },

  // FECHA 36 - ELIMINATORIAS (F36)
  { id: 'm26_36_1', fecha: 36, fechaNumber: 36, homeTeamId: 'RAYADO', awayTeamId: 'AZUL', homeGoals: 0, awayGoals: 0, homePenalties: 2, awayPenalties: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_36_2', fecha: 36, fechaNumber: 36, homeTeamId: 'BLANCO', awayTeamId: 'VERDE', homeGoals: 0, awayGoals: 3, homePenalties: 2, awayPenalties: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_36_3', fecha: 36, fechaNumber: 36, homeTeamId: 'NARANJA', awayTeamId: 'AMARILLO', homeGoals: 0, awayGoals: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 37 - SEMIFINAL (F37)
  { id: 'm26_37_1', fecha: 37, fechaNumber: 37, homeTeamId: 'BLANCO', awayTeamId: 'ROJO', homeGoals: 1, awayGoals: 0, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_37_2', fecha: 37, fechaNumber: 37, homeTeamId: 'AMARILLO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 2, homePenalties: 2, awayPenalties: 2, isPlayed: true, played: true, status: 'FINALIZADO' },

  // FECHA 38 - TERCER PUESTO Y FINAL (F38)
  { id: 'm26_38_1', fecha: 38, fechaNumber: 38, homeTeamId: 'AMARILLO', awayTeamId: 'ROJO', homeGoals: 2, awayGoals: 3, isPlayed: true, played: true, status: 'FINALIZADO' },
  { id: 'm26_38_2', fecha: 38, fechaNumber: 38, homeTeamId: 'BLANCO', awayTeamId: 'RAYADO', homeGoals: 1, awayGoals: 1, homePenalties: 3, awayPenalties: 1, isPlayed: true, played: true, status: 'FINALIZADO' },
];
