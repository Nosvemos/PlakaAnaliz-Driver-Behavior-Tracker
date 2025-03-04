import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { registerValidation, loginValidation } from '../middlewares/validators/authValidators.js'

import { register, login, logout, checkAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', requestLimiter, registerValidation, register);

router.post('/login', requestLimiter, loginValidation, login);

router.post('/logout', verifyToken, logout);

router.get('/checkAuth', verifyToken, checkAuth)

export default router;