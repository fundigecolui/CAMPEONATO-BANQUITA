import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { SanctionAlertsBanner } from './components/SanctionAlertsBanner';
import { MatrixCardTable } from './components/MatrixCardTable';
import { FechaMatchLogger } from './components/FechaMatchLogger';
import { StandingsTable } from './components/StandingsTable';
import { ScorersTable } from './components/ScorersTable';
import { TeamsManagement } from './components/TeamsManagement';
import { ReglamentoViewer } from './components/ReglamentoViewer';
import { PlayerProfileModal } from './components/PlayerProfileModal';
import { AddPlayerModal } from './components/AddPlayerModal';
import { EditPlayerModal } from './components/EditPlayerModal';

import {
  INITIAL_TEAMS,
  INITIAL_PLAYERS,
  INITIAL_CARDS,
  INITIAL_GOALS,
  INITIAL_MATCHES,
  DEFAULT_EDITIONS,
} from './data/initialData';
import {
  PLAYERS_2025_2,
  CARDS_2025_2,
  GOALS_2025_2,
  MATCHES_2025_2,
} from './data/edition2025_2';
import {
  PLAYERS_2026_1,
  CARDS_2026_1,
  GOALS_2026_1,
  MATCHES_2026_1,
} from './data/edition2026_1';
import {
  PLAYERS_2026_2,
  CARDS_2026_2,
  GOALS_2026_2,
  MATCHES_2026_2,
} from './data/edition2026_2';
import { Player, Team, CardRecord, GoalRecord, Match, CardType, TeamId, TournamentEdition } from './types';
import { computePlayerStats, computeStandings, checkMathematicalElimination } from './utils/sanctionsEngine';
import { generateAllTournamentMatches } from './utils/fixtureGenerator';

const STORAGE_KEY = 'banquitas_san_simon_db_v4';
const EDITIONS_KEY = 'banquitas_editions_list_v1';

const getInitialDataForEdition = (editionId: string) => {
  if (editionId === '2026-2') {
    return {
      players: PLAYERS_2026_2,
      cards: CARDS_2026_2,
      goals: GOALS_2026_2,
      matches: MATCHES_2026_2,
      currentFecha: 1,
      maxUnlockedFecha: 7,
      v: 8,
    };
  }
  if (editionId === '2026-1') {
    return {
      players: PLAYERS_2026_1,
      cards: CARDS_2026_1,
      goals: GOALS_2026_1,
      matches: MATCHES_2026_1,
      currentFecha: 38,
      maxUnlockedFecha: 38,
      v: 4,
    };
  }
  if (editionId === '2025-2') {
    return {
      players: PLAYERS_2025_2,
      cards: CARDS_2025_2,
      goals: GOALS_2025_2,
      matches: MATCHES_2025_2,
      currentFecha: 38,
      maxUnlockedFecha: 38,
      v: 3,
    };
  }
  return {
    players: INITIAL_PLAYERS,
    cards: INITIAL_CARDS,
    goals: INITIAL_GOALS,
    matches: generateAllTournamentMatches(INITIAL_MATCHES),
    currentFecha: 38,
    maxUnlockedFecha: 38,
    v: 3,
  };
};

export default function App() {
  // Navigation & Fecha state
  const [currentFecha, setCurrentFecha] = useState<number>(1);
  const [maxUnlockedFecha, setMaxUnlockedFecha] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'matrix' | 'matches' | 'standings' | 'scorers' | 'teams' | 'reglamento'>('matches');

  // Editions Management
  const [editions, setEditions] = useState<TournamentEdition[]>(() => {
    try {
      const saved = localStorage.getItem(EDITIONS_KEY);
      if (saved) {
        const parsed: TournamentEdition[] = JSON.parse(saved);
        return parsed.map((ed) => {
          const matched = DEFAULT_EDITIONS.find((d) => d.id === ed.id);
          return matched ? { ...ed, name: matched.name } : ed;
        });
      }
      return DEFAULT_EDITIONS;
    } catch {
      return DEFAULT_EDITIONS;
    }
  });
  const [selectedEditionId, setSelectedEditionId] = useState<string>('2026-2');

  // Edit Mode vs Read-Only Mode (False by default for user/public read-only view)
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Database core state
  const default2026_2 = getInitialDataForEdition('2026-2');
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [players, setPlayers] = useState<Player[]>(default2026_2.players);
  const [cards, setCards] = useState<CardRecord[]>(default2026_2.cards);
  const [goals, setGoals] = useState<GoalRecord[]>(default2026_2.goals);
  const [matches, setMatches] = useState<Match[]>(default2026_2.matches);

  // Modals
  const [selectedPlayerModalId, setSelectedPlayerModalId] = useState<number | null>(null);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState<boolean>(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const currentEdition = editions.find((e) => e.id === selectedEditionId) || editions[0];

  // Load initial data from localStorage on mount or when edition changes
  useEffect(() => {
    try {
      const key = `banquitas_edition_${selectedEditionId}`;
      const saved = localStorage.getItem(key);
      const defaults = getInitialDataForEdition(selectedEditionId);

      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          (selectedEditionId === '2026-2' && (!parsed.v || parsed.v < 8)) ||
          (selectedEditionId === '2025-2' && (!parsed.v || parsed.v < 3)) ||
          (selectedEditionId === '2026-1' && (!parsed.v || parsed.v < 4))
        ) {
          setTeams(INITIAL_TEAMS);
          setPlayers(defaults.players);
          setCards(defaults.cards);
          setGoals(defaults.goals);
          setMatches(defaults.matches);
          setCurrentFecha(defaults.currentFecha);
          setMaxUnlockedFecha(defaults.maxUnlockedFecha);
          return;
        }

        if (parsed.teams) {
          const updatedTeams = parsed.teams.map((t: Team) => {
            const init = INITIAL_TEAMS.find((it) => it.id === t.id);
            return init ? { ...t, name: init.name, delegate: init.delegate } : t;
          });
          setTeams(updatedTeams);
        } else {
          setTeams(INITIAL_TEAMS);
        }
        if (parsed.players) setPlayers(parsed.players);
        else setPlayers(defaults.players);

        if (parsed.cards) setCards(parsed.cards);
        else setCards(defaults.cards);

        if (parsed.goals) setGoals(parsed.goals);
        else setGoals(defaults.goals);

        if (parsed.matches && parsed.matches.length >= 38) {
          setMatches(parsed.matches);
        } else {
          setMatches(defaults.matches);
        }
        if (parsed.currentFecha) setCurrentFecha(parsed.currentFecha);
        else setCurrentFecha(defaults.currentFecha);

        if (typeof parsed.maxUnlockedFecha === 'number') setMaxUnlockedFecha(parsed.maxUnlockedFecha);
        else setMaxUnlockedFecha(defaults.maxUnlockedFecha);

        // Always initialize in Read-Only (User Mode)
        setIsEditMode(false);
      } else {
        setTeams(INITIAL_TEAMS);
        setPlayers(defaults.players);
        setCards(defaults.cards);
        setGoals(defaults.goals);
        setMatches(defaults.matches);
        setCurrentFecha(defaults.currentFecha);
        setMaxUnlockedFecha(defaults.maxUnlockedFecha);
      }
    } catch (err) {
      console.error('Error loading stored data:', err);
    }
  }, [selectedEditionId]);

  // Save to localStorage & broadcast real-time tab updates
  useEffect(() => {
    const dataToSave = {
      players,
      cards,
      goals,
      matches,
      currentFecha,
      maxUnlockedFecha,
      isEditMode,
      v: 5,
    };
    const key = selectedEditionId === '2026-2' ? STORAGE_KEY : `banquitas_edition_${selectedEditionId}`;
    localStorage.setItem(key, JSON.stringify(dataToSave));

    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('banquitas_san_simon_sync');
      channel.postMessage({ ...dataToSave, selectedEditionId });
      channel.close();
    }
  }, [players, cards, goals, matches, currentFecha, isEditMode, selectedEditionId]);

  const handleAddNewEdition = () => {
    const name = window.prompt(
      '🔒 CREAR NUEVA EDICIÓN DE TORNEO\nIngrese el nombre de la nueva edición:\n(Ejemplo: I SEMESTRE 2027)'
    );
    if (!name || !name.trim()) return;
    const newId = `ed_${Date.now()}`;
    const newEd: TournamentEdition = {
      id: newId,
      name: name.trim().toUpperCase(),
      status: 'EN_CURSO',
    };
    const updatedEditions = [newEd, ...editions];
    setEditions(updatedEditions);
    localStorage.setItem(EDITIONS_KEY, JSON.stringify(updatedEditions));
    setSelectedEditionId(newId);
    setPlayers(INITIAL_PLAYERS);
    setCards([]);
    setGoals([]);
    setMatches(generateAllTournamentMatches(INITIAL_MATCHES));
    setCurrentFecha(1);
    alert(`✅ ¡Nueva edición "${newEd.name}" creada con éxito! Ahora puedes registrar sus partidos y resultados.`);
  };

  // Real-Time Computations Engine
  const { stats: playerStats, activeSuspensions, allSuspensions } = computePlayerStats(
    players,
    cards,
    goals,
    currentFecha
  );

  const standings = computeStandings(teams, matches, cards, players);

  const totalCardsCount = {
    amarillas: cards.filter((c) => c.type === 'AMARILLA').length,
    azules: cards.filter((c) => c.type === 'AZUL').length,
    rojas: cards.filter((c) => c.type === 'ROJA').length,
    total: cards.length,
  };

  // Handlers
  const handleAddCard = (playerId: number, fecha: number, type: CardType) => {
    const newCard: CardRecord = {
      id: `c_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      playerId,
      fecha,
      type,
      createdAt: new Date().toISOString(),
    };
    setCards((prev) => [...prev, newCard]);
  };

  const handleRemoveCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const handleAddGoal = (playerId: number, fecha: number, teamId: TeamId) => {
    const newGoal: GoalRecord = {
      id: `g_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      playerId,
      fecha,
      teamId,
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleRemoveGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const handleUpdateMatchScore = (matchId: string, homeGoals: number, awayGoals: number) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, homeGoals, awayGoals, isPlayed: true } : m))
    );
  };

  const handleToggleAttendance = (matchId: string, playerId: number, teamSide: 'home' | 'away') => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;

        const homePlayers = players.filter((p) => p.teamId === m.homeTeamId);
        const awayPlayers = players.filter((p) => p.teamId === m.awayTeamId);

        const currentHome = m.attendance?.homePlayerIds ?? homePlayers.map((p) => p.id);
        const currentAway = m.attendance?.awayPlayerIds ?? awayPlayers.map((p) => p.id);

        if (teamSide === 'home') {
          const exists = currentHome.includes(playerId);
          const nextHome = exists ? currentHome.filter((id) => id !== playerId) : [...currentHome, playerId];
          return { ...m, attendance: { homePlayerIds: nextHome, awayPlayerIds: currentAway } };
        } else {
          const exists = currentAway.includes(playerId);
          const nextAway = exists ? currentAway.filter((id) => id !== playerId) : [...currentAway, playerId];
          return { ...m, attendance: { homePlayerIds: currentHome, awayPlayerIds: nextAway } };
        }
      })
    );
  };

  const handleSetAllAttendance = (matchId: string, teamSide: 'home' | 'away', selectAll: boolean) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;

        const homePlayers = players.filter((p) => p.teamId === m.homeTeamId);
        const awayPlayers = players.filter((p) => p.teamId === m.awayTeamId);

        const currentHome = m.attendance?.homePlayerIds ?? homePlayers.map((p) => p.id);
        const currentAway = m.attendance?.awayPlayerIds ?? awayPlayers.map((p) => p.id);

        if (teamSide === 'home') {
          const nextHome = selectAll ? homePlayers.map((p) => p.id) : [];
          return { ...m, attendance: { homePlayerIds: nextHome, awayPlayerIds: currentAway } };
        } else {
          const nextAway = selectAll ? awayPlayers.map((p) => p.id) : [];
          return { ...m, attendance: { homePlayerIds: currentHome, awayPlayerIds: nextAway } };
        }
      })
    );
  };

  const handleUpdateMatchStatus = (matchId: string, status: 'PROGRAMADO' | 'EN_VIVO' | 'FINALIZADO') => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? {
              ...m,
              status,
              isPlayed: status === 'FINALIZADO' ? true : m.isPlayed,
            }
          : m
      )
    );
  };

  const handleAddPlayer = (name: string, dorsal: number, teamId: TeamId) => {
    const nextId = Math.max(...players.map((p) => p.id), 0) + 1;
    const newPlayer: Player = {
      id: nextId,
      dorsal,
      name,
      teamId,
    };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const handleSaveEditedPlayer = (playerId: number, name: string, dorsal: number, teamId: TeamId) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, name, dorsal, teamId } : p))
    );
  };

  const handleDeletePlayer = (playerId: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    setCards((prev) => prev.filter((c) => c.playerId !== playerId));
    setGoals((prev) => prev.filter((g) => g.playerId !== playerId));
  };

  const handleResetData = () => {
    if (window.confirm('¿Desea restablecer todos los datos de esta edición a su base oficial del Campeonato San Simón?')) {
      const defaults = getInitialDataForEdition(selectedEditionId);
      setTeams(INITIAL_TEAMS);
      setPlayers(defaults.players);
      setCards(defaults.cards);
      setGoals(defaults.goals);
      setMatches(defaults.matches);
      setCurrentFecha(defaults.currentFecha);
      setIsEditMode(true);
      const key = `banquitas_edition_${selectedEditionId}`;
      localStorage.removeItem(key);
      if (selectedEditionId === '2026-2') {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify({ players, cards, goals, matches, currentFecha, isEditMode }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `san_simon_campeonato_f${currentFecha}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.players) setPlayers(parsed.players);
          if (parsed.cards) setCards(parsed.cards);
          if (parsed.goals) setGoals(parsed.goals);
          if (parsed.matches) setMatches(parsed.matches);
          if (parsed.currentFecha) setCurrentFecha(parsed.currentFecha);
          if (typeof parsed.isEditMode === 'boolean') setIsEditMode(parsed.isEditMode);
          alert('¡Datos del campeonato importados con éxito!');
        } catch (err) {
          alert('Error al leer el archivo JSON importado.');
        }
      };
    }
  };

  const selectedPlayer = players.find((p) => p.id === selectedPlayerModalId) || null;
  const selectedPlayerStat = playerStats.find((s) => s.playerId === selectedPlayerModalId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Top Main Navigation Header */}
      <Header
        currentFecha={currentFecha}
        setCurrentFecha={setCurrentFecha}
        maxUnlockedFecha={maxUnlockedFecha}
        setMaxUnlockedFecha={setMaxUnlockedFecha}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeSuspendedCount={activeSuspensions.length}
        totalCardsCount={totalCardsCount}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onResetData={handleResetData}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onOpenAddPlayer={() => setIsAddPlayerOpen(true)}
        selectedEditionId={selectedEditionId}
        setSelectedEditionId={setSelectedEditionId}
        editions={editions}
        onAddNewEdition={handleAddNewEdition}
      />

      {/* Main Content Viewport with Left Vertical Sidebar Navigation */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Vertical Module Navigation Sidebar */}
          <SidebarNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentFecha={currentFecha}
            setCurrentFecha={setCurrentFecha}
            maxUnlockedFecha={maxUnlockedFecha}
            isEditMode={isEditMode}
            activeSuspendedCount={activeSuspensions.length}
            totalCardsCount={totalCardsCount}
            currentEditionName={editions.find((e) => e.id === selectedEditionId)?.name}
          />

          {/* Right Main Active Viewport */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            {/* Historical Edition Banner Indicator */}
            {currentEdition?.status === 'FINALIZADO' && (
              <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border border-amber-500/50 p-3.5 rounded-2xl text-center shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
                <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs sm:text-sm">
                  <span className="text-lg">🏆</span>
                  <span>EDICIÓN HISTÓRICA FINALIZADA: {currentEdition.name}</span>
                </div>
                {currentEdition.champion && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold">
                    CAMPEÓN OFICIAL: EQUIPO {currentEdition.champion}
                  </span>
                )}
              </div>
            )}

            {/* Real-time Sanction Alerts Banner for current fecha */}
            <SanctionAlertsBanner
              currentFecha={currentFecha}
              activeSuspensions={activeSuspensions}
              teams={teams}
              onPlayerClick={(pid) => setSelectedPlayerModalId(pid)}
              eliminationInfo={checkMathematicalElimination(standings, matches)}
            />

            {/* Dynamic View Tabs */}
            {activeTab === 'matrix' && (
              <MatrixCardTable
                players={players}
                teams={teams}
                cards={cards}
                playerStats={playerStats}
                currentFecha={currentFecha}
                maxUnlockedFecha={maxUnlockedFecha}
                isEditMode={isEditMode}
                onAddCard={handleAddCard}
                onRemoveCard={handleRemoveCard}
                onSelectPlayer={(pid) => setSelectedPlayerModalId(pid)}
                onOpenAddPlayerModal={() => setIsAddPlayerOpen(true)}
              />
            )}

            {activeTab === 'matches' && (
              <FechaMatchLogger
                currentFecha={currentFecha}
                setCurrentFecha={setCurrentFecha}
                maxUnlockedFecha={maxUnlockedFecha}
                setMaxUnlockedFecha={setMaxUnlockedFecha}
                matches={matches}
                players={players}
                teams={teams}
                cards={cards}
                goals={goals}
                activeSuspensions={activeSuspensions}
                isEditMode={isEditMode}
                onUpdateMatchScore={handleUpdateMatchScore}
                onUpdateMatchStatus={handleUpdateMatchStatus}
                onToggleAttendance={handleToggleAttendance}
                onSetAllAttendance={handleSetAllAttendance}
                onAddCard={handleAddCard}
                onAddGoal={handleAddGoal}
                onRemoveCard={handleRemoveCard}
                onRemoveGoal={handleRemoveGoal}
              />
            )}

            {activeTab === 'standings' && (
              <StandingsTable standings={standings} teams={teams} matches={matches} />
            )}

            {activeTab === 'scorers' && (
              <ScorersTable
                playerStats={playerStats}
                teams={teams}
                onSelectPlayer={(pid) => setSelectedPlayerModalId(pid)}
              />
            )}

            {activeTab === 'teams' && (
              <TeamsManagement
                teams={teams}
                players={players}
                playerStats={playerStats}
                isEditMode={isEditMode}
                onSelectPlayer={(pid) => setSelectedPlayerModalId(pid)}
                onEditPlayer={(player) => setEditingPlayer(player)}
                onOpenAddPlayerModal={() => setIsAddPlayerOpen(true)}
                selectedEditionId={selectedEditionId}
                selectedEditionName={editions.find((e) => e.id === selectedEditionId)?.name}
              />
            )}

            {activeTab === 'reglamento' && (
              <ReglamentoViewer
                isEditMode={isEditMode}
                selectedEditionId={selectedEditionId}
                selectedEditionName={editions.find((e) => e.id === selectedEditionId)?.name}
              />
            )}
          </div>
        </div>
      </main>

      {/* Individual Player Dossier Modal */}
      <PlayerProfileModal
        player={selectedPlayer}
        teams={teams}
        cards={cards}
        goals={goals}
        playerStats={selectedPlayerStat}
        allSuspensions={allSuspensions}
        onClose={() => setSelectedPlayerModalId(null)}
        onAddCard={handleAddCard}
        onRemoveCard={handleRemoveCard}
        onRemoveGoal={handleRemoveGoal}
      />

      {/* Add New Player Modal */}
      <AddPlayerModal
        isOpen={isAddPlayerOpen}
        teams={teams}
        onClose={() => setIsAddPlayerOpen(false)}
        onAddPlayer={handleAddPlayer}
      />

      {/* Edit Existing Player Modal */}
      <EditPlayerModal
        player={editingPlayer}
        teams={teams}
        isOpen={!!editingPlayer}
        onClose={() => setEditingPlayer(null)}
        onSave={handleSaveEditedPlayer}
        onDelete={handleDeletePlayer}
      />
    </div>
  );
}

