# System Architecture Document - Review-1 MVP

## 1. High-Level System Dataflow Architecture

```
User (Community Resident / Municipal Officer)
  │
  ▼
Role-Based UI Layer (React Single Page Application)
  ├── Navbar & Role Switcher
  ├── Landing Screen (Overview & End-to-End Workflow)
  ├── Community Dashboard (River Health & Transparency)
  ├── Municipal Dashboard (Operational Risk & Alerts)
  ├── Location Detail View (Drill-Down & Provenance Table)
  ├── Validation Scenarios (Review-1 Demo Mode)
  ├── Metrics Dashboard (Baseline vs Target Matrix)
  └── Limitations & Methodology Screen
  │
  ▼
Integration Stub / Service Layer (src/services/apiService.js)
  ├── REST Mock API Endpoints (/api/locations, /api/health, /api/challenges)
  └── Challenge Store (In-Memory Audit Ledger)
  │
  ▼
Core Evidence Processing Engine
  ├── Freshness Calculator (src/services/freshnessCalculator.js)
  ├── Conflict Detector (src/services/conflictDetector.js)
  ├── Uncertainty Calculator (src/services/uncertaintyCalculator.js)
  └── Evidence Scoring Engine (src/services/evidenceScoringService.js)
  │
  ▼
Fixtures & Benchmark Dataset
  ├── data/locations.json
  ├── data/current_evidence.json
  └── data/validation_dataset.json
```

## 2. Layer Description
1. **Role-Based UI Layer**: Responsive React component hierarchy using custom CSS variables for dark-mode glassmorphic aesthetics. Features real-time state management for role switches and screen navigation.
2. **Integration Stub (apiService.js)**: Simulates asynchronous REST API endpoints with synthetic network latency, exposing `/api/locations`, `/api/evidence`, `/api/health`, `/api/validation`, and `/api/challenges`.
3. **Core Engine Modules**:
   - `freshnessCalculator.js`: Evaluates timestamp deltas into FRESH, RECENT, STALE, or MISSING states.
   - `conflictDetector.js`: Evaluates inter-source variance to flag CONFLICTING EVIDENCE.
   - `uncertaintyCalculator.js`: Derives mathematical Confidence %, Uncertainty (±%), and Data Completeness %.
   - `evidenceScoringService.js`: Weighted scoring engine ($W_{\text{sensor}}=0.40, W_{\text{sat}}=0.25, W_{\text{citizen}}=0.20, W_{\text{val}}=0.15$) generating automated "WHY THIS RESULT?" reasoning.
4. **Data Layer**: JSON fixture datasets storing 5 deterministic monitoring locations and 20 multi-source evidence records.
