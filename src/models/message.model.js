import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
        sender:  { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        readAt:  { type: Date, default: null },
    },
    { timestamps: true }
);

export const MessageModel = mongoose.model('Message', messageSchema);
