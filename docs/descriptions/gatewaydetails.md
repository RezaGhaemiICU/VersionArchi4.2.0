# Gateway Layer – Technischer Überblick

## Ziel und Funktion

Das Gateway bildet den zentralen Einstiegspunkt in das System. Es nimmt alle eingehenden Anfragen entgegen, prüft sie auf Sicherheit und Authentizität und leitet sie anschließend gezielt an die zuständigen internen Komponenten weiter.

---

## Hauptaufgaben

- **Authentifizierung prüfen:** Jeder eingehende Request enthält einen Token, der validiert wird.
- **Berechtigungen kontrollieren:** Anhand von Rollen und Richtlinien wird geprüft, ob der Nutzer die Aktion ausführen darf.
- **Routing:** Nach der Prüfung wird der Request an den passenden Microservice oder das Frontend weitergeleitet.
- **Rate Limiting:** Schutz vor Überlastung durch Begrenzung der Anzahl an erlaubten Anfragen.
- **IP-Filterung:** Zugriff nur von erlaubten IP-Adressen möglich (optional, je nach Umgebung).

---

## Sicherheitsmechanismen

- **Token-Verifikation:** Gültigkeit, Ablaufzeit, Signatur und Rolle des Tokens werden geprüft.
- **Rollback bei Fehlern:** Bei ungültigen Tokens, blockierten IPs oder fehlender Berechtigung wird der Zugriff sofort abgewiesen.
- **Zentralisierte Logging-Punkte:** Alle abgelehnten oder problematischen Anfragen werden zur Analyse dokumentiert.

---

## Kommunikation mit anderen Schichten

- **Frontend:** Leitet Benutzeraktionen (z. B. Formular-Eingaben, Seitenwechsel) über das Gateway ein.
- **Policy Layer:** Wird zur Berechtigungsprüfung herangezogen.
- **Services Layer:** Übergibt geprüfte Requests gezielt an die zuständigen Microservices.
- **Logging & Monitoring:** Sendet alle sicherheitsrelevanten Ereignisse an das zentrale Logging.

---

## Technische Vorteile

- **Zentrale Kontrolle:** Alle sicherheitskritischen Entscheidungen werden vor dem Eintritt ins System gefällt.
- **Klarer Fluss:** Keine direkte Kommunikation zwischen Frontend und Microservices.
- **Skalierbarkeit:** Gateway kann unabhängig skaliert und aktualisiert werden.
- **Modularität:** Weitere Prüfungen (z. B. Geolocation, App-Version, Device-Type) sind einfach integrierbar.

---

## Zusammenfassung

Das Gateway ist die erste Verteidigungslinie gegen unerlaubten oder fehlerhaften Zugriff. Es vereint Sicherheitsprüfungen, Routing und Request-Management in einem zentralen Knotenpunkt und stellt damit sicher, dass nur erlaubte und gültige Anfragen das interne System erreichen.