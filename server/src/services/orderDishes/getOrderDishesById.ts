import { PrismaClient } from "@prisma/client";

const getOrderDishesById = async (
  prisma: PrismaClient,
  orderId: string,
  dishId: string
) => {
  // Check if Order and Dish exist
  const orderExists = await prisma.order.findUnique({ where: { id: orderId } });
  const dishExists = await prisma.dish.findUnique({ where: { id: dishId } });

  if (!orderExists || !dishExists) {
    return null;
  }

  const orderDishes = await prisma.orderDish.findMany({
    where: {
      orderId: orderId,
      dishId: dishId,
    },
    include: {
      dish: true,
    },
  });
  return orderDishes;
};

export default getOrderDishesById;
