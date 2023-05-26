import express from "express";
import itemTypeController from "../../controllers/itemType/itemType.controller.js";
import { checkAuthenticated } from "../../services/jwt.service.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemTypes
 *   description: API for managing ItemTypes.
 *
 * components:
 *   schemas:
 *     ItemType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the ItemType
 *         name:
 *           type: string
 *           description: Name of the ItemType
 *         createdAt:
 *           type: Date
 *           description: Date and time of ItemType creation
 *         updatedAt:
 *           type: Date
 *           description: Date and time of ItemType update
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemType'
 *           description: List of users in the ItemType
 *         roleItemTypes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemType'
 *           description: List of role ItemTypes in the ItemType
 */

/**
 * @swagger
 * /itemTypes:
 *   get:
 *     summary: Retrieve all itemType
 *     tags: [ItemTypes]
 *     responses:
 *       "200":
 *         description: A list of warehouse schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemType'
 *       "500":
 *         description: Internal server error
 */
router.get("/", checkAuthenticated, itemTypeController.getItems);

/**
 * @swagger
 * /itemTypes:
 *   post:
 *     summary: Create a new ItemType
 *     tags:
 *       - ItemTypes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemType'
 *     responses:
 *       "201":
 *         description: A ItemType schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemType'
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.post("/", checkAuthenticated, itemTypeController.createItem);

/**
 * @swagger
 * /itemTypes/{id}:
 *   get:
 *     summary: Retrieve a single itemType by id
 *     tags: [ItemTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The itemType ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A itemType schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemType'
 *       "404":
 *         description: ItemType not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", checkAuthenticated, itemTypeController.getItemById);

/**
 * @swagger
 * /itemTypes/{id}:
 *   put:
 *     summary: Update a itemType by id
 *     tags: [ItemTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The itemType ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemType'
 *     responses:
 *       "200":
 *         description: A itemType schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemType'
 *       "404":
 *         description: ItemType not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", checkAuthenticated, itemTypeController.updateItemById);

/**
 * @swagger
 * /itemTypes/{id}:
 *   delete:
 *     summary: Delete a ItemType by id
 *     tags: [ItemTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ItemType ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: ItemType deleted
 *       "404":
 *         description: ItemType not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", checkAuthenticated, itemTypeController.deleteItemById);

export default router;
