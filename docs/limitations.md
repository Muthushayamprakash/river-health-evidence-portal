# Honest Limitations & Scope Disclosure Report

## 1. Overview
In compliance with anti-fabrication guidelines, this document explicitly discloses the technical boundaries, assumptions, and scope limitations of the **Review-1 MVP** release.

## 2. Technical Limitations & Impact Matrix

| Limitation | Technical Description | Impact on Evidence Interpretation |
| :--- | :--- | :--- |
| **Mock Integration Data** | External sensor telemetry and satellite imagery are backed by local JSON fixtures (`apiService.js`) rather than real-time WebSocket streams. | Telemetry updates are static fixture benchmarks; live network streaming latency is not evaluated. |
| **5 Test Sectors** | Prototype monitors 5 deterministic locations representing specific edge cases. | Spatial interpolation across unmonitored river reaches between stations is omitted. |
| **Simple Role Switcher** | Role switching between Community User and Municipal Officer uses UI state toggles without OAuth2/JWT logins. | Presented for role-specific UX evaluation rather than cryptographic access control. |
| **Rule Engine vs ML** | Uses transparent, deterministic rule formulas rather than machine learning predictions. | 100% explainable results for community auditability; does not forecast future pollution trajectories. |
| **Static Freshness Decay** | Telemetry freshness uses fixed time windows (<24h, 24-72h, >72h). | Parameter-specific decay rates (e.g. rapid DO change vs slow heavy metals) use uniform time windows. |

## 3. Honest Labeling Compliance
- **Real-Time Integration Status**: `Prototype Integration Stub (Mock Data)`
- **Human Subject Validation**: `PENDING REAL STAKEHOLDER VALIDATION`
- **Simulated Test Benchmark**: `100% SIMULATED / PROTOTYPE RESULT`
