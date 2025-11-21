import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "You cannot access this operation with an invalid token!",
    });
    return;
  }

  const token = authHeader.substring(7); // Remove "Bearer "

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    req.user = decoded as JwtPayload; // Type assertion
    next();
  });
};

export default authMiddleware;
