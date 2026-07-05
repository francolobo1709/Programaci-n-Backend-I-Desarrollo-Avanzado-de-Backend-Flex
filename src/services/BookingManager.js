import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildBooking } from '../models/Booking.model.js';
import { NotFoundError } from '../errors/AppError.js';

const DATA_PATH = resolve(fileURLToPath(new URL('.', import.meta.url)), '../data/bookings.json');

class BookingManager {
    #bookings  = [];
    #currentId = 1;

    async init() {
        try {
            const raw = await readFile(DATA_PATH, 'utf-8');
            this.#bookings = JSON.parse(raw);
            if (this.#bookings.length > 0) {
                this.#currentId = Math.max(...this.#bookings.map(b => b.id)) + 1;
            }
        } catch {
            this.#bookings = [];
        }
    }

    async #persist() {
        await writeFile(DATA_PATH, JSON.stringify(this.#bookings, null, 2), 'utf-8');
    }

    getAll(limit) {
        const list = [...this.#bookings];
        return limit ? list.slice(0, limit) : list;
    }

    getById(id) {
        const booking = this.#bookings.find(b => b.id === id);
        if (!booking) throw new NotFoundError(id, 'Reserva');
        return booking;
    }

    async add(data) {
        const booking = buildBooking(this.#currentId++, data);
        this.#bookings.push(booking);
        await this.#persist();
        return booking;
    }

    async update(id, data) {
        const index = this.#bookings.findIndex(b => b.id === id);
        if (index === -1) throw new NotFoundError(id, 'Reserva');

        const { id: _ignored, ...safeData } = data;
        this.#bookings[index] = { ...this.#bookings[index], ...safeData };
        await this.#persist();
        return this.#bookings[index];
    }

    async remove(id) {
        const index = this.#bookings.findIndex(b => b.id === id);
        if (index === -1) throw new NotFoundError(id, 'Reserva');

        const [deleted] = this.#bookings.splice(index, 1);
        await this.#persist();
        return deleted;
    }

    async addServiceToBooking(bookingId, serviceId) {
        const index = this.#bookings.findIndex(b => b.id === bookingId);
        if (index === -1) throw new NotFoundError(bookingId, 'Reserva');

        const booking = this.#bookings[index];

        if (!Array.isArray(booking.services)) {
            booking.services = [];
        }

        if (!booking.services.includes(serviceId)) {
            booking.services.push(serviceId);
            await this.#persist();
        }

        return booking;
    }
}

export default BookingManager;
