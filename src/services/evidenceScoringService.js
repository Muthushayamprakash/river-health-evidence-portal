import { calculateFreshness } from './freshnessCalculator.js';
import { detectConflicts } from './conflictDetector.js';
import { calculateUncertaintyAndConfidence } from './uncertaintyCalculator.js';

export const DEFAULT_SOURCE_WEIGHTS = {
  'OPEN SENSOR': 0.40,
  'SATELLITE': 0.25,
  'CITIZEN OBSERVATION': 0.20,
  'VALIDATION RECORD': 0.15,
};

/**
 * Assesses evidence and produces river health evaluation metrics.
 * @param {Object} location Location metadata object
 * @param {Array} evidenceItems List of evidence items for this location
 * @param {Object} [customWeights] Optional custom source weights
 * @returns {Object} Complete evaluation result
 */
export function evaluateRiverHealth(location, evidenceItems = [], customWeights = DEFAULT_SOURCE_WEIGHTS) {
  const warnings = [];
  const reasoning = [];

  // 1. Process Freshness for each item
  const processedEvidence = evidenceItems.map(item => {
    const freshnessObj = calculateFreshness(item.timestamp);
    const calculatedFreshness = item.freshness || freshnessObj.status;
    return {
      ...item,
      freshness: calculatedFreshness,
      freshnessMultiplier: freshnessObj.multiplier,
      hoursElapsed: freshnessObj.hoursElapsed,
    };
  });

  // 2. Conflict Detection
  const conflictResult = detectConflicts(processedEvidence);
  if (conflictResult.hasConflict) {
    warnings.push('CONFLICTING_EVIDENCE_DETECTED');
    reasoning.push(conflictResult.conflictExplanation);
  }

  // 3. Uncertainty & Confidence Calculation
  const uncertaintyResult = calculateUncertaintyAndConfidence(processedEvidence, conflictResult);
  reasoning.push(...uncertaintyResult.explanations);

  // 4. Calculate Risk Score (0 - 100)
  let weightedRiskSum = 0;
  let totalActiveWeight = 0;

  processedEvidence.forEach(item => {
    if (item.value === null || item.freshness === 'MISSING') {
      warnings.push(`MISSING_${item.source_type.replace(/ /g, '_')}_DATA`);
      return;
    }

    if (item.freshness === 'STALE') {
      warnings.push(`STALE_${item.source_type.replace(/ /g, '_')}_DATA`);
    }

    const sourceWeight = customWeights[item.source_type] || 0.10;
    let itemRiskValue = 15; // default low risk
    if (item.risk_contribution === 'HIGH_RISK') itemRiskValue = 85;
    if (item.risk_contribution === 'MODERATE_RISK') itemRiskValue = 50;

    const effectiveWeight = sourceWeight * (item.reliability || 0.8) * item.freshnessMultiplier;
    weightedRiskSum += itemRiskValue * effectiveWeight;
    totalActiveWeight += effectiveWeight;

    // Build specific reasoning per active evidence item
    if (item.risk_contribution === 'HIGH_RISK') {
      reasoning.push(`${item.source_name} indicates elevated ${item.indicator} (${item.value} ${item.unit}).`);
    } else if (item.risk_contribution === 'LOW_RISK') {
      reasoning.push(`${item.source_name} indicates acceptable ${item.indicator} (${item.value} ${item.unit}).`);
    }
  });

  let riskScore = 15;
  if (totalActiveWeight > 0) {
    riskScore = Math.round(weightedRiskSum / totalActiveWeight);
  }

  // 5. Determine Health Classification
  let healthStatus = 'HEALTHY';
  const activeSourcesCount = processedEvidence.filter(e => e.value !== null && e.freshness !== 'MISSING').length;

  if (activeSourcesCount <= 1 || uncertaintyResult.dataCompleteness <= 25) {
    healthStatus = 'INSUFFICIENT EVIDENCE';
    reasoning.unshift('Insufficient evidence sources available to reliably classify river health.');
  } else if (conflictResult.hasConflict) {
    healthStatus = 'CONFLICTING EVIDENCE';
    reasoning.unshift('Available evidence sources disagree on pollution levels; manual field verification required.');
  } else if (riskScore >= 60) {
    healthStatus = 'POLLUTION RISK';
    reasoning.unshift('Multiple evidence signals indicate elevated environmental pollution risk.');
  } else if (riskScore >= 35 || warnings.some(w => w.startsWith('STALE_') || w.startsWith('MISSING_'))) {
    healthStatus = 'CAUTION';
    reasoning.unshift('River parameters exhibit minor risk elevation or reduced confidence due to stale/missing telemetry.');
  } else {
    healthStatus = 'HEALTHY';
    reasoning.unshift('Environmental evidence indicates healthy river conditions within safe operational thresholds.');
  }

  // Deduplicate warnings
  const uniqueWarnings = [...new Set(warnings)];

  return {
    location_id: location.id,
    location_name: location.name,
    scenario: location.scenario,
    health_status: healthStatus,
    risk_score: riskScore,
    confidence: uncertaintyResult.confidence,
    uncertainty: uncertaintyResult.uncertainty,
    data_completeness: uncertaintyResult.dataCompleteness,
    has_conflict: conflictResult.hasConflict,
    conflict_details: conflictResult,
    reasoning,
    warnings: uniqueWarnings,
    evidence_items: processedEvidence,
  };
}
