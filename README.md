# CleanMatch - Administrador de Servicios 🧹

Proyecto Node.js para gestionar los servicios de un sistema de turnos y reservas (estilo Tinder para servicios domésticos). Este README refleja la **Pre-entrega 2**, que incorpora un servidor **Express** con enrutamiento REST completo sobre el recurso `Services`.

## Requisitos
- Node.js (v14 o superior)
- npm

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:
   ```
   PORT=8080
   NODE_ENV=development
   ```

## Ejecución del servidor Express

Para levantar el servidor, ejecuta:

```bash
npm start
```

El servidor quedará escuchando en `http://localhost:8080` (o el puerto definido en `.env`).  
Verás en la consola:

```
🚀 CleanMatch corriendo en modo: development
📡 Servidor escuchando en http://localhost:8080
```

> **Importante:** el servidor debe estar corriendo antes de realizar cualquier petición desde Postman.

## Variables de Entorno Necesarias

- `PORT`: Puerto donde correrá el servidor (ej. `8080`).
- `NODE_ENV`: Entorno de ejecución (ej. `development`).

## API REST — Endpoints de `Services`

Base URL: `http://localhost:8080/api/services`

> Todos los cuerpos de solicitud y respuesta son **JSON**.  
> Configura en Postman el header `Content-Type: application/json` para las peticiones POST y PUT.

---

### 1. Listar todos los servicios

| Método | URL                  | Código de éxito |
|--------|----------------------|-----------------|
| GET    | `/api/services`      | `200 OK`        |

**Ejemplo en Postman:**
- Method: `GET`
- URL: `http://localhost:8080/api/services`

**Respuesta exitosa:**
```json
[
  {
    "id": 1,
    "name": "Limpieza General",
    "description": "Limpieza estándar de mantenimiento",
    "duration": 3,
    "price": 5000,
    "category": "limpieza",
    "available": true
  }
]
```

---

### 2. Listar servicios con límite (`req.query`)

| Método | URL                            | Código de éxito |
|--------|--------------------------------|-----------------|
| GET    | `/api/services?limit=2`        | `200 OK`        |

**Ejemplo en Postman:**
- Method: `GET`
- URL: `http://localhost:8080/api/services?limit=2`

Retorna los primeros `n` servicios. Si `limit` no es un número positivo, devuelve `400`.

---

### 3. Obtener un servicio por ID (`req.params`)

| Método | URL                    | Código de éxito | Error           |
|--------|------------------------|-----------------|-----------------|
| GET    | `/api/services/:id`    | `200 OK`        | `404 Not Found` |

**Ejemplo en Postman:**
- Method: `GET`
- URL: `http://localhost:8080/api/services/1`

**Respuesta 404:**
```json
{ "error": "Servicio con id 1 no encontrado." }
```

---

### 4. Crear un servicio (`req.body`)

| Método | URL               | Código de éxito  | Error            |
|--------|-------------------|------------------|------------------|
| POST   | `/api/services`   | `201 Created`    | `400 Bad Request`|

**Ejemplo en Postman:**
- Method: `POST`
- URL: `http://localhost:8080/api/services`
- Body → raw → JSON:

```json
{
  "name": "Limpieza Post Obra",
  "description": "Limpieza profunda para final de obra",
  "duration": 6,
  "price": 15000,
  "category": "limpieza_especial",
  "available": true
}
```

**Respuesta 201:**
```json
{
  "id": 1,
  "name": "Limpieza Post Obra",
  "description": "Limpieza profunda para final de obra",
  "duration": 6,
  "price": 15000,
  "category": "limpieza_especial",
  "available": true
}
```

**Respuesta 400** (campos faltantes):
```json
{ "error": "Faltan campos obligatorios. Se requiere: name, description, duration, price, category, available." }
```

---

### 5. Actualizar un servicio (`req.params` + `req.body`)

| Método | URL                  | Código de éxito | Error           |
|--------|----------------------|-----------------|-----------------|
| PUT    | `/api/services/:id`  | `200 OK`        | `404 Not Found` |

**Ejemplo en Postman:**
- Method: `PUT`
- URL: `http://localhost:8080/api/services/1`
- Body → raw → JSON:

```json
{
  "price": 18000,
  "available": false
}
```

**Respuesta 200:** el objeto completo actualizado.

---

### 6. Eliminar un servicio (`req.params`)

| Método | URL                     | Código de éxito | Error           |
|--------|-------------------------|-----------------|-----------------|
| DELETE | `/api/services/:id`     | `200 OK`        | `404 Not Found` |

**Ejemplo en Postman:**
- Method: `DELETE`
- URL: `http://localhost:8080/api/services/1`

**Respuesta 200:** el objeto del servicio eliminado.

---

## Descripción del recurso `Services`

| Campo         | Tipo    | Descripción                                    |
|---------------|---------|------------------------------------------------|
| `id`          | Number  | Identificador único generado automáticamente   |
| `name`        | String  | Nombre del servicio                            |
| `description` | String  | Detalle de las tareas incluidas                |
| `duration`    | Number  | Tiempo estimado en horas                       |
| `price`       | Number  | Tarifa base del servicio                       |
| `category`    | String  | Tipo de servicio                               |
| `available`   | Boolean | Estado de disponibilidad                       |

## Estructura del Proyecto

```
cleanmatch-backend/
├── src/
│   ├── config/
│   │   └── env.config.js         # Validación y exportación de variables de entorno
│   ├── data/
│   │   └── services.json         # Datos de ejemplo (preparado para persistencia futura)
│   ├── managers/
│   │   └── ServiceManager.js     # Lógica CRUD del administrador de servicios
│   ├── routes/
│   │   └── services.router.js    # Rutas REST del recurso Services (Express Router)
│   └── app.js                    # Punto de entrada — configura y levanta el servidor
├── .env                          # Variables de entorno locales (NO subir a GitHub)
├── .env.example                  # Plantilla de variables de entorno
├── .gitignore
└── package.json
```
