# Evidence Scoring & Uncertainty Quantification Algorithm

## 1. Overview
The portal uses a transparent, 100% deterministic rule-based evidence scoring and uncertainty engine. It avoids unexplainable black-box ML models for Review-1 community auditability.

## 2. Mathematical Mathematical Formulations

### Source Weights
Configurable weights per evidence category:
- $W_{\text{Open Sensor}} = 0.40$
- $W_{\text{Satellite}} = 0.25$
- $W_{\text{Citizen Observation}} = 0.20$
- $W_{\text{Validation Record}} = 0.15$

### Freshness Multipliers ($M_{\text{fresh}}$)
- $\text{Fresh (<24h)} = 1.00$
- $\text{Recent (24-72h)} = 0.75$
- $\text{Stale (>72h)} = 0.40$
- $\text{Missing / Null} = 0.00$

### Weighted Pollution Risk Score ($R$)
For present non-missing evidence items $i$:
$$R = \frac{\sum (V_i \cdot W_i \cdot \text{Reliability}_i \cdot M_{\text{fresh},i})}{\sum (W_i \cdot \text{Reliability}_i \cdot M_{\text{fresh},i})}$$

Where $V_i = 85$ for HIGH_RISK, $50$ for MODERATE_RISK, and $15$ for LOW_RISK.

### Data Completeness ($C_{\text{comp}}$)
$$C_{\text{comp}} = \frac{N_{\text{present\_categories}}}{4} \times 100\%$$

### Confidence Score ($\text{Conf}$)
$$\text{Conf} = \text{Clamp}_{15}^{98}\left( (C_{\text{comp}} \cdot \bar{R}_{\text{source}}) - P_{\text{stale}} - P_{\text{conflict}} \right)$$

Where:
- $P_{\text{stale}} = 30 \times \text{StaleRatio}$
- $P_{\text{conflict}} = 22$ if inter-source conflict is detected
- $\bar{R}_{\text{source}}$ is the average reliability of active sources

### Deterministic Uncertainty ($\pm U$)
$$U = \text{Clamp}_{5}^{75}\left( (100 - \text{Conf}) \times 0.55 + P_{\text{stale}} \times 0.4 + P_{\text{conflict}} \times 0.5 + N_{\text{missing\_sources}} \times 5 \right)$$

## 3. Health Classification Decision Tree
1. If active sources count $\le 1$ or $C_{\text{comp}} \le 25\%$ $\rightarrow$ **`INSUFFICIENT EVIDENCE`**
2. Else if `detectConflicts().hasConflict == true` $\rightarrow$ **`CONFLICTING EVIDENCE`**
3. Else if $R \ge 60$ $\rightarrow$ **`POLLUTION RISK`**
4. Else if $R \ge 35$ or Stale/Missing warning present $\rightarrow$ **`CAUTION`**
5. Else $\rightarrow$ **`HEALTHY`**
