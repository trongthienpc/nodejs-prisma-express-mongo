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
  NOT_FOUND,
  OK,
  SERVER_ERROR,
  UPDATE_BRANCH_SUCCESS,
} from "../utils/constants";
import { generateResponseObject } from "../utils/patterns/response-pattern";

export const create = async (req, res) => {
  try {
    const branch = await createBranch(req.body);
    res
      .status(OK)
      .json(generateResponseObject(true, CREATE_BRANCH_SUCCESS, branch));
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const branches = await getAllBranches();
    res
      .status(OK)
      .json(generateResponseObject(true, GET_ALL_BRANCHES_SUCCESS, branches));
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    const branch = await getBranch(req.params.id);
    if (branch === null) {
      res
        .status(NOT_FOUND)
        .json(generateResponseObject(false, GET_BRANCH_FAILURE));
    } else {
      res
        .status(OK)
        .json(generateResponseObject(true, GET_BRANCH_SUCCESS, branch));
    }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const branch = await updateBranch(req.params.id, req.body);
    if (branch === null) {
      res
        .status(NOT_FOUND)
        .json(generateResponseObject(false, GET_BRANCH_FAILURE));
    } else {
      res
        .status(OK)
        .json(generateResponseObject(true, UPDATE_BRANCH_SUCCESS, branch));
    }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteBranch(req.params.id);
    if (result === false) {
      res
        .status(NOT_FOUND)
        .json(generateResponseObject(false, GET_BRANCH_FAILURE));
    } else {
      res.status(OK).json(generateResponseObject(true, DELETE_BRANCH_SUCCESS));
    }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};
