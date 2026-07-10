import { ValidationError } from '../errors/AppError.js';

/**
 * Valida que un ID sea un string no vacío.
 * Lanza ValidationError si no lo es.
 * @param {*} id
 */
export function assertValidId(id) {
    if (!id || typeof id !== 'string') {
        throw new ValidationError(`El id '${id}' no es válido.`);
    }
}
