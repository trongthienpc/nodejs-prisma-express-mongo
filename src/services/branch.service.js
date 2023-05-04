import prisma from "../lib/prisma.js";

export const getAllBranches = async () => {
  const branches = await prisma.branch.findMany();
  return branches;
};

export const createBranch = async (branch) => {
  const newBranch = await prisma.branch.create({
    data: {
      name: branch.name,
      address: branch.address,
    },
  });
  return newBranch;
};

export const getBranch = async (id) => {
  const branch = await prisma.branch.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      warehouses: true,
    },
  });
  return branch;
};

export const updateBranch = async (id, branch) => {
  const updatedBranch = await prisma.branch.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: branch.name,
      address: branch.address,
    },
  });
  return updatedBranch;
};

export const deleteBranch = async (id) => {
  const deletedBranch = await prisma.branch.delete({
    where: {
      id: parseInt(id),
    },
  });
  if (deletedBranch === null) {
    return false;
  }
  return true;
};
