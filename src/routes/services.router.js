import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const manager = new ServiceManager();

// GET /api/services  |  GET /api/services?limit=n
router.get('/', (req, res) => {
    const { limit } = req.query;
    let services = manager.getServices();

    if (limit !== undefined) {
        const parsedLimit = parseInt(limit, 10);
        if (isNaN(parsedLimit) || parsedLimit < 1) {
            return res.status(400).json({ error: 'El parámetro limit debe ser un número entero positivo.' });
        }
        services = services.slice(0, parsedLimit);
    }

    res.status(200).json(services);
});

// GET /api/services/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El id debe ser un número entero.' });
    }

    const result = manager.getServiceById(id);
    if (result.error) {
        return res.status(404).json(result);
    }

    res.status(200).json(result);
});

// POST /api/services
router.post('/', (req, res) => {
    const result = manager.addService(req.body);
    if (result.error) {
        return res.status(400).json(result);
    }

    res.status(201).json(result);
});

// PUT /api/services/:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El id debe ser un número entero.' });
    }

    const result = manager.updateService(id, req.body);
    if (result.error) {
        return res.status(404).json(result);
    }

    res.status(200).json(result);
});

// DELETE /api/services/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El id debe ser un número entero.' });
    }

    const result = manager.deleteService(id);
    if (result.error) {
        return res.status(404).json(result);
    }

    res.status(200).json(result);
});

export default router;
