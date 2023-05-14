import prisma from "../../lib/prisma.js";
import { CREATE_GROUP_SUCCESS } from "../../utils/constants.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";

// Defining CRUD operations for model group
const groupService = {
  // Create a new group

  create: async (data) => {
    const existingGroup = await prisma.group.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingGroup) {
      return generateResponseObject(false, "");
    } else {
      const newItem = await prisma.group.create({
        data,
      });
      return generateResponseObject(true, CREATE_GROUP_SUCCESS, newItem);
    }
  },

  // Get all groups
  getAll: async () => {
    return await prisma.group.findMany();
  },

  // Get a single group by id
  getById: async (id) => {
    return await prisma.group.findUnique({
      where: {
        id,
      },
    });
  },

  // Update a group by id
  updateById: async (id, data) => {
    return await prisma.group.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete a group by id
  deleteById: async (id) => {
    return await prisma.group.delete({
      where: {
        id,
      },
    });
  },
};

export default groupService;
