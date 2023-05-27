// Defining CRUD operations for model itemCategory
import prisma from "../../lib/prisma.js";

const itemCategoryService = {
  // Find a itemCategory by alias or name or description
  search: async (searchTerm) => {
    return await prisma.itemCategory.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a itemCategory by name
  checkExist: async (name) => {
    const data = await prisma.itemCategory.findMany({
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

export default itemCategoryService;
