import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import getUsers from "../services/users/getUsers.ts";
import getUserById from "../services/users/getUserById.ts";
import createUser from "../services/users/createUser.ts";
import updateUserById from "../services/users/updateUserById.ts";
import deleteUserById from "../services/users/deleteUserById.ts";
import validateFields from "../middlewares/validationMiddleware.ts";
import authMiddleware from "../middlewares/auth.ts";

// Export a function that takes the PrismaClient instance
export default (prisma: PrismaClient) => {
  const router = Router();

  // GET all users
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query); // Use req for debug purpose
      // Pass the prisma instance to the service
      const users = await getUsers(prisma);
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  // GET users by Id
  router.get(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        // Pass the prisma instance to the service
        const user = await getUserById(prisma, id);
        if (!user) {
          res.status(404).json({ message: `User with ${id} not found!` });
        } else {
          res.status(200).json(user);
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // POST route to create a new user
  router.post(
    "/",
    validateFields(["username", "password", "name", "email", "phoneNumber"]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password, name, email, phoneNumber } = req.body;
        // Pass the prisma instance to the service
        const newUser = await createUser(
          prisma, // Pass the prisma instance
          username,
          password,
          name,
          email,
          phoneNumber
        );
        res.status(201).json(newUser);
      } catch (error) {
        next(error);
      }
    }
  );

  // PUT to update user by Id
  router.put(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password, name, email, phoneNumber } = req.body;
        const { id } = req.params;

        // Pass the prisma instance to the service
        const user = await updateUserById(prisma, id, {
          username,
          password,
          name,
          email,
          phoneNumber,
        });
        if (user) {
          res
            .status(200)
            .send({ message: `User with id ${id} has been updated`, user });
        } else {
          res
            .status(404)
            .json({ message: `User with id ${id} has not been found` });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // DELETE user by Id
  router.delete(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        // Pass the prisma instance to the service
        const user = await deleteUserById(prisma, id);
        if (user) {
          res
            .status(200)
            .send({
              message: `User with id ${id} successfully deleted!`,
              user,
            });
        } else {
          res.status(404).json({ message: `User with id ${id} not found` });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
