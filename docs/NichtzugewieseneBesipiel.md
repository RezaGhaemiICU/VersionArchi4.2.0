
# Aufträge ohne Zuweisung

In Beschreibung sehen wir, **wie Plattform nicht zugewiesene Aufträge filtert, analysiert und an Frontend liefert** – 

inklusive alle relevanten Informationen wie:

- Auftragsname  
- Herkunftsland (OriginCountry)  
- Zielland (TargetCountry)  
- Assignee (sofern vorhanden)  
- Fehlende Pflichtdokumente je Auftrag  

---

## Herausforderung

- Die Daten liegen verteilt in mehreren Services und Tabellen.
- Eine Auftrag kann mit Länder, Dokumente und ggf. Assignee verknüpft sein.
- Das braucht eine **Zusammenführung von Daten** ohne direkte Service-zu-Service-Kommunikation.

---

## Zentrale Koordination durch ExecutionService

### Komponenten im Ablauf:

1. **Frontend**  
   Fragt: `GET /auftraege/unassigned` = UI-Tabelle mit Filteroptionen.

2. **API Gateway**  
   Validiert Token + Rolle = Weiterleitung an ExecutionService.

3. **ExecutionService** 
   - Koordiniert alle benötigten Services.  
   - Keine direkte Verbindung zwischen Services nötig.  
   - Macht Ablauf skalierbar, wartbar und erweiterbar möglich.

4. **AuftragService**  
   - Fragt alle nicht zugewiesenen Aufträge ab (`WHERE assigned = false`).  
   - Fügt Daten zu Assignee & Ländern hinzu.

5. **DokumentenService**  
   - Prüft je nach Auftrag, welche Pflichtdokumente fehlen.
   - Liefert eine Liste zurück: `[{auftragId: ..., fehlt: ['Reisepass', 'Foto']}, ...]`

6. **Aggregation Layer (Teil des ExecutionService)**  
   - Fasst die Daten zusammen, AuftragService und DokumentenService logisch.  
   - Finales Response-Objekt an Frontend.

7. **Vorteile**  

Problem und Unsere Lösung
- Service-zu-Service-Kommunikation	verboten → alles läuft über ExecutionService
- Datenaggregation aus mehreren Quellen	durch koordiniertes Querying
- Erweiterbarkeit (z. B. neue Felder)	einfach durch neue Calls in ExecutionService
- Fehlerbehandlung & Retry	kann zentral im ExecutionService kontrolliert werden

8. **Retry & Fehlerbehandlung**
- Falls z. B. der DokumentenService nicht erreichbar ist:
•	ExecutionService kann Retry-Mechanismus auslösen.
•	Bei permanentem Fehler → Response mit Teildaten oder technischer Alert.

9. **Fazit**
•	Erlaubt maximale Trennung von Services.
•	Ist stabil, nachvollziehbar, testbar.
•	Und bereit für zukünftige Erweiterungen wie weitere Filter oder Drittsysteme.

## Ergebnis (Response in Frontend)

```json
[
  {
    "auftragName": "Musterauftrag",
    "originCountry": "Deutschland",
    "targetCountry": “IRAN“,
    "assigneeName": "Franz Reiter“,
    "fehlendeDokumente": ["Passkopie", "Mietvertrag"]
  },
]





