import {
  CREATE_BRANCH_SUCCESS,
  DELETE_BRANCH_SUCCESS,
  GET_ALL_BRANCHES_SUCCESS,
  GET_BRANCH_SUCCESS,
  UPDATE_BRANCH_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import branchService from "./../../services/branch/branch.service.js";

const branchController = {
  createItem: async (req, res) => {
    try {
      const isExist = await branchService.checkExist(req?.body?.name);
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "Branch already exists!"));
      }

      const item = await crud.create("branch", req.body);
      res
        .status(200)
        .json(generateResponseObject(true, CREATE_BRANCH_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const items = await crud.findAll("branch");
      res
        .status(200)
        .json(generateResponseObject(true, GET_ALL_BRANCHES_SUCCESS, items));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.findById("branch", id);
      if (item) {
        res
          .status(200)
          .json(generateResponseObject(true, GET_BRANCH_SUCCESS, item));
      } else {
        res.status(404).json(generateResponseObject(false, "Item not found"));
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const isExist = await branchService.checkExist(req?.body?.name);
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "branch name already exists!"));
      }
      const item = await crud.updateById("branch", id, req.body);
      res
        .status(200)
        .json(generateResponseObject(true, UPDATE_BRANCH_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.deleteById("branch", id);
      console.log("item", item);
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_BRANCH_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default branchController;
