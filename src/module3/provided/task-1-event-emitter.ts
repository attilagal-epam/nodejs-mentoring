/* eslint-disable class-methods-use-this */
type EventListener = (...args: any[]) => void;

/**
 * Class to manage event listeners and emit events.
 */
export class EventEmitter {
  private listeners: { [event: string]: EventListener[] } = {};

  /**
   * Adds a new listener function to the specified event.
   * @param {string} eventName - Name of the event.
   * @param {EventListener} fn - Listener function.
   * @returns {EventEmitter} - EventEmitter instance.
   */
  addListener(eventName: string, fn: EventListener): this {
    // implementation here
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  /**
   * Alias for addListener method.
   * @param {string} eventName - Name of the event.
   * @param {EventListener} fn - Listener function.
   * @returns {EventEmitter} - Current EventEmitter instance.
   */
  on(eventName: string, fn: EventListener): this {
    // implementation here
    this.addListener(eventName, fn);
    return this;
  }

  /**
   * Adds a one-time listener function for the event. Once invoked, it is removed.
   * @param {string} eventName - Name of the event.
   * @param {EventListener} fn - Listener function.
   * @returns {EventEmitter} - EventEmitter instance.
   */
  once(eventName: string, fn: EventListener): this {
    // implementation here
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceFn = (...args: any[]) => {
      fn(...args);
      this.removeListener(eventName, onceFn);
    };
    this.listeners[eventName].push(onceFn);
    return this;
  }

  /**
   * Removes the specified listener for the event.
   * @param {string} eventName - Name of the event.
   * @param {EventListener} fn - Listener function.
   * @returns {EventEmitter} - EventEmitter instance.
   */
  removeListener(eventName: string, fn: EventListener): this {
    // implementation here
    const listeners = this.listeners[eventName] || [];
    const index = listeners.indexOf(fn);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  /**
   * Alias for removeListener method.
   * @param {string} eventName - Name of the event.
   * @param {EventListener} fn - Listener function.
   * @returns {EventEmitter} - EventEmitter instance.
   */
  off(eventName: string, fn: EventListener): this {
    // implementation here
    this.removeListener(eventName, fn);
    return this;
  }

  /**
   * Synchronously calls each of the listeners registered for the event named eventName,
   * in the order they were registered, passing the supplied arguments to each.
   * @param {string} eventName - Name of the event.
   * @param {...any[]} args - The arguments to be passed to each listener function.
   * @returns {boolean} - True if the event had listeners, false otherwise.
   */
  emit(eventName: string, ...args: any[]): boolean {
    // implementation here
    const listeners = this.listeners[eventName] || [];
    listeners.forEach((fn) => fn(...args));
    return listeners.length > 0;
  }

  /**
   * Returns the number of listeners listening to the type of event.
   * @param {string} eventName - Name of the event.
   * @returns {number} - The number of listeners for the event.
   */
  listenerCount(eventName: string): number {
    // implementation here
    return (this.listeners[eventName] || []).length;
  }

  /**
   * Returns a copy of the array of listeners for the event.
   * @param {string} eventName - Name of the event.
   * @returns {EventListener[]} - An array of listener functions for the event.
   */
  rawListeners(eventName: string): EventListener[] {
    // implementation here
    return this.listeners[eventName] || [];
  }
}
