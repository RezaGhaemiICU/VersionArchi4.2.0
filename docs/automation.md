# Automatisierung – EventBus, Workflow, EventStore

Diese Dokument erklärt die Architektur und Logik hinter der Automatisierung in AiCUnet. 
Ziel ist asynchrone, robuste Steuerung alle Prozesse über Events.

---

## EventBus – Vermittlung von Events

- Zentrale Mechanismus zu Entkopplung von Services
- Technologie: **Node.js + Redis Pub/Sub**
- mit standardisierte **JSON-Format**
- Beispiel: Service 3 sendet `DokumentGeprüft` → Service 5 konsumiert und start the Reakreaction

---

## Workflow Engine – Orchestrierung Prozessen

- Koordinieren multi layer Prozesse  nach Event-entry
- Implementieren mit Node.js / NestJS
- Definition über einfache DSL (Steps mit Bedingungen, Delays, Retry)
- Unterstützung: 
  - Zeitverzögerungen
  - Wiederholungsversuche
  - Abbruch beim Fehler

---

## EventStore (100% optional)

> Aktivierter beim Bedarf für vollständige Tracebility / Debugging

- Speichern alle gesendete Events
- Replay-Funktion für Wiederholung/Fehler behebung
- Optional mit Version kontrolle / Event-Payloads

---

## Schema Registry (100% optional)

- Sicherstellung konsistente Event-Format
- Gemeinsames JSON-Schema für Producer/Consumer
- Versionierbare → erlaubt Entwicklung bei gleichzeitiger stability

---

## Sicherheit und Robustheit

- Event gehen bei Fehler nicht verloren (persistente Retry-Mechanism)
- Fehler Nachrichten wandern in die **DLQ (Dead Letter Queue)**
- Events enthalten eindeutige IDs → idempotente Verarbeitung möglich
- Verarbeitung kann überwacht und protokolliert werden

---

## Testbarkeit

- Jede Event-Typ ist isoliert testbar (via Mock-Producer)
- Workflow lassen sich einzeln simulieren und prüfen
- Fehler werden detailliert geloggt (inkl. Event-Quelle, Service, Zeitmap, stample)

---

## Weiterentwicklungen

- Spätere Erweiterung auf komplexere Flows
- Event Replay, Retention und automatische Archivierung vorbereitet
- Mehrere parallele Sagas patterns und costumized patterns können von Workflow Engine koordiniert werden

---

