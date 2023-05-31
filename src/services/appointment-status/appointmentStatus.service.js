// Defining CRUD operations for model appointmentStatus
import prisma from "../../lib/prisma.js";

const appointmentStatusService = {
  // Find a appointmentStatus by alias or name or description
  search: async (searchTerm) => {
    return await prisma.appointmentStatus.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a appointmentStatus by name
  checkExist: async ({ name }) => {
    const data = await prisma.appointmentStatus.findMany({
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

export default appointmentStatusService;
