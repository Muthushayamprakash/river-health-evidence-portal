import React from 'react';
import { Waves, Shield, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, Eye, RefreshCw, BarChart2 } from 'lucide-react';

export default function LandingScreen({ onExplore }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Hero Banner */}
      <div className="glass-card" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 58, 138, 0.4))', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '4px 12px', borderRadius: '20px', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem' }}>
          <Waves size={14} /> Review-1 Field-Ready Prototype
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Community-Facing River-Health Evidence Portal
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '850px', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          A field-ready prototype addressing mixed municipal waste and informal recycling networks in urban river basins. Making environmental evidence understandable, transparent, traceable, and challengeable by local communities.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => onExplore('community')}>
            Explore Community Dashboard <ArrowRight size={16} />
          </button>
          <button className="btn-secondary" onClick={() => onExplore('scenarios')}>
            Launch Review-1 Demo Scenarios
          </button>
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="card-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '2rem' }}>
        <div className="glass-card">
          <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={20} /> The Environmental Problem
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Cities managing mixed municipal waste often overlap with informal recycling networks operating along riverbanks. Environmental monitoring data is typically fragmented, presented as raw uninterpreted metrics, or kept behind municipal silos—making it impossible for local communities to understand, verify, or question river health decisions.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            <CheckCircle size={20} /> The Evidence Solution
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
            The portal synthesizes 4 realistic evidence streams (Open Sensors, Satellite Indicators, Citizen Observations, and Validation Records) into a transparent evidence scoring engine. It explicitly quantifies uncertainty, flags stale/missing data, detects conflicting sources, and empowers community members to question evidence.
          </p>
        </div>
      </div>

      {/* Core End-to-End Workflow */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye size={18} color="#38bdf8" /> Core End-to-End Evaluation Workflow
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { step: '01', title: 'Role Selection', desc: 'Choose Community User or Municipal Officer perspective.' },
            { step: '02', title: 'Location Health', desc: 'Inspect 5 deterministic river monitoring sectors.' },
            { step: '03', title: 'Confidence & Uncertainty', desc: 'View mathematical confidence % and ± uncertainty.' },
            { step: '04', title: 'Freshness & Conflicts', desc: 'Detect stale data (>72h) and multi-source disagreements.' },
            { step: '05', title: 'Question Evidence', desc: 'Submit community challenges directly to the portal.' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', marginBottom: '0.25rem' }}>STEP {item.step}</div>
              <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.95rem', marginBottom: '0.35rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Review-1 MVP Status */}
      <div className="callout callout-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ color: '#ffffff' }}>Review-1 MVP Target Scope (Approx. 35% Completed):</strong> Fully working vertical slice with deterministic scenario testing, rule-based evidence scoring, source provenance, and challenge workflow.
        </div>
        <button className="btn-secondary" onClick={() => onExplore('scenarios')}>
          View 5 Benchmark Scenarios
        </button>
      </div>
    </div>
  );
}
