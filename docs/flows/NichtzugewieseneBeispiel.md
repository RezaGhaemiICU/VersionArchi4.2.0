# Nicht zugewiesene Fälle – Beispielablauf

Dieser Flow stellt dar, wie nicht zugewiesene Fälle (Cases) automatisch identifiziert und im System angezeigt werden.

## Ablaufbeschreibung

1. **Initiale Aktion:**  
   Der Benutzer öffnet sein Dashboard, um alle aktiven oder offenen Fälle zu sehen.

2. **Abruf der unzugewiesenen Fälle:**  
   Über das Gateway wird eine Anfrage an den Execution Service gesendet. Dieser stößt ein Event an, das über den EventBus an den zuständigen HR-Service weitergeleitet wird.

3. **Antwort und Anzeige:**  
   Der HR-Service antwortet mit einer Liste offener Fälle, die keinem Bearbeiter zugewiesen wurden. Diese werden dem User direkt angezeigt.

4. **Fehlerbehandlung:**  
   Sollte ein Fehler auftreten (z. B. Timeout, Kommunikation nicht erfolgreich):
   - wird der Fehler als Event dokumentiert,
   - automatisch in die DLQ geschrieben,
   - und dem Benutzer eine Fehlermeldung angezeigt.

## Technische Besonderheiten

- **Asynchrone Kommunikation:** Event-gesteuerte Abfrage sorgt für Entkopplung und Stabilität.
- **Fehlertolerant:** Bei Fehlern geht keine Information verloren.
- **Zentrale Sichtbarkeit:** Nicht zugewiesene Fälle sind jederzeit nachvollziehbar einsehbar.
- **Erweiterbar:** Kann auf andere Rollen (z. B. Consultants) erweitert werden.

---

_Dieser Mechanismus unterstützt die effiziente Zuweisung und verhindert Prozessverzögerungen._

---