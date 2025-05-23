/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las solicitudes de adopción
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones

 *   post:
 *     summary: Enviar solicitud de adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Solicitud creada
 */