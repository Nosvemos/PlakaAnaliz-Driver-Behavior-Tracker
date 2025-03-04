import { body } from 'express-validator';
import xss from 'xss';

export const createCommentValidation = [
  // Comment Validation
  body("comment")
  .trim()
  .notEmpty().withMessage("Comment is required.")
  .isLength({ min: 3, max: 500 }).withMessage("Comment must be between 3 and 500 characters.")
  .customSanitizer((value) => xss(value)),

  // ImageURl Validation
  body("imageUrl")
  .optional()
  .trim()
  .isURL().withMessage("Invalid image URL format.")
  .matches(/\.(jpg|jpeg|png|gif)$/i)
  .withMessage("Image URL must end with .jpg, .jpeg, .png, or .gif.")
];

export const updateCommentValidation = [
  // Comment Validation
  body("comment")
  .trim()
  .notEmpty().withMessage("Comment is required.")
  .isLength({ min: 3, max: 500 }).withMessage("Comment must be between 3 and 500 characters.")
  .customSanitizer((value) => xss(value)),
];