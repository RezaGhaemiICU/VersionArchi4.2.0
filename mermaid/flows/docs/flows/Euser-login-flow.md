# User Login Flow

Dieser Login-Prozess beschreibt den vollständigen Ablauf vom Öffnen der Login-Seite bis zur erfolgreichen Anmeldung und Initialisierung des Benutzerkontexts im System AiCUnet.

## 1. Öffnen der Login-Seite
- Der Benutzer navigiert zur Login-Seite.
- Es wird eine einfache Eingabemaske angezeigt (E-Mail oder Benutzername).

## 2. Eingabe der Zugangsdaten
- Der Benutzer gibt seine registrierte E-Mail-Adresse oder den Benutzernamen ein.
- Keine Passworteingabe – das System arbeitet OTP-basiert (One-Time Password).

## 3. Versand des OTP-Codes
- Das System generiert einen sechsstelligen OTP-Code.
- Der Code wird per E-Mail an die hinterlegte Adresse des Benutzers geschickt.
- Gültigkeit des Codes: 10 Minuten.

## 4. Eingabe des OTP-Codes
- Der Benutzer gibt den erhaltenen Code in das Formular ein.
- Es wird geprüft, ob der Code gültig, korrekt und noch nicht abgelaufen ist.

## 5. Validierung
- **Wenn ungültig**: Fehlermeldung wird angezeigt, Retry möglich.
- **Wenn gültig**: Das System prüft die im Hintergrund gespeicherten Rollen des Benutzers.

## 6. Rollenzuweisung
- Das System holt alle verfügbaren Rollen für den Benutzer aus der Datenbank (z. B. Assignee, HR, Account Manager).
- **Mehrere Rollen**: Benutzer sieht UI zur Auswahl der aktiven Rolle.
- **Nur eine Rolle**: Die Rolle wird automatisch gesetzt.

## 7. Token-Generierung
- Nach der Rollenwahl wird ein JWT (JSON Web Token) mit Benutzerinformationen und Rollenrechten generiert.
- Der Token enthält:
  - Benutzer-ID
  - E-Mail
  - Aktive Rolle
  - Gültigkeit (Standard: 1 Stunde)

## 8. Weiterleitung zum Dashboard
- Basierend auf der aktiven Rolle wird der Benutzer an das entsprechende Dashboard weitergeleitet.
- Beispiel: HR → HR-Dashboard, Assignee → Antragsübersicht.

## 9. Session-Initialisierung
- Die Session startet mit vollständigem Benutzerkontext.
- Alle Komponenten (Navigation, Rechte, Filter) reagieren auf den aktiven Rollentyp.
- Die Benutzeraktivitäten können für spätere Audit-Zwecke geloggt werden.

---

### Technische Hinweise
- **OTP-Service** ist modular und kann durch SMS oder App erweitert werden.
- **Token-Handling** nutzt einen sicheren, serverseitigen JWT-Signaturmechanismus (z. B. HS256).
- Die Rollenlogik ist zentral in der `auth-service` API gekapselt.
- Der gesamte Flow ist DSGVO-konform implementiert, inkl. Logging und Consent-Management.