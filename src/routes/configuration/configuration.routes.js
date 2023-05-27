import express from "express";
import configurationController from "../../controllers/configuration/configuration.controller.js";
import { checkAuthenticated } from "../../services/jwt.service.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: configurations
 *   description: API for managing configurations.
 *
 * components:
 *   schemas:
 *     configuration:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the configuration
 *         name:
 *           type: string
 *           description: Name of the configuration
 *         createdAt:
 *           type: Date
 *           description: Date and time of configuration creation
 *         updatedAt:
 *           type: Date
 *           description: Date and time of configuration update
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/configuration'
 *           description: List of users in the configuration
 *
 */

/**
 * @swagger
 * /configurations:
 *   get:
 *     summary: Retrieve all configuration
 *     tags: [configurations]
 *     responses:
 *       "200":
 *         description: A list of warehouse schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/configuration'
 *       "500":
 *         description: Internal server error
 */
router.get("/", checkAuthenticated, configurationController.getItems);

/**
 * @swagger
 * /configurations:
 *   post:
 *     summary: Create a new configuration
 *     tags:
 *       - configurations
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/configuration'
 *     responses:
 *       "201":
 *         description: A configuration schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/configuration'
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.post("/", checkAuthenticated, configurationController.createItem);

/**
 * @swagger
 * /configurations/{id}:
 *   get:
 *     summary: Retrieve a single configuration by id
 *     tags: [configurations]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The configuration ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A configuration schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/configuration'
 *       "404":
 *         description: configuration not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", checkAuthenticated, configurationController.getItemById);

/**
 * @swagger
 * /configurations/{id}:
 *   put:
 *     summary: Update a configuration by id
 *     tags: [configurations]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The configuration ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/configuration'
 *     responses:
 *       "200":
 *         description: A configuration schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/configuration'
 *       "404":
 *         description: configuration not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", checkAuthenticated, configurationController.updateItemById);

/**
 * @swagger
 * /configurations/{id}:
 *   delete:
 *     summary: Delete a configuration by id
 *     tags: [configurations]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The configuration ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: configuration deleted
 *       "404":
 *         description: configuration not found
 *       "500":
 *         description: Internal server error
 */
router.delete(
  "/:id",
  checkAuthenticated,
  configurationController.deleteItemById
);

export default router;
