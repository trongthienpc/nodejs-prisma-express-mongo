import {
  CREATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  GET_ALL_ITEM_SUCCESS,
  GET_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import itemService from "../../services/item/item.service.js";

const itemController = {
  createItem: async (req, res) => {
    try {
      const { name, itemTypeId } = req.body;
      const isExist = await itemService.checkExist({ name, itemTypeId });
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "Item already exists!"));
      }

      const item = await crud.create("item", req.body);
      res
        .status(200)
        .json(generateResponseObject(true, CREATE_ITEM_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const items = await crud.findAll("item");
      res
        .status(200)
        .json(generateResponseObject(true, GET_ALL_ITEM_SUCCESS, items));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.findById("item", id);
      if (item) {
        res
          .status(200)
          .json(generateResponseObject(true, GET_ITEM_SUCCESS, item));
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
      const { name, itemTypeId } = req.body;
      const isExist = await itemService.checkExist({ name, itemTypeId });
      if (isExist) {
        return res
          .status(500)
          .json(
            generateResponseObject(false, "Item type name already exists!")
          );
      }
      const item = await crud.updateById("item", id, req.body);
      res
        .status(200)
        .json(generateResponseObject(true, UPDATE_ITEM_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.deleteById("item", id);
      console.log("item", item);
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_ITEM_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default itemController;
