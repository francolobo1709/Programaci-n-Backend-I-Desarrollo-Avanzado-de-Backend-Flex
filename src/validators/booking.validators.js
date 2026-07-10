import { z } from 'zod';

export const createBookingSchema = z.object({
    clientName:  z.string({ required_error: 'El campo clientName es obligatorio.' }).min(1, 'El nombre del cliente no puede estar vacío.'),
    clientEmail: z
        .string({ required_error: 'El campo clientEmail es obligatorio.' })
        .email('clientEmail debe ser un email válido.'),
    date: z
        .string({ required_error: 'El campo date es obligatorio.' })
        .refine((val) => !isNaN(new Date(val).getTime()), {
            message: 'date debe ser una fecha válida en formato ISO 8601. Ej: "2026-07-15T10:00:00".',
        }),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
});

export const addServiceToBookingSchema = z.object({
    quantity: z
        .number({ invalid_type_error: 'quantity debe ser un número entero positivo.' })
        .int('quantity debe ser un entero.')
        .positive('quantity debe ser mayor a 0.')
        .optional()
        .default(1),
});
