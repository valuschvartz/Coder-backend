# 🚀 Proyecto Backend CoderHouse - Node.js + MongoDB

Este proyecto es una API desarrollada con **Node.js** y **Express**, conectada a **MongoDB**, y preparada para ejecutarse dentro de un contenedor Docker. Forma parte del curso de Backend de **CoderHouse**.

---

## 📦 Características principales

- Servidor Express.
- Conexión a MongoDB.
- Estructura modular: rutas, controladores, DAOs, servicios.
- Autenticación con JWT.
- Testing con Mocha, Chai y Supertest.
- Documentación API con Swagger.
- Mocking para datos de pruebas.
- Imagen Docker pública disponible.

---

## 🔗 Repositorios y recursos

- **Repositorio GitHub:**  
  [https://github.com/valuschvartz/coderhouse-backend-III](https://github.com/valuschvartz/coderhouse-backend-III)

- **Imagen en Docker Hub:**  
  [https://hub.docker.com/r/valuschvartz/miapp-node](https://hub.docker.com/r/valuschvartz/miapp-node)

---

## 🐳 Uso con Docker

### 1. Clonar el repositorio

```bash
git clone https://github.com/valuschvartz/coderhouse-backend-III.git
cd coderhouse-backend-III

2. Crear la imagen Docker

docker build -t valuschvartz/miapp-node .

3. Ejecutar el contenedor

docker run --env-file .env -p 8080:8080 valuschvartz/miapp-node

4. Acceder a la API
	•	API base: http://localhost:8080
	•	Documentación Swagger: http://localhost:8080/docs

⸻

📋 Requisitos previos
	•	Tener instalado Docker.
	•	Tener una URI válida de MongoDB (por ejemplo, en MongoDB Atlas).

⸻

⚙️ Variables de entorno

Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

PORT=8080
MONGO_URL=mongodb://localhost:27017/mocksDB
JWT_SECRET=coder123

🧪 Testing

El proyecto incluye testing automático con Mocha, Chai y Supertest.

Instalar dependencias:
npm install
npm test

📁 Estructura del proyecto

coderhouse-backend-III/
├── src/
│   ├── controllers/
│   ├── dao/
│   ├── docs/
│   ├── dto/
│   ├── public/
│   ├── repository/
│   ├── routes/
│   ├── services/
│   ├── test/
│   ├── utils/
├── app.js
├── .env
├── Dockerfile
├── package.json
└── README.md

📦 Imagen Docker publicada

La imagen Docker del proyecto ha sido subida a Docker Hub y está disponible públicamente:
docker push valuschvartz/miapp-node:latest

Podés descargarla y usarla directamente desde Docker Hub:
docker pull valuschvartz/miapp-node:latest

Link directo a la imagen en Docker Hub:
https://hub.docker.com/r/valuschvartz/miapp-node

⸻

✨ Autor

Desarrollado por Valentina Schwartz
Proyecto final - Curso Backend - CoderHouse

Repositorio: https://github.com/valuschvartz/coderhouse-backend-III