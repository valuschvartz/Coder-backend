/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/sessions/logout:
 *   post:
 *     summary: Logout del usuario
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */