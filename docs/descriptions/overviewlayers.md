# Systemarchitektur – Übersicht der Schichten

## Ziel

Diese Übersicht beschreibt die grundlegenden Schichten unserer modularen Architektur. Jede Schicht erfüllt eine spezifische Rolle und kommuniziert strukturiert mit der nächsten. Das Ziel ist klare Trennung, einfache Wartung und hohe Skalierbarkeit.

---

## 1. Präsentationsschicht (Frontend)

- Verantwortlich für die Benutzerinteraktion.
- Nutzt strukturierte Requests, um Daten vom System zu holen oder zu senden.
- Darstellung erfolgt je nach Benutzerrolle unterschiedlich.
- Fehler- und Statusmeldungen werden benutzerfreundlich aufbereitet.

**Technische Besonderheiten:**
- Nutzung dynamischer Komponenten
- Einbindung von Berechtigungslogik zur Darstellung oder Ausblendung von Funktionen

---

## 2. Gateway-Schicht

- Diese Schicht prüft eingehende Requests auf:
  - Gültigkeit des Tokens
  - Rollenberechtigungen
  - Request-Ratenbegrenzung
  - IP-Filter (Sicherheitsmechanismus)

- Anschließend wird der Request gezielt an den passenden Microservice weitergeleitet.

**Technische Besonderheiten:**
- Zentrale Sicherheitslogik
- Logging aller Anfragen mit Trace-ID

---

## 3. Rollen- & Policy-Schicht

- Bestimmt, was der Benutzer darf oder nicht darf.
- Rollen (z. B. Manager, HR, Admin) werden dynamisch mit Richtlinien verbunden.
- Die Richtlinien (Policies) enthalten fein definierte Aktionen (z. B. „Fälle lesen“, „Dokumente hochladen“).

**Technische Besonderheiten:**
- Anpassbare Richtlinien für verschiedene Regionen oder Abteilungen
- Nutzung als Sicherheitsfilter vor der Service-Logik

---

## 4. Microservices-Schicht

- Jeder Service ist für einen bestimmten Bereich zuständig (z. B. Auftrag, Dokumente, Benutzer).
- Services sind entkoppelt und kommunizieren über strukturierte Schnittstellen.
- Datenvalidierung, Business-Logik und Persistenz erfolgen hier.

**Technische Besonderheiten:**
- Trennung von Zuständigkeiten (Single Responsibility)
- Möglichkeit zur Skalierung einzelner Services

---

## 5. Kommunikationsschicht (ExecutionService)

- Zentraler Koordinator für Service-übergreifende Prozesse.
- Nimmt Events entgegen und verteilt Folgeaktionen an die zuständigen Services.
- Dient als „Kommunikationszentrale“ mit optionalem Retry und Fehlerkanal (DLQ).

**Technische Besonderheiten:**
- Nutzung synchroner oder asynchroner Aufrufe
- Wiederholungslogik bei temporären Fehlern
- Erweiterbar mit automatisierten Folgeaktionen

---

## 6. Persistenz- und Logging-Schicht

- Alle Daten werden in strukturierten Datenmodellen gespeichert.
- Transaktionen werden gesichert verarbeitet.
- Zusätzlich werden Logs und Metriken zentral gesammelt und ausgewertet.

**Technische Besonderheiten:**
- Nutzung standardisierter Formate für Logs
- Unterstützung für Auditing und Performanceanalysen

---

## 7. Infrastruktur- und CI/CD-Schicht

- Verwaltet Bereitstellung, Sicherheit und Skalierung.
- Neue Versionen werden automatisiert gebaut, getestet und ausgeliefert.
- Konfigurationen und Secrets sind zentral gespeichert und versioniert.

**Technische Besonderheiten:**
- Automatisiertes Deployment
- Zugriffskontrolle auf Infrastruktur-Ebene
- Überwachung von Diensten und Ressourcen

---

## Fazit

Diese modulare Architektur schafft eine klare, technische Grundlage für eine stabile, wartbare und erweiterbare Plattform. Die Trennung der Schichten erlaubt gezielte Weiterentwicklung und erleichtert die Integration von neuen Funktionen – ohne das Gesamtsystem zu gefährden.