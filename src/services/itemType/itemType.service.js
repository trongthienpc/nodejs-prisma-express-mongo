// Defining CRUD operations for model customer
const customerService = {
  // Create a new customer
  create: async (data) => {
    const alias = data?.name ? createAliasString(data?.name) : "";
    const existingCustomer = await prisma.customer.findMany({
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
      const newItem = await prisma.customer.create({
        data: { ...data, alias: alias },
      });
      return generateResponseObject(true, CREATE_CUSTOMER_SUCCESS, newItem);
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

  // Find a customer by phone
  findByPhone: async (phone) => {
    return await prisma.customer.findUnique({
      where: {
        phone,
      },
    });
  },

  // Find a customer by phone or name or email
  search: async (searchTerm) => {
    return await prisma.customer.findMany({
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

export default customerService;
