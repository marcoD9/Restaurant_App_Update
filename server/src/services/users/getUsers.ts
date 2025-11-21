import { PrismaClient } from "@prisma/client";

const getUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
    },
  });

  return users;
};

export default getUsers;
