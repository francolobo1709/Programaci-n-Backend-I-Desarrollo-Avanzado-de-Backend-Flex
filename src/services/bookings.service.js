import { bookingRepository } from '../repositories/bookings.repository.js';
import { serviceRepository } from '../repositories/services.repository.js';

export const bookingService = {
    getAll:  () => bookingRepository.getAll(),
    getById: (id) => bookingRepository.getById(id),
    create:  (data) => bookingRepository.create(data),
    update:  (id, data) => bookingRepository.update(id, data),
    remove:  (id) => bookingRepository.remove(id),

    async addService(bookingId, serviceId, quantity = 1) {
        // Verifica que el servicio exista antes de operar
        await serviceRepository.getById(serviceId);

        // Obtiene la reserva actual para aplicar la regla de negocio
        const booking = await bookingRepository.getById(bookingId);

        // Regla de negocio: si el mismo servicio ya está en la reserva, incrementa quantity
        const existingIdx = booking.services.findIndex(s => s.service === serviceId);
        if (existingIdx !== -1) {
            const updatedServices = booking.services.map((s, i) =>
                i === existingIdx ? { ...s, quantity: s.quantity + quantity } : s
            );
            return bookingRepository.update(bookingId, { services: updatedServices });
        }

        // Si no existe, lo agrega normalmente
        return bookingRepository.addService(bookingId, serviceId, quantity);
    },
};
