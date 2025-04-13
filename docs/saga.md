# Saga-Muster – Verteilte Transaktionen und Kompensation

Diese Dokument beschreibt, wie AiCUnet mit verteilten, mehrstufige Prozesse umgeht, ohne zentrale Datenbank-Transaktionen zu haben.  Ziel ist, Prozesse stabil, nachvollziehbar und flexibel zu halten.

---

## Warum Saga?

- Statt klassische Transaktionen mit Sperren zu nutzen, verwenden wir Ereignisse mit Kompensationslogik.
- Das sorgt für Konsistenz, auch wenn Services unabhängig arbeiten.

---

## Wie funktioniert eine Saga?

1. Ein Prozess startet, z. B. ein mehrstufig z.B. Recruiting-Prozess.
2. Mehrere Services übernehmen nacheinander Aufgaben (z. B. CV-Prüfung, Interview-Planung, Vertragsgenerierung).
3. Wenn alle Schritte erfolgreich sind, ist der Prozess abgeschlossen.
4. Wenn ein Schritt fehlschlägt, werden vorherige Schritte rückgängig gemacht (Kompensation).

Jeder Schritt funktioniert so: wird ausgeführt oder zurückgenommen.

---

## Technische Umsetzung

- Keine komplizierte Tool nötig.
- Umsetzung mit Node.js oder NestJS ist möglich.
- Die Schritte eine Beispiel Pattern von Saga werden als einfache Liste beschrieben.

### Beispiel Code in TypeScript:

```ts
const recruitingSaga = [
  Step("CV validieren").withAction(validateCV).withCompensation(removeCV),
  Step("Interview planen").withAction(scheduleInterview).withCompensation(cancelInterview),
  Step("Vertrag erstellen").withAction(generateContract).optional()
];
```

**Was macht diese code ?**
- Es wird ein Saga-Prozess für Recruiting-Workflow definiert.
- Jede Schritt hat eine Aktion (`withAction`) und eine reverse Abwicklung (`withCompensation`).
- Wenn ein Schritt fehlschlägt, wird der vorherige rückgängig gemacht.
- Der dritte Schritt ist optional / wenn der Prozess dort endet, braucht es keine Rücknahme.

---

Fehlerbehandlung: Unerwartete Unterbrechung oder Löschung
	•	Ein Dokument wird gelöscht oder ein externe Fehler (z. B. Stromausfall) bricht der Prozess.
	•	Die Saga erkennt Abbruch und führt automatisch Kompensationsschritte.
	•	Letzte Aktionen wie z. B. „Freigabe für Bearbeitung“ oder „Benachrichtigung“ werden zurückgenommen.
	•	Ursprüngliche Zustand wird wiederhergestellt, sodass z. B. der Kunde neu starten oder Änderungen machen kann.

---

Beispiel-Code (Rollback bei unerwartetem Fehler)

```ts
const steps: SagaStep[] = [
  {
    name: "Dokument speichern",
    action: async () => {
      // Datei wird temporär abgelegt
      await saveTemp(doc);
    },
    compensate: async () => {
      // Falls Prozess abbricht z.B Datei löschen
      await deleteTemp(doc);
    },
  },
  {
    name: "Dokument validieren",
    action: async () => {
      // Validierung schlägt eventuell fehler
      if (!isValid(doc)) throw new Error("Ungültiges Dokument");
    },
  },
  {
    name: "Freigeben für weitere Schritte",
    action: async () => {
      await publishEvent("DokumentFreigegeben", doc.id);
    },
  },
];
```

---

## Umgang mit Ausfällen

- Wenn Ablauf unterbrochen wird, kann Status aus EventStore wiederhergestellt werden.
- Wenn Rückgängigmachen selbst fehlschlägt, wird Ereignis gespeichert, bis jemand es manuell prüft (Dead Letter Queue).

---

## Erweiterbarkeit

- Mehrere Sagas können miteinander verbunden werden. Unlimitiert.
- Es ist möglich, manuelle Freigaben einzubauen (z. B. durch einen Manager).
- Jede Saga hat eine ID und kann gezielt beobachtet oder wiederholt werden.

---

## Besonderheit bei AiCUnet

- Saga ist hier nicht nur für technische Prozesse zuständig.
- Steuert auch, wie sich unabhängige Services gemeinsam verhalten.
- Das alles funktioniert ohne komplexe Tools, nur mit Events, Rücknahme und Protokollieren.

