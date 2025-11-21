import { Request, Response, NextFunction } from "express";

function validateFields(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    next();
  };
}

export default validateFields;
