import { Match, Player, Team, CardRecord, GoalRecord, CardType, TeamId } from '../types';
import { computeStandings, computePlayerStats } from './sanctionsEngine';
import { FECHA_DATES } from './fechas';

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export interface SheetMetadata {
  spreadsheetId: string;
  title: string;
  spreadsheetUrl: string;
  sheetTitles: string[];
}

export interface SheetSyncPreview {
  spreadsheetTitle: string;
  sheetTitles: string[];
  matches: Match[];
  goals: GoalRecord[];
  cards: CardRecord[];
  playedCount: number;
  changedMatchesCount: number;
  warnings: string[];
}

/**
 * Extracts a Google Spreadsheet ID from either a full URL or a raw ID
 */
export function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  return trimmed;
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase();
}

function resolvePlayerByIdOrName(
  players: Player[],
  rawId: string | undefined,
  rawName: string | undefined,
  rawTeam?: string | undefined
): Player | undefined {
  if (rawId && /^\d+$/.test(rawId.trim())) {
    const idNum = parseInt(rawId.trim(), 10);
    const byId = players.find((p) => p.id === idNum);
    if (byId) return byId;
  }

  if (rawName && rawName.trim()) {
    const normName = normalizeText(rawName);
    const normTeam = rawTeam ? normalizeText(rawTeam) : '';

    // Exact match with optional team filter
    const candidates = players.filter((p) => normalizeText(p.name) === normName);
    if (candidates.length === 1) return candidates[0];
    if (candidates.length > 1 && normTeam) {
      const teamMatch = candidates.find((p) => normalizeText(p.teamId) === normTeam);
      if (teamMatch) return teamMatch;
    }

    // Partial match (e.g. first + last name or partial)
    const partial = players.filter(
      (p) =>
        normalizeText(p.name).includes(normName) &&
        (!normTeam || normalizeText(p.teamId) === normTeam)
    );
    if (partial.length === 1) return partial[0];
  }

  return undefined;
}

function formatAbsentNames(playerIds: number[] | undefined, teamId: TeamId, players: Player[]): string {
  if (!playerIds) return '';
  const teamPlayers = players.filter((p) => p.teamId === teamId);
  const absent = teamPlayers.filter((p) => !playerIds.includes(p.id));
  return absent.map((p) => p.name).join(', ');
}

function parseAbsentPlayerIds(
  rawText: string | undefined,
  teamId: TeamId,
  players: Player[],
  warnings: string[],
  contextLabel: string
): number[] | undefined {
  if (!rawText || !rawText.trim()) return undefined;
  const teamPlayers = players.filter((p) => p.teamId === teamId);
  const tokens = rawText
    .split(/[,;|]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) return undefined;

  const absentIds = new Set<number>();
  tokens.forEach((tok) => {
    const resolved = resolvePlayerByIdOrName(teamPlayers, tok, tok, teamId);
    if (resolved) {
      absentIds.add(resolved.id);
    } else {
      warnings.push(`${contextLabel}: No se reconoció al jugador ausente "${tok}" (${teamId}).`);
    }
  });

  if (absentIds.size === 0) return undefined;
  return teamPlayers.filter((p) => !absentIds.has(p.id)).map((p) => p.id);
}

/**
 * Builds the tabular data arrays for all 6 tabs of the Tournament Spreadsheet
 */
export function buildTournamentSheetPayloads(
  editionName: string,
  teams: Team[],
  players: Player[],
  matches: Match[],
  cards: CardRecord[],
  goals: GoalRecord[],
  currentFecha: number
) {
  const standings = computeStandings(teams, matches, cards, players);
  const { stats } = computePlayerStats(players, cards, goals, currentFecha);

  // 1. Partidos
  const partidosHeader = [
    'ID',
    'Fecha',
    'Fecha_Texto',
    'Local',
    'Goles_Local',
    'Visitante',
    'Goles_Visitante',
    'Jugado (SI/NO)',
    'Estado',
    'Ausentes_Local (Nombres separados por coma)',
    'Ausentes_Visitante (Nombres separados por coma)',
  ];
  const partidosRows = matches.map((m) => [
    m.id,
    m.fecha,
    m.dateStr || FECHA_DATES[m.fecha] || `Fecha ${m.fecha}`,
    m.homeTeamId,
    m.homeGoals ?? 0,
    m.awayTeamId,
    m.awayGoals ?? 0,
    m.isPlayed ? 'SI' : 'NO',
    m.status || (m.isPlayed ? 'FINALIZADO' : 'PROGRAMADO'),
    formatAbsentNames(m.attendance?.homePlayerIds, m.homeTeamId, players),
    formatAbsentNames(m.attendance?.awayPlayerIds, m.awayTeamId, players),
  ]);

  // 2. Goles (grouped by player + fecha + team for easy manual editing)
  const golesHeader = ['ID', 'Fecha', 'Equipo', 'Jugador_ID', 'Jugador', 'Cantidad'];
  const goalGroups = new Map<string, { id: string; fecha: number; teamId: TeamId; playerId: number; name: string; count: number }>();
  goals.forEach((g) => {
    const key = `${g.fecha}__${g.teamId}__${g.playerId}`;
    const existing = goalGroups.get(key);
    if (existing) {
      existing.count += g.count || 1;
    } else {
      const p = players.find((pl) => pl.id === g.playerId);
      goalGroups.set(key, {
        id: g.id,
        fecha: g.fecha,
        teamId: g.teamId,
        playerId: g.playerId,
        name: p?.name || `Jugador ${g.playerId}`,
        count: g.count || 1,
      });
    }
  });
  const golesRows = Array.from(goalGroups.values())
    .sort((a, b) => a.fecha - b.fecha || a.teamId.localeCompare(b.teamId))
    .map((g) => [g.id, g.fecha, g.teamId, g.playerId, g.name, g.count]);

  // 3. Tarjetas
  const tarjetasHeader = ['ID', 'Fecha', 'Equipo', 'Jugador_ID', 'Jugador', 'Tipo (AMARILLA/AZUL/ROJA)'];
  const tarjetasRows = [...cards]
    .sort((a, b) => a.fecha - b.fecha)
    .map((c) => {
      const p = players.find((pl) => pl.id === c.playerId);
      return [
        c.id,
        c.fecha,
        p?.teamId || '',
        c.playerId,
        p?.name || `Jugador ${c.playerId}`,
        c.type,
      ];
    });

  // 4. Posiciones (read-only summary view)
  const posicionesHeader = ['Pos', 'Equipo', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DG', 'PTS', 'Juego_Limpio'];
  const posicionesRows = standings.map((s, idx) => [
    idx + 1,
    s.teamName,
    s.pj,
    s.pg,
    s.pe,
    s.pp,
    s.gf,
    s.gc,
    s.dg,
    s.pts,
    s.fairPlayPts,
  ]);

  // 5. Goleadores (summary view)
  const goleadoresHeader = ['Pos', 'Jugador', 'Equipo', 'Goles'];
  const goleadoresRows = [...stats]
    .filter((s) => s.goles > 0)
    .sort((a, b) => b.goles - a.goles || a.name.localeCompare(b.name))
    .map((s, idx) => [idx + 1, s.name, s.teamId, s.goles]);

  // 6. Jugadores (reference roster + card totals)
  const jugadoresHeader = ['Jugador_ID', 'Dorsal', 'Nombre', 'Equipo', 'Capitan', 'Amarillas', 'Azules', 'Rojas', 'Total_Tarjetas', 'Goles'];
  const jugadoresRows = players.map((p) => {
    const st = stats.find((s) => s.playerId === p.id);
    return [
      p.id,
      p.dorsal,
      p.name,
      p.teamId,
      p.isCaptain ? 'SI' : 'NO',
      st?.amarillas ?? 0,
      st?.azules ?? 0,
      st?.rojas ?? 0,
      st?.totalCards ?? 0,
      st?.goles ?? 0,
    ];
  });

  return {
    title: `Banquitas San Simón - ${editionName}`,
    tabs: [
      { title: 'Partidos', rows: [partidosHeader, ...partidosRows] },
      { title: 'Goles', rows: [golesHeader, ...golesRows] },
      { title: 'Tarjetas', rows: [tarjetasHeader, ...tarjetasRows] },
      { title: 'Posiciones', rows: [posicionesHeader, ...posicionesRows] },
      { title: 'Goleadores', rows: [goleadoresHeader, ...goleadoresRows] },
      { title: 'Jugadores', rows: [jugadoresHeader, ...jugadoresRows] },
    ],
  };
}

async function googleFetch(url: string, accessToken: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || `Error HTTP ${res.status} al comunicarse con Google Sheets.`;
    const err = new Error(msg) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return data;
}

/**
 * Fetches spreadsheet metadata (title and actual sheet tab names)
 */
export async function fetchSpreadsheetMetadata(
  spreadsheetId: string,
  accessToken: string
): Promise<SheetMetadata> {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const data = await googleFetch(
    `${SHEETS_API_BASE}/${encodeURIComponent(cleanId)}?fields=spreadsheetId,spreadsheetUrl,properties.title,sheets.properties.title`,
    accessToken
  );

  return {
    spreadsheetId: data.spreadsheetId || cleanId,
    title: data.properties?.title || 'Google Sheet',
    spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${cleanId}/edit`,
    sheetTitles: (data.sheets || []).map((s: any) => s.properties?.title).filter(Boolean),
  };
}

/**
 * Creates a brand-new Google Sheet pre-populated with all tournament data and formatted headers
 */
export async function createTournamentSheet(
  accessToken: string,
  editionName: string,
  teams: Team[],
  players: Player[],
  matches: Match[],
  cards: CardRecord[],
  goals: GoalRecord[],
  currentFecha: number
): Promise<SheetMetadata> {
  const payload = buildTournamentSheetPayloads(editionName, teams, players, matches, cards, goals, currentFecha);

  // Step 1: Create spreadsheet with the 6 named sheets
  const created = await googleFetch(SHEETS_API_BASE, accessToken, {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        title: payload.title,
        locale: 'es_CO',
      },
      sheets: payload.tabs.map((tab, idx) => ({
        properties: {
          sheetId: idx + 1,
          title: tab.title,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
      })),
    }),
  });

  const spreadsheetId = created.spreadsheetId;
  const spreadsheetUrl = created.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Step 2: Populate values in batchUpdate
  await googleFetch(`${SHEETS_API_BASE}/${spreadsheetId}/values:batchUpdate`, accessToken, {
    method: 'POST',
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: payload.tabs.map((tab) => ({
        range: `'${tab.title}'!A1`,
        values: tab.rows,
      })),
    }),
  });

  // Step 3: Style header rows (dark slate background, bold amber/white text, auto-resize columns)
  const formatRequests = payload.tabs.flatMap((_, idx) => [
    {
      repeatCell: {
        range: {
          sheetId: idx + 1,
          startRowIndex: 0,
          endRowIndex: 1,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.06, green: 0.09, blue: 0.16 },
            textFormat: {
              foregroundColor: { red: 0.98, green: 0.75, blue: 0.14 },
              bold: true,
              fontSize: 10,
            },
            horizontalAlignment: 'CENTER',
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
      },
    },
    {
      autoResizeDimensions: {
        dimensions: {
          sheetId: idx + 1,
          dimension: 'COLUMNS',
          startIndex: 0,
          endIndex: 12,
        },
      },
    },
  ]);

  await googleFetch(`${SHEETS_API_BASE}/${spreadsheetId}:batchUpdate`, accessToken, {
    method: 'POST',
    body: JSON.stringify({ requests: formatRequests }),
  });

  return {
    spreadsheetId,
    title: payload.title,
    spreadsheetUrl,
    sheetTitles: payload.tabs.map((t) => t.title),
  };
}

/**
 * Overwrites existing tabs in a connected Google Sheet with current app data
 */
export async function pushDataToSheet(
  spreadsheetId: string,
  accessToken: string,
  editionName: string,
  teams: Team[],
  players: Player[],
  matches: Match[],
  cards: CardRecord[],
  goals: GoalRecord[],
  currentFecha: number
): Promise<SheetMetadata> {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const meta = await fetchSpreadsheetMetadata(cleanId, accessToken);
  const payload = buildTournamentSheetPayloads(editionName, teams, players, matches, cards, goals, currentFecha);

  // Ensure any missing tabs are created first
  const missingTabs = payload.tabs.filter((t) => !meta.sheetTitles.includes(t.title));
  if (missingTabs.length > 0) {
    await googleFetch(`${SHEETS_API_BASE}/${cleanId}:batchUpdate`, accessToken, {
      method: 'POST',
      body: JSON.stringify({
        requests: missingTabs.map((t) => ({
          addSheet: {
            properties: {
              title: t.title,
              gridProperties: { frozenRowCount: 1 },
            },
          },
        })),
      }),
    });
  }

  // Clear existing ranges first so deleted rows don't linger
  await googleFetch(`${SHEETS_API_BASE}/${cleanId}/values:batchClear`, accessToken, {
    method: 'POST',
    body: JSON.stringify({
      ranges: payload.tabs.map((t) => `'${t.title}'!A1:Z1000`),
    }),
  });

  // Write fresh rows
  await googleFetch(`${SHEETS_API_BASE}/${cleanId}/values:batchUpdate`, accessToken, {
    method: 'POST',
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: payload.tabs.map((tab) => ({
        range: `'${tab.title}'!A1`,
        values: tab.rows,
      })),
    }),
  });

  return fetchSpreadsheetMetadata(cleanId, accessToken);
}

/**
 * Reads Partidos, Goles, and Tarjetas tabs from a Google Sheet and parses them into App state
 */
export async function readAndPreviewFromSheet(
  spreadsheetId: string,
  accessToken: string,
  existingMatches: Match[],
  players: Player[],
  existingGoals: GoalRecord[],
  existingCards: CardRecord[]
): Promise<SheetSyncPreview> {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const meta = await fetchSpreadsheetMetadata(cleanId, accessToken);

  const findTab = (target: string, fallbackIdx: number): string | undefined => {
    const exact = meta.sheetTitles.find((t) => normalizeText(t) === normalizeText(target));
    if (exact) return exact;
    return meta.sheetTitles[fallbackIdx];
  };

  const partidosTab = findTab('Partidos', 0);
  const golesTab = findTab('Goles', 1);
  const tarjetasTab = findTab('Tarjetas', 2);

  if (!partidosTab) {
    throw new Error('No se encontró la pestaña "Partidos" en la hoja de cálculo.');
  }

  const rangesToFetch = [partidosTab, golesTab, tarjetasTab]
    .filter((t): t is string => Boolean(t))
    .map((t) => encodeURIComponent(`'${t}'!A1:K1000`));

  const query = rangesToFetch.map((r) => `ranges=${r}`).join('&');
  const batchRes = await googleFetch(
    `${SHEETS_API_BASE}/${cleanId}/values:batchGet?${query}`,
    accessToken
  );

  const valueRanges: Array<{ range: string; values?: string[][] }> = batchRes.valueRanges || [];
  const getRows = (tabName?: string): string[][] => {
    if (!tabName) return [];
    const found = valueRanges.find((vr) =>
      normalizeText(vr.range).includes(normalizeText(tabName))
    );
    return found?.values || [];
  };

  const warnings: string[] = [];
  const partidosRows = getRows(partidosTab);
  const golesRows = getRows(golesTab);
  const tarjetasRows = getRows(tarjetasTab);

  // 1. Parse Partidos
  const matchMap = new Map<string, Match>();
  existingMatches.forEach((m) => matchMap.set(m.id, { ...m }));

  let changedMatchesCount = 0;

  partidosRows.slice(1).forEach((row, idx) => {
    if (!row || row.length < 7) return;
    const rawId = (row[0] || '').trim();
    const rawFecha = parseInt(row[1] || '0', 10);
    const dateStr = (row[2] || '').trim();
    const homeTeam = normalizeText(row[3] || '') as TeamId;
    const homeGoals = parseInt(row[4] || '0', 10);
    const awayTeam = normalizeText(row[5] || '') as TeamId;
    const awayGoals = parseInt(row[6] || '0', 10);
    const jugadoRaw = normalizeText(row[7] || '');
    const estadoRaw = normalizeText(row[8] || '');
    const ausentesLocal = row[9];
    const ausentesVisitante = row[10];

    if (!rawId && (!rawFecha || !homeTeam || !awayTeam)) return;

    const existing =
      (rawId ? matchMap.get(rawId) : undefined) ||
      Array.from(matchMap.values()).find(
        (m) => m.fecha === rawFecha && m.homeTeamId === homeTeam && m.awayTeamId === awayTeam
      );

    if (!existing) {
      warnings.push(`Partidos fila ${idx + 2}: No se encontró partido "${rawId || `${homeTeam} vs ${awayTeam} F${rawFecha}`}".`);
      return;
    }

    const safeHomeGoals = Number.isNaN(homeGoals) ? 0 : Math.max(0, homeGoals);
    const safeAwayGoals = Number.isNaN(awayGoals) ? 0 : Math.max(0, awayGoals);
    const isPlayed =
      jugadoRaw === 'SI' ||
      jugadoRaw === 'TRUE' ||
      jugadoRaw === '1' ||
      estadoRaw === 'FINALIZADO' ||
      safeHomeGoals > 0 ||
      safeAwayGoals > 0;

    const status: Match['status'] =
      estadoRaw === 'FINALIZADO' || isPlayed
        ? 'FINALIZADO'
        : estadoRaw === 'EN_VIVO'
        ? 'EN_VIVO'
        : 'PROGRAMADO';

    const homePlayerIds = parseAbsentPlayerIds(
      ausentesLocal,
      existing.homeTeamId,
      players,
      warnings,
      `Partido ${existing.id}`
    );
    const awayPlayerIds = parseAbsentPlayerIds(
      ausentesVisitante,
      existing.awayTeamId,
      players,
      warnings,
      `Partido ${existing.id}`
    );

    const nextMatch: Match = {
      ...existing,
      homeGoals: safeHomeGoals,
      awayGoals: safeAwayGoals,
      isPlayed,
      status,
      dateStr: dateStr || existing.dateStr,
      attendance:
        homePlayerIds || awayPlayerIds
          ? {
              homePlayerIds:
                homePlayerIds ??
                existing.attendance?.homePlayerIds ??
                players.filter((p) => p.teamId === existing.homeTeamId).map((p) => p.id),
              awayPlayerIds:
                awayPlayerIds ??
                existing.attendance?.awayPlayerIds ??
                players.filter((p) => p.teamId === existing.awayTeamId).map((p) => p.id),
            }
          : existing.attendance,
    };

    if (
      existing.homeGoals !== nextMatch.homeGoals ||
      existing.awayGoals !== nextMatch.awayGoals ||
      Boolean(existing.isPlayed) !== Boolean(nextMatch.isPlayed) ||
      existing.status !== nextMatch.status ||
      JSON.stringify(existing.attendance) !== JSON.stringify(nextMatch.attendance)
    ) {
      changedMatchesCount++;
    }

    matchMap.set(existing.id, nextMatch);
  });

  const parsedMatches = Array.from(matchMap.values());

  // 2. Parse Goles
  let parsedGoals: GoalRecord[] = existingGoals;
  if (golesTab && golesRows.length > 0) {
    const nextGoals: GoalRecord[] = [];
    golesRows.slice(1).forEach((row, idx) => {
      if (!row || row.every((cell) => !cell || !cell.trim())) return;
      const rawId = (row[0] || '').trim();
      const fecha = parseInt(row[1] || '0', 10);
      const teamRaw = normalizeText(row[2] || '') as TeamId;
      const rawPlayerId = row[3];
      const rawPlayerName = row[4];
      const count = Math.max(1, parseInt(row[5] || '1', 10) || 1);

      if (!fecha) {
        warnings.push(`Goles fila ${idx + 2}: Fecha inválida.`);
        return;
      }

      const player = resolvePlayerByIdOrName(players, rawPlayerId, rawPlayerName, teamRaw);
      if (!player) {
        warnings.push(`Goles fila ${idx + 2}: No se encontró el jugador "${rawPlayerName || rawPlayerId}".`);
        return;
      }

      for (let k = 0; k < count; k++) {
        nextGoals.push({
          id: rawId && count === 1 ? rawId : `gs_${fecha}_${player.id}_${idx}_${k}`,
          playerId: player.id,
          fecha,
          teamId: player.teamId,
          createdAt: new Date().toISOString(),
        });
      }
    });
    parsedGoals = nextGoals;
  }

  // 3. Parse Tarjetas
  let parsedCards: CardRecord[] = existingCards;
  if (tarjetasTab && tarjetasRows.length > 0) {
    const nextCards: CardRecord[] = [];
    tarjetasRows.slice(1).forEach((row, idx) => {
      if (!row || row.every((cell) => !cell || !cell.trim())) return;
      const rawId = (row[0] || '').trim();
      const fecha = parseInt(row[1] || '0', 10);
      const teamRaw = normalizeText(row[2] || '') as TeamId;
      const rawPlayerId = row[3];
      const rawPlayerName = row[4];
      const typeRaw = normalizeText(row[5] || '');

      if (!fecha) {
        warnings.push(`Tarjetas fila ${idx + 2}: Fecha inválida.`);
        return;
      }

      const player = resolvePlayerByIdOrName(players, rawPlayerId, rawPlayerName, teamRaw);
      if (!player) {
        warnings.push(`Tarjetas fila ${idx + 2}: No se encontró el jugador "${rawPlayerName || rawPlayerId}".`);
        return;
      }

      let cardType: CardType | null = null;
      if (typeRaw === 'AMARILLA' || typeRaw === 'A') cardType = 'AMARILLA';
      else if (typeRaw === 'AZUL' || typeRaw === 'AZ') cardType = 'AZUL';
      else if (typeRaw === 'ROJA' || typeRaw === 'R') cardType = 'ROJA';

      if (!cardType) {
        warnings.push(`Tarjetas fila ${idx + 2}: Tipo inválido "${row[5]}". Use AMARILLA, AZUL o ROJA.`);
        return;
      }

      nextCards.push({
        id: rawId || `cs_${fecha}_${player.id}_${idx}`,
        playerId: player.id,
        fecha,
        type: cardType,
        createdAt: new Date().toISOString(),
      });
    });
    parsedCards = nextCards;
  }

  return {
    spreadsheetTitle: meta.title,
    sheetTitles: meta.sheetTitles,
    matches: parsedMatches,
    goals: parsedGoals,
    cards: parsedCards,
    playedCount: parsedMatches.filter((m) => m.isPlayed).length,
    changedMatchesCount,
    warnings,
  };
}
