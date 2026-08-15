import React from 'react';
import { Team } from '../types';

export const TEAM_COLOR_MAP: Record<string, { bg: string; dotHex: string; border: string; text: string; emoji: string }> = {
  AZUL: { bg: 'bg-blue-600', dotHex: '#2563eb', border: 'border-blue-400', text: 'text-blue-300', emoji: '🔹' },
  VERDE: { bg: 'bg-emerald-600', dotHex: '#16a34a', border: 'border-emerald-400', text: 'text-emerald-300', emoji: '🟢' },
  NEGRO: {
    bg: 'bg-black',
    dotHex: '#000000',
    border: 'border-zinc-700',
    text: 'text-black font-black dark:text-black',
    emoji: '⬛',
  },
  NARANJA: { bg: 'bg-orange-600', dotHex: '#ea580c', border: 'border-orange-400', text: 'text-orange-300', emoji: '🟧' },
  RAYADO: { bg: 'bg-purple-700', dotHex: '#9333ea', border: 'border-purple-400', text: 'text-purple-300', emoji: '🟣' },
  ROJO: { bg: 'bg-red-600', dotHex: '#dc2626', border: 'border-red-400', text: 'text-red-300', emoji: '🔴' },
  AMARILLO: { bg: 'bg-yellow-500', dotHex: '#eab308', border: 'border-yellow-300', text: 'text-yellow-300', emoji: '🟡' },
  BLANCO: {
    bg: 'bg-white',
    dotHex: '#ffffff',
    border: 'border border-black/60',
    text: 'text-white font-bold [text-shadow:_0_0_1px_#000,_-0.4px_-0.4px_0_#000,_0.4px_-0.4px_0_#000,_-0.4px_0.4px_0_#000,_0.4px_0.4px_0_#000] [-webkit-text-stroke:_0.35px_#000000]',
    emoji: '⚪',
  },
};

export const getTeamEmoji = (teamId?: string): string => {
  if (!teamId) return '⚽';
  const key = teamId.toUpperCase();
  return TEAM_COLOR_MAP[key]?.emoji || '⚽';
};

export const getTeamColorHex = (teamId?: string, fallbackHex?: string): string => {
  if (!teamId) return fallbackHex || '#f59e0b';
  const key = teamId.toUpperCase();
  return TEAM_COLOR_MAP[key]?.dotHex || fallbackHex || '#f59e0b';
};

interface TeamBadgeDotProps {
  teamId?: string;
  teamName?: string;
  colorHex?: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export const TeamBadgeDot: React.FC<TeamBadgeDotProps> = ({
  teamId,
  teamName,
  colorHex,
  size = 'md',
  showName = true,
  className = '',
}) => {
  const name = teamName || teamId || 'Equipo';
  const hex = colorHex || getTeamColorHex(teamId);
  const info = teamId ? TEAM_COLOR_MAP[teamId.toUpperCase()] : null;
  const isWhite =
    teamId?.toUpperCase() === 'BLANCO' ||
    name.toUpperCase().includes('BLANCO') ||
    hex?.toLowerCase() === '#ffffff' ||
    hex?.toLowerCase() === '#f8fafc';

  const isNegro =
    teamId?.toUpperCase() === 'NEGRO' ||
    name.toUpperCase().includes('NEGRO') ||
    hex?.toLowerCase() === '#000000' ||
    hex?.toLowerCase() === '#18181b' ||
    hex?.toLowerCase() === '#1f2937';

  const dotSizeClass =
    size === 'sm'
      ? 'w-2.5 h-2.5'
      : size === 'lg'
      ? 'w-4 h-4'
      : 'w-3 h-3';

  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      <span
        className={`${dotSizeClass} rounded-full shrink-0 shadow-xs ${
          isWhite
            ? 'border border-black/75'
            : isNegro
            ? 'border border-zinc-500 ring-1 ring-zinc-700/50'
            : 'border border-white/20'
        }`}
        style={{
          backgroundColor: isWhite ? '#ffffff' : isNegro ? '#000000' : hex,
          boxShadow: isWhite
            ? '0 0 1px rgba(0,0,0,0.4)'
            : isNegro
            ? '0 0 4px rgba(0,0,0,0.9), 0 0 0 1px #27272a'
            : `0 0 6px ${hex}80`,
        }}
      />
      {showName && (
        <span
          className={`font-bold truncate ${
            isWhite
              ? 'text-white font-bold'
              : isNegro
              ? 'text-zinc-950 dark:text-zinc-900 font-black'
              : info?.text || 'text-slate-200'
          }`}
          style={
            isWhite
              ? {
                  color: '#ffffff',
                  textShadow:
                    '-0.4px -0.4px 0 #000, 0.4px -0.4px 0 #000, -0.4px 0.4px 0 #000, 0.4px 0.4px 0 #000, 0 0 1px rgba(0,0,0,0.8)',
                  WebkitTextStroke: '0.35px #000000',
                  fontWeight: 700,
                }
              : isNegro
              ? {
                  color: '#050505',
                  fontWeight: 900,
                  textShadow:
                    '0 0 1px rgba(255,255,255,0.4), 0 0 0.5px rgba(255,255,255,0.8)',
                }
              : undefined
          }
        >
          {name}
        </span>
      )}
    </span>
  );
};

export const CardIconVector: React.FC<{
  type: 'AMARILLA' | 'AZUL' | 'ROJA' | string;
  count?: number | string;
  className?: string;
  children?: React.ReactNode;
}> = ({ type, count, className, children }) => {
  const content = count !== undefined ? count : children;

  if (content !== undefined) {
    if (type === 'AMARILLA') {
      return (
        <span
          className={`inline-flex items-center justify-center min-w-[22px] h-7 px-1 rounded-[4px] bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-slate-950 border border-amber-200 shadow-md font-mono font-black text-xs shrink-0 ${className || ''}`}
          title={`Tarjeta Amarilla (${content})`}
        >
          {content}
        </span>
      );
    }
    if (type === 'AZUL') {
      return (
        <span
          className={`inline-flex items-center justify-center min-w-[22px] h-7 px-1 rounded-[4px] bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-500 text-slate-950 border border-cyan-200 shadow-md font-mono font-black text-xs shrink-0 ${className || ''}`}
          title={`Tarjeta Azul (${content})`}
        >
          {content}
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center justify-center min-w-[22px] h-7 px-1 rounded-[4px] bg-gradient-to-b from-rose-500 via-rose-600 to-rose-700 text-white border border-rose-300 shadow-md font-mono font-black text-xs shrink-0 ${className || ''}`}
        title={`Tarjeta Roja (${content})`}
      >
        {content}
      </span>
    );
  }

  if (type === 'AMARILLA') {
    return (
      <span
        className={`inline-block rounded-xs bg-amber-400 border border-amber-300 shadow-xs shrink-0 ${className || 'w-3 h-4'}`}
        title="Tarjeta Amarilla"
      />
    );
  }
  if (type === 'AZUL') {
    return (
      <span
        className={`inline-block rounded-xs bg-cyan-400 border border-cyan-300 shadow-xs shrink-0 ${className || 'w-3 h-4'}`}
        title="Tarjeta Azul"
      />
    );
  }
  return (
    <span
      className={`inline-block rounded-xs bg-rose-600 border border-rose-400 shadow-xs shrink-0 ${className || 'w-3 h-4'}`}
      title="Tarjeta Roja"
    />
  );
};

export interface GoalBallBadgeProps {
  goals: number | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GoalBallBadge: React.FC<GoalBallBadgeProps> = ({
  goals,
  size = 'md',
  className = '',
}) => {
  const numGoles = Number(goals);
  if (isNaN(numGoles) || numGoles <= 0) {
    return <span className="text-slate-600 font-bold text-xs">-</span>;
  }

  const dimClass =
    size === 'sm'
      ? 'w-8 h-8 text-xs'
      : size === 'lg'
      ? 'w-11 h-11 text-base'
      : 'w-9 h-9 text-sm';

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full shrink-0 select-none ${dimClass} ${className}`}
      title={`${goals} Gol(es)`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Spherical 3D Ball Lighting */}
          <radialGradient id="ballShading3D" cx="30%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f8fafc" />
            <stop offset="65%" stopColor="#e2e8f0" />
            <stop offset="88%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* Warm ambient leather tint */}
          <radialGradient id="leatherWarmth" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.35" />
          </radialGradient>

          {/* Realistic Black Leather Pentagon with subtle bevel */}
          <linearGradient id="pentagonLeather" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Golden Metallic Ring */}
          <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Central Dark Disc */}
          <radialGradient id="centerDiscGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Base Sphere */}
        <circle cx="50" cy="50" r="47" fill="url(#ballShading3D)" stroke="#334155" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="47" fill="url(#leatherWarmth)" />

        {/* Stitched Pentagons / Hexagons on leather surface */}
        <polygon points="50,4 62,15 57,26 43,26 38,15" fill="url(#pentagonLeather)" stroke="#0f172a" strokeWidth="1.2" />
        <polygon points="86,24 96,36 87,46 75,40 78,28" fill="url(#pentagonLeather)" stroke="#0f172a" strokeWidth="1.2" />
        <polygon points="82,76 71,83 62,72 68,61 80,64" fill="url(#pentagonLeather)" stroke="#0f172a" strokeWidth="1.2" />
        <polygon points="20,78 32,83 38,72 32,61 19,64" fill="url(#pentagonLeather)" stroke="#0f172a" strokeWidth="1.2" />
        <polygon points="14,24 22,28 25,40 13,46 4,36" fill="url(#pentagonLeather)" stroke="#0f172a" strokeWidth="1.2" />

        {/* Panel Seam Stitch Lines */}
        <line x1="50" y1="26" x2="50" y2="34" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="75" y1="40" x2="68" y2="44" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="68" y1="61" x2="63" y2="57" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="32" y1="61" x2="37" y2="57" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="25" y1="40" x2="32" y2="44" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />

        {/* Central Beveled Goal Badge */}
        <circle cx="50" cy="50" r="23" fill="none" stroke="url(#goldRing)" strokeWidth="3" />
        <circle cx="50" cy="50" r="21" fill="url(#centerDiscGrad)" />
        <circle cx="50" cy="50" r="21" stroke="#000000" strokeWidth="0.8" opacity="0.6" />
      </svg>

      {/* Goal Number */}
      <span className="absolute z-10 font-black font-mono text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] leading-none">
        {goals}
      </span>
    </span>
  );
};

