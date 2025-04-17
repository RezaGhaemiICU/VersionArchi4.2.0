# Preismodul – Übersicht und Funktionsweise

Das Preismodul ist ein zentraler Bestandteil der Systemarchitektur und ermöglicht eine dynamische, transparente und automatisierte Preisgestaltung über alle relevanten Prozesse hinweg.

---

## Ziel

Ziel ist es, die Preisverwaltung zu vereinfachen, Fehlerquellen zu minimieren und eine nachhaltige Steuerung der Preislogik unabhängig von manuellen Eingriffen zu ermöglichen.

---

## Technische Struktur

### Zentrale Preisverwaltung
- Enthält alle definierten Preismodelle (z. B. Standardpreise, Kundenpreise, Sondertarife)
- Verwaltung erfolgt rollenbasiert mit Logging
- Änderungen werden versioniert gespeichert, um Nachvollziehbarkeit zu garantieren

### Preisanpassungssystem
- Ermöglicht globale oder selektive Preisänderungen (nach Region, Produkt, Kunde)
- Unterstützt geplante Änderungen mit Aktivierungsdatum
- Kann auch manuelle Einzelpreisänderungen pro Auftrag verwalten

### Currency Management (Währungslogik)
- Unterstützt mehrere Währungen
- Täglicher Abruf aktueller Umrechnungskurse (Exchange Rate) von zentraler Stelle
- Automatische Umrechnung aller preissensitiven Felder bei Anzeige oder Berechnung

### Preiskalkulation
- Wird über das zentrale System automatisiert ausgeführt
- Bezieht sich dynamisch auf:
  - Auftragstyp
  - Zusatzleistungen
  - aktuelle Preislisten
  - Währungsdaten

### Externe Preis-Trigger
- Preisänderungen oder Währungsupdates lösen systemweite Updates über Event-basierte Kommunikation aus
- Bereits geöffnete oder gespeicherte Aufträge werden automatisch aktualisiert

---

## Sicherheit und Kontrollmechanismen

- Jede Preisänderung erfordert eine Bestätigung durch berechtigte Rollen
- Automatisches Logging für Transparenz
- Schutz vor Überschreibung durch Lock-Mechanismus bei parallel geöffneten Formularen

---

## Vorteile für Betrieb und Skalierung

- Keine manuelle Pflege von Währungsdaten mehr notwendig
- Zentrale Sichtbarkeit aller Preisbewegungen
- Vorbereitung für dynamische Preismodelle in Zukunft
- Skalierbar auf neue Regionen und Märkte ohne technische Umstellung
