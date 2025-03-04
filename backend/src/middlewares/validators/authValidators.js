import { body } from 'express-validator';
import xss from 'xss';

import { User } from '../../models/User.js';

import errorResponse from "../../utils/errorResponse.js";

export const registerValidation = [
  // Username Validation
  body("username")
  .trim()
  .notEmpty().withMessage("Username is required.")
  .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters.")
  .matches(/^[\w!@#$%^&*()_+={}\[\]:;"'<>,.?/-]+$/)
  .withMessage("Username can contain letters, numbers, and special characters.")
  .customSanitizer(value => xss(value))
  .custom(async (username) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new errorResponse('Username already exists!', 400);
    }
    return true;
  }),

  // Email Validation
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required.')
  .isEmail().withMessage('Please enter a valid email address.')
  .normalizeEmail()
  .customSanitizer(value => xss(value))
  .custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new errorResponse('Email already exists!', 400);
    }
    return true;
  }),

  // Password Validation
  body('password')
  .trim()
  .notEmpty().withMessage('Password is required.')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$/)
  .withMessage('Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character.')
  .customSanitizer(value => xss(value))
];

export const loginValidation = [
  // Email Validation
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required.')
  .isEmail().withMessage('Please enter a valid email address.')
  .normalizeEmail()
  .customSanitizer(value => xss(value)),

  // Password Validation
  body('password')
  .trim()
  .notEmpty().withMessage('Password is required.')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$/)
  .withMessage('Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character.')
  .customSanitizer(value => xss(value))
];