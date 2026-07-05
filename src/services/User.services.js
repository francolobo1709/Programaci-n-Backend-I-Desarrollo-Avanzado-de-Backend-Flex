import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildUser } from '../models/User.model.js';
import { NotFoundError, ValidationError } from '../errors/AppError.js';

const DATA_PATH = resolve(fileURLToPath(new URL('.', import.meta.url)), '../data/users.json');

class UserService {
    #users = [];
    #currentId = 1;

    async init() {
        try {
            const raw = await readFile(DATA_PATH, 'utf-8');
            this.#users = JSON.parse(raw);
            if (this.#users.length > 0) {
                this.#currentId = Math.max(...this.#users.map(u => u.id)) + 1;
            }
        } catch {
            this.#users = [];
        }
    }

    async #persist() {
        await writeFile(DATA_PATH, JSON.stringify(this.#users, null, 2), 'utf-8');
    }

    getAll(limit) {
        const list = [...this.#users];
        // Por seguridad, no devolvemos las contraseñas
        const safeList = list.map(({ password, ...safeUser }) => safeUser);
        return limit ? safeList.slice(0, limit) : safeList;
    }

    getById(id) {
        const user = this.#users.find(u => u.id === id);
        if (!user) throw new NotFoundError(id, 'Usuario');
        const { password, ...safeUser } = user;
        return safeUser;
    }

    async add(data) {
        // Validamos que el email no esté repetido
        if (this.#users.some(u => u.email === data.email?.toLowerCase())) {
            throw new ValidationError('El email ya está registrado.');
        }
        
        const user = buildUser(this.#currentId++, data);
        this.#users.push(user);
        await this.#persist();
        
        const { password, ...safeUser } = user;
        return safeUser;
    }

    async update(id, data) {
        const index = this.#users.findIndex(u => u.id === id);
        if (index === -1) throw new NotFoundError(id, 'Usuario');

        // Evitamos que modifiquen el ID o el Email
        const { id: _ignored, email, ...safeData } = data;
        this.#users[index] = { ...this.#users[index], ...safeData };
        await this.#persist();
        
        const { password, ...safeUser } = this.#users[index];
        return safeUser;
    }

    async remove(id) {
        const index = this.#users.findIndex(u => u.id === id);
        if (index === -1) throw new NotFoundError(id, 'Usuario');

        const [deleted] = this.#users.splice(index, 1);
        await this.#persist();
        
        const { password, ...safeUser } = deleted;
        return safeUser;
    }
}

export default UserService;