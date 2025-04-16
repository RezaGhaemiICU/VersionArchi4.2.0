# Technische Dokumentation: Resilienz, Deployment & Entwicklungsumgebung

## Überblick
Dieses Dokument beschreibt die technische Architektur und Prozesse rund um Resilienzmechanismen, Event-Kommunikation, Rollback-Strategien sowie Entwicklungs- und Deploymentprozesse. Ziel ist es, ein robustes, skalierbares System zu betreiben, das auch in Fehlerfällen wartbar und transparent bleibt.

---

## 1. Einstiegspunkt: Entwicklungsumgebung
Die lokale Entwicklungsumgebung dient als erste Phase des Lebenszyklus:
- Entwickler nutzen eine standardisierte Umgebung mit Testdaten.
- Services sind containerisiert und können lokal ausgeführt werden.
- Lokale Tests (Unit/Integration) werden direkt im CI/CD-Prozess integriert.

---

## 2. CI/CD-Pipeline & Deployment
- Jede Code-Änderung durchläuft automatisierte Tests.
- Deployment erfolgt über Canary- oder Rolling-Strategien.
- Fehlerhafte Deployments werden automatisch erkannt.
- Bei Bedarf wird ein Rollback manuell oder automatisiert eingeleitet.

**Beispiel:**
- Fehlschlag in kleine-Gruppe triggert sofort ein Rollback.
- Logging und Alerting lösen Entwicklerbenachrichtigung aus.

---

## 3. Kommunikation über EventBus (Kafka)
### Architekturprinzipien:
- **Producer**: Alle Microservices veröffentlichen relevante Events.
- **EventBus (Kafka)**: Zuständig für Transport, Retry und DLQ.
- **Consumer**: Andere Microservices konsumieren Events asynchron.

### Vorteile:
- Geringe Kopplung zwischen Diensten.
- Flexibles Error-Handling über DLQ.
- Nachvollziehbarkeit aller Eventflüsse.

---

## 4. Fehlerbehandlung & Retry
- Fehlerhafte Events landen in der **DLQ** (Dead Letter Queue).
- Über definierte Backoff-Strategien erfolgt ein **Retry**.
- Alerts und Protokolle helfen bei manueller Intervention.

**Szenario:**
- Dokument-Service antwortet nicht → Event geht in DLQ → Retry nach x Sekunden → Bei erneutem Fehlschlag Alert an Operations.

---

## 5. Zustands- und Konsistenz-Management
- **State Management** erfolgt verteilt (z. B. Redis), aber synchronisiert.
- Eventuelle Konsistenz wird durch Events und Konfliktauflösung erreicht.
- Spezielle Komponenten überprüfen finalen Systemzustand.

---

## 6. Daten-Backup & Recovery
- Automatische Backups für alle geschäftskritischen Daten.
- Disaster Recovery-Routinen sind dokumentiert und automatisiert.

---

## 7. Monitoring, Logging und Alerting
- Alle Services loggen zentralisiert.
- Alerts bei Fehlverhalten oder Latenzproblemen.
- Tracing für jede Event-Transaktion (auch DLQ/Retry).

---

## 8. Entwicklungsumgebung & Simulation
- Entwickler starten lokal komplette Services mit Mock-Daten.
- CI simuliert komplette Eventflows in isolierten Containern.
- Validierung erfolgt vor jedem Merge ins Hauptrepository.

---

## Fazit
Diese Architektur garantiert Ausfallsicherheit, Transparenz und Entwicklerfreundlichkeit durch klare Trennung von Zuständigkeiten, intelligentes Fehler-Handling und hohe Automatisierung. Die Event-gesteuerte Kommunikation bietet Flexibilität und Skalierbarkeit ohne zentrale Abhängigkeiten.
