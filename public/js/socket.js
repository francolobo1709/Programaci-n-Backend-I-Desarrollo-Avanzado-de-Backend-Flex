/* Conexión al servidor Socket.io */
const socket = io();

socket.on('connect', () => {
    console.log('[Socket.io] Conectado al servidor —', socket.id);
});

socket.on('disconnect', () => {
    console.log('[Socket.io] Desconectado del servidor');
});

/**
 * service:created
 * Se emite desde el servidor cada vez que se crea un servicio via POST /api/services.
 * Si el usuario está en la vista de servicios, el nuevo servicio aparece sin recargar.
 */
socket.on('service:created', (service) => {
    const container = document.getElementById('services-container');
    if (!container) return; // El usuario no está en /views/services

    // Si había el mensaje de "No hay servicios", lo quitamos
    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const available = service.available;

    const card = document.createElement('div');
    card.className = 'card service-card card-new';
    card.dataset.id = service._id;
    card.innerHTML = `
        <div class="card-header">
            <h2>${escapeHtml(service.name)}</h2>
            <span class="badge ${available ? 'badge-available' : 'badge-unavailable'}">
                ${available ? 'Disponible' : 'No disponible'}
            </span>
        </div>
        <p class="card-description">${escapeHtml(service.description)}</p>
        <ul class="card-details">
            <li><span class="label">Duración</span><span class="value">${service.duration} min</span></li>
            <li><span class="label">Precio</span><span class="value">$${service.price}</span></li>
            <li><span class="label">Categoría</span><span class="value">${escapeHtml(service.category)}</span></li>
        </ul>
    `;
    container.prepend(card);
});

/**
 * booking:created
 * Se emite desde el servidor cada vez que se crea una reserva via POST /api/bookings.
 * Si el usuario está en la vista de disponibilidad, la reserva aparece sin recargar.
 */
socket.on('booking:created', (booking) => {
    const container = document.getElementById('bookings-container');
    if (!container) return;

    const empty = container.querySelector('.empty-state');
    if (empty) empty.remove();

    const statusLabels = { pending: 'pending', confirmed: 'confirmed', cancelled: 'cancelled' };
    const status = statusLabels[booking.status] ?? booking.status;

    const date = booking.date
        ? new Date(booking.date).toLocaleString('es-AR')
        : '-';

    const card = document.createElement('div');
    card.className = 'card booking-card card-new';
    card.dataset.id = booking._id;
    card.innerHTML = `
        <div class="card-header">
            <h2>${escapeHtml(booking.clientName)}</h2>
            <span class="badge badge-status-${status}">${status}</span>
        </div>
        <ul class="card-details">
            <li><span class="label">Email</span><span class="value">${escapeHtml(booking.clientEmail)}</span></li>
            <li><span class="label">Fecha</span><span class="value">${date}</span></li>
        </ul>
    `;
    container.prepend(card);
});

/** Previene XSS al insertar HTML dinámico */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
