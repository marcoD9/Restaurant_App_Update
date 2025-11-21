import { PrismaClient } from "@prisma/client";

const deleteOrderDishesById = async (
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

  const deletedOrderDish = await prisma.orderDish.delete({
    where: {
      orderId_dishId: {
        orderId: orderId,
        dishId: dishId,
      },
    },
  });
  return deletedOrderDish;
};
export default deleteOrderDishesById;
