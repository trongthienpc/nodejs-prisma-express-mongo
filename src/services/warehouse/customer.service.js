import prisma from "../../lib/prisma.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import { createAliasString } from "../../utils/stringHelper.js";

// Defining CRUD operations for model customer
const customerService = {
  // Create a new customer

  create: async (data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingCustomer) {
      return generateResponseObject(false, "");
    } else {
      const newItem = await prisma.customer.create({
        data: { ...data, alias: alias },
      });
      return generateResponseObject(true, CREATE_WAREHOUSE_SUCCESS, newItem);
    }
  },

  // Get all customers
  getAll: async () => {
    return await prisma.customer.findMany();
  },

  // Get a single customer by id
  getById: async (id) => {
    return await prisma.customer.findUnique({
      where: {
        id,
      },
    });
  },

  // Update a customer by id
  updateById: async (id, data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    return await prisma.customer.update({
      where: {
        id,
      },
      data: { ...data, alias: alias },
    });
  },

  // Delete a customer by id
  deleteById: async (id) => {
    return await prisma.customer.delete({
      where: {
        id,
      },
    });
  },
};

export default customerService;
