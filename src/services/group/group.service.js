 
import prisma from "../../lib/prisma.js";

// Defining CRUD operations for model group
const groupService = {
  // Create a new group
  create: async (data) => {
    return await prisma.group.create({
      data,
    });
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

