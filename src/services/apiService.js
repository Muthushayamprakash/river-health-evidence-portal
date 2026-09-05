import locationsData from '../../data/locations.json';
import currentEvidenceData from '../../data/current_evidence.json';
import validationDataset from '../../data/validation_dataset.json';
import { evaluateRiverHealth } from './evidenceScoringService.js';

/**
 * Prototype Integration Stub
 * Simulates REST API calls with async latency for the River Health Portal.
 */

// In-memory persistent challenge store for Review-1 demo
let challengesStore = [
  {
    challenge_id: "CHAL-001",
    location_id: "LOC-102",
    evidence_id: "EVD-102-3",
    reporter_role: "COMMUNITY_USER",
    reason: "Satellite Optical Reflectance underestimating surface sludge",
    comment: "Sun glint reflection error from shallow water during low tide morning pass.",
    timestamp: "2026-09-05T10:30:00Z",
    status: "UNDER_REVIEW"
  }
];

export const apiService = {
  /**
   * GET /api/locations
   * Retrieves all monitoring locations.
   */
  async getLocations() {
    await simulateNetworkLatency(50);
    return locationsData;
  },

  /**
   * GET /api/evidence
   * Retrieves all current evidence records.
   */
  async getEvidence() {
    await simulateNetworkLatency(50);
    return currentEvidenceData;
  },

  /**
   * GET /api/evidence/:locationId
   * Retrieves evidence records for a specific location.
   */
  async getEvidenceByLocation(locationId) {
    await simulateNetworkLatency(50);
    return currentEvidenceData.filter(e => e.location_id === locationId);
  },

  /**
   * GET /api/health/:locationId
   * Calculates and returns evaluated river health metrics for a location.
   */
  async getHealthByLocation(locationId) {
    await simulateNetworkLatency(60);
    const location = locationsData.find(l => l.id === locationId);
    if (!location) {
      throw new Error(`Location ${locationId} not found`);
    }
    const evidence = currentEvidenceData.filter(e => e.location_id === locationId);
    return evaluateRiverHealth(location, evidence);
  },

  /**
   * GET /api/health (All Locations Evaluated)
   * Evaluates all locations.
   */
  async getAllHealthAssessments() {
    await simulateNetworkLatency(80);
    return locationsData.map(loc => {
      const evidence = currentEvidenceData.filter(e => e.location_id === loc.id);
      return evaluateRiverHealth(loc, evidence);
    });
  },

  /**
   * GET /api/validation
   * Retrieves benchmark validation dataset.
   */
  async getValidationDataset() {
    await simulateNetworkLatency(40);
    return validationDataset;
  },

  /**
   * GET /api/challenges
   * Retrieves recorded evidence challenges.
   */
  async getChallenges() {
    await simulateNetworkLatency(30);
    return challengesStore;
  },

  /**
   * POST /api/challenges
   * Records a community evidence challenge.
   */
  async submitChallenge({ location_id, evidence_id, reporter_role = 'COMMUNITY_USER', reason, comment }) {
    await simulateNetworkLatency(100);
    const newChallenge = {
      challenge_id: `CHAL-${String(challengesStore.length + 1).padStart(3, '0')}`,
      location_id,
      evidence_id,
      reporter_role,
      reason,
      comment: comment || '',
      timestamp: new Date().toISOString(),
      status: 'RECORDED_UNDER_REVIEW',
    };
    challengesStore.push(newChallenge);
    return {
      success: true,
      message: 'Prototype Evidence Challenge Workflow: Challenge successfully recorded.',
      challenge: newChallenge,
    };
  }
};

function simulateNetworkLatency(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
