// Import statement for the necessary package
import supplierService from "../../services/supplier/supplier.service.js";
import {
  CREATE_SUPPLIER_SUCCESS,
  GET_ALL_SUPPLIERS_SUCCESS,
} from "../../utils/constants.js";

import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

// Controller function for creating a new supplier
export const create = async (req, res) => {
  try {
    const response = await supplierService.create(req.body); // Creating a new supplier based on request body

    console.log("response", response);

    if (response.success) {
      res.status(200).json(
        generateResponseObject(true, CREATE_SUPPLIER_SUCCESS, response.data) // Sending success response with newly created supplier object
      );
    } else
      res
        .status(500)
        .json(generateResponseObject(false, response.message, response.data));
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all suppliers
export const getAll = async (req, res) => {
  try {
    const suppliers = await supplierService.getAll(); // Retrieving all the suppliers

    res.status(200).json(
      generateResponseObject(
        true,
        GET_ALL_SUPPLIERS_SUCCESS,
        suppliers // Sending success response with all the suppliers
      )
    );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all suppliers by search criteria
export const search = async (req, res) => {
  try {
    const { searchTerm } = req.query.searchTerm;
    const suppliers = await supplierService.search(searchTerm); // Retrieving all the suppliers

    res.status(200).json(
      generateResponseObject(
        true,
        GET_ALL_SUPPLIERS_SUCCESS,
        suppliers // Sending success response with all the suppliers
      )
    );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting a single supplier based on ID
export const read = async (req, res) => {
  try {
    const supplier = await supplierService.getById(req.params.id); // Retrieving supplier based on ID
    if (supplier === null) {
      // If supplier with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, GET_CUSTOMER_SUCCESS, supplier) // Sending success response with retrieved supplier object
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for updating a supplier based on ID
export const update = async (req, res) => {
  try {
    const supplier = await supplierService.updateById(req.params.id, req.body); // Updating supplier with given ID
    if (supplier === null) {
      // If supplier with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, UPDATE_CUSTOMER_SUCCESS, supplier) // Sending success response with updated supplier object
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for deleting a supplier based on ID
export const remove = async (req, res) => {
  try {
    const result = await supplierService.deleteById(req.params.id); // Deleting supplier with given ID
    if (result === false) {
      // If supplier with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res
        .status(200)
        .json(generateResponseObject(true, DELETE_CUSTOMER_SUCCESS)); // Sending success response
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};
