
# Beispiel 1: Auftrag löschen (Delete Request Orchestration)

## Ziel
Der Prozess dient zur sicheren und konsistenten Löschung eines Auftrags. Es muss sichergestellt werden, dass alle verknüpften Daten (z. B. Dokumente, HR-Referenzen, Benachrichtigungen) sauber und ohne Inkonsistenz entfernt werden – inklusive Fehlerbehandlung.

---

## Technischer Ablauf (Flow)

1. **User-Initiierte Aktion**  
   Der Nutzer sendet eine `DELETE`-Anfrage über das UI.

2. **Gateway-Prüfung**  
   Der API Gateway prüft die Berechtigung anhand des JWT-Tokens und leitet die Anfrage an den Execution Service weiter.

3. **Initiale Validierung im AuftragService**  
   Prüfung, ob der Auftrag existiert und ob er bereits abgeschlossen/verlinkt ist. Falls nicht:  
   → Erstellung eines Events `AuftragGeloescht`.

4. **Event-Verarbeitung über ExecutionService**  
   Der ExecutionService übernimmt die zentrale Orchestrierung:
   - Ruft `DocumentService`, `UserService`, `HRService` u. a. auf
   - Jeder Service prüft lokal Abhängigkeiten und führt ggf. Soft-/Hard-Delete durch

5. **Retry & Fehlerbehandlung**  
   - Wenn ein Service nicht erreichbar ist → Nachricht landet in **DLQ**
   - Retry erfolgt automatisch (mit konfigurierbarer Zeit & Anzahl)
   - Bei dauerhaftem Fehler: manuelle Analyse über UI möglich

6. **SAGA-Orchestrierung (Optional)**  
   - Wird der Löschprozess als SAGA behandelt, können im Fehlerfall **Compensation-Events** ausgelöst werden (z. B. Wiederherstellung der Dokumente)
   - ExecutionService behält den Zustand jeder Phase der SAGA, speichert Checkpoints

7. **Audit Logging**  
   Alle Teilschritte und Events werden revisionssicher protokolliert.

---

## Besondere Vorteile

- **Zentral orchestriert** (kein direkter Service-zu-Service Call)  
- **Wiederholbarkeit & Rückverfolgbarkeit**  
- **Flexibler Retry & Monitoring via DLQ**  
- **Kompatibel mit Eventual Consistency & Compensation Patterns**

---

