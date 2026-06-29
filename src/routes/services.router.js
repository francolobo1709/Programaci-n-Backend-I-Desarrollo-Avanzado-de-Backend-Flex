import { Router } from 'express';
import { parseId } from '../middlewares/parseId.js';
import * as servicesController from '../controllers/services.controller.js';

const router = Router();

// GET /api/services  |  GET /api/services?limit=n
router.get('/',      servicesController.getServices);

// GET /api/services/:sid
router.get('/:id',   parseId, servicesController.getServiceById);

// POST /api/services
router.post('/',     servicesController.createService);

// PUT /api/services/:sid
router.put('/:id',   parseId, servicesController.updateService);

// DELETE /api/services/:sid
router.delete('/:id', parseId, servicesController.deleteService);

export default router;
