// utils/crud.js

// Import PrismaClient instance and create a new instance
import prisma from "../lib/prisma.js";
// Common CRUD function for all models
const crud = {
  create: async (model, data) => {
    try {
      const createdItem = await prisma[model].create({ data });
      return createdItem;
    } catch (error) {
      throw new Error(`Failed to create ${model}: ${error.message}`);
    }
  },

  findAll: async (model) => {
    try {
      const items = await prisma[model].findMany();
      return items;
    } catch (error) {
      throw new Error(`Failed to fetch ${model}s: ${error.message}`);
    }
  },

  findById: async (model, id) => {
    try {
      const item = await prisma[model].findUnique({ where: { id } });
      return item;
    } catch (error) {
      throw new Error(`Failed to find ${model} by ID: ${error.message}`);
    }
  },

  updateById: async (model, id, data) => {
    try {
      const updatedItem = await prisma[model].update({
        where: { id },
        data,
      });
      return updatedItem;
    } catch (error) {
      throw new Error(`Failed to update ${model} by ID: ${error.message}`);
    }
  },

  deleteById: async (model, id) => {
    try {
      const deletedItem = await prisma[model].delete({ where: { id } });
      return deletedItem;
    } catch (error) {
      throw new Error(`Failed to delete ${model} by ID: ${error.message}`);
    }
  },
};

module.exports = crud;
