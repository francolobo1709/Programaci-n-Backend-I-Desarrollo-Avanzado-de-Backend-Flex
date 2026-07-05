import { Router } from 'express';
import * as servicesController from '../controllers/services.controller.js';

const router = Router();

// GET /api/services
router.get('/',       servicesController.getServices);

// GET /api/services/:sid
router.get('/:sid',   servicesController.getServiceById);

// POST /api/services
router.post('/',      servicesController.createService);

// PUT /api/services/:sid
router.put('/:sid',   servicesController.updateService);

// DELETE /api/services/:sid
router.delete('/:sid', servicesController.deleteService);

export default router;
