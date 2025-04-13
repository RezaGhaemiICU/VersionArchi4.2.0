# Fehlerbehandlung – Retry, Timeout, Circuit Breaker, DLQ

Diese Dokument beschreibt Fehlermanagement in der AiCUnet-Architektur.  Ziel ist, Fehler kontrolliert zu behandeln und System ausfälle durch stabile Reaktion muster zu vermeiden.

---

## Grundregeln

- Jede Service muss Fehler aktiv behandeln (statt still zu scheitern)
- Temporäre und permanente Fehler werden klar unterschieden
- Logging ist strukturiert, nachvollziehbar und vollständig

---

## Retry-Mechanism

- Für **temporäre Fehler** (z. B. DB-Verbindungsprobleme)
- Implementiert mit **Exponential Backoff**
- Konfigurierbar: z. B. maximal 3 Wiederholung
- Umsetzbar:
  - Direkt in Workflow-System
  - Als Middleware im Service-Code

---

## Timeout-Logik

- Jede externe Aufruf (API, DB, Event) hat ein definierte Timeout
- Vermeidet Block gesamte Prozess
- Konfiguration über zentrale Settings (z. B. `REQUEST_TIMEOUT_MS=5000`)

---

## Circuit Breaker

- Erkennt Fehler und **stoppt automatisiert** weitere Aufruf
- Threshold based: z. B. 70 % Fehlerquote in 1 Minute → Circuit geöffnet
- Circuit wird nach eine Intervall automatisch oder manuell zurückgesetzt
Tools:
  - Node.js: `opossum`
  - Alternativ: eigener Zustandsspeicher (z. B. in Memory)

---

## Dead Letter Queue (DLQ)

Für Nachrichten, die nach mehrere Versuche fehlschlagen

- Nachrichten werden in DLQ gespeichert und markiert
- DLQ ist ständig, mit search and Monitor option.
- bearbeitung durch entwicklern oder separate Logik möglich

---

## Logging & Alerting

- Alle Fehler werden an **zentralen Logging-Service** gesendet
- Alerts werden nur bei `kritische Fehlern` oder cluster triggered
Logs haben:
  - Fehler art (Timeout, Validation, System, Daten)
  - Quelle (Service + Operation)
  - Trace-ID zur Nachverfolgung

---

## Testbarkeit

- Unit-Tests für typische Fehler fall (z. B. DB down, Token expired)
- Tests für Verhalten bei offene Circuit
- Validieren der DLQ bei failed Events

---

## Erweiterung ( Optional )

- Fehler mit Custom-Codes (z. B. `E401_USER_NOT_FOUND`, `E502_TIMEOUT`)
- Fehler synchron mit Workflow Tracker verknüpfen.
- Fehler-Metriks als KPI-Grundlage für Stable analysis.

---

