import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, AlertCircle, Clock, ShieldAlert, Scale } from 'lucide-react';

export function StatusBadge({ status }) {
  let badgeClass = 'badge-healthy';
  let icon = <CheckCircle size={14} />;

  if (status === 'CAUTION') {
    badgeClass = 'badge-caution';
    icon = <AlertTriangle size={14} />;
  } else if (status === 'POLLUTION RISK') {
    badgeClass = 'badge-pollution';
    icon = <AlertCircle size={14} />;
  } else if (status === 'CONFLICTING EVIDENCE') {
    badgeClass = 'badge-conflict';
    icon = <ShieldAlert size={14} />;
  } else if (status === 'INSUFFICIENT EVIDENCE') {
    badgeClass = 'badge-insufficient';
    icon = <HelpCircle size={14} />;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {icon} {status}
    </span>
  );
}

export function FreshnessBadge({ freshness }) {
  let cls = 'freshness-fresh';
  if (freshness === 'RECENT') cls = 'freshness-recent';
  if (freshness === 'STALE') cls = 'freshness-stale';
  if (freshness === 'MISSING') cls = 'freshness-missing';

  return (
    <span className={`freshness-badge ${cls}`}>
      <Clock size={10} style={{ display: 'inline', marginRight: '3px' }} />
      {freshness}
    </span>
  );
}

export function RiskGauge({ score, label = "Pollution Risk Score" }) {
  let color = '#10b981';
  if (score >= 60) color = '#ef4444';
  else if (score >= 35) color = '#f59e0b';

  return (
    <div>
      <div className="metric-row">
        <span className="metric-label">{label}</span>
        <span className="metric-value" style={{ color }}>{score} / 100</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${score}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
}

export function WhyThisResult({ reasoning = [], warnings = [] }) {
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)', marginTop: '1rem' }}>
      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38bdf8', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <HelpCircle size={16} /> WHY THIS RESULT?
      </h4>
      <ul style={{ paddingLeft: '1.25rem', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.6 }}>
        {reasoning.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '0.35rem' }}>{item}</li>
        ))}
      </ul>

      {warnings.length > 0 && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {warnings.map((w, idx) => (
            <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              ⚠ {w.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function StakeholderTradeoff({ locationName, healthStatus }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: '#f472b6', marginBottom: '0.75rem' }}>
        <Scale size={18} /> STAKEHOLDER DECISION TRADE-OFF
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <strong style={{ color: '#34d399', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
            COMMUNITY & ENVIRONMENTAL VIEW
          </strong>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Prioritizes precautionary protection. Any unverified pollution spike (even if evidence is stale or conflicting) warrants immediate public notice and field sampling to prevent ecological damage.
          </p>
        </div>

        <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <strong style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>
            MUNICIPAL AUTHORITY VIEW
          </strong>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
            Prioritizes evidence certainty before dispatching costly enforcement crews or halting local recycling waste processing, avoiding false-alarm operational disruptions.
          </p>
        </div>
      </div>
    </div>
  );
}
