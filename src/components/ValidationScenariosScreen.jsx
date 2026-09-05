import React from 'react';
import { StatusBadge, FreshnessBadge } from './UIWidgets.jsx';
import { Award, CheckCircle, ShieldAlert, Clock, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

export default function ValidationScenariosScreen({ assessments, onSelectLocation }) {
  const scenariosList = [
    {
      id: 'LOC-101',
      scenarioNum: '01',
      name: 'Healthy Scenario',
      tag: 'HEALTHY',
      icon: <CheckCircle size={22} color="#10b981" />,
      desc: 'All 4 evidence sources (Open Sensor, Satellite, Citizen, Validation) are fresh (<24h), verified, and in agreement.',
      expected: 'Status: HEALTHY • High Confidence (85-100%) • Low Uncertainty (0-15%)'
    },
    {
      id: 'LOC-102',
      scenarioNum: '02',
      name: 'Conflicting Evidence Scenario',
      tag: 'CONFLICTING EVIDENCE',
      icon: <ShieldAlert size={22} color="#a855f7" />,
      desc: 'Submerged sensor reports hypoxic turbidity discharge while optical satellite reports clear surface reflectance due to sun glint.',
      expected: 'Status: CONFLICTING EVIDENCE • Disagreement Flagged • Confidence Penalized'
    },
    {
      id: 'LOC-103',
      scenarioNum: '03',
      name: 'Stale + Polluted Scenario',
      tag: 'STALE + POLLUTED',
      icon: <Clock size={22} color="#f59e0b" />,
      desc: 'High toxic chemical load recorded, but telemetry timestamp is >72 hours old (6 days ago).',
      expected: 'Status: POLLUTION RISK / CAUTION • Explicit STALE Badge • Confidence Penalty'
    },
    {
      id: 'LOC-104',
      scenarioNum: '04',
      name: 'Missing Sensor Field Scenario',
      tag: 'MISSING SENSOR FIELD',
      icon: <AlertTriangle size={22} color="#f59e0b" />,
      desc: 'Water Temperature thermistor probe is faulty and returns null, while other sensors remain operational.',
      expected: 'Status: CAUTION • Explicit MISSING Badge for Temp • Reduced Confidence'
    },
    {
      id: 'LOC-105',
      scenarioNum: '05',
      name: 'Multiple Missing Sources Scenario',
      tag: 'MULTIPLE MISSING SOURCES',
      icon: <HelpCircle size={22} color="#64748b" />,
      desc: 'Satellite, Citizen reports, and formal lab validation records are all missing for remote canal section.',
      expected: 'Status: INSUFFICIENT EVIDENCE • Completeness ≤ 25% • High Uncertainty (55-85%)'
    }
  ];

  return (
    <div>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(15, 23, 42, 0.9))', padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.4)', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          <Award size={14} /> AI EVALUATOR REVIEW-1 DEMO CONSOLE
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>
          5 Deterministic Test Scenarios
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '800px' }}>
          Directly verify edge-case handling, conflict detection, freshness penalties, missing-data handling, and uncertainty quantification. Click any scenario button to load the live evaluation.
        </p>
      </div>

      {/* Scenario Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {scenariosList.map(sc => {
          const evalResult = assessments.find(a => a.location_id === sc.id);

          return (
            <div key={sc.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', borderLeft: '4px solid #a855f7' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '300px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '12px' }}>
                  {sc.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#c084fc' }}>SCENARIO {sc.scenarioNum}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: '0.1rem 0 0.3rem' }}>{sc.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{sc.desc}</p>
                  <div style={{ fontSize: '0.8rem', color: '#e2e8f0', background: 'rgba(0, 0, 0, 0.3)', padding: '0.4rem 0.75rem', borderRadius: '6px', display: 'inline-block' }}>
                    🎯 <strong>Expected Behavior:</strong> {sc.expected}
                  </div>
                </div>
              </div>

              {evalResult && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>LIVE SCORING RESULT</div>
                    <div style={{ marginTop: '0.2rem' }}><StatusBadge status={evalResult.health_status} /></div>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.35rem' }}>
                      Conf: <strong>{evalResult.confidence}%</strong> | Uncert: <strong>±{evalResult.uncertainty}%</strong>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={() => onSelectLocation(sc.id)}>
                    Test Scenario <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
