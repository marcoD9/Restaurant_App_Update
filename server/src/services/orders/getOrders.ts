import { PrismaClient } from "@prisma/client";

const getOrders = async (prisma: PrismaClient) => {
  const orders = await prisma.order.findMany({});

  return orders;
};

export default getOrders;
