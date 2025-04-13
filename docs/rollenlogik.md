# Rollenlogik – Zugriffskontrolle in AiCUnet

Diese Dokument beschreibt, wie Zugriffsrechte in AiCUnet-Plattform strukturiert und durchgesetzt werden.  Ziel ist, klare Regeln für unterschiedliche Nutzerrollen zu definieren, damit jede Rolle nur das sieht und tut, was man darf.

---

## Warum brauchen wir eine starke Rollenlogik?

- Die Plattform ist für verschiedene Nutzergruppen gedacht: (Kunden( unterschiedliche rollen inside )) HR-Teams, Assignees, interne Spezialisten ( Managers, Head of, etc) und Administratoren für ganze system.
- Jede Rolle hat unterschiedliche Aufgaben, Einblicke und Verantwortlichkeit.
- Ohne Trennung kann, Intransparenz oder sogar rechtliche Probleme geben.

---

## Rollenübersicht Grob und nicht detailiert:  
	•	HR (Kunde)
Übersicht über alle Mitarbeiter der eigenen Firma. Kann neue Anträge starten, Status prüfen und Rückfragen stellen.
	•	Teamleiter HR (Kunde)
Sieht alle Anträge und Reports der eigenen HR-Mitarbeiter. Verantwortlich für Freigaben und Eskalationen.
	•	Immigration Manager (intern)
Verantwortlich für operative Bearbeitung von Fällen. Sieht nur zugewiesene Dossiers.
	•	Account Manager
Überblick über alle Kundenaccounts, KPIs, vertragliche Informationen, Feedback und Eskalationen.
	•	Admin (System)
Hat volle Kontrolle über Plattform, Rollenvergabe, Benutzerverwaltung und technische Einstellungen.
	•	Finance (intern)
Zugriff auf Rechnungsdaten, Abrechnungsstatus und finanzielle Reports – keine Einsicht in operative Inhalte.
	•	Head of Operations / Bereichsleiter
Kann teamübergreifende Prozesse einsehen, optimieren und priorisieren. Verantwortlich für Effizienzkennzahlen.
	•	Training & Learning Manager (intern oder extern)
Zugriff auf Lernfortschritt, Zuweisung von Kursen, Inhalte verwalten und Nutzerfeedback einsehen.
	•	Auditor / Compliance
Nur Leserechte auf relevante Prozess- und Kommunikationsdaten zu Prüfzwecken. Kein Zugriff auf operative Steuerung.
        •	Assignee
Zugriff nur auf eigene Fälle, Dokumente und Termine. Keine Einsicht in andere Nutzer oder interne Prozesse.

---

## Wie setzen wir das technisch um?

- In jede Request wird die Rolle von Benutzer aus JWT gelesen.
- Gateway entscheidet auf Basis der Rolle, ob Request an Ziel-Service weitergeleitet wird.
- Services prüfen intern nochmal die Berechtigungen für kritische Operationen (z. B. Änderungen).

---
Beispiel Code zu Rollenprüfung mit Zugriffsstufe

// Rollen nach Berechtigungslevel sortiert – höherer Index = mehr Rechte
const roleHierarchy = ["Assignee", "HR", "Teamleiter_HR", "Immigration_Manager", "Account_Manager", "Head_Operations", "Admin"];

/**
 * Prüft, ob ein Nutzer Zugriff auf eine bestimmte Aktion oder Bereich hat.
 * @param userRole - die aktuelle Rolle von Nutzers (z. B. "HR")
 * @param minRequiredRole - Mindestrolle, die für die Aktion benötigt wird (z. B. "Immigration_Manager")
 * @returns true, wenn Zugriff erlaubt ist, sonst false
 */
function hasAccess(userRole: string, minRequiredRole: string): boolean {
  const userLevel = roleHierarchy.indexOf(userRole);
  const requiredLevel = roleHierarchy.indexOf(minRequiredRole);
  
  // Falls Rolle unbekannt oder niedriger → Zugriff verweigern
  if (userLevel === -1 || requiredLevel === -1) return false;

  // Zugriff nur, wenn Nutzer gleichrangig oder höher ist
  return userLevel >= requiredLevel;
}

                  // Beispielaufrufe
hasAccess("HR", "Assignee");               //  HR darf auf Assignee-Ressourcen zugreifen
hasAccess("Assignee", "Account_Manager");  //  Assignee hat nicht genug Rechte
hasAccess("Admin", "Immigration_Manager"); //  Admin darf alles

---

Was passiert hier?
	•	Es gibt eine definierte Hierarchie von Rollen.
	•	Jede Nutzer wird anhand seine Rolle eingestuft.
	•	Die Funktion erlaubt Aktionen nur, wenn die Rolle von Nutzer gleich oder höher als die erforderliche Rolle ist.
	•	Administrator (ganz oben) darf alles.
	•	So wird fein granular geregelt, wer was darf – ohne 1000 if-Statements.

---

## Fehlerbehandlung bei falsche Zugriff

- Wenn ein Zugriff verweigert wird, liefert System:
  - **HTTP 403 Forbidden**
  - eine klare Fehlermeldung zurück: "Sie haben keine Berechtigung für diese Aktion"
- Alle versuchten Zugriffe werden geloggt und können später geprüft werden

---

## Erweiterungsmöglichkeiten

- Kombination aus **RBAC** und **ABAC** für komplexere Regeln ( Role-based access control (RBAC)) und (attribute-based access control (ABAC))
- Temporäre Rollen: z. B. "Urlaubsvertretung für HR"
- Rollenbasierte UI-Steuerung (nur sichtbare Menüpunkte je nach Rolle)

---

## Besonderheit von AiCUnet

- Rollenlogik ist Teil der Core-Architektur
- funktioniert zusammen mit Authentifizierung, Events und Services
- Umsetzung bleibt flexibel genug für neue Rollen oder Mandantenmodelle

