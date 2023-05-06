import express from "express";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: API for managing branches.
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       "201":
 *         description: A branch schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       "400":
 *         description: Bad request
 *       "500":
 *         description: Internal server error
 */
router.post("/", branchController.createBranch);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       "200":
 *         description: A list of branch schema objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       "500":
 *         description: Internal server error
 */
router.get("/", branchController.getAllBranches);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a single branch by id
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The branch ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: A branch schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       "404":
 *         description: Branch not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", branchController.getBranchById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a branch by id
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The branch ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       "200":
 *         description: A branch schema object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       "404":
 *         description: Branch not found
 *       "500":
 *         description: Internal server error
 */
router.put("/:id", branchController.updateBranchById);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a branch by id
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The branch ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Branch deleted
 *       "404":
 *         description: Branch not found
 *       "500":
 *         description: Internal server error
 */
router.delete("/:id", branchController.deleteBranchById);

export default router;
