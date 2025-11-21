import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(req.query);
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;
