import mongoose from 'mongoose';
import { ServiceDAO } from '../dao/service.dao.js';
import { NotFoundError, ValidationError } from '../errors/AppError.js';

const dao = new ServiceDAO();

function assertValidObjectId(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new ValidationError(`El id '${id}' no es un ObjectId válido de MongoDB.`);
    }
}

export const serviceRepository = {
    async getAll() {
        return dao.findAll();
    },

    async getById(id) {
        assertValidObjectId(id);
        const service = await dao.findById(id);
        if (!service) throw new NotFoundError(id, 'Servicio');
        return service;
    },

    async create(data) {
        return dao.create(data);
    },

    async update(id, data) {
        assertValidObjectId(id);
        const updated = await dao.updateById(id, data);
        if (!updated) throw new NotFoundError(id, 'Servicio');
        return updated;
    },

    async remove(id) {
        assertValidObjectId(id);
        const deleted = await dao.deleteById(id);
        if (!deleted) throw new NotFoundError(id, 'Servicio');
        return deleted;
    },
};
