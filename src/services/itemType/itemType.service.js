// Defining CRUD operations for model itemType
import prisma from "../../lib/prisma.js";

const itemTypeService = {
  // Create a new itemType
  create: async (data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    const existingCustomer = await prisma.itemType.findMany({
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
      const newItem = await prisma.itemType.create({
        data: { ...data, alias: alias },
      });
      return generateResponseObject(true, CREATE_CUSTOMER_SUCCESS, newItem);
    }
  },

  // Get all itemTypes
  getAll: async () => {
    return await prisma.itemType.findMany();
  },

  // Get a single itemType by id
  getById: async (id) => {
    return await prisma.itemType.findUnique({
      where: {
        id,
      },
    });
  },

  // Update a itemType by id
  updateById: async (id, data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    return await prisma.itemType.update({
      where: {
        id,
      },
      data: { ...data, alias: alias },
    });
  },

  // Delete a itemType by id
  deleteById: async (id) => {
    return await prisma.itemType.delete({
      where: {
        id,
      },
    });
  },

  // Find a itemType by phone
  findByPhone: async (phone) => {
    return await prisma.itemType.findUnique({
      where: {
        phone,
      },
    });
  },

  // Find a itemType by alias or name or description
  search: async (searchTerm) => {
    return await prisma.itemType.findMany({
      where: {
        OR: [
          { alias: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  },

  // Find a itemType by name
  checkExist: async (name) => {
    const data = await prisma.itemType.findMany({
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

export default itemTypeService;
