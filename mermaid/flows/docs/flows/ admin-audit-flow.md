# Admin Audit Flow

Dieser Flow beschreibt, wie Administratoren über das AiCUnet-System Audit-Logs einsehen können, um sicherheitsrelevante Aktivitäten wie Logins, Rollenwechsel, Datenänderungen oder ungewöhnliche Zugriffsversuche zu überwachen und zu exportieren.

---

## 1. Zugriff auf das Audit Dashboard
- Ein Benutzer mit Admin-Rechten öffnet das „Audit & Monitoring“-Modul.
- Die UI bietet Filtermöglichkeiten für:
  - Benutzername oder ID
  - Rolle (z. B. Consultant, Account Manager)
  - Zeitfenster (Start- und Enddatum)
  - Typ der Aktion (Login, Bearbeiten, Rollenwechsel etc.)

## 2. Anfrage an Audit API
- Das Frontend sendet eine GET-Anfrage mit den Filterdaten an den Audit-Service.
- Das JWT-Token des Admins wird an die Anfrage angehängt.

## 3. Authentifizierung & Berechtigungsprüfung
- Der `Auth-Service` validiert das JWT und prüft, ob die Rolle die Berechtigung `read_audit_logs` besitzt.
- Falls **nicht erlaubt**, wird HTTP-Code `403 Forbidden` zurückgegeben.

## 4. Abfrage der Audit-Datenbank
- Der Audit-Service verwendet die Filterkriterien, um Einträge aus der `Audit Log DB` zu laden.
- Geladene Aktionen umfassen:
  - Logins (Erfolg/Fehler)
  - Rollenwechsel (inkl. Quelle/Ziel)
  - Datenänderungen (z. B. Antrag editiert)
  - Zugriffsversuche auf gesperrte Bereiche

## 5. Analyse & Gruppierung
- Die Logs werden:
  - Nach Benutzer gruppiert
  - Nach Zeitstempel sortiert
  - In der Oberfläche tabellarisch dargestellt

## 6. Erkennung verdächtiger Aktivitäten
- Das System prüft automatisch auf potenziell auffällige Aktionen:
  - Mehrere fehlgeschlagene Logins
  - Rollenwechsel in kurzer Zeit
  - Zugriff auf nicht erlaubte Daten
- Solche Einträge werden visuell hervorgehoben (z. B. mit rotem Icon oder Warnhinweis).

## 7. Alarmierung
- Bei kritischen Vorfällen kann optional ein automatischer Alert an den „Super Admin“ gesendet werden.
- Die Meldung enthält alle relevanten Details inkl. IP-Adresse, User-ID und Timestamp.

## 8. Exportfunktion
- Der Admin kann alle angezeigten Logs exportieren:
  - CSV für Excel-Analysen
  - PDF für Compliance-Reports
  - JSON für systemseitige Weiterverarbeitung

---

### Technische Hinweise
- Alle Logs sind **immutable** – sie können nicht verändert oder gelöscht werden.
- Speicherung erfolgt verschlüsselt in einer Audit-spezifischen DB.
- Jeder Log-Eintrag enthält:
  - Aktionstyp
  - Zeitstempel (ISO 8601)
  - User-ID, Rolle, IP-Adresse
  - Technischer Kontext (z. B. User-Agent, API-Endpunkt)

Dieses Modul ist zentral für **Transparenz, Sicherheit und Nachvollziehbarkeit** aller relevanten Systemvorgänge.