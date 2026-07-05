import { BookingModel } from '../models/Booking.model.js';

export class BookingDAO {
    async findAll() {
        return BookingModel.find().populate('services.service').lean();
    }

    async findById(id) {
        return BookingModel.findById(id).populate('services.service').lean();
    }

    async create(data) {
        const doc = new BookingModel(data);
        return doc.save();
    }

    async updateById(id, data) {
        return BookingModel.findByIdAndUpdate(id, data, { new: true }).populate('services.service').lean();
    }

    async deleteById(id) {
        return BookingModel.findByIdAndDelete(id).lean();
    }

    async addService(bookingId, serviceId, quantity = 1) {
        return BookingModel.findByIdAndUpdate(
            bookingId,
            { $addToSet: { services: { service: serviceId, quantity } } },
            { new: true }
        ).populate('services.service').lean();
    }
}
