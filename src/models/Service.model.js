import { ValidationError } from '../errors/AppError.js';

const REQUIRED_FIELDS = ['name', 'description', 'duration', 'price', 'category', 'available'];

/**
 * Construye un objeto Service validado.
 * Lanza ValidationError si los datos son inválidos.
 *
 * @param {number} id     - Id generado internamente por el manager.
 * @param {object} data   - Datos crudos del body/request.
 * @returns {object}      - Service listo para persistir.
 */
export function buildService(id, data) {
    const missing = REQUIRED_FIELDS.filter(
        (field) => data[field] === undefined || data[field] === null || data[field] === ''
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

    return {
        id,
        name:        String(data.name).trim(),
        description: String(data.description).trim(),
        duration:    data.duration,
        price:       data.price,
        category:    String(data.category).trim().toLowerCase(),
        available:   data.available,
    };
}
