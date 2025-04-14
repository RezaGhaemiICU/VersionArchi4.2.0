//  Datei: core/saga-runner.ts

/**
 * Das ist eine simple beispiel wo man sieht wie eine Saga runner fuktionieren kann.
 * der führt Schritte einzeln, und kompensiert im Fehler fall die letzte Schritte mit Compensation.
 */

export interface SagaStep {
    name: string
    action: () => Promise<any>
    compensation: () => Promise<any>
  }
  
  export async function startSaga(steps: SagaStep[]) {
    const executedSteps: SagaStep[] = []
  
    for (const step of steps) {
      try {
        await step.action()
        executedSteps.unshift(step) // Speichert in umgekehrter folge, um eine Kompensation durchzuführen
      } catch (error) {
        console.warn(`Fehler im Schritt '${step.name}':`, error)
        console.log("Starte Compensation...")
        for (const done of executedSteps) {
          try {
            await done.compensation()
          } catch (compError) {
            console.error(`Fehler in Compensation von '${done.name}'`, compError)
          }
        }
        break
      }
    }
  }
  
