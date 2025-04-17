# AuftragLoeschung – Löschprozess eines Auftrags

Dieser Flow beschreibt, wie ein Auftrag im System entfernt wird – inklusive Validierung, Abhängigkeitserkennung und Fehlerhandling.

## Ablaufbeschreibung

1. **Löschanfrage:**  
   Der Benutzer initiiert den Prozess über die Benutzeroberfläche.

2. **Weiterleitung & Verarbeitung:**  
   Die Anfrage wird über das Gateway an den Execution Service weitergegeben.

3. **Eventbasierter Löschprozess:**  
   Der Execution Service sendet ein Event, um den Auftrag zu löschen.  
   Zuerst wird der Status auf *"PENDING_DELETE"* gesetzt, um Inkonsistenzen zu vermeiden.

4. **Abhängigkeitsprüfung:**  
   Vor endgültigem Löschen wird geprüft, ob der Auftrag z. B. verknüpfte Dokumente oder Services hat.

5. **Entscheidung:**  
   - Wenn **keine** Abhängigkeiten bestehen, erfolgt die Löschung.
   - Wenn **Fehler** auftreten (z. B. Timeout), wird das Event im **DLQ** (Dead Letter Queue) gespeichert.

6. **Antwort an Benutzer:**  
   Der aktuelle Status (erfolgreich oder fehlgeschlagen) wird im Frontend angezeigt.

## Technische Aspekte

- **Event-Driven:** Löschung wird asynchron verarbeitet.
- **Fehlerrobust:** Bei Fehlern erfolgt automatische Speicherung im DLQ.
- **Atomicität:** System prüft alle Bedingungen, bevor es zur finalen Löschung kommt.

---

_Für kritische Prozesse wird so maximale Sicherheit bei minimalem Risiko gewährleistet._