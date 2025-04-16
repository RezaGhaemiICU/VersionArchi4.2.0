## Beschreibung: Rollen-, Zugriffs- und Policy-Schicht

---

## Ziel dieser Schicht

Diese Ebene definiert, **welche Benutzergruppen welche Funktionen** im System ausführen dürfen. Die Trennung von Rollen, Rechten (Permissions) und Richtlinien (Policies) ermöglicht eine flexible und kontrollierbare Verwaltung aller Zugriffsebenen – von einfachen Nutzer:innen bis hin zu Administrator:innen.

---

## Hauptaufgaben

- **Rollenverwaltung**: Zuweisung von Rollen wie „Assignee“, „Manager“, „Admin“ usw.
- **Policy-Zuweisung**: Rollen erhalten Policies, die genau beschreiben, was erlaubt ist.
- **Feingranulare Steuerung**: Innerhalb einer Policy werden einzelne Berechtigungen gesetzt.
- **UI-Funktionalität**: Policies beeinflussen direkt, welche Elemente auf der Benutzeroberfläche sichtbar oder aktiv sind.
- **Custom Policies**: Individuelle Policies ermöglichen abteilungs- oder kundenspezifische Rechtevergabe.

---

## Technische Struktur

- Rollen sind zentral im System definiert.
- Policies sind lose an Rollen gebunden und können wiederverwendet oder individuell angepasst werden.
- Die Berechtigungen (Permissions) steuern direkt den Zugriff auf Systemfunktionen.
- Bei jedem Request werden Rolle + zugehörige Policies ausgewertet.
- Die Sichtbarkeit und Nutzbarkeit von UI-Komponenten hängt von den Policies ab.
- Änderungen an Policies wirken sich **sofort systemweit** aus – kein erneutes Deployment notwendig.

---

## Wichtige Begriffe

- **Role** = Wer bin ich im System?
- **Policy** = Was darf ich grundsätzlich?
- **Permission** = Was darf ich im Detail in einer Funktion?

---

## Vorteile dieser Struktur

- **Hohe Wiederverwendbarkeit** von Policies über mehrere Rollen hinweg.
- **Maximale Flexibilität**, da Policies konfigurierbar und anpassbar sind.
- **Transparente Kontrolle**, was jede Rolle darf oder nicht darf.
- **Vermeidung von Redundanz**, da Policies mehrfach genutzt werden können.
- **Zukunftssicher**, da Änderungen einfach umsetzbar sind.

---