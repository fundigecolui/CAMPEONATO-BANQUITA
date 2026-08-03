import { Match, Team, TeamId, TeamStandings } from '../types';

// Standard 8 teams round-robin fixture template (7 rounds)
const ROUND_ROBIN_7: [TeamId, TeamId][][] = [
  // Round 1
  [['AZUL', 'AMARILLO'], ['NARANJA', 'NEGRO'], ['BLANCO', 'ROJO'], ['RAYADO', 'VERDE']],
  // Round 2
  [['AMARILLO', 'NARANJA'], ['NEGRO', 'BLANCO'], ['ROJO', 'RAYADO'], ['VERDE', 'AZUL']],
  // Round 3
  [['AZUL', 'NEGRO'], ['AMARILLO', 'ROJO'], ['NARANJA', 'VERDE'], ['BLANCO', 'RAYADO']],
  // Round 4
  [['VERDE', 'AMARILLO'], ['ROJO', 'AZUL'], ['NEGRO', 'RAYADO'], ['NARANJA', 'BLANCO']],
  // Round 5
  [['AZUL', 'RAYADO'], ['AMARILLO', 'BLANCO'], ['ROJO', 'NARANJA'], ['VERDE', 'NEGRO']],
  // Round 6
  [['BLANCO', 'AZUL'], ['RAYADO', 'AMARILLO'], ['NARANJA', 'ROJO'], ['NEGRO', 'VERDE']],
  // Round 7
  [['AZUL', 'NARANJA'], ['AMARILLO', 'NEGRO'], ['BLANCO', 'VERDE'], ['RAYADO', 'ROJO']],
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
