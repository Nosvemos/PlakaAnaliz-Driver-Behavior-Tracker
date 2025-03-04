import { validationResult } from 'express-validator';
import errorResponse from '../../utils/errorResponse.js'

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorResponse('Validation failed!', 400, errors.array()));
  }
  next();
};