import mongoose from 'mongoose';
import { MessageDAO } from '../dao/message.dao.js';
import { NotFoundError, ValidationError } from '../errors/AppError.js';

const dao = new MessageDAO();

function assertValidObjectId(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new ValidationError(`El id '${id}' no es un ObjectId válido de MongoDB.`);
    }
}

export const messageRepository = {
    async getAll() {
        return dao.findAll();
    },

    async getById(id) {
        assertValidObjectId(id);
        const message = await dao.findById(id);
        if (!message) throw new NotFoundError(id, 'Mensaje');
        return message;
    },

    async getByBookingId(bookingId) {
        assertValidObjectId(bookingId);
        return dao.findByBookingId(bookingId);
    },

    async create(data) {
        return dao.create(data);
    },

    async remove(id) {
        assertValidObjectId(id);
        const deleted = await dao.deleteById(id);
        if (!deleted) throw new NotFoundError(id, 'Mensaje');
        return deleted;
    },
};
