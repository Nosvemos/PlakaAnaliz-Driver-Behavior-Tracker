import { body, param } from 'express-validator'
import xss from 'xss';

export const createResponseValidation = [
  // Response Validation
  body("response")
  .trim()
  .notEmpty().withMessage("response is required.")
  .isLength({ min: 10, max: 100 }).withMessage("Response must be between 10 and 100 characters.")
  .customSanitizer((value) => xss(value)),

  // commentID Validation
  body("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value))
];

export const updateResponseValidation = [
  // Response Validation
  body("response")
  .trim()
  .notEmpty().withMessage("Response is required.")
  .isLength({ min: 10, max: 100 }).withMessage("Response must be between 3 and 100 characters.")
  .customSanitizer((value) => xss(value)),

  // responseID Validation
  param("responseId")
  .trim()
  .notEmpty().withMessage("responseId is required.")
  .isMongoId().withMessage("Invalid responseId format.")
  .customSanitizer((value) => xss(value))
];

export const deleteResponseValidation = [
  // responseID Validation
  param("responseId")
  .trim()
  .notEmpty().withMessage("responseId is required.")
  .isMongoId().withMessage("Invalid responseId format.")
  .customSanitizer((value) => xss(value)),
];