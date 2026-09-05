import React from 'react';
import { FreshnessBadge } from './UIWidgets.jsx';
import { X, ShieldCheck, AlertCircle, Clock, Info, MessageSquarePlus } from 'lucide-react';

export default function EvidenceDetailModal({ item, onClose, onOpenChallenge }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: '700', textTransform: 'uppercase' }}>
              EVIDENCE PROVENANCE RECORD • {item.evidence_id}
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{item.indicator}</h3>
          </div>
          <button className="btn-secondary" style={{ padding: '0.4rem' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.9rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Source Name</span>
            <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{item.source_name}</strong>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.9rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Source Type</span>
            <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>{item.source_type}</strong>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.9rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Measured Value</span>
            <strong style={{ color: item.value !== null ? '#ffffff' : '#ef4444', fontSize: '1.1rem' }}>
              {item.value !== null ? `${item.value} ${item.unit}` : 'MISSING / UNRECORDED'}
            </strong>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.9rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Freshness Status</span>
            <div style={{ marginTop: '0.2rem' }}><FreshnessBadge freshness={item.freshness} /></div>
          </div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Evidence Description</span>
          <p style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.description}</p>
        </div>

        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
            ⚠ KNOWN SENSOR / METHODOLOGICAL LIMITATIONS
          </span>
          <p style={{ color: '#f87171', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.limitations}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn-primary" onClick={() => { onClose(); onOpenChallenge(item.location_id, item.evidence_id); }}>
            <MessageSquarePlus size={16} /> Question This Specific Evidence
          </button>
          <button className="btn-secondary" onClick={onClose}>Close Provenance</button>
        </div>
      </div>
    </div>
  );
}
