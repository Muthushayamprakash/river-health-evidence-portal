import { describe, it, expect } from 'vitest';
import { calculateFreshness } from '../services/freshnessCalculator.js';

describe('Freshness Calculator Engine', () => {
  const refDate = new Date('2026-09-05T11:00:00Z');

  it('should flag timestamp < 24h as FRESH', () => {
    const timestamp = '2026-09-05T08:00:00Z'; // 3 hours ago
    const res = calculateFreshness(timestamp, refDate);
    expect(res.status).toBe('FRESH');
    expect(res.multiplier).toBe(1.0);
    expect(res.hoursElapsed).toBe(3);
  });

  it('should flag timestamp between 24h and 72h as RECENT', () => {
    const timestamp = '2026-09-04T09:00:00Z'; // 26 hours ago
    const res = calculateFreshness(timestamp, refDate);
    expect(res.status).toBe('RECENT');
    expect(res.multiplier).toBe(0.75);
    expect(res.hoursElapsed).toBe(26);
  });

  it('should flag timestamp > 72h as STALE', () => {
    const timestamp = '2026-08-30T09:00:00Z'; // 6 days ago
    const res = calculateFreshness(timestamp, refDate);
    expect(res.status).toBe('STALE');
    expect(res.multiplier).toBe(0.4);
    expect(res.hoursElapsed).toBeGreaterThan(72);
  });

  it('should handle null or missing timestamp as MISSING', () => {
    const res = calculateFreshness(null, refDate);
    expect(res.status).toBe('MISSING');
    expect(res.multiplier).toBe(0.0);
    expect(res.hoursElapsed).toBeNull();
  });
});
