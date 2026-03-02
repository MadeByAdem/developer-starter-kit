import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

interface ErrorResponse {
  success: false;
  error: string;
  details?: unknown[];
  stack?: string;
}

export const errorHandler = (err: AppError | Error, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  if (statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err);
  }

  const response: ErrorResponse = { success: false, error: message };
  if ('details' in err && err.details) response.details = err.details;
  if (process.env.NODE_ENV === 'development') response.stack = err.stack;

  res.status(statusCode).json(response);
};
