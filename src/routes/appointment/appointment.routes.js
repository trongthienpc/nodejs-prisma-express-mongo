import express from "express";
import appointmentController from "../../controllers/appointment/appointment.controller.js";
import { checkAuthenticated } from "../../services/jwt.service.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: items
 *   description: API for managing items.
 *
 * components:
 *   schemas:
 *     item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the item
 *         name:
 *           type: string
 *           description: Name of the item
 *         createdAt:
 *           type: Date
 *           description: Date and time of item creation
 *         updatedAt:
 *           type: Date
 *           description: Date and time of item update
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/item'
 *           description: List of users in the item
 *
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve all item
 *     tags: [items]
 *     responses:
 *       "200":
 *         description: A list of warehouse schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/item'
 *       "500":
 *         description: Internal server error
 */
router.get("/", checkAuthenticated, appointmentController.getItems);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags:
 *       - items
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/item'
 *     responses:
 *       "201":
 *         description: A item schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/item'
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.post("/", checkAuthenticated, appointmentController.createItem);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retrieve a single item by id
 *     tags: [items]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The item ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A item schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/item'
 *       "404":
 *         description: item not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", checkAuthenticated, appointmentController.getItemById);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update a item by id
 *     tags: [items]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The item ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/item'
 *     responses:
 *       "200":
 *         description: A item schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/item'
 *       "404":
 *         description: item not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", checkAuthenticated, appointmentController.updateItemById);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete a item by id
 *     tags: [items]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The item ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: item deleted
 *       "404":
 *         description: item not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", checkAuthenticated, appointmentController.deleteItemById);

export default router;
