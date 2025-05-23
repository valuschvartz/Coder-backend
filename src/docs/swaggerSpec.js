import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adoptme API',
      description: 'Documentación de la API del sistema de adopciones de mascotas',
      version: '1.0.0',
    },
  },
  apis: ['./src/docs/*.js'], // Documentos de los módulos
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export { swaggerUi };