import { z } from 'zod';

// Team ID enum schema
export const TeamIdSchema = z.enum([
  'AZUL',
  'AMARILLO',
  'NARANJA',
  'NEGRO',
  'BLANCO',
  'ROJO',
  'RAYADO',
  'VERDE',
]);

// Card Type schema
export const CardTypeSchema = z.enum(['AMARILLA', 'AZUL', 'ROJA']);

// Match Status schema
export const MatchStatusSchema = z.enum(['PROGRAMADO', 'EN_VIVO', 'FINALIZADO']);

// Team Schema
export const TeamSchema = z.object({
  id: TeamIdSchema,
  name: z.string().min(1, 'El nombre del equipo no puede estar vacío'),
  colorHex: z.string().default('#3b82f6'),
  badgeBg: z.string().default('bg-slate-800'),
  badgeText: z.string().default('text-white'),
  badgeBorder: z.string().default('border-slate-700'),
  delegate: z.string().optional(),
});

// Player Schema
export const PlayerSchema = z.object({
  id: z.number().int().positive('ID de jugador inválido'),
  name: z.string().min(1, 'Nombre de jugador requerido'),
  teamId: TeamIdSchema,
  dorsal: z.number().int().min(0, 'Dorsal debe ser mayor o igual a 0'),
  position: z.string().optional(),
  photoUrl: z.string().optional(),
});

// Card Record Schema
export const CardRecordSchema = z.object({
  id: z.string().min(1),
  playerId: z.number().int().positive(),
  fecha: z.number().int().min(1),
  type: CardTypeSchema,
  timestamp: z.string().optional(),
});

// Goal Record Schema
export const GoalRecordSchema = z.object({
  id: z.string().min(1),
  playerId: z.number().int().positive(),
  fecha: z.number().int().min(1),
  teamId: TeamIdSchema,
  timestamp: z.string().optional(),
});

// Attendance Record Schema
export const AttendanceRecordSchema = z.object({
  homePlayerIds: z.array(z.number().int()).default([]),
  awayPlayerIds: z.array(z.number().int()).default([]),
}).optional();

// Match Schema
export const MatchSchema = z.object({
  id: z.string().min(1, 'ID de partido requerido'),
  fecha: z.number().int().min(1, 'Número de fecha inválido'),
  homeTeamId: TeamIdSchema,
  awayTeamId: TeamIdSchema,
  homeGoals: z.number().int().min(0, 'Goles no pueden ser negativos'),
  awayGoals: z.number().int().min(0, 'Goles no pueden ser negativos'),
  isPlayed: z.boolean().default(false),
  status: MatchStatusSchema.optional().default('PROGRAMADO'),
  dateStr: z.string().optional(),
  timeRange: z.string().optional(),
  attendance: AttendanceRecordSchema,
});

// Tournament Backup JSON Schema
export const BackupJSONSchema = z.object({
  players: z.array(PlayerSchema),
  cards: z.array(CardRecordSchema),
  goals: z.array(GoalRecordSchema),
  matches: z.array(MatchSchema),
  currentFecha: z.number().int().min(1).default(1),
  isEditMode: z.boolean().optional().default(false),
});

// Type inferences
export type ValidatedMatch = z.infer<typeof MatchSchema>;
export type ValidatedBackup = z.infer<typeof BackupJSONSchema>;

export type ValidationResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };

/**
 * Validates match data prior to saving score or status changes
 */
export function validateMatchData(data: unknown): ValidationResult<ValidatedMatch> {
  const result = MatchSchema.safeParse(data);
  if (!result.success) {
    const issueMessages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    return { success: false, error: `Inconsistencia en datos del partido: ${issueMessages}` };
  }
  return { success: true, data: result.data };
}

/**
 * Validates complete tournament backup JSON structure prior to import or export
 */
export function validateBackupJSONData(data: unknown): ValidationResult<ValidatedBackup> {
  const result = BackupJSONSchema.safeParse(data);
  if (!result.success) {
    const issueMessages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).slice(0, 3).join('; ');
    return { success: false, error: `El archivo JSON no cumple con el formato oficial: ${issueMessages}` };
  }
  return { success: true, data: result.data };
}
