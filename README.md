# CleanMatch - API de Servicios y Reservas

Sistema Backend de Turnos y Reservas. API REST construida con **Node.js + Express + MongoDB Atlas (Mongoose)**.

> **Pre-entrega 4** — Migración a MongoDB con Mongoose. Persistencia migrada desde FileSystem a MongoDB Atlas. Arquitectura en capas: routes → controllers → services → repositories → DAO.

## Requisitos

- Node.js v18 o superior
- npm
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)

## Instalación

```bash
git clone <url-del-repositorio>
cd <carpeta>
npm install
```

## Variables de entorno

Copiá el archivo `.env.example` como `.env` y completá los valores reales:

```bash
cp .env.example .env
```

| Variable   | Descripción                      | Ejemplo              |
|------------|----------------------------------|----------------------|
| `PORT`     | Puerto del servidor              | `8080`               |
| `NODE_ENV` | Entorno de ejecución             | `development`        |
| `MONGO_URI`| URI de conexión a MongoDB Atlas  | `mongodb+srv://...`  |

## Ejecución

```bash
npm start      # producción
npm run dev    # desarrollo con watch
```

Salida esperada:

```
✅ MongoDB conectado correctamente.
🚀 CleanMatch corriendo en modo: development
📡 Servidor escuchando en http://localhost:8080
```

---

## Endpoints

### Services — `/api/services`

| Método   | Ruta                  | Descripción                |
|----------|-----------------------|----------------------------|
| `GET`    | `/api/services`       | Listar todos los servicios |
| `GET`    | `/api/services/:sid`  | Obtener servicio por ID    |
| `POST`   | `/api/services`       | Crear un servicio          |
| `PUT`    | `/api/services/:sid`  | Actualizar un servicio     |
| `DELETE` | `/api/services/:sid`  | Eliminar un servicio       |

**Body POST/PUT:**
```json
{
  "name": "Limpieza del hogar",
  "description": "Limpieza completa del hogar",
  "duration": 120,
  "price": 5000,
  "category": "limpieza",
  "available": true
}
```

---

### Bookings — `/api/bookings`

| Método | Ruta                                | Descripción                        |
|--------|-------------------------------------|------------------------------------|
| `POST` | `/api/bookings`                     | Crear una reserva                  |
| `GET`  | `/api/bookings/:bid`                | Obtener reserva por ID             |
| `POST` | `/api/bookings/:bid/services/:sid`  | Agregar un servicio a la reserva   |

**Body POST `/api/bookings`:**
```json
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan@mail.com",
  "date": "2026-07-15T10:00:00"
}
```

---

### Messages — `/api/messages`

| Método   | Ruta                           | Descripción                     |
|----------|--------------------------------|---------------------------------|
| `GET`    | `/api/messages`                | Listar todos los mensajes       |
| `GET`    | `/api/messages/:mid`           | Obtener mensaje por ID          |
| `GET`    | `/api/messages/booking/:bid`   | Mensajes de una reserva         |
| `POST`   | `/api/messages`                | Crear un mensaje                |
| `DELETE` | `/api/messages/:mid`           | Eliminar un mensaje             |

**Body POST `/api/messages`:**
```json
{
  "booking": "<ObjectId de la reserva>",
  "sender": "Juan Pérez",
  "content": "¿Podría confirmar el turno?"
}
```

---

## Arquitectura

```
src/
├── config/        → env.config.js, mongodb.js
├── models/        → Mongoose schemas (Service, Booking, Message, User)
├── dao/           → Acceso directo a MongoDB (Mongoose)
├── repositories/  → Validación de ObjectId + wraps de DAO
├── services/      → Lógica de negocio
├── controllers/   → Handlers HTTP
├── routes/        → Definición de endpoints Express
├── middlewares/   → errorHandler, parseId
└── errors/        → AppError, ValidationError, NotFoundError
```
