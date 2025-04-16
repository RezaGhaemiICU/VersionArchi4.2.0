## Beschreibung: Steuerungsschicht der Geschäftslogik

---

## Zweck der Schicht

Diese Schicht dient als **Vermittler zwischen Gateway und den Business-Services**. Sie prüft, ob alle Voraussetzungen für eine Aktion erfüllt sind, verarbeitet Eingaben, und koordiniert den Ablauf innerhalb eines Geschäftsvorgangs.

---

## Aufgaben im Überblick

- **Validierung** eingehender Daten (z. B. Pflichtfelder, Datenformate).
- **Rollen- und Rechteprüfung**: Was darf der Nutzer mit dieser Anfrage tun?
- Auswertung von **Policies** und Privilegien, um UI-Logik mit Backend-Verhalten zu synchronisieren.
- Vorbereitung der Daten für Services oder Datenbankzugriffe.
- Entscheidung, ob ein Schritt direkt oder asynchron (z. B. über Eventbus) weitergegeben wird.

---

## Technische Umsetzung

- Die Schicht besteht aus **Controller-ähnlichen Modulen**, die jeweils einen klar abgegrenzten Anwendungsfall abdecken.
- Sie sind vollständig entkoppelt von UI oder persistenter Speicherung.
- Kommunikation mit Services erfolgt durch klar definierte **Service-Schnittstellen**.
- Falls notwendig, wird die **ExecutionService** verwendet, um serviceübergreifende Abläufe zu starten.
- Jede Aktion kann **geloggt, überwacht und zurückverfolgt** werden.

---

## Verbindung zu anderen Ebenen

- **Empfängt Anfragen** vom Gateway oder API Layer.
- **Spricht mit Business-Services**, basierend auf validierten Bedingungen.
- **Löst ggf. Automatisierungen** oder Event-basiertes Verhalten aus.
- Bereitet **Antwortdaten für das Frontend** oder andere externe Systeme vor.

---

## Vorteile dieser Schicht

- Klare Trennung zwischen **technischer Steuerung** und **fachlicher Logik**.
- **Wartbar und testbar** durch definierte Logik-Einheiten.
- **Erweiterbar** für neue Use Cases ohne Seiteneffekte in anderen Schichten.
- Ermöglicht eine **feingranulare Rechtevergabe** über Rollen und Policies.

---
