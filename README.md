# Mi App

Aplicación web fullstack (Laravel + React/Vite + PostgreSQL, dockerizada).

## Estructura

- `backend/` → API Laravel
- `frontend/` → SPA React + Vite
- `docker/` → Dockerfiles
- `docker-compose.yml` → orquestación de servicios

## Cómo levantar el entorno

1. Copia los `.env.example` a `.env` en `backend/` y `frontend/`, y ajusta valores si es necesario.
2. Levanta los contenedores:
   ```bash
   docker compose up --build
   ```
3. Backend disponible en `http://localhost:8000`
4. Frontend disponible en `http://localhost:5173`

## Desarrollo local (sin Docker, alternativa)

### Backend
```bash
cd backend
composer install
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
