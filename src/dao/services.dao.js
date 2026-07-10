import { randomUUID } from 'node:crypto';
import { createJsonStore } from './json.store.js';

const { readData, writeData } = createJsonStore('services.json');

export class ServiceDAO {
    async findAll({ filter = {}, sort = {}, page = 1, limit = 10 } = {}) {
        let docs = await readData();

        if (filter.category !== undefined) docs = docs.filter(d => d.category === filter.category);
        if (filter.available !== undefined) docs = docs.filter(d => d.available === filter.available);

        const total = docs.length;

        const [sortField] = Object.keys(sort);
        if (sortField) {
            const dir = sort[sortField]; // 1 asc | -1 desc
            docs.sort((a, b) => {
                if (a[sortField] < b[sortField]) return -1 * dir;
                if (a[sortField] > b[sortField]) return 1 * dir;
                return 0;
            });
        }

        const skip = (page - 1) * limit;
        docs = docs.slice(skip, skip + limit);

        return { docs, total };
    }

    async findById(id) {
        const docs = await readData();
        return docs.find(d => d._id === id) ?? null;
    }

    async create(data) {
        const docs = await readData();
        const now = new Date().toISOString();
        const newDoc = { _id: randomUUID(), ...data, createdAt: now, updatedAt: now };
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
}
