import { PrismaClient } from "@prisma/client";

interface OrderDishInput {
  dishId: string;
  quantity: number;
}

const createOrder = async (
  prisma: PrismaClient,
  time: string,
  orderStatus: string,
  userId: string,
  orderDishes: OrderDishInput[] // Array of OrderDishInput objects
) => {
  let totalPrice = 0;

  // Calculate total price by iterating through orderDishes
  for (const item of orderDishes) {
    const dish = await prisma.dish.findUnique({
      where: { id: item.dishId },
    });

    if (!dish) {
      throw new Error(`Dish with ID ${item.dishId} not found.`);
    }

    totalPrice += dish.price * item.quantity;
  }

  // Create the order with calculated totalPrice
  const order = await prisma.order.create({
    data: {
      user: { connect: { id: userId } },
      time: new Date(time),
      totalPrice,
      orderStatus,
      orderDishes: {
        create: orderDishes.map((item) => ({
          dish: { connect: { id: item.dishId } },
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderDishes: {
        include: {
          dish: true,
        },
      },
    },
  });

  return order;
};

export default createOrder;
