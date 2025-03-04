import express from 'express';

import {
  createComment,
  updateComment,
  deleteComment,
  allComments,
  plateComments
} from '../controllers/commentController.js'

import requestLimiter from '../middlewares/requestLimiter.js';
import { verifyToken } from '../middlewares/verifyToken.js'
import {
  createCommentValidation, updateCommentValidation,
} from '../middlewares/validators/commentValidators.js'

const router = express.Router();

router.post('/create', requestLimiter, verifyToken, createCommentValidation, createComment);

router.patch('/update', requestLimiter, verifyToken, updateCommentValidation, updateComment);

router.delete('/delete', requestLimiter, verifyToken, deleteComment);

router.post('/allComments', requestLimiter, allComments);

router.post('/plateComments', requestLimiter, plateComments);

export default router;