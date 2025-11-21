import { PrismaClient } from "@prisma/client";

const getDishById = async (
  prisma: PrismaClient, // Accept the PrismaClient instance as an argument
  id: string
) => {
  // Use the provided 'prisma' instance to perform the database operation
  const dish = await prisma.dish.findUnique({
    where: { id },
  });
  return dish;
};

export default getDishById;
