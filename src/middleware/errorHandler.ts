import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack); // Log the error stack trace

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message, // choose to expose the error message to the client
  });
}
