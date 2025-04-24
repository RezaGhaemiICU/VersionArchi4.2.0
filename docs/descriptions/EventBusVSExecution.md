## Vergleich: Event Bus vs. Execution Service

In unserer AiCUnet-Architektur verwenden wir zwei Arten von Kommunikation zwischen Services, je nach Komplexität und Zweck:

### Event Bus – Einfaches Broadcasting

- Was? Sendet ein Event an viele Empfänger gleichzeitig  
- Ziel: Lose Kopplung und hohe Flexibilität  
- Beispiel: Nach einer Registrierung wird eine Willkommensmail gesendet und die Analyse aktualisiert  
- Vorteil: Services sind unabhängig 

### Execution Service – Gesteuerte Orchestrierung

- Was? Führt mehrere Schritte in definierter Reihenfolge aus  
- Ziel: Komplexe Abläufe mit Fehlerkontrolle und Retry  
- Beispiel: Passwort-Reset oder Service-Stornierung mit Rückbuchung  
- Vorteil: Vollständige Kontrolle, Logging, Wiederholversuche  

---

### Übersicht

| Merkmal               | Event Bus                  | Execution Service                  |
|-----------------------|----------------------------|-------------------------------------|
| Architekturprinzip    | Event-Driven               | Orchestrierung / Saga              |
| Kopplung              | Lose                       | Zentral                             |
| Fehlerhandling        | Schwer zu kontrollieren    | Integriert mit Retry und Logging    |
| Flexibilität          | Hoch                       | Mittel                              |
| Reihenfolge           | Nicht garantiert           | Vollständig kontrolliert            |
| Beispiel              | Registrierung → Mail       | Passwort-Reset → Code + Änderung    |

---