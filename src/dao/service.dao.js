import { ServiceModel } from '../models/Service.model.js';

export class ServiceDAO {
    async findAll() {
        return ServiceModel.find().lean();
    }

    async findById(id) {
        return ServiceModel.findById(id).lean();
    }

    async create(data) {
        const doc = new ServiceModel(data);
        return doc.save();
    }

    async updateById(id, data) {
        return ServiceModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    }

    async deleteById(id) {
        return ServiceModel.findByIdAndDelete(id).lean();
    }
}
