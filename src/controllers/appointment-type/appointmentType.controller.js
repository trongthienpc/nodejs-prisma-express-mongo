import {
  CREATE_APPOINTMENT_TYPE_SUCCESS,
  DELETE_APPOINTMENT_TYPE_SUCCESS,
  GET_ALL_APPOINTMENT_TYPES_SUCCESS,
  GET_APPOINTMENT_TYPE_SUCCESS,
  UPDATE_APPOINTMENT_TYPE_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import appointmentTypeService from "../../services/appointment-type/appointmentType.service.js";

const appointmentTypeController = {
  createItem: async (req, res) => {
    try {
      const { name } = req.body;
      const isExist = await appointmentTypeService.checkExist({
        name,
      });
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "Item already exists!"));
      }

      const appointmentType = await crud.create("appointmentType", req.body);
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            CREATE_APPOINTMENT_TYPE_SUCCESS,
            appointmentType
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const appointmentTypes = await crud.findAll("appointmentType");
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            GET_ALL_APPOINTMENT_TYPES_SUCCESS,
            appointmentTypes
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointmentType = await crud.findById("appointmentType", id);
      if (appointmentType) {
        res
          .status(200)
          .json(
            generateResponseObject(
              true,
              GET_APPOINTMENT_TYPE_SUCCESS,
              appointmentType
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
      const isExist = await appointmentTypeService.checkExist({
        name,
      });
      if (isExist) {
        return res
          .status(500)
          .json(
            generateResponseObject(false, "Item type name already exists!")
          );
      }
      const appointmentType = await crud.updateById(
        "appointmentType",
        id,
        req.body
      );
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            UPDATE_APPOINTMENT_TYPE_SUCCESS,
            appointmentType
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointmentType = await crud.deleteById("appointmentType", id);
      console.log("appointmentType", appointmentType);
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            DELETE_APPOINTMENT_TYPE_SUCCESS,
            appointmentType
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default appointmentTypeController;
