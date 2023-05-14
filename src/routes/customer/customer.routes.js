import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  update,
  read,
  remove,
} from "../../controllers/customer/customer.controller.js";
import { checkAuthenticated } from "../../services/jwt.service.js";
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API for managing customers.
 *
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the customer
 *         name:
 *           type: string
 *           description: Name of the customer
 *         createdAt:
 *           type: Date
 *           description: Date and time of customer creation
 *         updatedAt:
 *           type: Date
 *           description: Date and time of customer update
 *         email:
 *           type: string
 *           description: Email address of customer
 *         phone:
 *           type: string
 *           description: Phone number of customer
 *         alias:
 *           type: string
 *           description: Name of the customer as alias
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       "201":
 *         description: A customer schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
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
 *     summary: Retrieve all customers
 *     tags: [Customers]
 *     responses:
 *       "200":
 *         description: A list of customer schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       "500":
 *         description: Internal server error
 */
router.get("/", checkAuthenticated, getAll);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a single customer by id
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A customer schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       "404":
 *         description: Customer not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", checkAuthenticated, read);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for customers
 *     tags: [Customers]
 *     responses:
 *       "200":
 *         description: A list of customer schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       "500":
 *         description: Internal server error
 */
router.get("/search", checkAuthenticated, read);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a customer by id
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The customer ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       "200":
 *         description: A customer schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       "404":
 *         description: Customer not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", checkAuthenticated, update);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a customer by id
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The customer ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Customer deleted
 *       "404":
 *         description: Customer not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", checkAuthenticated, remove);

export default router;
