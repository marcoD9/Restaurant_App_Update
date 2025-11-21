import { PrismaClient } from "@prisma/client";

const deleteDishById = async (
  prisma: PrismaClient, // Accept the PrismaClient instance as an argument
  id: string
) => {
  // Use the provided 'prisma' instance to perform the database operation
  const dish = await prisma.dish.deleteMany({
    where: { id },
  });

  return dish.count > 0 ? id : null;
};

export default deleteDishById;
