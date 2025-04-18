# Report-Generierung Flow

Dieser Ablauf beschreibt, wie Benutzer in AiCUnet Berichte anfordern, wie das System die Daten verarbeitet und wie das Ergebnis abhängig von Benutzerrolle, Datenanforderung (live oder gecached) und Format ausgeliefert wird.

## 1. Anforderung des Berichts
- Der Benutzer klickt im Dashboard auf „Bericht generieren“.
- Die Frontend-Anwendung sendet eine Anfrage an den zentralen Report-Service (Report API).

## 2. Authentifizierung und Rollenprüfung
- Der Auth-Service prüft den JWT-Token (Authentifizierung).
- Basierend auf dem Token wird geprüft, welche Rolle der Benutzer aktuell verwendet (z. B. Account Manager, Assignee).

## 3. Berichtstyp-Erkennung
- Je nach Rolle wird entschieden, welche Berichtstypen erlaubt sind:
  - Assignee → Eigene Anträge
  - HR → Status aller Mitarbeitenden
  - Account Manager → KPI-Berichte, Monatsübersichten etc.

## 4. Live-Daten vs. Cache
- Das System prüft, ob der Bericht **aktuelle Live-Daten** enthalten soll:
  - **Ja** → Abfrage in Echtzeit über `Data Aggregation Service`
  - **Nein** → Nutzung von gecachten Berichten aus der `Report DB`

## 5. Erstellung des Berichts
- Dynamischer Aufbau der Struktur (abhängig vom Typ und Filter):
  - Zeitraum, Status, Region, Kundengruppe etc.
- Daten werden formatiert und strukturiert.

## 6. Formatierung & Export
- Benutzer kann wählen: PDF, Excel (XLSX), JSON.
- Das System verwendet Templates (LaTeX oder Docx-Generatoren) zur Formatierung.

## 7. Speicherung & Zugriff
- Metadaten des Berichts werden in der `Report DB` gespeichert (Name, Typ, Ersteller, Timestamp).
- Der Benutzer erhält:
  - Einen direkten Download-Link
  - Oder öffnet den Bericht im integrierten Viewer

## 8. Protokollierung & Audit
- Jede Berichtsanforderung wird mitgeloggt:
  - Benutzer-ID
  - Rolle
  - Zeitstempel
  - Berichtstyp
- Diese Logs sind einsehbar für Admins (Audit Trail).

---

### Technische Hinweise
- Echtzeitdaten werden aus verschiedenen Services zusammengeführt (z. B. Anträge, Kundenstatus, Fristen).
- Der `Report Generator` läuft containerisiert.
- Export-Templates sind versioniert, um Layout-Inkonsistenzen zu vermeiden.
- Die Generierung ist asynchron möglich, bei größeren Berichten wird ein Hintergrundjob erstellt und der Benutzer via Notification informiert.