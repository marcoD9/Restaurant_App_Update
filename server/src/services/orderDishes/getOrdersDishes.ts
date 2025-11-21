import { PrismaClient } from "@prisma/client";

const getOrdersDishes = async (prisma: PrismaClient) => {
  const ordersDish = await prisma.orderDish.findMany({
    include: {
      order: true,
      dish: true,
    },
  });
  return ordersDish;
};

export default getOrdersDishes;
