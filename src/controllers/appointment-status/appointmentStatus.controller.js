import {
  CREATE_APPOINTMENT_STATUS_SUCCESS,
  DELETE_APPOINTMENT_STATUS_SUCCESS,
  GET_ALL_APPOINTMENT_STATUSES_SUCCESS,
  GET_APPOINTMENT_STATUS_SUCCESS,
  UPDATE_APPOINTMENT_STATUS_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import appointmentStatusService from "../../services/appointment-status/appointmentStatus.service.js";

const appointmentStatusController = {
  createItem: async (req, res) => {
    try {
      const { name } = req.body;
      const isExist = await appointmentStatusService.checkExist({
        name,
      });
      if (isExist) {
        return res
          .status(500)
          .json(generateResponseObject(false, "Item already exists!"));
      }

      const appointmentStatus = await crud.create(
        "appointmentStatus",
        req.body
      );
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            CREATE_APPOINTMENT_STATUS_SUCCESS,
            appointmentStatus
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const appointmentStatus = await crud.findAll("appointmentStatus");
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            GET_ALL_APPOINTMENT_STATUSES_SUCCESS,
            appointmentStatus
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointmentStatus = await crud.findById("appointmentStatus", id);
      if (appointmentStatus) {
        res
          .status(200)
          .json(
            generateResponseObject(
              true,
              GET_APPOINTMENT_STATUS_SUCCESS,
              appointmentStatus
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
      const isExist = await appointmentStatusService.checkExist({
        name,
      });
      if (isExist) {
        return res
          .status(500)
          .json(
            generateResponseObject(false, "Item type name already exists!")
          );
      }
      const appointmentStatus = await crud.updateById(
        "appointmentStatus",
        id,
        req.body
      );
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            UPDATE_APPOINTMENT_STATUS_SUCCESS,
            appointmentStatus
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointmentStatus = await crud.deleteById("appointmentStatus", id);
      console.log("appointmentStatus", appointmentStatus);
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            DELETE_APPOINTMENT_STATUS_SUCCESS,
            appointmentStatus
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default appointmentStatusController;
