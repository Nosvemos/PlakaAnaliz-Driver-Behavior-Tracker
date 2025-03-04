import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import { User } from '../models/User.js';

import errorResponse from "../utils/errorResponse.js";
import { setJwtCookie } from '../utils/setJwtCookie.js';

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    setJwtCookie(res, user._id);

    const { password: _,...safeUser } = user.toObject();
    res.status(201).json({
      success: true,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    const user = await User.findOne({
      email
    });
    if (!user) {
      return next(new errorResponse('Invalid credentials.', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return next(new errorResponse('Invalid credentials.', 400));
    }

    setJwtCookie(res, user._id);

    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User successfully logged in!',
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};


export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Successfully logged out!'
  });
};


export const checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(new errorResponse('Invalid user!', 403));
    }

    const { password, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      message: 'Authentication is valid!',
      user: safeUser
    });
  } catch (error) {
    next (error);
  }
};