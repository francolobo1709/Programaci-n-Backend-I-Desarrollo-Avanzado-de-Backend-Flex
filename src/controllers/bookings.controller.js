import BookingManager from '../managers/BookingManager.js';
import { serviceManager } from './services.controller.js';

const manager = new BookingManager();
await manager.init();

export const getAll = async (req, res, next) => {
    try {
        const { limit } = req.query;
        let parsedLimit;

        if (limit !== undefined) {
            parsedLimit = parseInt(limit, 10);
            if (isNaN(parsedLimit) || parsedLimit < 1) {
                return res.status(400).json({ error: 'El parámetro limit debe ser un número entero positivo.' });
            }
        }

        res.json(manager.getAll(parsedLimit));
    } catch (err) {
        next(err);
    }
};

export const getBookingById = (req, res, next) => {
    try {
        res.json(manager.getById(req.parsedId));
    } catch (err) {
        next(err);
    }
};

export const createBooking = async (req, res, next) => {
    try {
        const booking = await manager.add(req.body);
        res.status(201).json(booking);
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        res.json(await manager.update(req.parsedId, req.body));
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        res.json(await manager.remove(req.parsedId));
    } catch (err) {
        next(err);
    }
};

// POST /api/bookings/:bid/services/:sid
// Flujo: Controller valida que el servicio exista → BookingManager lo agrega a la reserva
export const addServiceToBooking = async (req, res, next) => {
    try {
        const bid = parseInt(req.params.bid, 10);
        const sid = parseInt(req.params.sid, 10);

        if (isNaN(bid) || bid < 1 || isNaN(sid) || sid < 1) {
            return res.status(400).json({ error: 'bid y sid deben ser números enteros positivos.' });
        }

        // Valida que el servicio exista en services.json — lanza NotFoundError si no
        const service = serviceManager.getById(sid);

        const updated = await manager.addServiceToBooking(bid, service.id);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};
