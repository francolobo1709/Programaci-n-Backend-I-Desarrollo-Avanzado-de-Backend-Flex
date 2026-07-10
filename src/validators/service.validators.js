import { z } from 'zod';

export const createServiceSchema = z.object({
    name:        z.string({ required_error: 'El campo name es obligatorio.' }).min(1, 'El nombre no puede estar vacío.'),
    description: z.string({ required_error: 'El campo description es obligatorio.' }).min(1, 'La descripción no puede estar vacía.'),
    duration:    z.number({ required_error: 'El campo duration es obligatorio.', invalid_type_error: 'duration debe ser un número.' }).int('duration debe ser un entero.').positive('duration debe ser mayor a 0.'),
    price:       z.number({ required_error: 'El campo price es obligatorio.', invalid_type_error: 'price debe ser un número.' }).positive('price debe ser mayor a 0.'),
    category:    z.string({ required_error: 'El campo category es obligatorio.' }).min(1, 'La categoría no puede estar vacía.'),
    available:   z.boolean({ required_error: 'El campo available es obligatorio.', invalid_type_error: 'available debe ser true o false (booleano).' }),
});

export const updateServiceSchema = z
    .object({
        name:        z.string().min(1, 'El nombre no puede estar vacío.').optional(),
        description: z.string().min(1, 'La descripción no puede estar vacía.').optional(),
        duration:    z.number({ invalid_type_error: 'duration debe ser un número.' }).int().positive('duration debe ser mayor a 0.').optional(),
        price:       z.number({ invalid_type_error: 'price debe ser un número.' }).positive('price debe ser mayor a 0.').optional(),
        category:    z.string().min(1).optional(),
        available:   z.boolean({ invalid_type_error: 'available debe ser true o false (booleano).' }).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'Debés enviar al menos un campo para actualizar.',
    });
