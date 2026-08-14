import React, { useState } from 'react';
import { Shield, Users, Trophy, AlertTriangle, Eye, Edit3, UserPlus, Lock, UserCheck, Award } from 'lucide-react';
import { Team, Player, PlayerStats, TeamId, Match } from '../types';
import { getJuntaDirectiva } from '../data/initialData';

interface TeamsManagementProps {
  teams: Team[];
  players: Player[];
  playerStats: PlayerStats[];
  matches?: Match[];
  isEditMode: boolean;
  onSelectPlayer: (playerId: number) => void;
  onEditPlayer: (player: Player) => void;
  onOpenAddPlayerModal: () => void;
  selectedEditionId?: string;
  selectedEditionName?: string;
}

export const TeamsManagement: React.FC<TeamsManagementProps> = ({
  teams,
  players,
  playerStats,
  matches = [],
  isEditMode,
  onSelectPlayer,
  onEditPlayer,
  onOpenAddPlayerModal,
  selectedEditionId,
  selectedEditionName,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState<TeamId>('AZUL');
  const [playerSearchTerm, setPlayerSearchTerm] = useState('');

  const juntaDirectiva = getJuntaDirectiva(selectedEditionId);
  const selectedTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];
  const teamPlayers = players.filter((p) => p.teamId === selectedTeamId);

  const filteredTeamPlayers = teamPlayers.filter((p) =>
    p.name.toLowerCase().includes(playerSearchTerm.toLowerCase()) ||
    p.dorsal.toString().includes(playerSearchTerm)
  );

  // Compute team matches played
  const partidosJugados = matches.filter(
    (m) => (m.homeTeamId === selectedTeamId || m.awayTeamId === selectedTeamId) && (m.isPlayed || m.status === 'FINALIZADO')
  ).length;

  // Compute team totals
  let totalAmarillas = 0;
  let totalAzules = 0;
  let totalRojas = 0;
  let totalGoles = 0;

  teamPlayers.forEach((p) => {
    const s = playerStats.find((st) => st.playerId === p.id);
    if (s) {
      totalAmarillas += s.amarillas;
      totalAzules += s.azules;
      totalRojas += s.rojas;
      totalGoles += s.goles;
    }
  });

  return (
    <div className="space-y-6 print:hidden">
      {/* Junta Directiva Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-black text-amber-400 font-mono tracking-wider uppercase">
            Junta Directiva - {selectedEditionName || selectedEditionId || 'Campeonato Banquitas'}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {juntaDirectiva.map((member) => (
            <div key={member.cargo} className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center">
              <span className="block text-[10px] font-mono text-amber-400/90 font-bold uppercase">{member.cargo}</span>
              <span className="block text-xs font-bold text-white mt-0.5 truncate">{member.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {teams.map((t) => {
          const count = players.filter((p) => p.teamId === t.id).length;
          const isSelected = t.id === selectedTeamId;

          return (
            <button
              key={t.id}
              onClick={() => setSelectedTeamId(t.id)}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-between gap-1 shadow-md cursor-pointer ${
                isSelected
                  ? 'border-amber-400 bg-slate-800 ring-2 ring-amber-400/40'
                  : 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span
                className={`px-2.5 py-0.5 rounded font-black text-[10px] uppercase tracking-wider border ${t.badgeBg} ${t.badgeText} ${t.badgeBorder || 'border-transparent'}`}
              >
                {t.id}
              </span>
              <span className="font-extrabold text-xs text-white truncate max-w-full">
                {t.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{count} Jugadores</span>
              {t.delegate && (
                <span className="text-[9px] text-amber-400 font-mono truncate max-w-full font-semibold">
                  Del: {t.delegate.split(' ')[0]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Team Overview Banner & Roster */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl ${selectedTeam.badgeBg} ${selectedTeam.badgeText} border-2 ${selectedTeam.badgeBorder} flex items-center justify-center font-black text-lg shadow-lg`}
            >
              <Shield className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-white font-mono uppercase">
                  {selectedTeam.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-amber-300 border border-slate-700">
                  ID: {selectedTeam.id}
                </span>
                {selectedTeam.delegate && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-amber-400" />
                    Delegado: {selectedTeam.delegate}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Plantilla Oficial de {teamPlayers.length} Jugadores Registrados
              </p>
            </div>
          </div>

          {/* Team Actions & Stats Summary */}
          <div className="flex flex-wrap items-center gap-3">
            {isEditMode ? (
              <button
                onClick={onOpenAddPlayerModal}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Añadir a Plantilla</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Modo Lectura (Público)
              </span>
            )}

            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700 text-center">
                <span className="block text-slate-400 text-[10px]">🏟️ PJ:</span>
                <span className="font-bold text-emerald-400 text-sm">{partidosJugados}</span>
              </div>
              <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700 text-center">
                <span className="block text-slate-400 text-[10px]">⚽ G:</span>
                <span className="font-bold text-amber-300 text-sm">{totalGoles}</span>
              </div>
              <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700 text-center">
                <span className="block text-slate-400 text-[10px]">🟨 AMARILLAS</span>
                <span className="font-bold text-yellow-300 text-sm">{totalAmarillas}</span>
              </div>
              <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700 text-center">
                <span className="block text-slate-400 text-[10px]">🟦 AZULES</span>
                <span className="font-bold text-blue-300 text-sm">{totalAzules}</span>
              </div>
              <div className="bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700 text-center">
                <span className="block text-slate-400 text-[10px]">🟥 ROJAS</span>
                <span className="font-bold text-red-400 text-sm">{totalRojas}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Search Bar */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              value={playerSearchTerm}
              onChange={(e) => setPlayerSearchTerm(e.target.value)}
              placeholder="🔍 Buscar por nombre o dorsal..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 text-xs rounded-xl px-3.5 py-2 border border-slate-800 focus:outline-none focus:border-amber-400"
            />
          </div>
          <span className="text-xs font-mono text-slate-400 font-semibold">
            {filteredTeamPlayers.length} / {teamPlayers.length} Jugadores
          </span>
        </div>

        {/* Players Roster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTeamPlayers.map((player) => {
            const stat = playerStats.find((s) => s.playerId === player.id);

            const playerPJ = matches.filter((m) => {
              if (!m.isPlayed && m.status !== 'FINALIZADO') return false;
              if (m.homeTeamId === player.teamId) {
                const list = m.attendance?.homePlayerIds;
                return list ? list.includes(player.id) : true;
              }
              if (m.awayTeamId === player.teamId) {
                const list = m.attendance?.awayPlayerIds;
                return list ? list.includes(player.id) : true;
              }
              return false;
            }).length;

            return (
              <div
                key={player.id}
                className="bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-400/50 p-3.5 rounded-xl flex items-center justify-between gap-3 transition group shadow-xs"
              >
                <div
                  onClick={() => onSelectPlayer(player.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 font-black font-mono text-sm flex items-center justify-center text-slate-200 border border-slate-700 transition shrink-0">
                    {player.dorsal}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-xs text-white group-hover:text-amber-300 transition truncate">
                        {player.name}
                      </h3>
                      {selectedTeam.delegate && player.name.trim().toUpperCase() === selectedTeam.delegate.trim().toUpperCase() && (
                        <span className="px-1.5 py-0.2 text-[9px] font-black rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          DELEGADO
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      PJ: <strong className="text-emerald-400">{playerPJ}</strong> | G: <strong className="text-amber-300">{stat?.goles || 0}</strong>
                    </p>
                  </div>
                </div>

                {/* Card summary badges & Edit Action */}
                <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0">
                  <span
                    title={`${stat?.amarillas || 0} Tarjeta(s) Amarilla(s)`}
                    className={`w-6 h-8 rounded-[4px] text-xs font-mono flex items-center justify-center border transition-all ${
                      (stat?.amarillas || 0) > 0
                        ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-slate-950 border-amber-200 shadow-sm font-black scale-105'
                        : 'bg-amber-500/15 text-amber-300/40 border-amber-500/25 font-bold'
                    }`}
                  >
                    {stat?.amarillas || 0}
                  </span>

                  <span
                    title={`${stat?.azules || 0} Tarjeta(s) Azul(es)`}
                    className={`w-6 h-8 rounded-[4px] text-xs font-mono flex items-center justify-center border transition-all ${
                      (stat?.azules || 0) > 0
                        ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white border-blue-300 shadow-sm font-black scale-105'
                        : 'bg-blue-500/15 text-blue-300/40 border-blue-500/25 font-bold'
                    }`}
                  >
                    {stat?.azules || 0}
                  </span>

                  <span
                    title={`${stat?.rojas || 0} Tarjeta(s) Roja(s)`}
                    className={`w-6 h-8 rounded-[4px] text-xs font-mono flex items-center justify-center border transition-all ${
                      (stat?.rojas || 0) > 0
                        ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white border-red-300 shadow-sm font-black scale-105'
                        : 'bg-red-500/15 text-red-300/40 border-red-500/25 font-bold'
                    }`}
                  >
                    {stat?.rojas || 0}
                  </span>

                  {stat?.isCurrentlySuspended && (
                    <span className="px-1.5 py-1 rounded bg-red-600 text-white font-black text-[9px] animate-pulse ml-0.5">
                      SUS
                    </span>
                  )}

                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditPlayer(player);
                      }}
                      className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 transition ml-1"
                      title="Editar Jugador"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

