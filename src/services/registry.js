import ServiceManager from './ServiceManager.js';
import BookingManager from './BookingManager.js';

// Instancias únicas (singleton) — se inicializan en server.js al arrancar
export const serviceManager = new ServiceManager();
export const bookingManager = new BookingManager();
