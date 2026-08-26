import React, { useState } from 'react';
import { Team, Player, Match, CardRecord, GoalRecord, TeamId } from '../types';
import { computeStandings, computePlayerStats } from '../utils/sanctionsEngine';
import { CardIconVector, GoalBallBadge, TeamBadgeDot, getTeamColorHex, getTeamEmoji } from './TeamColorDot';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  LabelList,
} from 'recharts';
import {
  Trophy,
  Award,
  Activity,
  Users,
  Filter,
  BarChart2,
  Crown,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Target,
  TrendingUp,
} from 'lucide-react';

interface SeasonPerformanceReportProps {
  teams: Team[];
  players: Player[];
  matches: Match[];
  cards: CardRecord[];
  goals: GoalRecord[];
  currentFecha: number;
  selectedEditionName?: string;
}

export const SeasonPerformanceReport: React.FC<SeasonPerformanceReportProps> = ({
  teams,
  players,
  matches,
  cards,
  goals,
  currentFecha,
  selectedEditionName = 'Campeonato San Simón',
}) => {
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<TeamId | 'ALL'>('ALL');

  const standings = computeStandings(teams, matches, cards, players);
  const { stats: playerStats } = computePlayerStats(players, cards, goals, currentFecha);

  // Overall statistics
  const totalPlayedMatches = matches.filter((m) => m.isPlayed || m.status === 'FINALIZADO').length;
  const totalGoalsCount = goals.length;
  const goalsPerMatchAvg = totalPlayedMatches > 0 ? (totalGoalsCount / totalPlayedMatches).toFixed(2) : '0';

  const totalAmarillas = cards.filter((c) => c.type === 'AMARILLA').length;
  const totalAzules = cards.filter((c) => c.type === 'AZUL').length;
  const totalRojas = cards.filter((c) => c.type === 'ROJA').length;

  // Chart 1 Data: Standings & Points (Left Axis: PTS, Right Axis: Win Rate %)
  const teamPerformanceData = standings.map((s) => {
    const teamObj = teams.find((t) => t.id === s.teamId);
    return {
      name: teamObj?.name || s.teamId,
      teamId: s.teamId,
      PTS: s.pts,
      PG: s.pg,
      PE: s.pe,
      PP: s.pp,
      PJ: s.pj,
      winRate: s.pj > 0 ? Math.round((s.pg / s.pj) * 100) : 0,
      color: teamObj?.colorHex || getTeamColorHex(s.teamId),
    };
  });

  // Chart 2 Data: Offense vs Defense (GF vs GC)
  const teamGoalsData = [...standings]
    .sort((a, b) => b.gf - a.gf)
    .map((s) => {
      const teamObj = teams.find((t) => t.id === s.teamId);
      return {
        name: teamObj?.name || s.teamId,
        teamId: s.teamId,
        GF: s.gf,
        GC: s.gc,
        DG: s.dg,
      };
    });

  // Best offense & defense leaders
  const bestOffense = [...standings].sort((a, b) => b.gf - a.gf)[0];
  const bestDefense = [...standings].filter((s) => s.pj > 0).sort((a, b) => a.gc - b.gc)[0];

  // Fair Play Table Data
  const fairPlayRankings = [...standings]
    .map((s) => {
      const teamObj = teams.find((t) => t.id === s.teamId);
      const totalTarjetas = s.amarillas + s.azules + s.rojas;
      return {
        name: teamObj?.name || s.teamId,
        teamId: s.teamId,
        PuntosFairPlay: s.fairPlayPts,
        Amarillas: s.amarillas,
        Azules: s.azules,
        Rojas: s.rojas,
        totalTarjetas,
        teamObj,
      };
    })
    .sort((a, b) => b.PuntosFairPlay - a.PuntosFairPlay || a.totalTarjetas - b.totalTarjetas);

  // Chart 3 Data: Top 10 Scorers
  const topScorersData = [...playerStats]
    .sort((a, b) => b.goles - a.goles || a.dorsal - b.dorsal)
    .filter((s) => s.goles > 0)
    .slice(0, 10)
    .map((s, index) => {
      const teamObj = teams.find((t) => t.id === s.teamId);
      return {
        name: `#${s.dorsal} ${s.name.split(' ')[0]}`,
        fullName: s.name,
        dorsal: s.dorsal,
        goles: s.goles,
        equipo: teamObj?.name || s.teamId,
        teamId: s.teamId,
        isLeader: index === 0,
      };
    });

  // Filtered player analysis if specific team selected
  const filteredPlayersStats =
    selectedTeamFilter === 'ALL'
      ? playerStats
      : playerStats.filter((p) => p.teamId === selectedTeamFilter);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-white font-mono uppercase tracking-wide">
                REPORTE DE RENDIMIENTO HISTÓRICO
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                {selectedEditionName}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Análisis cuantitativo de efectividad de victorias, balance ofensivo/defensivo, goleo y Fair Play.
            </p>
          </div>
        </div>

        {/* Team Filter Dropdown */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 self-stretch md:self-auto">
          <Filter className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-bold text-slate-300 font-mono shrink-0">Filtrar Equipo:</span>
          <select
            value={selectedTeamFilter}
            onChange={(e) => setSelectedTeamFilter(e.target.value as any)}
            className="bg-slate-900 text-amber-300 font-mono font-extrabold text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
          >
            <option value="ALL">🌐 Todos los Equipos (Global)</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                🛡️ {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview KPI Cards (5. Mejora de Tarjetas Totales y KPIs uniformes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
        {/* KPI 1: Partidos */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold tracking-wider">PARTIDOS JUGADOS</span>
          <div className="mt-2">
            <span className="text-3xl font-black text-amber-400 block leading-none">{totalPlayedMatches}</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Fase Regular / Programados</span>
          </div>
        </div>

        {/* KPI 2: Goles */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md flex flex-col justify-between">
          <span className="text-slate-400 text-xs font-bold tracking-wider">GOLES TOTALES</span>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 leading-none">{totalGoalsCount}</span>
              <span className="text-xs font-bold text-slate-400">({goalsPerMatchAvg} / pdo)</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block font-mono">Promedio de anotación</span>
          </div>
        </div>

        {/* KPI 3: Tarjetas Totales (Uniforme, centrado con etiquetas descriptivas) */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold tracking-wider">TARJETAS TOTALES</span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
              {totalAmarillas + totalAzules + totalRojas} Sanciones
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {/* Amarillas */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span className="text-xl font-black text-amber-400 leading-tight">{totalAmarillas}</span>
              <span className="text-[9px] font-extrabold text-amber-300/90 uppercase tracking-wider mt-0.5">
                Amarillas
              </span>
            </div>
            {/* Azules */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
              <span className="text-xl font-black text-cyan-400 leading-tight">{totalAzules}</span>
              <span className="text-[9px] font-extrabold text-cyan-300/90 uppercase tracking-wider mt-0.5">
                Azules
              </span>
            </div>
            {/* Rojas */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
              <span className="text-xl font-black text-rose-400 leading-tight">{totalRojas}</span>
              <span className="text-[9px] font-extrabold text-rose-300/90 uppercase tracking-wider mt-0.5">
                Rojas
              </span>
            </div>
          </div>
        </div>

        {/* KPI 4: Líder de Goleo */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold tracking-wider">LÍDER DE GOLEO</span>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-base font-black text-amber-300 block truncate">
              {topScorersData[0] ? topScorersData[0].fullName : 'Sin goles registrados'}
            </span>
            <span className="text-xs text-slate-400 font-bold mt-1 block">
              {topScorersData[0]
                ? `⚽ ${topScorersData[0].goles} Goles · ${topScorersData[0].equipo}`
                : 'Pendiente'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Data Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. PUNTOS Y EFECTIVIDAD POR EQUIPO (Gráfico Compuesto: Barras Verticales PTS + Línea Suave % Efectividad) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2 font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
              <Trophy className="w-4 h-4" />
              <span>PUNTOS Y EFECTIVIDAD POR EQUIPO</span>
            </div>
            {/* Explicit Top Legend */}
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-3 h-3 rounded-xs bg-sky-500 inline-block" />
                Puntos (Izq)
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block" />
                % Victorias (Der)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={teamPerformanceData}
                margin={{ top: 15, right: 15, left: -15, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={10}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  tickLine={false}
                />
                {/* Left Y Axis for Points */}
                <YAxis
                  yAxisId="left"
                  stroke="#38bdf8"
                  fontSize={11}
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                {/* Right Y Axis for Win Rate Percentage */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10b981"
                  fontSize={11}
                  domain={[0, 100]}
                  unit="%"
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip
                  formatter={(value: any, name: any) => {
                    if (name === 'Puntos Totales') return [`${value} Pts`, name];
                    if (name === '% Efectividad PG') return [`${value}% Victorias`, name];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Club: ${label}`}
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  }}
                />
                {/* Vertical Bars for Points */}
                <Bar
                  yAxisId="left"
                  dataKey="PTS"
                  name="Puntos Totales"
                  fill="#38bdf8"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                >
                  {teamPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#38bdf8" fillOpacity={0.85} />
                  ))}
                </Bar>
                {/* Smooth Line with Dots for Win Rate */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="winRate"
                  name="% Efectividad PG"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', stroke: '#064e3b', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#34d399', stroke: '#064e3b', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. BALANCE OFENSIVO Y DEFENSIVO (GF vs GC con Diferencia de Goles DG) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2 font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
              <Activity className="w-4 h-4" />
              <span>BALANCE OFENSIVO Y DEFENSIVO</span>
            </div>
            {/* Badges / Legend */}
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" />
                GF (A Favor)
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block" />
                GC (En Contra)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={teamGoalsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                barCategoryGap={12}
                barGap={3}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#cbd5e1"
                  fontSize={11}
                  width={80}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip
                  formatter={(value: any, name: any, props: any) => {
                    const dg = props.payload.DG;
                    const dgStr = dg > 0 ? `+${dg}` : `${dg}`;
                    return [
                      name === 'Goles a Favor (GF)'
                        ? `${value} Goles anotados (DG: ${dgStr})`
                        : `${value} Goles recibidos (DG: ${dgStr})`,
                      name,
                    ];
                  }}
                  labelFormatter={(label) => `Club: ${label}`}
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="GF"
                  name="Goles a Favor (GF)"
                  fill="#10b981"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                >
                  <LabelList
                    dataKey="GF"
                    position="right"
                    fill="#10b981"
                    fontSize={10}
                    fontWeight="bold"
                  />
                </Bar>
                <Bar
                  dataKey="GC"
                  name="Goles en Contra (GC)"
                  fill="#ef4444"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                >
                  <LabelList
                    dataKey="GC"
                    position="right"
                    fill="#ef4444"
                    fontSize={10}
                    fontWeight="bold"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. TOP GOLEADORES DE LA TEMPORADA (Data Labels directas, Líder resaltado con corona, sin cuadrícula vertical) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>TOP GOLEADORES DE LA TEMPORADA</span>
            </div>
            <span className="text-xs text-amber-400/90 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Botín de Oro
            </span>
          </div>

          <div className="h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topScorersData}
                layout="vertical"
                margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
                barCategoryGap={8}
              >
                {/* Desactivadas líneas de cuadrícula verticales del fondo */}
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} hide={true} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#cbd5e1"
                  fontSize={11}
                  width={90}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `${value} Goles (${props.payload.equipo})`,
                    `${props.payload.fullName} #${props.payload.dorsal}`,
                  ]}
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="goles" name="Goles" radius={[0, 6, 6, 0]} barSize={15}>
                  {topScorersData.map((entry, index) => (
                    <Cell
                      key={`scorer-cell-${index}`}
                      fill={entry.isLeader ? '#f59e0b' : '#3b82f6'}
                      stroke={entry.isLeader ? '#fbbf24' : '#60a5fa'}
                      strokeWidth={1}
                    />
                  ))}
                  {/* Data Labels directas al final de cada barra */}
                  <LabelList
                    dataKey="goles"
                    position="right"
                    fill="#f8fafc"
                    fontSize={11}
                    fontWeight="bold"
                    formatter={(val: any) => `${val} ⚽`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. DISCIPLINA Y TABLA FAIR PLAY (Tabla Directa / Rank List con Progress Bar & Badges) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-yellow-400 font-extrabold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>TABLA DE JUEGO LIMPIO (FAIR PLAY)</span>
            </div>
            <span className="text-[11px] text-slate-400 font-bold">Base: 100 Pts</span>
          </div>

          {/* Ranking Cards / Table List */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {fairPlayRankings.map((item, idx) => {
              const isFirst = idx === 0;
              const fpScore = item.PuntosFairPlay;
              const scorePercent = Math.max(0, Math.min(100, fpScore));
              const barColor =
                scorePercent >= 90
                  ? 'bg-emerald-500'
                  : scorePercent >= 75
                  ? 'bg-amber-500'
                  : 'bg-rose-500';

              return (
                <div
                  key={item.teamId}
                  className={`p-2.5 rounded-xl border flex flex-col gap-2 transition ${
                    isFirst
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Rank Position */}
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 ${
                          idx === 0
                            ? 'bg-amber-400 text-slate-950'
                            : idx === 1
                            ? 'bg-slate-300 text-slate-950'
                            : idx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      {/* Team Name */}
                      <span className="font-extrabold text-xs text-white truncate">
                        {getTeamEmoji(item.teamId)} {item.name}
                      </span>
                    </div>

                    {/* Card Badges */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Amarillas */}
                      <span
                        className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] flex items-center gap-1"
                        title={`${item.Amarillas} Amarillas`}
                      >
                        🟨 {item.Amarillas}
                      </span>
                      {/* Azules */}
                      <span
                        className="px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-[10px] flex items-center gap-1"
                        title={`${item.Azules} Azules`}
                      >
                        🟦 {item.Azules}
                      </span>
                      {/* Rojas */}
                      <span
                        className="px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-[10px] flex items-center gap-1"
                        title={`${item.Rojas} Rojas`}
                      >
                        🟥 {item.Rojas}
                      </span>
                      {/* Fair Play Score Badge */}
                      <span className="min-w-[48px] text-right font-black text-xs text-emerald-400 ml-1">
                        {fpScore} pts
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Progress Bar for Fair Play Points */}
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${barColor} transition-all duration-500`}
                      style={{ width: `${scorePercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Team Players Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
            <Users className="w-4 h-4" />
            <span>
              DESGLOSE HISTÓRICO DE JUGADORES (
              {selectedTeamFilter === 'ALL'
                ? 'TODOS LOS EQUIPOS'
                : teams.find((t) => t.id === selectedTeamFilter)?.name}
              )
            </span>
          </div>
          <span className="text-xs text-slate-400">{filteredPlayersStats.length} Jugadores</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase">
                <th className="py-2.5 px-3">Dorsal</th>
                <th className="py-2.5 px-3">Jugador</th>
                <th className="py-2.5 px-3">Equipo</th>
                <th className="py-2.5 px-3 text-center">PJ</th>
                <th className="py-2.5 px-3 text-center">Goles</th>
                <th className="py-2.5 px-3 text-center">Amarillas</th>
                <th className="py-2.5 px-3 text-center">Azules</th>
                <th className="py-2.5 px-3 text-center">Rojas</th>
                <th className="py-2.5 px-3 text-center">Estado Sanción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPlayersStats
                .sort((a, b) => b.goles - a.goles || a.dorsal - b.dorsal)
                .map((p) => {
                  const teamObj = teams.find((t) => t.id === p.teamId);
                  const playerPJ = matches.filter((m) => {
                    if (!m.isPlayed && m.status !== 'FINALIZADO') return false;
                    if (m.homeTeamId === p.teamId) {
                      const list = m.attendance?.homePlayerIds;
                      return list ? list.includes(p.playerId) : true;
                    }
                    if (m.awayTeamId === p.teamId) {
                      const list = m.attendance?.awayPlayerIds;
                      return list ? list.includes(p.playerId) : true;
                    }
                    return false;
                  }).length;

                  return (
                    <tr key={p.playerId} className="hover:bg-slate-800/40 transition">
                      <td className="py-2 px-3 font-extrabold text-amber-400">
                        <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 bg-slate-950 border border-amber-500/40 text-amber-300 font-mono text-xs font-black rounded-md shadow-sm">
                          #{p.dorsal}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-bold text-slate-100">{p.name}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            teamObj?.badgeBg || 'bg-slate-800'
                          } ${teamObj?.badgeText || 'text-white'} ${
                            teamObj?.badgeBorder || 'border-slate-700'
                          }`}
                        >
                          {teamObj?.name || p.teamId}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold text-cyan-400">{playerPJ}</td>
                      <td className="py-2 px-3 text-center font-black">
                        <GoalBallBadge goals={p.goles} />
                      </td>
                      <td className="py-2 px-3 text-center font-bold">
                        {p.amarillas > 0 ? (
                          <CardIconVector type="AMARILLA" count={p.amarillas} />
                        ) : (
                          <span className="text-slate-600 font-bold text-xs">-</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center font-bold">
                        {p.azules > 0 ? (
                          <CardIconVector type="AZUL" count={p.azules} />
                        ) : (
                          <span className="text-slate-600 font-bold text-xs">-</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center font-bold">
                        {p.rojas > 0 ? (
                          <CardIconVector type="ROJA" count={p.rojas} />
                        ) : (
                          <span className="text-slate-600 font-bold text-xs">-</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {p.isCurrentlySuspended ? (
                          <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold text-[10px]">
                            ⚠️ SUSPENDIDO
                          </span>
                        ) : p.amarillas % 3 === 2 ? (
                          <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-400 border border-yellow-800 font-bold text-[10px]">
                            Alerta (2 Amarillas)
                          </span>
                        ) : (
                          <span className="text-slate-500 font-bold text-[10px]">✅ Habilitado</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
