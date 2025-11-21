import { PrismaClient } from "@prisma/client";

const deleteUserById = async (
  prisma: PrismaClient, // Accept the PrismaClient instance as an argument
  id: string
) => {
  // Use the provided 'prisma' instance to perform the database operation
  const user = await prisma.user.deleteMany({
    where: { id },
  });

  return user.count > 0 ? id : null;
};

export default deleteUserById;
