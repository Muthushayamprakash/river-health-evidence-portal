import React, { useState } from 'react';
import { apiService } from '../services/apiService.js';
import { X, CheckCircle, MessageSquarePlus, AlertTriangle } from 'lucide-react';

export default function EvidenceChallengeModal({ locationId, evidenceId, currentRole = 'COMMUNITY_USER', onClose }) {
  const [reason, setReason] = useState('Suspected Optical Sensor Discrepancy');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await apiService.submitChallenge({
      location_id: locationId,
      evidence_id: evidenceId || 'EVD-GENERAL',
      reporter_role: currentRole,
      reason,
      comment,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: '700', textTransform: 'uppercase' }}>
              PROTOTYPE EVIDENCE CHALLENGE WORKFLOW
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>Question Environmental Evidence</h3>
          </div>
          <button className="btn-secondary" style={{ padding: '0.4rem' }} onClick={onClose}><X size={18} /></button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#10b981' }}>
              <CheckCircle size={32} />
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>
              EVIDENCE CHALLENGE RECORDED
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Your formal challenge has been logged into the prototype audit ledger. Municipal officers and community auditors can review this discrepancy.
            </p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Target Location & Evidence ID</label>
              <input
                type="text"
                disabled
                value={`${locationId} (Item: ${evidenceId || 'All Location Evidence'})`}
                style={{ width: '100%', padding: '0.6rem', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Primary Reason for Challenge</label>
              <select
                value={reason}
                onChange={e => setReason(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#ffffff', fontSize: '0.85rem' }}
              >
                <option value="Suspected Optical Sensor Discrepancy">Suspected Optical Sensor Discrepancy (Sun Glint / Biofouling)</option>
                <option value="Stale Telemetry Data Used in Assessment">Stale Telemetry Data (&gt;72h old) Used in Assessment</option>
                <option value="Unreported Local Effluent Dumping Event">Unreported Local Effluent Dumping Event Observed</option>
                <option value="Satellite Pass Obfuscated by Cloud Cover">Satellite Pass Obfuscated by Cloud Cover</option>
                <option value="Conflicting Community Visual Observation">Conflicting Community Visual Observation</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Detailed Field Comments & Context</label>
              <textarea
                rows="4"
                required
                placeholder="Explain why this evidence item is unreliable or disputed..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--border-glass)', borderRadius: '6px', color: '#ffffff', fontSize: '0.88rem' }}
              />
            </div>

            <div className="callout callout-warning" style={{ fontSize: '0.78rem', padding: '0.6rem 0.8rem', marginBottom: '1.25rem' }}>
              ⚠ Submitted challenges alter confidence uncertainty calculations for community audit logs.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Logging...' : 'Submit Evidence Challenge'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
