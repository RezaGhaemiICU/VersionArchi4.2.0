AiCUnet – Technische Architekturübersicht

Diese Dokument gibt eine Überblick über alle technischen Bereiche von Projekt. Jede Abschnitt ist in eine eigene Datei erklärt und hier getagged.


Inhaltsverzeichnis

1. Frontend
	•	frontend.md – Aufbau UI-Komponenten, Sicherheit im Browser, Kommunikation mit Gateway, Tools

2. API Gateway
	•	gateway.md – Authentifizierung, Zugriff steuerung, Routing, Logging und zentrale Sicherheitslogik

3. Security
	•	security.md – Login, Token-Handling, Rollen, OAuth2, Sicherheitsmaßnahmen

4. Microservices
	•	microservices.md – Aufbau Services, klare Trennung, Kommunikation, Skalierung

5. Datenbanken
	•	datenbanken.md – Separate Datenbank pro Service, Zugriffsschutz, Anti-Pattern-Vermeidung

6. Automatisierung
	•	automation.md – EventBus, Workflow Engine, EventStore

7. Fehlerbehandlung
	•	error-handling.md – Retry, Timeout, Circuit Breaker, DLQ – alle für Ausfallsicherheit

8. Monitoring
	•	monitoring.md – Logs, Alerts, Health Checks, Tracing (optional für spätere Phase)

9. CI/CD
	•	cicd.md – Build-Prozesse, Tests, Deployment-Pipeline, sichere Release-Strategy

10. Saga
	•	saga.md – Lightweight Pattern zu Steuerung verteilte Transaktionen mit Rückabwicklung
