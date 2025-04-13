# Microservices – Struktur, Kommunikation und Design

Diese Dokument beschreibt Architektur, Design prinzip und Kommunikation wege von Microservices in AiCUnet. Ziel ist, eine saubere, skalierbare und nachvollziehbare Umgebung für die Entwicklung und Betrieb bereitzustellen.

---

## Grundprinzipien

- Jede Service hat genau **eine fachliche Verantwortung** (Single Responsibility)
- Services sind vollständig **isoliert** und unabhängig von anderen entwickelbar
- **Kein direkter Zugriff** auf Datenbanken anderer Services erlaubt außer,
- Kommunikation erfolgt **nur über REST (hinter Gateway)** oder **asynchron über EventBus**

---

## Struktur und Aufgabenverteilung

- **Service 1** – z. B. für Verwalten von Recruiting-Fällen
- **Service 2** – z. B. für Mitarbeiterdaten und HR-Profile
- **Service 3** – Dokumentenverarbeitung (Scans prüfen, Anhänge validieren)
- **Service 4** – Logging & Monitoring
- **Service 5** – Automatischer Executive Service (kein eigener Fachcode)

---

## Kommunikation

- Alle externe Zugriffe laufen über **API Gateway** → zentrale Sicherheit und Zugriffkontrolle
- Interne Kommunikation durch **asynchron über EventBus** (( eine interne API ) klar definition nötig)  
- Beispiel: Eine Event `DokumentGeprüft` wird von Service 3 gelöst → Service 5 führt die Folgeaktion

---

## Beispiel: Event-Flow 

1. **Service 1 (RecruitingService)** erhält eine neue CV über UI
2. CV wird validiert und als Event `CVValidiert` an EventBus geschickt
3. **Service 3 (DocumentService)** prüft automatisch, Qualität von Dokument und sendet eine Event `DokumentGeprüft`
4. **Service 5 (ExecService)** reagiert darauf, z. B. durch automatische Auslösung eine E-Mail über **Service 6 (Notification)**
5. Falls ein Fehler passiert (z. B. ungültiges Format), wird ein Event `DokumentAbgelehnt` gesendet, das weitere Kompensationsaktionen macht.

**Was zeigt dieses Beispiel?**
- Jede Service kennt nur seine Aufgabe
- Kommunikation ist lose gekoppelt über Events
- Automatische Prozess-flow ist generiert

---

## Datenzugriff und Speicher

- Jede Service besitzt eine eigene Datenbank (z. B. PostgreSQL)
- Datenbankzugriff erfolgen nur durch jeweiligen Service
- Nutzung von ORMs wie Prisma  ( Object-Relational Mapping )
- Fremde daten werden exclusive über Events oder APIs abgerufen

---

## Testbarkeit und Deployment

- Jede Service ist **einzeln test- und deploybar**
- Tests: Unit-Tests mit Jest, Integrationstests mit Mock-Events und Mock-Datenbanken
- Optional: Unterstützung für **CI/CD und Canary-Deployments** vor gesehen

---

## Sicherheitsprinzipien

- Nur Anfragen mit gültige Token von Gateway werden akzeptiert
- Jede Service prüft zusätzlich Berechtigungen bei sensible Funktion
- Kein Service öffnet Ports nach außen – Kommunikation nur intern erlaubt- könnte weiterhin viel ergänzt werden. ( Sicherheit Aspekte)

---

## Erweiterbarkeit

- Neue Services lassen sich problemlos integrieren, da Kommunikation über Events sind
- Option zu Gruppierung Services nach **Bounded Contexts (DDD)** a zentrale Pattern für Domain-Driven Design.
- Jede Service kann unabhängig horizontal skaliert werden

---

## Anti-Patterns und Was wir vermeiden

- Direkte Kommunikation zwischen Services über IP/Port ist **verboten**
- **Geteilte Datenbank oder Tabellen** über Services hinweg sind nicht erlaubt
- **APIs mit überladener Logik** für viele Rollen gleichzeitig sind zu vermeiden
* Gemeinsame Datenhaltung und sehr komplexe APIs führen zu Coupling und Errorschwäche
---

