
## Beschreibung: Überblick über teile die Kernprozesse

---

## Ziel dieser Übersicht

Diese Darstellung bildet die **grundlegenden Funktionsbereiche**  Systems ab also davon paar Hauptprozesse, die in einer typischen Begleitung von internationalen Mitarbeitenden (z. B. Relocation oder Immigration) durchlaufen sollen. Jeder dieser Prozesse ist in der Software modular eingebunden, technisch voneinander getrennt und kann eigenständig ausgeführt oder durch Automatisierung koordiniert werden.

---

## Die sechs Hauptprozesse im Überblick

1. **Auftragserfassung**  
   Das System erfasst strukturierte Anfragen, die entweder manuell oder per Schnittstelle eingehen. Es wird geprüft, ob alle Mindestangaben vorhanden sind. Der Auftrag wird einem internen Team oder einem Workflow zugewiesen.

2. **Initiale Datenprüfung**  
   Die erste Validierung erfolgt automatisiert oder durch menschliche Prüfung. Dokumente, Nutzerverknüpfungen, HR-Informationen und rechtliche Rahmenbedingungen werden erfasst.

3. **Bearbeitung & Koordination**  
   Der zentrale Prozess: Die beteiligten Services (Visa, Unterkunft, Begleitservice, Schule etc.) werden aktiviert. Die Systemlogik steuert Statusänderungen, Kommunikationswege und Deadlines.

4. **Dokument & Nachweisverwaltung**  
   Das System verwaltet alle hochgeladenen oder angeforderten Nachweise. Es prüft Vollständigkeit, Gültigkeit, Zuordnung zum Fall und gibt automatisiertes Feedback bei fehlenden oder falschen Dokumenten.

5. **Ankunft & Integration**  
   Prozesse wie Anmeldung, Bankkonto, Behördenwege oder Wohnungsbesichtigung werden digital abgebildet und mit Checklisten und automatisierten Erinnerungen unterstützt.

6. **Abschluss & Reporting**  
   Nach erfolgter Durchführung wird der Auftrag als abgeschlossen markiert. Eine finale Bewertung (z. B. über einen Fragebogen) wird initiiert. Systemseitig wird ein Audit-Log erzeugt, der alle relevanten Stationen beinhaltet.

---

## Technische Hinweise

- Jeder dieser Prozesse besteht aus mehreren **Microservices**, die durch ein **internes Kommunikationszentrum** (Execution-Service) miteinander verbunden sind.
- Die Statusübergänge werden über Events gesteuert – diese sind im System als standardisierte Nachrichtenformate definiert.
- Die Aufgabenverteilung erfolgt **rollenbasiert**, unter Einhaltung der konfigurierten Zugriffsrichtlinien (Policies).
- Wiederverwendbare technische Komponenten wie **Validierungslogik**, **Audit-Logik** oder **Dokumentenprüfung** sind prozessübergreifend eingebunden.

