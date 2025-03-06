import { body, param } from 'express-validator';
import xss from 'xss';

export const createCommentValidation = [
  // Comment Validation
  body("comment")
  .trim()
  .notEmpty().withMessage("Comment is required.")
  .isLength({ min: 10, max: 500 }).withMessage("Comment must be between 10 and 500 characters.")
  .customSanitizer((value) => xss(value)),

  // ImageURl Validation
  body("imageUrl")
  .optional()
  .trim()
  .isURL({ require_protocol: true }).withMessage("Image URL must be a valid URL starting with http:// or https://")
  .matches(/\.(jpg|jpeg|png|gif)$/i).withMessage("Image URL must end with .jpg, .jpeg, .png, or .gif."),

  // PlateID Validation
  body("plateId")
  .trim()
  .notEmpty().withMessage("plateId is required.")
  .isMongoId().withMessage("Invalid plateId format.")
  .customSanitizer((value) => xss(value)),
];

export const updateCommentValidation = [
  // CommentID Validation
  param("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value)),

  // ImageURl Validation
  body("imageUrl")
  .optional()
  .trim()
  .isURL({ require_protocol: true }).withMessage("Image URL must be a valid URL starting with http:// or https://")
  .matches(/\.(jpg|jpeg|png|gif)$/i).withMessage("Image URL must end with .jpg, .jpeg, .png, or .gif."),

  // Comment Validation
  body("comment")
  .trim()
  .notEmpty().withMessage("Comment is required.")
  .isLength({ min: 10, max: 500 }).withMessage("Comment must be between 10 and 500 characters.")
  .customSanitizer((value) => xss(value))
];

export const deleteCommentValidation = [
  // CommentID Validation
  param("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value))
];

export const plateCommentsValidation = [
  // PlateID Validation
  param("plateId")
  .trim()
  .notEmpty().withMessage("plateId is required.")
  .isMongoId().withMessage("Invalid plateId format.")
  .customSanitizer((value) => xss(value))
];

export const commentResponsesValidation = [
  // CommentID Validation
  param("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value)),
];