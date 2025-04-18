# Auftrag Löschung – Fehlerrobuste Umsetzung mit Recycle Bin

Dieses Modul beschreibt, wie ein Löschvorgang eines Auftrags robust und nachvollziehbar ausgeführt wird, selbst bei Fehlern oder Abbrüchen im Prozess.

---

## Ziel
Sicheres Löschen von Aufträgen mit Fehlerbehandlung und Wiederherstellungsoption, ohne den Benutzer unnötig zu verwirren.

---

## Ablaufübersicht

1. **Löschanfrage durch den Benutzer:**
   Der Benutzer klickt im Frontend auf „Auftrag löschen“.  
   → Diese Aktion triggert eine Anfrage an das Gateway.

2. **Übergabe an ExecutionService:**
   Das Gateway leitet die Anfrage an den zuständigen ExecutionService weiter, der den Prozess orchestriert.

3. **Eventbasierte Initialisierung:**
   Ein Event `auftrag.delete.requested` wird über den EventBus publiziert. Der Service setzt den Status im Auftragseintrag auf `PENDING_DELETE`.

4. **Abhängigkeitsprüfung:**
   Der ExecutionService überprüft, ob noch verknüpfte Daten (z. B. Dokumente, Services) bestehen.

5. **Soft-Delete mit Recycle Bin:**
   - Falls **keine Abhängigkeiten** vorhanden sind, wird der Auftrag nicht sofort vollständig gelöscht, sondern im Status `SOFT_DELETED` in eine Art Recycle Bin verschoben.
   - Ein interner Timer (z. B. 7 Tage) startet, nach dessen Ablauf der Auftrag final gelöscht werden kann, wenn keine Reaktion erfolgt.

6. **Fehler oder Abbruch:**
   - Falls beim Löschen ein Fehler oder Timeout auftritt, wird ein Event `auftrag.delete.failed` publiziert.
   - Dieses wird automatisch in einer **Dead Letter Queue (DLQ)** gespeichert.
   - Nur **Admin-User** erhalten eine Benachrichtigung über den Fehler inkl. Fehlergrund.
   - Für den Endnutzer bleibt die Oberfläche ruhig – keine direkte Fehlermeldung sichtbar.

7. **Feedback an User:**
   - Der Benutzer erhält im Erfolgsfall oder ähnliches eine einfache Rückmeldung.
   - Bei Fehlern wird keine technische Information gezeigt, alles läuft im Hintergrund weiter.

---

## Besondere Merkmale

- **Recycle Bin Logik:** Aufträge und alle abhängige daten, können für eine begrenzte Zeit wiederhergestellt werden.
- **Silent Failure Handling:** Endnutzer werden nicht mit Fehlermeldungen konfrontiert.
- **Admin-Benachrichtigung:** Nur autorisierte Rollen sehen kritische Fehlerdetails.
- **Eventgesteuerte Architektur:** Die gesamte Logik funktioniert entkoppelt, nachvollziehbar und asynchron.

---