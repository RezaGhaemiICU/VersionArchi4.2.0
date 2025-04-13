# CI/CD & Testing – Automatisierte Deploy-Prozess

Diese Dokument beschreibt die Build-, Test- und Deploy-Prozesse in AiCUnet.  Ziel ist ein stabile, nachvollziehbarer und sicherer Software-cycle.

---

## Testing 

- Jede Microservice hat  **Unit- und Integrationstests** (z. B. mit Jest)
- Testabdeckung fokussiert sich auf:
  - Gültige und ungültige Eingaben
  - Fehlerbehandlung bei DB/Bus-Ausfälle
  - Empfang und Versand von Events

---

## Build-Pipeline

- Empfehlung: GitHub Actions oder GitLab CI
- Ablauf:
  1. Linting + Style-Prüfung (mit ESLint)
  2. Ausführung alle Unit-Tests
  3. Erstellen eine Docker-Images
  4. Push zur Registry (privat oder public)

```yaml
name: CI Pipeline

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install deps
        run: npm install
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
```

---

## Staging & Deployment

- Optional: Staging-enviorment für Endtests
- **Automatisches Deployment** durch, nur für Staging
- **Manueller Review** ist vor Produktiv setzung nötig
- Tools:
  - **Docker Compose** für first setup
  - **Kubernetes** für spätere Skalierung

---

## Deployment-Strategy

> Zur Risiko minimieren kommen moderne Techniken im Einsatz:

- **Blue/Green Deployment**:
  - Zwei parallele Umgebungen (Blue = aktiv, Green = neu)
  - Sofortiges Rollback möglich

- **Canary Deployment** *(100% optional)*:
  - Neue Version wird schrittweise ausgerollt (z. B. Für 10 % von Nutzern)
  - Rollout bei Erfolg auf alle

---

## Erweiterung

- E2E-Tests (Playwright oder Cypress)
- Performance-Tests (Artillery oder k6)
- Fehler feedback direkt von CI-Prozess
- Slack / Email-Integration für Deploy-Benachrichtigungen oder anderen.

---

## Sicherheit

- **Secrets** nicht in Repository speichern → Secret Manager verwenden
- Nur definierte Branches dürfen deployen (`main`, `release/*`)
- Image-Sicherheit durch Hashing und Signierung (100% optional)

---

