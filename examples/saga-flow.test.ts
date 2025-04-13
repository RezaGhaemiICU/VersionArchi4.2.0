// @filename: saga-flow.test.ts
// Saga Pattern simple Umsetzung.
// ziel ist mehrere schritten zu führen mit companstion , Fehlerbehebung. 


// Steps in Saga Pattern
// Jeder step hat eine main operation, und eine optionale Kompensation.
type SagaStep = {
  name: string;
  action: () => Promise<void>;
  compensate?: () => Promise<void>;
};

// Saga Runner – step by step führt
// Fehler, gleicht vorherige Step mit der Kompensation. async function runSaga(steps: SagaStep[]) {
  const completedSteps: SagaStep[] = [];

  for (const step of steps) {
    try {
      // aktuelle step führen
      await step.action();
      completedSteps.push(step); // wenn erfolgreich registriert.
    } catch (error) {
      // Fehler case, vorherigen Schritte rückgängig 
      for (const done of completedSteps.reverse()) {
        if (done.compensate) {
          await done.compensate(); compensate()
        }
      }
     // oder abrechen Alarm 
      throw new Error(`Saga abgebrochen bei: ${step.name}`);
    }
  }
}

// simple database für simulation
let database: string[] = [];
let notifications: string[] = [];

// test start
describe("Saga Flow", () => {

  // vor jeder test wird das letzte data cleared
  beforeEach(() => {
    database = [];
    notifications = [];
  });

  // Erfolgreich Test: Beide Schritte laufen
  it("should complete all steps when successful", async () => {
    const steps: SagaStep[] = [
      {
        name: "Benutzer speichern", // user saved
        action: async () => {
          database.push("reza@example.com");
        },
        compensate: async () => {
          database = []; // wenn nötig data löschen
        },
      },
      {
        name: "Benachrichtigung senden", // :D
        action: async () => {
          notifications.push("Willkommen Reza und Franz und Arif!“);
        },
        compensate: async () => {
          notifications = [];
        },
      },
    ];

    // Saga voll schritten führen
    await runSaga(steps);

    // muss alles gespeichert sein
    expect(database).toContain("reza.ausländer@icunet.group“);
    expect(notifications).toContain("Willkommen Reza!");
  });

  // Test mit Fehler, zweite Schritt schlägt fehler und eine Kompensation muss gemacht werden.
  it("should roll back if a step fails", async () => {
    const steps: SagaStep[] = [
      {
        name: "Benutzer speichern",
        action: async () => {
          database.push("fail@example.com");
        },
        compensate: async () => {
          database = []; // user delete companion aktion.
        },
      },
      {
        name: "Benachrichtigung senden (Fehlschlag)",
        action: async () => {
          throw new Error("Fehler beim Senden"); // Absicht fehler.
        },
        compensate: async () => {
          notifications = [];
        },
      },
    ];

    // muss fehler durchgeführt werden und der message abrechen kommen!!
    await expect(runSaga(steps)).rejects.toThrow("Saga abgebrochen bei: Benachrichtigung senden (Fehlschlag)");

    // check dass compantion gemacht und ist nicht über geblieben
    expect(database).toHaveLength(0);
    expect(notifications).toHaveLength(0);
  });
});