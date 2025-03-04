import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js';
import { protectRoute } from '../middlewares/protectRoute.js';
import { registerValidation, loginValidation } from '../middlewares/validators/authValidators.js'

import { register, login, logout, checkAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', requestLimiter, registerValidation, register);

router.post('/login', requestLimiter, loginValidation, login);

router.post('/logout', protectRoute, logout);

router.get('/checkAuth', protectRoute, checkAuth)

export default router;