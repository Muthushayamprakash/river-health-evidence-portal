# Field-Ready Prototype for City Managing Mixed Municipal Waste Informal Recycling
## Community-Facing River-Health Evidence Portal (Review-1 MVP ~35%)

![Review-1 Status](https://img.shields.io/badge/Review--1-35%25%20MVP%20Completed-success)
![Build Status](https://img.shields.io/badge/Vite-Build%20Passing-brightgreen)
![Test Status](https://img.shields.io/badge/Tests-18%2F18%20Passed-blue)

---

## 🌊 What The Project Does
The **Community-Facing River-Health Evidence Portal** addresses urban river basins where municipal waste management overlaps with informal recycling networks. Environmental telemetry data is typically fragmented, presented as opaque metrics, or hidden behind municipal silos. 

This portal synthesizes 4 realistic evidence streams—**Open Sensors**, **Satellite Indicators**, **Citizen Observations**, and **Validation Records**—into a transparent, rule-based evidence scoring engine. It explicitly quantifies mathematical uncertainty, flags stale telemetry (>72h), highlights missing data fields, detects conflicting sources, and provides a formal workflow for community members to question evidence.

---

## 🎯 Why It Matters
Informal waste recycling communities (sorting plastics, scrap metals, and e-waste along riverbanks) are disproportionately affected by environmental pollution decisions. By turning raw telemetry into understandable, transparent, and challengeable evidence, the portal bridges the trust gap between community members and municipal authorities.

---

## 🛠 Technology Stack
- **Frontend Framework**: React 18 + Vite 6
- **Styling**: Vanilla CSS with custom CSS variables (Dark-mode glassmorphic design system)
- **Icons**: Lucide React
- **Testing Framework**: Vitest (18 automated unit and integration tests)
- **Integration Layer**: Prototype REST API Mock Stub (`apiService.js`)

---

## 🏗 Architecture

```
User (Community Resident / Municipal Officer)
  │
  ▼
Role-Based UI Layer (React SPA)
  ├── Overview | Community Dashboard | Municipal Console | Review-1 Demo
  ├── Location Detail & Provenance Modal | Evidence Challenge Form
  └── Metrics Dashboard | Methodology & Limitations
  │
  ▼
Integration Stub Service Layer (src/services/apiService.js)
  └── REST Endpoints (/api/locations, /api/health, /api/challenges)
  │
  ▼
Core Evidence Engine
  ├── freshnessCalculator.js (Fresh <24h, Recent 24-72h, Stale >72h)
  ├── conflictDetector.js (Multi-source variance detector)
  ├── uncertaintyCalculator.js (Deterministic Confidence & ± Uncertainty)
  └── evidenceScoringService.js (Weighted scoring & "WHY THIS RESULT?" generator)
  │
  ▼
Fixture Data (data/locations.json, data/current_evidence.json, data/validation_dataset.json)
```

---

## 🧪 5 Deterministic Validation Scenarios
The portal includes a dedicated **Review-1 Demo Console** for instant AI evaluation:

1. **LOC-101 (Healthy)**: Fresh sensor + satellite + citizen + validation $\rightarrow$ `HEALTHY` status (High confidence, low uncertainty).
2. **LOC-102 (Conflicting Evidence)**: Sensor reports high turbidity/hypoxia while Satellite reports low chlorophyll $\rightarrow$ `CONFLICTING EVIDENCE` status (Disagreement flagged, confidence penalized).
3. **LOC-103 (Stale + Polluted)**: High toxic chemical load with telemetry 6 days old (>72h) $\rightarrow$ `POLLUTION RISK / CAUTION` status (Explicit STALE badge).
4. **LOC-104 (Missing Sensor Field)**: Water Temperature sensor probe broken (null) $\rightarrow$ `CAUTION` status (Explicit MISSING badge).
5. **LOC-105 (Multiple Missing Sources)**: Satellite, Citizen, and Validation records missing for remote canal $\rightarrow$ `INSUFFICIENT EVIDENCE` status (High uncertainty $\pm 65\%$).

---

## 🚀 How To Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Production Build
```bash
npm run build
```

---

## 🧪 How To Test

Run the full automated test suite (18 unit & integration tests):
```bash
npm test
```

---

## 📄 Documentation Sitemap
- [`docs/requirements.md`](file:///d:/Program/AI/ANTIGRAVITY/sam%20project/docs/requirements.md): Functional and non-functional requirements specification.
- [`docs/architecture.md`](file:///d:/Program/AI/ANTIGRAVITY/sam%20project/docs/architecture.md): Layered architecture and dataflow specifications.
- [`docs/algorithm.md`](file:///d:/Program/AI/ANTIGRAVITY/sam%20project/docs/algorithm.md): Mathematical formulations for scoring, confidence, and uncertainty.
- [`docs/limitations.md`](file:///d:/Program/AI/ANTIGRAVITY/sam%20project/docs/limitations.md): Honest technical limitations and impact matrix.
- [`docs/REVIEW_1_REPORT.md`](file:///d:/Program/AI/ANTIGRAVITY/sam%20project/docs/REVIEW_1_REPORT.md): Comprehensive Review-1 completion report.
- [`docs/REVIEW_1_CHECKLIST.md`](file:///d:/Program/AI/ANTIGRAVITY/sam%20project/docs/REVIEW_1_CHECKLIST.md): Traceability matrix linking requirements to code.

---

## ⚠️ Limitations & Honest Labels
- **Mock Integration**: External API streams are represented by prototype fixtures (`Prototype Integration Stub`).
- **Human Subject Validation**: Real-world user testing is marked as `PENDING REAL STAKEHOLDER VALIDATION`.
- **Simulated Benchmarks**: Benchmark metrics are marked as `100% SIMULATED / PROTOTYPE RESULT`.
