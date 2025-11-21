import { Request, Response, NextFunction } from "express";
import logger from "../utils/log";

// Middleware function to log request information
const log = (req: Request, res: Response, next: NextFunction): void => {
  const start = new Date(); // Record the start time of the request

  // Capture the response status code after the response has been sent
  res.on("finish", () => {
    const ms = new Date().getTime() - start.getTime(); // Calculate the duration in milliseconds

    // Log the HTTP method, URL, response status, and request duration
    logger.info(
      `${req.method} ${req.originalUrl} Status: ${res.statusCode} Duration: ${ms}ms`
    );
  });

  next(); // Next middleware
};

export default log;
