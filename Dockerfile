# Dockerfile

# Imagen base oficial de Node.js (usa la versión que necesites, acá la 18)
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (para cachear instalación deps)
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código de la app
COPY . .

# Exponer el puerto que usa la app (según tu app.js, es 8080)
EXPOSE 8080

# Variable de entorno por defecto (opcional)
ENV PORT=8080

# Comando para arrancar la app
CMD ["node", "app.js"]