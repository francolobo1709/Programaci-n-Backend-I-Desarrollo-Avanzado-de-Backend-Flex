import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Fábrica que devuelve readData/writeData acotados a un archivo JSON específico.
 * @param {string} filename  Nombre del archivo dentro de src/data/ (ej: 'services.json')
 */
export function createJsonStore(filename) {
    const filePath = join(__dirname, '..', 'data', filename);

    async function readData() {
        const raw = await readFile(filePath, 'utf-8');
        return JSON.parse(raw);
    }

    async function writeData(data) {
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    return { readData, writeData };
}
