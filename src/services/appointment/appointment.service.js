// Defining CRUD operations for model appointment
import prisma from "../../lib/prisma.js";

const appointmentService = {
  // Find a appointment by alias or name or description
  search: async (searchTerm) => {
    return await prisma.appointment.findMany({
      where: {
        OR: [
          { customerId: { contains: searchTerm } },
          { requestedStaffId: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },
};

export default appointmentService;
