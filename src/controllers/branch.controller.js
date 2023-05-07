// Import statement for the necessary package
import { generateResponseObject } from "../utils/patterns/response-pattern";

// Controller function for creating a new branch
export const create = async (req, res) => {
  try {
    const branch = await createBranch(req.body); // Creating a new branch based on request body
    res
      .status(200)
      .json(
        generateResponseObject(true, "Branch created successfully", branch) // Sending success response with newly created branch object
      );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all branches
export const getAll = async (req, res) => {
  try {
    const branches = await getAllBranches(); // Retrieving all the branches
    res
      .status(200)
      .json(
        generateResponseObject(
          true,
          "All branches retrieved successfully",
          branches // Sending success response with all the branches
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting a single branch based on ID
export const read = async (req, res) => {
  try {
    const branch = await getBranch(req.params.id); // Retrieving branch based on ID
    if (branch === null) { // If branch with given ID not found
      res.status(404).json(generateResponseObject(false, "Branch not found")); // Send 404 error response
    } else {
      res
        .status(200)
        .json(
          generateResponseObject(true, "Branch retrieved successfully", branch) // Sending success response with retrieved branch object
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for updating a branch based on ID
export const update = async (req, res) => {
  try {
    const branch = await updateBranch(req.params.id, req.body); // Updating branch with given ID
    if (branch === null) { // If branch with given ID not found
      res.status(404).json(generateResponseObject(false, "Branch not found")); // Send 404 error response
    } else {
      res
        .status(200)
        .json(
          generateResponseObject(true, "Branch updated successfully", branch) // Sending success response with updated branch object
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for deleting a branch based on ID
export const remove = async (req, res) => {
  try {
    const result = await deleteBranch(req.params.id); // Deleting branch with given ID
    if (result === false) { // If branch with given ID not found
      res.status(404).json(generateResponseObject(false, "Branch not found")); // Send 404 error response
    } else {
      res
        .status(200)
        .json(generateResponseObject(true, "Branch deleted successfully")); // Sending success response
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};
