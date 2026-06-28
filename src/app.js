import { config } from './config/env.config.js';
import ServiceManager from './managers/ServiceManager.js';

console.log(`🚀 Iniciando CleanMatch en modo: ${config.env}`);
console.log(`📡 Servidor configurado para el puerto: ${config.port}\n`);

const manager = new ServiceManager();

// PRUEBAS DE LOS CRITERIOS DE ACEPTACIÓN
console.log("--- 1. Agregando un servicio válido ---");
const s1 = manager.addService({
    name: "Limpieza General",
    description: "Limpieza estándar de mantenimiento",
    duration: 3,
    price: 5000,
    category: "limpieza",
    available: true
});
console.log(s1);

console.log("\n--- 2. Intentando agregar un servicio incompleto ---");
const s2 = manager.addService({ name: "Limpieza Incompleta" });
console.log(s2);

console.log("\n--- 3. Obteniendo todos los servicios ---");
console.log(manager.getServices());

console.log("\n--- 4. Actualizando servicio (intentando cambiar ID maliciosamente) ---");
const updated = manager.updateService(1, { price: 6000, id: 999 }); 
console.log(updated); // El ID debe seguir siendo 1

console.log("\n--- 5. Eliminando el servicio ---");
console.log(manager.deleteService(1));
console.log("Servicios restantes:", manager.getServices());
