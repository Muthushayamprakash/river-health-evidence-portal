# System Requirements Specification - Review-1 MVP

## 1. Executive Problem Statement
A city manages mixed municipal waste and informal recycling networks along urban river basins, but environmental data is difficult for local communities to interpret or challenge. The organisation requires a **Community-Facing River-Health Evidence Portal** that makes environmental evidence understandable, transparent, traceable, and challengeable by local community members.

## 2. Target User Personas
- **Role A: Community User / Local Resident**: Focuses on river health status, transparency, evidence explanation, confidence, uncertainty, missing/stale data visibility, source provenance, and questioning evidence.
- **Role B: Municipal Waste & Environmental Officer**: Focuses on operational risk prioritization, alert queues, source reliability, formal validation status, recommended municipal intervention actions, and false-alarm trade-off management.

## 3. Core Functional Requirements
1. **Multi-Source Evidence Integration**: Support 4 realistic evidence categories:
   - Open Sensors (40% weight)
   - Satellite Indicators (25% weight)
   - Citizen Observations (20% weight)
   - Validation Records (15% weight)
2. **Freshness Engine**:
   - `<24h`: FRESH (1.0 weight multiplier)
   - `24-72h`: RECENT (0.75 weight multiplier)
   - `>72h`: STALE (0.40 weight multiplier)
   - `Missing / null`: MISSING (0.0 multiplier)
3. **Explicit Missing Data & Stale Data States**: Never hide missing or stale data; display explicit badges and explain impact on confidence.
4. **Multi-Source Conflict Detector**: Detect disagreement between high-risk signals and low-risk signals across sources without averaging away anomalies.
5. **Deterministic Uncertainty Quantification**: Calculate deterministic Confidence %, Uncertainty (±%), and Data Completeness % based on source availability, staleness, reliability, and conflicts.
6. **Automated Reasoning ("WHY THIS RESULT?")**: Generate dynamic natural language explanations for health classifications.
7. **Stakeholder Trade-off Analysis**: Contrast Community Environmental Protection vs. Municipal Operational Cost / False Alert Risk.
8. **Interactive Evidence Challenge Workflow**: Enable community users to submit formal evidence challenges for disputed items.
9. **5 Deterministic Validation Scenarios**:
   - `LOC-101`: Healthy
   - `LOC-102`: Conflicting Evidence
   - `LOC-103`: Stale + Polluted
   - `LOC-104`: Missing Sensor Field
   - `LOC-105`: Multiple Missing Sources

## 4. Non-Functional Requirements
- **Transparency & Explainability**: 100% rule-based deterministic scoring engine.
- **Performance**: Sub-100ms response time for local API service calls and UI tab switches.
- **Visual Excellence**: Modern dark-mode glassmorphic interface with accessible status badges, progress gauges, and responsive grid layouts.
