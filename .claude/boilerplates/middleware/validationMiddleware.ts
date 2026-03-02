import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ValidationError } from '../utils/errors';

export const validate = (schema: Schema, property: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      const details = error.details.map((d) => d.message);
      return next(new ValidationError('Validation error', details));
    }
    req[property] = value;
    next();
  };
