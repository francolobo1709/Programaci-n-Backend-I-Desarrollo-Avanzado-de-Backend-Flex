import { Router } from 'express';
import * as bookingsController from '../controllers/bookings.controller.js';
import { validate } from '../middlewares/validate.js';
import { createBookingSchema, addServiceToBookingSchema } from '../validators/booking.validators.js';

const router = Router();

// GET /api/bookings
router.get('/',       bookingsController.getBookings);

// GET /api/bookings/:bid
router.get('/:bid',   bookingsController.getBookingById);

// POST /api/bookings
router.post('/',      validate(createBookingSchema), bookingsController.createBooking);

// PUT /api/bookings/:bid
router.put('/:bid',   bookingsController.updateBooking);

// DELETE /api/bookings/:bid
router.delete('/:bid', bookingsController.deleteBooking);

// POST /api/bookings/:bid/services/:sid
router.post('/:bid/services/:sid', validate(addServiceToBookingSchema), bookingsController.addServiceToBooking);

export default router;

