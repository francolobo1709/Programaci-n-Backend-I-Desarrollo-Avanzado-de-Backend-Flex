export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name   = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(id) {
        super(`Servicio con id ${id} no encontrado.`, 404);
    }
}
