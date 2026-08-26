import { Match, Team, TeamId, TeamStandings } from '../types';

// Standard 8 teams round-robin fixture template (7 rounds) matching official tournament calendar
// 1: BLANCO, 2: ROJO, 3: NARANJA, 4: AZUL, 5: VERDE, 6: AMARILLO, 7: NEGRO, 8: RAYADO
const ROUND_ROBIN_7: [TeamId, TeamId][][] = [
  // 1. FECHA (1 Vs 3, 7 Vs 8, 4 Vs 6, 2 Vs 5)
  [['BLANCO', 'NARANJA'], ['NEGRO', 'RAYADO'], ['AZUL', 'AMARILLO'], ['ROJO', 'VERDE']],
  // 2. FECHA (6 Vs 7, 1 Vs 2, 5 Vs 8, 4 Vs 3)
  [['AMARILLO', 'NEGRO'], ['BLANCO', 'ROJO'], ['VERDE', 'RAYADO'], ['AZUL', 'NARANJA']],
  // 3. FECHA (3 Vs 5, 4 Vs 8, 1 Vs 6, 2 Vs 7)
  [['NARANJA', 'VERDE'], ['AZUL', 'RAYADO'], ['BLANCO', 'AMARILLO'], ['ROJO', 'NEGRO']],
  // 4. FECHA (1 Vs 4, 2 Vs 3, 7 Vs 5, 6 Vs 8)
  [['BLANCO', 'AZUL'], ['ROJO', 'NARANJA'], ['NEGRO', 'VERDE'], ['AMARILLO', 'RAYADO']],
  // 5. FECHA (3 Vs 7, 1 Vs 8, 2 Vs 6, 4 Vs 5)
  [['NARANJA', 'NEGRO'], ['BLANCO', 'RAYADO'], ['ROJO', 'AMARILLO'], ['AZUL', 'VERDE']],
  // 6. FECHA (5 Vs 6, 2 Vs 4, 3 Vs 8, 1 Vs 7)
  [['VERDE', 'AMARILLO'], ['ROJO', 'AZUL'], ['NARANJA', 'RAYADO'], ['BLANCO', 'NEGRO']],
  // 7. FECHA (2 Vs 8, 1 Vs 5, 4 Vs 7, 3 Vs 6)
  [['ROJO', 'RAYADO'], ['BLANCO', 'VERDE'], ['AZUL', 'NEGRO'], ['NARANJA', 'AMARILLO']],
];

export function generateAllTournamentMatches(initialMatches: Match[], teams?: Team[], standings?: TeamStandings[]): Match[] {
  const allMatches: Match[] = [...initialMatches];

  // Helper to check if match already exists for a fecha
  const hasMatchForFecha = (fecha: number) => allMatches.some((m) => m.fecha === fecha);

  // Generate regular season matches for Fechas 1 to 35
  for (let f = 1; f <= 35; f++) {
    if (!hasMatchForFecha(f)) {
      const roundIdx = (f - 1) % 7;
      const roundPairs = ROUND_ROBIN_7[roundIdx];

      roundPairs.forEach((pair, idx) => {
        allMatches.push({
          id: `m${f}-${idx + 1}`,
          fecha: f,
          homeTeamId: pair[0],
          awayTeamId: pair[1],
          homeGoals: 0,
          awayGoals: 0,
          isPlayed: false,
        });
      });
    }
  }

  // Generate Fecha 36: FASE ELIMINATORIA (3 partidos: 2° vs 7°, 3° vs 6°, 4° vs 5°)
  if (!hasMatchForFecha(36)) {
    let t2: TeamId = 'AZUL';
    let t7: TeamId = 'RAYADO';
    let t3: TeamId = 'AMARILLO';
    let t6: TeamId = 'ROJO';
    let t4: TeamId = 'VERDE';
    let t5: TeamId = 'NEGRO';

    if (standings && standings.length >= 7) {
      t2 = standings[1]?.teamId || 'AZUL';
      t7 = standings[6]?.teamId || 'RAYADO';
      t3 = standings[2]?.teamId || 'AMARILLO';
      t6 = standings[5]?.teamId || 'ROJO';
      t4 = standings[3]?.teamId || 'VERDE';
      t5 = standings[4]?.teamId || 'NEGRO';
    }

    allMatches.push(
      {
        id: 'm36-1',
        fecha: 36,
        homeTeamId: t2,
        awayTeamId: t7,
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      },
      {
        id: 'm36-2',
        fecha: 36,
        homeTeamId: t3,
        awayTeamId: t6,
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      },
      {
        id: 'm36-3',
        fecha: 36,
        homeTeamId: t4,
        awayTeamId: t5,
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      }
    );
  }

  // Generate Fecha 37: SEMIFINAL (2 partidos)
  if (!hasMatchForFecha(37)) {
    let t1: TeamId = 'ROJO';
    let t45: TeamId = 'VERDE';
    let t27: TeamId = 'AZUL';
    let t36: TeamId = 'AMARILLO';

    if (standings && standings.length >= 8) {
      t1 = standings[0]?.teamId || 'ROJO';
    }

    allMatches.push(
      {
        id: 'm37-1',
        fecha: 37,
        homeTeamId: t1,
        awayTeamId: t45,
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      },
      {
        id: 'm37-2',
        fecha: 37,
        homeTeamId: t27,
        awayTeamId: t36,
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      }
    );
  }

  // Generate Fecha 38: GRAN FINAL Y TERCER PUESTO (2 partidos)
  const fecha38Matches = allMatches.filter((m) => m.fecha === 38);
  if (fecha38Matches.length === 0) {
    allMatches.push(
      {
        id: 'm38-1',
        fecha: 38,
        homeTeamId: 'AMARILLO',
        awayTeamId: 'VERDE',
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      },
      {
        id: 'm38-2',
        fecha: 38,
        homeTeamId: 'ROJO',
        awayTeamId: 'AZUL',
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      }
    );
  } else if (fecha38Matches.length === 1) {
    // If only 1 match existed for Fecha 38, ensure we have both Partido por el 3er Puesto and Gran Final
    const firstMatch = fecha38Matches[0];
    if (firstMatch.homeTeamId === 'ROJO' && firstMatch.awayTeamId === 'AZUL') {
      // Re-organize so m38-1 is 3er Puesto and m38-2 is Gran Final
      firstMatch.homeTeamId = 'AMARILLO';
      firstMatch.awayTeamId = 'VERDE';
      allMatches.push({
        id: 'm38-2',
        fecha: 38,
        homeTeamId: 'ROJO',
        awayTeamId: 'AZUL',
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      });
    } else {
      allMatches.push({
        id: 'm38-2',
        fecha: 38,
        homeTeamId: 'AMARILLO',
        awayTeamId: 'VERDE',
        homeGoals: 0,
        awayGoals: 0,
        isPlayed: false,
      });
    }
  }

  return allMatches;
}
