# Policy- und Rollenlogik Layer

## Überblick

Das Policy Layer bildet die Grundlage für eine **flexible, nachvollziehbare und erweiterbare Zugriffskontrolle** innerhalb des Systems. Es verbindet die Benutzerrollen mit konkreten Aktionen, die in der Software erlaubt oder untersagt sind – basierend auf vordefinierten und anpassbaren Richtlinien.

---

## Ziele

- Einheitliche Steuerung von Rechten im gesamten System.
- Trennung von **Rolle**, **Policy** und **Berechtigung**.
- Möglichkeit zur **Anpassung pro Kunde, Abteilung oder Region**.
- Technische Grundlage für **UI-Anpassung** je nach Berechtigung.

---

## Komponenten

### 1. Rollen (Roles)
Rollen definieren die allgemeine Funktion eines Benutzers – z. B. "Assignee", "Manager" oder "Admin". Sie haben keine technischen Berechtigungen direkt, sondern sind mit Richtlinien verknüpft.

### 2. Richtlinien (Policies)
Richtlinien beinhalten eine Liste technischer Erlaubnisse (Permissions). Sie beschreiben, was ein Benutzer mit einer bestimmten Rolle tun darf:
- z. B. `view_cases`, `edit_documents`, `approve_checklists`

Richtlinien können:
- **Standardisiert** (global nutzbar)
- **Kundenspezifisch** (angepasst)
- **Feature-gebunden** sein.

### 3. Berechtigungen (Permissions)
Berechtigungen sind konkrete Funktionen im System – z. B.:
- Zugriff auf eine bestimmte Seite (z. B. Fallübersicht)
- Aktivieren eines Buttons (z. B. „Speichern“)
- API-Zugriff (z. B. „Dokument hochladen“)

---

## Wie funktioniert das technisch?

- Beim Login wird die Rolle eines Nutzers geladen.
- Über die Rolle werden alle Richtlinien geladen.
- Aus den Richtlinien werden alle aktiven Berechtigungen extrahiert.
- Die UI und der Backend-Zugriff richten sich dynamisch nach diesen Berechtigungen.
- Bei jeder Aktion prüft das System, ob der Nutzer die passende Permission hat.

---

## Beispielhafte Architekturentscheidung

- Ein "Manager" kann standardmäßig Fälle sehen und bearbeiten, aber keine Benutzer verwalten.
- Ein "HR Admin" kann zusätzlich Rollen zuweisen und Mitarbeiterdaten ändern.
- Die "Assignee"-Rolle erhält eine eingeschränkte Sicht auf eigene Daten.

---

## Vorteile

- **Modular und erweiterbar**: Neue Rollen oder Policies können ohne Änderungen am Code hinzugefügt werden.
- **Sicher**: Berechtigungen werden zentral verwaltet, kein Wildwuchs im Code.
- **Anpassbar**: Kunden können eigene Zugriffsprofile definieren.
- **UI-integriert**: Nur sichtbare Elemente, wenn erlaubt.

---

## Besondere Hinweise

- Policies können temporär, zeitlich begrenzt oder an Bedingungen geknüpft sein.
- Simulation oder Preview-Funktion für Admins, um Rollen zu testen, ist optional verfügbar.
- Richtlinien werden versioniert, um Änderungen nachvollziehen zu können.