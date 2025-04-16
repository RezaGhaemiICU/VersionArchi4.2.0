## Beschreibung der Business-Logik-Schicht

---

## Ziel der Schicht

Diese Schicht beinhaltet die gesamte **geschäftsrelevante Logik**, die für die Erfüllung von Prozessen notwendig ist. Sie bildet die zentrale Stelle, an der **Regeln, Berechnungen, Prüfungen und Statusverläufe** umgesetzt werden – unabhängig von Darstellung (Frontend) oder Persistenz (Datenbank).

---

## Hauptaufgaben

- Verarbeitung von **Auftragsregeln** (z. B. Genehmigungen, Statuswechsel, Spezialfälle).
- Koordination von abhängigen Services über **Kommunikations-Schnittstellen**.
- Prüfung von Bedingungen (z. B. „Sind alle Dokumente vorhanden?“).
- Berechnung von Ergebnissen, Validierung von Eingaben, Filterung von Daten.
- Nutzung von Policies/Rollenlogik für dynamisches Verhalten.

---

## Technische Struktur

- Jedes Modul in dieser Schicht ist zuständig für genau **eine fachliche Verantwortung**.
- Kommunikation mit Services erfolgt entweder **direkt** oder **über den ExecutionService**.
- Events aus der Automatisierungsschicht werden hier verarbeitet.
- **Statusübergänge und Workflows** werden nachvollziehbar definiert (z. B. Auftrag → In Bearbeitung → Erledigt).
- Alle Schritte sind **testbar, nachvollziehbar und entkoppelt** von UI oder Datenmodell.

---

## Verbindung zu anderen Schichten

- Wird von der Gateway-/Routing-Schicht angesprochen.
- Gibt Daten strukturiert an die Service-Schicht weiter.
- Nutzt Policies und Berechtigungen aus der Rollenlogik.
- Triggert automatisierte Aktionen in der Automatisierungsschicht.

---

## Zielsetzung

Diese Schicht garantiert, dass **alle fachlichen Anforderungen einheitlich, überprüfbar und wartbar** abgebildet werden. Sie bildet das Rückgrat der Anwendung und trennt **fachliche Logik klar von technischer Umsetzung**.

---
