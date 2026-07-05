import { messageService } from '../services/message.service.js';

export const getMessages = async (req, res, next) => {
    try {
        res.json(await messageService.getAll());
    } catch (err) {
        next(err);
    }
};

export const getMessageById = async (req, res, next) => {
    try {
        res.json(await messageService.getById(req.params.mid));
    } catch (err) {
        next(err);
    }
};

export const getMessagesByBooking = async (req, res, next) => {
    try {
        res.json(await messageService.getByBookingId(req.params.bid));
    } catch (err) {
        next(err);
    }
};

export const createMessage = async (req, res, next) => {
    try {
        const message = await messageService.create(req.body);
        res.status(201).json(message);
    } catch (err) {
        next(err);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        res.json(await messageService.remove(req.params.mid));
    } catch (err) {
        next(err);
    }
};
