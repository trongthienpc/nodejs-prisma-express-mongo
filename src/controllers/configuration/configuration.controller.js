import {
  CREATE_CONFIGURATION_SUCCESS,
  DELETE_BRANCH_SUCCESS,
  GET_ALL_CONFIGURATIONS_SUCCESS,
  GET_CONFIGURATION_SUCCESS,
  UPDATE_CONFIGURATION_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

const configurationController = {
  createItem: async (req, res) => {
    try {
      const item = await crud.create("configuration", req.body);
      res
        .status(200)
        .json(generateResponseObject(true, CREATE_CONFIGURATION_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const items = await crud.findAll("configuration");
      res
        .status(200)
        .json(
          generateResponseObject(true, GET_ALL_CONFIGURATIONS_SUCCESS, items)
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.findById("configuration", id);
      if (item) {
        res
          .status(200)
          .json(generateResponseObject(true, GET_CONFIGURATION_SUCCESS, item));
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
      const item = await crud.updateById("configuration", id, req.body);
      console.log("item", item);
      res
        .status(200)
        .json(generateResponseObject(true, UPDATE_CONFIGURATION_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.deleteById("configuration", id);
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_BRANCH_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default configurationController;
