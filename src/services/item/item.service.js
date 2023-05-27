// Defining CRUD operations for model item
import prisma from "../../lib/prisma.js";

const itemService = {
  // Find a item by alias or name or description
  search: async (searchTerm) => {
    return await prisma.item.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a item by name
  checkExist: async ({ name, itemTypeId }) => {
    const data = await prisma.item.findMany({
      where: {
        name: name,
        itemTypeId: itemTypeId,
      },
    });

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  },
};

export default itemService;
