export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: unknown[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: unknown[] = []) {
    super(message, 400);
    this.details = details;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') { super(message, 400); }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') { super(message, 401); }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Permission denied') { super(message, 403); }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') { super(message, 404); }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') { super(message, 409); }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database error') { super(message, 500); }
}
