import React from 'react';
import { StatusBadge } from './UIWidgets.jsx';
import { Shield, AlertTriangle, CheckCircle2, Wrench, FileSearch, ArrowUpRight, Lock } from 'lucide-react';

export default function MunicipalDashboard({ assessments, onSelectLocation }) {
  // Compute operational priority counts
  const highAlerts = assessments.filter(a => a.health_status === 'POLLUTION RISK' || a.health_status === 'CONFLICTING EVIDENCE');
  const cautionAlerts = assessments.filter(a => a.health_status === 'CAUTION');
  const avgConfidence = Math.round(assessments.reduce((sum, a) => sum + a.confidence, 0) / assessments.length);

  return (
    <div>
      {/* Officer Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.9))', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.4)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={14} /> ROLE: MUNICIPAL WASTE & ENVIRONMENTAL OFFICER
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', marginTop: '0.2rem' }}>
              Municipal Waste Operations & Compliance Console
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Operational risk priority, false-alarm trade-off management, source reliability verification, and field intervention dispatches.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1.25rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: '700' }}>ACTIVE ALERTS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ef4444' }}>{highAlerts.length}</div>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '0.75rem 1.25rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: '700' }}>AVG CONFIDENCE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#60a5fa' }}>{avgConfidence}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Priority Table */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} color="#f59e0b" /> Priority Operational Action Queue
        </h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Sector / Location</th>
              <th>Health Status</th>
              <th>Operational Risk</th>
              <th>Evidence Confidence</th>
              <th>Recommended Municipal Action</th>
              <th>False Alarm Risk</th>
              <th>Inspect</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map(item => {
              let recAction = "Continue Routine Telemetry Monitoring";
              let falseAlarmRisk = "LOW";
              let riskBg = "rgba(16, 185, 129, 0.1)";

              if (item.health_status === 'POLLUTION RISK') {
                recAction = "Dispatch Field Sampling Team & Inspect Informal Scrap Dumps";
                falseAlarmRisk = "LOW (High multi-source confirmation)";
                riskBg = "rgba(239, 68, 68, 0.15)";
              } else if (item.health_status === 'CONFLICTING EVIDENCE') {
                recAction = "Commission Secondary Optical Lab Test before Order Shutdown";
                falseAlarmRisk = "HIGH (Satellite surface glint discrepancy)";
                riskBg = "rgba(168, 85, 247, 0.15)";
              } else if (item.health_status === 'STALE + POLLUTED' || item.warnings.some(w => w.startsWith('STALE_'))) {
                recAction = "Deploy Maintenance Tech to replace telemetry batteries";
                falseAlarmRisk = "MODERATE (Telemetry > 72h old)";
                riskBg = "rgba(245, 158, 11, 0.15)";
              } else if (item.health_status === 'INSUFFICIENT EVIDENCE') {
                recAction = "Deploy Mobile Water Sampling Van to remote periphery canal";
                falseAlarmRisk = "HIGH (3 missing evidence streams)";
                riskBg = "rgba(100, 116, 139, 0.15)";
              }

              return (
                <tr key={item.location_id} style={{ background: riskBg }}>
                  <td>
                    <strong style={{ color: '#ffffff' }}>{item.location_name}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.location_id} • {item.scenario}</div>
                  </td>
                  <td><StatusBadge status={item.health_status} /></td>
                  <td><strong style={{ color: item.risk_score >= 60 ? '#ef4444' : '#10b981' }}>{item.risk_score} / 100</strong></td>
                  <td>{item.confidence}% (±{item.uncertainty}%)</td>
                  <td style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{recAction}</td>
                  <td><span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.3)', color: '#cbd5e1' }}>{falseAlarmRisk}</span></td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }} onClick={() => onSelectLocation(item.location_id)}>
                      Review <ArrowUpRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
