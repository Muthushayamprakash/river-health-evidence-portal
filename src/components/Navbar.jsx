import React from 'react';
import { Waves, Shield, Users, Award, AlertTriangle, FileText, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentRole, setCurrentRole }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand-section" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <Waves size={22} />
          </div>
          <div>
            <div className="brand-title">River Health Evidence Portal</div>
            <div className="brand-sub">Mixed Municipal Waste & Informal Recycling</div>
          </div>
        </div>

        <div className="nav-links">
          <button
            className={`nav-item ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing')}
          >
            <FileText size={16} /> Overview
          </button>
          
          <button
            className={`nav-item ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => setActiveTab('community')}
          >
            <Users size={16} /> Community
          </button>

          <button
            className={`nav-item ${activeTab === 'municipal' ? 'active' : ''}`}
            onClick={() => setActiveTab('municipal')}
          >
            <Shield size={16} /> Municipal
          </button>

          <button
            className={`nav-item ${activeTab === 'scenarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('scenarios')}
            style={{ border: '1px solid rgba(168, 85, 247, 0.4)', background: 'rgba(168, 85, 247, 0.1)' }}
          >
            <Award size={16} color="#c084fc" /> Review-1 Demo
          </button>

          <button
            className={`nav-item ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            <Activity size={16} /> Metrics
          </button>

          <button
            className={`nav-item ${activeTab === 'limitations' ? 'active' : ''}`}
            onClick={() => setActiveTab('limitations')}
          >
            <AlertTriangle size={16} /> Methodology
          </button>
        </div>

        <div className="role-switcher">
          <button
            className={`role-btn ${currentRole === 'COMMUNITY_USER' ? 'active' : ''}`}
            onClick={() => setCurrentRole('COMMUNITY_USER')}
          >
            <Users size={14} /> Community
          </button>
          <button
            className={`role-btn ${currentRole === 'MUNICIPAL_OFFICER' ? 'active' : ''}`}
            onClick={() => setCurrentRole('MUNICIPAL_OFFICER')}
          >
            <Shield size={14} /> Officer
          </button>
        </div>
      </div>
    </nav>
  );
}
