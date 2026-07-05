import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildService } from '../models/Service.model.js';
import { NotFoundError } from '../errors/AppError.js';
// Antes: import ServiceManager from '../managers/ServiceManager.js';
import ServiceManager from '../services/ServiceManager.js';

const DATA_PATH = resolve(fileURLToPath(new URL('.', import.meta.url)), '../data/services.json');

class ServiceManager {
    #services   = [];
    #currentId  = 1;

    /** Carga los datos desde services.json al arrancar. */
    async init() {
        try {
            const raw = await readFile(DATA_PATH, 'utf-8');
            this.#services = JSON.parse(raw);
            if (this.#services.length > 0) {
                this.#currentId = Math.max(...this.#services.map(s => s.id)) + 1;
            }
        } catch {
            this.#services = [];
        }
    }

    /** Escribe el estado actual en services.json. */
    async #persist() {
        await writeFile(DATA_PATH, JSON.stringify(this.#services, null, 2), 'utf-8');
    }

    getAll(limit) {
        const list = [...this.#services];
        return limit ? list.slice(0, limit) : list;
    }

    getById(id) {
        const service = this.#services.find(s => s.id === id);
        if (!service) throw new NotFoundError(id, 'Servicio');
        return service;
    }

    async add(data) {
        const service = buildService(this.#currentId++, data);
        this.#services.push(service);
        await this.#persist();
        return service;
    }

    async update(id, data) {
        const index = this.#services.findIndex(s => s.id === id);
        if (index === -1) throw new NotFoundError(id, 'Servicio');

        const { id: _ignored, ...safeData } = data;
        this.#services[index] = { ...this.#services[index], ...safeData };
        await this.#persist();
        return this.#services[index];
    }

    async remove(id) {
        const index = this.#services.findIndex(s => s.id === id);
        if (index === -1) throw new NotFoundError(id, 'Servicio');

        const [deleted] = this.#services.splice(index, 1);
        await this.#persist();
        return deleted;
    }
}

export default ServiceManager;
