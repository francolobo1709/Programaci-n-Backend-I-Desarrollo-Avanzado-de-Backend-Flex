import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '..', 'data', 'bookings.json');

async function readData() {
    const raw = await readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
}

async function writeData(data) {
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

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
