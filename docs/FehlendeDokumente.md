
# Beispiel 2: Anzeige unzugewiesener Aufträge + fehlende Dokumente

## Ziel
Der Nutzer (Manager, Admin, etc.) je nach Policy, möchte eine vollständige Übersicht über Aufträge ohne zugewiesene Assignees, inklusive aller notwendigen aber fehlenden Dokumente.

---

## Technischer Ablauf (Flow)

1. **GET-Request aus dem UI**  
   Anfrage an `/auftraege/unassigned` → wird über Gateway weitergeleitet

2. **Gateway-Rollenprüfung**  
   Gateway prüft, ob der Nutzer ausreichende Rechte hat (Policy & Token Check)

3. **ExecutionService übernimmt Koordination**  
   - Anfrage an `AuftragService`: Rückgabe aller `assigned = false`-Aufträge
   - Parallel: Anfrage an `DokumentenService` für fehlende Dokumente je Auftrag

4. **Aggregation & Rückgabe**  
   Der ExecutionService kombiniert die Informationen zu einer aggregierten Antwort:
   - Auftragsname  
   - Ursprungsland  
   - Zielland  
   - (Optional) Assignee-Name  
   - Fehlende Dokumente

---

## Besonderheiten

- **Daten aus zwei Quellen** werden logisch zusammengeführt  
- **Kein direkter Join**, sondern orchestrierter Datenzugriff  
- **Skalierbarkeit** durch asynchrone Verarbeitung möglich  
- **Leicht erweiterbar** z. B. mit weiteren Metadaten (Status, Fristen etc.)

---

