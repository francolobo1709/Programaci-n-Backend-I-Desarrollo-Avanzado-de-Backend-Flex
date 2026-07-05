import mongoose from 'mongoose';

/**
 * Middleware que valida que el param de ID sea un ObjectId válido de MongoDB.
 * Soporta :id, :sid (services) y :bid (bookings).
 * Expone `req.parsedId` (string) para los handlers que lo necesiten.
 */
export function parseId(req, res, next) {
    const raw = req.params.id ?? req.params.sid ?? req.params.bid;

    if (!mongoose.isValidObjectId(raw)) {
        return res.status(400).json({ error: 'El id debe ser un ObjectId válido de MongoDB.' });
    }

    req.parsedId = raw;
    next();
}
