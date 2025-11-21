import { PrismaClient, Prisma } from "@prisma/client";

interface OrderDishInput {
  dishId: string;
  quantity: number;
}

const updateOrderById = async (
  prisma: PrismaClient,
  id: string,
  updatedOrder: Prisma.OrderUpdateInput & { orderDishes?: OrderDishInput[] }
) => {
  // Check if the order exists
  const existingOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!existingOrder) {
    return null; // Return null if the order does not exist
  }

  let totalPrice: number | undefined = undefined;

  if (updatedOrder.orderDishes) {
    totalPrice = 0;

    for (const item of updatedOrder.orderDishes) {
      const dish = await prisma.dish.findUnique({
        where: { id: item.dishId },
      });

      if (!dish) {
        throw new Error(`Dish with ID ${item.dishId} not found.`);
      }

      totalPrice += dish.price * item.quantity;
    }
  }

  const updateData: Prisma.OrderUpdateInput = {
    ...updatedOrder,
    totalPrice,
  };

  if (updatedOrder.orderDishes) {
    updateData.orderDishes = {
      deleteMany: {},
      create: updatedOrder.orderDishes.map((item) => ({
        dish: { connect: { id: item.dishId } },
        quantity: item.quantity,
      })),
    };
    delete updateData.orderDishes;
  }

  const order = await prisma.order.update({
    where: { id },
    data: updateData,
    include: {
      orderDishes: {
        include: {
          dish: true,
        },
      },
    },
  });

  return order ? id : null;
};

export default updateOrderById;
