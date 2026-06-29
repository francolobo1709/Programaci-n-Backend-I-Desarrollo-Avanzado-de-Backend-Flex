import ServiceManager from '../managers/ServiceManager.js';

const manager = new ServiceManager();
await manager.init();

// Exportamos la instancia para que bookings.controller pueda validar servicios
export { manager as serviceManager };

export const getServices = async (req, res, next) => {
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

export const getServiceById = (req, res, next) => {
    try {
        res.json(manager.getById(req.parsedId));
    } catch (err) {
        next(err);
    }
};

export const createService = async (req, res, next) => {
    try {
        const service = await manager.add(req.body);
        res.status(201).json(service);
    } catch (err) {
        next(err);
    }
};

export const updateService = async (req, res, next) => {
    try {
        res.json(await manager.update(req.parsedId, req.body));
    } catch (err) {
        next(err);
    }
};

export const deleteService = async (req, res, next) => {
    try {
        res.json(await manager.remove(req.parsedId));
    } catch (err) {
        next(err);
    }
};
