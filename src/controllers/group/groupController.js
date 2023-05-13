// Import statement for the necessary package
import groupService from "../../services/group/group.service";
import { CREATE_GROUP_SUCCESS, DELETE_GROUP_SUCCESS, GET_ALL_GROUPS_SUCCESS, GET_GROUP_FAILURE, GET_GROUP_SUCCESS, NOT_FOUND, UPDATE_GROUP_FAILURE, UPDATE_GROUP_SUCCESS } from "../../utils/constants";

  import { generateResponseObject } from "../utils/patterns/response-pattern";
  
  // Controller function for creating a new group
  export const create = async (req, res) => {
    try {
      const group = await groupService.create(req.body); // Creating a new group based on request body
      res.status(200).json(
        generateResponseObject(true, CREATE_GROUP_SUCCESS, group) // Sending success response with newly created group object
      );
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sending error response
    }
  };
  
  // Controller function for getting all groupes
  export const getAll = async (req, res) => {
    try {
      const groups = await groupService.getAll(); // Retrieving all the groups
      res.status(200).json(
        generateResponseObject(
          true,
          GET_ALL_GROUPS_SUCCESS,
          groups // Sending success response with all the groups
        )
      );
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sending error response
    }
  };
  
  // Controller function for getting a single group based on ID
  export const read = async (req, res) => {
    try {
      const group = await groupService.getById(req.params.id); // Retrieving group based on ID
      if (group === null) {
        // If group with given ID not found
        res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
      } else {
        res.status(200).json(
          generateResponseObject(true, GET_GROUP_SUCCESS, group) // Sending success response with retrieved group object
        );
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sending error response
    }
  };
  
  // Controller function for updating a group based on ID
  export const update = async (req, res) => {
    try {
      const group = await groupService.updateById(req.params.id, req.body); // Updating group with given ID
      if (group === null) {
        // If group with given ID not found
        res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
      } else {
        res.status(200).json(
          generateResponseObject(true, UPDATE_GROUP_SUCCESS, group) // Sending success response with updated group object
        );
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sending error response
    }
  };
  
  // Controller function for deleting a group based on ID
  export const remove = async (req, res) => {
    try {
      const result = await groupService.deleteById(req.params.id); // Deleting group with given ID
      if (result === false) {
        // If group with given ID not found
        res.status(404).json(generateResponseObject(false, NOT_FOUND)); // Send 404 error response
      } else {
        res.status(200).json(generateResponseObject(true, DELETE_GROUP_SUCCESS)); // Sending success response
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sending error response
    }
  };
  