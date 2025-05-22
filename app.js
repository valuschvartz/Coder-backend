import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// Importa el logger (asegúrate de crearlo en src/utils/logger.js)
import logger from './src/utils/logger.js';


import usersRouter from './src/routes/users.router.js';
import petsRouter from './src/routes/pets.router.js';
import adoptionsRouter from './src/routes/adoption.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import mockingRouter from './src/routes/mocking.js';
import { errorHandler } from './src/utils/errorHandler.js';
import mocksRouter from './src/routes/mocks.router.js';


const app = express();
const PORT = process.env.PORT || 8080;

// Configurar Mongoose
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logger.info('✅ Connected to MongoDB'))
.catch(err => logger.error('❌ Error connecting to MongoDB: ' + err.message));

// Middleware para loguear las peticiones HTTP
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/api/mocks', mocksRouter);


// Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mockingpets', mockingRouter); 

// Endpoint para probar todos los niveles de logueo
app.get('/loggerTest', (req, res) => {
  logger.debug('Debug log - Detalle para desarrolladores');
  logger.http('Http log - Petición HTTP');
  logger.info('Info log - Información relevante');
  logger.warning('Warning log - Advertencia');
  logger.error('Error log - Error detectado');
  logger.fatal('Fatal log - Error crítico');

  res.send('Logger funcionando. Revisa los logs.');
});

// Middleware de manejo de errores personalizado
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});