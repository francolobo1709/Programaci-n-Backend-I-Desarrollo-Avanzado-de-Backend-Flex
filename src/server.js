import { createServer } from 'node:http';
import { app } from './app.js';
import { config } from './config/env.config.js';
import { connectDB } from './config/mongodb.js';
import { initSocket } from './config/socket.js';

await connectDB();

const httpServer = createServer(app);
const io = initSocket(httpServer);

io.on('connection', (socket) => {
    console.log(`🔌 Cliente Socket.io conectado: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`❌ Cliente Socket.io desconectado: ${socket.id}`);
    });
});

httpServer.listen(config.port, () => {
    console.log(`🚀 CleanMatch corriendo en modo: ${config.env}`);
    console.log(`📡 Servidor escuchando en http://localhost:${config.port}`);
});