import React, { useState } from 'react';
import { StatusBadge, FreshnessBadge, RiskGauge, WhyThisResult, StakeholderTradeoff } from './UIWidgets.jsx';
import { ArrowLeft, ExternalLink, MessageSquarePlus, ShieldAlert, AlertTriangle, FileText, CheckCircle2, Clock } from 'lucide-react';

export default function LocationDetailView({ assessment, location, onBack, onOpenProvenance, onOpenChallenge }) {
  if (!assessment || !location) return null;

  return (
    <div>
      {/* Navigation & Header */}
      <button className="btn-secondary" onClick={onBack} style={{ marginBottom: '1.25rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(21, 32, 54, 0.9), rgba(15, 23, 42, 0.9))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              MONITORING STATION • {assessment.location_id}
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginTop: '0.2rem' }}>
              {location.name}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '750px', marginTop: '0.3rem' }}>
              {location.description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <span><strong>Informal Recycling Proximity:</strong> {location.informal_recycling_proximity}</span>
              <span>•</span>
              <span><strong>Primary Waste Streams:</strong> {location.waste_type}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <StatusBadge status={assessment.health_status} />
            <div style={{ marginTop: '0.75rem' }}>
              <button className="btn-primary" onClick={() => onOpenChallenge(assessment.location_id, assessment.evidence_items[0]?.evidence_id)}>
                <MessageSquarePlus size={16} /> Question This Evidence
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem', background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>RISK SCORE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: assessment.risk_score >= 60 ? '#ef4444' : '#10b981' }}>
              {assessment.risk_score} / 100
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>EVIDENCE CONFIDENCE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#38bdf8' }}>
              {assessment.confidence}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>DETERMINISTIC UNCERTAINTY</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f43f5e' }}>
              ±{assessment.uncertainty}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>DATA COMPLETENESS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34d399' }}>
              {assessment.data_completeness}%
            </div>
          </div>
        </div>
      </div>

      {/* WHY THIS RESULT & STAKEHOLDER TRADE-OFF */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <WhyThisResult reasoning={assessment.reasoning} warnings={assessment.warnings} />
        </div>
        <div>
          <StakeholderTradeoff locationName={location.name} healthStatus={assessment.health_status} />
        </div>
      </div>

      {/* EVIDENCE PROVENANCE TABLE */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} color="#38bdf8" /> Underlying Evidence Sources & Provenance
        </h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Source Type</th>
              <th>Source Name</th>
              <th>Indicator / Parameter</th>
              <th>Measured Value</th>
              <th>Freshness</th>
              <th>Reliability</th>
              <th>Risk Signal</th>
              <th>Inspect Provenance</th>
            </tr>
          </thead>
          <tbody>
            {assessment.evidence_items.map((item, idx) => (
              <tr key={idx} style={{ opacity: item.value === null ? 0.6 : 1 }}>
                <td><strong style={{ color: '#38bdf8' }}>{item.source_type}</strong></td>
                <td>{item.source_name}</td>
                <td>{item.indicator}</td>
                <td>
                  {item.value !== null ? (
                    <span style={{ fontWeight: '700', color: '#ffffff' }}>{item.value} {item.unit}</span>
                  ) : (
                    <span style={{ color: '#ef4444', fontWeight: '700' }}>⚠ MISSING</span>
                  )}
                </td>
                <td><FreshnessBadge freshness={item.freshness} /></td>
                <td>{item.reliability ? `${Math.round(item.reliability * 100)}%` : 'N/A'}</td>
                <td>
                  {item.risk_contribution === 'HIGH_RISK' && <span style={{ color: '#ef4444', fontWeight: '700' }}>HIGH RISK</span>}
                  {item.risk_contribution === 'MODERATE_RISK' && <span style={{ color: '#f59e0b', fontWeight: '700' }}>MODERATE</span>}
                  {item.risk_contribution === 'LOW_RISK' && <span style={{ color: '#10b981', fontWeight: '700' }}>LOW RISK</span>}
                  {item.risk_contribution === 'UNKNOWN' && <span style={{ color: '#64748b' }}>UNKNOWN</span>}
                </td>
                <td>
                  <button className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }} onClick={() => onOpenProvenance(item)}>
                    Provenance <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
