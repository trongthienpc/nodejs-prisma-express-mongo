import {
  CREATE_ITEM_TYPE_SUCCESS,
  DELETE_ITEM_TYPE_SUCCESS,
  GET_ALL_ITEM_TYPES_SUCCESS,
  GET_ITEM_TYPE_SUCCESS,
  UPDATE_ITEM_TYPE_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import itemTypeService from "../../services/itemType/itemType.service.js";

const itemTypeController = {
  createItem: async (req, res) => {
    try {
      const isExist = await itemTypeService.checkExist(req?.body?.name);
      if (isExist) {
        return res
          .status(500)
          .json(
            generateResponseObject(false, "Item type name already exists!")
          );
      }

      const item = await crud.create("itemType", req.body);
      res
        .status(200)
        .json(generateResponseObject(true, CREATE_ITEM_TYPE_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const items = await crud.findAll("itemType");
      res
        .status(200)
        .json(generateResponseObject(true, GET_ALL_ITEM_TYPES_SUCCESS, items));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.findById("itemType", id);
      if (item) {
        res
          .status(200)
          .json(generateResponseObject(true, GET_ITEM_TYPE_SUCCESS, item));
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
      const isExist = await itemTypeService.checkExist(req?.body?.name);
      if (isExist) {
        return res
          .status(500)
          .json(
            generateResponseObject(false, "Item type name already exists!")
          );
      }
      const item = await crud.updateById("itemType", id, req.body);
      res
        .status(200)
        .json(generateResponseObject(true, UPDATE_ITEM_TYPE_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await crud.deleteById("itemType", id);
      console.log("item", item);
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_ITEM_TYPE_SUCCESS, item));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default itemTypeController;
