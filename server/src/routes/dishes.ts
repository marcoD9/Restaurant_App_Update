import { Router, Request, Response, NextFunction } from "express";
import validateFields from "../middlewares/validationMiddleware.ts";
import getDishes from "../services/dishes/getDishes.ts";
import getDishById from "../services/dishes/getDishById.ts";
import createDish from "../services/dishes/createDish.ts";
import updateDishById from "../services/dishes/updateDishById.ts";
import deleteDishById from "../services/dishes/deleteDishById.ts";
import authMiddleware from "../middlewares/auth.ts";
import { PrismaClient } from "@prisma/client";

export default (prisma: PrismaClient) => {
  const router = Router();

  // GET all dishes
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query); // Use req for debug purpose
      const dishes = await getDishes(prisma);
      res.json(dishes);
    } catch (error) {
      next(error);
    }
  });
  // GET dishes by Id
  router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const dish = await getDishById(prisma, id);
        if (!dish) {
          res.status(404).json({ message: `Dish with ${id} not found!` });
        } else {
          res.status(200).json(dish);
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // POST route to create a new dish
  router.post(
    "/",
    authMiddleware,
    validateFields(["name", "description", "price", "image"]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, description, price, image } = req.body;
        const newDish = await createDish(
          prisma,
          name,
          description,
          price,
          image
        );
        res.status(201).json(newDish);
      } catch (error) {
        next(error);
      }
    }
  );

  //PUT to update dish by Id
  router.put(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, description, price, image } = req.body;
        const { id } = req.params;

        const dish = await updateDishById(prisma, id, {
          name,
          description,
          price,
          image,
        });
        if (dish) {
          res
            .status(200)
            .send({ message: `Dish with id ${id} has been updated`, dish });
        } else {
          res
            .status(404)
            .json({ message: `Dish with id ${id} has not been found` });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  //DELETE dish by Id
  router.delete(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const dish = await deleteDishById(prisma, id);
        if (dish) {
          res.status(200).send({
            message: `Dish with id ${id} successfully deleted!`,
            dish,
          });
        } else {
          res.status(404).json({ message: `Dish with id ${id} not found` });
        }
      } catch (error) {
        next(error);
      }
    }
  );
  return router;
};
