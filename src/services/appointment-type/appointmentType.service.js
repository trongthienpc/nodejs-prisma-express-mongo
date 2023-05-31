// Defining CRUD operations for model appointmentType
import prisma from "../../lib/prisma.js";

const appointmentTypeService = {
  // Find a appointmentType by alias or name or description
  search: async (searchTerm) => {
    return await prisma.appointmentType.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a appointmentType by name
  checkExist: async ({ name }) => {
    const data = await prisma.appointmentType.findMany({
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

export default appointmentTypeService;
