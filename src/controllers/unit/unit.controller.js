import { GET_ALL_UNITS_SUCCESS } from "../../utils/constants.js";
import { GET_UNIT_SUCCESS } from "../../utils/constants.js";
import { DELETE_UNIT_SUCCESS } from "../../utils/constants.js";
import { UPDATE_UNIT_SUCCESS } from "../../utils/constants.js";
import { CREATE_UNIT_SUCCESS } from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

const unitController = {
  createItem: async (req, res) => {
    try {
      const item = await crud.create("unit", req.body);
      res
        .status(200)
        .json(generateResponseObject(true, CREATE_UNIT_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const items = await crud.findAll("unit");
      res
        .status(200)
        .json(generateResponseObject(true, GET_ALL_UNITS_SUCCESS, items));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.findById("unit", id);
      if (item) {
        res
          .status(200)
          .json(generateResponseObject(true, GET_UNIT_SUCCESS, item));
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
      const item = await crud.updateById("unit", id, req.body);
      console.log("item", item);
      res
        .status(200)
        .json(generateResponseObject(true, UPDATE_UNIT_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.deleteById("unit", id);
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_UNIT_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default unitController;
