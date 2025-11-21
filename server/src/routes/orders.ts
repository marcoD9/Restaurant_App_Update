import { Router, Request, Response, NextFunction } from "express";
import validateFields from "../middlewares/validationMiddleware.ts";
import getOrders from "../services/orders/getOrders.ts";
import getOrderById from "../services/orders/getOrderById.ts";
import createOrder from "../services/orders/createOrder.ts";
import deleteOrderById from "../services/orders/deleteOrderById.ts";
import updateOrderById from "../services/orders/updateOrderById.ts";
import authMiddleware from "../middlewares/auth.ts";
import getOrdersByUserId from "../services/orders/getOrdersByUserId.ts";
import { PrismaClient } from "@prisma/client";

export default (prisma: PrismaClient) => {
  const router = Router();

  // GET all orders
  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query); // Use req for debug purpose
      const orders = await getOrders(prisma);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });
  // GET orders by Id
  router.get(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const order = await getOrderById(prisma, id);
        if (!order) {
          res.status(404).json({ message: `Order with ${id} not found!` });
        } else {
          res.status(200).json(order);
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // GET orders by User Id
  router.get(
    "/user/:userId",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        const orders = await getOrdersByUserId(prisma, userId);
        if (!orders)
          res.status(404).json({ message: `User ${userId} not found!` });
        else if (orders.length === 0) {
          res.status(200).json([]);
        } else {
          res.status(200).json(orders);
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // POST route to create a new order
  router.post(
    "/",
    authMiddleware,
    validateFields(["time", "orderStatus", "userId", "orderDishes"]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { time, orderStatus, userId, orderDishes } = req.body;
        const newOrder = await createOrder(
          prisma,
          time,
          orderStatus,
          userId,
          orderDishes
        );
        res.status(201).json(newOrder);
      } catch (error) {
        next(error);
      }
    }
  );

  //PUT to update order by Id
  router.put(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { time, orderStatus, orderDishes } = req.body;
        const { id } = req.params;

        const order = await updateOrderById(prisma, id, {
          time,
          orderStatus,
          orderDishes,
        });
        if (order) {
          res
            .status(200)
            .send({ message: `Order with id ${id} has been updated`, order });
        } else {
          res
            .status(404)
            .json({ message: `Order with id ${id} has not been found` });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  //DELETE order by Id
  router.delete(
    "/:id",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const order = await deleteOrderById(prisma, id);
        if (order) {
          res.status(200).send({
            message: `Order with id ${id} successfully deleted!`,
            order,
          });
        } else {
          res.status(404).json({ message: `Order with id ${id} not found` });
        }
      } catch (error) {
        next(error);
      }
    }
  );
  return router;
};
