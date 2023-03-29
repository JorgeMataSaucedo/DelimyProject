const express = require("express");
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/course");

const md_upload = multiparty({ uploadDir: "./uploads/courses" });

const api = express.Router();

/**
 * @openapi
 * /api/v1/course:
 *   post:
 *     summary: Crea un nuevo curso.
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               miniature:
 *                 type: string
 *                 format: binary
 *               score:
 *                 type: number
 *                 default: 0
 *             required:
 *               - title
 *               - description
 *               - price
 *               - score
 *     responses:
 *       '200':
 *         description: Curso creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 *
 *       '401':
 *         description: Error de autentificacion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
api.post(
    "/course",
    [md_upload],
    CourseController.createCourse
);
/**
 * @openapi
 * /api/v1/courses:
 *   get:
 *     summary: Obtiene una lista de cursos paginada
 *     tags:
 *       - Course
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página de resultados
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Número máximo de resultados por página
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       '200':
 *         description: Lista de cursos paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 */
api.get("/courses", CourseController.getCourse);
api.patch(
    "/course/:id",
    [md_upload],
    CourseController.updateCourse
);
api.delete("/course/:id", CourseController.deleteCourse);



module.exports = api;