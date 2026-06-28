import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';
import { parseId } from '../middlewares/parseId.js';

const router  = Router();
const manager = new ServiceManager();

// Carga datos desde services.json antes de registrar las rutas (top-level await en ESM)
await manager.init();

// GET /api/services  |  GET /api/services?limit=n
router.get('/', async (req, res, next) => {
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
});

// GET /api/services/:id
router.get('/:id', parseId, (req, res, next) => {
    try {
        res.json(manager.getById(req.parsedId));
    } catch (err) {
        next(err);
    }
});

// POST /api/services
router.post('/', async (req, res, next) => {
    try {
        const service = await manager.add(req.body);
        res.status(201).json(service);
    } catch (err) {
        next(err);
    }
});

// PUT /api/services/:id
router.put('/:id', parseId, async (req, res, next) => {
    try {
        res.json(await manager.update(req.parsedId, req.body));
    } catch (err) {
        next(err);
    }
});

// DELETE /api/services/:id
router.delete('/:id', parseId, async (req, res, next) => {
    try {
        res.json(await manager.remove(req.parsedId));
    } catch (err) {
        next(err);
    }
});

export default router;
