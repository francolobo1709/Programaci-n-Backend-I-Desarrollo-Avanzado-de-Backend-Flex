import { Server } from 'socket.io';

let io = null;

export function initSocket(httpServer) {
    io = new Server(httpServer);
    return io;
}

export function getIO() {
    if (!io) throw new Error('Socket.io no ha sido inicializado todavía.');
    return io;
}
