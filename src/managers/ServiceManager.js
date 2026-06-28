class ServiceManager {
    constructor() {
        this.services = [];
        this.currentId = 1;
    }

    getServices() {
        return this.services;
    }

    getServiceById(id) {
        const service = this.services.find(s => s.id === id);
        if (!service) {
            return { error: `Servicio con id ${id} no encontrado.` };
        }
        return service;
    }

    addService(serviceData) {
        const { name, description, duration, price, category, available } = serviceData;

        // Validación estricta de campos obligatorios
        if (!name || !description || !duration || !price || !category || available === undefined) {
            return { error: "Faltan campos obligatorios. Se requiere: name, description, duration, price, category, available." };
        }

        const newService = {
            id: this.currentId++, // El id se genera internamente
            name,
            description,
            duration,
            price,
            category,
            available
        };

        this.services.push(newService);
        return newService;
    }

    updateService(id, updatedData) {
        const serviceIndex = this.services.findIndex(s => s.id === id);
        
        if (serviceIndex === -1) {
            return { error: `No se puede actualizar. Servicio con id ${id} no encontrado.` };
        }

        // Extraemos el id de updatedData por si lo envían, para evitar que lo modifiquen
        const { id: _, ...safeData } = updatedData;
        
        this.services[serviceIndex] = {
            ...this.services[serviceIndex],
            ...safeData
        };

        return this.services[serviceIndex];
    }

    deleteService(id) {
        const serviceIndex = this.services.findIndex(s => s.id === id);
        
        if (serviceIndex === -1) {
            return { error: `No se puede eliminar. Servicio con id ${id} no encontrado.` };
        }

        const deletedService = this.services.splice(serviceIndex, 1);
        return deletedService[0];
    }
}

export default ServiceManager;
