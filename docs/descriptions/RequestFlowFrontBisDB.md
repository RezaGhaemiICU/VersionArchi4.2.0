# Request Flow – Von Frontend bis Datenbank

## Ziel

Diese Architektur sorgt dafür, dass jede Benutzeranfrage sicher, nachvollziehbar und effizient verarbeitet wird – vom Frontend bis zur finalen Datenhaltung.

---

## Ablaufbeschreibung

### 1. **Benutzerinteraktion im Frontend**

- Die Benutzeroberfläche stellt verschiedene Eingabemasken, Buttons oder Listen zur Verfügung.
- Bei Aktionen wie „Absenden“, „Speichern“ oder „Anfrage stellen“ wird ein strukturierter Request erzeugt.
- Dieser enthält: Authentifizierungstoken, Nutzereingaben und Kontextinformationen.

---

### 2. **Übertragung via Load Balancer**

- Die Anfrage trifft zuerst auf den Load Balancer.
- Hier wird je nach Auslastung der nächste verfügbare Gateway-Knoten gewählt.
- Gleichzeitig findet das erste Monitoring statt (z. B. Verfügbarkeit).

---

### 3. **API Gateway & Sicherheitsprüfung**

- Der API Gateway übernimmt:
  - Validierung des Tokens
  - Rollenprüfung
  - IP-Filterung (z. B. gegen verdächtige Zugriffe)
  - Rate-Limiting, um Missbrauch zu verhindern

- Danach wird der Request an den zuständigen Microservice weitergeleitet.

---

### 4. **Routing zum passenden Microservice**

- Der Gateway erkennt anhand des Pfades (z. B. `/assignments/create`) den zuständigen Service.
- Die Anfrage wird intern über ein sicheres Protokoll an den Service übergeben.

---

### 5. **Service-Logik & Validierung**

- Im Zielservice wird die Anfrage geprüft:
  - Pflichtfelder vorhanden?
  - Datenkonsistenz korrekt?
  - Business-Regeln eingehalten?

- Bei Fehlern wird ein strukturierter Fehler zurückgegeben.
- Bei Erfolg beginnt die Verarbeitung.

---

### 6. **Datenbankoperation**

- Validierte Daten werden in einem internen Modell abgebildet.
- Anschließend wird ein Transaktions-Block geöffnet.
- Schreib- oder Leseoperation wird gegen die entsprechende Datenbank ausgeführt.

- Erfolgreiche Operation:
  - Änderungen werden committed.
  - Geänderte Daten werden zurückgegeben (z. B. neue ID).

---

### 7. **Antwort zurück zum Frontend**

- Der Service baut eine standardisierte Antwortstruktur.
- Diese enthält z. B. `status`, `data`, `message`, `traceId`.
- Die Antwort durchläuft API Gateway und Load Balancer zurück zur UI.

- Die UI verarbeitet die Antwort:
  - Erfolgreich: Anzeige oder Weiterleitung
  - Fehlerhaft: Anzeige einer Fehlermeldung mit passender Benutzerführung

---

## Technische Besonderheiten

- Jede Anfrage wird durch eine eindeutige **Request-ID (Trace-ID)** markiert.
- Der gesamte Flow ist **asynchron tolerant**, d. h. bei Bedarf könnten Schritte durch Hintergrundjobs ergänzt werden.
- Sensible Daten werden nur verschlüsselt und gemäß Rechtekontext verarbeitet.
- Interne Kommunikation findet über **sichere Service-zu-Service-Protokolle** statt.

---

## Erweiterungspotenziale (Optional)

- Caching-Ebene für häufige Anfragen
- Mechanismus zur Wiederholung bei temporären Fehlern
- Audit-Protokolle für bestimmte kritische Operationen (z. B. Datenänderung)

---

## Fazit

Dieser Request Flow bietet einen **sicheren**, **skalierbaren** und **sauber strukturierten** Pfad für jede Benutzeranfrage – und ist darauf ausgelegt, sich nahtlos in die bestehende Architektur und Kontrollmechanismen einzufügen.