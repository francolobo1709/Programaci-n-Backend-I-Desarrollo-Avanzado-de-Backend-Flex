import { serviceRepository } from '../repositories/services.repository.js';

export const serviceService = {
    getAll:  (query) => serviceRepository.getAll(query),
    getById: (id) => serviceRepository.getById(id),
    create:  (data) => serviceRepository.create(data),
    update:  (id, data) => serviceRepository.update(id, data),
    remove:  (id) => serviceRepository.remove(id),
};
