// @filename: eventbus.test.ts
// einfache beispiel für EventBus als interne publish/subscribe und schaut und analysiert.

import { EventBus } from './eventbus';

// alle test werden in eine block erklärt!!
describe('EventBus', () => {
  let bus: EventBus;

  // vor jede test schreiben wir eine neue eventbus!
  beforeEach(() => {
    bus = new EventBus();
  });

  //hier schauen wir ob alle messages sind empfangsbar!
  it('sollte den Event an alle Listener senden', () => {
   // Beispiel functions zu simulieren die listeners
    const mockHandler1 = jest.fn();
    const mockHandler2 = jest.fn();

    // subscription eine bestimmte event für listener
    bus.subscribe('DokumentGeprueft', mockHandler1);
    bus.subscribe('DokumentGeprueft', mockHandler2);

    // sending eine test event ( listener)
    const testPayload = { docId: 42, status: 'ok' };
    bus.publish('DokumentGeprueft', testPayload);

    // erwarten wir dass payload und handler beide die empfang gemacht haben!
    expect(mockHandler1).toHaveBeenCalledWith(testPayload);
    expect(mockHandler2).toHaveBeenCalledWith(testPayload);
  });

  //prüfen ob ein fehler registriert worden ist!! 
  it('sollte nichts tun, wenn es keine Subscriber gibt', () => {
    expect(() => {
      bus.publish('UnbekanntesEvent', { id: 1 });
    }).not.toThrow(); // publish ohne problem! 
  });

  // dritte test, dass alle events separat managen werden können! 
  it('sollte verschiedene Events separat behandeln', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // verschiedene events für sub in listener
    bus.subscribe('DokumentGeprueft', handler1);
    bus.subscribe('VisumErstellt', handler2);

    // event publishing separate.
    bus.publish('DokumentGeprueft', { a: 1 });
    bus.publish('VisumErstellt', { b: 2 });

    // analyse der daten empfang für jeweilige zuständige listener
    expect(handler1).toHaveBeenCalledWith({ a: 1 });
    expect(handler2).toHaveBeenCalledWith({ b: 2 });
  });
});