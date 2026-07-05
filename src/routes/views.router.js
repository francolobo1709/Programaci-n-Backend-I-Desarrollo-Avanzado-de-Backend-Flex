import { Router } from 'express';
import * as viewsController from '../controllers/views.controller.js';

const router = Router();

// GET /views/services
router.get('/services', viewsController.renderServices);

// GET /views/availability
router.get('/availability', viewsController.renderAvailability);

export default router;
