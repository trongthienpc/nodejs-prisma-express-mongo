import prisma from "../../lib/prisma.js";
import { CREATE_WAREHOUSE_SUCCESS } from "../../utils/constants.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import { createAliasString } from "../../utils/stringHelper.js";

// Defining CRUD operations for model warehouse
const warehouseService = {
  // Create a new warehouse

  create: async (data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    const existingWarehouse = await prisma.warehouse.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingWarehouse) {
      return generateResponseObject(false, "");
    } else {
      const newItem = await prisma.warehouse.create({
        data: { ...data, alias: alias },
      });
      return generateResponseObject(true, CREATE_WAREHOUSE_SUCCESS, newItem);
    }
  },

  // Get all warehouses
  getAll: async () => {
    return await prisma.warehouse.findMany();
  },

  // Get a single warehouse by id
  getById: async (id) => {
    return await prisma.warehouse.findUnique({
      where: {
        id,
      },
    });
  },

  // Update a warehouse by id
  updateById: async (id, data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    return await prisma.warehouse.update({
      where: {
        id,
      },
      data: { ...data, alias: alias },
    });
  },

  // Delete a warehouse by id
  deleteById: async (id) => {
    return await prisma.warehouse.delete({
      where: {
        id,
      },
    });
  },
};

export default warehouseService;
