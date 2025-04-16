# Domain-Driven Overview

## Einleitung

Dieses Diagramm gibt einen Überblick darüber, wie unsere Architektur nach dem **Domain-Driven Design (DDD)** Prinzip strukturiert ist. Ziel ist es, jede Fachdomäne (z. B. Immigration, Relocation, HR etc.) in einem eigenen logischen und technischen Bereich zu isolieren. Dadurch werden klare Zuständigkeiten, einfachere Wartung und bessere Skalierbarkeit ermöglicht.

---

## Vorteile dieser Aufteilung

- **Klarheit:** Jeder Microservice gehört zu genau einem Fachbereich.
- **Unabhängigkeit:** Teams können unabhängig voneinander an verschiedenen Domains arbeiten.
- **Skalierbarkeit:** Neue Domains oder Features können später leicht ergänzt werden.
- **Wartbarkeit:** Änderungen bleiben auf eine begrenzte Domain beschränkt.

---

## Aufbau

### Beispiel-Domains

- **Immigration-Domain**  
  Zuständig für Prozesse wie Visabeantragung, Behördenkontakte, Statusverfolgung.

- **Relocation-Domain**  
  Beinhaltet z. B. Wohnungs­suche, Anmeldung, Orientierungstouren, Kindergartensuche.

- **HR-Services / Internal Management**  
  Zuständig für interne Nutzer, Rollenmanagement, Onboarding/Offboarding von Mitarbeitenden.

- **Customer & Auftrag-Domain**  
  Verwaltung von Firmen, Aufträgen, Zuordnung von Assignments, Workflows.

- **Dokumentenverwaltung**  
  Prüfen, Anfordern, Hochladen und Archivieren von Pflichtdokumenten je nach Prozess.

- **Notification & Kommunikation**  
  Nachrichten, E-Mails, interne Benachrichtigungen, Alerting, z. B. wenn ein Dokument fehlt.

---

## Technischer Hintergrund

- Jede Domain hat einen eigenen Service (z. B. `RelocationService`, `HRService`, `DocService`).
- Datenzugriff erfolgt **nur innerhalb der Domain** (keine cross-domain Datenbankzugriffe).
- Kommunikation über den `ExecutionService` oder EventBus zur Koordination.
- Events sind asynchron und durch Retry-Logik abgesichert.
- Sensitive Daten (z. B. Visa-Status) sind nur für autorisierte Rollen sichtbar (Policy Layer).
- Standardisierte Schnittstellen ermöglichen auch externe Integration (OpenAPI).

---

## Warum das ?

- In unserem Modell sind Domains vollständig entkoppelt, was **Effizienz + Sicherheit** steigert.
- Auch für Reporting, KPIs, Fehleranalyse und Monitoring ist diese Trennung essenziell.

---

## Beispiel: Relocation-Prozess

1. Neuer Auftrag mit Ziel „Relocation“ wird erstellt
2. `RelocationService` initiiert die nächsten Schritte:
   - Home-Search starten
   - Anmeldung vorbereiten
   - Dokumentenprüfung via `DocService`
3. Alle relevanten Informationen werden gespeichert und asynchron zwischen Services geteilt.
4. Ergebnis: Relocation abgeschlossen → Event erzeugt → Abschlussphase

---

## Fazit

Diese DDD-Architektur trennt bewusst die fachlichen Verantwortungen und reduziert Komplexität. Sie ist eine der wichtigsten Grundlagen für unsere neue Softwareplattform und ermöglicht echtes, modernes Wachstum.