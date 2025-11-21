import { PrismaClient } from "@prisma/client";

const getOrderById = async (prisma: PrismaClient, id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  return order;
};

export default getOrderById;
