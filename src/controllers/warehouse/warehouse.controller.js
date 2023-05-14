// Import statement for the necessary package
import warehouseService from "../../services/warehouse/warehouse.service.js";
import {
  CREATE_WAREHOUSE_SUCCESS,
  DELETE_WAREHOUSE_SUCCESS,
  GET_ALL_WAREHOUSES_SUCCESS,
  GET_WAREHOUSE_SUCCESS,
  NOT_FOUND,
  UPDATE_WAREHOUSE_SUCCESS,
} from "../../utils/constants.js";

import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

// Controller function for creating a new warehouse
export const create = async (req, res) => {
  try {
    const response = await warehouseService.create(req.body); // Creating a new warehouse based on request body

    if (response.success) {
      res.status(200).json(
        generateResponseObject(true, CREATE_WAREHOUSE_SUCCESS, response.data) // Sending success response with newly created warehouse object
      );
    } else
      res
        .status(500)
        .json(
          generateResponseObject(false, "Warehouse with name already exists")
        );
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all warehousees
export const getAll = async (req, res) => {
  try {
    const warehouses = await warehouseService.getAll(); // Retrieving all the warehouses

    res.status(200).json(
      generateResponseObject(
        true,
        GET_ALL_WAREHOUSES_SUCCESS,
        warehouses // Sending success response with all the warehouses
      )
    );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting a single warehouse based on ID
export const read = async (req, res) => {
  try {
    const warehouse = await warehouseService.getById(req.params.id); // Retrieving warehouse based on ID
    if (warehouse === null) {
      // If warehouse with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, GET_WAREHOUSE_SUCCESS, warehouse) // Sending success response with retrieved warehouse object
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for updating a warehouse based on ID
export const update = async (req, res) => {
  try {
    const warehouse = await warehouseService.updateById(
      req.params.id,
      req.body
    ); // Updating warehouse with given ID
    if (warehouse === null) {
      // If warehouse with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, UPDATE_WAREHOUSE_SUCCESS, warehouse) // Sending success response with updated warehouse object
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for deleting a warehouse based on ID
export const remove = async (req, res) => {
  try {
    const result = await warehouseService.deleteById(req.params.id); // Deleting warehouse with given ID
    if (result === false) {
      // If warehouse with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_WAREHOUSE_SUCCESS)); // Sending success response
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};
