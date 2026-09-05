/**
 * Uncertainty Quantification Engine
 * Deterministic mathematical calculation of Confidence %, Uncertainty (±%), and Data Completeness %.
 * Formula documented in docs/algorithm.md
 */

export const CORE_SOURCE_TYPES = [
  'OPEN SENSOR',
  'SATELLITE',
  'CITIZEN OBSERVATION',
  'VALIDATION RECORD',
];

/**
 * Calculates completeness, confidence, and uncertainty metrics for evidence records.
 * @param {Array} evidenceItems List of evidence items for a location
 * @param {Object} conflictResult Result from detectConflicts()
 * @returns {{ confidence: number, uncertainty: number, dataCompleteness: number, explanations: Array<string> }}
 */
export function calculateUncertaintyAndConfidence(evidenceItems = [], conflictResult = {}) {
  const explanations = [];

  // 1. Calculate Data Completeness
  const presentSourceTypes = new Set(
    evidenceItems
      .filter(item => item.value !== null && item.freshness !== 'MISSING')
      .map(item => item.source_type)
  );

  const missingSourceTypes = CORE_SOURCE_TYPES.filter(type => !presentSourceTypes.has(type));
  const dataCompleteness = Math.round((presentSourceTypes.size / CORE_SOURCE_TYPES.length) * 100);

  if (missingSourceTypes.length > 0) {
    explanations.push(`Missing ${missingSourceTypes.length} core source type(s): ${missingSourceTypes.join(', ')}.`);
  }

  // 2. Average Reliability of Present Sources
  const activeItems = evidenceItems.filter(item => item.value !== null && item.freshness !== 'MISSING');
  let avgReliability = 0.5;
  if (activeItems.length > 0) {
    const sumReliability = activeItems.reduce((acc, item) => acc + (item.reliability || 0.5), 0);
    avgReliability = sumReliability / activeItems.length;
  }

  if (avgReliability < 0.75) {
    explanations.push(`Average source reliability is low (${Math.round(avgReliability * 100)}%).`);
  }

  // 3. Staleness Penalty
  let staleCount = 0;
  activeItems.forEach(item => {
    if (item.freshness === 'STALE') staleCount++;
  });

  const staleRatio = activeItems.length > 0 ? staleCount / activeItems.length : 1;
  const stalenessPenalty = Math.round(staleRatio * 30); // up to 30% reduction

  if (staleCount > 0) {
    explanations.push(`${staleCount} evidence source(s) are STALE (>72h old), reducing confidence.`);
  }

  // 4. Missing Sources Penalty
  const missingPenalty = Math.round((missingSourceTypes.length / CORE_SOURCE_TYPES.length) * 45);

  // 5. Conflict Penalty
  let conflictPenalty = 0;
  if (conflictResult && conflictResult.hasConflict) {
    conflictPenalty = 22;
    explanations.push(`Contradictory evidence detected between sources (-22% confidence penalty).`);
  }

  // 6. Calculate Confidence %
  // Base starts from completeness * avgReliability, then subtract penalties
  const rawBaseConfidence = (dataCompleteness * avgReliability);
  let confidence = Math.round(rawBaseConfidence - stalenessPenalty - conflictPenalty);

  // Ensure bounds
  confidence = Math.max(15, Math.min(98, confidence));

  // 7. Calculate Deterministic Uncertainty (± %)
  // Uncertainty rises with missing data, staleness, conflicts, and lower confidence
  let rawUncertainty = Math.round(
    ((100 - confidence) * 0.55) +
    (stalenessPenalty * 0.4) +
    (conflictPenalty * 0.5) +
    (missingSourceTypes.length * 5)
  );

  const uncertainty = Math.max(5, Math.min(75, rawUncertainty));

  if (explanations.length === 0) {
    explanations.push('All expected evidence sources are fresh, verified, and in agreement.');
  }

  return {
    confidence,
    uncertainty,
    dataCompleteness,
    explanations,
  };
}
