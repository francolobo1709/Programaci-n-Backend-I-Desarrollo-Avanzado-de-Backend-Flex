import UserService from '../services/UserService.js';

const manager = new UserService();
await manager.init();

export const getUsers = async (req, res, next) => {
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

export const getUserById = (req, res, next) => {
    try {
        res.json(manager.getById(req.parsedId));
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const user = await manager.add(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        res.json(await manager.update(req.parsedId, req.body));
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        res.json(await manager.remove(req.parsedId));
    } catch (err) {
        next(err);
    }
};