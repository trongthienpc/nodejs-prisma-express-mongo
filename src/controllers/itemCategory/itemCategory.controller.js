import {
  CREATE_ITEM_CATEGORY_SUCCESS,
  DELETE_ITEM_CATEGORY_SUCCESS,
  GET_ALL_ITEM_CATEGORY_SUCCESS,
  GET_ITEM_CATEGORY_SUCCESS,
  UPDATE_ITEM_CATEGORY_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import itemCategoryService from "../../services/itemCategory/itemCategory.service.js";
const itemCategoryController = {
  createItem: async (req, res) => {
    try {
      const { name } = req.body;
      const isExist = await itemCategoryService.checkExist(name);
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "Item category already exists!"));
      }

      const itemCategory = await crud.create("itemCategory", req.body);
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            CREATE_ITEM_CATEGORY_SUCCESS,
            itemCategory
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const itemCategories = await crud.findAll("itemCategory");
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            GET_ALL_ITEM_CATEGORY_SUCCESS,
            itemCategories
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const itemCategory = await crud.findById("itemCategory", id);
      if (itemCategory) {
        res
          .status(200)
          .json(
            generateResponseObject(
              true,
              GET_ITEM_CATEGORY_SUCCESS,
              itemCategory
            )
          );
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
      const { name } = req.body;
      const isExist = await itemCategoryService.checkExist(name);
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "Item category already exists!"));
      }
      const itemCategory = await crud.updateById("itemCategory", id, req.body);
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            UPDATE_ITEM_CATEGORY_SUCCESS,
            itemCategory
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const itemCategory = await crud.deleteById("itemCategory", id);
      console.log("itemCategory", itemCategory);
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            DELETE_ITEM_CATEGORY_SUCCESS,
            itemCategory
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default itemCategoryController;
