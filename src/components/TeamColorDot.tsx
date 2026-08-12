import React from 'react';
import { Team } from '../types';

export const TEAM_COLOR_MAP: Record<string, { bg: string; dotHex: string; border: string; text: string; emoji: string }> = {
  AZUL: { bg: 'bg-blue-600', dotHex: '#2563eb', border: 'border-blue-400', text: 'text-blue-300', emoji: '🔹' },
  VERDE: { bg: 'bg-emerald-600', dotHex: '#16a34a', border: 'border-emerald-400', text: 'text-emerald-300', emoji: '🟢' },
  NEGRO: { bg: 'bg-zinc-900', dotHex: '#18181b', border: 'border-zinc-500', text: 'text-zinc-300', emoji: '⬛' },
  NARANJA: { bg: 'bg-orange-600', dotHex: '#ea580c', border: 'border-orange-400', text: 'text-orange-300', emoji: '🟧' },
  RAYADO: { bg: 'bg-purple-700', dotHex: '#9333ea', border: 'border-purple-400', text: 'text-purple-300', emoji: '🟣' },
  ROJO: { bg: 'bg-red-600', dotHex: '#dc2626', border: 'border-red-400', text: 'text-red-300', emoji: '🔴' },
  AMARILLO: { bg: 'bg-yellow-500', dotHex: '#eab308', border: 'border-yellow-300', text: 'text-yellow-300', emoji: '🟡' },
  BLANCO: { bg: 'bg-slate-100', dotHex: '#f8fafc', border: 'border-slate-400', text: 'text-slate-100', emoji: '⚪' },
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

  const dotSizeClass =
    size === 'sm'
      ? 'w-2.5 h-2.5'
      : size === 'lg'
      ? 'w-4 h-4'
      : 'w-3 h-3';

  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      <span
        className={`${dotSizeClass} rounded-full shrink-0 shadow-sm border border-white/20`}
        style={{
          backgroundColor: hex,
          boxShadow: `0 0 6px ${hex}80`,
        }}
      />
      {showName && (
        <span className={`font-bold truncate ${info?.text || 'text-slate-200'}`}>
          {name}
        </span>
      )}
    </span>
  );
};

export const CardIconVector: React.FC<{ type: 'AMARILLA' | 'AZUL' | 'ROJA' | string; className?: string }> = ({
  type,
  className = 'w-3 h-4 inline-block',
}) => {
  if (type === 'AMARILLA') {
    return (
      <span
        className={`inline-block rounded-xs bg-amber-400 border border-amber-300 shadow-xs shrink-0 ${className}`}
        title="Tarjeta Amarilla"
      />
    );
  }
  if (type === 'AZUL') {
    return (
      <span
        className={`inline-block rounded-xs bg-cyan-400 border border-cyan-300 shadow-xs shrink-0 ${className}`}
        title="Tarjeta Azul"
      />
    );
  }
  return (
    <span
      className={`inline-block rounded-xs bg-rose-600 border border-rose-400 shadow-xs shrink-0 ${className}`}
      title="Tarjeta Roja"
    />
  );
};
