import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  update,
  read,
  remove,
} from "../../controllers/group/groupController.js";
import { checkAuthenticated } from "../../services/jwt.service.js";
/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API for managing groups.
 *
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the group
 *         name:
 *           type: string
 *           description: Name of the group
 *         createdAt:
 *           type: Date
 *           description: Date and time of group creation
 *         updatedAt:
 *           type: Date
 *           description: Date and time of group update
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Group'
 *           description: List of users in the group
 *         roleGroups:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Group'
 *           description: List of role groups in the group
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       "201":
 *         description: A group schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
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
 *     summary: Retrieve all groups
 *     tags: [Groups]
 *     responses:
 *       "200":
 *         description: A list of group schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       "500":
 *         description: Internal server error
 */
router.get("/", checkAuthenticated, getAll);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a single group by id
 *     tags: [Groups]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The group ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A group schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       "404":
 *         description: Group not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", checkAuthenticated, read);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a group by id
 *     tags: [Groups]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The group ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       "200":
 *         description: A group schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       "404":
 *         description: Group not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", checkAuthenticated, update);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a group by id
 *     tags: [Groups]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The group ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Group deleted
 *       "404":
 *         description: Group not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", checkAuthenticated, remove);

export default router;
