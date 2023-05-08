// Import statement for the necessary package
import {
  createBranch,
  deleteBranch,
  getAllBranches,
  getBranch,
  updateBranch,
} from "../services/branch.service";
import {
  CREATE_BRANCH_SUCCESS,
  DELETE_BRANCH_SUCCESS,
  GET_ALL_BRANCHES_SUCCESS,
  GET_BRANCH_FAILURE,
  GET_BRANCH_SUCCESS,
  UPDATE_BRANCH_SUCCESS,
} from "../utils/constants";
import { generateResponseObject } from "../utils/patterns/response-pattern";

// Controller function for creating a new branch
export const create = async (req, res) => {
  try {
    const branch = await createBranch(req.body); // Creating a new branch based on request body
    res.status(200).json(
      generateResponseObject(true, CREATE_BRANCH_SUCCESS, branch) // Sending success response with newly created branch object
    );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all branches
export const getAll = async (req, res) => {
  try {
    const branches = await getAllBranches(); // Retrieving all the branches
    res.status(200).json(
      generateResponseObject(
        true,
        GET_ALL_BRANCHES_SUCCESS,
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
    if (branch === null) {
      // If branch with given ID not found
      res.status(404).json(generateResponseObject(false, GET_BRANCH_FAILURE)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, GET_BRANCH_SUCCESS, branch) // Sending success response with retrieved branch object
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
    if (branch === null) {
      // If branch with given ID not found
      res.status(404).json(generateResponseObject(false, GET_BRANCH_FAILURE)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, UPDATE_BRANCH_SUCCESS, branch) // Sending success response with updated branch object
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
    if (result === false) {
      // If branch with given ID not found
      res.status(404).json(generateResponseObject(false, GET_BRANCH_FAILURE)); // Send 404 error response
    } else {
      res.status(200).json(generateResponseObject(true, DELETE_BRANCH_SUCCESS)); // Sending success response
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};
