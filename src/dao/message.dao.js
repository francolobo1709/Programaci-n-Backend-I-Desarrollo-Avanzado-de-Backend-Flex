import { MessageModel } from '../models/message.model.js';

export class MessageDAO {
    async findAll() {
        return MessageModel.find().populate('booking').lean();
    }

    async findById(id) {
        return MessageModel.findById(id).populate('booking').lean();
    }

    async findByBookingId(bookingId) {
        return MessageModel.find({ booking: bookingId }).lean();
    }

    async create(data) {
        const doc = new MessageModel(data);
        return doc.save();
    }

    async deleteById(id) {
        return MessageModel.findByIdAndDelete(id).lean();
    }
}
