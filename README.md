# CleanMatch - Administrador de Servicios 🧹

Proyecto Node.js para gestionar los servicios de un sistema de turnos y reservas (estilo Tinder para servicios domésticos). Esta es la **Pre-entrega 1** del proyecto, centrada en la lógica de negocio mediante un `ServiceManager`.

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

## Ejecución

Para iniciar la aplicación y correr las pruebas del administrador, ejecuta:

```bash
npm start
```

## Variables de Entorno Necesarias

- `PORT`: Puerto donde correrá la aplicación.
- `NODE_ENV`: Entorno de ejecución (ej. `development`).

## Descripción del recurso `Services`

La entidad principal gestionada es el Servicio, el cual cuenta con la siguiente estructura:

| Campo         | Tipo    | Descripción                                    |
|---------------|---------|------------------------------------------------|
| `id`          | Number  | Identificador único generado automáticamente   |
| `name`        | String  | Nombre del servicio                            |
| `description` | String  | Detalle de las tareas incluidas                |
| `duration`    | Number  | Tiempo estimado en horas                       |
| `price`       | Number  | Tarifa base del servicio                       |
| `category`    | String  | Tipo de servicio                               |
| `available`   | Boolean | Estado de disponibilidad                       |

## Ejemplos de uso del ServiceManager

```javascript
import ServiceManager from './src/managers/ServiceManager.js';
const manager = new ServiceManager();

// Agregar servicio
manager.addService({
    name: "Limpieza Post Obra",
    description: "Limpieza profunda para final de obra",
    duration: 6,
    price: 15000,
    category: "limpieza_especial",
    available: true
});

// Obtener todos los servicios
manager.getServices();

// Obtener por ID
const servicio = manager.getServiceById(1);

// Actualizar servicio
manager.updateService(1, { price: 16000 });

// Eliminar servicio
manager.deleteService(1);
```

## Estructura del Proyecto

```
cleanmatch-backend/
├── src/
│   ├── config/
│   │   └── env.config.js      # Validación y exportación de variables de entorno
│   ├── data/
│   │   └── services.json      # Archivo de datos (preparado para persistencia futura)
│   ├── managers/
│   │   └── ServiceManager.js  # Lógica CRUD del administrador de servicios
│   └── app.js                 # Punto de entrada y pruebas del manager
├── .env                       # Variables de entorno locales (NO subir a GitHub)
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
└── package.json
```
