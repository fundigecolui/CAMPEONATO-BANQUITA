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
      ? 'w-7 h-7 text-[11px]'
      : size === 'lg'
      ? 'w-10 h-10 text-sm'
      : 'w-8 h-8 text-xs';

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full shrink-0 shadow-lg font-mono select-none ${dimClass} ${className}`}
      title={`${goals} Gol(es)`}
    >
      <svg
        viewBox="0 0 40 40"
        className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 3D Sphere gradient for realistic ball shading */}
          <radialGradient id="ballSphere3D" cx="32%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="42%" stopColor="#f8fafc" />
            <stop offset="78%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          {/* Pentagon gradient for depth */}
          <linearGradient id="pentagonGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Golden glossy central badge gradient */}
          <linearGradient id="centerRingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          <linearGradient id="centerBgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Outer 3D sphere ball */}
        <circle cx="20" cy="20" r="18.5" fill="url(#ballSphere3D)" stroke="#0f172a" strokeWidth="1.2" />

        {/* Classic 3D Pentagons around the sphere */}
        <polygon points="20,2 24.5,6.5 22.5,11 17.5,11 15.5,6.5" fill="url(#pentagonGrad)" stroke="#0f172a" strokeWidth="0.5" />
        <polygon points="34.5,10.5 38,15.5 34,19 29.5,16.5 31,11.5" fill="url(#pentagonGrad)" stroke="#0f172a" strokeWidth="0.5" />
        <polygon points="32,31.5 27,33.5 23.5,29.5 26,25.5 31.5,26.5" fill="url(#pentagonGrad)" stroke="#0f172a" strokeWidth="0.5" />
        <polygon points="8,31.5 13,33.5 16.5,29.5 14,25.5 8.5,26.5" fill="url(#pentagonGrad)" stroke="#0f172a" strokeWidth="0.5" />
        <polygon points="5.5,10.5 2,15.5 6,19 10.5,16.5 9,11.5" fill="url(#pentagonGrad)" stroke="#0f172a" strokeWidth="0.5" />

        {/* Subtle seam lines connecting pentagons */}
        <line x1="20" y1="11" x2="20" y2="12.5" stroke="#475569" strokeWidth="0.8" />
        <line x1="29.5" y1="16.5" x2="27.5" y2="17.5" stroke="#475569" strokeWidth="0.8" />
        <line x1="23.5" y1="29.5" x2="22" y2="27.5" stroke="#475569" strokeWidth="0.8" />
        <line x1="16.5" y1="29.5" x2="18" y2="27.5" stroke="#475569" strokeWidth="0.8" />
        <line x1="10.5" y1="16.5" x2="12.5" y2="17.5" stroke="#475569" strokeWidth="0.8" />

        {/* Outer Glowing Gold Ring for central number badge */}
        <circle cx="20" cy="20" r="10.2" fill="none" stroke="url(#centerRingGrad)" strokeWidth="1.8" />

        {/* Central Dark Disc for high-contrast legible number */}
        <circle cx="20" cy="20" r="9.2" fill="url(#centerBgGrad)" />
      </svg>

      {/* Goal Number with glowing yellow text */}
      <span className="relative z-10 font-black font-mono text-amber-300 leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        {goals}
      </span>
    </span>
  );
};

