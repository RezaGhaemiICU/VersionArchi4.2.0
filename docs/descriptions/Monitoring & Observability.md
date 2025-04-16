# Monitoring & Observability

## Ziel

Dieses Layer sorgt für vollständige Transparenz im Systembetrieb. Es ermöglicht das frühe Erkennen von Problemen, die Analyse von Anomalien und die kontinuierliche Überwachung der Performance und Verfügbarkeit aller Komponenten.

---

## Technische Struktur

### 1. **Zentrale Log-Sammlung (Log Aggregation)**

- Alle Microservices schreiben strukturierte Logs.
- Diese Logs werden gesammelt, zentral gespeichert und durchsuchbar gemacht.
- Jeder Log-Eintrag enthält:
  - Zeitstempel
  - Service-Name
  - Request-ID
  - Log-Level (z. B. Info, Warnung, Fehler)
  - Technische Nachricht oder Stack-Traces
- Ermöglicht schnelles Debugging bei Fehlern oder Ausfällen.

### 2. **Metrik-Erfassung (Systemmetriken + Custom Metrics)**

- Für jeden Service werden Standardmetriken gesammelt:
  - Anfragen pro Minute
  - Antwortzeiten
  - Fehlerraten
  - Speichernutzung, CPU, Netzwerklast
- Zusätzlich können eigene Business-Metriken definiert werden:
  - Anzahl der verarbeiteten Aufträge
  - Anzahl fehlender Dokumente
  - Erfolgsquote von Webhook-Ausführungen

### 3. **Visualisierung & Dashboard**

- Alle Metriken werden in einem zentralen Dashboard dargestellt.
- Diagramme, Zeitverläufe und Schwellenwerte sind visualisiert.
- Jeder Service hat eine eigene Detailansicht.
- Schneller Überblick bei Incidents oder Performance-Spitzen.

### 4. **Alerting**

- Automatische Benachrichtigung bei kritischen Zuständen:
  - Fehlerhäufung
  - Services nicht erreichbar
  - Ungewöhnliche Verhaltensmuster
- Alerts werden ausgelöst bei definierten Schwellenwerten.
- Eskalationsregeln sind hinterlegt (z. B. zuerst intern, dann extern).

### 5. **Tracing & Korrelations-IDs**

- Jede Anfrage trägt eine eindeutige ID.
- Diese ID bleibt über alle Services hinweg erhalten.
- Damit kann eine vollständige Reise (Trace) einer Anfrage rekonstruiert werden.
- Besonders hilfreich bei asynchronen oder verteilten Fehlern.

---

## Vorteile

- Hohe Betriebssicherheit durch Echtzeit-Erkennung.
- Weniger manuelle Fehlersuche.
- Technische Stabilität ist messbar.
- Systeme skalieren besser, wenn ihre Belastung beobachtbar ist.
- Jede Entscheidung (z. B. zur Optimierung) basiert auf klaren Daten.

---

## Hinweis

Dieses Layer ist vollständig integriert – kein externer Monitoring-Dienst notwendig. Die Erfassung und Visualisierung sind intern geplant und können auch für SLA-Tracking erweitert werden.