// Defining CRUD operations for model branch
import prisma from "../../lib/prisma.js";

const branchService = {
  // Find a branch by alias or name or description
  search: async (searchTerm) => {
    return await prisma.branch.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a branch by name
  checkExist: async (name) => {
    const data = await prisma.branch.findMany({
      where: {
        name: name,
      },
    });

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  },
};

export default branchService;
