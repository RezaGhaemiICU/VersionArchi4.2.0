# Rollen und Policy-Logik

Dieses Modul bildet die Grundlage für Zugriffskontrolle, Berechtigung und Steuerung sichtbarer Funktionen in der Anwendung.

## Prinzip

- **Rolle → Policy → Berechtigung → UI-Funktion**
- Jede Rolle bekommt eine oder mehrere Policies zugewiesen.
- Jede Policy enthält definierte Berechtigungen.
- Berechtigungen werden direkt den UI-Komponenten zugeordnet.

## Beispielrollen

- **Assignee:**  
  Kann Fälle einsehen und bearbeiten (Case Policy)

- **HR-Manager:**  
  Zusätzlich zu Assignee-Rechten auch Dokumente hochladen und Budgetentscheidungen treffen.

- **Admin:**  
  Vollzugriff – inkl. Benutzerverwaltung und Finanzfreigaben.

## Dynamik & Erweiterbarkeit

- Policies sind **modular**: können zentral angepasst und erweitert werden.
- Unterstützung von **Custom Policies** pro Team, Kunde oder Region.
- **UI passt sich automatisch** anhand der Berechtigungen an – keine redundanten Elemente.

## Technische Besonderheiten

- **Zentrale Verwaltung** aller Rollen-Policy-Zuweisungen.
- **Trennung von UI und Berechtigungslogik** – wartbar und testbar.
- **Policy Simulation** im Admin-Panel möglich zur Fehlervermeidung.

---

_Dieser Aufbau ermöglicht maximale Flexibilität bei minimalem Pflegeaufwand._

---