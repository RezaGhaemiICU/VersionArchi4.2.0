#  Security – Authentifizierung, Autorisierung & Token-Handling

Diese Dokument beschreibt Sicherheitsarchitektur von System / von Anmeldung über Rollenprüfung bis zu sichere Token-Verwaltung.

---

## Authentifizierung (AuthN)

- Nutzer melden sich über Login-Komponente an.
- Die Anmeldedaten werden an **API-Gateway** geschickt, wo Verifizierung erfolgt.
- Bei Erfolg generiert Gateway ein **JWT (JSON Web Token)** mit Benutzerrolle und Berechtigungen (**Claims**).
- Das Token wird im **Speicher des Browsers** oder in einem **HttpOnly-Cookie** abgelegt.
- Bei jeder weiteren Anfrage wird das Token im Header übermittelt:  
  `Authorization: Bearer <token>`

---

##  Autorisierung (AuthZ)

- Der Zugriff auf APIs und Daten erfolgt über **Role-Based Access Control (RBAC)**.
- Typisch Rollen: `HR`, `Assignee`, `Immigration Manager`, `Admin`, etc.
- Die Rollenprüfung erfolgt zentral in Gateway – **vor der Weiterleitung** an Microservices.
- Zusätzlich können einzelne Service eine eigene Rollenlogik haben (**Double-Layer-Prinzip**). WICHTIG

---

##  Token-Management

- Struktur des JWT:
  - `sub`: Benutzer-ID
  - `role`: Rolle des Nutzers
  - `exp`: Ablaufzeitpunkt
- Tokens haben eine kurze Lebensdauer (z. B. 15 Minuten).
- Bei Ablauf kann ein **Refresh Token** verwendet werden.
- Refresh Token werden sicher in **HttpOnly-Cookie** gespeichert.

---

##  OAuth2 / OpenID Connect (100% optional)

Für Login via externe Identity Provider wie Google oder Azure / nur bei Bedarf.

- Die Integration erfolgt über Gateway.
- Nach erfolgreiche Authentifizierung wird ein lokale JWT gestellt.
- Der Ablauf nutzt **Redirect + Callback** zur Kommunikation mit Identity Provider.

---

##  Sicherheitsmaßnahmen

- Alle Verbindungen laufen über **HTTPS**.
- Nutzung von `helmet.js` für sichere HTTP-Header.
- **Rate Limiting** schützt gegen Brute-Force-Angriffe.
- (Optional) **IP-Filterung / Geolokalisierung**.
- Schutz vor **XSS und SQL Injection** durch Validierung im Gateway.

---

## Logging & Monitoring

- Alle Login- und Logout-Vorgangs werden geloggt.
- Fehlgeschlagene Login werden erfasst / bei mehrfachen Versuchen: **Alert**.
- Token-Änderungen und Rollenwechsel sind **nachvollziehbar** (Audit-Log).

---

##  Erweiterbarkeit bei Skalierung in the zukunft.

- Integration in ein **Zero-Trust-Sicherheitsmodell**.
- Aktivierung von **MFA (Multi-Factor Authentication)**.
- Erweiterte **Session-Verwaltung**.
- **Identity Federation** für Cross-System Zugriffe.
