# Reporting & Automatisierung 

> Diese Dokument beschreibt, welche Reporting-Funktion aus fachliche Sicht unterstützt werden.

---

## Zielgruppen & Perspektiven

- HR-Verantwortlich (Kunden seite)
- Assignee & Mitarbeiter
- Interne Rollen (Immigration, Account Manager, Finance, Legal)
- Management (Head of, Director, Vorstand, etc.)

---

## Typische Reporting-Anforderungen

- Übersicht alle laufende und abgeschlossene Fälle
- Filter nach Status, Länder, Zeit, Ansprechpartnern
- SLA-Tracking und Performance-Messen pro Case
- Übersicht über alle hochgeladenen oder fehlenden Dokumente
- Finanz übersicht von Auftrag, Kunde oder Prozess (Kosten, Dauer)
- Reporting zu Eskalationen oder SLAs-Verletzung
- Export von Nutzer aktionen oder Audit Trail (DSGVO-konform)

---

## Technische Umsetzung

- Alle Prozesse generieren strukturierte Events im System
- Events werden im EventStore gespeichert → auswertbar über API oder UI
- Zugriffe rollenbasiert (RBAC)
- Exportformate: CSV, Excel, PDF, JSON
- Integration geplanter Module:
  - Reporting Dashboard (KPI, Zeit filter, Kunden filter)
  - API-base Report Builder (für individuelle Berichte)
  - Zeit steuerte automatisch Report (monatlich, quartalsweise)

---

## Erweiterbare Use-Cases (für die Zukunft)

- Tracking von Feedbacks und Nutzerzufriedenheit (Survey Results)
- Lieferanten-Auswertung mit Bewertung & Preis vergleich
- Visualisierung von Migration oder Genehmigung dauer
- Report zu internen Verarbeitung zeiten (jede Abteilung)
- Revision Berichte für Steuer oder ISO-Audits
- Machine-Learning-Auswertungen (z. B. Trendprognose)
- Heatmaps oder Geodaten analyse für Visa-/Standort verteilung
---

## Hinweis

> Reporting ist nicht optional. Es ist eine Bestandteil von Plattform kein separate modul, sondern Teil von Datenfluss.
