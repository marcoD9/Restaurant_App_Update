import { PrismaClient } from "@prisma/client";

const createUser = async (
  prisma: PrismaClient, // Accept the PrismaClient instance as an argument
  username: string,
  password: string,
  name: string,
  email: string,
  phoneNumber: string
) => {
  const newUser = {
    username,
    password,
    name,
    email,
    phoneNumber,
  };

  // Use the provided 'prisma' instance to perform the database operation
  const user = await prisma.user.create({
    data: newUser,
  });
  return user;
};

export default createUser;
