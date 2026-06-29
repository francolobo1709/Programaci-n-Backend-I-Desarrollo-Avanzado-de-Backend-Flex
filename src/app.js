import express from 'express';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.status(200).json({
        status:  'ok',
        app:     'CleanMatch API',
        version: '2.0.0',
        endpoints: {
            services: '/api/services',
            bookings: '/api/bookings',
        },
    });
});

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

// Respuesta estándar para rutas no definidas
app.use((req, res) => {
    res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada.` });
});

// Manejador centralizado de errores (debe ir al final)
app.use(errorHandler);

export { app };
