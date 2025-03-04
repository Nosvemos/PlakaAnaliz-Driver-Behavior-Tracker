import { body } from 'express-validator';
import xss from 'xss';

export const createResponseValidation = [
  // Response Validation
  body("response")
  .trim()
  .notEmpty().withMessage("response is required.")
  .isLength({ min: 3, max: 100 }).withMessage("Response must be between 3 and 100 characters.")
  .customSanitizer((value) => xss(value)),

  // ImageURl Validation
  body("imageUrl")
  .optional()
  .trim()
  .isURL().withMessage("Invalid image URL format.")
  .matches(/\.(jpg|jpeg|png|gif)$/i)
  .withMessage("Image URL must end with .jpg, .jpeg, .png, or .gif.")
];

export const updateResponseValidation = [
  // Response Validation
  body("response")
  .trim()
  .notEmpty().withMessage("Response is required.")
  .isLength({ min: 3, max: 100 }).withMessage("Comment must be between 3 and 100 characters.")
  .customSanitizer((value) => xss(value)),
];