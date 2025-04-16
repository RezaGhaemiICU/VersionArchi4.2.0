# FAQ_Zur_Zielarchitektur

---

## 1. Architekturprinzipien

**Warum diese Architektur?**  
Wir setzen auf modulare Microservices, um Skalierbarkeit, Wartbarkeit und schnelle Feature-Erweiterung zu ermöglichen.

Wir setzen auf modulare Microservices, um Skalierbarkeit, Wartbarkeit und schnelle Feature-Erweiterung zu ermöglichen.  
**Beispiel:** Wenn ein neuer VisaService benötigt wird, kann er unabhängig entwickelt, deployed und per Event angebunden werden, ohne bestehende Services zu ändern.


**Was ist der Unterschied zu klassischen Systemen?**  
Statt monolithischer Blöcke haben wir lose gekoppelte, eigenständige Services mit definierten Kommunikationswegen.

Statt monolithischer Blöcke haben wir lose gekoppelte, eigenständige Services mit definierten Kommunikationswegen.  
**Beispiel:** Statt eine zentrale User-Verwaltung direkt in die Oberfläche zu bauen, ruft das System den UserService asynchron über ExecutionService auf.

---

## 2. Kommunikation zwischen Services

**Wie kommunizieren die Services?**  
- Hauptsächlich über den **Execution Service** (koordiniert alle Aktionen)
- Asynchrone Kommunikation läuft über einen **internen Eventbus**
- Keine direkte Service-zu-Service-Kommunikation

**Beispiel:** Auftrag wird gelöscht → Execution-Service erhält Event → verteilt Löschanfragen an HR, Dokumente, UserService, etc.

---

**Was passiert bei Fehlern?**  
- Fehlerhafte Events landen in einer **DLQ** (Dead Letter Queue)
- Dort erfolgt Retry oder manuelle Analyse

**Beispiel:** Wenn der DokumentenService nicht antwortet, wird z.B. 3× versucht. Danach landet das Event in der DLQ zur manuellen Klärung.

---

## 3. Fehlerbehandlung & Wiederherstellung

**Wie wird mit Systemfehlern umgegangen?**  
- Retry-Mechanismen
- Rollback durch Execution Service bei nicht vollständiger Verarbeitung
- Logging & Monitoring

**Beispiel:** Wird bei der Löschung eines Users der HR-Service übersprungen, erkennt das System das durch fehlenden Status und startet die Verarbeitung erneut.

---

**Was passiert bei unterbrochenen Prozessen?**  
- Der aktuelle Status wird persistent gespeichert  
- Ein Wiederaufsetzen ist ohne Datenverlust möglich

**Beispiel:** Wenn ein Prozess nach Schritt 2 von 5 abbricht (z. B. Stromausfall), erkennt Execution-Service dies und setzt beim nächsten Systemstart fort.

---

## 4. Authentifizierung & Zugriff

**Wie funktioniert die Authentifizierung?**  
- Token-basierter Zugang (JWT)
- Gateway übernimmt Prüfung und Weiterleitung

**Beispiel:** Assignee sendet Anfrage → Token wird geprüft → Anfrage geht weiter an Service X, wenn Rolle gültig ist.

---

**Wie wird geregelt, was wer sehen darf?**  
- Über **Policies**, die Rollen zugewiesen sind  
- Auch **Custom Policies** möglich pro Team oder Kunde.

**Beispiel:** Manager darf alle Aufträge eines Kunden sehen, Assignee nur eigene → diese Logik ist durch Policies im Gateway definiert.

---

## 5. Deployment & Skalierung

**Wie wird das System deployed?**  
- Über CI/CD Pipelines  
- Standardmäßig Rolling oder Blue-Green Deployment

**Beispiel:** Eine neue Version vom HR-Service wird per Canary-Strategy mit 10 % der User live getestet, bevor Rollout für alle erfolgt.

---

**Wie skalieren Services?**  
- Horizontal durch Service-Replikation  
- Loadbalancer verteilt Anfragen automatisch

**Beispiel:** Bei hoher Nutzung wird der DokumentenService automatisch auf 5 Instanzen hochskaliert, ohne Unterbrechung.

---

## 6. Monitoring & Observability

**Wie wird das System überwacht?**  
- Zentralisiertes Logging  
- Metriken mit Dashboards  
- Alerts bei Fehlern oder Performance-Abfall

**Beispiel:** Wenn mehr als 5 % der Dokumenten-Uploads fehlschlagen, wird automatisch ein Alert an das DevOps-Team gesendet.

---

**Gibt es ein Live-Tracking der Events?**  
- Ja, durch Trace-IDs und verteiltes Logging

**Beispiel:** Ein gesamter Request vom Frontend bis zur DB kann per Trace-ID nachvollzogen werden, inkl. Dauer pro Service.

---

## 7. Erweiterbarkeit & Weiterentwicklung

**Wie werden neue Features eingebaut?**  
- Neue Services oder Module können unabhängig ergänzt werden  
- Kein Eingriff in bestehende Services nötig

**Beispiel:** Ein Onboarding-Service wurde später ergänzt, ohne dass bestehende Services neu deployed werden mussten.

---

**Wie stellen wir sicher, dass nichts bricht?**  
- Automatische Tests (Unit + Integration)  
- Canary Deployments bei kritischen Änderungen

**Beispiel:** Beim Release einer neuen Execution-Logik werden alle Steps über Staging validiert, bevor sie produktiv gehen.

---

## 8. Entwicklungsumgebung & Tests

**Wie können Entwickler lokal arbeiten?**  
- Standardisierte Entwicklungsumgebung (Container-basiert)  
- Simulierte externe Abhängigkeiten

**Beispiel:** Entwickler starten per `make dev` das komplette Setup inkl. Gateway, Mock-Services und Testdaten.

---

**Welche Tests werden durchgeführt?**  
- Unit, Integration, End-to-End  
- Automatisiert über CI/CD eingebunden

**Beispiel:** Jeder Merge in das Haupt-Repository triggert automatisch 42 Testläufe über CI.

---

## 9. Sicherheit & Compliance

**Welche Sicherheitsmaßnahmen sind eingebaut?**  
- Tokenprüfung, Rate Limiting, Rollenprüfung  
- Konfigurierbare Audit-Logs

**Beispiel:** Jeder API-Zugriff mit sensiblen Daten wird mit Benutzer-ID und Zeitstempel geloggt und kann exportiert werden.

---

**Ist das System DSGVO-konform?**  
- Ja, alle Datenzugriffe sind nachvollziehbar  
- Zugriffskontrollen sind fein granular

**Beispiel:** Ein Assignee kann seine Daten löschen lassen → AuditTrail dokumentiert alle Löschaktionen gemäß DSGVO.

---

### Versions- und Abhängigkeitsmanagement

**10. Wie werden unterschiedliche Service-Versionen gleichzeitig verwaltet?**  
Jede neue Version läuft entkoppelt, Rollouts erfolgen über Canary- oder Blue-Green-Verfahren. Altdienste können parallel aktiv sein, bis Migration abgeschlossen ist.

Neue Versionen laufen über Canary Deployment parallel zu älteren Versionen.  
**Beispiel:** Version 2.3 eines HR-Services wird für 5 % der Nutzer getestet, während 2.2 weiterhin stabil bleibt. Bei Erfolg wird schrittweise Umschaltung.

---

**11. Wie geht das System mit Service-Abhängigkeiten um?**  
Abhängigkeiten werden strikt über Events oder API-Gateways orchestriert. Keine harte Kopplung – Kommunikation erfolgt lose über zentrale Koordinationsdienste.

Abhängigkeiten werden lose über Events orchestriert.  
**Beispiel:** Wenn der "AssignmentService" eine Aufgabe abschließt, wird nur ein Event veröffentlicht. Alle betroffenen Services reagieren unabhängig (z. B. NotificationService sendet dann Info).

---

### Erweiterte Test- und Laststrategien

**12. Werden Last- oder Performancetests automatisiert durchgeführt?**  
Optional per Lasttest-Modul antriggerbar. Integration in CI/CD ist vorbereitet. Testdaten und Limits sind konfigurierbar.

Performancetests sind per Simulation ausführbar.  
**Beispiel:** Ein fester Testauftrag wird 500× über das Gateway gegen alle verbundenen Services durchgeschleust. Das Ergebnis wird per Monitoring geprüft.

---

**13. Wie werden Tests für komplexe Szenarien (z. B. bei mehreren Services) durchgeführt?**  
Durch simulierte Umgebung mit Test-Datenbank + automatisiertem Orchestrator, der alle Services parallel triggert und validiert.

Integrationstests sind über simulierte Umgebungen möglich.  
**Beispiel:** In der Testumgebung werden alle Services mit Dummy-Daten synchron gestartet. Ein kompletter Use-Case wird wie in der echten Umgebung getestet.

---

### Datenschutz & sensible Daten

**14. Wie werden sensible Daten (z. B. personenbezogene) geschützt?**  
Daten werden verschlüsselt gespeichert und transportiert. Zugriff nur rollenbasiert über Policies + technische Limits.

Sensible Daten werden verschlüsselt und rollenbasiert behandelt.  
**Beispiel:** Die Adresse eines Assignees ist nur für HR-User sichtbar und wird nur entschlüsselt, wenn die Policy dies erlaubt.

---

**15. Welche Maßnahmen existieren für Datenschutz (z. B. GDPR)?**  
Datenhaltung erfolgt regionsbasiert. Jeder Datensatz ist revisionsfähig und auf Wunsch löschbar per automatischer Ablaufsteuerung.

Datenschutz ist automatisiert technisch umgesetzt.  
**Beispiel:** Daten aus Projekten in Frankreich werden in französischen Rechenzentren gespeichert. Nach Ablauf des Projekts werden sie automatisch gelöscht, wenn kein Widerspruch vorliegt.

---


### 16. Ist der Execution Service ein Single Point of Failure?
**Antwort:** Nein. Der Execution Service ist stateless und läuft in mehreren Instanzen parallel.  
**Beispiel:** Fällt eine Instanz während der Bearbeitung aus, übernimmt eine andere nahtlos über den Eventbus das aktuelle Saga.

---

### 17. Sind Kompensationsschritte blockierend oder asynchron?
**Antwort:** Kompensationen laufen asynchron über Events – der Nutzer merkt davon nichts.  
**Beispiel:** Wenn ein Auftrag fehlschlägt, wird automatisch ein „Undo“-Event für den betroffenen Service ausgelöst.

---

### 18. Warum wurde kein Tool wie Temporal oder Camunda verwendet?
**Antwort:** Um vollständige Kontrolle, einfache Wartbarkeit und Flexibilität zu garantieren, wurde bewusst ein leichtgewichtiger, eigener Orchestrator gebaut.  
**Beispiel:** Die Prozessdefinition erfolgt per YAML und wird vom Execution Service dynamisch interpretiert – ganz ohne Vendor Lock-in.

---

### 19. Können mehrere Services gleichzeitig eine Saga orchestrieren?
**Antwort:** Nein. Die Orchestrierung ist zentral im Execution Service verankert.  
**Beispiel:** Jeder Schritt enthält eine eindeutige Event- und Process-ID, wodurch parallele oder doppelte Ausführungen verhindert werden.

---

### 20. Wie wird Domain-Driven Design (DDD) umgesetzt?
**Antwort:** Jeder Business-Bereich ist als eigenständiger Bounded Context konzipiert.  
**Beispiel:** Der „Relocation“-Service kennt keine Details über Visa oder Housing – diese sind durch Events entkoppelt.

---

### 21. Wie funktioniert die Retention Policy im Eventbus?
**Antwort:** Nachrichten bleiben so lange bestehen, bis sie erfolgreich verarbeitet werden. Fehlerhafte Events wandern in die DLQ.  
**Beispiel:** Wenn ein Service beim ersten Versuch scheitert, wird der Event erneut verarbeitet. Nach X Versuchen geht er in die Analyse.

---

### 22. Warum ein eigener Orchestrator statt Standardlösung?
**Antwort:** Um flexibel auf Geschäftslogik reagieren zu können, dynamisch Sagas zu definieren und den Overhead gering zu halten.  
**Beispiel:** Neue Prozessabläufe können live über Konfigurationen im Admin Panel eingepflegt werden, ganz ohne Code-Änderung.

---

### 23. Was passiert bei einem abgebrochenen SAGA?
**Antwort:** Jeder Zustand wird gespeichert. Das System erkennt hängende Prozesse und setzt sie kontrolliert fort.  
**Beispiel:** Wenn während eines Onboardings der Execution-Service neu startet, wird der Zustand geladen und automatisch weitergeführt.

---

### 24. Kann ein User bei erneutem Login alle bisherigen Daten einsehen?
**Antwort:** Ja, sofern die Rolle und die Policy Zugriff erlauben.  
**Beispiel:** Ein Assignee sieht nur seine Fälle, aber keine HR-Daten – selbst nach Logout/Login bleibt die Kontrolle aktiv.

---

### 25. Warum wurde Microservice-Architektur gewählt?
**Antwort:** Um Funktionen unabhängig zu skalieren, zu entwickeln und auszuliefern.  
**Beispiel:** Der Dokumentenservice wurde eigenständig aktualisiert, ohne dass andere Services gestört wurden.

---

### 26. Was passiert bei Datenkorruption in einem Service?
**Antwort:** Datenintegrität wird durch Event-Replay aus dem Eventstore sichergestellt.  
**Beispiel:** Wenn eine Datenbank fehlerhafte Werte enthält, wird der Zustand durch Wiedereinspielung der Events neu aufgebaut.

---

### 27. Reicht Eventual Consistency wirklich für alles?
**Antwort:** Ja, weil das System auf Resilienz und Wiederherstellung ausgelegt ist.  
**Beispiel:** Wenn ein Zwischenschritt bei der Registrierung fehlschlägt, wird er nach Recovery erneut angestoßen – ohne Inkonsistenz.

---
**Stand:** 16. April 2025 – Dieses Dokument wird laufend aktualisiert. Vorschläge oder offene Fragen bitte als Issue im Repository melden.