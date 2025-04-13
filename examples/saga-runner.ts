// 📁 Datei: core/saga-runner.ts

/**
 * این ماژول یک پیاده‌سازی ساده از الگوی Saga است.
 * مراحل را یکی‌یکی اجرا می‌کند و در صورت خطا، مراحل قبلی را با Compensation جبران می‌کند.
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
        executedSteps.unshift(step) // برای اجرای جبران به صورت معکوس ذخیره می‌کنیم
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
  