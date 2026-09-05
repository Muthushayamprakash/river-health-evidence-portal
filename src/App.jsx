import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingScreen from './components/LandingScreen.jsx';
import CommunityDashboard from './components/CommunityDashboard.jsx';
import MunicipalDashboard from './components/MunicipalDashboard.jsx';
import LocationDetailView from './components/LocationDetailView.jsx';
import EvidenceDetailModal from './components/EvidenceDetailModal.jsx';
import EvidenceChallengeModal from './components/EvidenceChallengeModal.jsx';
import ValidationScenariosScreen from './components/ValidationScenariosScreen.jsx';
import MetricsDashboardScreen from './components/MetricsDashboardScreen.jsx';
import LimitationsMethodologyScreen from './components/LimitationsMethodologyScreen.jsx';
import { apiService } from './services/apiService.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [currentRole, setCurrentRole] = useState('COMMUNITY_USER');
  const [assessments, setAssessments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [provenanceItem, setProvenanceItem] = useState(null);
  const [challengeTarget, setChallengeTarget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [evals, locs] = await Promise.all([
        apiService.getAllHealthAssessments(),
        apiService.getLocations(),
      ]);
      setAssessments(evals);
      setLocations(locs);
    } catch (err) {
      console.error('Failed to load portal data', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectLocation = (locId) => {
    setSelectedLocationId(locId);
    setActiveTab('location_detail');
  };

  const selectedAssessment = assessments.find(a => a.location_id === selectedLocationId);
  const selectedLocationObj = locations.find(l => l.id === selectedLocationId);

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />

      <main className="main-content">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Loading River Health Telemetry...</div>
            <div style={{ fontSize: '0.88rem' }}>Evaluating 5 monitoring locations across 4 evidence streams...</div>
          </div>
        ) : (
          <>
            {activeTab === 'landing' && (
              <LandingScreen onExplore={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'community' && (
              <CommunityDashboard
                assessments={assessments}
                onSelectLocation={handleSelectLocation}
                onOpenChallenge={(locId, evId) => setChallengeTarget({ locationId: locId, evidenceId: evId })}
              />
            )}

            {activeTab === 'municipal' && (
              <MunicipalDashboard
                assessments={assessments}
                onSelectLocation={handleSelectLocation}
              />
            )}

            {activeTab === 'scenarios' && (
              <ValidationScenariosScreen
                assessments={assessments}
                onSelectLocation={handleSelectLocation}
              />
            )}

            {activeTab === 'metrics' && (
              <MetricsDashboardScreen assessments={assessments} />
            )}

            {activeTab === 'limitations' && (
              <LimitationsMethodologyScreen />
            )}

            {activeTab === 'location_detail' && (
              <LocationDetailView
                assessment={selectedAssessment}
                location={selectedLocationObj}
                onBack={() => setActiveTab(currentRole === 'MUNICIPAL_OFFICER' ? 'municipal' : 'community')}
                onOpenProvenance={(item) => setProvenanceItem(item)}
                onOpenChallenge={(locId, evId) => setChallengeTarget({ locationId: locId, evidenceId: evId })}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem', background: '#090d16' }}>
        <div>Review-1 MVP • Field-Ready Prototype for Mixed Municipal Waste & Informal Recycling</div>
        <div style={{ marginTop: '0.35rem' }}>Deterministic Rule Engine • Transparent Source Provenance • Evidence Challenge Workflow</div>
      </footer>

      {/* Modals */}
      {provenanceItem && (
        <EvidenceDetailModal
          item={provenanceItem}
          onClose={() => setProvenanceItem(null)}
          onOpenChallenge={(locId, evId) => setChallengeTarget({ locationId: locId, evidenceId: evId })}
        />
      )}

      {challengeTarget && (
        <EvidenceChallengeModal
          locationId={challengeTarget.locationId}
          evidenceId={challengeTarget.evidenceId}
          currentRole={currentRole}
          onClose={() => setChallengeTarget(null)}
        />
      )}
    </div>
  );
}
