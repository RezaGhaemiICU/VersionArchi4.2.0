# GLOSSAR ZUR ZIELARCHITEKTUR

Dieses Glossar erklärt zentrale Begriffe und Konzepte aus der Architektur, die im Projekt verwendet werden.

---

### Microservices  
Kleine, eigenständige Dienste, die jeweils für einen bestimmten Funktionsbereich verantwortlich sind. Sie kommunizieren über klar definierte Schnittstellen.

---

### API Gateway  
Ein zentraler Zugangspunkt für alle externen Anfragen. Prüft Token, steuert den Datenfluss und schützt vor Überlastung (Rate Limiting, IP-Filter).

---

### Execution Service  
Ein interner Koordinationsdienst, der die Kommunikation zwischen Microservices übernimmt. Dient als "Orchestrator" für komplexe Abläufe.

---

### Eventbus  
Ein asynchroner Kommunikationskanal zwischen Services. Ermöglicht lose Kopplung. Events werden über ein zentrales System verteilt und verarbeitet.

---

### DLQ (Dead Letter Queue)  
Eine Warteschlange für fehlgeschlagene oder unzustellbare Nachrichten. Dient zur Fehlerbehandlung und manuellen Nachbearbeitung.

---

### Retry-Mechanismus  
Ein automatischer Wiederholungsversuch, wenn ein Service temporär nicht verfügbar ist. Mehrere Versuche möglich, mit Pausen dazwischen.

---

### Saga Pattern  
Ein Muster zur Verwaltung verteilter Transaktionen. Besteht aus einer Reihe von Schritten, die bei Fehlern rückgängig gemacht (Compensation) werden können.

---

### Policy / Rollenlogik  
Definiert, welche Benutzerrollen welche Aktionen durchführen dürfen. Policies können Standard oder maßgeschneidert sein.

---

### Custom Policy  
Eine angepasste Richtlinie für spezielle Mandanten oder Teams. Sie basiert auf einer Standardpolicy, enthält aber abweichende Berechtigungen.

---

### CI/CD Pipeline  
Ein automatisierter Prozess für Entwicklung, Test und Deployment. Codeänderungen werden automatisch geprüft und in die Umgebung übertragen.

---

### Canary Deployment  
Ein vorsichtiges Ausrollen neuer Versionen, bei dem nur ein kleiner Teil der Nutzer betroffen ist. Dient zur Risiko-Minimierung bei Updates.

---

### Blue-Green Deployment  
Zwei identische Umgebungen (blau und grün). Die neue Version wird in einer davon getestet und bei Erfolg live geschaltet.

---

### Observability  
Gesamtheit der Mechanismen zur Systembeobachtung (Logging, Metriken, Tracing). Erlaubt tiefe Einblicke ins Systemverhalten.

---

### Trace-ID  
Eindeutige ID zur Verfolgung eines Requests über mehrere Services hinweg. Unterstützt bei der Fehleranalyse und Performance-Überwachung.

---

### Stateless  
Ein Dienst ist zustandslos, wenn er keine Daten zwischen Anfragen speichert. Dadurch kann er leicht skaliert oder neu gestartet werden.

---

### Bounded Context  
Teil eines Domain-Modells, der klar abgegrenzt ist. Jeder Microservice bedient genau einen Bounded Context.

---

### Orchestrierung  
Zentrale Steuerung eines Prozesses, bei dem ein Dienst (Execution Service) die Abläufe kontrolliert und koordiniert.

---

### Self-Healing Mechanismen  
Automatische Korrektur von Fehlern im System, z. B. durch Retry, Failover oder Wiederanlauf nach Fehlern.

---

### Load Balancer  
Verteilt eingehende Anfragen gleichmäßig auf mehrere Instanzen eines Dienstes. Sichert Hochverfügbarkeit.

---

### Secrets Store  
Zentrale Verwaltung sensibler Konfigurationsdaten (z. B. Passwörter, Tokens) mit Zugriffsbeschränkungen.

---

## Eventual Consistency  
Ein Datenmodell, bei dem nicht alle Teile des Systems sofort synchron sind. Die Konsistenz wird über Zeit durch Events und Synchronisationsmechanismen erreicht. Wichtig für verteilte und asynchrone Systeme.

## Compensation  
Eine Art „Rückgängig machen“ von bereits ausgeführten Schritten in einer verteilten Operation (z. B. beim Löschen eines Auftrags). Wird oft im Zusammenhang mit SAGA verwendet.

## Idempotenz  
Ein Vorgang kann mehrfach wiederholt werden, ohne dass sich das Ergebnis ändert. Essenziell, wenn Requests erneut gesendet werden müssen (z. B. nach einem Timeout oder einem Fehler).

## Circuit Breaker  
Ein Sicherheitsmechanismus, der bei mehrfachen Fehlern automatisch die Verbindung zu einem fehlerhaften Service trennt, um das Gesamtsystem zu schützen.

## Feature Flag  
Ein Schalter, mit dem man einzelne Funktionen gezielt aktivieren oder deaktivieren kann – ohne den Code neu zu deployen. Erlaubt flexibles Testen oder kontrollierte Rollouts.

## Service Discovery  
Ein Mechanismus, mit dem Services sich selbst in einer Infrastruktur registrieren und automatisch gefunden werden können. Nützlich in dynamischen Systemen wie containerbasierten Architekturen.

## Infrastructure as Code  
Die Infrastruktur (Server, Datenbanken, Netzwerke) wird wie Code behandelt: versioniert, dokumentiert und automatisiert aufgesetzt. Erhöht Stabilität und Wiederholbarkeit.

**MCP (Manufacturing Connect Protocol)**  
Ein offener, standardisierter Kommunikationsrahmen, der es externen Systemen und Agenten erlaubt, direkt mit Industrie- oder Servicesystemen zu interagieren – unabhängig vom Anbieter.

**MCP-Agent**  
Ein externer digitaler Agent (z. B. KI-Service), der auf MCP basiert und über Events oder Requests mit dem Host-System interagiert.

**MCP-kompatibel**  
Bezeichnet ein System, das MCP-konforme Schnittstellen und Kommunikationsmuster unterstützt – meist über Events, REST oder MQTT.

**Open API Interface**  
Die technische Brücke zwischen unserem System und der MCP-Schnittstelle. Ermöglicht eine sichere Kommunikation über standardisierte Datenformate.

**Gateway-Erweiterung**  
Modul zur Integration von MCP-Agenten in unser bestehendes Gateway, mit Authentifizierung, Logging und Policy-Prüfung.


## Hinweis  
Diese Begriffe sind integraler Bestandteil unserer Architekturstrategie. Die klare Definition dieser Begriffe hilft dabei, technische Konzepte verständlich zu machen.
**Stand:** 17. April 2025 – Dieses Dokument wird laufend aktualisiert. Vorschläge oder offene Fragen bitte als Issue im Repository melden.