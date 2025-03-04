import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import {
  createResponse,
  updateResponse,
  deleteResponse,
  commentResponses
} from '../controllers/responseController.js'

const router = express.Router();

router.post('/create', requestLimiter, createResponse);

router.patch('/update', requestLimiter, updateResponse);

router.delete('/delete', requestLimiter, deleteResponse);

router.post('/commentResponses', requestLimiter, commentResponses);

export default router;