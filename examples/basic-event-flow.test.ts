// basic-event-flow.test.ts

// Wir simulieren ein einfache Event in Microservice

// Unse kleine "EventBus"-System: Publisher und Subscriber
class EventBus {
    private listeners: Record<string, Function[]> = {};
  
    // Registrieren eine Event-Listener
    subscribe(eventName: string, callback: Function) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(callback);
    }
  
    // Event losen
    publish(eventName: string, payload: any) {
      const callbacks = this.listeners[eventName] || [];
      callbacks.forEach(fn => fn(payload));
    }
  }
  
  // Simulation: Datenbank (in Memory)
  const userStore: string[] = [];
  
  //  EventBus initialisieren
  const eventBus = new EventBus();
  
  // Registr ein Listene für Event "UserCreated"
  eventBus.subscribe("UserCreated", (username: string) => {
    // User wird in die Datenbank geschrieben
    userStore.push(username);
  });
  
  // Test mit Jest
  describe("Basic Event Flow", () => {
    it("should process 'UserCreated' event and store user", () => {
      // Sicherstellen, dass Datenbank leer ist
      expect(userStore).toHaveLength(0);
  
      // Event Publicshen
      eventBus.publish("UserCreated", "alice@example.com");
  
      // Überprüfen, ob user in Datenbank gespeichert ist.
      expect(userStore).toContain("alice@example.com");
    });
  });