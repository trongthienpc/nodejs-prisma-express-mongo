// Defining CRUD operations for model configuration
import prisma from "../../lib/prisma.js";

const configurationService = {
  // Create a new configuration
  create: async (data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    const existingCustomer = await prisma.configuration.findMany({
      where: {
        OR: [
          {
            phone: data.phone,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    if (existingCustomer.length > 0) {
      return generateResponseObject(
        false,
        "Email or phone is already registered",
        existingCustomer
      );
    } else {
      const newItem = await prisma.configuration.create({
        data: { ...data, alias: alias },
      });
      return generateResponseObject(true, CREATE_CUSTOMER_SUCCESS, newItem);
    }
  },

  // Get all configurations
  getAll: async () => {
    return await prisma.configuration.findMany();
  },

  // Get a single configuration by id
  getById: async (id) => {
    return await prisma.configuration.findUnique({
      where: {
        id,
      },
    });
  },

  // Update a configuration by id
  updateById: async (id, data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    return await prisma.configuration.update({
      where: {
        id,
      },
      data: { ...data, alias: alias },
    });
  },

  // Delete a configuration by id
  deleteById: async (id) => {
    return await prisma.configuration.delete({
      where: {
        id,
      },
    });
  },

  // Find a configuration by phone
  findByPhone: async (phone) => {
    return await prisma.configuration.findUnique({
      where: {
        phone,
      },
    });
  },

  // Find a configuration by alias or name or description
  search: async (searchTerm) => {
    return await prisma.configuration.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a configuration by name
  checkExist: async ({ name, model }) => {
    const data = await prisma.configuration.findMany({
      where: {
        name: name,
        model: model,
      },
    });

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  },
};

export default configurationService;
