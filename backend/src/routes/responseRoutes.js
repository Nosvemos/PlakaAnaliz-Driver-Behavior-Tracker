import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js';

import { verifyToken } from '../middlewares/verifyToken.js'

import {
  createResponse,
  updateResponse,
  deleteResponse,
  commentResponses
} from '../controllers/responseController.js'

const router = express.Router();

router.post('/create', requestLimiter, verifyToken, createResponse);

router.patch('/update', requestLimiter, verifyToken, updateResponse);

router.delete('/delete', requestLimiter, verifyToken, deleteResponse);

router.post('/commentResponses', requestLimiter, commentResponses);

export default router;