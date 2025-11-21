import { PrismaClient } from "@prisma/client";

const getUserById = async (prisma: PrismaClient, id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
    },
  });

  return user;
};

export default getUserById;
