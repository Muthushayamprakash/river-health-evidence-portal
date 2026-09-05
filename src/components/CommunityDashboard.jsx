import React, { useState } from 'react';
import { StatusBadge, FreshnessBadge, RiskGauge } from './UIWidgets.jsx';
import { Search, Filter, ShieldAlert, Eye, MessageSquarePlus, RefreshCw } from 'lucide-react';

export default function CommunityDashboard({ assessments, onSelectLocation, onOpenChallenge }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = assessments.filter(item => {
    const matchesSearch = item.location_name.toLowerCase().includes(search.toLowerCase()) ||
                          item.scenario.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === 'ALL' || item.health_status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ROLE: COMMUNITY USER
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>
            Community River-Health Dashboard
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Transparent environmental evidence, risk assessment, uncertainty quantification, and community challenge workflow.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search sector or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                color: 'white',
                fontSize: '0.85rem',
                width: '220px',
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              color: 'white',
              fontSize: '0.85rem',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="HEALTHY">Healthy</option>
            <option value="CAUTION">Caution</option>
            <option value="POLLUTION RISK">Pollution Risk</option>
            <option value="CONFLICTING EVIDENCE">Conflicting Evidence</option>
            <option value="INSUFFICIENT EVIDENCE">Insufficient Evidence</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="card-grid">
        {filtered.map(assessment => (
          <div key={assessment.location_id} className="glass-card">
            <div className="card-header">
              <div>
                <span className="card-sub" style={{ color: '#38bdf8', fontWeight: '700' }}>{assessment.location_id} • {assessment.scenario}</span>
                <h3 className="card-title" style={{ marginTop: '0.2rem' }}>{assessment.location_name}</h3>
              </div>
              <StatusBadge status={assessment.health_status} />
            </div>

            <div style={{ margin: '1rem 0' }}>
              <RiskGauge score={assessment.risk_score} />
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CONFIDENCE</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#38bdf8' }}>{assessment.confidence}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>UNCERTAINTY</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f43f5e' }}>±{assessment.uncertainty}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>COMPLETENESS</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#34d399' }}>{assessment.data_completeness}%</div>
              </div>
            </div>

            {/* Conflict Banner if present */}
            {assessment.has_conflict && (
              <div className="callout callout-conflict" style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <ShieldAlert size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <strong>CONFLICT DETECTED:</strong> Sensor and Satellite sources disagree!
              </div>
            )}

            {/* Evidence items summary */}
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
              <div style={{ fontWeight: '600', color: '#cbd5e1', marginBottom: '0.35rem' }}>Evidence Sources Available:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {assessment.evidence_items.map((item, idx) => (
                  <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-glass)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {item.source_type}: <FreshnessBadge freshness={item.freshness} />
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button
                className="btn-primary"
                style={{ flex: 1, padding: '0.5rem', fontSize: '0.82rem', justifyContent: 'center' }}
                onClick={() => onSelectLocation(assessment.location_id)}
              >
                <Eye size={14} /> Drill-Down Evidence
              </button>
              <button
                className="btn-secondary"
                style={{ padding: '0.5rem', fontSize: '0.82rem' }}
                onClick={() => onOpenChallenge(assessment.location_id, assessment.evidence_items[0]?.evidence_id)}
                title="Question this evidence"
              >
                <MessageSquarePlus size={14} /> Question
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
