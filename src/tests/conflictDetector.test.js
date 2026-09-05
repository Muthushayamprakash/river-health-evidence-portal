import { describe, it, expect } from 'vitest';
import { detectConflicts } from '../services/conflictDetector.js';

describe('Conflict Detector Service', () => {
  it('should detect conflict when Sensor indicates HIGH_RISK and Satellite indicates LOW_RISK', () => {
    const evidence = [
      {
        source_type: 'OPEN SENSOR',
        source_name: 'Sensor 1',
        indicator: 'Turbidity',
        value: 88,
        unit: 'NTU',
        risk_contribution: 'HIGH_RISK',
        freshness: 'FRESH'
      },
      {
        source_type: 'SATELLITE',
        source_name: 'Satellite 1',
        indicator: 'Chlorophyll-a',
        value: 0.08,
        unit: 'index',
        risk_contribution: 'LOW_RISK',
        freshness: 'FRESH'
      }
    ];

    const result = detectConflicts(evidence);
    expect(result.hasConflict).toBe(true);
    expect(result.conflictExplanation).toContain('Significant disagreement detected');
    expect(result.conflictingSources.length).toBe(2);
  });

  it('should return no conflict when all active sources agree on LOW_RISK', () => {
    const evidence = [
      { source_type: 'OPEN SENSOR', risk_contribution: 'LOW_RISK', value: 12, freshness: 'FRESH' },
      { source_type: 'SATELLITE', risk_contribution: 'LOW_RISK', value: 0.12, freshness: 'FRESH' }
    ];

    const result = detectConflicts(evidence);
    expect(result.hasConflict).toBe(false);
    expect(result.conflictExplanation).toBeNull();
  });
});
