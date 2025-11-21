import { PrismaClient, Prisma } from "@prisma/client";

const updateDishById = async (
  prisma: PrismaClient,
  id: string,
  updatedDish: Prisma.DishUpdateInput
) => {
  const dish = await prisma.dish.updateMany({
    where: { id },
    data: updatedDish,
  });

  return dish.count > 0 ? id : null;
};

export default updateDishById;
