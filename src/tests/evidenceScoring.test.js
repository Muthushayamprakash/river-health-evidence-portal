import { describe, it, expect } from 'vitest';
import { evaluateRiverHealth } from '../services/evidenceScoringService.js';
import locationsData from '../../data/locations.json';
import currentEvidenceData from '../../data/current_evidence.json';

describe('Evidence Scoring Service - 5 Scenario Benchmarks', () => {
  it('Scenario 1: LOC-101 (Healthy) -> HEALTHY status', () => {
    const loc = locationsData.find(l => l.id === 'LOC-101');
    const evidence = currentEvidenceData.filter(e => e.location_id === 'LOC-101');
    const res = evaluateRiverHealth(loc, evidence);

    expect(res.health_status).toBe('HEALTHY');
    expect(res.confidence).toBeGreaterThanOrEqual(80);
    expect(res.has_conflict).toBe(false);
    expect(res.reasoning.length).toBeGreaterThan(0);
  });

  it('Scenario 2: LOC-102 (Conflicting Evidence) -> CONFLICTING EVIDENCE status', () => {
    const loc = locationsData.find(l => l.id === 'LOC-102');
    const evidence = currentEvidenceData.filter(e => e.location_id === 'LOC-102');
    const res = evaluateRiverHealth(loc, evidence);

    expect(res.health_status).toBe('CONFLICTING EVIDENCE');
    expect(res.has_conflict).toBe(true);
    expect(res.warnings).toContain('CONFLICTING_EVIDENCE_DETECTED');
  });

  it('Scenario 3: LOC-103 (Stale + Polluted) -> POLLUTION RISK status with stale warnings', () => {
    const loc = locationsData.find(l => l.id === 'LOC-103');
    const evidence = currentEvidenceData.filter(e => e.location_id === 'LOC-103');
    const res = evaluateRiverHealth(loc, evidence);

    expect(['POLLUTION RISK', 'CAUTION']).toContain(res.health_status);
    expect(res.warnings.some(w => w.startsWith('STALE_'))).toBe(true);
  });

  it('Scenario 4: LOC-104 (Missing Sensor Field) -> CAUTION status with missing field warning', () => {
    const loc = locationsData.find(l => l.id === 'LOC-104');
    const evidence = currentEvidenceData.filter(e => e.location_id === 'LOC-104');
    const res = evaluateRiverHealth(loc, evidence);

    expect(res.health_status).toBe('CAUTION');
    expect(res.warnings.some(w => w.includes('MISSING'))).toBe(true);
    expect(res.data_completeness).toBeLessThan(100);
  });

  it('Scenario 5: LOC-105 (Multiple Missing Sources) -> INSUFFICIENT EVIDENCE status', () => {
    const loc = locationsData.find(l => l.id === 'LOC-105');
    const evidence = currentEvidenceData.filter(e => e.location_id === 'LOC-105');
    const res = evaluateRiverHealth(loc, evidence);

    expect(res.health_status).toBe('INSUFFICIENT EVIDENCE');
    expect(res.confidence).toBeLessThan(50);
    expect(res.uncertainty).toBeGreaterThan(45);
    expect(res.data_completeness).toBeLessThanOrEqual(25);
  });
});
