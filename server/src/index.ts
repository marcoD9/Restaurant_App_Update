import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.ts";
import dishesRouter from "./routes/dishes.ts";
import ordersRouter from "./routes/orders.ts";
import orderDishesRouter from "./routes/orderDishes.ts";
import loginRouter from "./routes/login.ts";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler.ts";
import log from "./middlewares/logMiddleware.ts";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(log);

app.use("/login", loginRouter(prisma));
app.use("/users", usersRouter(prisma));
app.use("/dishes", dishesRouter(prisma));
app.use("/orders", ordersRouter(prisma));
app.use("/orderDishes", orderDishesRouter(prisma));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}
