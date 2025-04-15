# Execution Flow / Zentrale Kommunikationslogik bei AuftragLöschung als Beispiel

## Kontext

In modernen Microservice-System nutzen wir ein zentrales **ExecutionService**, das alle Folgeaktionen nach eine Event koordiniert, wie z. B. bei der Löschung eine Auftrag.

---

## Übersicht: Schritte

1. **Frontend**
   - User klickt: „Auftrag löschen“
   - Request (mit Auftrag-ID) wird gesendet

2. **Gateway**
   - Token validieren, Rolle prüfen
   - Request an den passenden Service weiterleiten

3. **Logikschicht**
   - Validierung des Auftrags
   - Analyse aller verknüpften Entitäten:
     - Dokumente
     - User
     - Company
     - Fragebögen etc.

4. **Automatisierung**
   - Event `AuftragGeloescht` wird erzeugt
   - Änderungen in AuditLog + Datenbank gespeichert
   - Event wird an den EventBus übergeben

---

## ExecutionService (Kommunikationszentrale)

### Was macht es?
- Empfängt Event `AuftragGeloescht`
- Identifiziert betroffene Microservices
- Führt jeden Lösch-Schritt **gezielt und nacheinander** aus:
  - Dokument löschen
  - Benutzer-Verknüpfung aufheben
  - HR informieren
  - Finanz prüfen/löschen/bearbeuten
  - Interne Notifikation senden
  - Fragebogen und Feedback entfernen

### Bonus-Funktionalität:
- **Retry bei Fehlern** (z. B. 3 Versuche mit Delay)
- **DLQ + Alerting**, wenn Service dauerhaft nicht antwortet
- Logging jeder Aktion zur Nachvollziehbarkeit
- Optionale Kompensationslogik bei teilweisem Scheitern

---

##  Warum nicht ein EventBus?

|                     | EventBus                   | ExecutionService               |
|---------------------|----------------------------|--------------------------------|
| Vermittelt Events   | ✅                         | ✅                             |
| Führt Logik         | ❌                         | ✅ (koordiniert Microservices) |
| Wiederholungen      | ❌                         | ✅ (mit Backoff)               |
| Fehlerbehandlung    | ❌                         | ✅ (DLQ, Alert)                |
| Reihung / Sequenz   | ❌                         | ✅                             |
| Zustandslogik       | ❌                         | ✅                             |

---

##  Beispiel-Services bei Löschung

- `DokumentenService`
- `UserService`
- `HRService`
- `FinanceService`
- `NotificationService`
- `FragebogenService`

Alle werden **nur durch ExecutionService** aufgerufen, nicht direkt vom AuftragService.

---

## Fazit

Das `ExecutionService` ist mehr als ein Helfer / es ist die **Brücke zwischen alle Services** und garantiert:
- Klar definierte Abhängigkeiten
- Saubere Trennung von Verantwortung
- Fehlerrobust und Nachvollziehbar
- Möglichkeit zu Automatisierung **Intern**
