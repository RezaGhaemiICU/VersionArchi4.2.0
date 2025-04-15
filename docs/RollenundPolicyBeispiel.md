**Rollen, Policies & Berechtigungen Beispiele**

**Übersicht**

In AiCUnet basiert  Berechtigung system auf drei zentrale Komponenten:
	•	Rollen: z. B. Assignee, Manager, Admin
	•	Policies: definieren, welche Aktionen erlaubt ist
	•	Permission (Rechte): einzeln Aktionen, z. B. Fälle ansehen, Dokumente hochladen

⸻

**Ziel**
	•	Zentrale Steuerung alle Zugriffe
	•	Klare Trennung: Rollen ≠ Rechte
	•	Wiederverwendbare Policies
	•	Individuelle Anpassung pro Abteilung oder Region oder Zeitlich

⸻
**Beispiel**

**Rollen**

**Rolle**	**Beschreibung z.B.**
Assignee	Sieht & bearbeitet eigene Fälle
Manager	Sieht & bearbeitet alle Fälle, verwaltet Doks
Administrator	Systemweite Zugriff auf alles

**Policies**

**Policy**	**Enthält z. B.**
Case Management	view_cases, edit_cases
Document Policy	upload_documents
System Config Policy	configure_system
User Management Policy	manage_users

**Permissions**

**Recht**	**Funktion z.B.**
view_cases	Fälle anzeigen
edit_cases	Fälle bearbeiten
upload_documents	Dokumente hochladen
configure_system	Systemeinstellungen ändern
manage_users	Benutzerkonten verwalten

⸻

**Beispiel: Custom Policy für HR**

Die HR-Abteilung von Firma XY, darf Fälle sehen, aber nicht hochladen oder löschen.

**Lösung**
	•	Neue Policy auf Basis von „Case Management“
	•	Entferne: upload_documents
	•	Weisen nur HR-Rollen zu

⸻

**Vorteile**
	•	Flexibel: Richtlinien können angepasst werden
	•	Skalierbar: Einfache Erweiterung für neue Länder oder Teams
	•	Konsistent: Gleiche Logik für alle Rollen
	•	Weniger Fehleranfällig: Kein Komplexität von Einzelrechten ( Privileg)

⸻

**Hinweis zur Umsetzung**
	•	Die Rollenlogik ist im System definiert
	•	Die Zuweisung von Policies erfolgt im Admin-Panel
	•	Services prüfen Rechte ausschließlich über Policies
	•	Keine direkte Prüfung von einzelnen Permissions in der UI

**Fatit**
Im Vergleich zu aktuelle System bietet neue Rollen und Berechtigung konzept klare Vorteile:
Statt unübersichtlicher Einzelrechte pro Benutzer arbeiten wir mit Policies mit Rahmen, die flexibel anpassbar und reuseable sind.
Das bringt uns bessere Nachvollziehbarkeit, weniger Fehlerquellen und eine leichtere Pflege, besonders bei komplexe Organisationen mit vielen Nutzer typen.