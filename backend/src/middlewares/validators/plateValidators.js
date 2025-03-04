import { body, param } from 'express-validator';
import xss from 'xss';

export const createPlateValidation = [
  // Plate Validation
  body('plate')
  .trim()
  .notEmpty().withMessage('License plate is required.')
  .matches(/^(0[1-9]|[1-7][0-9]|80|81) ?[A-Z]{1,3} ?\d{1,4}$/)
  .withMessage('Enter a valid Turkish license plate. (e.g., 34ABC123, 06 AB 12)')
  .customSanitizer(value => xss(value))
];

export const findPlateValidation = [
  // Plate Validation
  param('plate')
  .trim()
  .notEmpty().withMessage('License plate is required.')
  .matches(/^(0[1-9]|[1-7][0-9]|80|81) ?[A-Z]{1,3} ?\d{1,4}$/)
  .withMessage('Enter a valid Turkish license plate. (e.g., 34ABC123, 06 AB 12)')
  .customSanitizer(value => xss(value))
];

export const deletePlateValidation = [
  // Plate Validation
  body('plate')
  .trim()
  .notEmpty().withMessage('License plate is required.')
  .matches(/^(0[1-9]|[1-7][0-9]|80|81) ?[A-Z]{1,3} ?\d{1,4}$/)
  .withMessage('Enter a valid Turkish license plate. (e.g., 34ABC123, 06 AB 12)')
  .customSanitizer(value => xss(value))
];