import { PrismaClient } from "@prisma/client";

const createOrderDishes = async (
  prisma: PrismaClient,
  orderId: string,
  dishId: string,
  quantity: number
) => {
  // Verify the order exists
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error(`Order with ID ${orderId} not found.`);
  }

  // Verify the dish exists
  const dish = await prisma.dish.findUnique({
    where: { id: dishId },
  });

  if (!dish) {
    throw new Error(`Dish with ID ${dishId} not found.`);
  }

  // Create the OrderDish record
  const orderDish = await prisma.orderDish.create({
    data: {
      orderId: orderId,
      dishId: dishId,
      quantity: quantity,
    },
  });

  return orderDish;
};

export default createOrderDishes;
