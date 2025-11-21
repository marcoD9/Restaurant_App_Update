import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// Export a function that takes the PrismaClient instance
export default (prisma: PrismaClient) => {
  // Accept prisma instance here
  const router = Router();

  router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    // Add next: NextFunction
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
    const { username, password } = req.body;

    try {
      // Use the provided 'prisma' instance
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        res.status(401).json({ message: "Invalid credentials!" });
        return;
      }

      // Check if the password matches with the one in our database
      if (password !== user.password) {
        res.status(400).json({ message: "Invalid credentials!" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, secretKey);
      res.status(200).json({
        message: "Successfully logged in!",
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
      });
    } catch (error) {
      console.error("An error has occurred during login:", error); // Improved error message
      // Pass the error to the Express error handling middleware
      next(error);
    }
  });

  return router;
};
