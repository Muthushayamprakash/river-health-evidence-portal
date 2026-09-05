/**
 * Freshness Engine
 * Configurable thresholds for evaluating evidence freshness.
 * Rules:
 * - FRESH: < 24 hours old (Multiplier: 1.0)
 * - RECENT: 24 - 72 hours old (Multiplier: 0.75)
 * - STALE: > 72 hours old (Multiplier: 0.4)
 * - MISSING: no timestamp or null value (Multiplier: 0.0)
 */

export const FRESHNESS_THRESHOLDS = {
  FRESH_MAX_HOURS: 24,
  RECENT_MAX_HOURS: 72,
};

export const FRESHNESS_MULTIPLIERS = {
  FRESH: 1.0,
  RECENT: 0.75,
  STALE: 0.4,
  MISSING: 0.0,
};

/**
 * Calculates freshness status and hours elapsed for an evidence item.
 * @param {string|null} timestamp - ISO timestamp string or null
 * @param {Date} [referenceDate] - Reference date for comparison (default now: 2026-09-05T11:00:00Z)
 * @returns {{ status: 'FRESH'|'RECENT'|'STALE'|'MISSING', hoursElapsed: number|null, multiplier: number }}
 */
export function calculateFreshness(timestamp, referenceDate = new Date('2026-09-05T11:00:00Z')) {
  if (!timestamp) {
    return {
      status: 'MISSING',
      hoursElapsed: null,
      multiplier: FRESHNESS_MULTIPLIERS.MISSING,
    };
  }

  const itemTime = new Date(timestamp);
  if (isNaN(itemTime.getTime())) {
    return {
      status: 'MISSING',
      hoursElapsed: null,
      multiplier: FRESHNESS_MULTIPLIERS.MISSING,
    };
  }

  const diffMs = referenceDate.getTime() - itemTime.getTime();
  const hoursElapsed = Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));

  if (hoursElapsed < FRESHNESS_THRESHOLDS.FRESH_MAX_HOURS) {
    return {
      status: 'FRESH',
      hoursElapsed,
      multiplier: FRESHNESS_MULTIPLIERS.FRESH,
    };
  } else if (hoursElapsed <= FRESHNESS_THRESHOLDS.RECENT_MAX_HOURS) {
    return {
      status: 'RECENT',
      hoursElapsed,
      multiplier: FRESHNESS_MULTIPLIERS.RECENT,
    };
  } else {
    return {
      status: 'STALE',
      hoursElapsed,
      multiplier: FRESHNESS_MULTIPLIERS.STALE,
    };
  }
}
