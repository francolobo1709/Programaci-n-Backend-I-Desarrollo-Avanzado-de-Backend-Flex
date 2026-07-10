import { randomUUID } from 'node:crypto';
import { createJsonStore } from './json.store.js';

const { readData, writeData } = createJsonStore('bookings.json');

export class BookingDAO {
    async findAll() {
        return readData();
    }

    async findById(id) {
        const docs = await readData();
        return docs.find(d => d._id === id) ?? null;
    }

    async create(data) {
        const docs = await readData();
        const now = new Date().toISOString();
        const newDoc = { _id: randomUUID(), ...data, services: data.services ?? [], createdAt: now, updatedAt: now };
        docs.push(newDoc);
        await writeData(docs);
        return newDoc;
    }

    async updateById(id, data) {
        const docs = await readData();
        const idx = docs.findIndex(d => d._id === id);
        if (idx === -1) return null;
        docs[idx] = { ...docs[idx], ...data, updatedAt: new Date().toISOString() };
        await writeData(docs);
        return docs[idx];
    }

    async deleteById(id) {
        const docs = await readData();
        const idx = docs.findIndex(d => d._id === id);
        if (idx === -1) return null;
        const [deleted] = docs.splice(idx, 1);
        await writeData(docs);
        return deleted;
    }

    // Agrega un servicio a una reserva (sin lógica de negocio — la lógica de quantity va en el service)
    async addService(bookingId, serviceId, quantity = 1) {
        const docs = await readData();
        const booking = docs.find(d => d._id === bookingId);
        if (!booking) return null;
        if (!booking.services) booking.services = [];
        booking.services.push({ service: serviceId, quantity });
        booking.updatedAt = new Date().toISOString();
        await writeData(docs);
        return booking;
    }
}
