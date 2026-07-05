import { bookingRepository } from '../repositories/booking.repository.js';
import { serviceRepository } from '../repositories/service.repository.js';
import { ValidationError } from '../errors/AppError.js';

const REQUIRED_FIELDS = ['clientName', 'clientEmail', 'date'];

function validate(data) {
    const missing = REQUIRED_FIELDS.filter(
        (f) => data[f] === undefined || data[f] === null || data[f] === ''
    );
    if (missing.length > 0) {
        throw new ValidationError(`Faltan campos obligatorios: ${missing.join(', ')}.`);
    }
    if (isNaN(new Date(data.date).getTime())) {
        throw new ValidationError('El campo date debe ser una fecha válida (ISO 8601). Ej: "2026-07-15T10:00:00".');
    }
}

export const bookingService = {
    getAll:  () => bookingRepository.getAll(),
    getById: (id) => bookingRepository.getById(id),
    create(data) {
        validate(data);
        return bookingRepository.create(data);
    },
    update:  (id, data) => bookingRepository.update(id, data),
    remove:  (id) => bookingRepository.remove(id),
    async addService(bookingId, serviceId, quantity = 1) {
        // Verifica que el servicio exista antes de agregarlo
        await serviceRepository.getById(serviceId);
        return bookingRepository.addService(bookingId, serviceId, quantity);
    },
};
