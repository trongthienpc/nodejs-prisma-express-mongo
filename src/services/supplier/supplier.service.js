import prisma from "../../lib/prisma.js";
import { generateResponseObject } from "../../utils/patterns/response-pattern.js";
import { createAliasString } from "../../utils/stringHelper.js";
import { CREATE_SUPPLIER_SUCCESS } from "../../utils/constants.js";

// Defining CRUD operations for model supplier
const supplierService = {
  // Create a new supplier
  create: async (data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    const existingSupplier = await prisma.supplier.findMany({
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

    if (existingSupplier.length > 0) {
      return generateResponseObject(
        false,
        "Email or phone is already registered",
        existingSupplier
      );
    } else {
      const newItem = await prisma.supplier.create({
        data: { ...data, alias: alias },
      });
      return generateResponseObject(true, CREATE_SUPPLIER_SUCCESS, newItem);
    }
  },

  // Get all suppliers
  getAll: async () => {
    return await prisma.supplier.findMany();
  },

  // Get a single supplier by id
  getById: async (id) => {
    return await prisma.supplier.findUnique({
      where: {
        id,
      },
    });
  },

  // Update a supplier by id
  updateById: async (id, data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    return await prisma.supplier.update({
      where: {
        id,
      },
      data: { ...data, alias: alias },
    });
  },

  // Delete a supplier by id
  deleteById: async (id) => {
    return await prisma.supplier.delete({
      where: {
        id,
      },
    });
  },

  // Find a supplier by phone
  findByPhone: async (phone) => {
    return await prisma.supplier.findUnique({
      where: {
        phone,
      },
    });
  },

  // Find a supplier by phone or name or email
  search: async (searchTerm) => {
    return await prisma.supplier.findMany({
      where: {
        OR: [
          { phone: { contains: searchTerm } },
          { name: { contains: searchTerm } },
          { email: { contains: searchTerm } },
        ],
      },
    });
  },
};

export default supplierService;
