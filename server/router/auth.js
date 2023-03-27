const express = require('express');
const multiparty = require('connect-multiparty');
const AuthController = require('../controllers/auth');
const md_upload = multiparty({uploadDir: './uploads/profile'});
const api = express.Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Student, Instructor, Admin]
 *               picture:
 *                 type: string
 *                 format: binary
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: Registro exitoso
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error interno del servidor
 */

api.post("/auth/register",[md_upload] , AuthController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Permite a los usuarios registrados iniciar sesión en la plataforma
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Correo electrónico del usuario
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *       - name: password
 *         description: Contraseña del usuario
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: El usuario ha iniciado sesión correctamente
 *         schema:
 *           type: object
 *           properties:
 *             access:
 *               type: string
 *               description: Token de acceso para realizar solicitudes a la API
 *             refresh:
 *               type: string
 *               description: Token de actualización para renovar el token de acceso
 *       400:
 *         description: Error en la solicitud. Faltan campos obligatorios o los valores son inválidos
 *       401:
 *         description: Las credenciales proporcionadas no son válidas o el usuario no está activo
 *       404:
 *         description: El usuario no está registrado en la plataforma
 *       500:
 *         description: Error interno del servidor
 */
api.post("/auth/login", AuthController.login);
api.post("/auth/refreshAccessToken", AuthController.refreshToken);

module.exports = api;
