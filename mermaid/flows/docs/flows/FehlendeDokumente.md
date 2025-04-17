# Fehlende Dokumente – Übersicht des Prüfprozesses

Der Flow zeigt, wie das System fehlende oder unvollständige Dokumente automatisch erkennt und meldet.

## Ablaufbeschreibung

1. **Initialisierung:**  
   Der Nutzer öffnet einen Fall im System. Dabei wird automatisch geprüft, ob alle Pflichtdokumente vorhanden sind.

2. **Anfrage an Execution Service:**  
   Über das Gateway wird eine Prüfung durch den Execution Service gestartet.

3. **Eventbasierte Prüfung:**  
   Der Execution Service sendet ein Event zur Dokumentenprüfung. Der zuständige HR-Service antwortet mit einer Liste der fehlenden Dokumente.

4. **UI-Aktualisierung:**  
   Das Frontend zeigt die fehlenden Dokumente direkt im Kontext des Falls an.

5. **Fehlerhandling:**  
   Wenn z. B. ein Timeout oder technischer Fehler auftritt:
   - wird das Event zur späteren Analyse im **DLQ** gespeichert,
   - und der Benutzer erhält einen visuellen Hinweis im UI.

## Technische Aspekte

- **Pflichtprüfung:** Dokumenten-Check basiert auf Fallkontext (Policy, Land, Serviceart).
- **Eventbasiert:** Vollständig entkoppelte Prüfung über EventBus.
- **Fehlertoleranz:** Probleme bei der Prüfung führen nicht zu Systemfehlern – UI bleibt reaktiv.
- **Auditfähig:** Jede Prüfung und Antwort ist nachvollziehbar und protokolliert.

---

_Somit ist sichergestellt, dass alle relevanten Dokumente zeitgerecht eingefordert werden können._