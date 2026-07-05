import mongoose from 'mongoose';

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled'];

const bookingSchema = new mongoose.Schema(
    {
        clientName:  { type: String, required: true, trim: true },
        clientEmail: { type: String, required: true, trim: true, lowercase: true },
        date:        { type: Date, required: true },
        status:      { type: String, enum: VALID_STATUSES, default: 'pending' },
        services: [
            {
                service:  { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
                quantity: { type: Number, default: 1, min: 1 },
            },
        ],
    },
    { timestamps: true }
);

export const BookingModel = mongoose.model('Booking', bookingSchema);
