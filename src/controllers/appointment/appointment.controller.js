import {
  CREATE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_SUCCESS,
  GET_ALL_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_SUCCESS,
} from "../../utils/constants.js";
import crud from "../../utils/crud.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

const appointmentController = {
  createItem: async (req, res) => {
    try {
      console.log("create appointment");
      const appointment = await crud.create("appointment", req.body);
      res
        .status(200)
        .json(
          generateResponseObject(true, CREATE_APPOINTMENT_SUCCESS, appointment)
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const appointment = await crud.findAll("appointment");
      res
        .status(200)
        .json(
          generateResponseObject(
            true,
            GET_ALL_APPOINTMENTS_SUCCESS,
            appointment
          )
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointment = await crud.findById("appointment", id);
      if (appointment) {
        res
          .status(200)
          .json(
            generateResponseObject(true, GET_APPOINTMENT_SUCCESS, appointment)
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
      const appointment = await crud.updateById("appointment", id, req.body);
      res
        .status(200)
        .json(
          generateResponseObject(true, UPDATE_APPOINTMENT_SUCCESS, appointment)
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointment = await crud.deleteById("appointment", id);
      console.log("appointment", appointment);
      res
        .status(200)
        .json(
          generateResponseObject(true, DELETE_APPOINTMENT_SUCCESS, appointment)
        );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default appointmentController;
