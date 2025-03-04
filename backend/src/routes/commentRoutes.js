import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js';

import { verifyToken } from '../middlewares/verifyToken.js'

import {
  createComment,
  updateComment,
  deleteComment,
  allComments,
  plateComments
} from '../controllers/commentController.js'

const router = express.Router();

router.post('/create', requestLimiter, verifyToken, createComment);

router.patch('/update', requestLimiter, verifyToken, updateComment);

router.delete('/delete', requestLimiter, verifyToken, deleteComment);

router.post('/allComments', requestLimiter, allComments);

router.post('/plateComments', requestLimiter, plateComments);

export default router;