# Etapa 1: Compilar la aplicación React con Vite
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir producción con Nginx Alpine
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Configuración para soportar React Router (SPAs)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
