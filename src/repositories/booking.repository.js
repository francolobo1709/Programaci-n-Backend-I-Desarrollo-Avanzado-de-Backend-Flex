import mongoose from 'mongoose';
import { BookingDAO } from '../dao/booking.dao.js';
import { NotFoundError, ValidationError } from '../errors/AppError.js';

const dao = new BookingDAO();

function assertValidObjectId(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new ValidationError(`El id '${id}' no es un ObjectId válido de MongoDB.`);
    }
}

export const bookingRepository = {
    async getAll() {
        return dao.findAll();
    },

    async getById(id) {
        assertValidObjectId(id);
        const booking = await dao.findById(id);
        if (!booking) throw new NotFoundError(id, 'Reserva');
        return booking;
    },

    async create(data) {
        return dao.create(data);
    },

    async update(id, data) {
        assertValidObjectId(id);
        const updated = await dao.updateById(id, data);
        if (!updated) throw new NotFoundError(id, 'Reserva');
        return updated;
    },

    async remove(id) {
        assertValidObjectId(id);
        const deleted = await dao.deleteById(id);
        if (!deleted) throw new NotFoundError(id, 'Reserva');
        return deleted;
    },

    async addService(bookingId, serviceId, quantity = 1) {
        assertValidObjectId(bookingId);
        assertValidObjectId(serviceId);
        const updated = await dao.addService(bookingId, serviceId, quantity);
        if (!updated) throw new NotFoundError(bookingId, 'Reserva');
        return updated;
    },
};
