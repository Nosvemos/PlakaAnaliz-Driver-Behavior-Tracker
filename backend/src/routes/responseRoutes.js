import express from 'express';

import {
  createResponse,
  updateResponse,
  deleteResponse,
  commentResponses
} from '../controllers/responseController.js';

import requestLimiter from '../middlewares/requestLimiter.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  createResponseValidation,
  updateResponseValidation,
} from '../middlewares/validators/responseValidators.js';

const router = express.Router();

router.post('/create', requestLimiter, verifyToken, createResponseValidation, createResponse);

router.patch('/update', requestLimiter, verifyToken, updateResponseValidation, updateResponse);

router.delete('/delete', requestLimiter, verifyToken, deleteResponse);

router.post('/commentResponses', requestLimiter, commentResponses);

export default router;