import express from 'express';
import { config } from './config/env.config.js';
import servicesRouter from './routes/services.router.js';
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
        },
    });
});

app.use('/api/services', servicesRouter);

// Respuesta estándar para rutas no definidas
app.use((req, res) => {
    res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada.` });
});

// Manejador centralizado de errores (debe ir al final)
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`🚀 CleanMatch corriendo en modo: ${config.env}`);
    console.log(`📡 Servidor escuchando en http://localhost:${config.port}`);
});
