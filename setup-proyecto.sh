#!/bin/bash
# setup-proyecto.sh
# Crea la estructura inicial de un proyecto fullstack (Laravel + React/Vite + Docker)
# Uso: ./setup-proyecto.sh

set -e

echo "🚀 Creando estructura del proyecto..."

# --- Carpetas base ---
mkdir -p backend
mkdir -p frontend
mkdir -p docker

# --- .gitignore combinado ---
cat > .gitignore << 'EOF'
# Backend (Laravel)
backend/vendor/
backend/.env
backend/storage/*.key
backend/storage/framework/cache/*
backend/storage/framework/sessions/*
backend/storage/framework/views/*
backend/bootstrap/cache/*

# Frontend (React/Vite)
frontend/node_modules/
frontend/dist/
frontend/.env
frontend/.vite/

# General
.DS_Store
*.log
.idea/
.vscode/
EOF

# --- .env.example backend ---
cat > backend/.env.example << 'EOF'
APP_NAME=MiApp
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=miapp
DB_USERNAME=postgres
DB_PASSWORD=secret

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
EOF

# --- .env.example frontend ---
cat > frontend/.env.example << 'EOF'
VITE_API_URL=http://localhost:8000/api
EOF

# --- docker-compose.yml ---
cat > docker-compose.yml << 'EOF'
services:
  db:
    image: postgres:16
    container_name: miapp_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: miapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: ../docker/backend.Dockerfile
    container_name: miapp_backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/var/www/html
    depends_on:
      - db
    env_file:
      - ./backend/.env

  frontend:
    build:
      context: ./frontend
      dockerfile: ../docker/frontend.Dockerfile
    container_name: miapp_frontend
    restart: unless-stopped
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend

volumes:
  db_data:
EOF

# --- Dockerfile backend ---
cat > docker/backend.Dockerfile << 'EOF'
FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git unzip libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
EOF

# --- Dockerfile frontend ---
cat > docker/frontend.Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
EOF

# --- README ---
cat > README.md << 'EOF'
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
EOF

echo "✅ Estructura creada con éxito."
echo ""
echo "Próximos pasos:"
echo "1. cd backend && composer create-project laravel/laravel . "
echo "2. cd frontend && npm create vite@latest . -- --template react"
echo "3. Copia los .env.example a .env en cada carpeta"
echo "4. docker compose up --build"
