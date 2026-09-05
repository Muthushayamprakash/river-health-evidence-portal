import { describe, it, expect } from 'vitest';
import { calculateUncertaintyAndConfidence } from '../services/uncertaintyCalculator.js';

describe('Uncertainty & Confidence Engine', () => {
  it('should calculate high confidence (85-100%) and low uncertainty when all 4 sources present, fresh, and agreeing', () => {
    const evidence = [
      { source_type: 'OPEN SENSOR', freshness: 'FRESH', reliability: 0.95, value: 7.8 },
      { source_type: 'SATELLITE', freshness: 'FRESH', reliability: 0.88, value: 0.12 },
      { source_type: 'CITIZEN OBSERVATION', freshness: 'FRESH', reliability: 0.85, value: 'Clear' },
      { source_type: 'VALIDATION RECORD', freshness: 'FRESH', reliability: 0.98, value: 2.4 }
    ];

    const res = calculateUncertaintyAndConfidence(evidence, { hasConflict: false });
    expect(res.dataCompleteness).toBe(100);
    expect(res.confidence).toBeGreaterThanOrEqual(85);
    expect(res.uncertainty).toBeLessThanOrEqual(15);
  });

  it('should significantly reduce confidence when 3 out of 4 sources are MISSING', () => {
    const evidence = [
      { source_type: 'OPEN SENSOR', freshness: 'FRESH', reliability: 0.90, value: 6.1 },
      { source_type: 'SATELLITE', freshness: 'MISSING', value: null },
      { source_type: 'CITIZEN OBSERVATION', freshness: 'MISSING', value: null },
      { source_type: 'VALIDATION RECORD', freshness: 'MISSING', value: null }
    ];

    const res = calculateUncertaintyAndConfidence(evidence, { hasConflict: false });
    expect(res.dataCompleteness).toBe(25);
    expect(res.confidence).toBeLessThan(50);
    expect(res.uncertainty).toBeGreaterThan(40);
    expect(res.explanations.some(e => e.includes('Missing 3 core source type(s)'))).toBe(true);
  });

  it('should penalize confidence when sources are STALE and conflicting', () => {
    const evidence = [
      { source_type: 'OPEN SENSOR', freshness: 'STALE', reliability: 0.65, value: 185 },
      { source_type: 'SATELLITE', freshness: 'STALE', reliability: 0.70, value: 62 },
      { source_type: 'CITIZEN OBSERVATION', freshness: 'STALE', reliability: 0.80, value: 'Foam' }
    ];

    const res = calculateUncertaintyAndConfidence(evidence, { hasConflict: true });
    expect(res.confidence).toBeLessThan(65);
    expect(res.explanations.some(e => e.includes('STALE'))).toBe(true);
    expect(res.explanations.some(e => e.includes('Contradictory evidence detected'))).toBe(true);
  });
});
