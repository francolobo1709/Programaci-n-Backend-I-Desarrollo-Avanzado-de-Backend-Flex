import { Router } from 'express';
import * as servicesController from '../controllers/services.controller.js';
import { validate } from '../middlewares/validate.js';
import { createServiceSchema, updateServiceSchema } from '../validators/service.validators.js';

const router = Router();

// GET /api/services  — filtros, paginación y ordenamiento via query params
router.get('/',       servicesController.getServices);

// GET /api/services/:sid
router.get('/:sid',   servicesController.getServiceById);

// POST /api/services
router.post('/',      validate(createServiceSchema), servicesController.createService);

// PUT /api/services/:sid
router.put('/:sid',   validate(updateServiceSchema), servicesController.updateService);

// DELETE /api/services/:sid
router.delete('/:sid', servicesController.deleteService);

export default router;
