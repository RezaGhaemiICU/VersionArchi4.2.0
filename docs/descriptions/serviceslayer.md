# Services Layer – Technischer Überblick

## Funktion der Schicht

Die Services-Schicht bildet das Herzstück der gesamten Anwendung. Sie ist zuständig für die konkrete Umsetzung der Geschäftslogik und wird durch fachlich getrennte Microservices organisiert. Jeder Service erfüllt eine klar definierte Aufgabe und arbeitet unabhängig von den anderen.

---

## Aufbau und Kommunikation

- **Trennung nach Domänen:** Jeder Service ist für ein eigenes Thema zuständig (z. B. Aufträge, Dokumente, Benutzer).
- **Keine direkte Kommunikation untereinander:** Services interagieren ausschließlich über eine zentrale Kommunikationskomponente (ExecutionService).
- **Jeder Service hat einen klar definierten API-Zugang**, um bestimmte Funktionen auszuführen.
- Zustände, Validierungen und Änderungen finden **innerhalb des zuständigen Services** statt.

---

## Vorteile dieser Architektur

- **Skalierbarkeit:** Services können unabhängig voneinander skaliert werden.
- **Erweiterbarkeit:** Neue Funktionen können als zusätzliche Services ergänzt werden.
- **Wartbarkeit:** Fehlerquellen lassen sich schnell isolieren.
- **Verfügbarkeit:** Ein Fehler in einem Service wirkt sich nicht auf das gesamte System aus.

---

## Technische Details

- **Entkopplung:** Kommunikation läuft asynchron über Events oder zentral gesteuerte Aufträge.
- **Fehlertoleranz:** Jeder Service kann eigene Fehler behandeln oder an das zentrale Fehlersystem übergeben.
- **Schnittstellen:** Services stellen nur die minimal notwendige Funktionalität nach außen bereit.
- **Standardisierung:** Alle Services folgen einem einheitlichen Schema bei Aufbau, Rechten und Datenverarbeitung.

---

## Beispielhafte Services

- **AssignmentService:** Zuständig für das Anlegen, Aktualisieren und Verwalten von Aufträgen.
- **DocumentService:** Bearbeitet Dokumente, Validierungen und Uploads.
- **UserService:** Verwaltet Benutzerprofile und Verknüpfungen.
- **HRService:** Übermittelt interne Benachrichtigungen, insbesondere im Kontext von Workflows.
- **ExecutionService:** Koordiniert Prozesse übergreifend, ohne eigene Businesslogik.
- **NotificationService:** Versandt Nachrichten systemweit.

---

## Fazit

Die Services-Schicht erlaubt eine saubere, kontrollierte Umsetzung der Fachlogik mit hoher Flexibilität. Durch die konsequente Trennung und Standardisierung entsteht eine wartbare, erweiterbare Architektur, die auf langfristige Nutzung ausgelegt ist – ohne komplexe Abhängigkeiten zwischen einzelnen Komponenten.