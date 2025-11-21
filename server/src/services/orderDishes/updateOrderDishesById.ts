import { PrismaClient } from "@prisma/client";

const updateOrderDishesById = async (
  prisma: PrismaClient,
  orderId: string,
  dishId: string,
  quantity: number
) => {
  // Update the OrderDish quantity
  // Check if Order and Dish exist
  const orderExists = await prisma.order.findUnique({ where: { id: orderId } });
  const dishExists = await prisma.dish.findUnique({ where: { id: dishId } });

  if (!orderExists || !dishExists) {
    return null;
  }

  const updatedOrderDish = await prisma.orderDish.update({
    where: {
      orderId_dishId: {
        orderId: orderId,
        dishId: dishId,
      },
    },
    data: {
      quantity: quantity,
    },
  });

  // Recalculate the order's totalPrice
  const orderDishes = await prisma.orderDish.findMany({
    where: {
      orderId: orderId,
    },
    include: {
      dish: true,
    },
  });

  const newTotalPrice = orderDishes.reduce((total, orderDish) => {
    return total + orderDish.dish.price * orderDish.quantity;
  }, 0);

  // Update the order with the new totalPrice
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      totalPrice: newTotalPrice,
    },
  });

  return updatedOrderDish;
};

export default updateOrderDishesById;
