import { serviceService } from '../services/service.service.js';

export const getServices = async (req, res, next) => {
    try {
        res.json(await serviceService.getAll());
    } catch (err) {
        next(err);
    }
};

export const getServiceById = async (req, res, next) => {
    try {
        res.json(await serviceService.getById(req.params.sid));
    } catch (err) {
        next(err);
    }
};

export const createService = async (req, res, next) => {
    try {
        const service = await serviceService.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        next(err);
    }
};

export const updateService = async (req, res, next) => {
    try {
        res.json(await serviceService.update(req.params.sid, req.body));
    } catch (err) {
        next(err);
    }
};

export const deleteService = async (req, res, next) => {
    try {
        res.json(await serviceService.remove(req.params.sid));
    } catch (err) {
        next(err);
    }
};
