import { PrismaClient } from "@prisma/client";

const createDish = async (
  prisma: PrismaClient, // The PrismaClient instance is now passed as the first argument
  name: string,
  description: string,
  price: number,
  image: string
) => {
  const newDish = {
    name,
    description,
    price,
    image,
  };

  // Now you use the 'prisma' instance that was provided to the function
  const dish = await prisma.dish.create({
    data: newDish,
  });
  return dish;
};

export default createDish;
