const express = require('express')
const multiparty = require('connect-multiparty');
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

const md_upload = multiparty({uploadDir: './uploads/profile'});

const api = express.Router();
/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     summary: Obtiene la información del usuario autenticado.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *       '401':
 *         description: No tiene autorizacion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: No se encontró al usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
api.get("/user",[md_auth.asureAuth], UserController.getMe);
api.get("/users",[md_auth.asureAuth], UserController.getUsers);
//api.post("/user",[md_auth.asureAuth, md_upload], UserController.createUser);

module.exports = api;