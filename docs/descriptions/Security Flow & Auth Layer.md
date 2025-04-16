# Security Flow & Auth Layer

## Ziel

Das Security- und Authentifizierungs-Layer sorgt für Schutz aller Daten und Systeme. Es stellt sicher, dass nur berechtigte Nutzer Zugriff erhalten, schützt vor unautorisierten Aktionen und prüft alle Interaktionen auf Validität und Integrität.

---

## Authentifizierung (User-Identifikation)

- Jeder Zugriff beginnt mit einem Login-Prozess.
- Der Nutzer erhält bei erfolgreichem Login ein Token (z. B. JWT), das die Identität bestätigt.
- Dieses Token wird bei allen weiteren Requests im Header mitgesendet.
- Tokens sind zeitlich begrenzt und können nicht manipuliert werden.

---

## Autorisierung (Zugriffsprüfung)

- Jeder eingehende Request wird am Gateway überprüft:
  - Ist das Token gültig?
  - Hat der Nutzer die notwendige Rolle für den Zugriff?
- Die Rolle allein reicht nicht – es werden zusätzliche **Privileges** (Berechtigungen) geprüft.
- Berechtigungen sind feingranular (z. B. „case:view“, „user:edit“, „document:upload“).
- Diese Regeln sind zentral definiert, pro Service konsistent und konfigurierbar.

---

## Token Management & Security-Funktionen

- Token Refresh: Bei Ablauf wird ein neues Token bereitgestellt, ohne dass der User neu einloggen muss.
- Logout zerstört aktive Sessions vollständig.
- Missbrauch (z. B. mehrfach fehlgeschlagene Logins) wird automatisch erkannt.
- Schutz vor Replay-Attacken und Token-Manipulation ist integriert.

---

## Rate Limiting & IP Filtering

- Jeder Nutzer/Client unterliegt einer **Request-Beschränkung** (z. B. X Anfragen/Minute).
- Überlastung oder Angriffe (z. B. DDoS) werden frühzeitig erkannt und geblockt.
- Bestimmte IP-Adressen können vollständig gesperrt oder nur teilweise erlaubt werden.
- Bei Verletzung dieser Regeln erfolgt ein Rückgabecode (z. B. 429 - Too Many Requests).

---

## Secrets & Konfigurationsmanagement

- API-Keys, Passwörter und kryptografische Schlüssel werden nicht im Code gespeichert.
- Alle sensiblen Informationen sind in einem **geschützten Secrets-Store** hinterlegt.
- Zugriff auf diese Secrets ist rollenbasiert limitiert (z. B. nur für Systemprozesse).
- Änderungen an Konfigurationen sind versioniert und auditierbar.

---

## Technische Vorteile

- Hohe Skalierbarkeit durch dezentrale Prüfmechanismen (Gateway prüft direkt).
- Maximale Sicherheit durch Trennung von Auth und Businesslogik.
- Alle sicherheitskritischen Aktionen sind protokolliert.
- Flexibilität: Regeln und Rollen können erweitert werden, ohne Code-Anpassung.

---

## Erweiterbarkeit

- Unterstützung für Single Sign-On (SSO) möglich.
- Mandantenfähigkeit (mehrere Kunden auf einer Plattform) ohne Sicherheitsrisiken.
- Zentrale Verwaltung von Rollen, Regeln und Tokens.