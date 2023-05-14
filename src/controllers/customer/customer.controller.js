// Import statement for the necessary package
import customerService from "../../services/customer/customer.service.js";
import {
  CREATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_SUCCESS,
  GET_ALL_CUSTOMERS_FAILURE,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_CUSTOMER_SUCCESS,
  NOT_FOUND,
  UPDATE_CUSTOMER_SUCCESS,
} from "../../utils/constants.js";

import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

// Controller function for creating a new customer
export const create = async (req, res) => {
  try {
    const response = await customerService.create(req.body); // Creating a new customer based on request body

    if (response.success) {
      res.status(200).json(
        generateResponseObject(true, CREATE_CUSTOMER_SUCCESS, response.data) // Sending success response with newly created customer object
      );
    } else
      res
        .status(500)
        .json(generateResponseObject(false, res.message, res.data));
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all customers
export const getAll = async (req, res) => {
  try {
    const customers = await customerService.getAll(); // Retrieving all the customers

    res.status(200).json(
      generateResponseObject(
        true,
        GET_ALL_CUSTOMERS_SUCCESS,
        customers // Sending success response with all the customers
      )
    );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting all customers by search criteria
export const search = async (req, res) => {
  try {
    const { searchTerm } = req.query.searchTerm;
    const customers = await customerService.search(searchTerm); // Retrieving all the customers

    res.status(200).json(
      generateResponseObject(
        true,
        GET_ALL_CUSTOMERS_SUCCESS,
        customers // Sending success response with all the customers
      )
    );
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for getting a single customer based on ID
export const read = async (req, res) => {
  try {
    const customer = await customerService.getById(req.params.id); // Retrieving customer based on ID
    if (customer === null) {
      // If customer with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, GET_CUSTOMER_SUCCESS, customer) // Sending success response with retrieved customer object
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for updating a customer based on ID
export const update = async (req, res) => {
  try {
    const customer = await customerService.updateById(req.params.id, req.body); // Updating customer with given ID
    if (customer === null) {
      // If customer with given ID not found
      res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
    } else {
      res.status(200).json(
        generateResponseObject(true, UPDATE_CUSTOMER_SUCCESS, customer) // Sending success response with updated customer object
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Sending error response
  }
};

// Controller function for deleting a customer based on ID
export const remove = async (req, res) => {
  try {
    const result = await customerService.deleteById(req.params.id); // Deleting customer with given ID
    if (result === false) {
      // If customer with given ID not found
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
