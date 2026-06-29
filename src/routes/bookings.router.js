import { Router } from 'express';
import { parseId } from '../middlewares/parseId.js';
import * as bookingsController from '../controllers/bookings.controller.js';

const router = Router();

// GET /api/bookings  |  GET /api/bookings?limit=n
router.get('/',      bookingsController.getAll);

// GET /api/bookings/:bid
router.get('/:id',   parseId, bookingsController.getBookingById);

// POST /api/bookings
router.post('/',     bookingsController.createBooking);

// PUT /api/bookings/:bid
router.put('/:id',   parseId, bookingsController.update);

// DELETE /api/bookings/:bid
router.delete('/:id', parseId, bookingsController.remove);

// POST /api/bookings/:bid/services/:sid
router.post('/:bid/services/:sid', bookingsController.addServiceToBooking);

export default router;

