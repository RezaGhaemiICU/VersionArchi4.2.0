# Automatisierungsschicht – Technische Übersicht

## Ziel und Rolle

Die Automatisierungsschicht ist verantwortlich für das koordinierte Ausführen von wiederkehrenden oder serviceübergreifenden Prozessen. Sie dient als technisches Bindeglied zwischen der Business-Logik in den Microservices und den übergeordneten Prozessanforderungen.

---

## Aufgaben der Schicht

- Empfang und Auswertung von internen Events (z. B. „Auftrag gelöscht“)
- Auslösen von automatisierten Folgeaktionen (z. B. Dokumente löschen, HR informieren)
- Sicherstellung der korrekten Reihenfolge und Transaktionskontrolle
- Integration mit anderen Services über strukturierte Aufrufe (keine direkte Service-zu-Service-Kommunikation)

---

## Kommunikation

- Alle automatischen Prozesse werden zentral über die sogenannte **Execution-Service-Komponente** gesteuert.
- Diese Komponente empfängt ein Event und „weiß“, welche Schritte in welcher Reihenfolge ausgeführt werden müssen.
- Jeder Schritt wird gezielt an einen zuständigen Service delegiert (z. B. DokumentenService, HR-Service).

**Wichtig:** Es handelt sich hierbei **nicht um eine reine Event-Queue** oder ein Transportmedium – die Logik der Kette liegt in dieser Komponente selbst.

---

## Vorteile dieser Architektur

- **Zentralisierung der Logik:** Alle automatisierten Prozessketten sind an einem Ort definiert.
- **Erweiterbarkeit:** Neue Schritte können ohne Eingriff in andere Services ergänzt werden.
- **Wartbarkeit:** Klare Trennung von Event-Auslösung und Aktionsdurchführung.
- **Fehlertoleranz:** Möglichkeit zum automatischen Wiederholen bei temporären Fehlern (Retry Mechanismus).
- **Transparenz:** Jeder Schritt wird geloggt und ist nachvollziehbar.

---

## Technische Details

- Events werden intern erzeugt und strukturiert übergeben (z. B. mit ID und Kontextdaten).
- Die Execution-Komponente ruft zuständige Services mit spezifischen Aufträgen auf.
- Fehlerhafte Aufträge werden in einen separaten Kanal (z. B. DLQ) übergeben, inkl. Alarmierung.
- Keine direkte Kommunikation zwischen Fachservices – alles läuft über die Automatisierungsschicht.

---

## Beispielprozess (vereinfacht)

1. Benutzer klickt auf „Auftrag löschen“ → Event `AuftragGeloescht` wird ausgelöst.
2. Execution-Service startet den Prozess:
   - Dokumente entfernen
   - HR benachrichtigen
   - User-Verknüpfung löschen
   - Interne Notifikation
3. Alle Services melden Rückgabe → Execution-Service prüft Status.
4. Bei Fehler: Retry oder DLQ.
5. Abschlussmeldung an UI.

---

## Fazit

Die Automatisierungsschicht ist ein intelligentes, internes Steuerelement für komplexe Abläufe. Sie verbessert Übersichtlichkeit, reduziert Service-Abhängigkeiten und erhöht die Prozesssicherheit erheblich – ohne externe Tools oder Drittanbieter-Komponenten.