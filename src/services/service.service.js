import { serviceRepository } from '../repositories/service.repository.js';
import { ValidationError } from '../errors/AppError.js';

const REQUIRED_FIELDS = ['name', 'description', 'duration', 'price', 'category', 'available'];

function validate(data) {
    const missing = REQUIRED_FIELDS.filter(
        (f) => data[f] === undefined || data[f] === null || data[f] === ''
    );
    if (missing.length > 0) {
        throw new ValidationError(`Faltan campos obligatorios: ${missing.join(', ')}.`);
    }
    if (typeof data.duration !== 'number' || data.duration <= 0) {
        throw new ValidationError('El campo duration debe ser un número mayor a 0.');
    }
    if (typeof data.price !== 'number' || data.price <= 0) {
        throw new ValidationError('El campo price debe ser un número mayor a 0.');
    }
    if (typeof data.available !== 'boolean') {
        throw new ValidationError('El campo available debe ser true o false (booleano).');
    }
}

export const serviceService = {
    getAll:  () => serviceRepository.getAll(),
    getById: (id) => serviceRepository.getById(id),
    create(data) {
        validate(data);
        return serviceRepository.create(data);
    },
    update:  (id, data) => serviceRepository.update(id, data),
    remove:  (id) => serviceRepository.remove(id),
};
