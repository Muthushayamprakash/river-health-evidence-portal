import React from 'react';
import { AlertTriangle, ShieldCheck, FileText, CheckCircle2, Info, BookOpen } from 'lucide-react';

export default function LimitationsMethodologyScreen() {
  const limitationsList = [
    {
      title: '1. Prototype Mock Integration Data',
      desc: 'External sensor APIs and satellite data providers are integrated via prototype JSON fixtures (apiService stub) rather than live IoT WebSocket/REST streams.',
      effect: 'Telemetry updates are static fixture benchmarks; live environmental streaming latency is not evaluated.'
    },
    {
      title: '2. Limited Monitoring Sector Sample Size',
      desc: 'The prototype evaluates 5 deterministic monitoring locations representing urban waste confluence edge cases.',
      effect: 'Spatial interpolation across unmonitored river reaches between stations is omitted in Review-1.'
    },
    {
      title: '3. Role-Based Identity without OAuth/JWT',
      desc: 'Role switching between Community User and Municipal Officer uses instant UI toggle switches rather than production OAuth2/JWT authentication.',
      effect: 'Access controls are presented for role-specific UX evaluation rather than cryptographic security.'
    },
    {
      title: '4. Deterministic Rule Engine vs ML Modeling',
      desc: 'Scoring and uncertainty quantification use transparent rule-based linear weighted formulas documented in docs/algorithm.md.',
      effect: 'Provides 100% explainable, deterministic results for community auditability rather than black-box statistical predictions.'
    },
    {
      title: '5. Fixed Freshness Threshold Rules',
      desc: 'Telemetry freshness is categorized statically as Fresh (<24h), Recent (24-72h), and Stale (>72h).',
      effect: 'Parameter-specific decay rates (e.g. rapid DO degradation vs slow BOD decay) use uniform time windows.'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          DOCUMENTATION & METHODOLOGY
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff' }}>
          Limitations Report & Error Analysis Framework
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Transparent disclosure of Review-1 prototype boundaries, mathematical algorithms, and error evaluation metrics.
        </p>
      </div>

      {/* Limitations Card */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} color="#f59e0b" /> Honest Technical Limitations Disclosure
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {limitationsList.map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
              <strong style={{ color: '#f8fafc', fontSize: '0.95rem', display: 'block', marginBottom: '0.3rem' }}>{item.title}</strong>
              <p style={{ color: '#cbd5e1', fontSize: '0.86rem', marginBottom: '0.4rem' }}>{item.desc}</p>
              <div style={{ fontSize: '0.8rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
                Impact on Evidence Interpretation: {item.effect}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Analysis Matrix */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} color="#38bdf8" /> User Error Analysis & Evaluation Protocol
        </h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Evaluation Category</th>
              <th>Description / Test Condition</th>
              <th>Review-1 Validation Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cat: 'misunderstood_confidence', desc: 'User mistakes 75% evidence confidence for zero risk' },
              { cat: 'misunderstood_stale_evidence', desc: 'User treats >72h telemetry as active real-time pollution' },
              { cat: 'ignored_missing_evidence', desc: 'User overlooks null missing sensor fields' },
              { cat: 'failed_to_notice_conflict', desc: 'User accepts sensor/satellite contradiction without checking provenance' },
              { cat: 'correctly_identified_conflict', desc: 'User notices sensor vs satellite disagreement badge' },
              { cat: 'correctly_checked_provenance', desc: 'User opens evidence detail modal to inspect indicator limitations' },
              { cat: 'correctly_questioned_evidence', desc: 'User submits formal evidence challenge for disputed items' },
            ].map((row, idx) => (
              <tr key={idx}>
                <td><code style={{ color: '#38bdf8', fontSize: '0.82rem' }}>{row.cat}</code></td>
                <td style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{row.desc}</td>
                <td><span className="badge badge-caution">PENDING REAL USER VALIDATION</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
