# Service Request Flow mit SAGA und EventBus

Dieses Dokument beschreibt den technischen Ablauf eines dynamischen Service Requests in einem verteilten System. Ziel ist es, genehmigungspflichtige Services benutzerfreundlich zu verwalten, inklusive Budgetprüfung, Genehmigungslogik und automatischer Auslösung über eine SAGA.

---

## Ablaufbeschreibung

1. **Formularausfüllung**  
   Ein Benutzer (Assignee oder HR) füllt ein Formular aus, um einen neuen Service zu beantragen.

2. **Request absenden**  
   Das Formular wird per POST an das Gateway gesendet.

3. **Execution Service startet Prozess**  
   Der Execution Service erzeugt ein Event `request_created` und speichert den initialen SAGA-Zustand (z. B. "teil").

4. **Event-basierte Weiterleitung**  
   Das Event wird über den internen EventBus verteilt.  
   HR- und Housing-Service reagieren asynchron darauf.

5. **HR-Service prüft Budget & Zustimmung**  
   - Wenn Budget passt: Event `budget_ok` wird emittiert  
   - Wenn nicht: `abgelehnt`

6. **Housing-Service prüft Verfügbarkeit**  
   - Gibt entweder `wohnungen_gefunden` oder `nicht_verfügbar` zurück.

7. **Execution Service sammelt Antworten**  
   - Sobald alle positiven Antworten eingetroffen sind, wird der Status der SAGA aktualisiert.

8. **Finalisierung des Prozesses**  
   - Event `request_completed` wird emittiert  
   - UI wird aktualisiert

9. **Fehler- oder Timeout-Behandlung**  
   - Bei Problemen wird automatisch ein Retry oder eine Compensation gestartet.  
   - Fehlerhafte Nachrichten landen in der Dead Letter Queue.

---

## Technische Details

- **SAGA Store:** Verfolgt alle Schritte des Prozesses inkl. Status, Fehlern und Retry-Informationen  
- **EventBus:** Verteilt Events zuverlässig an angebundene Services  
- **Compensation:** Wenn Teilprozesse fehlschlagen, wird eine Rückabwicklung automatisch getriggert  
- **Dead Letter Queue:** Events, die mehrmals fehlschlagen, werden hier gespeichert

---
