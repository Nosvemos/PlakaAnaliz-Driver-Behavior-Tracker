import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;

  try {
    if(token){
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.userId;
      return next();
    }
    next();
  } catch (error) {
    next(error);
  }
};