import React, { useState } from 'react';
import { Team, Player, Match, CardRecord, GoalRecord, TeamId } from '../types';
import { computeStandings, computePlayerStats } from '../utils/sanctionsEngine';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Trophy, TrendingUp, ShieldAlert, Award, Activity, Users, Filter, BarChart2 } from 'lucide-react';

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
  const totalPlayedMatches = matches.filter((m) => m.isPlayed).length;
  const totalGoalsCount = goals.length;
  const goalsPerMatchAvg = totalPlayedMatches > 0 ? (totalGoalsCount / totalPlayedMatches).toFixed(2) : '0';

  const totalAmarillas = cards.filter((c) => c.type === 'AMARILLA').length;
  const totalAzules = cards.filter((c) => c.type === 'AZUL').length;
  const totalRojas = cards.filter((c) => c.type === 'ROJA').length;

  // Chart 1 Data: Standings & Points
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
      color: teamObj?.colorHex || '#f59e0b',
    };
  });

  // Chart 2 Data: Offense vs Defense
  const teamGoalsData = standings.map((s) => {
    const teamObj = teams.find((t) => t.id === s.teamId);
    return {
      name: teamObj?.name || s.teamId,
      GF: s.gf,
      GC: s.gc,
      DG: s.dg,
    };
  });

  // Chart 3 Data: Fair Play & Cards
  const fairPlayData = standings.map((s) => {
    const teamObj = teams.find((t) => t.id === s.teamId);
    return {
      name: teamObj?.name || s.teamId,
      PuntosFairPlay: s.fairPlayPts,
      Amarillas: s.amarillas,
      Azules: s.azules,
      Rojas: s.rojas,
    };
  }).sort((a, b) => b.PuntosFairPlay - a.PuntosFairPlay);

  // Chart 4 Data: Top 10 Scorers
  const topScorersData = [...playerStats]
    .sort((a, b) => b.goles - a.goles)
    .filter((s) => s.goles > 0)
    .slice(0, 10)
    .map((s) => {
      const teamObj = teams.find((t) => t.id === s.teamId);
      return {
        name: `#${s.dorsal} ${s.name.split(' ')[0]}`,
        fullName: s.name,
        dorsal: s.dorsal,
        goles: s.goles,
        equipo: teamObj?.name || s.teamId,
      };
    });

  // Filtered player analysis if specific team selected
  const filteredPlayersStats = selectedTeamFilter === 'ALL'
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

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
          <span className="text-slate-400 text-xs font-bold block">PARTIDOS JUGADOS</span>
          <span className="text-2xl font-black text-amber-400 block mt-1">{totalPlayedMatches}</span>
          <span className="text-[10px] text-slate-500 mt-1 block">Fase Regular / Playoffs</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
          <span className="text-slate-400 text-xs font-bold block">GOLES TOTALES</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-400 block">{totalGoalsCount}</span>
            <span className="text-xs text-slate-400">({goalsPerMatchAvg} / pdo)</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block font-mono">Promedio general</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
          <span className="text-slate-400 text-xs font-bold block">TARJETAS TOTALES</span>
          <div className="flex items-center gap-2 mt-1 text-xs font-bold">
            <span className="text-yellow-400">🟨 {totalAmarillas}</span>
            <span className="text-blue-400">🟦 {totalAzules}</span>
            <span className="text-red-400">🟥 {totalRojas}</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Tarjetas del torneo</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
          <span className="text-slate-400 text-xs font-bold block">LÍDER DE GOLEO</span>
          <span className="text-base font-black text-amber-300 block mt-1 truncate">
            {topScorersData[0] ? topScorersData[0].fullName : 'Sin goles'}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {topScorersData[0] ? `⚽ ${topScorersData[0].goles} Goles (${topScorersData[0].equipo})` : '-'}
          </span>
        </div>
      </div>

      {/* Grid of Recharts Data Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Puntos y Efectividad por Equipo */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
              <Trophy className="w-4 h-4" />
              <span>PUNTOS Y EFECTIVIDAD POR EQUIPO</span>
            </div>
            <span className="text-xs text-slate-400 font-bold">PTS & % Victorias</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-20} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="PTS" name="Puntos Totales" fill="#f59e0b" radius={[6, 6, 0, 0]}>
                  {teamPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#f59e0b'} />
                  ))}
                </Bar>
                <Bar dataKey="winRate" name="% Efectividad PG" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Offense vs Defense (GF vs GC) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
              <Activity className="w-4 h-4" />
              <span>BALANCE OFENSIVO Y DEFENSIVO</span>
            </div>
            <span className="text-xs text-slate-400 font-bold">GF vs GC</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamGoalsData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-20} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="GF" name="Goles a Favor (GF)" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="GC" name="Goles en Contra (GC)" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Top 10 Scorers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
              <Award className="w-4 h-4" />
              <span>TOP GOLEADORES DE LA TEMPORADA</span>
            </div>
            <span className="text-xs text-slate-400 font-bold">Goles Registrados</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topScorersData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} width={90} />
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `${value} Goles (${props.payload.equipo})`,
                    props.payload.fullName,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Bar dataKey="goles" name="Goles" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Fair Play Ranking & Disciplina */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
            <div className="flex items-center gap-2 text-yellow-400 font-extrabold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>DISCIPLINA Y TABLA FAIR PLAY</span>
            </div>
            <span className="text-xs text-slate-400 font-bold">Puntos Juego Limpio</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fairPlayData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-20} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="PuntosFairPlay" name="Ptos Fair Play (Max 100)" fill="#fbbf24" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Amarillas" name="Amarillas" fill="#facc15" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Rojas" name="Rojas" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Team Players Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
            <Users className="w-4 h-4" />
            <span>DESGLOSE HISTÓRICO DE JUGADORES ({selectedTeamFilter === 'ALL' ? 'TODOS LOS EQUIPOS' : teams.find((t) => t.id === selectedTeamFilter)?.name})</span>
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
                  return (
                    <tr key={p.playerId} className="hover:bg-slate-800/40 transition">
                      <td className="py-2 px-3 font-extrabold text-amber-400">#{p.dorsal}</td>
                      <td className="py-2 px-3 font-bold text-slate-100">{p.name}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${teamObj?.badgeBg || 'bg-slate-800'} ${teamObj?.badgeText || 'text-white'} ${teamObj?.badgeBorder || 'border-slate-700'}`}
                        >
                          {teamObj?.name || p.teamId}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-black text-emerald-400">
                        {p.goles > 0 ? `⚽ ${p.goles}` : '-'}
                      </td>
                      <td className="py-2 px-3 text-center text-yellow-400 font-bold">
                        {p.amarillas > 0 ? `🟨 ${p.amarillas}` : '-'}
                      </td>
                      <td className="py-2 px-3 text-center text-blue-400 font-bold">
                        {p.azules > 0 ? `🟦 ${p.azules}` : '-'}
                      </td>
                      <td className="py-2 px-3 text-center text-red-400 font-bold">
                        {p.rojas > 0 ? `🟥 ${p.rojas}` : '-'}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {p.isCurrentlySuspended ? (
                          <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold text-[10px]">
                            ⚠️ SUSPENDIDO ({p.suspensionReason})
                          </span>
                        ) : p.amarillas % 3 === 2 ? (
                          <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-400 border border-yellow-800 font-bold text-[10px]">
                            ⚠️ Apercibido
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
