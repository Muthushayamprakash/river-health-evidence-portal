/**
 * Conflict Detector Service
 * Detects disagreements between different evidence sources (Sensor, Satellite, Citizen, Validation).
 * Prevents "averaging away" environmental anomalies.
 */

/**
 * Detects conflicts among evidence items for a given location.
 * @param {Array} evidenceItems List of evidence objects for a location
 * @returns {{ hasConflict: boolean, conflictSeverity: number, conflictExplanation: string|null, conflictingSources: Array }}
 */
export function detectConflicts(evidenceItems = []) {
  const activeItems = evidenceItems.filter(item => item.value !== null && item.freshness !== 'MISSING');

  if (activeItems.length < 2) {
    return {
      hasConflict: false,
      conflictSeverity: 0,
      conflictExplanation: null,
      conflictingSources: [],
    };
  }

  const highRiskSources = [];
  const lowRiskSources = [];

  activeItems.forEach(item => {
    if (item.risk_contribution === 'HIGH_RISK') {
      highRiskSources.push({
        source_type: item.source_type,
        source_name: item.source_name,
        indicator: item.indicator,
        value: item.value,
        unit: item.unit,
      });
    } else if (item.risk_contribution === 'LOW_RISK') {
      lowRiskSources.push({
        source_type: item.source_type,
        source_name: item.source_name,
        indicator: item.indicator,
        value: item.value,
        unit: item.unit,
      });
    }
  });

  const hasConflict = highRiskSources.length > 0 && lowRiskSources.length > 0;

  if (!hasConflict) {
    return {
      hasConflict: false,
      conflictSeverity: 0,
      conflictExplanation: null,
      conflictingSources: [],
    };
  }

  // Conflict Severity depends on the contrast of primary evidence categories (e.g. Open Sensor vs Satellite)
  const highTypes = [...new Set(highRiskSources.map(s => s.source_type))];
  const lowTypes = [...new Set(lowRiskSources.map(s => s.source_type))];

  const conflictSeverity = Math.min(1.0, 0.4 + (highRiskSources.length + lowRiskSources.length) * 0.15);

  const highSummary = highRiskSources.map(s => `${s.source_type} (${s.indicator}: ${s.value} ${s.unit})`).join(', ');
  const lowSummary = lowRiskSources.map(s => `${s.source_type} (${s.indicator}: ${s.value} ${s.unit})`).join(', ');

  const conflictExplanation = `Significant disagreement detected: [High Risk Signals: ${highSummary}] vs [Low Risk Signals: ${lowSummary}]. Users should inspect individual source limitations before reaching a conclusion.`;

  return {
    hasConflict: true,
    conflictSeverity,
    conflictExplanation,
    conflictingSources: [
      { category: 'HIGH_RISK_SIGNALS', sources: highRiskSources },
      { category: 'LOW_RISK_SIGNALS', sources: lowRiskSources },
    ],
  };
}
