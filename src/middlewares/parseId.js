/**
 * Middleware que parsea y valida el param `:id` una sola vez.
 * Expone `req.parsedId` (number) para los handlers que lo necesiten.
 */
export function parseId(req, res, next) {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'El id debe ser un número entero positivo.' });
    }

    req.parsedId = id;
    next();
}
