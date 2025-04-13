# Datenbanken – Struktur, Zugriff, Best Practices

Diese Dokument beschreibt die Datenbank strategie in der AiCUnet-Architektur, mit Fokus auf Isolation, Sicherheit und Erweiterung.

---

## Grundregeln

- Jede Service besitzt eine eigene DB → **Database per Service**
- Kein direkte Zugriff auf fremde DB
- Datenfluss nur mit **API** oder **EventBus**
- Datenmodell ist strikt domänen spezifisch

---

## Technologie

- **PostgreSQL** – Main DB für strukturierte Daten
- **MongoDB** – Für schemalose / dynamische Dokumenten
- **SQLite/PostgreSQL (light weight)** – Für Logs und Nachrichten (z. B. `DBLogs`)
- **Redis** – Temporäre valus oder einfache Caching
- **AuditDB (100%optional)** – Audit proof storage für compliance oder GDPR gründe bzw. (DSGVO)

---

## Zugriff & Sicherheit

- Jeder Service kommuniziert mit **einem dedicated DB-User**
- Sensible Daten sind verschlüsselt gespeichert (Tokens, Secrets)
- Verbindung nur intern, oder mit TLS ( Transport Layer Security )
- Täglich verschlüsselte Backups mit Zugriff protokoll

---

## Was wir vermeiden

- Gemeinsame Nutzung einer DB durch mehrere Services 
- Cross-Service-Joins über Tabellen hinweg
- Direkte Datenlese aus fremden Services ohne API/Event
- Reporting-Queries direkt auf operativen Datenbanken
- Ziel ist dadurch: Daten integrität und unabhängigkeit für gesamte software.

---

## Erweiterbare Features (100% optional NUR bei Skalierung)

- **Read Replicas** zu Entlastung bei Reading intensity
- **CQRS-Architektur**: Trennung von Lese-/Schreibzugriffen (Command Query Responsibility Segregation)
- **Schema Registry**: Validieren einheitliche Daten format bei Events
- **Backup-Rotation**: Zeitlich begrenzt Storage mehrerer Versionen

---

## Verbindung zu anderen Layern

- Logging & Metriks werden in `DBLogs` zentral gespeichert
- Wichtige Events landen zusätzlich in EventStore (100%optional)
- Rechtlich relevante Änderungen werden in `AuditDB` archiviert

---

## Testbarkeit

- Isolierte Test-DB für CI/CD 
- DB migration durch Tools wie `Prisma Migrate`, `Liquibase`
- Automatisierte Tests decken auch Failovers - und Recovery-senarios.

---
