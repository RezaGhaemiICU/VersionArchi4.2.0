# Role-Switching Flow

Dieser Flow beschreibt, wie ein Benutzer mit mehreren Rollen (z. B. „Immigration Manager“ und „Marketing Manager“) während einer laufenden Session seine aktive Rolle wechseln kann. Dies ermöglicht flexibles Arbeiten über Abteilungsgrenzen hinweg, ohne sich neu anmelden zu müssen.

---

## 1. Aktive Session starten
- Der Benutzer ist aktuell mit der Rolle **Immigration Manager** eingeloggt.
- Das Frontend zeigt Informationen, Berechtigungen und Dashboards basierend auf dieser Rolle an.

## 2. Rollenwechsel initiieren
- Der Benutzer klickt auf „Rolle wechseln“ im Hauptmenü.
- Das Frontend sendet eine Anfrage an den `Role-Switch-Endpoint`, inklusive JWT-Token und aktueller Rolle.

## 3. Prüfung & Rollenabruf
- Der `Auth-Service` validiert das JWT und ruft alle zugewiesenen Rollen des Benutzers ab.
- In diesem Fall: `["Immigration Manager", "Marketing Manager"]`.

## 4. Auswahl einer neuen Rolle
- Das System zeigt eine Auswahlmaske mit verfügbaren Rollen.
- Der Benutzer wählt **Marketing Manager**.

## 5. Prüfung auf offene Aktivitäten
- Das System prüft, ob in der aktuellen Rolle noch offene Tasks oder ungespeicherte Daten existieren.
  - **Wenn ja:** Eine Warnmeldung erscheint („Sie haben ungespeicherte Änderungen – wirklich fortfahren?“).
  - **Wenn nein:** Es geht direkt weiter.

## 6. Rollentausch & Session-Erneuerung
- Das System erstellt einen **neuen JWT-Token** mit den Claims für `Marketing Manager`.
- Der alte Token wird ungültig gemacht (Token-Invalidation).
- Der Benutzerkontext im Frontend wird aktualisiert:
  - Menü-Elemente, Dashboards, Zugriffsrechte und Filter passen sich an die neue Rolle an.
  - Alle Komponenten reagieren nun auf die Logik von `Marketing Manager`.

## 7. Logging & Sicherheit
- Jede Rollenänderung wird im `Audit-Log` gespeichert:
  - Alte Rolle, neue Rolle
  - Benutzer-ID, Zeitstempel, IP-Adresse
- Das ermöglicht vollständige Nachvollziehbarkeit für Admins.

---

### Technische Details
- Die Tokens sind **kurzlebig** (z. B. 30–60 Min.) und an die aktive Rolle gebunden.
- Die Rolle ist Bestandteil des `access_token`, nicht des `refresh_token`.
- Das Frontend reagiert auf Rollenwechsel **ohne Page Reload**, durch Context-Neuladen.
- Optionale Erweiterung: **Rollen-Merging** (z. B. gleichzeitige Sicht auf KPIs & Anträge), wird derzeit nicht unterstützt.
- Sicherheitsmechanismus: Ein Benutzer kann nur zu Rollen wechseln, die **vorher durch das IAM-System validiert** wurden.

---

Mit diesem Mechanismus bleiben Benutzer flexibel, ohne Sicherheitsrisiken oder Systemkomplexität zu erhöhen. Gleichzeitig unterstützt das System zukünftige Szenarien wie Rollen-Hierarchie oder parallele Dashboards.