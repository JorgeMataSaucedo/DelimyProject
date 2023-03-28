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


/**
 * Inicia sesión con las credenciales del usuario.
 *
 * @swagger
 * tags:
 *   name: Autenticación
 * /api/v1/auth/loginB:
 *   post:
 *     summary: Inicia sesión con las credenciales del usuario.
 *     tags: [Autenticación]
 *     requestBody:
 *       description: Objeto JSON que contiene las credenciales del usuario.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: Contraseña123
 *     responses:
 *       '200':
 *         description: Se ha iniciado sesión correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDQ2NzhiYjNiNjczZTAwMTc1YWIxZjQiLCJpYXQiOjE1NjQ4OTQ4MTQsImV4cCI6MTU2NTUwMzYxNH0.6UQL0YU-v0vE-REhKBEgNlZLLs1sFvzKfwE1HbqbzKM
 *                 user:
 *                   type: object
 *                   description: Objeto JSON que representa al usuario autenticado.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Identificador único del usuario.
 *                       example: 5d4678bb3b673e00175ab1f4
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario.
 *                       example: usuario@ejemplo.com
 *       '400':
 *         description: No se pudo iniciar sesión debido a credenciales inválidas o algún otro error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que describe el problema.
 *                   example: Credenciales inválidas.
 */
api.post("/auth/loginB", AuthController.loginB);

api.get("/auth/logout", AuthController.logout);

api.post("/auth/refreshAccessToken", AuthController.refreshToken);

module.exports = api;
