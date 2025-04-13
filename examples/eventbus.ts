// @filename: eventbus.ts
// das ist eine simple beispiel für eine eventbus

// callback listener der reagiert zu events
type EventCallback = (payload: any) => void;

// main Klass für  EventBus – publish/subscribe
export class EventBus {
  // eine liste von listeners für jeder event wird gestellt
  private listeners: Record<string, EventCallback[]> = {};

  // Funktion  subscribe – register listener für eine event 
  subscribe(eventName: string, callback: EventCallback) {
    // wenn für eine event keine liste gibt es erstellen wir eine
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    // callbacks werden hinzugefügt zu listeners
    this.listeners[eventName].push(callback);
  }

  // publish – send payload zu all listener von eine event
  publish(eventName: string, payload: any) {
    // wenn handlers für diese event →führe alles
    const handlers = this.listeners[eventName] || [];

    for (const handler of handlers) {
      handler(payload); // callback aufruf mit daten
    }
  }

  //  reset – clearing ganze test oder neue start
  reset() {
    this.listeners = {};
  }
}