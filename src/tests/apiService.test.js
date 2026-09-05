import { describe, it, expect } from 'vitest';
import { apiService } from '../services/apiService.js';

describe('API Service (Prototype Integration Stub)', () => {
  it('should fetch all 5 locations via GET /api/locations', async () => {
    const locations = await apiService.getLocations();
    expect(locations.length).toBe(5);
  });

  it('should fetch evidence by location ID via GET /api/evidence/:locationId', async () => {
    const evidence = await apiService.getEvidenceByLocation('LOC-101');
    expect(evidence.length).toBe(5);
  });

  it('should calculate health metrics via GET /api/health/:locationId', async () => {
    const health = await apiService.getHealthByLocation('LOC-101');
    expect(health.location_id).toBe('LOC-101');
    expect(health.health_status).toBe('HEALTHY');
  });

  it('should record an evidence challenge via POST /api/challenges', async () => {
    const response = await apiService.submitChallenge({
      location_id: 'LOC-102',
      evidence_id: 'EVD-102-1',
      reporter_role: 'COMMUNITY_USER',
      reason: 'Turbidity sensor reading questionable due to foam entrapment',
      comment: 'Observed white chemical foam wrapping around sensor probe body.'
    });

    expect(response.success).toBe(true);
    expect(response.challenge.challenge_id).toBeDefined();

    const challenges = await apiService.getChallenges();
    expect(challenges.some(c => c.reason.includes('foam entrapment'))).toBe(true);
  });
});
