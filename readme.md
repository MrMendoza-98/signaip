# Registro de Marcas - CRUD Fullstack

Proyecto de ejemplo para la gestión de registros de marcas, implementando un patrón de diseño por capas en el backend (FastAPI + SQLAlchemy + SQLite) y un frontend básico en Next.js + React.

---

## Estructura del Proyecto

```
signaip/
│
├── backend/
│   ├── main.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── routes/
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── hooks/
    └── ...
```

---

## Librerías Utilizadas

### Backend (Python)
- **FastAPI**: Framework para construir APIs rápidas y modernas.
- **SQLAlchemy**: ORM para la gestión de la base de datos.
- **SQLite**: Base de datos ligera y embebida.
- **Uvicorn**: Servidor ASGI para correr FastAPI.
- **Pydantic**: Validación de datos y esquemas.

### Frontend (JavaScript/TypeScript)
- **Next.js**: Framework React para aplicaciones web modernas.
- **React**: Librería principal para la UI.
- **Tailwind CSS**: Utilidades para estilos rápidos y responsivos (opcional, según tu código).
- **Axios** o **fetch**: Para consumir la API (según tu implementación).

---

## Endpoints del CRUD de Marcas (Backend)

| Método | Endpoint           | Descripción                       |
|--------|--------------------|-----------------------------------|
| GET    | `/marcas`          | Listar todas las marcas           |
| GET    | `/marcas/{id}`     | Obtener una marca por ID          |
| POST   | `/marcas`          | Crear una nueva marca             |
| PUT    | `/marcas/{id}`     | Actualizar una marca existente    |
| DELETE | `/marcas/{id}`     | Eliminar una marca                |

---

## Cómo ejecutar el proyecto

### Backend

1. Instala dependencias:
    ```bash
    pip install fastapi sqlalchemy uvicorn pydantic
    ```
2. Ejecuta el servidor:
    ```bash
    uvicorn main:app --reload
    ```
3. Accede a la documentación interactiva:
    [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Frontend

1. Instala dependencias:
    ```bash
    npm install
    ```
2. Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
3. Accede a la app en:
    [http://localhost:3000](http://localhost:3000)

