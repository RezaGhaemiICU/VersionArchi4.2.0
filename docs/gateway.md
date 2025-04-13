# API Gateway – Zentraler Zugriffspunkt für das System

Diese Dokument beschreibt zentrale Rolle API Gateways in der AiCUnet-Architektur.  Es steuert Zugriff, Sicherheit, Routing und Monitoring aller eingehenden Anfragen.

---

## Hauptaufgaben

- Alle Anfragen aus Frontend laufen durch Gateway  übernimmt:
  - **Authentifizierung (Authentication)**
  - **Autorisierung (Authorization)**
  - **Routing** zur richtigen Serviceinstanz
  - **Logging & Monitoring** Zugriffe
  - **Fehlerbehandlung, Rate-Limiting, und Sicherheit check**

---

## Sicherheit in Gateway

- Prüfung **JWT Tokens** aus Header (`Authorization: Bearer ...`)
- Extraktion **Rollen** und **Claims** zu Zugriffskontrolle
- Ablehnung ungültiger oder fehlender Tokens
- Zugriffskontrolle nach Rolle → z. B. `/admin/*` nur für Admin
- **Rate Limiting** schützt vor Brute-Force oder Abuse

---

## Routing

- Paths sind **versioniert**, z. B. `/v1/hr/get-employee`
- Gateway mapped Paths zu eine Microservice (Service Discovery optional)
- Möglichkeit zu Vorverarbeitung: Payload-Validierung, Header-Checks
- Technologie: `Express.js`, `Fastify`, oder eine angepasste Middleware in Node.js

---

## Beispielcode: Token-Prüfung

```ts
app.use((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token || !verifyToken(token)) {
    return res.status(401).send("Unauthorized");
  }
  req.user = decodeToken(token);
  next();
});
```

**Was macht diese Code?**
- Extrahiert Token
- Prüft mit `verifyToken()`
- Fügt Nutzerinfos (`req.user`) für spätere Service hinzu
- Lehnt unautorisierte direkt ab

---

## Monitoring & Logging

- Erfassen von:
  - Timestamp, Pfad, Statuscode
  - Nutzer-ID, Bearer-Token-Signatur
  - Antwort dauer und Fehlermeldung (falls vorhanden)
- Anbindung an Log-Service (z. B. ELK, Grafana, Loki)
- Weiterleitung kritische Fehler Alerting-Systeme

---

## Testbarkeit

- Getestet werden:
  - Public vs. Protected Routen
  - Rollenrechte (Admin, HR, Assignee, Finanz manager,Immigration oder Case Manager  etc.)
  - Geschwindigkeit von Weiterleitung
  - Verhalten bei Token-Fehler

---

## Erweiterungen

- Anbindung **OAuth2 / OpenID Connect** möglich (z. B. Google, Azure)
- Unterstützung für **WebSockets oder SSE** in zukünftige Versionen ( jetzt auch, aber nicht nötig)
- Einsatz von **Feature Flags** zu Steuerung einzelne Endpoints
- Integration von **Service Discovery**, wenn Services dynamisch skalieren

---

## Was vermeiden?

- Direkte Zugriff von Frontend to Microservices (Bypass des Gateways)
- Unsichere Speicherung oder Übertragung von Tokens (kein HTTP / LocalStorage)
- Logik in Gateway auslagern (z. B. Validierung von Businessprozessen)
*  Gateway macht nur Kontrolle, nicht Geschäftslogik

---

