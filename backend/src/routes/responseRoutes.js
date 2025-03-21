import express from 'express';

import {
  createResponse,
  updateResponse,
  deleteResponse, responseAddReaction, responseDeleteReaction,
} from '../controllers/responseController.js'

import requestLimiter from '../middlewares/requestLimiter.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  createResponseValidation,
  updateResponseValidation,
  deleteResponseValidation, responseAddReactionValidation, responseDeleteReactionValidation
} from '../middlewares/validators/responseValidators.js'
import { validateRequest } from '../middlewares/validators/validateRequest.js';

const router = express.Router();

router.post('/', requestLimiter, verifyToken, createResponseValidation, validateRequest, createResponse);

router.patch('/:responseId', requestLimiter, verifyToken, updateResponseValidation, validateRequest, updateResponse);

router.delete('/:responseId', requestLimiter, verifyToken, deleteResponseValidation, validateRequest, deleteResponse);

router.post('/:responseId/reactions', requestLimiter, verifyToken, responseAddReactionValidation, validateRequest, responseAddReaction);

router.delete('/:responseId/reactions', requestLimiter, verifyToken, responseDeleteReactionValidation, validateRequest, responseDeleteReaction);

export default router;