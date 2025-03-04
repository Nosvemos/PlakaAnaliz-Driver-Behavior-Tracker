import jwt from 'jsonwebtoken';

import errorResponse from "../utils/errorResponse.js";

export const protectRoute = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new errorResponse('Unauthorized - No token provided!', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) return next(new errorResponse('Invalid token!', 403));

    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};