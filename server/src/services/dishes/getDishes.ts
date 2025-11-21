import { PrismaClient } from "@prisma/client";

const getDishes = async (prisma: PrismaClient) => {
  const dishes = await prisma.dish.findMany();
  return dishes;
};

export default getDishes;
