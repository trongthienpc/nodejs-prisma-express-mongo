import express from "express";
import { checkAuthenticated } from "../services/jwt.service.js";
import {
  create,
  getAll,
  read,
  remove,
  update,
} from "../controllers/branch.controller.js";
const router = express.Router();

// Create a new branch
router.post("/", checkAuthenticated, create);

// Retrieve all branches
router.get("/", checkAuthenticated, getAll);

// Retrieve a single branch by id
router.get("/:id", checkAuthenticated, read);

// Update a branch by id
router.put("/:id", checkAuthenticated, update);

// Delete a branch by id
router.delete("/:id", checkAuthenticated, remove);

export default router;
