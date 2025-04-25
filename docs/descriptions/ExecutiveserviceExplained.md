# Ablauf eines komplexen Nutzerprozesses – erklärt anhand des Diagramms

Dieses Diagramm zeigt den typischen Ablauf eines komplexen Nutzerprozesses in unserer Architektur. Der gesamte Prozess wird zentral vom **ExecutionService** orchestriert. Die Kommunikation erfolgt schrittweise und basiert auf Events zwischen Services.

---

## Beschreibung der Schritte

1. **User Action**  
   Der Nutzer startet eine komplexe Anfrage (z. B. Upload, Antrag, Änderung).

2. **Gateway Layer**  
   Das Gateway empfängt die Anfrage und leitet sie an den zentralen ExecutionService weiter.  
   (Hinweis: Das Gateway führt keine Logik aus.)

3. **ExecutionService**  
   Der ExecutionService ist verantwortlich für:
   - Technische Validierung der Anfrage
   - Ermittlung, welche Services benötigt werden
   - Starten der einzelnen Service-Aktionen per Event
   - Überwachen der Antworten von Services
   - Fehlerbehandlung und Retry-Logik

4. **Koordinierte Microservices**  
   Die eigentlichen Aufgaben werden durch spezialisierte Services erledigt:
   - Service A: z. B. Daten auslesen
   - Service B: fachliche Prüfung
   - Service C: Speicherung im System  
   Jeder Service antwortet mit einem Event an den ExecutionService zurück.

5. **Fehler- oder Erfolgsbehandlung**  
   - Bei Erfolg: Rückmeldung an Gateway → Feedback an Nutzer  
   - Bei Fehler: Übergabe an eine „Dead Letter Queue“ zur späteren Analyse

6. **Asynchrone Nebenprozesse (optional)**  
   Parallel zur Hauptlogik löst der ExecutionService weitere Services aus:
   - Logging
   - Benachrichtigungen
   - Analytics  
   Diese Nebenprozesse laufen unabhängig vom Hauptprozess.

---

## Ziel dieses Aufbaus

- Klare Trennung zwischen Logik (ExecutionService) und Ausführung (Services)
- Skalierbarkeit durch lose Kopplung der Komponenten
- Volle Transparenz durch Event-basierte Kommunikation
- Wiederverwendbares Muster für alle komplexen Geschäftsprozesse