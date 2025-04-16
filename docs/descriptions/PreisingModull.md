Preismodul – Übersicht und Funktionsweise

Das Preismodul ist ein zentraler Bestandteil der Systemarchitektur und ermöglicht eine dynamische, transparente und automatisierte Preisgestaltung über alle relevanten Prozesse hinweg.

⸻

Ziel

Ziel ist es, die Preisverwaltung zu vereinfachen, Fehlerquellen zu minimieren und eine nachhaltige Steuerung der Preislogik unabhängig von manuellen Eingriffen zu ermöglichen.

⸻

Technische Struktur

1. Zentrale Preisverwaltung
	•	Enthält alle definierten Preismodelle (z. B. Standardpreise, Kundenpreise, Sondertarife).
	•	Verwaltung erfolgt rollenbasiert mit Logging.
	•	Änderungen werden versioniert gespeichert, um Nachvollziehbarkeit zu garantieren.

2. Preisanpassungssystem
	•	Ermöglicht globale oder selektive Preisänderungen (nach Region, Produkt, Kunde).
	•	Unterstützt geplante Änderungen mit Aktivierungsdatum.
	•	Kann auch manuelle Einzelpreisänderungen pro Auftrag verwalten.

3. Currency Management (Währungslogik)
	•	Unterstützt mehrere Währungen.
	•	Täglicher Abruf aktueller Umrechnungskurse (Exchange Rate) von zentraler Stelle.
	•	Automatische Umrechnung aller preissensitiven Felder bei Anzeige oder Berechnung.

4. Preiskalkulation
	•	Wird über das zentrale System automatisiert ausgeführt.
	•	Bezieht sich dynamisch auf:
	•	Auftragstyp
	•	Zusatzleistungen
	•	aktuelle Preislisten
	•	Währungsdaten

5. Externe Preis-Trigger
	•	Preisänderungen oder Währungsupdates lösen systemweite Updates über Event-basierte Kommunikation aus.
	•	Dadurch wird z. B. ein bereits offener Auftrag automatisch aktualisiert, ohne manuelles Zutun.

⸻

Sicherheit und Kontrollmechanismen
	•	Jede Preisänderung erfordert eine Bestätigung durch berechtigte Rollen.
	•	Automatisches Logging für Transparenz.
	•	Schutz vor Überschreibung durch Lock-Mechanismus bei parallel geöffneten Formularen.

⸻

Vorteile für Betrieb & Skalierung
	•	Keine manuelle Pflege von Währungsdaten mehr notwendig.
	•	Zentrale Sichtbarkeit aller Preisbewegungen.
	•	Vorbereitung für dynamische Preismodelle in Zukunft.
	•	Skalierbar auf neue Regionen und Märkte ohne technische Umstellung.
