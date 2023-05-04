import express from "express";
const router = express.Router();

// Create a new branch
router.post("/", branchController.createBranch);

// Retrieve all branches
router.get("/", branchController.getAllBranches);

// Retrieve a single branch by id
router.get("/:id", branchController.getBranchById);

// Update a branch by id
router.put("/:id", branchController.updateBranchById);

// Delete a branch by id
router.delete("/:id", branchController.deleteBranchById);

export default router;
