import { body, param } from 'express-validator';
import xss from 'xss';

export const createCommentValidation = [
  // Comment Validation
  body("comment")
  .trim()
  .notEmpty().withMessage("Comment is required.")
  .isLength({ min: 10, max: 500 }).withMessage("Comment must be between 10 and 500 characters.")
  .customSanitizer((value) => xss(value)),

  // Image Validation
  body("image")
  .optional()
  .custom((value, { req }) => {
    if (!req.files || !req.files.image) {
      return true;
    }

    const file = req.files.image;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("Image size must not exceed 10MB");
    }

    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new Error("Image must be a valid image file (jpg, jpeg, png, or gif)");
    }
    return true;
  }),

  // Plate Validation
  body('plate')
  .trim()
  .notEmpty().withMessage('License home is required.')
  .matches(/^(0[1-9]|[1-7][0-9]|80|81) ?[A-Z]{1,3} ?\d{1,4}$/)
  .withMessage('Enter a valid Turkish license home. (e.g., 34ABC123)')
  .customSanitizer(value => xss(value.toUpperCase()))
];

export const updateCommentValidation = [
  // CommentID Validation
  param("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value)),

  // Image Validation
  body("image")
  .optional()
  .custom((value, { req }) => {
    if (!req.files || !req.files.image) {
      return true;
    }

    const file = req.files.image;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("Image size must not exceed 10MB");
    }

    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new Error("Image must be a valid image file (jpg, jpeg, png, or gif)");
    }
    return true;
  }),

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

export const commentAddReactionValidation = [
  // CommentID Validation
  param("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value)),

  // Reaction type Validation
  body("reactionType")
  .trim()
  .notEmpty().withMessage("reactionType is required.")
  .isIn(["like", "dislike"]).withMessage("reactionType must be either 'like' or 'dislike'.")
  .customSanitizer((value) => xss(value)),
];

export const commentDeleteReactionValidation = [
  // CommentID Validation
  param("commentId")
  .trim()
  .notEmpty().withMessage("commentId is required.")
  .isMongoId().withMessage("Invalid commentId format.")
  .customSanitizer((value) => xss(value))
];