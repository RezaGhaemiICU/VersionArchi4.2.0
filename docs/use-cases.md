---
#  Use Cases – AiCUnet Plattform

---

##  Use Case 1 – Antrag wird erstellt und geprüft

**Akteure:** HR, Assignee, Immigration Manager  
**Ablauf:**
1. HR erstellt einen Antrag über das UI (Komponente A1).
2. System prüft automatisch auf Pflichtfelder (lokale Validierung).
3. Bei Vollständigkeit wird ein Event `AntragErstellt` an Event-Bus gesendet.
4. Service 3 speichert Audit-Eintrag und sendet `DokumentGeprüft`.
5. Service 5 startet daraufhin den Workflow-Versand.

<!--
trigger-event + reaction + action 
-->

---

##  Use Case 2 – Dokument-Upload durch Assignee

**Akteure:** Assignee, System  
**Ablauf:**
1. Assignee lädt ein Dokument hoch (via Komponente A2).
2. API Gateway überprüft Authentifizierung.
3. Microservice 2 speichert das Dokument in DB2.
4. Service 3 triggert Event `DokumentGeprüft`.
5. Event-Bus leitet es an Service 5 weiter (Exec Unit).
6. Validierung + Logging + Aktion "Bestätigung".

<!--
event-driven logic+audit 
-->

---

##  Use Case 3 – Fehler & Kompensation via Saga

**Akteure:** System, Saga Coordinator  
**Ablauf:**
1. Schritt 1 der Saga (Zahlung) wird ausgeführt.
2. Schritt 2 (Versand) scheitert.
3. Saga Coordinator erkennt den Fehler.
4. Es wird ein Kompensationsprozess gestartet (Rückgängig machen von Zahlung).
5. Event `SagaFehlgeschlagen` wird für Logging & Alerts gesendet.

<!--
Fehlerverarbeitung + rollback + alerting 
-->

---
