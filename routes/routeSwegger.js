/**
 *  @swagger
 *  tags:
 *    name: Books
 *    description: API to manage your books.
 */
/**
 *  @swagger
 *  paths:
 *   /books:
 *     get:
 *       summary: Lists all the books
 *       tags: [Books]
 *       responses:
 *         "200":
 *           description: The list of books.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *     post:
 *       summary: Creates a new book
 *       tags: [Books]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *         "200":
 *           description: The created book.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 *     components:
 *         schemas:
 *             Book:
 *                 type: object
 *                 required:
 *                     - title
 *                     - author
 *                     - finished
 *                 properties:
 *                     id:
 *                         type: integer
 *                         description: The auto-generated id of the book.
 *                     title:
 *                         type: string
 *                         description: The title of your book.
 *                     author:
 *                         type: string
 *                         description: Who wrote the book?
 *                     finished:
 *                         type: boolean
 *                         description: Have you finished reading it?
 *                     createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                     example:
 *                         title: The Pragmatic Programmer
 *                         author: Andy Hunt / Dave Thomas
 *                         finished: true
 */
