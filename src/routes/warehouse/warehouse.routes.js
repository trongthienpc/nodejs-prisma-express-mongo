import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  update,
  read,
  remove,
} from "../../controllers/warehouse/warehouse.controller.js";
import { checkAuthenticated } from "../../services/jwt.service.js";
/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: API for managing warehouses.
 *
 * components:
 *   schemas:
 *     Warehouse:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the warehouse
 *         name:
 *           type: string
 *           description: Name of the warehouse
 *         createdAt:
 *           type: Date
 *           description: Date and time of warehouse creation
 *         updatedAt:
 *           type: Date
 *           description: Date and time of warehouse update
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Warehouse'
 *           description: List of users in the warehouse
 *         roleWarehouses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Warehouse'
 *           description: List of role warehouses in the warehouse
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new warehouse
 *     tags: [Warehouses]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       "201":
 *         description: A warehouse schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.post("/", checkAuthenticated, create);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all warehouses
 *     tags: [Warehouses]
 *     responses:
 *       "200":
 *         description: A list of warehouse schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 *       "500":
 *         description: Internal server error
 */
router.get("/", checkAuthenticated, getAll);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a single warehouse by id
 *     tags: [Warehouses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The warehouse ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A warehouse schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       "404":
 *         description: Warehouse not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", checkAuthenticated, read);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a warehouse by id
 *     tags: [Warehouses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The warehouse ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warehouse'
 *     responses:
 *       "200":
 *         description: A warehouse schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       "404":
 *         description: Warehouse not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", checkAuthenticated, update);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a warehouse by id
 *     tags: [Warehouses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The warehouse ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Warehouse deleted
 *       "404":
 *         description: Warehouse not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", checkAuthenticated, remove);

export default router;
