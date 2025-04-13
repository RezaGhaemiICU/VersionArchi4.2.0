# Monitoring – Systemüberwachung in AiCUnet

Diese Dokument beschreibt, wie AiCUnet Dienste überwachen kann, Fehler und System zustand sichtbar machen kann.  Ziel ist, schnell auf Probleme zu reagieren und Zustand von Plattform jederzeit nachvollziehbar zu behalten.

---

## Warum brauchen wir Monitoring?

- Um erkennen, wenn Services langsam werden oder ausfallen
- Um wiederkehrende Fehler oder Systemgrenzen früher als Manuell zu identifizieren
- Um KPIs (z. B. Durchlaufzeiten, Fehlerraten) transparent zu machen
- Um Qualität und Stabilität für Kunden und interne Teams garantieren.

---

## Komponente für Monitoring

- **Logging Service**: strukturierte Logs von alle Services (z. B. ELK oder Loki) möglich ist beides! 
- **Alerting Service**: Reagiert auf bestimmte Threshold oder Fehlermuster (z. B. via Prometheus) für später bei skalierung Grafana!
- **Tracing Service** (optional): Visualisiert zusammenhängende Requests über mehrere Microservices hinweg
- **Health Checks**: Jeder Service stellt einen Endpoint, der aktuelle Status zurückgibt

---

## Beispiel:  Health-Check-Endpoint in Node.js

```ts
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date(),
    version: process.env.VERSION || "unknown"
  });
});
```

**Was macht diese Code?**
- Code stellt eine einfache URL bereit, über die Zustand eine Services überprüft werden kann.
- Die Antwort enthält Status, Zeitstempel und evtl. die aktuelle Softwareversion.
- Dieser Endpoint wird regelmäßig von externe Tools abgefragt.

---

## Was überwacht?

- Fehler pro Service (z. B. 500er-Statuscodes)
- Antwort zeiten (z. B. Durchschnitt, Ausreißer)
- Anzahl von Events pro Sekunde
- CPU-, Memory- und Netzwerkverbrauch (über Systemmetriken)
- Uptime pro Service

---

## Was passiert bei Probleme?

- Alerts werden gemacht (z. B. bei mehr als 5 Fehlern in 1 Minute)
- Benachrichtigungen gehen an Dev/Ops-Teams (E-Mail, Slack, MS Teams)
- Falls nötig, automatische Neustarts von Instanzen (Self-Healing)

---

## Erweiterungsmöglichkeiten

- ein zentrale Dashboards (z. B. mit Grafana)
- Tracing aktivieren, um Performance bottelnecks besser zu analysieren
- Analyse der Nutzungsmuster (z. B. für Kapazitätsplanung oder Abrechnung)

---

## Uniqueness bei AiCUnet

- Monitoring ist nicht nur technisches Tooling / es ist Teil der Architektur
- hilft bei Reporting, Troubleshooting und Prozessoptimierung
- Alle relevante Rollen (Tech, Business, Support) erhalten passende Einblicke.

