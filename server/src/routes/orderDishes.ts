import { Router, Request, Response, NextFunction } from "express";
import getOrdersDishes from "../services/orderDishes/getOrdersDishes.ts";
import deleteOrderDishesById from "../services/orderDishes/deleteOrderDishesById.ts";
import getOrderDishesById from "../services/orderDishes/getOrderDishesById.ts";
import validateFields from "../middlewares/validationMiddleware.ts";
import createOrderDishes from "../services/orderDishes/createOrderDishes.ts";
import updateOrderDishesById from "../services/orderDishes/updateOrderDishesById.ts";
import authMiddleware from "../middlewares/auth.ts";
import { PrismaClient } from "@prisma/client";

export default (prisma: PrismaClient) => {
  const router = Router();

  //GET all Dishes from orders
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params);
      const ordersDishes = await getOrdersDishes(prisma);
      res.json(ordersDishes);
      return;
    } catch (error) {
      next(error);
    }
  });
  // GET Dishes from orders by Id
  router.get(
    "/:orderId/dishes/:dishId",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { orderId, dishId } = req.params;
        const orderDishes = await getOrderDishesById(prisma, orderId, dishId);
        if (!orderDishes) {
          res.status(404).json({
            message: `Dish with id ${dishId} of Order ${orderId} not found`,
          });
          return;
        }
        res.json(orderDishes);
      } catch (error) {
        next(error);
      }
    }
  );

  // POST route to create a new orderDishes
  router.post(
    "/",
    authMiddleware,
    validateFields(["orderId", "dishId", "quantity"]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { orderId, dishId, quantity } = req.body;
        const newDish = await createOrderDishes(
          prisma,
          orderId,
          dishId,
          quantity
        );
        res.status(201).json(newDish);
      } catch (error) {
        next(error);
      }
    }
  );

  //PUT to update Dishes quantity by Id
  router.put(
    "/:orderId/dishes/:dishId",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { quantity } = req.body;
        const { orderId, dishId } = req.params;

        const orderDish = await updateOrderDishesById(
          prisma,
          orderId,
          dishId,
          quantity
        );

        if (orderDish) {
          res.status(200).send({
            message: `Dish with id ${dishId} of Order ${orderId} has been updated`,
            orderDish,
          });
        } else {
          res.status(404).json({
            message: `Dish with id ${dishId} of Order ${orderId} has not been found`,
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  //DELETE Dishes from an order
  router.delete(
    "/:orderId/dishes/:dishId",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { orderId, dishId } = req.params;
        const orderDishes = await deleteOrderDishesById(
          prisma,
          orderId,
          dishId
        );
        if (orderDishes) {
          res.status(200).send({
            message: `Dish with id ${dishId} of Order ${orderId} successfully deleted!`,
            orderDishes,
          });
        } else {
          res.status(404).json({
            message: `Dish with id ${dishId} of Order ${orderId} not found`,
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
