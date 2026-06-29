import { ValidationError } from '../errors/AppError.js';

const REQUIRED_FIELDS = ['serviceId', 'clientName', 'clientEmail', 'date'];
const VALID_STATUSES  = ['pending', 'confirmed', 'cancelled'];

/**
 * Construye un objeto Booking validado.
 * Lanza ValidationError si los datos son inválidos.
 *
 * @param {number} id   - Id generado internamente por el manager.
 * @param {object} data - Datos crudos del body/request.
 * @returns {object}    - Booking listo para persistir.
 */
export function buildBooking(id, data) {
    const missing = REQUIRED_FIELDS.filter(
        (field) => data[field] === undefined || data[field] === null || data[field] === ''
    );
    if (missing.length > 0) {
        throw new ValidationError(`Faltan campos obligatorios: ${missing.join(', ')}.`);
    }

    if (typeof data.serviceId !== 'number' || data.serviceId < 1) {
        throw new ValidationError('El campo serviceId debe ser un número entero positivo.');
    }

    const parsedDate = new Date(data.date);
    if (isNaN(parsedDate.getTime())) {
        throw new ValidationError('El campo date debe ser una fecha válida (ISO 8601). Ej: "2026-07-15T10:00:00".');
    }

    const status = data.status ?? 'pending';
    if (!VALID_STATUSES.includes(status)) {
        throw new ValidationError(`El campo status debe ser uno de: ${VALID_STATUSES.join(', ')}.`);
    }

    return {
        id,
        serviceId:   data.serviceId,
        clientName:  String(data.clientName).trim(),
        clientEmail: String(data.clientEmail).trim().toLowerCase(),
        date:        parsedDate.toISOString(),
        status,
        services:    [],
    };
}
