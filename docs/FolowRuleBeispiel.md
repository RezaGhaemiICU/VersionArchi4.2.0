### Execution Flow mit paralleler Prüfung mehrerer Entitäten

#### Ziel:
Darstellung eines typischen Orchestrierungsablaufs, bei dem mehrere unabhängige Prüfungen parallel (oder sequentiell) durchgeführt und anschließend aggregiert werden – **ohne Geschäftslogik im Execution Service selbst**.

---

#### Ablaufbeschreibung:

1. **Start des Flows** durch den Execution Service auf Basis eines eingehenden Events (z. B. Antrag eingereicht).
2. Der Flow-Controller prüft, ob laut **Flow Rule** die Prüfungen parallel durchgeführt werden dürfen.
3. Vier Services werden unabhängig voneinander angestoßen:
   - `AddressCheck`
   - `IdentityCheck`
   - `TaxIDCheck`
   - `VisaTypeEligibility`
4. Ergebnisse werden in einem Aggregator gesammelt. Dabei erfolgt **keine Bewertung**, nur technische Zusammenführung der Resultate.
5. Ein zweiter Flow-Schritt fragt optional zusätzliche Services an:
   - `RiskScoring`
   - `ExternalValidation` (z. B. Schnittstelle zu Behörden)
6. Alle Ergebnisse fließen am Ende in eine finale Aggregation, die dem nachgelagerten System übergeben wird.

---

#### Klarstellung:

- **Der Execution Service enthält keinerlei Business-Regeln.**  
  Er kennt **keine Entscheidungslogik** wie „Wenn X, dann Y“.
- Er ist zuständig für:
  - Ablaufsteuerung
  - technische Wiederholungslogik (Retry)
  - Policy-Anwendung (Timeout, Circuit Breaker)
  - Event-Triggering & Telemetrie
- **Alle Geschäftsentscheidungen** (Eligibility, Validierung, Scoring) erfolgen **ausschließlich innerhalb der Microservices.**
